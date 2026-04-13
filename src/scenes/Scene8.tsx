import { motion } from 'framer-motion';

const GRAPH_NODES = Array.from({ length: 28 }, (_, i) => {
  const ring = i < 10 ? 0 : i < 20 ? 1 : 2;
  const idx = ring === 0 ? i : ring === 1 ? i - 10 : i - 20;
  const count = ring === 0 ? 10 : ring === 1 ? 10 : 8;
  const angle = (idx / count) * Math.PI * 2 + ring * 0.4;
  const r = 12 + ring * 14;
  return {
    cx: 50 + r * Math.cos(angle),
    cy: 50 + r * Math.sin(angle),
    r: 1.0 + Math.random() * 0.7,
    ring,
  };
});

function CenterGraph() {
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  GRAPH_NODES.forEach((a, i) => {
    GRAPH_NODES.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.cx - b.cx, a.cy - b.cy) < 20)
        edges.push({ x1: a.cx, y1: a.cy, x2: b.cx, y2: b.cy });
    });
  });

  return (
    <svg viewBox="0 0 100 100" className="beyond2-graph-svg">
      <defs>
        <radialGradient id="b2glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(52,60,237,0.35)" />
          <stop offset="50%" stopColor="rgba(216,253,73,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="b2edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#343CED" />
          <stop offset="100%" stopColor="#D8FD49" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#b2glow)" />
      {edges.map((e, i) => (
        <motion.line
          key={`e${i}`}
          x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="url(#b2edge)"
          strokeWidth="0.35"
          initial={{ strokeOpacity: 0 }}
          animate={{ strokeOpacity: [0, 0.5, 0.15, 0.45, 0.15] }}
          transition={{
            delay: 0.8 + i * 0.02,
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {GRAPH_NODES.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.cx} cy={n.cy} r={n.r}
          fill={n.ring === 0 ? '#D8FD49' : n.ring === 1 ? '#3FA3FF' : '#E16BFF'}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.85, 0.4, 0.75],
            cx: [n.cx, n.cx + (Math.random() - 0.5) * 2.5, n.cx],
            cy: [n.cy, n.cy + (Math.random() - 0.5) * 2.5, n.cy],
          }}
          transition={{
            delay: 0.8 + i * 0.03,
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

const HUB_CENTER = { x: 50, y: 50 };
const GRAPH_CENTER = HUB_CENTER;

const LINE_TARGETS = {
  top: { x: 50, y: 25 },
  'bottom-left': { x: 22, y: 67 },
  'bottom-right': { x: 78, y: 67 },
};

function ConnectionLine({
  x1, y1, x2, y2, delay,
}: {
  x1: number; y1: number; x2: number; y2: number; delay: number;
}) {
  return (
    <g>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#D8FD49"
        strokeWidth="8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1, opacity: 0 }}
        animate={{
          strokeDashoffset: 0,
          opacity: [0, 0.07, 0.04, 0.07],
        }}
        transition={{
          strokeDashoffset: { delay, duration: 0.7, ease: 'easeOut' },
          opacity: { delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#D8FD49"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1, opacity: 0 }}
        animate={{
          strokeDashoffset: 0,
          opacity: [0, 0.4, 0.22, 0.4],
        }}
        transition={{
          strokeDashoffset: { delay, duration: 0.7, ease: 'easeOut' },
          opacity: { delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
      <motion.circle
        cx={x1}
        cy={y1}
        r="0.9"
        fill="#D8FD49"
        initial={{ opacity: 0 }}
        animate={{
          cx: [x1, x2],
          cy: [y1, y2],
          opacity: [0, 0.95, 0],
        }}
        transition={{
          delay: delay + 0.35,
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: 'easeInOut',
        }}
      />
    </g>
  );
}

function HealthGauge() {
  return (
    <div className="beyond2-micro beyond2-micro-health">
      <div className="beyond2-micro-entity">
        <span className="beyond2-entity-name">Acme Corp</span>
        <span className="beyond2-entity-badge">Enterprise</span>
      </div>
      <div className="beyond2-gauge-row">
        <span className="beyond2-gauge-label">Health</span>
        <div className="beyond2-gauge-track">
          <motion.div
            className="beyond2-gauge-fill"
            initial={{ width: '78%' }}
            animate={{
              width: '62%',
              background: 'linear-gradient(90deg, #FF7E4C, #FFAC8C)',
            }}
            transition={{ delay: 2.4, duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        <div className="beyond2-gauge-value">
          <motion.span
            className="beyond2-gauge-num"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          >
            78
          </motion.span>
          <motion.span
            className="beyond2-gauge-num beyond2-gauge-num-warn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.4 }}
          >
            62
          </motion.span>
        </div>
      </div>
      <motion.div
        className="beyond2-churn-risk"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.2, duration: 0.4 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>warning</span>
        Churn risk detected
      </motion.div>
    </div>
  );
}

const TASKS = [
  { text: 'Draft follow-up email', icon: 'edit_note' },
  { text: 'Update Salesforce opp', icon: 'sync' },
  { text: 'Prep QBR summary', icon: 'summarize' },
];

function TaskCards() {
  return (
    <div className="beyond2-micro beyond2-micro-tasks">
      {TASKS.map((task, i) => (
        <motion.div
          key={i}
          className="beyond2-task-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.8 + i * 0.3, duration: 0.35 }}
        >
          <span className="material-symbols-rounded beyond2-task-icon">{task.icon}</span>
          <span className="beyond2-task-text">{task.text}</span>
          <motion.span
            className="material-symbols-rounded beyond2-task-check"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.1 + i * 0.3, type: 'spring', stiffness: 300, damping: 20 }}
          >
            check_circle
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

const FLOW_NODES = [
  { label: 'Request', status: 'normal' },
  { label: 'Review', status: 'normal' },
  { label: 'Approval', status: 'bottleneck' },
  { label: 'Deploy', status: 'normal' },
  { label: 'Verify', status: 'normal' },
];

function FlowChart() {
  return (
    <div className="beyond2-micro beyond2-micro-flow">
      <div className="beyond2-flow-track">
        {FLOW_NODES.map((node, i) => (
          <motion.div
            key={i}
            className="beyond2-flow-step"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 + i * 0.2, duration: 0.3 }}
          >
            {i > 0 && (
              <motion.div
                className="beyond2-flow-connector"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 3.1 + i * 0.2, duration: 0.25, ease: 'easeOut' }}
              />
            )}
            <motion.div
              className={`beyond2-flow-node ${node.status === 'bottleneck' ? 'beyond2-flow-node-bottleneck' : ''}`}
              animate={
                node.status === 'bottleneck'
                  ? { boxShadow: ['0 0 0px rgba(255,126,76,0)', '0 0 8px rgba(255,126,76,0.4)', '0 0 0px rgba(255,126,76,0)'] }
                  : {}
              }
              transition={node.status === 'bottleneck' ? { delay: 4.2, duration: 1.2, repeat: 2 } : {}}
            >
              {node.label}
            </motion.div>
            {node.status === 'bottleneck' && (
              <motion.div
                className="beyond2-flow-auto-badge"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.6, type: 'spring', stiffness: 250, damping: 18 }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 10 }}>bolt</span>
                automated
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const ZONES = [
  {
    headline: 'Knows Your Data',
    subtitle:
      'Fuses signals across CRM, support, calls, and chat into models that predict churn, score deals, and surface risk before it hits',
    position: 'top' as const,
    delay: 1.8,
    MicroComponent: HealthGauge,
  },
  {
    headline: 'Knows Your People',
    subtitle:
      'Learns your projects, priorities, and patterns based on how you use business apps, then anticipates tasks and acts on your behalf',
    position: 'bottom-right' as const,
    delay: 2.2,
    MicroComponent: TaskCards,
  },
  {
    headline: 'Knows Your Processes',
    subtitle:
      'Discovers how processes actually run across your org so you can have agents automate the way your teams work',
    position: 'bottom-left' as const,
    delay: 2.6,
    MicroComponent: FlowChart,
  },
];

export function Scene8() {
  return (
    <div className="scene beyond2-scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Beyond Search
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ fontSize: 28, maxWidth: 700 }}
      >
        What only the Glean Enterprise Graph makes{' '}
        <span className="final-highlight">possible</span>.
      </motion.h2>

      <div className="beyond2-orbital">
        {/* Connection lines — SVG overlay maps 0-100 to full container */}
        <svg
          className="beyond2-lines-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {ZONES.map((z, i) => {
            const target = LINE_TARGETS[z.position];
            return (
              <ConnectionLine
                key={i}
                x1={GRAPH_CENTER.x}
                y1={GRAPH_CENTER.y}
                x2={target.x}
                y2={target.y}
                delay={z.delay}
              />
            );
          })}
        </svg>

        {/* Center graph hub */}
        <motion.div
          className="beyond2-hub"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CenterGraph />
          <motion.div
            className="beyond2-pulse-ring"
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="beyond2-pulse-ring beyond2-pulse-ring-outer"
            animate={{ scale: [1, 1.45, 1], opacity: [0.15, 0, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="beyond2-hub-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Enterprise Graph
          </motion.div>
        </motion.div>

        {/* Three spoke cards */}
        {ZONES.map((zone) => (
          <motion.div
            key={zone.headline}
            className={`beyond2-spoke beyond2-spoke-${zone.position}`}
            initial={{ opacity: 0, y: zone.position === 'top' ? -15 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: zone.delay + 0.3, duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="beyond2-spoke-headline">{zone.headline}</h3>
            <p className="beyond2-spoke-subtitle">{zone.subtitle}</p>
            <zone.MicroComponent />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="beyond2-footer-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.0, duration: 0.6 }}
      >
        Federated models stitch together fragments, but lack a unified understanding of your data, processes, and people. They don't function as an{' '}
        <span className="beyond2-foresight">enterprise brain</span>.
      </motion.div>
    </div>
  );
}
