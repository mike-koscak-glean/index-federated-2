import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const APPS = [
  { name: 'Google Drive', logo: LOGOS.gdrive, latency: '70 ms', slow: false },
  { name: 'Jira', logo: LOGOS.jira, latency: '120 ms', slow: false },
  { name: 'Salesforce', logo: LOGOS.salesforce, latency: '250 ms', slow: false },
  { name: 'Teams', logo: LOGOS.teams, latency: '180 ms', slow: false },
  { name: 'Confluence', logo: LOGOS.confluence, latency: '700 ms', slow: true },
  { name: 'ServiceNow', logo: LOGOS.servicenow, latency: '340 ms', slow: false },
  { name: 'Gong', logo: LOGOS.gong, latency: '190 ms', slow: false },
];

export function Scene1() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Step 1 — How Federated / MCP Works
      </motion.div>

      <div className="fed-layout">
        <div className="fed-visual">
          {/* Hub node */}
          <motion.div
            className="hub-node"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 28 }}>hub</span>
            <span className="hub-label">MCP / Federated Router</span>
          </motion.div>

          {/* App nodes with lines */}
          <div className="fed-apps">
            {APPS.map((app, i) => (
              <motion.div
                key={app.name}
                className="fed-app-row"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
              >
                <div className="fed-line-container">
                  <motion.div
                    className={`fed-line ${app.slow ? 'fed-line-slow' : ''}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                  />
                  <motion.span
                    className={`fed-latency ${app.slow ? 'fed-latency-slow' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.12 }}
                  >
                    {app.latency}
                  </motion.span>
                </div>
                <div className={`fed-app-node ${app.slow ? 'fed-app-slow' : ''}`}>
                  <img src={app.logo} alt={app.name} className="app-icon-sm" />
                  <span className="fed-app-name">{app.name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Messy results */}
          <motion.div
            className="fed-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <div className="fed-results-label">Federated Results</div>
            <div className="fed-results-stack">
              {['Drive doc', 'Jira ticket', 'SF record', 'Teams msg', 'Confluence page', 'SN incident', 'Gong call'].map(
                (label, i) => (
                  <motion.div
                    key={label}
                    className="fed-result-card"
                    initial={{ opacity: 0, x: -20, rotate: (i % 2 === 0 ? 2 : -1.5) }}
                    animate={{ opacity: 1, x: 0, rotate: (i % 2 === 0 ? 1.5 : -1) }}
                    transition={{ delay: 2.0 + i * 0.08 }}
                  >
                    {label}
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Token cost bar */}
        <motion.div
          className="fed-token-strip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
        >
          <div className="fed-token-header">
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#ff8080' }}>
              data_usage
            </span>
            LLM Context Window
          </div>
          <div className="fed-token-track">
            <motion.div
              className="fed-token-noise"
              initial={{ width: '0%' }}
              animate={{ width: '85%' }}
              transition={{ delay: 3.0, duration: 1.4, ease: 'easeOut' }}
            />
            <motion.div
              className="fed-token-signal"
              initial={{ width: '0%' }}
              animate={{ width: '12%' }}
              transition={{ delay: 3.0, duration: 1.4, ease: 'easeOut' }}
            />
          </div>
          <div className="fed-token-meta">
            <span className="fed-token-noise-label">~85% stale / irrelevant</span>
            <motion.span
              className="fed-token-cost"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.2, type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>payments</span>
              More noise → more tokens → higher cost
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="callout-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          <div className="callout">
            Multiple real-time API calls; end-to-end latency dominated by the slowest system.
          </div>
          <div className="callout">
            Each app returns its own slice; no unified view or cross-source ranking.
          </div>
          <div className="callout">
            Every irrelevant document burns tokens — overloading the context window with noise at a higher cost.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
