import { motion, AnimatePresence } from 'framer-motion';
import { LOGOS } from '../logos';
import {
  BADGE_CONFIG,
  MatchBadge,
  OutcomeText,
  type MatchType,
  type Scenario,
} from './scene4bData';

const T = {
  capStart: 1.5,
  capStagger: 0.2,
  heroStart: 2.0,
  cardStart: 2.8,
  cardStagger: 0.5,
  bridgeStagger: 0.6,
  signalStart: 3.2,
  signalStagger: 0.3,
  teamAvatarStart: 2.0,
  teamLineStart: 3.4,
  teamLineStagger: 0.5,
  entityBadgeStart: 2.0,
  entityLineStart: 2.6,
  entityLineStagger: 0.5,
};

function GleanResultCard({
  result,
  index,
  delay,
  dimmed,
  className,
  children,
  pulseDelay,
  pulseColor,
}: {
  result: { title: string; app: string; logo: string; matchTypes: MatchType[]; reason: string; rankedLast?: boolean };
  index: number;
  delay: number;
  dimmed?: boolean;
  className?: string;
  children?: React.ReactNode;
  pulseDelay?: number;
  pulseColor?: string;
}) {
  const baseShadow = '0 0 0px rgba(0,0,0,0)';
  const pulseAnim = pulseDelay !== undefined && pulseColor
    ? { boxShadow: [baseShadow, `0 0 16px ${pulseColor}`, baseShadow] }
    : {};
  const pulseTransition = pulseDelay !== undefined
    ? { boxShadow: { delay: pulseDelay, duration: 0.8 } }
    : {};

  return (
    <motion.div
      className={`s4b1-glean-card ${dimmed || result.rankedLast ? 's4b1-glean-card-dim' : ''} ${className || ''}`}
      initial={{ opacity: 0, x: 20, boxShadow: baseShadow }}
      animate={{ opacity: dimmed || result.rankedLast ? 0.5 : 1, x: 0, ...pulseAnim }}
      transition={{ delay, duration: 0.4, ease: 'easeOut', ...pulseTransition }}
      data-result-index={index}
    >
      <div className="s4b1-glean-card-row">
        <img src={result.logo} alt={result.app} className="s4b1-glean-card-logo" />
        <div className="s4b1-glean-card-body">
          <div className="s4b1-glean-card-title">{result.title}</div>
          <div className="s4b1-glean-card-reason">{result.reason}</div>
        </div>
        <div className="s4b1-glean-card-badges">
          {result.matchTypes.map(mt => (
            <MatchBadge key={mt} type={mt} />
          ))}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Tab 1 — Semantic Bridges
   ═══════════════════════════════════════════════ */

function SemanticBridgesHero({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const bridges = scenario.semanticBridges || [];
  const d = stepped ? 0.15 : T.heroStart;

  return (
    <motion.div
      className="s4b1-bridges-hero"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: d, duration: 0.4 }}
    >
      <div className="s4b1-bridges-hero-title">Meaning Connections</div>
      {bridges.map((bridge, bi) => (
        <motion.div
          key={bi}
          className="s4b1-bridge-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 0.3 + bi * T.bridgeStagger, duration: 0.5 }}
        >
          <span className="s4b1-bridge-term">"{bridge.queryTerm}"</span>
          <motion.div
            className="s4b1-bridge-connector"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: d + 0.5 + bi * T.bridgeStagger, duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          >
            <span className="s4b1-bridge-line-hero" />
            <span className="s4b1-bridge-approx-hero">≈</span>
            <span className="s4b1-bridge-line-hero" />
          </motion.div>
          <span className="s4b1-bridge-term">"{bridge.matchTerm}"</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SemanticBridgesResults({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const bridges = scenario.semanticBridges || [];
  const results = scenario.gleanResults;
  const baseDelay = stepped ? 0.15 : T.cardStart;
  const stagger = stepped ? 0.3 : T.cardStagger;
  const heroDelay = stepped ? 0.15 : T.heroStart;

  return (
    <div className="s4b1-glean-results">
      {results.map((result, i) => {
        const bridge = bridges.find(b => b.resultIndex === i);
        const bi = bridges.indexOf(bridge!);
        const cardDelay = baseDelay + i * stagger;
        const bridgePulseDelay = bridge ? heroDelay + 0.5 + bi * T.bridgeStagger + 0.4 : undefined;

        return (
          <GleanResultCard
            key={i}
            result={result}
            index={i}
            delay={cardDelay}
            pulseDelay={bridgePulseDelay}
            pulseColor="rgba(52,60,237,0.5)"
          >
            {bridge && (
              <motion.div
                className="s4b1-bridge-annotation"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: cardDelay + 0.3, duration: 0.5, ease: 'easeOut' }}
              >
                <span className="s4b1-bridge-line" />
                <span className="s4b1-bridge-badge">
                  <span className="s4b1-bridge-approx">≈</span>
                  "{bridge.queryTerm}" ≈ "{bridge.matchTerm}"
                </span>
              </motion.div>
            )}
          </GleanResultCard>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Tab 2 — Activity Signals + Heat Bars
   ═══════════════════════════════════════════════ */

const HEAT_LEVELS = [
  { pct: '100%', type: 'hot', glow: true },
  { pct: '75%', type: 'hot', glow: false },
  { pct: '50%', type: 'recent', glow: false },
  { pct: '8%', type: 'stale', glow: false },
];

function ActivitySignalsResults({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const signals = scenario.activitySignals || [];
  const results = scenario.gleanResults;
  const baseDelay = stepped ? 0.15 : T.cardStart;
  const stagger = stepped ? 0.3 : T.cardStagger;

  return (
    <div className="s4b1-glean-results">
      {results.map((result, i) => {
        const cardDelay = baseDelay + i * stagger;
        const resultSignals = signals[i] || [];
        const heat = HEAT_LEVELS[i] || HEAT_LEVELS[3];

        return (
          <GleanResultCard
            key={i}
            result={result}
            index={i}
            delay={cardDelay}
            dimmed={result.rankedLast}
          >
            <motion.div
              className={`s4b1-heat-bar ${heat.glow ? 's4b1-heat-bar-glow' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: cardDelay + 0.2 }}
            >
              <motion.div
                className={`s4b1-heat-fill s4b1-heat-fill-${heat.type}`}
                initial={{ width: 0 }}
                animate={{ width: heat.pct }}
                transition={{ delay: cardDelay + 0.3, duration: 0.6, ease: 'easeOut' }}
              />
            </motion.div>

            {resultSignals.length > 0 && (
              <div className="s4b1-signal-chips">
                {resultSignals.map((sig, si) => (
                  <motion.span
                    key={si}
                    className={`s4b1-signal-chip s4b1-signal-${sig.type}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      ...(sig.type === 'hot' ? { boxShadow: ['0 0 0px rgba(53,200,120,0)', '0 0 8px rgba(53,200,120,0.4)', '0 0 0px rgba(53,200,120,0)'] } : {}),
                    }}
                    transition={{
                      delay: (stepped ? 0.3 : T.signalStart) + i * (stepped ? 0.15 : T.signalStagger) + si * 0.15,
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                      ...(sig.type === 'hot' ? { boxShadow: { delay: (stepped ? 0.3 : T.signalStart) + i * (stepped ? 0.15 : T.signalStagger) + si * 0.15 + 0.5, duration: 2, repeat: Infinity } } : {}),
                    }}
                  >
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>{sig.icon}</span>
                    {sig.label}
                  </motion.span>
                ))}
              </div>
            )}
          </GleanResultCard>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Tab 3 — Personalization Signals
   ═══════════════════════════════════════════════ */

function PersonalizationSignalsHero({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const signals = scenario.personalizationSignals || [];
  const d = stepped ? 0.15 : T.heroStart;

  return (
    <motion.div
      className="s4b1-personalization-hero"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: d, duration: 0.4 }}
    >
      <div className="s4b1-personalization-hero-title">Personalization Signals</div>
      {signals.map((sig, si) => (
        <motion.div
          key={si}
          className="s4b1-personalization-row"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: d + 0.3 + si * 0.4, duration: 0.4, ease: 'easeOut' }}
        >
          <span className="material-symbols-rounded s4b1-personalization-icon" style={{ fontSize: 16 }}>{sig.icon}</span>
          <motion.div
            className="s4b1-personalization-connector"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: d + 0.5 + si * 0.4, duration: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          >
            <span className="s4b1-personalization-line" />
          </motion.div>
          <span className="s4b1-personalization-label">{sig.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PersonalizationResults({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const results = scenario.gleanResults;
  const signals = scenario.personalizationSignals || [];
  const baseDelay = stepped ? 0.15 : T.cardStart;
  const stagger = stepped ? 0.3 : T.cardStagger;
  const heroDelay = stepped ? 0.15 : T.heroStart;

  return (
    <div className="s4b1-glean-results">
      {results.map((result, i) => {
        const cardDelay = baseDelay + i * stagger;
        const isPersonalized = result.matchTypes.includes('personalized');
        const signalPulseDelay = isPersonalized && i < signals.length
          ? heroDelay + 0.5 + i * 0.4 + 0.3
          : undefined;

        return (
          <GleanResultCard
            key={i}
            result={result}
            index={i}
            delay={cardDelay}
            dimmed={result.rankedLast}
            className={isPersonalized ? 's4b1-glean-card-personalized' : ''}
            pulseDelay={signalPulseDelay}
            pulseColor="rgba(216,253,73,0.4)"
          >
            {result.subNote && (
              <motion.div
                className={`s4b1-personalization-subnote ${result.rankedLast ? 's4b1-personalization-subnote-dim' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: result.rankedLast ? 0.5 : 0.8 }}
                transition={{ delay: cardDelay + 0.25 }}
              >
                {result.subNote}
              </motion.div>
            )}
          </GleanResultCard>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Tab 4 — Entity Threading
   ═══════════════════════════════════════════════ */

function EntityThreadingHero({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const entityName = scenario.entityName || 'Entity';
  const d = stepped ? 0.15 : T.entityBadgeStart;

  return (
    <motion.div
      className="s4b1-entity-badge"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: ['0 0 0px rgba(225,107,255,0)', '0 0 16px rgba(225,107,255,0.4)', '0 0 8px rgba(225,107,255,0.2)'],
      }}
      transition={{
        delay: d,
        type: 'spring',
        stiffness: 250,
        boxShadow: { delay: d + 0.5, duration: 2.5, repeat: Infinity },
      }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 20 }}>auto_awesome</span>
      Entity: {entityName}
    </motion.div>
  );
}

function EntityThreadingResults({ scenario, stepped }: { scenario: Scenario; stepped: boolean }) {
  const connections = scenario.entityConnections || [];
  const results = scenario.gleanResults;
  const baseDelay = stepped ? 0.15 : T.entityLineStart;
  const stagger = stepped ? 0.3 : T.entityLineStagger;

  return (
    <>
      <div className="s4b1-entity-thread-wrap">
        <motion.div
          className="s4b1-entity-thread-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: baseDelay,
            duration: results.length * stagger,
            ease: 'easeOut',
          }}
        />

        {results.map((result, i) => {
          const cardDelay = baseDelay + i * stagger;
          const conn = connections.find(c => c.resultIndex === i);

          return (
            <div key={i} className="s4b1-entity-result-wrap">
              {conn && (
                <motion.div
                  className="s4b1-entity-rel-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: cardDelay + 0.1, duration: 0.3 }}
                >
                  <span className="s4b1-entity-rel-dot" />
                  <span className="s4b1-entity-rel-text">{conn.relationship}</span>
                </motion.div>
              )}
              <GleanResultCard result={result} index={i} delay={cardDelay + 0.15} />
            </div>
          );
        })}
      </div>

      <motion.div
        className="s4b1-entity-pulse-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{
          delay: baseDelay + results.length * stagger + 0.5,
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════
   Main GleanPanel
   ═══════════════════════════════════════════════ */

export function GleanPanel({ scenario, tabIndex, subStep }: { scenario: Scenario; tabIndex: number; subStep?: number }) {
  const stepped = subStep !== undefined;
  const caps = scenario.capabilities;

  const showCaps = !stepped || subStep! >= 1;
  const showHero = !stepped || subStep! >= 2;
  const showResults = !stepped || subStep! >= 3;
  const showOutcome = !stepped || subStep! >= 4;

  const renderHero = () => {
    switch (scenario.id) {
      case 'keyword-gap':
        return <SemanticBridgesHero scenario={scenario} stepped={stepped} />;
      case 'personalization-gap':
        return <PersonalizationSignalsHero scenario={scenario} stepped={stepped} />;
      default:
        return null;
    }
  };

  const renderResults = () => {
    switch (scenario.id) {
      case 'keyword-gap':
        return <SemanticBridgesResults scenario={scenario} stepped={stepped} />;
      case 'activity-blind':
        return <ActivitySignalsResults scenario={scenario} stepped={stepped} />;
      case 'personalization-gap':
        return <PersonalizationResults scenario={scenario} stepped={stepped} />;
      default:
        return null;
    }
  };

  return (
    <div className="s4b1-panel s4b1-panel-glean">
      <div className="s4b1-panel-header">
        <img src={LOGOS.glean} alt="Glean" style={{ width: 22, height: 22 }} />
        <div>
          <div className="s4b1-panel-title" style={{ color: 'var(--glean-green)' }}>Glean Search Index</div>
          <div className="s4b1-panel-sub">Enterprise Graph with unified search index</div>
        </div>
      </div>

      <AnimatePresence>
        {showCaps && (
          <motion.div
            key="caps"
            className="s4b1-cap-legend"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {caps.map((cap, i) => (
              <motion.span
                key={cap}
                className="s4b-cap-badge"
                style={{
                  color: BADGE_CONFIG[cap].color,
                  background: BADGE_CONFIG[cap].bg,
                  borderColor: BADGE_CONFIG[cap].border,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stepped ? i * 0.1 : T.capStart + i * T.capStagger, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{BADGE_CONFIG[cap].icon}</span>
                {BADGE_CONFIG[cap].label}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="s4b1-glean-content">
        <AnimatePresence>
          {showHero && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {renderHero()}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {renderResults()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showOutcome && (
          <motion.div
            key="outcome"
            className="s4b-outcome s4b-outcome-glean"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>check_circle</span>
            <OutcomeText text={scenario.gleanOutcome} delay={0} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
