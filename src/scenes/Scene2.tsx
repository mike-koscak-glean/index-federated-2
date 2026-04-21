import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LOGOS } from '../logos';

const VW = 800;
const VH = 500;

type NodeType = 'content' | 'people' | 'activity' | 'acl';

const TYPE_COLORS: Record<NodeType, string> = {
  content: '#3FA3FF',
  people: '#D8FD49',
  activity: '#FFAC8C',
  acl: '#B2E5EF',
};

const TYPE_LABELS: Record<NodeType, string> = {
  content: 'Content',
  people: 'People / Teams',
  activity: 'Activity',
  acl: 'ACLs',
};

const APPS = [
  { logo: LOGOS.gdrive, name: 'Drive' },
  { logo: LOGOS.jira, name: 'Jira' },
  { logo: LOGOS.salesforce, name: 'Salesforce' },
  { logo: LOGOS.teams, name: 'Teams' },
  { logo: LOGOS.confluence, name: 'Confluence' },
  { logo: LOGOS.servicenow, name: 'ServiceNow' },
  { logo: LOGOS.gmail, name: 'Gmail' },
  { logo: LOGOS.gong, name: 'Gong' },
  { logo: LOGOS.sharepoint, name: 'SharePoint' },
  { logo: LOGOS.outlook, name: 'Outlook' },
  { logo: LOGOS.tableau, name: 'Tableau' },
];

// Connector positions — flat arc across the top
function connPos(i: number, total: number) {
  const startAngle = -Math.PI * 0.85;
  const endAngle = -Math.PI * 0.15;
  const a = startAngle + (i / (total - 1)) * (endAngle - startAngle);
  const rx = 340;
  const ry = 80;
  return { x: VW / 2 + rx * Math.cos(a), y: 70 + ry * Math.sin(a) + ry };
}

const NODES: { label: string; x: number; y: number; type: NodeType; r: number }[] = [
  { label: 'Acme Corp',          x: 430, y: 200, type: 'content',  r: 16 },
  { label: 'Sales Team',         x: 280, y: 225, type: 'people',   r: 14 },
  { label: 'Q4 Pipeline',        x: 540, y: 280, type: 'activity', r: 15 },
  { label: 'Support',            x: 530, y: 370, type: 'people',   r: 11 },
  { label: 'Engineering',        x: 320, y: 340, type: 'people',   r: 15 },
  { label: 'Onboarding',         x: 420, y: 380, type: 'content',  r: 13 },
  { label: 'Setup Flow',         x: 200, y: 290, type: 'content',  r: 10 },
  { label: 'Provisioning',       x: 195, y: 390, type: 'acl',      r: 9  },
  { label: 'NA Launch',          x: 620, y: 210, type: 'activity', r: 9  },
  { label: 'Compliance Review',  x: 380, y: 290, type: 'acl',      r: 10 },
];

const EDGES: [number, number][] = [
  [0, 2], [2, 1], [0, 1],      // Acme-Q4-Sales triangle
  [5, 6], [6, 4], [4, 7],      // Onboarding-Setup-Eng-Provisioning chain
  [3, 5],                       // Support-Onboarding
  [4, 9],                       // Engineering-Compliance
  [2, 8],                       // Q4-NA Launch
  [0, 3],                       // Acme-Support
  [5, 9],                       // Onboarding-Compliance
  [1, 4],                       // Sales-Engineering
];

interface MiniCard {
  emoji: string;
  label: string;
  appIdx: number;
  targetNode: number;
}

const MINI_CARDS: MiniCard[] = [
  { emoji: '📄', label: 'Onboarding Plan',   appIdx: 0, targetNode: 5 },
  { emoji: '🎫', label: 'ENG-4521',          appIdx: 1, targetNode: 4 },
  { emoji: '☁',  label: 'Acme Corp Opp',     appIdx: 2, targetNode: 0 },
  { emoji: '💬', label: '#acme channel',      appIdx: 3, targetNode: 1 },
  { emoji: '📝', label: 'Runbook',            appIdx: 4, targetNode: 9 },
  { emoji: '🟢', label: 'P3 Incident',        appIdx: 5, targetNode: 3 },
  { emoji: '✉️', label: 'Onboard invite',     appIdx: 6, targetNode: 5 },
  { emoji: '🎙', label: 'Q3 check-in',        appIdx: 7, targetNode: 2 },
  { emoji: '📋', label: 'Compliance doc',     appIdx: 8, targetNode: 9 },
  { emoji: '📊', label: 'Pipeline review',    appIdx: 9, targetNode: 2 },
  { emoji: '🗂', label: 'Setup flow doc',     appIdx: 0, targetNode: 6 },
  { emoji: '🚀', label: 'NA Launch brief',    appIdx: 2, targetNode: 8 },
  { emoji: '🔧', label: 'Provision request',  appIdx: 5, targetNode: 7 },
];

const BADGES: { nodeIdx: number; text: string; offsetY?: number }[] = [
  { nodeIdx: 9, text: 'Viewed 124×' },
  { nodeIdx: 0, text: 'Owner: J. Smith' },
  { nodeIdx: 1, text: 'Team: Sales' },
  { nodeIdx: 5, text: 'Recent' },
  { nodeIdx: 3, text: 'Role: PM' },
  { nodeIdx: 4, text: 'ACL: Engineering' },
];

function pct(x: number, y: number): React.CSSProperties {
  return { left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` };
}

// Phase timing constants
const CARD_STAGGER_START = 0.4;
const CARD_STAGGER_GAP = 0.15;
const CARD_FLY_DURATION = 1.0;
const EDGE_DRAW_START = 2.8;
const EDGE_STAGGER = 0.08;
const CAPTION1_DELAY = 4.5;
const PHASE2_START = 6.0;
const BADGE_STAGGER = 0.2;
const CAPTION2_DELAY = PHASE2_START + BADGES.length * BADGE_STAGGER + 0.5;
const PHASE4_START = 9.7;
const PHASE5_START = 10.7;

const QUERY_HIT_NODES = new Set([0, 5, 3, 4]);
const QUERY_RESULTS = [
  { nodeIdx: 0, text: '✓ Acme Onboarding Plan', dx: -125 },
  { nodeIdx: 4, text: '✓ ENG-4521', dx: -100 },
  { nodeIdx: 3, text: '✓ Support ticket', dx: 75 },
];
const BEAM_START = { x: 405, y: 486 };
const BEAM_END = { x: 405, y: 456 };
const GRAPH_CENTER = { x: 405, y: 295 };
const BEAM_LEN = Math.abs(BEAM_START.y - BEAM_END.y);

export function Scene2() {
  const [phase, setPhase] = useState(0); // 0=building, 1=caption1, 2=signals, 3=idle, 4=transition, 5=query

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), CAPTION1_DELAY * 1000);
    const t2 = setTimeout(() => setPhase(2), PHASE2_START * 1000);
    const t3 = setTimeout(() => setPhase(3), (CAPTION2_DELAY + 1.0) * 1000);
    const t4 = setTimeout(() => setPhase(4), PHASE4_START * 1000);
    const t5 = setTimeout(() => setPhase(5), PHASE5_START * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  const N_CONN = APPS.length + 1;

  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        The Glean Search Index - Powering the Enterprise Graph
      </motion.div>

      <div className="idx-stage">
        {/* SVG network graph layer */}
        <svg
          className="idx-radial-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="edgeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="indexContainerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(63,163,255,0.04)" />
              <stop offset="100%" stopColor="rgba(63,163,255,0.01)" />
            </linearGradient>
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <radialGradient key={type} id={`nodeGrad-${type}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0.08} />
              </radialGradient>
            ))}
          </defs>

          {/* Index container — visual "shelf" behind the graph */}
          <motion.rect
            x={130} y={155} width={550} height={280} rx={16}
            fill="url(#indexContainerGrad)"
            stroke="rgba(63,163,255,0.12)"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: EDGE_DRAW_START - 0.3, duration: 1, ease: 'easeOut' }}
          />
          <motion.text
            x={405} y={448}
            textAnchor="middle"
            fill="rgba(63,163,255,0.3)"
            fontSize={9}
            fontWeight={700}
            letterSpacing={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: EDGE_DRAW_START + 0.3, duration: 0.8 }}
          >
            UNIFIED INDEX
          </motion.text>

          {/* Edges — draw in after nodes arrive */}
          {EDGES.map(([a, b], i) => {
            const na = NODES[a], nb = NODES[b];
            const dx = nb.x - na.x, dy = nb.y - na.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const edgeOp = phase >= 5
              ? (QUERY_HIT_NODES.has(a) || QUERY_HIT_NODES.has(b) ? 0.4 : 0.1)
              : 1;
            return (
              <g key={`e${i}`} filter="url(#edgeGlow)">
                <motion.line
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="rgba(216,253,73,0.25)"
                  strokeWidth={1.2}
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  initial={{ strokeDashoffset: len, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: edgeOp }}
                  transition={{
                    strokeDashoffset: { delay: EDGE_DRAW_START + i * EDGE_STAGGER, duration: 0.6, ease: 'easeOut' },
                    opacity: { delay: phase >= 5 ? 0 : EDGE_DRAW_START + i * EDGE_STAGGER, duration: phase >= 5 ? 0.5 : 0.6, ease: 'easeOut' },
                  }}
                />
              </g>
            );
          })}

          {/* Idle edge pulses (after phase 3) */}
          {phase >= 3 && EDGES.map(([a, b], i) => {
            if (phase >= 5 && !QUERY_HIT_NODES.has(a) && !QUERY_HIT_NODES.has(b)) return null;
            return (
              <motion.line
                key={`ep${i}`}
                x1={NODES[a].x} y1={NODES[a].y}
                x2={NODES[b].x} y2={NODES[b].y}
                stroke="rgba(216,253,73,0.12)"
                strokeWidth={3}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{
                  delay: i * 0.4,
                  duration: 2.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 3 + (i % 3),
                }}
              />
            );
          })}

          {/* Graph nodes — placed by mini-card arrivals */}
          {NODES.map((n, i) => {
            const arrivalDelay = (() => {
              const card = MINI_CARDS.find(c => c.targetNode === i);
              if (card) {
                const cardIdx = MINI_CARDS.indexOf(card);
                return CARD_STAGGER_START + cardIdx * CARD_STAGGER_GAP + CARD_FLY_DURATION;
              }
              return CARD_STAGGER_START + MINI_CARDS.length * CARD_STAGGER_GAP + CARD_FLY_DURATION;
            })();
            const color = TYPE_COLORS[n.type];
            return (
              <motion.g
                key={`gn${i}`}
                animate={{ opacity: phase >= 5 && !QUERY_HIT_NODES.has(i) ? 0.25 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Outer halo */}
                <motion.circle
                  cx={n.x} cy={n.y} r={n.r + 6}
                  fill={`url(#nodeGrad-${n.type})`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ delay: arrivalDelay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` } as React.CSSProperties}
                />
                {/* Type-colored ring */}
                <motion.circle
                  cx={n.x} cy={n.y} r={n.r}
                  fill="rgba(13,16,87,0.9)"
                  stroke={color}
                  strokeWidth={1.5}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: arrivalDelay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` } as React.CSSProperties}
                />
                {/* Inner fill */}
                <motion.circle
                  cx={n.x} cy={n.y} r={n.r - 3}
                  fill={color}
                  fillOpacity={0.15}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: arrivalDelay + 0.2, duration: 0.3 }}
                />
                {/* Node label — in SVG so it stays aligned with the circle */}
                <motion.text
                  x={n.x}
                  y={n.y + n.r + 14}
                  textAnchor="middle"
                  dominantBaseline="hanging"
                  fill="rgba(255,255,255,0.75)"
                  fontSize={9}
                  fontWeight={600}
                  style={{ pointerEvents: 'none' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: arrivalDelay + 0.1, duration: 0.4 }}
                >
                  {n.label}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Signal badges — in SVG for perfect node alignment */}
          {phase >= 2 && BADGES.map((b, i) => {
            const n = NODES[b.nodeIdx];
            const badgeY = n.y - n.r - 16;
            const textLen = b.text.length * 4.2 + 12;
            return (
              <motion.g
                key={`b${i}`}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: phase >= 5 && !QUERY_HIT_NODES.has(b.nodeIdx) ? 0.15 : 1, scale: 1 }}
                transition={{
                  delay: i * BADGE_STAGGER,
                  duration: 0.35,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                style={{ transformOrigin: `${n.x}px ${badgeY}px` } as React.CSSProperties}
              >
                <rect
                  x={n.x - textLen / 2}
                  y={badgeY - 8}
                  width={textLen}
                  height={16}
                  rx={8}
                  fill="rgba(216,253,73,0.12)"
                  stroke="rgba(216,253,73,0.25)"
                  strokeWidth={1}
                />
                <text
                  x={n.x}
                  y={badgeY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#D8FD49"
                  fontSize={8}
                  fontWeight={600}
                  style={{ pointerEvents: 'none' }}
                >
                  {b.text}
                </text>
              </motion.g>
            );
          })}

          {/* ===== Phase 4+ — "Already indexed" label near connectors ===== */}
          {phase >= 4 && (
            <motion.text
              x={405} y={142}
              textAnchor="middle"
              fill="rgba(255,255,255,0.22)"
              fontSize={8}
              fontWeight={700}
              letterSpacing={2.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ALREADY INDEXED
            </motion.text>
          )}

          {/* ===== Phase 5 — Query Time animations ===== */}
          {phase >= 5 && (
            <>
              {/* Beam trail line — short vertical connector from prompt into index */}
              <motion.line
                x1={BEAM_START.x} y1={BEAM_START.y}
                x2={BEAM_END.x} y2={BEAM_END.y}
                stroke="#D8FD49"
                strokeWidth={2}
                strokeDasharray={BEAM_LEN}
                initial={{ strokeDashoffset: BEAM_LEN, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: [0, 0.7, 0.35] }}
                transition={{ delay: 0.5, duration: 0.3, ease: 'easeIn', opacity: { times: [0, 0.3, 1] } }}
              />
              {/* Traveling pulse dot — enters the index from below */}
              <motion.circle
                r={5}
                fill="#D8FD49"
                filter="url(#edgeGlow)"
                initial={{ cx: BEAM_START.x, cy: BEAM_START.y, opacity: 0 }}
                animate={{
                  cx: [BEAM_START.x, BEAM_END.x, GRAPH_CENTER.x],
                  cy: [BEAM_START.y, BEAM_END.y, GRAPH_CENTER.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  opacity: { times: [0, 0.05, 0.7, 1] },
                }}
              />
              {/* Impact burst — primary ring */}
              <motion.circle
                cx={GRAPH_CENTER.x} cy={GRAPH_CENTER.y} r={30}
                fill="none"
                stroke="#D8FD49"
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5], opacity: [0.7, 0] }}
                transition={{ delay: 0.9, duration: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: `${GRAPH_CENTER.x}px ${GRAPH_CENTER.y}px` } as React.CSSProperties}
              />
              {/* Impact burst — secondary ring */}
              <motion.circle
                cx={GRAPH_CENTER.x} cy={GRAPH_CENTER.y} r={50}
                fill="none"
                stroke="rgba(216,253,73,0.3)"
                strokeWidth={1}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3], opacity: [0.5, 0] }}
                transition={{ delay: 0.95, duration: 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: `${GRAPH_CENTER.x}px ${GRAPH_CENTER.y}px` } as React.CSSProperties}
              />

              {/* Highlighted edge overlays — bright re-draw between hit nodes */}
              {EDGES.map(([a, b], ei) => {
                if (!QUERY_HIT_NODES.has(a) || !QUERY_HIT_NODES.has(b)) return null;
                return (
                  <motion.line
                    key={`qe${ei}`}
                    x1={NODES[a].x} y1={NODES[a].y}
                    x2={NODES[b].x} y2={NODES[b].y}
                    stroke="rgba(216,253,73,0.65)"
                    strokeWidth={2.5}
                    filter="url(#edgeGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                  />
                );
              })}

              {/* Highlighted node glow rings + bright fills */}
              {Array.from(QUERY_HIT_NODES).map((nodeIdx, idx) => {
                const n = NODES[nodeIdx];
                return (
                  <motion.g key={`qn${nodeIdx}`}>
                    <motion.circle
                      cx={n.x} cy={n.y} r={n.r + 10}
                      fill="none"
                      stroke="#D8FD49"
                      strokeWidth={1.5}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.6, 0.3, 0.6] }}
                      transition={{
                        delay: 1.0 + idx * 0.1,
                        duration: 2.5,
                        times: [0, 0.12, 0.55, 1],
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px` } as React.CSSProperties}
                    />
                    <motion.circle
                      cx={n.x} cy={n.y} r={n.r}
                      fill={TYPE_COLORS[n.type]}
                      fillOpacity={0.35}
                      stroke="#D8FD49"
                      strokeWidth={2}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 + idx * 0.1, duration: 0.3 }}
                    />
                  </motion.g>
                );
              })}

              {/* Result preview labels beside highlighted nodes */}
              {QUERY_RESULTS.map((r, ri) => {
                const n = NODES[r.nodeIdx];
                const lx = n.x + r.dx;
                const ly = n.y;
                const textLen = r.text.length * 4.5 + 16;
                return (
                  <motion.g
                    key={`qr${ri}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + ri * 0.2, duration: 0.3, ease: 'easeOut' }}
                  >
                    <rect
                      x={lx - textLen / 2}
                      y={ly - 10}
                      width={textLen}
                      height={20}
                      rx={10}
                      fill="rgba(216,253,73,0.1)"
                      stroke="rgba(216,253,73,0.3)"
                      strokeWidth={1}
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#D8FD49"
                      fontSize={9}
                      fontWeight={600}
                    >
                      {r.text}
                    </text>
                  </motion.g>
                );
              })}
            </>
          )}
        </svg>

        {/* HTML overlay */}
        <div className="idx-radial-over">
          {/* Connector icons in arc */}
          {APPS.map((app, i) => {
            const p = connPos(i, N_CONN);
            const cardDeparted = MINI_CARDS.some(c => c.appIdx === i);
            const dimDelay = (() => {
              const cards = MINI_CARDS.filter(c => c.appIdx === i);
              if (cards.length === 0) return 999;
              const lastIdx = Math.max(...cards.map(c => MINI_CARDS.indexOf(c)));
              return CARD_STAGGER_START + lastIdx * CARD_STAGGER_GAP + 0.3;
            })();
            return (
              <motion.div
                key={app.name}
                className="idx-conn"
                style={pct(p.x, p.y)}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: phase >= 4 ? 0.25 : (cardDeparted ? [1, 1, 0.4] : 1),
                  scale: 1,
                }}
                transition={
                  cardDeparted
                    ? { opacity: { times: [0, 0.01, 1], duration: dimDelay + 0.5, ease: 'easeOut' }, scale: { duration: 0.3 } }
                    : { delay: 0.15 + i * 0.07 }
                }
              >
                <img src={app.logo} alt={app.name} className="app-icon-sm" />
              </motion.div>
            );
          })}

          {/* +90 overflow */}
          {(() => {
            const p = connPos(APPS.length, N_CONN);
            return (
              <motion.div
                className="idx-conn idx-conn-more"
                style={pct(p.x, p.y)}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 4 ? 0.25 : 1 }}
                transition={{ delay: phase >= 4 ? 0 : 0.5, duration: 0.5 }}
              >
                +90
              </motion.div>
            );
          })()}

          {/* Mini-cards flying from connectors to nodes */}
          {MINI_CARDS.map((card, ci) => {
            const from = connPos(card.appIdx, N_CONN);
            const to = NODES[card.targetNode];
            const delay = CARD_STAGGER_START + ci * CARD_STAGGER_GAP;
            return (
              <motion.div
                key={`mc${ci}`}
                className="idx-mini-card"
                initial={{
                  left: `${(from.x / VW) * 100}%`,
                  top: `${(from.y / VH) * 100}%`,
                  opacity: 0,
                  scale: 1,
                }}
                animate={{
                  left: [`${(from.x / VW) * 100}%`, `${(to.x / VW) * 100}%`],
                  top: [`${(from.y / VH) * 100}%`, `${(to.y / VH) * 100}%`],
                  opacity: [0, 1, 1, 0],
                  scale: [1, 1, 0.6, 0],
                }}
                transition={{
                  delay,
                  duration: CARD_FLY_DURATION,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.15, 0.75, 1],
                }}
              >
                <span className="idx-mini-card-emoji">{card.emoji}</span>
                <span className="idx-mini-card-label">{card.label}</span>
              </motion.div>
            );
          })}

          {/* Node labels and signal badges are now rendered in the SVG layer above */}

          {/* Query search prompt — Phase 5 */}
          {phase >= 5 && (
            <motion.div
              className="idx-search-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="idx-search-icon">🔍</span>
              <span className="idx-search-text">
                What's the status of the Acme onboarding rollout?
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Index foundation strip — appears in Phase 5 query time */}
      <motion.div
        className="idx-foundation"
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={phase >= 5 ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.3 }}
        transition={{ duration: 0.8, delay: phase >= 5 ? 2.0 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="idx-foundation-label">Query the graph, not 100+ apps</span>
      </motion.div>

      {/* Bottom bar: captions left, legend right */}
      <div className="idx-bottom-bar">
        <div className="idx-captions">
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                key="cap1"
                className="idx-caption"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: phase >= 4 ? 0.35 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                100+ connectors &rarr; one unified graph
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="cap2"
                className="idx-caption"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: phase >= 4 ? 0.35 : 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: phase === 2 ? BADGES.length * BADGE_STAGGER + 0.3 : 0, duration: 0.5, ease: 'easeOut' }}
              >
                60+ enterprise signals power every ranking
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="idx-legend"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: EDGE_DRAW_START + EDGES.length * EDGE_STAGGER + 0.3, duration: 0.5 }}
        >
          {(Object.keys(TYPE_COLORS) as NodeType[]).map(type => (
            <div key={type} className="idx-legend-item">
              <span className="idx-legend-dot" style={{ background: TYPE_COLORS[type] }} />
              <span>{TYPE_LABELS[type]}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
