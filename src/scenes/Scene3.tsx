import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const FED_RESULTS = [
  { app: 'Salesforce', logo: LOGOS.salesforce, title: 'Acme Corp — Account Record', tag: null, dim: false },
  { app: 'Salesforce', logo: LOGOS.salesforce, title: 'Acme Corp — Old Opportunity (Closed Lost)', tag: 'Stale', dim: true },
  { app: 'Jira', logo: LOGOS.jira, title: 'ACME-1234: Onboarding bug', tag: null, dim: false },
  { app: 'Jira', logo: LOGOS.jira, title: 'ACME-999: Feature request (archived)', tag: 'Archived', dim: true },
  { app: 'Drive', logo: LOGOS.gdrive, title: 'Acme — Meeting Notes Feb 2024', tag: null, dim: false },
  { app: 'Slack', logo: null, title: '🔥 #acme-escalation: "Customer threatening churn"', tag: 'Buried at #6', dim: false, buried: true },
  { app: 'Confluence', logo: LOGOS.confluence, title: 'Acme runbook (outdated)', tag: 'Outdated', dim: true },
];

const GLEAN_RESULTS = [
  {
    title: 'Acme Corp — Active Opportunity ($1.2M)',
    source: 'Salesforce',
    logo: LOGOS.salesforce,
    meta: 'Owner: J. Smith · Closing Q2 · Viewed 89×',
  },
  {
    title: '#acme-escalation: churn risk identified',
    source: 'Slack',
    logo: null,
    meta: 'Trending in your org · 12 participants · 2h ago',
  },
  {
    title: 'ACME-1234: Onboarding bug (P1, open)',
    source: 'Jira',
    logo: LOGOS.jira,
    meta: 'Assigned: K. Lee · Linked to Acme account',
  },
  {
    title: 'Acme QBR Deck — Q1 2025',
    source: 'Drive',
    logo: LOGOS.gdrive,
    meta: 'You attended this meeting · Last edited 3 days ago',
  },
];

export function Scene3() {
  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Step 3 — Federated vs Indexed Results
      </motion.div>

      <div className="split-layout">
        {/* Left: Federated */}
        <div className="split-panel">
          <div className="panel-header panel-header-red">MCP / Federated Results</div>

          {/* Bad AI answer from noisy retrieval */}
          <motion.div
            className="fed-answer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="fed-answer-header">
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>auto_awesome</span>
              AI-generated summary
              <span className="result-tag result-tag-dim" style={{ marginLeft: 'auto' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 12 }}>warning</span>
                Low confidence
              </span>
            </div>
            <div className="fed-answer-body">
              <strong>Acme Corp</strong> is a customer with records in Salesforce and Jira.
              A feature request was filed in 2023. Meeting notes from February 2024
              mention an onboarding discussion. There is also a Confluence runbook
              available for reference.
            </div>
            <div className="fed-answer-missing">
              <span className="material-symbols-rounded" style={{ fontSize: 13 }}>help_outline</span>
              No deal value, no risk signals, no recommended actions
            </div>
          </motion.div>

          <div className="results-stack">
            {FED_RESULTS.map((r, i) => (
              <motion.div
                key={i}
                className={`result-card ${r.buried ? 'result-buried' : ''} ${r.dim ? 'result-dim' : ''}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="result-card-header">
                  {r.logo ? (
                    <img src={r.logo} alt={r.app} className="app-icon-sm" />
                  ) : (
                    <span className="material-symbols-rounded" style={{ fontSize: 20 }}>chat</span>
                  )}
                  <span className="result-app-label">{r.app}</span>
                  {r.tag && (
                    <span className={`result-tag ${r.buried ? 'result-tag-red' : 'result-tag-dim'}`}>
                      {r.buried && <span className="material-symbols-rounded" style={{ fontSize: 12 }}>warning</span>}
                      {r.tag}
                    </span>
                  )}
                </div>
                <div className="result-title">{r.title}</div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="fed-bottom-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#ff8080' }}>shuffle</span>
            Per-app ranking · No cross-source signals · No deduplication
          </motion.div>
        </div>

        {/* Right: Glean */}
        <div className="split-panel">
          <div className="panel-header panel-header-green">
            <img src={LOGOS.glean} alt="" style={{ width: 16, height: 16 }} />
            Glean Indexed Results
          </div>

          {/* AI-generated answer card */}
          <motion.div
            className="glean-answer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="glean-answer-header">
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>auto_awesome</span>
              AI-generated Customer 360
            </div>
            <div className="glean-answer-body">
              <strong>Acme Corp</strong> is a $1.2M opportunity at risk. An active churn escalation
              involves 12 stakeholders. There is 1 open P1 bug blocking onboarding.
              Executive sponsor recently changed.
            </div>
            <div className="glean-answer-actions">
              <span className="glean-action-chip">
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>calendar_month</span>
                Schedule EBR
              </span>
              <span className="glean-action-chip">
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>bug_report</span>
                Escalate P1
              </span>
              <span className="glean-action-chip">
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>share</span>
                Share roadmap
              </span>
            </div>
          </motion.div>

          {/* Expert card */}
          <motion.div
            className="glean-people-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--glean-green)' }}>person</span>
            <span className="glean-people-label">Key contact:</span>
            <span className="glean-people-name">Jane Smith</span>
            <span className="glean-people-role">VP Sales, Acme</span>
            <span className="material-symbols-rounded" style={{ fontSize: 14, marginLeft: 'auto', opacity: 0.4 }}>open_in_new</span>
          </motion.div>

          {/* Ranked results with rich context */}
          <div className="results-stack">
            {GLEAN_RESULTS.map((r, i) => (
              <motion.div
                key={i}
                className="result-card result-card-glean"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="result-card-header">
                  {r.logo ? (
                    <img src={r.logo} alt={r.source} className="app-icon-sm" />
                  ) : (
                    <span className="material-symbols-rounded" style={{ fontSize: 20 }}>chat</span>
                  )}
                  <span className="result-app-label">{r.source}</span>
                  <span className="result-verified">
                    <span className="material-symbols-rounded" style={{ fontSize: 12 }}>verified_user</span>
                  </span>
                </div>
                <div className="result-title">{r.title}</div>
                <div className="result-meta">{r.meta}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="glean-why"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            Glean doesn't return links — it returns <strong>answers</strong>.
            One index understands content, people, permissions, and activity
            across every source, so the most important insight is always first.
          </motion.div>

          <motion.div
            className="glean-bottom-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16, color: 'var(--glean-green)' }}>insights</span>
            60+ signals · Cross-source ranking · Permission-verified · AI answers
          </motion.div>
        </div>
      </div>
    </div>
  );
}
