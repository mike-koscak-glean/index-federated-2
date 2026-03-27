import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CURATED_SNIPPETS = [
  'Acme Corp — Active Opportunity ($1.2M, closing Q2)',
  '#acme-escalation: churn risk identified',
  'Customer 360 deck — latest QBR summary',
  'Key contact: Jane Smith (VP Sales, Acme)',
];

const ANSWER_SECTIONS = [
  { icon: 'summarize', label: 'Summary', text: 'Acme Corp is a $1.2M opportunity at risk. Escalation thread indicates churn concerns around onboarding delays.' },
  { icon: 'health_and_safety', label: 'Health Score', text: '62/100 — down from 78 last quarter. Three open P1 support tickets.' },
  { icon: 'warning', label: 'Risks', text: 'Onboarding delays (ACME-1234), executive sponsor change, competitor evaluation in progress.' },
  { icon: 'rocket_launch', label: 'Next Best Actions', text: 'Schedule EBR with new sponsor, escalate P1s to engineering, share product roadmap.' },
];

export function Scene5() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step 5 — LLM / Agent on Glean Index
      </motion.div>

      <div className="agent-layout agent-layout-vertical">
        <motion.div
          className="agent-box agent-box-glean"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="agent-header agent-header-glean">
            <img src={LOGOS.glean} alt="Glean" style={{ width: 24, height: 24 }} />
            <span>Glean-powered Agent</span>
          </div>

          {/* Query beam */}
          <div className="glean-flow">
            <motion.div
              className="glean-query-beam"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div
              className="glean-index-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <img src={LOGOS.glean} alt="" style={{ width: 16, height: 16 }} />
              Search + Context
            </motion.div>
          </div>

          <div className="context-window context-window-clean">
            <div className="context-label" style={{ color: 'var(--glean-green)' }}>Curated Context</div>
            <div className="context-snippets">
              {CURATED_SNIPPETS.map((s, i) => (
                <motion.div
                  key={i}
                  className="context-snippet context-snippet-good"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + i * 0.15 }}
                >
                  <span className="context-snippet-text">{s}</span>
                  <span className="material-symbols-rounded" style={{ fontSize: 14, color: 'var(--glean-green)' }}>verified</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Composed answer */}
          <motion.div
            className="answer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <div className="answer-header">
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>auto_awesome</span>
              Customer 360 — Acme Corp
            </div>
            <div className="answer-sections">
              {ANSWER_SECTIONS.map((section, i) => (
                <motion.div
                  key={i}
                  className="answer-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + i * 0.2 }}
                >
                  <div className="answer-section-label">
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{section.icon}</span>
                    {section.label}
                  </div>
                  <div className="answer-section-text">{section.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="callout-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          <div className="callout">
            Index once; agents reuse the same trusted context everywhere.
          </div>
          <div className="callout">
            RAG uses a small, permission-checked subset of the index, not your entire corpus.
          </div>
          <div className="callout">
            Better retrieval → fewer reasoning steps → faster, cheaper, more accurate agents.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
