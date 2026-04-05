import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENARIOS, PromptToQuery } from './scene4bData';
import type { Scenario, FedResult, Persona } from './scene4bData';

function getFoundResults(s: Scenario): FedResult[] {
  return s.fedResults.filter(r => r.status === 'found' || r.status === 'stale');
}

function getMissedResults(s: Scenario): FedResult[] {
  return s.fedResults.filter(r => r.status === 'missed');
}

function isAmberScenario(id: string): boolean {
  return id === 'activity-blind' || id === 'team-blind';
}

const STEP_STOPS = [0, 2, 5] as const;
const STEP_HINTS: Record<number, string> = {
  0: 'Show keyword extraction',
  2: 'Show what matched',
};

export function StoryCard({ persona, animKey }: { persona: Persona; animKey: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`story-${animKey}`}
        className="sfp-story-card"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="sfp-story-avatar">
          <span>{persona.initials}</span>
        </div>
        <div className="sfp-story-name">{persona.name}</div>
        <div className="sfp-story-title">{persona.title}</div>
        <div className="sfp-story-context">{persona.context}</div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SceneFedProblem() {
  const [activeTab, setActiveTab] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const scenario = SCENARIOS[activeTab];

  const stopIdx = STEP_STOPS.indexOf(subStep as typeof STEP_STOPS[number]);
  const atEnd = subStep >= STEP_STOPS[STEP_STOPS.length - 1];

  const handleTab = useCallback((idx: number) => {
    setActiveTab(idx);
    setSubStep(0);
    setAnimKey(k => k + 1);
  }, []);

  const advance = useCallback(() => {
    setSubStep(s => {
      const curIdx = STEP_STOPS.indexOf(s as typeof STEP_STOPS[number]);
      const nextIdx = Math.min(curIdx + 1, STEP_STOPS.length - 1);
      return STEP_STOPS[nextIdx];
    });
  }, []);

  const retreat = useCallback(() => {
    setSubStep(s => {
      const curIdx = STEP_STOPS.indexOf(s as typeof STEP_STOPS[number]);
      const prevIdx = Math.max(curIdx - 1, 0);
      return STEP_STOPS[prevIdx];
    });
  }, []);

  const foundResults = getFoundResults(scenario);
  const missedResults = getMissedResults(scenario);

  return (
    <div className="scene">
      <motion.div className="scene-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        The Federated Search Problem
      </motion.div>

      {/* Scenario tabs */}
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
              <motion.div className="s4b-tab-indicator" layoutId="sfp-tab-pill" />
            )}
          </button>
        ))}
      </motion.div>

      <PromptToQuery prompt={scenario.prompt} query={scenario.query} animKey={animKey} />

      <div className="sfp-body-split">
        {/* Left: Persona story card */}
        <StoryCard persona={scenario.persona} animKey={animKey} />

        {/* Right: Stepper + animation panel */}
        <div className="sfp-body-right">
          {/* Inner stepper controls */}
          <div className="sfp-stepper">
            <button
              className="sfp-step-btn"
              onClick={retreat}
              disabled={stopIdx <= 0}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>chevron_left</span>
            </button>

            <AnimatePresence mode="wait">
              {!atEnd ? (
                <motion.button
                  key={`advance-${animKey}`}
                  className="sfp-step-btn sfp-step-btn-primary"
                  onClick={advance}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {STEP_HINTS[subStep]}
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>chevron_right</span>
                </motion.button>
              ) : (
                <motion.span
                  key={`done-${animKey}`}
                  className="sfp-step-done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check_circle</span>
                  Complete
                </motion.span>
              )}
            </AnimatePresence>

            <span className="sfp-step-count">{stopIdx}/{STEP_STOPS.length - 1}</span>
          </div>

          {/* Panel content — keyed by tab so it resets on switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${animKey}`}
              className="sfp-panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="s4b1-panel-header">
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#ff8080' }}>lan</span>
                <div>
                  <div className="s4b1-panel-title" style={{ color: '#ff8080' }}>Federated Search</div>
                  <div className="s4b1-panel-sub">Isolated keyword queries per app</div>
                </div>
              </div>

              <motion.div
                className="s4b1-fed-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>text_fields</span>
                Keyword Only
              </motion.div>

              {/* Click 1 group: Keywords + Silo strip */}
              <AnimatePresence>
                {subStep >= 2 && (
                  <motion.div
                    key="kw"
                    className="s4b1-fed-tokens"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {scenario.keywords.map((kw, i) => (
                      <motion.span
                        key={i}
                        className="s4b1-fed-token"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        "{kw}"
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {subStep >= 2 && (
                  <motion.div
                    key="strip"
                    className="s4b1-fed-strip"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    {scenario.queryApps.map((app, i) => {
                      const result = scenario.fedResults[i];
                      const dotClass =
                        result.status === 'found' ? 's4b1-fed-strip-dot-found' :
                        result.status === 'stale' ? 's4b1-fed-strip-dot-stale' :
                        's4b1-fed-strip-dot-missed';
                      return (
                        <motion.div
                          key={i}
                          className="s4b1-fed-strip-app"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + i * 0.08 }}
                        >
                          <span className={`s4b1-fed-strip-dot ${dotClass}`} />
                          <img src={app.logo} alt={app.name} className="s4b1-fed-strip-logo" />
                          <span className="s4b1-fed-strip-name">{app.name}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Click 2 group: Found + Missed + Outcome */}
              <AnimatePresence>
                {subStep >= 5 && foundResults.map((result, i) => {
                  const amber = isAmberScenario(scenario.id) || result.status === 'stale';
                  return (
                    <motion.div
                      key={`found-${i}`}
                      className={`s4b1-fed-found-card ${amber ? 's4b1-fed-found-card-amber' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.2, duration: 0.35 }}
                    >
                      <div className="s4b1-fed-found-row">
                        <img src={result.logo} alt={result.app} className="s4b1-fed-found-logo" />
                        <span className="s4b1-fed-found-title">{result.title}</span>
                        <motion.span
                          className={`s4b1-fed-found-chip ${amber ? 's4b1-fed-found-chip-amber' : ''}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                        >
                          {amber ? '⚠' : '✓'} {result.status === 'stale' ? 'Stale match' : 'Keyword match'}
                        </motion.span>
                      </div>
                      {result.callout && (
                        <motion.div
                          className="s4b1-fed-found-callout"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          ⚠ {result.callout}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence>
                {subStep >= 5 && scenario.id === 'activity-blind' && (
                  <motion.div
                    key="same-kw"
                    className="s4b1-fed-same-kw"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>help</span>
                    Same keywords — no way to rank by recency
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {subStep >= 5 && (
                  <motion.div
                    key="failures"
                    className="s4b1-fed-failures"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    {missedResults.map((result, i) => (
                      <motion.div
                        key={`fail-${i}`}
                        className="s4b1-fed-fail-row"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.35, duration: 0.3 }}
                      >
                        <div className="s4b1-fed-fail-top">
                          <img src={result.logo} alt={result.app} className="s4b1-fed-fail-logo" />
                          <span className="s4b1-fed-fail-title">{result.title}</span>
                          <span className="s4b1-fed-fail-x">✗</span>
                        </div>
                        {result.keywordMismatch ? (
                          <motion.div
                            className="s4b1-fed-fail-chip"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.35 + 0.25, type: 'spring', stiffness: 300 }}
                          >
                            <span className="s4b1-fed-mismatch-ne">≠</span>
                            "{result.keywordMismatch.searched}" ≠ "{result.keywordMismatch.found}"
                          </motion.div>
                        ) : (
                          <motion.div
                            className="s4b1-fed-fail-reason"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + i * 0.35 + 0.25 }}
                          >
                            {result.reason}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {subStep >= 5 && (
                  <motion.div
                    key="outcome"
                    className="s4b-outcome s4b-outcome-fed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: 0.5 + missedResults.length * 0.35 + 0.3, duration: 0.3 }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
                    {scenario.fedOutcome}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
