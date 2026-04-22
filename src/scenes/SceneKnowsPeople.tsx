import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGOS } from '../logos';

/* ═══════════════════════════════════════════════
   Team definitions
   ═══════════════════════════════════════════════ */

const TEAMS = {
  CS: { color: '#3FA3FF', label: 'CS' },
  SE: { color: '#E16BFF', label: 'SE' },
  PM: { color: '#D8FD49', label: 'PM' },
  ENG: { color: '#FF7E4C', label: 'Eng' },
  EXEC: { color: '#FFAC8C', label: 'Exec' },
} as const;

type TeamKey = keyof typeof TEAMS;

/* ═══════════════════════════════════════════════
   Org chart nodes — hierarchical tree layout
   Row 0 = top exec, rows cascade down
   ═══════════════════════════════════════════════ */

interface OrgNode {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  team: TeamKey;
  cx: number;
  cy: number;
  parentId?: string;
}

const ORG_NODES: OrgNode[] = [
  // Row 0 — exec
  { id: 'rachel', name: 'Rachel', role: 'VP of Sales', avatar: '/vp.png', initials: 'RT', team: 'EXEC', cx: 50, cy: 8 },

  // Row 1 — directors / senior managers
  { id: 'jane', name: 'Jane', role: 'Dir, Accounts', avatar: '/woman1.avif', initials: 'JS', team: 'EXEC', cx: 25, cy: 26, parentId: 'rachel' },
  { id: 'tom', name: 'Tom', role: 'Dir, Engineering', avatar: '/male1.jpg', initials: 'TH', team: 'ENG', cx: 50, cy: 26, parentId: 'rachel' },
  { id: 'david', name: 'David', role: 'Product Manager', avatar: '/ae.jpg', initials: 'DP', team: 'PM', cx: 75, cy: 26, parentId: 'rachel' },

  // Row 2 — ICs under Jane (CS / SE)
  { id: 'sarah', name: 'Sarah', role: 'CSM', avatar: '/csm.png', initials: 'SC', team: 'CS', cx: 12, cy: 46, parentId: 'jane' },
  { id: 'priya', name: 'Priya', role: 'CSM', avatar: '/woman2.avif', initials: 'PK', team: 'CS', cx: 27, cy: 46, parentId: 'jane' },
  { id: 'mark', name: 'Mark', role: 'SE', avatar: '/other.png', initials: 'MR', team: 'SE', cx: 40, cy: 46, parentId: 'jane' },

  // Row 2 — ICs under Tom (Eng)
  { id: 'dev', name: 'Dev', role: 'Eng Lead', avatar: '/male2.jpg', initials: 'DK', team: 'ENG', cx: 53, cy: 46, parentId: 'tom' },
  { id: 'leo', name: 'Leo', role: 'Engineer', avatar: '/male3.webp', initials: 'LT', team: 'ENG', cx: 65, cy: 46, parentId: 'tom' },

  // Row 2 — ICs under David (PM)
  { id: 'nina', name: 'Nina', role: 'PM', avatar: '/woman3.jpg', initials: 'NW', team: 'PM', cx: 78, cy: 46, parentId: 'david' },
  { id: 'rina', name: 'Rina', role: 'SE', avatar: '/woman4.webp', initials: 'RS', team: 'SE', cx: 90, cy: 46, parentId: 'david' },

  // Row 3 — extra depth under Sarah (shows Glean sees deep)
  { id: 'kai', name: 'Kai', role: 'CSM', avatar: '/male4.jpg', initials: 'KL', team: 'CS', cx: 12, cy: 64, parentId: 'sarah' },
];

const NODE_MAP = new Map(ORG_NODES.map(n => [n.id, n]));

/* ═══════════════════════════════════════════════
   Collaboration edges (informal, overlaid on org)
   ═══════════════════════════════════════════════ */

const EDGE_TYPES = [
  { type: 'co-edit', color: '#54D848', label: 'Co-edit' },
  { type: 'meeting', color: '#3FA3FF', label: 'Meeting' },
  { type: 'thread', color: '#E16BFF', label: 'Thread' },
  { type: 'review', color: '#FF7E4C', label: 'Review' },
  { type: 'doc', color: '#B2E5EF', label: 'Doc review' },
] as const;

type EdgeType = typeof EDGE_TYPES[number]['type'];

interface CollabEdge {
  fromId: string;
  toId: string;
  type: EdgeType;
  strength: number;
  weak?: boolean;
}

const COLLAB_EDGES: CollabEdge[] = [
  { fromId: 'sarah', toId: 'dev', type: 'co-edit', strength: 2 },
  { fromId: 'sarah', toId: 'rachel', type: 'meeting', strength: 2 },
  { fromId: 'dev', toId: 'david', type: 'review', strength: 2 },
  { fromId: 'mark', toId: 'dev', type: 'thread', strength: 1 },
  { fromId: 'priya', toId: 'rina', type: 'thread', strength: 1, weak: true },
  { fromId: 'kai', toId: 'leo', type: 'doc', strength: 1, weak: true },
];

/* ═══════════════════════════════════════════════
   Recommended people + signals
   ═══════════════════════════════════════════════ */

const RECOMMENDED = [
  { id: 'sarah', name: 'Sarah', role: 'Customer Success Manager', avatar: '/csm.png', reason: 'Account owner, led last 3 QBRs' },
  { id: 'dev', name: 'Dev', role: 'Engineering Lead', avatar: '/male2.jpg', reason: 'Deployed their instance, resolved P1 last month' },
  { id: 'rachel', name: 'Rachel', role: 'VP of Sales', avatar: '/vp.png', reason: 'Exec sponsor, signed the original deal' },
  { id: 'david', name: 'David', role: 'Product Manager', avatar: '/ae.jpg', reason: 'Owns retention features, built the save playbook' },
];

const RECOMMENDED_IDS = new Set(RECOMMENDED.map(p => p.id));

const SIGNALS = [
  { type: 'Reviewer gravity', example: 'Pulled into 8/10 renewal saves this year' },
  { type: 'Expertise magnet', example: 'Tagged in 23 Atlas-related threads' },
  { type: 'Recurring pairs', example: 'Co-edits with CSM weekly' },
  { type: 'Meeting overlap', example: 'Same 4 recurring calls' },
  { type: 'Ownership signal', example: 'Listed as DRI on linked OKR' },
  { type: 'Behavioral similarity', example: 'Same workflow pattern as peer CSMs' },
];

const RECOMMENDATION_TEXT =
  'Sarah and Dev have the deepest recent engagement with Atlas Group across support, engineering, and QBR cycles. Rachel provides exec air cover and signed the original deal. David built the retention playbook that mirrors this save pattern. Together they cover account ownership, technical depth, exec sponsorship, and product expertise.';

/* ═══════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════ */

function edgeTypeIndex(type: EdgeType): number {
  return EDGE_TYPES.findIndex(e => e.type === type);
}

function edgeColor(type: EdgeType): string {
  return EDGE_TYPES.find(e => e.type === type)?.color ?? '#888';
}

/* ═══════════════════════════════════════════════
   Left panel: Glean Assistant
   ═══════════════════════════════════════════════ */

function AssistantPanel({ phase }: { phase: number }) {
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const showList = phase >= 3;

  return (
    <motion.div
      className="kd-assistant"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kd-assistant-header">
        <img src={LOGOS.glean} alt="Glean" className="kd-assistant-logo" />
        <span className="kd-assistant-title">Glean Assistant</span>
        <span className="material-symbols-rounded kd-assistant-sparkle">auto_awesome</span>
      </div>

      <div className="kd-query-bar">
        <span className="material-symbols-rounded kd-query-icon">search</span>
        <motion.span
          className="kd-query-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Who should I pull in for the Atlas Group renewal save plan?
        </motion.span>
        {showCursor && <span className="cursor-blink">|</span>}
      </div>

      <div className="kd-stream-area">
        {showList && (
          <>
            <motion.div
              className="kd-stream-subheading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Recommended Team
            </motion.div>

            {RECOMMENDED.map((person, i) => (
              <motion.div
                key={person.id}
                className="kpe-person-row"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.35 }}
              >
                <span className="kpe-rank-pill">{i + 1}</span>
                <img src={person.avatar} alt={person.name} className="kpe-person-avatar" />
                <div className="kpe-person-info">
                  <span className="kpe-person-name">{person.name}</span>
                  <span className="kpe-person-role">{person.role}</span>
                </div>
                <span className="kpe-person-reason">{person.reason}</span>
              </motion.div>
            ))}

            <motion.div className="kd-stream-spacer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />

            <motion.div
              className="kd-stream-subheading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >
              Why These People
            </motion.div>
            <motion.div
              className="kd-stream-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              {RECOMMENDATION_TEXT}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Org chart node (SVG)
   ═══════════════════════════════════════════════ */

function OrgChartNode({ node, highlighted, phase }: {
  node: OrgNode;
  highlighted: boolean;
  phase: number;
}) {
  const teamColor = TEAMS[node.team].color;
  const r = highlighted ? 3.8 : 2.8;
  const showGlow = highlighted && phase >= 3;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{
        opacity: 1,
        scale: showGlow ? 1.15 : 1,
      }}
      transition={{
        opacity: { delay: 0.5, duration: 0.4 },
        scale: { delay: showGlow ? 0 : 0.5, duration: 0.5, type: 'spring', stiffness: 200, damping: 18 },
      }}
    >
      {showGlow && (
        <motion.circle
          cx={node.cx} cy={node.cy} r={r + 2}
          fill="none"
          stroke={teamColor}
          strokeWidth={0.3}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <circle
        cx={node.cx} cy={node.cy} r={r + 0.5}
        fill="none" stroke={teamColor}
        strokeWidth={highlighted ? 0.5 : 0.3}
        opacity={highlighted ? 0.8 : 0.35}
      />

      {node.avatar ? (
        <>
          <defs>
            <clipPath id={`org-clip-${node.id}`}>
              <circle cx={node.cx} cy={node.cy} r={r} />
            </clipPath>
          </defs>
          <image
            href={node.avatar}
            x={node.cx - r} y={node.cy - r}
            width={r * 2} height={r * 2}
            clipPath={`url(#org-clip-${node.id})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      ) : (
        <>
          <circle cx={node.cx} cy={node.cy} r={r} fill={`color-mix(in srgb, ${teamColor} 20%, #0a0a1a)`} />
          <text
            x={node.cx} y={node.cy}
            textAnchor="middle" dominantBaseline="central"
            fill="rgba(255,255,255,0.65)" fontSize="2.4" fontWeight="700"
            fontFamily="DM Sans, sans-serif"
          >
            {node.initials}
          </text>
        </>
      )}

      <text
        x={node.cx} y={node.cy + r + 2.2}
        textAnchor="middle" fill="rgba(255,255,255,0.55)"
        fontSize="2.2" fontFamily="DM Sans, sans-serif" fontWeight="600"
      >
        {node.name}
      </text>
      <text
        x={node.cx} y={node.cy + r + 4.4}
        textAnchor="middle" fill="rgba(255,255,255,0.25)"
        fontSize="1.7" fontFamily="DM Sans, sans-serif" fontWeight="400"
      >
        {node.role}
      </text>
    </motion.g>
  );
}

/* ═══════════════════════════════════════════════
   Org chart — hierarchical tree + collab overlays
   ═══════════════════════════════════════════════ */

function OrgChart({ phase }: { phase: number }) {
  return (
    <div className="kpe-graph-wrap">
      <motion.div
        className="kp-lanes-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.33 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>account_tree</span>
        How your org collaborates
      </motion.div>

      <svg className="kpe-graph-svg" viewBox="0 0 100 72" preserveAspectRatio="xMidYMid meet">
        {/* Org hierarchy lines (always visible, subtle) */}
        {ORG_NODES.filter(n => n.parentId).map((node) => {
          const parent = NODE_MAP.get(node.parentId!);
          if (!parent) return null;
          const midY = (parent.cy + node.cy) / 2;
          return (
            <motion.path
              key={`org-${node.id}`}
              d={`M${parent.cx},${parent.cy + 3.5} L${parent.cx},${midY} L${node.cx},${midY} L${node.cx},${node.cy - 3.5}`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            />
          );
        })}

        {/* Collaboration signal edges (animated by type) */}
        {COLLAB_EDGES.map((edge, i) => {
          const from = NODE_MAP.get(edge.fromId);
          const to = NODE_MAP.get(edge.toId);
          if (!from || !to) return null;

          const typeIdx = edgeTypeIndex(edge.type);
          const visible = phase >= 1 && typeIdx <= phase + 1;
          const touchesRecommended = RECOMMENDED_IDS.has(edge.fromId) || RECOMMENDED_IDS.has(edge.toId);
          const brightened = touchesRecommended && phase >= 3;

          const mx = (from.cx + to.cx) / 2;
          const my = (from.cy + to.cy) / 2 - 3;
          const d = `M${from.cx},${from.cy} Q${mx},${my} ${to.cx},${to.cy}`;

          return (
            <motion.path
              key={`collab-${i}`}
              d={d}
              fill="none"
              stroke={edgeColor(edge.type)}
              strokeWidth={edge.strength * 0.2}
              strokeDasharray={edge.weak ? '1.2 0.8' : 'none'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: visible ? 1 : 0,
                opacity: visible ? (brightened ? 0.55 : 0.18) : 0,
              }}
              transition={{
                pathLength: { delay: 0.8 + typeIdx * 0.6 + i * 0.04, duration: 0.6, ease: 'easeOut' },
                opacity: { delay: 0.8 + typeIdx * 0.6 + i * 0.04, duration: 0.4 },
              }}
            />
          );
        })}

        {/* Org nodes */}
        {ORG_NODES.map((node) => (
          <OrgChartNode
            key={node.id}
            node={node}
            highlighted={RECOMMENDED_IDS.has(node.id)}
            phase={phase}
          />
        ))}
      </svg>

      <motion.div
        className="kpe-legend"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        <span className="kpe-legend-item">
          <span className="kpe-legend-swatch" style={{ background: 'rgba(255,255,255,0.12)' }} />
          Reports to
        </span>
        {EDGE_TYPES.map(e => (
          <span key={e.type} className="kpe-legend-item">
            <span className="kpe-legend-swatch" style={{ background: e.color, opacity: e.type === 'doc' ? 0.5 : 1 }} />
            {e.label}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Infer label (middle callout)
   ═══════════════════════════════════════════════ */

function InferLabel({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="kp-observe-label"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.44 }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>auto_awesome</span>
      Glean infers relationships
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Signals panel (bottom)
   ═══════════════════════════════════════════════ */

function SignalsPanel({ visible }: { visible: boolean }) {
  if (!visible) return null;
  const half = Math.ceil(SIGNALS.length / 2);
  const left = SIGNALS.slice(0, half);
  const right = SIGNALS.slice(half);

  return (
    <motion.div
      className="kd-risk-panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {[left, right].map((col, ci) => (
        <div key={ci} className="kd-risk-section">
          {ci === 0 && (
            <div className="kd-risk-header kpe-signals-header">
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>sensors</span>
              Signals behind the inference
            </div>
          )}
          {ci === 1 && (
            <div className="kd-risk-header kpe-signals-header" style={{ visibility: 'hidden' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>sensors</span>
              &nbsp;
            </div>
          )}
          {col.map((sig, i) => (
            <motion.div
              key={i}
              className="kpe-signal-row"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (ci * half + i) * 0.15, duration: 0.3 }}
            >
              <span className="kpe-signal-type">{sig.type}</span>
              <span className="kpe-signal-example">{sig.example}</span>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main scene export
   ═══════════════════════════════════════════════ */

export function SceneKnowsPeople() {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const t2 = setTimeout(() => setPhase(2), 3500);
    const t3 = setTimeout(() => setPhase(3), 5000);
    const t4 = setTimeout(() => setPhase(4), 7000);
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="scene kd-scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Beyond Search
      </motion.div>

      <motion.h2
        className="kd-headline"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        Knows Your <span className="final-highlight">People</span>
      </motion.h2>

      <motion.p
        className="kd-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        Learns how your org actually collaborates so the right people and context show up automatically.
      </motion.p>

      <div className="kpe-content">
        <div className="kd-split kpe-split-top">
          <AssistantPanel phase={phase} />
          <motion.div
            className="kd-data-panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <OrgChart phase={phase} />
          </motion.div>
        </div>
        <InferLabel visible={phase >= 2} />
        <SignalsPanel visible={phase >= 4} />
      </div>
    </div>
  );
}
