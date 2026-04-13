import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGOS } from '../logos';

const APPS = [
  { name: 'Google Drive', logo: LOGOS.gdrive },
  { name: 'Jira', logo: LOGOS.jira },
  { name: 'Salesforce', logo: LOGOS.salesforce },
  { name: 'Teams', logo: LOGOS.teams },
  { name: 'Confluence', logo: LOGOS.confluence },
  { name: 'ServiceNow', logo: LOGOS.servicenow },
  { name: 'Gong', logo: LOGOS.gong },
];

const PROMPTS = [
  "What's the status of the Acme rollout?",
  'Who owns the Q4 pricing decision?',
  "Summarize last week's incident postmortem",
];

const RETURN_DELAYS = [0.25, 0.50, 0.35, 0.70, 0.45, 0.80, 0.60];

const FRAGMENTS = [
  { text: 'Acme onboarding plan', logo: LOGOS.gdrive, relevant: false },
  { text: 'ACME-1234 (resolved)', logo: LOGOS.jira, relevant: false },
  { text: 'Acme Corp opp — $240K', logo: LOGOS.salesforce, relevant: true },
  { text: '#general — lunch plans', logo: LOGOS.teams, relevant: false },
  { text: 'Old runbook v2.1', logo: LOGOS.confluence, relevant: false },
  { text: 'P3 ticket (unrelated)', logo: LOGOS.servicenow, relevant: false },
  { text: 'Q3 check-in recording', logo: LOGOS.gong, relevant: false },
  { text: 'Meeting notes (March)', logo: LOGOS.gdrive, relevant: false },
  { text: 'ACME-987 (stale)', logo: LOGOS.jira, relevant: false },
  { text: '#acme — rollout update', logo: LOGOS.teams, relevant: true },
  { text: 'Acme wiki page (2022)', logo: LOGOS.confluence, relevant: false },
  { text: 'CR-2847 change req', logo: LOGOS.servicenow, relevant: false },
];

const QUALITY_STEPS = [88, 82, 76, 71, 66, 64, 61];
const TOKEN_STEPS   = [8, 15, 23, 31, 39, 44, 47];

const CYCLE_MS = 7500;
const LANE_H = 30;
const LANE_GAP = 4;
const LANES_TOTAL_H = APPS.length * LANE_H + (APPS.length - 1) * LANE_GAP;

export function Scene1() {
  const [cycle, setCycle] = useState(0);
  const [qualityPct, setQualityPct] = useState(92);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setQualityPct(92);
    setTokenCount(0);
    const timers = APPS.map((_, i) =>
      setTimeout(() => {
        setQualityPct(QUALITY_STEPS[i]);
        setTokenCount(TOKEN_STEPS[i]);
      }, (1.6 + RETURN_DELAYS[i] + 0.2) * 1000),
    );
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const prompt = PROMPTS[cycle % PROMPTS.length];

  return (
    <div className="scene scene-fed">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Federated Search: Every Query Hits Every System
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          className="fed-cycle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Fan-out: Prompt → Connector → Lanes → Systems */}
          <div className="fed-fanout">
            <motion.div
              className="fed-prompt"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="material-symbols-rounded fed-prompt-icon">chat_bubble</span>
              <span className="fed-prompt-text">&ldquo;{prompt}&rdquo;</span>
            </motion.div>

            <svg
              className="fed-connector-svg"
              viewBox={`0 0 50 ${LANES_TOTAL_H}`}
              preserveAspectRatio="none"
            >
              {APPS.map((_, i) => {
                const midY = LANES_TOTAL_H / 2;
                const laneY = i * (LANE_H + LANE_GAP) + LANE_H / 2;
                return (
                  <motion.path
                    key={i}
                    d={`M 0 ${midY} C 25 ${midY}, 25 ${laneY}, 50 ${laneY}`}
                    fill="none"
                    stroke="rgba(255,126,76,0.25)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.03, duration: 0.35 }}
                  />
                );
              })}
            </svg>

            <div className="fed-lanes">
              {APPS.map((app, i) => (
                <div key={app.name} className="fed-lane">
                  <div className="fed-lane-track">
                    <motion.div
                      className="fed-lane-beam"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: [0, 1, 1, 0.15], opacity: [0, 0.85, 0.85, 0.1] }}
                      transition={{
                        delay: 0.5 + i * 0.04,
                        duration: 1.1,
                        times: [0, 0.35, 0.65, 1],
                        ease: 'easeOut',
                      }}
                    />
                    <motion.div
                      className="fed-lane-pulse"
                      initial={{ left: '100%', opacity: 0 }}
                      animate={{ left: ['100%', '0%'], opacity: [0, 1, 1, 0] }}
                      transition={{
                        delay: 1.6 + RETURN_DELAYS[i],
                        duration: 0.45,
                        times: [0, 0.2, 0.75, 1],
                        ease: 'easeInOut',
                      }}
                    />
                  </div>

                  <motion.div
                    className="fed-lane-app"
                    initial={{ opacity: 0.35 }}
                    animate={{ opacity: [0.35, 1, 0.65] }}
                    transition={{
                      delay: 0.5 + i * 0.04,
                      duration: 2,
                      times: [0, 0.25, 1],
                    }}
                  >
                    <img src={app.logo} alt={app.name} className="app-icon-sm" />
                    <span className="fed-lane-name">{app.name}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Results flood */}
          <div className="fed-flood">
            <div className="fed-flood-header">
              <motion.span
                className="fed-flood-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
              >
                Raw Results
              </motion.span>
              <motion.div
                className="fed-flood-counts"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6, duration: 0.3 }}
              >
                <span className="fed-flood-total">47 fragments returned</span>
                <span className="fed-flood-relevant">~2 relevant</span>
              </motion.div>
            </div>

            <div className="fed-flood-grid">
              {FRAGMENTS.map((frag, i) => (
                <motion.div
                  key={i}
                  className={`fed-flood-card ${frag.relevant ? 'fed-flood-card-hit' : ''}`}
                  initial={{ opacity: 0, y: 6, scale: 0.93 }}
                  animate={{ opacity: frag.relevant ? 1 : 0.35, y: 0, scale: 1 }}
                  transition={{
                    delay: 2.8 + i * 0.06,
                    duration: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img src={frag.logo} alt="" className="fed-flood-icon" />
                  <span className="fed-flood-text">{frag.text}</span>
                  {frag.relevant ? (
                    <span className="fed-flood-mark fed-flood-hit">✓</span>
                  ) : (
                    <span className="fed-flood-mark fed-flood-miss">✗</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Context window overflow + indicators */}
          <div className="fed-overload">
            <div className="fed-gauge-row">
              <div className="fed-gauge-label">
                <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                  memory
                </span>
                AI Context Window
              </div>
              <div className="fed-gauge-track">
                <motion.div
                  className="fed-gauge-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.6, duration: 2.8, ease: 'linear' }}
                />
              </div>
              <motion.span
                className="fed-gauge-overflow"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.5, type: 'spring', stiffness: 300 }}
              >
                OVERFLOW
              </motion.span>
            </div>

            <div className="fed-indicators">
              <motion.div
                className="fed-indicator"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20, color: '#FF7E4C' }}
                >
                  trending_down
                </span>
                <span className="fed-indicator-label">Quality</span>
                <motion.span
                  className="fed-indicator-value"
                  style={{ color: qualityPct > 80 ? '#54D848' : '#FF7E4C' }}
                  key={qualityPct}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {qualityPct}%
                </motion.span>
              </motion.div>

              <motion.div
                className="fed-indicator fed-indicator-secondary"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: 20, color: '#FF7E4C' }}
                >
                  trending_up
                </span>
                <span className="fed-indicator-label">Tokens</span>
                <motion.span
                  className="fed-indicator-value fed-indicator-value-cost"
                  key={tokenCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {tokenCount > 0 ? `~${tokenCount}K` : '0'}
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Takeaway Cards — always visible */}
      <motion.div
        className="fed-takeaways"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="fed-takeaway-card">
          <div className="fed-takeaway-icon">
            <span className="material-symbols-rounded" style={{ fontSize: 22 }}>
              shuffle
            </span>
          </div>
          <div>
            <div className="fed-takeaway-title">No Unified Ranking</div>
            <div className="fed-takeaway-desc">
              Disconnected fragments with no cross-source relevance ranking. The AI must guess what
              matters.
            </div>
          </div>
        </div>

        <div className="fed-takeaway-card">
          <div className="fed-takeaway-icon">
            <span className="material-symbols-rounded" style={{ fontSize: 22 }}>
              blur_on
            </span>
          </div>
          <div>
            <div className="fed-takeaway-title">Context Pollution</div>
            <div className="fed-takeaway-desc">
              Signal buried in noise. Relevant answers hide among irrelevant fragments, increasing
              hallucination risk.
            </div>
          </div>
        </div>

        <div className="fed-takeaway-card">
          <div className="fed-takeaway-icon">
            <span className="material-symbols-rounded" style={{ fontSize: 22 }}>
              trending_down
            </span>
          </div>
          <div>
            <div className="fed-takeaway-title">More Sources = Worse</div>
            <div className="fed-takeaway-desc">
              Every new connector makes the problem worse — more noise, lower quality, higher cost.
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
