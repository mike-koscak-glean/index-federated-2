import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const HOSTS = [
  { label: 'Cursor IDE', icon: 'code' },
  { label: 'Slack Bot', icon: 'forum' },
  { label: 'Desktop Agent', icon: 'desktop_windows' },
  { label: 'Custom App', icon: 'apps' },
  { label: 'Internal Tools', icon: 'dashboard' },
];

const GW = 520;
const GH = 240;

const PRIMARY = [
  { id: 'people',  label: 'People',  hex: '#3FA3FF', cx: 137, cy: 62  },
  { id: 'content', label: 'Content', hex: '#D8FD49', cx: 384, cy: 62  },
  { id: 'process', label: 'Process', hex: '#E16BFF', cx: 260, cy: 158 },
];

const SECONDARY = [
  { label: 'Setup',      cx: 58,  cy: 118 },
  { label: 'Pipeline',   cx: 463, cy: 118 },
  { label: 'Onboarding', cx: 79,  cy: 195 },
  { label: 'Support',    cx: 441, cy: 187 },
  { label: 'Review',     cx: 260, cy: 216 },
  { label: 'Tickets',    cx: 473, cy: 36  },
  { label: 'Compliance', cx: 158, cy: 213 },
];

const P_EDGES: [number, number][] = [[0, 1], [1, 2], [0, 2]];
const S_EDGES: [number, number][] = [
  [0, 0], [1, 1], [0, 2], [1, 3], [2, 4],
  [1, 5], [2, 6], [2, 2], [0, 4],
];

const SYSTEMS = [
  { logo: LOGOS.salesforce,  name: 'Salesforce' },
  { logo: LOGOS.jira,        name: 'Jira' },
  { logo: LOGOS.gdrive,      name: 'Drive' },
  { logo: LOGOS.confluence,  name: 'Confluence' },
  { logo: LOGOS.servicenow,  name: 'ServiceNow' },
  { logo: LOGOS.gmail,       name: 'Gmail' },
  { logo: LOGOS.gong,        name: 'Gong' },
  { logo: LOGOS.sharepoint,  name: 'SharePoint' },
  { logo: LOGOS.teams,       name: 'Teams' },
  { logo: LOGOS.outlook,     name: 'Outlook' },
  { logo: LOGOS.tableau,     name: 'Tableau' },
];

const INFRA = [
  { x: 8,  y: 10, icon: 'cloud',               op: 0.55 },
  { x: 28, y: 6,  icon: 'storage',              op: 0.48 },
  { x: 48, y: 14, icon: 'security',             op: 0.52 },
  { x: 68, y: 8,  icon: 'lock',                 op: 0.5  },
  { x: 88, y: 12, icon: 'cable',                op: 0.48 },
  { x: 6,  y: 32, icon: 'dns',                  op: 0.52 },
  { x: 22, y: 28, icon: 'lan',                  op: 0.55 },
  { x: 40, y: 34, icon: 'hub',                  op: 0.52 },
  { x: 58, y: 30, icon: 'device_hub',           op: 0.48 },
  { x: 76, y: 34, icon: 'account_tree',         op: 0.52 },
  { x: 92, y: 30, icon: 'settings_ethernet',    op: 0.55 },
  { x: 14, y: 54, icon: 'router',               op: 0.48 },
  { x: 34, y: 52, icon: 'sync',                 op: 0.55 },
  { x: 52, y: 56, icon: 'swap_horiz',           op: 0.52 },
  { x: 72, y: 52, icon: 'api',                  op: 0.55 },
  { x: 90, y: 56, icon: 'dataset',              op: 0.48 },
  { x: 18, y: 76, icon: 'policy',               op: 0.52 },
  { x: 42, y: 74, icon: 'admin_panel_settings', op: 0.55 },
  { x: 62, y: 78, icon: 'share',                op: 0.48 },
  { x: 82, y: 74, icon: 'folder_shared',        op: 0.52 },
];

const INFRA_LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [11, 12], [12, 13], [13, 14], [14, 15],
  [16, 17], [17, 18], [18, 19],
  [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
  [5, 11], [6, 12], [7, 13], [8, 14], [9, 15],
  [11, 16], [12, 17], [13, 18], [14, 19],
  [0, 6], [2, 8], [4, 10], [5, 12], [7, 14],
  [1, 7], [3, 9], [6, 13], [8, 15],
  [10, 15], [15, 19],
];

const INFRA_LABELS_DATA = [
  { text: 'ACLs',        x: 18, y: 42 },
  { text: 'Signals',     x: 50, y: 22 },
  { text: 'Ranking',     x: 80, y: 44 },
  { text: 'Connectors',  x: 28, y: 65 },
  { text: 'Permissions', x: 65, y: 66 },
];

export function Scene6() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        MCP + Glean: Better Together
      </motion.div>

      <div className="arch6-container">
        {/* ===== LEFT PANEL — Architecture Stack ===== */}
        <div className="arch6-left">
          <div className="arch6-hosts">
            {HOSTS.map((h, i) => (
              <motion.div
                key={h.label}
                className="arch6-host"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>
                  {h.icon}
                </span>
                <span className="arch6-host-label">{h.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Connection lines from hosts down to MCP bar */}
          <svg className="arch6-conn-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {HOSTS.map((_, i) => {
              const x = 10 + i * 20;
              return (
                <motion.line
                  key={i}
                  x1={x} y1={0} x2={50} y2={100}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={0.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                />
              );
            })}
            {HOSTS.map((_, i) => {
              const x1 = 10 + i * 20;
              return (
                <motion.circle
                  key={`d${i}`}
                  r={2}
                  fill="#D8FD49"
                  animate={{
                    cx: [x1, 50],
                    cy: [0, 100],
                    opacity: [0, 0.8, 0.8, 0],
                  }}
                  transition={{
                    delay: 1.4 + i * 0.3,
                    duration: 1.0,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 3 + i * 0.5,
                  }}
                />
              );
            })}
          </svg>

          <motion.div
            className="arch6-mcp-bar"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            MCP / Actions Layer
          </motion.div>

          {/* Flow pipe: MCP bar → Graph */}
          <svg className="arch6-pipe-svg" viewBox="0 0 20 28" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="pipeGrad6" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D8FD49" />
                <stop offset="100%" stopColor="#3FA3FF" />
              </linearGradient>
            </defs>
            <motion.line
              x1={10} y1={0} x2={10} y2={28}
              stroke="url(#pipeGrad6)"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
            />
            {[0, 1, 2].map(j => (
              <motion.circle
                key={j}
                cx={10} r={2.5}
                fill="#D8FD49"
                animate={{ cy: [0, 28], opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: 1.6 + j * 0.7,
                  duration: 0.6,
                  ease: 'easeIn',
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              />
            ))}
          </svg>

          {/* Enterprise Graph Card */}
          <motion.div
            className="arch6-graph-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="arch6-graph-title">
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'var(--glean-mid-blue)' }}>hub</span>
              <span>Enterprise Graph</span>
            </div>

            <svg className="arch6-graph-svg" viewBox={`0 0 ${GW} ${GH}`} preserveAspectRatio="xMidYMid meet">
              <defs>
                {PRIMARY.map(n => (
                  <radialGradient key={n.id} id={`a6g-${n.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={n.hex} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={n.hex} stopOpacity={0.08} />
                  </radialGradient>
                ))}
              </defs>

              {/* Secondary edges */}
              {S_EDGES.map(([pi, si], i) => (
                <motion.line
                  key={`se${i}`}
                  x1={PRIMARY[pi].cx} y1={PRIMARY[pi].cy}
                  x2={SECONDARY[si].cx} y2={SECONDARY[si].cy}
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.4 + i * 0.08, duration: 0.5 }}
                />
              ))}

              {/* Primary edges — triangle */}
              {P_EDGES.map(([a, b], i) => (
                <motion.line
                  key={`pe${i}`}
                  x1={PRIMARY[a].cx} y1={PRIMARY[a].cy}
                  x2={PRIMARY[b].cx} y2={PRIMARY[b].cy}
                  stroke="rgba(216,253,73,0.35)"
                  strokeWidth={1.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.1 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                />
              ))}

              {/* Animated dots traveling along primary edges */}
              {P_EDGES.map(([a, b], i) => (
                <motion.circle
                  key={`ed${i}`}
                  r={2.5}
                  fill="#D8FD49"
                  animate={{
                    cx: [PRIMARY[a].cx, PRIMARY[b].cx],
                    cy: [PRIMARY[a].cy, PRIMARY[b].cy],
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    delay: 2.8 + i * 0.7,
                    duration: 2.0,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: 1.5 + i * 0.3,
                  }}
                />
              ))}

              {/* Idle edge pulses */}
              {P_EDGES.map(([a, b], i) => (
                <motion.line
                  key={`ep${i}`}
                  x1={PRIMARY[a].cx} y1={PRIMARY[a].cy}
                  x2={PRIMARY[b].cx} y2={PRIMARY[b].cy}
                  stroke="rgba(216,253,73,0.12)"
                  strokeWidth={3}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{
                    delay: 3.5 + i * 0.5,
                    duration: 2.5,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 3 + i,
                  }}
                />
              ))}

              {/* Secondary nodes */}
              {SECONDARY.map((n, i) => (
                <motion.g key={`sn${i}`}>
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={8}
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth={1}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.3 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}
                  />
                  <motion.text
                    x={n.cx} y={n.cy + 16}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.65)"
                    fontSize={7}
                    fontWeight={500}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 + i * 0.1 }}
                  >
                    {n.label}
                  </motion.text>
                </motion.g>
              ))}

              {/* Primary nodes — larger double-ring treatment */}
              {PRIMARY.map((n, i) => (
                <motion.g key={n.id}>
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={30}
                    fill={`url(#a6g-${n.id})`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}
                  />
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={24}
                    fill="none"
                    stroke={n.hex}
                    strokeWidth={1}
                    strokeOpacity={0.25}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.85 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}
                  />
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={17}
                    fill="rgba(13,16,87,0.9)"
                    stroke={n.hex}
                    strokeWidth={1.5}
                    strokeOpacity={0.7}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.9 + i * 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` } as React.CSSProperties}
                  />
                  <motion.circle
                    cx={n.cx} cy={n.cy} r={13}
                    fill={n.hex}
                    fillOpacity={0.15}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 + i * 0.15 }}
                  />
                  {/* Badge pill label */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.1 + i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy + 38}px` } as React.CSSProperties}
                  >
                    <rect
                      x={n.cx - (n.label.length * 3.5 + 8)}
                      y={n.cy + 28}
                      width={n.label.length * 7 + 16}
                      height={18}
                      rx={9}
                      fill={`${n.hex}30`}
                      stroke={`${n.hex}50`}
                      strokeWidth={1}
                    />
                    <text
                      x={n.cx} y={n.cy + 39}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={n.hex}
                      fontSize={9}
                      fontWeight={700}
                    >
                      {n.label}
                    </text>
                  </motion.g>
                </motion.g>
              ))}

              {/* ACL badge near Onboarding / Compliance */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6, type: 'spring', stiffness: 250, damping: 20 }}
                style={{ transformOrigin: '118px 201px' } as React.CSSProperties}
              >
                <rect x={85} y={192} width={66} height={18} rx={9}
                  fill="rgba(225,107,255,0.22)" stroke="rgba(225,107,255,0.45)" strokeWidth={1} />
                <text x={118} y={203} textAnchor="middle" dominantBaseline="central"
                  fill="#E16BFF" fontSize={8} fontWeight={700}>ACL: Eng</text>
              </motion.g>
            </svg>
          </motion.div>

          {/* System icons below graph — the underlying sources */}
          <motion.div
            className="arch6-systems"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.5 }}
          >
            <div className="arch6-systems-label">100+ Enterprise Systems</div>
            <div className="arch6-systems-row">
              {SYSTEMS.map((s, i) => (
                <motion.img
                  key={s.name}
                  src={s.logo}
                  alt={s.name}
                  className="app-icon-sm"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  transition={{ delay: 2.8 + i * 0.06, duration: 0.3 }}
                />
              ))}
              <motion.span
                className="arch6-systems-more"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 3.3 }}
              >
                +90+
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Vertical gradient divider */}
        <div className="arch6-divider" />

        {/* ===== RIGHT PANEL — Outlet Metaphor ===== */}
        <div className="arch6-right">
          {/* Above the wall: calm, spacious */}
          <div className="arch6-above">
            <motion.div
              className="arch6-above-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Any MCP Host
            </motion.div>

            <div className="arch6-plug-area">
              <motion.div
                className="arch6-cord"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
              >
                <motion.div
                  className="arch6-cord-pulse"
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ delay: 1.2, duration: 1.8, ease: 'easeIn', repeat: Infinity, repeatDelay: 1.2 }}
                />
              </motion.div>

              <motion.div
                className="arch6-plug-head"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="arch6-prong" />
                <div className="arch6-prong" />
              </motion.div>
            </div>

            <motion.div
              className="arch6-outlet"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="arch6-outlet-slots">
                <div className="arch6-slot" />
                <div className="arch6-slot" />
              </div>
              <div className="arch6-ground-slot" />
              <motion.div
                className="arch6-power-led"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.div
              className="arch6-iface-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Standard Interface
            </motion.div>
          </div>

          {/* Wall divider */}
          <div className="arch6-wall">
            <div className="arch6-wall-line" />
            <span className="arch6-wall-text">Behind the Wall</span>
          </div>

          {/* Below the wall: dense infrastructure tangle */}
          <div className="arch6-below">
            <div className="arch6-tangle">
              <svg className="arch6-tangle-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                {INFRA_LINES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={INFRA[a].x} y1={INFRA[a].y}
                    x2={INFRA[b].x} y2={INFRA[b].y}
                    stroke="rgba(200,220,255,0.18)"
                    strokeWidth={0.5}
                  />
                ))}
                {[0, 10, 20, 30].map((li, i) => {
                  if (li >= INFRA_LINES.length) return null;
                  const [a, b] = INFRA_LINES[li];
                  return (
                    <motion.circle
                      key={`td${i}`}
                      r={0.8}
                      fill="#3FA3FF"
                      animate={{
                        cx: [INFRA[a].x, INFRA[b].x],
                        cy: [INFRA[a].y, INFRA[b].y],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        delay: 2.2 + i * 1.5,
                        duration: 3,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatDelay: 2 + i,
                      }}
                    />
                  );
                })}
              </svg>

              {INFRA.map((item, i) => (
                <motion.div
                  key={i}
                  className="arch6-infra-icon"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: item.op }}
                  transition={{ delay: 2.0 + i * 0.04, duration: 0.3 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{item.icon}</span>
                </motion.div>
              ))}

              {INFRA_LABELS_DATA.map((l, i) => (
                <motion.div
                  key={i}
                  className="arch6-tangle-label"
                  style={{ left: `${l.x}%`, top: `${l.y}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 2.4 + i * 0.15 }}
                >
                  {l.text}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="arch6-index-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 2.8 }}
            >
              The Glean Index
            </motion.div>

            <motion.div
              className="arch6-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            >
              <span>You don&rsquo;t think about the grid.</span>
              <span>You just <strong>plug in</strong> — and it works.</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="arch6-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <span>100+ connectors &rarr; one unified graph</span>
        <span>60+ enterprise signals power every ranking</span>
      </motion.div>
    </div>
  );
}
