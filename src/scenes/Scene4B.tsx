import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGOS } from '../logos';
import {
  SCENARIOS,
  BADGE_CONFIG,
  Typewriter,
  CapabilityBadge,
  MatchBadge,
  type MatchType,
  type Scenario,
} from './scene4bData';

/* ─── Animation timing (seconds) ─── */

const T = {
  queryStart: 0.15,
  queryDur: 0.6,
  tokensStart: 1.0,
  fanOutStart: 1.8,
  fanOutStagger: 0.12,
  fedResultsStart: 3.2,
  fedResultStagger: 0.45,
  indexStart: 1.8,
  capBadgeStart: 2.2,
  capBadgeStagger: 0.2,
  gleanResultsStart: 3.8,
  gleanResultStagger: 0.5,
  outcomeDelay: 5.6,
};

/* ─── Sub-components ─── */

function FederatedPanel({ scenario }: { scenario: Scenario }) {
  return (
    <div className="s4b-panel s4b-panel-fed">
      <div className="s4b-panel-header">
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#FF7E4C' }}>lan</span>
        <div>
          <div className="s4b-panel-title s4b-fed-title">Federated Search</div>
          <div className="s4b-panel-sub">Each system's built-in keyword search</div>
        </div>
      </div>

      <motion.div
        className="s4b-method-badge s4b-method-keyword-only"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: T.tokensStart - 0.2 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>text_fields</span>
        Keyword Only
      </motion.div>

      <div className="s4b-tokens">
        {scenario.keywords.map((kw, i) => (
          <motion.span
            key={kw}
            className="s4b-token"
            initial={{ opacity: 0, y: -8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: T.tokensStart + i * 0.1, type: 'spring', stiffness: 400, damping: 25 }}
          >
            "{kw}"
          </motion.span>
        ))}
      </div>

      <div className="s4b-fanout">
        {scenario.queryApps.map((app, i) => (
          <motion.div
            key={`${app.name}-${i}`}
            className="s4b-fanout-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: T.fanOutStart + i * T.fanOutStagger }}
          >
            <div className="s4b-fanout-beam-track">
              <motion.div
                className="s4b-fanout-beam"
                style={{ background: `linear-gradient(90deg, ${app.color}66, ${app.color}22)` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: T.fanOutStart + i * T.fanOutStagger, duration: 0.4, ease: 'easeOut' }}
              />
              <motion.div
                className="s4b-fanout-pulse"
                style={{ background: app.color }}
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: ['0%', '100%'], opacity: [0, 0.9, 0] }}
                transition={{ delay: T.fanOutStart + i * T.fanOutStagger, duration: 0.5, ease: 'easeIn' }}
              />
            </div>
            <img src={app.logo} alt={app.name} className="s4b-fanout-icon" />
            <span className="s4b-fanout-name">{app.name}</span>
            <motion.span
              className="material-symbols-rounded s4b-fanout-spinner"
              style={{ fontSize: 12 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ delay: T.fanOutStart + i * T.fanOutStagger + 0.3, duration: 0.6 }}
            >
              hourglass_top
            </motion.span>
          </motion.div>
        ))}
      </div>

      <div className="s4b-results-stack">
        {scenario.fedResults.map((r, i) => (
          <motion.div
            key={r.title}
            className={`s4b-result s4b-result-${r.status}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: T.fedResultsStart + i * T.fedResultStagger, duration: 0.35 }}
          >
            <img src={r.logo} alt={r.app} className="s4b-result-logo" />
            <div className="s4b-result-content">
              <div className="s4b-result-title">{r.title}</div>
              <motion.div
                className={`s4b-result-reason s4b-reason-${r.status}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: T.fedResultsStart + i * T.fedResultStagger + 0.25 }}
              >
                {r.reason}
              </motion.div>
            </div>
            <motion.span
              className={`s4b-status-icon s4b-status-${r.status}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: T.fedResultsStart + i * T.fedResultStagger + 0.2, type: 'spring', stiffness: 400 }}
            >
              {r.status === 'found' && <span className="material-symbols-rounded" style={{ fontSize: 18 }}>check_circle</span>}
              {r.status === 'missed' && <span className="material-symbols-rounded" style={{ fontSize: 18 }}>close</span>}
              {r.status === 'stale' && <span className="material-symbols-rounded" style={{ fontSize: 18 }}>warning</span>}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="s4b-outcome s4b-outcome-fed"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: T.outcomeDelay }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
        {scenario.fedOutcome}
      </motion.div>
    </div>
  );
}

function UnifiedIndexOrb({ capabilities, delay }: { capabilities: MatchType[]; delay: number }) {
  return (
    <div className="s4b-orb-container">
      <svg viewBox="0 0 120 60" className="s4b-orb-svg">
        <defs>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#343CED" stopOpacity={0.5} />
            <stop offset="70%" stopColor="#D8FD49" stopOpacity={0.1} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {[18, 26, 34].map((r, i) => (
          <motion.circle
            key={r}
            cx={60} cy={30} r={r}
            fill="none"
            stroke="rgba(216,253,73,0.15)"
            strokeWidth={0.6}
            strokeDasharray={`${r * 0.3} ${r * 0.15}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0.3], scale: 1 }}
            transition={{ delay: delay + 0.15 * i, duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          />
        ))}
        <motion.circle
          cx={60} cy={30} r={10}
          fill="url(#orbGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={60} cy={30} r={6}
          fill="rgba(52,60,237,0.6)"
          stroke="rgba(216,253,73,0.4)"
          strokeWidth={0.8}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay, type: 'spring' }}
        />
      </svg>

      <div className="s4b-cap-badges">
        {capabilities.map((cap, i) => (
          <CapabilityBadge key={cap} type={cap} delay={T.capBadgeStart + i * T.capBadgeStagger} />
        ))}
      </div>
    </div>
  );
}

function GleanPanel({ scenario }: { scenario: Scenario }) {
  return (
    <div className="s4b-panel s4b-panel-glean">
      <div className="s4b-panel-header">
        <img src={LOGOS.glean} alt="Glean" style={{ width: 22, height: 22 }} />
        <div>
          <div className="s4b-panel-title s4b-glean-title">Glean Indexed Search</div>
          <div className="s4b-panel-sub">Unified index with knowledge graph</div>
        </div>
      </div>

      <UnifiedIndexOrb capabilities={scenario.capabilities} delay={T.indexStart} />

      <div className="s4b-results-stack">
        {scenario.gleanResults.map((r, i) => (
          <motion.div
            key={r.title}
            className={`s4b-result s4b-result-glean ${r.rankedLast ? 's4b-result-ranked-last' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: T.gleanResultsStart + i * T.gleanResultStagger, duration: 0.35 }}
          >
            <img src={r.logo} alt={r.app} className="s4b-result-logo" />
            <div className="s4b-result-content">
              <div className="s4b-result-title">{r.title}</div>
              <motion.div
                className="s4b-result-reason s4b-reason-glean"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: T.gleanResultsStart + i * T.gleanResultStagger + 0.25 }}
              >
                {r.reason}
              </motion.div>
            </div>
            <div className="s4b-match-badges">
              {r.matchTypes.map(mt => (
                <MatchBadge key={mt} type={mt} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="s4b-outcome s4b-outcome-glean"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: T.outcomeDelay }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>check_circle</span>
        {scenario.gleanOutcome}
      </motion.div>
    </div>
  );
}

/* ─── Main Scene ─── */

export function Scene4B() {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const scenario = SCENARIOS[activeTab];

  const handleTab = useCallback((idx: number) => {
    setActiveTab(idx);
    setAnimKey(k => k + 1);
  }, []);

  return (
    <div className="scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Why Retrieval Method Matters
      </motion.div>

      <motion.div
        className="s4b-tabs"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            className={`s4b-tab ${i === activeTab ? 's4b-tab-active' : ''}`}
            onClick={() => handleTab(i)}
          >
            <span className="s4b-tab-num">{i + 1}</span>
            {s.tab}
            {i === activeTab && (
              <motion.div className="s4b-tab-indicator" layoutId="s4b-tab-pill" />
            )}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`q-${animKey}`}
          className="s4b-query-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'rgba(255,255,255,0.35)' }}>search</span>
          <span className="s4b-query-text">
            <Typewriter text={scenario.query} delay={T.queryStart} />
          </span>
          <motion.div
            className="s4b-query-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: T.queryStart + scenario.query.length * 0.028 + 0.1, duration: 0.8 }}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`panels-${animKey}`}
          className="s4b-split"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <FederatedPanel scenario={scenario} />
          <GleanPanel scenario={scenario} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
