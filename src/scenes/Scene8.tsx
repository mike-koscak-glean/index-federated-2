import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CAPABILITIES = [
  {
    icon: 'psychology',
    label: 'Agents',
    desc: 'Multi-step reasoning & task execution grounded in enterprise context',
    angle: 0,
    color: '#8b90ff',
  },
  {
    icon: 'monitoring',
    label: 'Prism',
    desc: 'Real-time entity views — accounts, deals, risks — across every system',
    angle: 72,
    color: '#D8FD49',
  },
  {
    icon: 'person_pin',
    label: 'Personal Graph',
    desc: 'Infers your tasks, projects, and working context from activity signals',
    angle: 144,
    color: '#6ecff6',
  },
  {
    icon: 'auto_awesome',
    label: 'Proactive Intelligence',
    desc: 'Surfaces what matters before you ask — alerts, recommendations, next steps',
    angle: 216,
    color: '#ffb86c',
  },
  {
    icon: 'account_tree',
    label: 'Workflow Automation',
    desc: 'Agents trigger actions across systems — triage, update, orchestrate',
    angle: 288,
    color: '#ff79c6',
  },
];

const ORBIT_RADIUS_PCT = 38;
const CENTER = { x: 50, y: 50 };

function capPos(angle: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER.x + ORBIT_RADIUS_PCT * Math.cos(rad),
    y: CENTER.y + ORBIT_RADIUS_PCT * Math.sin(rad),
  };
}

export function Scene8() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step 8 — Beyond Search
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ fontSize: 28, maxWidth: 700 }}
      >
        One graph. <span className="final-highlight">Infinite</span> intelligence.
      </motion.h2>

      <div className="constellation-layout">
        <div className="constellation-visual">
          {/* CSS orbit ring — same coordinate space as positioned nodes */}
          <motion.div
            className="orbit-ring"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Connection lines from center to each node (CSS lines) */}
          {CAPABILITIES.map((cap, i) => {
            const pos = capPos(cap.angle);
            const dx = pos.x - CENTER.x;
            const dy = pos.y - CENTER.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
            return (
              <motion.div
                key={`line-${i}`}
                className="orbit-line"
                style={{
                  left: `${CENTER.x}%`,
                  top: `${CENTER.y}%`,
                  width: `${length}%`,
                  transform: `rotate(${angleDeg}deg)`,
                  background: `linear-gradient(90deg, transparent, ${cap.color}40)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
              />
            );
          })}

          {/* Animated particles flowing outward */}
          {CAPABILITIES.map((cap, i) => {
            const dest = capPos(cap.angle);
            return (
              <motion.div
                key={`p-${i}`}
                className="orbit-particle"
                style={{ background: cap.color }}
                initial={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, opacity: 0 }}
                animate={{
                  left: [`${CENTER.x}%`, `${dest.x}%`],
                  top: [`${CENTER.y}%`, `${dest.y}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  delay: 2.0 + i * 0.3,
                  duration: 1.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 2.5,
                }}
              />
            );
          })}

          {/* Central Glean Knowledge Graph node */}
          <motion.div
            className="constellation-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 18 }}
          >
            <div className="constellation-center-glow" />
            <img src={LOGOS.glean} alt="Glean" style={{ width: 36, height: 36, position: 'relative', zIndex: 1 }} />
            <span className="constellation-center-label">Enterprise<br />Knowledge Graph</span>
          </motion.div>

          {/* Orbiting capability nodes */}
          {CAPABILITIES.map((cap, i) => {
            const pos = capPos(cap.angle);
            return (
              <motion.div
                key={cap.label}
                className="constellation-node"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  '--node-color': cap.color,
                } as React.CSSProperties}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.2, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="constellation-node-icon" style={{ borderColor: `${cap.color}40`, background: `${cap.color}15` }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 22, color: cap.color }}>{cap.icon}</span>
                </div>
                <span className="constellation-node-label">{cap.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Detail cards */}
        <div className="constellation-details">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.label}
              className="constellation-detail-card"
              style={{ borderColor: `${cap.color}30` }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + i * 0.2, duration: 0.5 }}
            >
              <div className="constellation-detail-header" style={{ color: cap.color }}>
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{cap.icon}</span>
                {cap.label}
              </div>
              <div className="constellation-detail-text">{cap.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="callout-list callout-list-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
      >
        <div className="callout">
          Every capability is grounded in the same permission-aware, enterprise-specific graph.
        </div>
        <div className="callout">
          No re-indexing, no re-integration — each feature compounds on a single source of truth.
        </div>
      </motion.div>
    </div>
  );
}
