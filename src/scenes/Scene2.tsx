import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CX = 400;
const CY = 250;
const CONN_R = 200;
const VW = 800;
const VH = 500;

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

const RINGS = [
  { label: 'Content', r: 52, color: 'rgba(140,160,255,0.4)', angle: 20 },
  { label: 'ACLs', r: 70, color: 'rgba(216,253,73,0.3)', angle: 110 },
  { label: 'People', r: 88, color: 'rgba(110,207,246,0.3)', angle: 205 },
  { label: 'Activity', r: 106, color: 'rgba(255,184,108,0.3)', angle: 295 },
];

const PCOL = ['#8ba0ff', '#D8FD49', '#6ecff6', '#ffb86c'];

const NODES = [
  { label: 'Acme Corp', x: 495, y: 158 },
  { label: 'Sales Team', x: 280, y: 178 },
  { label: 'Q4 Pipeline', x: 518, y: 290 },
  { label: 'Support', x: 475, y: 372 },
  { label: 'Engineering', x: 290, y: 338 },
  { label: 'Onboarding', x: 378, y: 398 },
];

const EDGES: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 3], [3, 5], [4, 5]];

const BADGES = [
  { nodeIdx: 0, text: 'Owner: J. Smith' },
  { nodeIdx: 1, text: 'Viewed 124\u00d7' },
  { nodeIdx: 2, text: 'Recent' },
  { nodeIdx: 3, text: 'Team: Sales' },
];

const N_CONN = APPS.length + 1;

function cPos(i: number) {
  const a = (i / N_CONN) * Math.PI * 2 - Math.PI / 2;
  return { x: CX + CONN_R * Math.cos(a), y: CY + CONN_R * Math.sin(a) };
}

function pct(x: number, y: number): React.CSSProperties {
  return { left: `${(x / VW) * 100}%`, top: `${(y / VH) * 100}%` };
}

export function Scene2() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        The Glean Index
      </motion.div>

      <div className="idx-radial">
        {/* SVG layer: rings, particles, graph edges/nodes, pulses */}
        <svg
          className="idx-radial-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="eGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#343CED" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#D8FD49" stopOpacity={0.6} />
            </linearGradient>
            <radialGradient id="cGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#343CED" stopOpacity={0.3} />
              <stop offset="60%" stopColor="#343CED" stopOpacity={0.08} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Breathing core glow */}
          <motion.circle
            cx={CX} cy={CY} r={45}
            fill="url(#cGlow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ delay: 0.5, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Concentric layer rings with flowing dashes */}
          {RINGS.map((ring, i) => (
            <motion.circle
              key={`r${i}`}
              cx={CX} cy={CY} r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth={0.8}
              strokeDasharray={`${ring.r * 0.22} ${ring.r * 0.11}`}
              className={`idx-ring idx-ring-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 + i * 0.18, duration: 0.6 }}
            />
          ))}

          {/* Particle streams from each connector toward center */}
          {APPS.map((_, ci) => {
            const p = cPos(ci);
            return [0, 1].map(pi => (
              <motion.circle
                key={`pt${ci}-${pi}`}
                r={1.8}
                fill={PCOL[ci % 4]}
                initial={{ cx: p.x, cy: p.y, opacity: 0 }}
                animate={{
                  cx: [p.x, CX],
                  cy: [p.y, CY],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  delay: 1.5 + ci * 0.1 + pi * 1.0,
                  duration: 2.2,
                  ease: 'easeIn',
                  repeat: Infinity,
                  repeatDelay: 1.0 + pi * 0.6,
                }}
              />
            ));
          })}

          {/* Graph edges drawn after nodes emerge */}
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`e${i}`}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="url(#eGrad)"
              strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 4.2 + i * 0.1, duration: 0.5 }}
            />
          ))}

          {/* Neural pulses traveling along edges */}
          {EDGES.map(([a, b], i) => (
            <motion.circle
              key={`np${i}`}
              r={2.2}
              fill="#D8FD49"
              initial={{ opacity: 0 }}
              animate={{
                cx: [NODES[a].x, NODES[b].x],
                cy: [NODES[a].y, NODES[b].y],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                delay: 5.0 + i * 0.3,
                duration: 1.4,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 2.0 + (i % 3) * 0.5,
                times: [0, 0.1, 0.9, 1],
              }}
            />
          ))}

          {/* Graph nodes — emerge outward from center */}
          {NODES.map((n, i) => (
            <motion.g key={`gn${i}`}>
              <motion.circle
                r={14}
                fill="rgba(52,60,237,0.2)"
                initial={{ cx: CX, cy: CY, opacity: 0 }}
                animate={{ cx: n.x, cy: n.y, opacity: 0.8 }}
                transition={{ delay: 3.5 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                r={8}
                fill="rgba(52,60,237,0.65)"
                stroke="rgba(216,253,73,0.45)"
                strokeWidth={0.8}
                initial={{ cx: CX, cy: CY, opacity: 0 }}
                animate={{ cx: n.x, cy: n.y, opacity: 1 }}
                transition={{ delay: 3.5 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.g>
          ))}
        </svg>

        {/* HTML overlay layer for text and logos */}
        <div className="idx-radial-over">
          {/* Connector app logos arranged in a ring */}
          {APPS.map((app, i) => {
            const p = cPos(i);
            return (
              <motion.div
                key={app.name}
                className="idx-conn"
                style={pct(p.x, p.y)}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <img src={app.logo} alt={app.name} className="app-icon-sm" />
              </motion.div>
            );
          })}

          {/* "+90 more" indicator */}
          <motion.div
            className="idx-conn idx-conn-more"
            style={pct(cPos(APPS.length).x, cPos(APPS.length).y)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            +90
          </motion.div>

          {/* Layer ring labels positioned along each ring */}
          {RINGS.map((ring, i) => {
            const rad = (ring.angle * Math.PI) / 180;
            return (
              <motion.div
                key={ring.label}
                className="idx-ring-label"
                style={pct(CX + ring.r * Math.cos(rad), CY + ring.r * Math.sin(rad))}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + i * 0.15 }}
              >
                {ring.label}
              </motion.div>
            );
          })}

          {/* Graph node labels */}
          {NODES.map((n, i) => (
            <motion.div
              key={`nl${i}`}
              className="idx-node-label"
              style={pct(n.x, n.y + 16)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.9 + i * 0.1 }}
            >
              {n.label}
            </motion.div>
          ))}

          {/* Enrichment badges near nodes */}
          {BADGES.map((b, i) => {
            const n = NODES[b.nodeIdx];
            return (
              <motion.div
                key={`b${i}`}
                className="idx-badge"
                style={pct(n.x, n.y - 20)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5.6 + i * 0.18, type: 'spring' }}
              >
                {b.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className="callout-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.0 }}
        style={{ alignSelf: 'center' }}
      >
        <div className="callout">
          100+ connectors feed content, permissions, people, and activity into one unified graph.
        </div>
        <div className="callout">
          ML models trained on 60+ enterprise signals rank and connect everything — not generic web relevance.
        </div>
      </motion.div>
    </div>
  );
}
