import { motion } from 'framer-motion';

const DIMENSIONS = [
  {
    label: 'Latency',
    icon: 'speed',
    fed: 'Sequential API calls at query time',
    glean: 'Pre-indexed, instant retrieval',
  },
  {
    label: 'Relevance',
    icon: 'target',
    fed: 'Keyword matching, per source',
    glean: 'Semantic ranking across all data',
  },
  {
    label: 'Coverage',
    icon: 'database',
    fed: 'Limited to connected APIs',
    glean: 'Unified across 100+ connectors',
  },
  {
    label: 'Governance',
    icon: 'shield',
    fed: 'Varies by source, hard to audit',
    glean: 'Centralized permissions, always enforced',
  },
  {
    label: 'Agent Reliability',
    icon: 'psychology',
    fed: 'Fragile multi-hop chains',
    glean: 'Single trusted source of truth',
  },
];

export function Scene7() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        The Advantage
      </motion.div>

      <div className="compare-grid">
        <div className="compare-header-row">
          <div className="compare-metric-label" />
          <div className="compare-col-header panel-header-red">MCP / Federated-only</div>
          <div className="compare-col-header panel-header-green">Glean Indexed + MCP</div>
        </div>

        {DIMENSIONS.map((d, i) => (
          <motion.div
            key={d.label}
            className="compare-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <div className="compare-metric-label">
              <span className="material-symbols-rounded compare-icon">{d.icon}</span>
              {d.label}
            </div>

            <motion.div
              className="compare-cell compare-cell-fed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
            >
              {d.fed}
            </motion.div>

            <motion.div
              className="compare-cell compare-cell-glean"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            >
              {d.glean}
            </motion.div>
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
