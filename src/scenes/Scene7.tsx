import { motion } from 'framer-motion';

const METRICS = [
  { label: 'Latency', fed: 25, glean: 90 },
  { label: 'Relevance', fed: 30, glean: 95 },
  { label: 'Coverage', fed: 35, glean: 92 },
  { label: 'Governance', fed: 20, glean: 95 },
  { label: 'Agent Reliability', fed: 30, glean: 88 },
];

export function Scene7() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step 6 — The Search Advantage
      </motion.div>

      <div className="compare-grid">
        <div className="compare-header-row">
          <div className="compare-metric-label" />
          <div className="compare-col-header panel-header-red">MCP / Federated-only</div>
          <div className="compare-col-header panel-header-green">Glean Indexed + MCP</div>
        </div>

        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="compare-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <div className="compare-metric-label">{m.label}</div>
            <div className="compare-bar-cell">
              <motion.div
                className="compare-bar compare-bar-fed"
                initial={{ width: 0 }}
                animate={{ width: `${m.fed}%` }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="compare-bar-value">{m.fed}%</span>
            </div>
            <div className="compare-bar-cell">
              <motion.div
                className="compare-bar compare-bar-glean"
                initial={{ width: 0 }}
                animate={{ width: `${m.glean}%` }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="compare-bar-value">{m.glean}%</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="final-quote"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <p className="final-quote-main">
          An indexed enterprise graph gives your agents a <span className="final-highlight">brain</span>.
        </p>
      </motion.div>

      <motion.div
        className="transition-tease"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 0.7, 1], y: 0 }}
        transition={{ delay: 3.0, duration: 1.0 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 20 }}>arrow_forward</span>
        But better search is just the beginning of what an enterprise graph unlocks…
      </motion.div>
    </div>
  );
}
