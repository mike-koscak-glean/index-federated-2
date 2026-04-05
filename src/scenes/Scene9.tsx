import { motion } from 'framer-motion';

const STACK_LAYERS = [
  {
    label: '100+ Enterprise Systems',
    sub: 'Salesforce · Jira · Slack · Drive · ServiceNow · Gong · Confluence …',
    color: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.12)',
    textColor: 'rgba(255,255,255,0.5)',
    icon: 'cloud',
  },
  {
    label: 'Unified, Permission-Aware Index',
    sub: 'Content · ACLs · People · Activity — mirrored from every source',
    color: 'rgba(52,60,237,0.12)',
    border: 'rgba(52,60,237,0.35)',
    textColor: '#8b90ff',
    icon: 'database',
  },
  {
    label: 'Enterprise Knowledge Graph',
    sub: 'Entities, relationships, and 60+ ranking signals tuned on your data',
    color: 'rgba(52,60,237,0.2)',
    border: 'rgba(216,253,73,0.35)',
    textColor: 'var(--glean-green)',
    icon: 'hub',
    highlight: true,
  },
];

const PRODUCTS = [
  { icon: 'search', label: 'Search', color: '#8b90ff' },
  { icon: 'auto_awesome', label: 'Assistant', color: '#D8FD49' },
  { icon: 'psychology', label: 'Agents', color: '#6ecff6' },
  { icon: 'monitoring', label: 'Prism', color: '#ffb86c' },
  { icon: 'account_tree', label: 'Workflows', color: '#ff79c6' },
  { icon: 'person_pin', label: 'Personal AI', color: '#50fa7b' },
];

export function Scene9() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        The Full Picture
      </motion.div>

      <div className="finale-layout">
        {/* Platform stack visual */}
        <div className="finale-stack">
          {/* Product layer at top */}
          <motion.div
            className="finale-products-layer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <div className="finale-products-label">What you ship to every employee</div>
            <div className="finale-products-grid">
              {PRODUCTS.map((p, i) => (
                <motion.div
                  key={p.label}
                  className="finale-product-chip"
                  style={{ '--chip-color': p.color } as React.CSSProperties}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.4 + i * 0.12, type: 'spring', stiffness: 250, damping: 20 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 18, color: p.color }}>{p.icon}</span>
                  <span>{p.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upward energy beam connecting stack to products */}
          <motion.div
            className="finale-beam"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5, ease: 'easeOut' }}
          />

          {/* Stack layers bottom to top */}
          {STACK_LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              className={`finale-layer ${layer.highlight ? 'finale-layer-highlight' : ''}`}
              style={{
                background: layer.color,
                borderColor: layer.border,
              }}
              initial={{ opacity: 0, y: 30, scaleX: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleX: 1 }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="finale-layer-content">
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: layer.textColor }}>{layer.icon}</span>
                <div>
                  <div className="finale-layer-label" style={{ color: layer.textColor }}>{layer.label}</div>
                  <div className="finale-layer-sub">{layer.sub}</div>
                </div>
              </div>
            </motion.div>
          )).reverse()}

          {/* Animated particles rising through the stack */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`rise-${i}`}
              className="finale-rise-particle"
              style={{ left: `${20 + i * 12}%` }}
              animate={{
                y: [0, -280],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                delay: 2.0 + i * 0.4,
                duration: 2.0,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 2.0 + Math.random(),
              }}
            />
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          className="finale-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1.0 }}
        >
          <p className="finale-message-main">
            Federated gives your AI <span style={{ color: '#ff8080' }}>fragments</span>.<br />
            An enterprise graph gives it <span className="final-highlight">understanding</span>.
          </p>
          <p className="finale-message-sub">
            Search, agents, analytics, and proactive intelligence —<br />
            all from one indexed, permission-aware foundation.
          </p>
        </motion.div>

        <motion.div
          className="final-tagline"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.0, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <img src="https://app.glean.com/images/glean-logo2.svg" alt="Glean" style={{ width: 28, height: 28 }} />
          Index once. Unlock everything.
        </motion.div>
      </div>
    </div>
  );
}
