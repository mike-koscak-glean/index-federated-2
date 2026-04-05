import { motion } from 'framer-motion';

const SNIPPETS = [
  { text: 'Acme Corp — Account Record (Salesforce)', quality: 'ok' },
  { text: 'Acme Corp — Old Opportunity (Closed Lost)', quality: 'bad' },
  { text: 'ACME-1234: Onboarding bug (resolved 2023)', quality: 'bad' },
  { text: 'Acme runbook (last updated 18 months ago)', quality: 'bad' },
  { text: 'Meeting notes Feb 2024 — no action items', quality: 'ok' },
  { text: '#acme-escalation: customer threatening churn', quality: 'good' },
  { text: 'ACME-999: Feature request (archived)', quality: 'bad' },
  { text: 'Acme onboarding checklist (draft)', quality: 'ok' },
  { text: 'Duplicate: Acme Corp account record', quality: 'bad' },
  { text: 'Acme team all-hands recording transcript', quality: 'ok' },
];

const WEAK_SECTIONS = [
  { icon: 'summarize', label: 'Summary', text: 'Acme Corp appears to be a customer. There may be an open opportunity, but details are unclear from available data.' },
  { icon: 'health_and_safety', label: 'Health Score', text: 'Unable to determine — conflicting signals across sources.' },
  { icon: 'warning', label: 'Risks', text: 'An onboarding bug was found (status unknown). Some meeting notes exist but contain no action items.' },
  { icon: 'rocket_launch', label: 'Next Best Actions', text: 'Review account records manually. Could not identify key contacts or escalation status.' },
];

export function Scene4() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        What the Agent Actually Sees
      </motion.div>

      <div className="agent-layout agent-layout-vertical">
        <motion.div
          className="agent-box agent-box-fed"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="agent-header">
            <span className="material-symbols-rounded" style={{ fontSize: 24 }}>smart_toy</span>
            <span>Generic MCP Agent</span>
          </div>

          <div className="context-window">
            <div className="context-label">Context Window</div>
            <div className="context-snippets">
              {SNIPPETS.map((s, i) => (
                <motion.div
                  key={i}
                  className={`context-snippet context-snippet-${s.quality}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                >
                  <span className="context-snippet-text">{s.text}</span>
                  {s.quality === 'bad' && (
                    <span className="material-symbols-rounded context-alert" style={{ fontSize: 14 }}>warning</span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="context-overflow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
            >
              <div className="context-overflow-bar" />
              <span>Context window filling up...</span>
            </motion.div>
          </div>

          <motion.div
            className="agent-reasoning"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 2.4, duration: 2, repeat: 2 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>hourglass_top</span>
            Reasoning… more steps required
          </motion.div>

          <motion.div
            className="weak-answer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, duration: 0.5 }}
          >
            <div className="weak-answer-header">
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>auto_awesome</span>
              Customer 360 — Acme Corp
              <span className="weak-answer-confidence">
                <span className="material-symbols-rounded" style={{ fontSize: 12 }}>error</span>
                Low confidence
              </span>
            </div>
            <div className="weak-answer-sections">
              {WEAK_SECTIONS.map((section, i) => (
                <motion.div
                  key={i}
                  className="weak-answer-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 + i * 0.2 }}
                >
                  <div className="weak-answer-section-label">
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>{section.icon}</span>
                    {section.label}
                  </div>
                  <div className="weak-answer-section-text">{section.text}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="weak-answer-warning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 14 }}>warning</span>
              Missed churn escalation thread · Used stale 2023 data · No key contacts found
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="callout-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.6 }}
        >
          <div className="callout">
            Bigger context windows don't fix noisy retrieval.
          </div>
          <div className="callout">
            Federated + deep reasoning = more calls, more cost, more latency.
          </div>
          <div className="callout">
            Each MCP host must reinvent retrieval; no shared enterprise memory.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
