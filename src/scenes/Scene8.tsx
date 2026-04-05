import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CORE_CAPABILITIES = [
  {
    icon: 'psychology',
    label: 'Agents',
    desc: 'Plan and act on curated, permission-safe context — not raw API fragments',
    color: '#8b90ff',
    fedCant: 'No pre-ranked context — agents reason over noise',
    microClass: 'beyond-micro-agents',
  },
  {
    icon: 'account_tree',
    label: 'Workflow Automation',
    desc: 'Detect business events across systems and orchestrate end-to-end — automatically',
    color: '#ff79c6',
    fedCant: 'Request-response only — can\'t watch for changes',
    microClass: 'beyond-micro-workflow',
  },
  {
    icon: 'monitoring',
    label: 'Enterprise Analytics',
    desc: 'Live entity intelligence — account health, deal risk, project status — built from signals across every system',
    color: '#D8FD49',
    fedCant: 'Can\'t build entity models across sources',
    microClass: 'beyond-micro-analytics',
  },
];

const FORWARD_CAPABILITIES = [
  {
    icon: 'auto_awesome',
    label: 'Proactive Intelligence',
    desc: 'AI that acts before you ask — surfacing tasks, risks, and opportunities from patterns in your activity',
    color: '#ffb86c',
    fedCant: 'No continuous ingestion — can\'t detect patterns',
    microClass: 'beyond-micro-proactive',
  },
  {
    icon: 'person_pin',
    label: 'Personal Graph',
    desc: 'Learns how you work — your projects, your patterns, your priorities — and personalizes everything',
    color: '#6ecff6',
    fedCant: 'No memory between queries',
    microClass: 'beyond-micro-personal',
  },
  {
    icon: 'schema',
    label: 'Process Intelligence',
    desc: 'Maps how work actually flows across people, tools, and teams — revealing bottlenecks and automation opportunities',
    color: '#50fa7b',
    fedCant: 'Can\'t map cross-source workflows',
    microClass: 'beyond-micro-process',
  },
];

const NETWORK_NODES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const r = 30 + (i % 3) * 18;
  return { cx: 50 + r * Math.cos(angle), cy: 50 + r * Math.sin(angle) };
});

function NetworkBg() {
  return (
    <svg className="beyond-network-bg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {NETWORK_NODES.map((n, i) =>
        NETWORK_NODES.slice(i + 1)
          .filter((m) => Math.hypot(n.cx - m.cx, n.cy - m.cy) < 30)
          .map((m, j) => (
            <line
              key={`${i}-${j}`}
              x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
              stroke="rgba(52,60,237,0.12)" strokeWidth="0.3"
            />
          )),
      )}
      {NETWORK_NODES.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="0.8" fill="rgba(216,253,73,0.15)" />
      ))}
    </svg>
  );
}

interface CapCardProps {
  cap: typeof CORE_CAPABILITIES[number];
  delay: number;
}

function CapCard({ cap, delay }: CapCardProps) {
  return (
    <motion.div
      className="beyond-card"
      style={{ '--cap-color': cap.color, borderColor: `${cap.color}30` } as React.CSSProperties}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 22 }}
    >
      <div
        className={`beyond-card-icon ${cap.microClass}`}
        style={{ borderColor: `${cap.color}40`, background: `${cap.color}12` }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: cap.color }}>
          {cap.icon}
        </span>
      </div>
      <div className="beyond-card-body">
        <div className="beyond-card-label" style={{ color: cap.color }}>{cap.label}</div>
        <div className="beyond-card-desc">{cap.desc}</div>
        <motion.div
          className="beyond-fed-cant"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.35 }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 13, color: '#ff6060' }}>close</span>
          <span>{cap.fedCant}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Scene8() {
  return (
    <div className="scene beyond-scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Beyond Search
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ fontSize: 28, maxWidth: 700 }}
      >
        What only an enterprise graph makes <span className="final-highlight">possible</span>.
      </motion.h2>

      <div className="beyond-tiers">
        {/* --- Top tier: forward-looking --- */}
        <motion.div
          className="beyond-tier"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="beyond-tier-label">Forward-Looking</div>
          <div className="beyond-tier-row">
            {FORWARD_CAPABILITIES.map((cap, i) => (
              <CapCard key={cap.label} cap={cap} delay={1.9 + i * 0.18} />
            ))}
          </div>
        </motion.div>

        {/* Beam connecting tiers */}
        <motion.div
          className="beyond-beam"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.35, ease: 'easeOut' }}
        />

        {/* --- Middle tier: core capabilities --- */}
        <motion.div
          className="beyond-tier"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="beyond-tier-label">Core Capabilities</div>
          <div className="beyond-tier-row">
            {CORE_CAPABILITIES.map((cap, i) => (
              <CapCard key={cap.label} cap={cap} delay={1.0 + i * 0.18} />
            ))}
          </div>
        </motion.div>

        {/* Beam connecting tiers */}
        <motion.div
          className="beyond-beam"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.35, ease: 'easeOut' }}
        />

        {/* --- Bottom tier: foundation --- */}
        <motion.div
          className="beyond-foundation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 20 }}
        >
          <NetworkBg />
          <div className="beyond-foundation-glow" />
          <motion.div
            className="beyond-foundation-pulse"
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src={LOGOS.glean}
            alt="Glean"
            className="beyond-foundation-logo"
          />
          <div className="beyond-foundation-text">
            <span className="beyond-foundation-title">Enterprise Knowledge Graph</span>
            <span className="beyond-foundation-sub">Entities, relationships, and 60+ ranking signals tuned on your data</span>
          </div>
        </motion.div>
      </div>

      {/* Footer callouts */}
      <motion.div
        className="callout-list callout-list-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <div className="callout">
          One index. One graph. Every capability compounding on the same foundation.
        </div>
        <div className="callout">
          Federated gives your AI fragments. An enterprise graph gives it <strong style={{ color: 'var(--glean-green)' }}>foresight</strong>.
        </div>
      </motion.div>
    </div>
  );
}
