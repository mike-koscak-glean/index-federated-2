import { motion } from 'framer-motion';
import type { Scenario, FedResult } from './scene4bData';

const T = {
  kwAppear: 0.2,
  stripAppear: 0.4,
  stripStagger: 0.08,
  foundAppear: 0.8,
  failStart: 1.4,
  failStagger: 0.4,
  chipExtra: 0.25,
};

function getFoundResults(scenario: Scenario): FedResult[] {
  return scenario.fedResults.filter(r => r.status === 'found' || r.status === 'stale');
}

function getMissedResults(scenario: Scenario): FedResult[] {
  return scenario.fedResults.filter(r => r.status === 'missed');
}

function isAmberScenario(id: string): boolean {
  return id === 'activity-blind' || id === 'team-blind';
}

function FoundCard({ result, scenario, delay, instant }: { result: FedResult; scenario: Scenario; delay: number; instant?: boolean }) {
  const amber = isAmberScenario(scenario.id) || result.status === 'stale';

  return (
    <motion.div
      className={`s4b1-fed-found-card ${amber ? 's4b1-fed-found-card-amber' : ''}`}
      initial={instant ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={instant ? { duration: 0 } : { delay, duration: 0.35 }}
    >
      <div className="s4b1-fed-found-row">
        <img src={result.logo} alt={result.app} className="s4b1-fed-found-logo" />
        <span className="s4b1-fed-found-title">{result.title}</span>
        <motion.span
          className={`s4b1-fed-found-chip ${amber ? 's4b1-fed-found-chip-amber' : ''}`}
          initial={instant ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={instant ? { duration: 0 } : { delay: delay + 0.15, type: 'spring', stiffness: 400 }}
        >
          {amber ? '⚠' : '✓'} {result.status === 'stale' ? 'Stale match' : 'Keyword match'}
        </motion.span>
      </div>
      {result.callout && (
        <motion.div
          className="s4b1-fed-found-callout"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={instant ? { duration: 0 } : { delay: delay + 0.3 }}
        >
          ⚠ {result.callout}
        </motion.div>
      )}
    </motion.div>
  );
}

function FailRow({ result, delay, instant }: { result: FedResult; delay: number; instant?: boolean }) {
  return (
    <motion.div
      className="s4b1-fed-fail-row"
      initial={instant ? false : { opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={instant ? { duration: 0 } : { delay, duration: 0.3 }}
    >
      <div className="s4b1-fed-fail-top">
        <img src={result.logo} alt={result.app} className="s4b1-fed-fail-logo" />
        <span className="s4b1-fed-fail-title">{result.title}</span>
        <span className="s4b1-fed-fail-x">✗</span>
      </div>
      {result.keywordMismatch ? (
        <motion.div
          className="s4b1-fed-fail-chip"
          initial={instant ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={instant ? { duration: 0 } : { delay: delay + T.chipExtra, type: 'spring', stiffness: 300 }}
        >
          <span className="s4b1-fed-mismatch-ne">≠</span>
          "{result.keywordMismatch.searched}" ≠ "{result.keywordMismatch.found}"
        </motion.div>
      ) : (
        <motion.div
          className="s4b1-fed-fail-reason"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={instant ? { duration: 0 } : { delay: delay + T.chipExtra }}
        >
          {result.reason}
        </motion.div>
      )}
    </motion.div>
  );
}

export function FederatedPanel({ scenario, instant }: { scenario: Scenario; instant?: boolean }) {
  const apps = scenario.queryApps;
  const foundResults = getFoundResults(scenario);
  const missedResults = getMissedResults(scenario);

  return (
    <div className="s4b1-panel s4b1-panel-fed">
      <div className="s4b1-panel-header">
        <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#ff8080' }}>lan</span>
        <div>
          <div className="s4b1-panel-title" style={{ color: '#ff8080' }}>Federated Search</div>
          <div className="s4b1-panel-sub">Isolated keyword queries per app</div>
        </div>
      </div>

      <motion.div
        className="s4b1-fed-badge"
        initial={instant ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={instant ? { duration: 0 } : { delay: 0.15, type: 'spring', stiffness: 300 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 14 }}>text_fields</span>
        Keyword Only
      </motion.div>

      <motion.div
        className="s4b1-fed-tokens"
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={instant ? { duration: 0 } : { delay: T.kwAppear, duration: 0.3 }}
      >
        {scenario.keywords.map((kw, i) => (
          <motion.span
            key={i}
            className="s4b1-fed-token"
            initial={instant ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={instant ? { duration: 0 } : { delay: T.kwAppear + i * 0.1, duration: 0.25 }}
          >
            "{kw}"
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="s4b1-fed-strip"
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={instant ? { duration: 0 } : { delay: T.stripAppear, duration: 0.3 }}
      >
        {apps.map((app, i) => {
          const result = scenario.fedResults[i];
          const dotClass =
            result.status === 'found' ? 's4b1-fed-strip-dot-found' :
            result.status === 'stale' ? 's4b1-fed-strip-dot-stale' :
            's4b1-fed-strip-dot-missed';

          return (
            <motion.div
              key={i}
              className="s4b1-fed-strip-app"
              initial={instant ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={instant ? { duration: 0 } : { delay: T.stripAppear + i * T.stripStagger, duration: 0.25 }}
            >
              <span className={`s4b1-fed-strip-dot ${dotClass}`} />
              <img src={app.logo} alt={app.name} className="s4b1-fed-strip-logo" />
              <span className="s4b1-fed-strip-name">{app.name}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {foundResults.map((result, i) => (
        <FoundCard key={`found-${i}`} result={result} scenario={scenario} delay={T.foundAppear + i * 0.3} instant={instant} />
      ))}

      {scenario.id === 'activity-blind' && (
        <motion.div
          className="s4b1-fed-same-kw"
          initial={instant ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={instant ? { duration: 0 } : { delay: T.foundAppear + 0.6 }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>help</span>
          Same keywords — no way to rank by recency
        </motion.div>
      )}

      <div className="s4b1-fed-failures">
        {missedResults.map((result, i) => (
          <FailRow key={`fail-${i}`} result={result} delay={T.failStart + i * T.failStagger} instant={instant} />
        ))}
      </div>

      <motion.div
        className="s4b-outcome s4b-outcome-fed"
        initial={instant ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={instant ? { duration: 0 } : { delay: T.failStart + missedResults.length * T.failStagger + 0.3, duration: 0.3 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>error</span>
        {scenario.fedOutcome}
      </motion.div>
    </div>
  );
}
