import { motion } from 'framer-motion';
import { LOGOS } from '../logos';

const CURATED_SNIPPETS = [
  'Acme Corp — Active Opportunity ($1.2M, closing Q2)',
  '#acme-escalation: churn risk identified',
  'Customer 360 deck — latest QBR summary',
  'Key contact: Jane Smith (VP Sales, Acme)',
];

const ML_SIGNALS = [
  { icon: 'neurology', label: 'Semantic Match', desc: 'Deep-learning similarity' },
  { icon: 'person_search', label: 'Personalization', desc: 'Your activity & role' },
  { icon: 'trending_up', label: 'Popularity', desc: 'Views, edits, shares' },
  { icon: 'schedule', label: 'Recency', desc: 'Freshness weighting' },
];

const ANSWER_SECTIONS = [
  { icon: 'summarize', label: 'Summary', text: 'Acme Corp is a $1.2M opportunity at risk. Escalation thread indicates churn concerns around onboarding delays.' },
  { icon: 'health_and_safety', label: 'Health Score', text: '62/100 — down from 78 last quarter. Three open P1 support tickets.' },
  { icon: 'warning', label: 'Risks', text: 'Onboarding delays (ACME-1234), executive sponsor change, competitor evaluation in progress.' },
  { icon: 'rocket_launch', label: 'Next Best Actions', text: 'Schedule EBR with new sponsor, escalate P1s to engineering, share product roadmap.' },
];

const NET_LAYERS = [
  [0.18, 0.22, 0.45, 0.68, 0.78],
  [0.15, 0.35, 0.55, 0.72, 0.88],
  [0.20, 0.42, 0.62, 0.82],
  [0.30, 0.55, 0.75],
  [0.38, 0.65],
];
const NET_X = [0.08, 0.28, 0.50, 0.72, 0.92];

function NeuralNetVis() {
  const edges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  for (let l = 0; l < NET_LAYERS.length - 1; l++) {
    const fromNodes = NET_LAYERS[l];
    const toNodes = NET_LAYERS[l + 1];
    fromNodes.forEach((fy, fi) => {
      toNodes.forEach((ty, ti) => {
        edges.push({
          x1: NET_X[l], y1: fy,
          x2: NET_X[l + 1], y2: ty,
          delay: (l * 0.4) + (fi + ti) * 0.06,
        });
      });
    });
  }

  return (
    <motion.div
      className="ml-net-vis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ml-net-svg">
        {edges.map((e, i) => (
          <motion.line
            key={`e${i}`}
            x1={e.x1 * 100} y1={e.y1 * 100}
            x2={e.x2 * 100} y2={e.y2 * 100}
            stroke="url(#mlGrad)"
            strokeWidth="0.4"
            strokeOpacity="0"
            animate={{ strokeOpacity: [0, 0.5, 0.15] }}
            transition={{ delay: 1.6 + e.delay, duration: 1.2, repeat: Infinity, repeatDelay: 2.5 + Math.random() }}
          />
        ))}
        {NET_LAYERS.flatMap((layer, l) =>
          layer.map((y, ni) => (
            <motion.circle
              key={`n${l}-${ni}`}
              cx={NET_X[l] * 100} cy={y * 100} r="1.6"
              fill="none"
              stroke="url(#mlGrad)"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.9, 0.5], scale: 1 }}
              transition={{ delay: 1.5 + l * 0.3 + ni * 0.08, duration: 1, repeat: Infinity, repeatDelay: 3 + Math.random() }}
            />
          ))
        )}
        <defs>
          <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#343CED" />
            <stop offset="100%" stopColor="#D8FD49" />
          </linearGradient>
        </defs>
      </svg>
      <div className="ml-net-label">Ranking model</div>
    </motion.div>
  );
}

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

      <div className="agent-layout agent-layout-horizontal">
        {/* Left panel — ML Relevance Engine */}
        <motion.div
          className="ml-panel"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="ml-panel-header">
            <span className="material-symbols-rounded" style={{ fontSize: 20, color: 'var(--glean-green)' }}>model_training</span>
            <span>ML Relevance Engine</span>
          </div>
          <div className="ml-panel-sub">60+ ranking signals, trained on your enterprise</div>

          <div className="ml-signals">
            {ML_SIGNALS.map((s, i) => (
              <motion.div
                key={i}
                className="ml-signal"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.18 }}
              >
                <div className="ml-signal-icon">
                  <span className="material-symbols-rounded" style={{ fontSize: 18 }}>{s.icon}</span>
                </div>
                <div className="ml-signal-info">
                  <div className="ml-signal-label">{s.label}</div>
                  <div className="ml-signal-desc">{s.desc}</div>
                </div>
                <motion.div
                  className="ml-signal-bar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9 + i * 0.18, duration: 0.5, ease: 'easeOut' }}
                />
              </motion.div>
            ))}
          </div>

          <NeuralNetVis />

          <motion.div
            className="ml-output"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={{ delay: 1.8, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check_circle</span>
            Ranked &amp; filtered — 4 of 200+ results
          </motion.div>
        </motion.div>

        {/* Right panel — Agent + answer */}
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
      </div>

      <motion.div
        className="callout-list callout-list-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <div className="callout">
          ML models rank before the LLM sees anything — the agent gets signal, not noise.
        </div>
        <div className="callout">
          60+ signals trained on your enterprise — not generic web relevance.
        </div>
        <div className="callout">
          Better retrieval → fewer reasoning steps → faster, cheaper, more accurate agents.
        </div>
      </motion.div>
    </div>
  );
}
