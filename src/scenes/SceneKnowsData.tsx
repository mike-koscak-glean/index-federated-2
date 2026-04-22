import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGOS } from '../logos';

/* ═══════════════════════════════════════════════
   Data source definitions
   ═══════════════════════════════════════════════ */

const STRUCTURED_SOURCES = [
  { label: 'Renewal risk status', source: 'SFDC', logo: LOGOS.salesforce },
  { label: 'Stage & forecast', source: 'SFDC', logo: LOGOS.salesforce },
  { label: 'Probability', source: 'SFDC', logo: LOGOS.salesforce },
  { label: 'Days to renewal', source: 'SFDC', logo: LOGOS.salesforce },
  { label: 'Seat count', source: 'Databricks', icon: 'database' },
  { label: 'WAU / MAU', source: 'Databricks', icon: 'database' },
] as const;

const UNSTRUCTURED_SOURCES = [
  { label: 'Renewal notes', source: 'Teams', logo: LOGOS.teams },
  { label: 'Risk narrative', source: 'Gong', logo: LOGOS.gong },
  { label: 'Support tickets', source: 'Zendesk', icon: 'support_agent' },
  { label: 'Meeting notes', source: 'Gong', logo: LOGOS.gong },
  { label: 'Email threads', source: 'Outlook', logo: LOGOS.outlook },
  { label: 'Customer channels', source: 'Teams', logo: LOGOS.teams },
] as const;

/* ═══════════════════════════════════════════════
   Risk scoring signals
   ═══════════════════════════════════════════════ */

const NEGATIVE_SIGNALS = [
  { score: '+35', label: 'Explicit non-renewal notice' },
  { score: '+30', label: 'Executive block or standardization elsewhere' },
  { score: '+25', label: 'Internal alternative / in-house build' },
  { score: '+20', label: 'Unresolved launch blocker' },
  { score: '+15', label: 'Sponsor loss or champion departure' },
];

const POSITIVE_SIGNALS = [
  { score: '−20', label: 'Procurement motion with live order form 75%+' },
  { score: '−15', label: 'Explicit "likely to renew flat" narrative' },
  { score: '−10', label: 'Strong deployment + healthy admin engagement' },
  { score: '−10', label: 'Active executive alignment and open activity' },
  { score: '−5', label: 'Strong seat utilization / MAU trend' },
];

/* ═══════════════════════════════════════════════
   Streaming assistant text (obfuscated)
   ═══════════════════════════════════════════════ */

const STREAM_LINES = [
  { type: 'heading' as const, text: 'May 2026 Renewal Churn Review' },
  { type: 'body' as const, text: 'Reviewed 23 open renewal opportunities using structured signals from Salesforce and unstructured signals from support, calls, and email.' },
  { type: 'spacer' as const, text: '' },
  { type: 'subheading' as const, text: 'High-Risk Accounts' },
  { type: 'row' as const, risk: 'high' as const, account: 'Vertex Inc', date: '2026-05-11', driver: 'Project paused, sponsor lost to layoffs' },
  { type: 'row' as const, risk: 'high' as const, account: 'Orion Tech', date: '2026-05-20', driver: 'Low adoption + internal alternative' },
  { type: 'row' as const, risk: 'high' as const, account: 'Atlas Group', date: '2026-05-30', driver: 'Built internal tool, cost pressure' },
  { type: 'spacer' as const, text: '' },
  { type: 'subheading' as const, text: 'Medium-Risk Watchlist' },
  { type: 'row' as const, risk: 'medium' as const, account: 'Nova Systems', date: '2026-05-08', driver: 'Thin record, launch uncertainty' },
  { type: 'row' as const, risk: 'medium' as const, account: 'Beacon Labs', date: '2026-05-22', driver: 'Yellow CRM, sparse evidence' },
  { type: 'spacer' as const, text: '' },
  { type: 'subheading' as const, text: 'Recommendation' },
  { type: 'body' as const, text: 'Immediate save plan needed for Vertex, Orion, and Atlas. Manager watchlist for Nova and Beacon. Standard renewal motion for remaining 18 accounts.' },
];

/* ═══════════════════════════════════════════════
   Streaming text component
   ═══════════════════════════════════════════════ */

function StreamingLine({ line, delay }: {
  line: typeof STREAM_LINES[number];
  delay: number;
}) {
  if (line.type === 'spacer') {
    return (
      <motion.div
        className="kd-stream-spacer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      />
    );
  }

  if (line.type === 'heading') {
    return (
      <motion.div
        className="kd-stream-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
      >
        {line.text}
      </motion.div>
    );
  }

  if (line.type === 'subheading') {
    return (
      <motion.div
        className="kd-stream-subheading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.3 }}
      >
        {line.text}
      </motion.div>
    );
  }

  if (line.type === 'row' && 'account' in line) {
    return (
      <motion.div
        className="kd-stream-row"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <span className={`kd-stream-risk kd-stream-risk-${line.risk}`}>
          {line.risk === 'high' ? 'High' : 'Med'}
        </span>
        <span className="kd-stream-account">{line.account}</span>
        <span className="kd-stream-date">{line.date}</span>
        <span className="kd-stream-driver">{line.driver}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="kd-stream-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {line.text}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Left panel: Glean Assistant
   ═══════════════════════════════════════════════ */

function AssistantPanel() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowCursor(false), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="kd-assistant"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kd-assistant-header">
        <img src={LOGOS.glean} alt="Glean" className="kd-assistant-logo" />
        <span className="kd-assistant-title">Glean Assistant</span>
        <span className="material-symbols-rounded kd-assistant-sparkle">auto_awesome</span>
      </div>

      <div className="kd-query-bar">
        <span className="material-symbols-rounded kd-query-icon">search</span>
        <motion.span
          className="kd-query-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          May 2026 renewal churn review
        </motion.span>
        {showCursor && <span className="cursor-blink">|</span>}
      </div>

      <div className="kd-stream-area">
        {STREAM_LINES.map((line, i) => (
          <StreamingLine key={i} line={line} delay={0.8 + i * 0.25} />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Data source chip
   ═══════════════════════════════════════════════ */

function SourceChip({ item, index, baseDelay, accent }: {
  item: { label: string; source: string; logo?: string; icon?: string };
  index: number;
  baseDelay: number;
  accent: 'blue' | 'pink';
}) {
  return (
    <motion.div
      className={`kd-source-chip kd-source-chip-${accent}`}
      initial={{ opacity: 0, x: accent === 'blue' ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: baseDelay + index * 0.1, duration: 0.35, ease: 'easeOut' }}
    >
      {item.logo ? (
        <img src={item.logo} alt={item.source} className="kd-source-logo" />
      ) : (
        <span className="material-symbols-rounded kd-source-icon">{item.icon}</span>
      )}
      <span className="kd-source-label">{item.label}</span>
      <span className="kd-source-tag">{item.source}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Model node
   ═══════════════════════════════════════════════ */

function ModelNode() {
  return (
    <motion.div
      className="kd-model-node"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: [
          '0 0 0px rgba(52,60,237,0)',
          '0 0 24px rgba(52,60,237,0.5)',
          '0 0 12px rgba(52,60,237,0.25)',
        ],
      }}
      transition={{
        delay: 1.5,
        duration: 0.5,
        boxShadow: { delay: 2.0, duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className="material-symbols-rounded kd-model-icon">analytics</span>
      <span className="kd-model-label">Churn Model</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Connector lines (SVG)
   ═══════════════════════════════════════════════ */

function ConnectorLines() {
  const leftLines = STRUCTURED_SOURCES.map((_, i) => ({
    x1: 0, y1: 10 + i * 14.5,
    x2: 50, y2: 45,
  }));
  const rightLines = UNSTRUCTURED_SOURCES.map((_, i) => ({
    x1: 100, y1: 10 + i * 14.5,
    x2: 50, y2: 45,
  }));
  const allLines = [...leftLines, ...rightLines];

  return (
    <svg className="kd-connectors-svg" viewBox="0 0 100 90" preserveAspectRatio="none">
      <defs>
        <linearGradient id="kd-grad-left" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--glean-mid-blue)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--glean-blue)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="kd-grad-right" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="var(--glean-pink)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--glean-blue)" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {allLines.map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={i < leftLines.length ? 'url(#kd-grad-left)' : 'url(#kd-grad-right)'}
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1, opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 0.6 }}
          transition={{ delay: 1.5 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {allLines.map((l, i) => (
        <motion.circle
          key={`p${i}`}
          r="0.6"
          fill={i < leftLines.length ? 'var(--glean-mid-blue)' : 'var(--glean-pink)'}
          initial={{ opacity: 0 }}
          animate={{
            cx: [l.x1, l.x2],
            cy: [l.y1, l.y2],
            opacity: [0, 0.9, 0],
          }}
          transition={{
            delay: 2.2 + i * 0.15,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.5 + Math.random() * 1.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Risk scoring panel
   ═══════════════════════════════════════════════ */

function RiskScoring() {
  return (
    <motion.div
      className="kd-risk-panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.4 }}
    >
      <div className="kd-risk-section">
        <div className="kd-risk-header kd-risk-header-neg">
          <span className="material-symbols-rounded" style={{ fontSize: 15 }}>trending_down</span>
          Strong negative signals
        </div>
        {NEGATIVE_SIGNALS.map((sig, i) => (
          <motion.div
            key={i}
            className="kd-risk-row"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.7 + i * 0.12, duration: 0.3 }}
          >
            <span className="kd-risk-dot kd-risk-dot-neg" />
            <motion.span
              className="kd-risk-score kd-risk-score-neg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9 + i * 0.12, duration: 0.3 }}
            >
              {sig.score}
            </motion.span>
            <span className="kd-risk-label">{sig.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="kd-risk-section">
        <div className="kd-risk-header kd-risk-header-pos">
          <span className="material-symbols-rounded" style={{ fontSize: 15 }}>trending_up</span>
          Strong positive signals
        </div>
        {POSITIVE_SIGNALS.map((sig, i) => (
          <motion.div
            key={i}
            className="kd-risk-row"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4 + i * 0.12, duration: 0.3 }}
          >
            <span className="kd-risk-dot kd-risk-dot-pos" />
            <motion.span
              className="kd-risk-score kd-risk-score-pos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 + i * 0.12, duration: 0.3 }}
            >
              {sig.score}
            </motion.span>
            <span className="kd-risk-label">{sig.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Right panel: Data funnel + risk scoring
   ═══════════════════════════════════════════════ */

function DataPanel() {
  return (
    <motion.div
      className="kd-data-panel"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="kd-funnel">
        <div className="kd-funnel-columns">
          <div className="kd-funnel-col">
            <motion.div
              className="kd-col-header kd-col-header-structured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>table_chart</span>
              Structured
            </motion.div>
            {STRUCTURED_SOURCES.map((item, i) => (
              <SourceChip key={i} item={item} index={i} baseDelay={0.7} accent="blue" />
            ))}
          </div>

          <div className="kd-funnel-col">
            <motion.div
              className="kd-col-header kd-col-header-unstructured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>text_snippet</span>
              Unstructured
            </motion.div>
            {UNSTRUCTURED_SOURCES.map((item, i) => (
              <SourceChip key={i} item={item} index={i} baseDelay={0.7} accent="pink" />
            ))}
          </div>
        </div>

        <ConnectorLines />
        <ModelNode />
      </div>

      <RiskScoring />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main scene export
   ═══════════════════════════════════════════════ */

export function SceneKnowsData() {
  return (
    <div className="scene kd-scene">
      <motion.div
        className="scene-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Beyond Search
      </motion.div>

      <motion.h2
        className="kd-headline"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        Knows Your <span className="final-highlight">Data</span>
      </motion.h2>

      <motion.p
        className="kd-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        Fuses signals across CRM, support, calls, and chat into models that predict churn,
        score deals, and surface risk before it hits.
      </motion.p>

      <div className="kd-split">
        <AssistantPanel />
        <DataPanel />
      </div>
    </div>
  );
}
