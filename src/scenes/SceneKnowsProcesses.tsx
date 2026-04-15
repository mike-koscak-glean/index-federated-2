import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGOS } from '../logos';

/* ═══════════════════════════════════════════════
   Process trace definitions — raw messy steps
   ═══════════════════════════════════════════════ */

const RAW_STEPS = ['Open ROAD board', 'Check status', 'Compare dates', 'Flag stale', 'Update fields', 'Notify PM'];

const TRACE_PATHS: number[][] = [
  [0, 1, 2, 3, 4, 5],       // full process — one person does it right
  [0, 1, 3, 4, 5],           // skips "Compare dates", eyeballs it
  [0, 1, 2, 3, 4],           // flags + updates but forgets to notify
  [0, 1, 3, 4],              // skips compare AND notify
  [0, 1, 2, 3, 1, 3, 4, 5], // re-checks status mid-way, messy loop
  [0, 1, 4, 5],              // jumps straight from status to update
  [0, 1, 2, 3, 3, 4, 5],    // double-flags before updating
  [0, 1, 2, 4, 5],           // skips flagging, updates directly
];

const TRACE_COLORS = [
  'rgba(63,163,255,0.35)',
  'rgba(225,107,255,0.3)',
  'rgba(216,253,73,0.3)',
  'rgba(255,126,76,0.25)',
  'rgba(84,216,72,0.3)',
  'rgba(169,224,255,0.25)',
  'rgba(241,183,255,0.3)',
  'rgba(255,172,140,0.25)',
];

/* ═══════════════════════════════════════════════
   Abstracted / clustered process labels
   ═══════════════════════════════════════════════ */

const CLUSTERS = [
  { label: 'biweekly_roadmap_cleanup', count: 5, color: 'var(--glean-green)' },
  { label: 'sprint_retro_followup', count: 2, color: 'var(--glean-mid-blue)' },
];

/* ═══════════════════════════════════════════════
   Assistant conversation (multi-turn, condensed)
   ═══════════════════════════════════════════════ */

type TurnLine =
  | { type: 'user'; text: string }
  | { type: 'thinking'; text: string }
  | { type: 'body'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'spacer' }
  | { type: 'action'; icon: string; text: string; status: 'done' | 'pending' }
  | { type: 'ticket'; id: string; name: string; flag: string };

const CONVERSATION: TurnLine[] = [
  { type: 'user', text: 'Create a skill for how we update roadmap Jira issues every two weeks. Identify tickets that need updates and propose changes.' },
  { type: 'spacer' },
  { type: 'thinking', text: 'Using skill_creator_simple, managing_glean_roadmap, and search_jira to ground the skill in how ROAD issues are maintained...' },
  { type: 'spacer' },
  { type: 'body', text: 'I\'ve drafted the skill and applied the same logic to a first pass of ROAD cleanup.' },
  { type: 'spacer' },
  { type: 'subheading', text: 'Tickets that need updates' },
  { type: 'ticket', id: 'ROAD-729', name: 'Confluence Server group API', flag: 'GA date passed' },
  { type: 'ticket', id: 'ROAD-738', name: 'Highspot user-level perms', flag: 'Beta too long' },
  { type: 'ticket', id: 'ROAD-914', name: 'Azure DevOps boards', flag: 'Status inconsistent' },
  { type: 'ticket', id: 'ROAD-1123', name: 'MCP one-click install', flag: 'Timeline slipped' },
  { type: 'spacer' },
  { type: 'subheading', text: 'Actions' },
  { type: 'action', icon: 'edit_note', text: 'Update ROAD-729 status to Done', status: 'done' },
  { type: 'action', icon: 'update', text: 'Set new GA date for ROAD-738', status: 'done' },
  { type: 'action', icon: 'sync', text: 'Fix ROAD-914 beta scope fields', status: 'pending' },
];

/* ═══════════════════════════════════════════════
   Assistant panel (left)
   ═══════════════════════════════════════════════ */

function AssistantPanel() {
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(false), 9000);
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

      <div className="kd-stream-area">
        {CONVERSATION.map((line, i) => {
          const delay = 0.5 + i * 0.22;

          if (line.type === 'spacer') {
            return <motion.div key={i} className="kd-stream-spacer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} />;
          }
          if (line.type === 'user') {
            return (
              <motion.div key={i} className="kp-user-msg" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}>
                <span className="material-symbols-rounded kp-user-icon">person</span>
                <span>{line.text}</span>
                {showCursor && i === 0 && <span className="cursor-blink">|</span>}
              </motion.div>
            );
          }
          if (line.type === 'thinking') {
            return (
              <motion.div key={i} className="kp-thinking" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.4, 0.6] }} transition={{ delay, duration: 2, repeat: 1 }}>
                <span className="material-symbols-rounded" style={{ fontSize: 12 }}>psychology</span>
                {line.text}
              </motion.div>
            );
          }
          if (line.type === 'subheading') {
            return <motion.div key={i} className="kd-stream-subheading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.3 }}>{line.text}</motion.div>;
          }
          if (line.type === 'ticket') {
            return (
              <motion.div key={i} className="kp-ticket-row" initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }}>
                <img src={LOGOS.jira} alt="Jira" className="kp-ticket-logo" />
                <span className="kp-ticket-id">{line.id}</span>
                <span className="kp-ticket-name">{line.name}</span>
                <span className="kp-ticket-flag">{line.flag}</span>
              </motion.div>
            );
          }
          if (line.type === 'action') {
            return (
              <motion.div key={i} className="kp-action-row" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }}>
                <span className="material-symbols-rounded kp-action-icon">{line.icon}</span>
                <span className="kp-action-text">{line.text}</span>
                <motion.span
                  className={`material-symbols-rounded kp-action-status kp-action-status-${line.status}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {line.status === 'done' ? 'check_circle' : 'pending'}
                </motion.span>
              </motion.div>
            );
          }
          return (
            <motion.div key={i} className="kd-stream-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.4 }}>
              {line.text}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Process traces SVG (individual messy paths)
   ═══════════════════════════════════════════════ */

function ProcessTraces() {
  const stepX = (idx: number) => 8 + idx * (84 / (RAW_STEPS.length - 1));
  const svgH = 100;
  const traceSpacing = svgH / (TRACE_PATHS.length + 1);

  return (
    <div className="kp-traces">
      <div className="kp-traces-header">
        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>timeline</span>
        How your team updates ROAD tickets today
      </div>

      <div className="kp-step-labels">
        {RAW_STEPS.map((s, i) => (
          <motion.span
            key={i}
            className="kp-step-label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
          >
            {s}
          </motion.span>
        ))}
      </div>

      <svg className="kp-traces-svg" viewBox={`0 0 100 ${svgH}`} preserveAspectRatio="none">
        {TRACE_PATHS.map((path, ti) => {
          const baseY = (ti + 1) * traceSpacing;
          const points = path.map((stepIdx, pi) => {
            const x = stepX(stepIdx);
            const jitter = (ti * 3.7 + pi * 2.1) % 5 - 2.5;
            const y = baseY + jitter;
            return `${x},${y}`;
          }).join(' ');

          return (
            <motion.polyline
              key={ti}
              points={points}
              fill="none"
              stroke={TRACE_COLORS[ti]}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1"
              initial={{ strokeDashoffset: 1, opacity: 0 }}
              animate={{ strokeDashoffset: 0, opacity: 1 }}
              transition={{ delay: 0.8 + ti * 0.15, duration: 0.8, ease: 'easeOut' }}
            />
          );
        })}

        {TRACE_PATHS.map((path, ti) => {
          const baseY = (ti + 1) * traceSpacing;
          const lastStep = path[path.length - 1];
          const x = stepX(lastStep);
          const jitter = (ti * 3.7 + (path.length - 1) * 2.1) % 5 - 2.5;
          const y = baseY + jitter;

          return (
            <motion.circle
              key={`dot-${ti}`}
              cx={x}
              cy={y}
              r="1.5"
              fill={TRACE_COLORS[ti]}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 1.6 + ti * 0.15, duration: 0.3 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Abstraction arrow
   ═══════════════════════════════════════════════ */

function AbstractionArrow() {
  return (
    <motion.div
      className="kp-abstraction-arrow"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: 2.4, duration: 0.4, ease: 'easeOut' }}
    >
      <div className="kp-arrow-line" />
      <span className="material-symbols-rounded kp-arrow-icon">keyboard_double_arrow_down</span>
      <span className="kp-arrow-label">Glean observes + learns</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Clustered processes (abstracted)
   ═══════════════════════════════════════════════ */

function ClusteredProcesses() {
  return (
    <div className="kp-clusters">
      <div className="kp-traces-header">
        <span className="material-symbols-rounded" style={{ fontSize: 13 }}>hub</span>
        Learned skill patterns
      </div>

      <div className="kp-cluster-grid">
        {CLUSTERS.map((c, i) => (
          <motion.div
            key={i}
            className="kp-cluster-card"
            style={{ borderColor: `color-mix(in srgb, ${c.color} 30%, transparent)` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 + i * 0.18, duration: 0.4 }}
          >
            <div className="kp-cluster-name">{c.label}</div>
            <div className="kp-cluster-traces">
              {Array.from({ length: c.count }).map((_, j) => (
                <motion.div
                  key={j}
                  className="kp-cluster-trace-line"
                  style={{ background: c.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 3.0 + i * 0.18 + j * 0.1, duration: 0.35, ease: 'easeOut' }}
                />
              ))}
            </div>
            <motion.span
              className="kp-cluster-count"
              style={{ color: c.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 + i * 0.18 }}
            >
              {c.count} trace{c.count > 1 ? 's' : ''}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Right panel: Process discovery
   ═══════════════════════════════════════════════ */

function ProcessPanel() {
  return (
    <motion.div
      className="kd-data-panel"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProcessTraces />
      <AbstractionArrow />
      <ClusteredProcesses />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Main scene export
   ═══════════════════════════════════════════════ */

export function SceneKnowsProcesses() {
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
        Knows Your <span className="final-highlight">Processes</span>
      </motion.h2>

      <motion.p
        className="kd-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        Discovers how processes actually run across your org so you can have agents
        automate the way your teams work.
      </motion.p>

      <div className="kd-split">
        <AssistantPanel />
        <ProcessPanel />
      </div>
    </div>
  );
}
