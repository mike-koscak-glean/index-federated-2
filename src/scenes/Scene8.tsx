import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CAPABILITIES = [
  {
    icon: 'psychology',
    label: 'Agents',
    desc: 'Multi-step reasoning & task execution grounded in enterprise context',
    color: '#8b90ff',
    grid: 'top',
  },
  {
    icon: 'account_tree',
    label: 'Workflow Automation',
    desc: 'Agents trigger actions across systems — triage, update, orchestrate',
    color: '#ff79c6',
    grid: 'left',
  },
  {
    icon: 'monitoring',
    label: 'Prism',
    desc: 'Real-time entity views — accounts, deals, risks — across every system',
    color: '#D8FD49',
    grid: 'right',
  },
  {
    icon: 'auto_awesome',
    label: 'Proactive Intelligence',
    desc: 'Surfaces what matters before you ask — alerts, recommendations, next steps',
    color: '#ffb86c',
    grid: 'bl',
  },
  {
    icon: 'person_pin',
    label: 'Personal Graph',
    desc: 'Infers your tasks, projects, and working context from activity signals',
    color: '#6ecff6',
    grid: 'br',
  },
];

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

      <div className="beyond-grid">
        {/* Glean hub */}
        <motion.div
          className="beyond-hub"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 18 }}
        >
          <div className="beyond-hub-glow" />
          {[1, 2, 3].map(n => (
            <div key={n} className={`beyond-hub-ring beyond-hub-ring-${n}`} />
          ))}
          <img
            src={LOGOS.glean}
            alt="Glean"
            style={{ width: 40, height: 40, position: 'relative', zIndex: 1 }}
          />
          <span className="beyond-hub-label">
            Enterprise<br />Knowledge Graph
          </span>
        </motion.div>

        {/* Capability cards */}
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.label}
            className={`beyond-card beyond-card-${cap.grid}`}
            style={{
              '--cap-color': cap.color,
              borderColor: `${cap.color}30`,
            } as React.CSSProperties}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.0 + i * 0.18,
              type: 'spring',
              stiffness: 200,
              damping: 20,
            }}
          >
            <div
              className="beyond-card-icon"
              style={{
                borderColor: `${cap.color}40`,
                background: `${cap.color}12`,
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{ fontSize: 22, color: cap.color }}
              >
                {cap.icon}
              </span>
            </div>
            <div>
              <div className="beyond-card-label" style={{ color: cap.color }}>
                {cap.label}
              </div>
              <div className="beyond-card-desc">{cap.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="callout-list callout-list-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
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
