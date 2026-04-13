import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SCENARIOS,
  PromptToQuery,
} from './scene4bData';
import { StoryCard } from './SceneFedProblem';
import { FederatedPanel } from './FederatedPanel';
import { GleanPanel } from './GleanPanel';

const STEP_STOPS = [0, 2, 4] as const;
const STEP_HINTS: Record<number, string> = {
  0: 'Show Glean capabilities',
  2: 'Show what Glean found',
};

export function Scene4B1() {
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

  return (
    <div className="scene">
      <motion.div className="scene-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        What Changes With a Unified Search Index
      </motion.div>

      <div className="scene-with-sidebar">
        <motion.div
          className="s4b-tabs-vertical"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="s4b-tabs-vertical-label">Scenarios</span>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              className={`s4b-tab ${i === activeTab ? 's4b-tab-active' : ''}`}
              onClick={() => handleTab(i)}
            >
              <span className="s4b-tab-num">{i + 1}</span>
              {s.tab}
              {i === activeTab && (
                <motion.div className="s4b-tab-indicator" layoutId="s4b1-tab-pill" />
              )}
            </button>
          ))}
        </motion.div>

        <div className="scene-sidebar-content">
          <div className="sfp-top-row">
            <StoryCard persona={scenario.persona} animKey={animKey} dimmed />
            <PromptToQuery prompt={scenario.prompt} query={scenario.query} animKey={animKey} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`body-${animKey}`}
              className="s4b1-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FederatedPanel scenario={scenario} instant />

              <div className="s4b1-body-right">
                <div className="s4b1-stepper">
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
                        className="sfp-step-btn s4b1-step-btn-primary"
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
                        className="sfp-step-done s4b1-step-done"
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

                <GleanPanel scenario={scenario} tabIndex={activeTab} subStep={subStep} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
