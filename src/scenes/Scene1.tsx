import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const APPS = [
  { name: 'Google Drive', logo: LOGOS.gdrive, result: 'Drive doc — "Acme onboarding plan"' },
  { name: 'Jira', logo: LOGOS.jira, result: 'Jira ticket — ACME-1234 (resolved)' },
  { name: 'Salesforce', logo: LOGOS.salesforce, result: 'SF record — Acme Corp opp.' },
  { name: 'Teams', logo: LOGOS.teams, result: 'Teams msg — #acme channel' },
  { name: 'Confluence', logo: LOGOS.confluence, result: 'Confluence — old runbook' },
  { name: 'ServiceNow', logo: LOGOS.servicenow, result: 'SN incident — P3 ticket' },
  { name: 'Gong', logo: LOGOS.gong, result: 'Gong call — Q3 check-in' },
];

const CALL_DURATION = 2.7;
const CALL_START = 0.6;

function callDelay(i: number) {
  return CALL_START + i * CALL_DURATION;
}

function callMid(i: number) {
  return callDelay(i) + CALL_DURATION * 0.4;
}

function callEnd(i: number) {
  return callDelay(i) + CALL_DURATION * 0.85;
}

const totalDuration = callEnd(APPS.length - 1);

const PILE_ROTATIONS = [-2.5, 1.8, -1.2, 2.8, -0.5, 1.5, -2.2];
const PILE_OFFSETS = [0, 6, -4, 8, -2, 5, -6];
const QUALITY_STEPS = [88, 82, 76, 71, 66, 64, 61];
const TOKEN_STEPS = [8, 15, 23, 31, 39, 44, 47];

export function Scene1() {
  const [qualityPct, setQualityPct] = useState(92);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    APPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setQualityPct(QUALITY_STEPS[i]);
          setTokenCount(TOKEN_STEPS[i]);
        }, callMid(i) * 1000),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const qualityColor =
    qualityPct > 80 ? '#54D848' : qualityPct > 70 ? '#FF7E4C' : '#FF7E4C';

  return (
    <div className="scene scene-fed">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Federated Search: One Call at a Time
      </motion.div>

      <div className="fed-waterfall">
        <motion.div
          className="fed-router"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 28 }}>hub</span>
          <span className="fed-router-label">MCP Router</span>
        </motion.div>

        <div className="fed-lanes">
          {APPS.map((app, i) => (
            <div key={app.name} className="fed-lane">
              <motion.div
                className="fed-lane-app"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.6] }}
                transition={{
                  delay: callDelay(i),
                  duration: CALL_DURATION,
                  times: [0, 0.3, 1],
                }}
              >
                <img src={app.logo} alt={app.name} className="app-icon-sm" />
                <span className="fed-lane-name">{app.name}</span>
              </motion.div>

              <div className="fed-lane-track">
                <motion.div
                  className="fed-lane-beam"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: callDelay(i),
                    duration: CALL_DURATION * 0.9,
                    times: [0, 0.35, 0.7, 1],
                    ease: 'easeInOut',
                  }}
                />
                <motion.span
                  className="fed-lane-spinner material-symbols-rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], rotate: [0, 0, 360, 360] }}
                  transition={{
                    delay: callDelay(i) + CALL_DURATION * 0.2,
                    duration: CALL_DURATION * 0.7,
                    times: [0, 0.15, 0.85, 1],
                  }}
                >
                  progress_activity
                </motion.span>
              </div>

              <motion.span
                className="fed-lane-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: callEnd(i) }}
              >
                done
              </motion.span>
            </div>
          ))}
        </div>

        {/* Chaotic results pile */}
        <div className="fed-pile">
          <div className="fed-pile-header">
            <motion.span
              className="fed-pile-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Raw Results
            </motion.span>
            <motion.span
              className="fed-pile-count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: totalDuration + 0.2 }}
            >
              7 sources · 47 fragments · no ranking
            </motion.span>
          </div>
          <motion.div
            className="fed-pile-stack"
            animate={{
              borderColor: [
                'rgba(255,126,76,0.08)',
                'rgba(255,126,76,0.4)',
                'rgba(255,126,76,0.08)',
              ],
              boxShadow: [
                '0 0 0px rgba(255,126,76,0)',
                '0 0 20px rgba(255,126,76,0.15)',
                '0 0 0px rgba(255,126,76,0)',
              ],
            }}
            transition={{
              delay: totalDuration + 0.3,
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {APPS.map((app, i) => (
              <motion.div
                key={app.name}
                className="fed-pile-card"
                style={{ marginLeft: PILE_OFFSETS[i] }}
                initial={{ opacity: 0, x: -16, rotate: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotate: PILE_ROTATIONS[i],
                  scale: 1,
                }}
                transition={{
                  delay: callMid(i),
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img src={app.logo} alt="" className="fed-pile-icon" />
                <span>{app.result}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Context Overload — replaces elapsed bar */}
      <motion.div
        className="fed-overload"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="fed-gauge-row">
          <div className="fed-gauge-label">
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>memory</span>
            AI Context Window
          </div>
          <div className="fed-gauge-track">
            <motion.div
              className="fed-gauge-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                delay: callMid(0),
                duration: callMid(APPS.length - 1) - callMid(0) + 0.4,
                ease: 'linear',
              }}
            />
          </div>
          <motion.span
            className="fed-gauge-overflow"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: totalDuration + 0.2, type: 'spring', stiffness: 300 }}
          >
            OVERFLOW
          </motion.span>
        </div>

        <div className="fed-indicators">
          <motion.div
            className="fed-indicator"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              style={{ color: qualityColor }}
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
            transition={{ delay: 0.7 }}
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
      </motion.div>

      {/* AI Receiver */}
      <motion.div
        className="fed-ai-receiver"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: totalDuration + 0.5, duration: 0.5 }}
      >
        <motion.div
          className="fed-ai-icon"
          animate={{
            boxShadow: [
              '0 0 0px rgba(255,126,76,0)',
              '0 0 14px rgba(255,126,76,0.3)',
              '0 0 0px rgba(255,126,76,0)',
            ],
          }}
          transition={{
            delay: totalDuration + 1.0,
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>
            psychology
          </span>
        </motion.div>
        <span className="fed-ai-text">
          "Which of these 47 fragments actually answers the question?"
        </span>
      </motion.div>

      {/* Takeaway Cards */}
      <motion.div
        className="fed-takeaways"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: totalDuration + 0.8, duration: 0.5 }}
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
