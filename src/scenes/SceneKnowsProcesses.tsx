import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LOGOS } from '../logos';

/* ═══════════════════════════════════════════════
   App icon definitions for process trace pills
   ═══════════════════════════════════════════════ */

const APP_COLORS: Record<string, string> = {
  JI: '#2684FF',
  CF: '#1868DB',
  SL: '#E01E5A',
  SH: '#34A853',
};

/* ═══════════════════════════════════════════════
   Trace lane definitions — each person's messy path
   ═══════════════════════════════════════════════ */

const TRACE_LANES = [
  { name: 'Sarah', color: '#3FA3FF', avatar: '/vp.png', apps: ['JI', 'JI', 'CF', 'SL', 'JI', 'SH'] },
  { name: 'Mark', color: '#E16BFF', avatar: '/other.png', apps: ['SL', 'JI', 'JI', 'SL', 'CF', 'JI'] },
  { name: 'Priya', color: '#D8FD49', avatar: '/csm.png', apps: ['JI', 'SH', 'JI', 'CF', 'JI'] },
  { name: 'Dev', color: '#FF7E4C', avatar: '/ae.jpg', apps: ['SL', 'SL', 'JI', 'JI', 'CF', 'SH', 'JI'] },
];

const DISTILLED_STEPS = ['Open ROAD board', 'Check status', 'Compare dates', 'Flag stale', 'Update fields', 'Notify PM'];

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
                <span className="material-symbols-rounded" style={{ fontSize: 14 }}>psychology</span>
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
   App icon pill
   ═══════════════════════════════════════════════ */

function AppPill({ app, muted, highlight }: { app: string; muted?: boolean; highlight?: boolean }) {
  const color = APP_COLORS[app] ?? '#888';
  return (
    <span
      className={`kp-app-pill ${muted ? 'kp-app-pill-muted' : ''} ${highlight ? 'kp-app-pill-highlight' : ''}`}
      style={{ '--pill-color': color } as React.CSSProperties}
    >
      <span className="kp-app-dot" style={{ background: color }} />
      <span className="kp-app-abbr">{app}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════
   Phase 1 — Chaotic trace lanes
   ═══════════════════════════════════════════════ */

function TraceLanes({ phase }: { phase: number }) {
  const converged = phase >= 2;
  const faded = phase >= 3;

  return (
    <motion.div
      className="kp-lanes-wrap"
      animate={{ opacity: faded ? 0.3 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="kp-lanes-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.33 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 15 }}>timeline</span>
        How your team does it today
      </motion.div>

      <div className="kp-lanes">
        {TRACE_LANES.map((lane, li) => {
          const laneDelay = 0.66 + li * 0.55;
          const centerOffset = converged ? (li - (TRACE_LANES.length - 1) / 2) * -8 : 0;

          return (
            <motion.div
              key={lane.name}
              className="kp-trace-lane"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: centerOffset }}
              transition={{
                opacity: { delay: laneDelay, duration: 0.39 },
                x: { delay: laneDelay, duration: 0.39, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <img src={lane.avatar} alt={lane.name} className="kp-avatar" />
              <span className="kp-lane-name">{lane.name}</span>
              <div className="kp-lane-pills">
                {lane.apps.map((app, pi) => {
                  const pillDelay = laneDelay + 0.17 + pi * 0.13;
                  const isCommon = ['JI', 'CF'].includes(app);
                  return (
                    <motion.span
                      key={`${lane.name}-${pi}`}
                      className="kp-pill-slot"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{
                        opacity: converged && !isCommon ? 0.15 : 1,
                        scale: 1,
                      }}
                      transition={{
                        opacity: { delay: converged ? 0 : pillDelay, duration: 0.33 },
                        scale: { delay: pillDelay, duration: 0.28, type: 'spring', stiffness: 300, damping: 22 },
                      }}
                    >
                      <AppPill app={app} muted={converged && !isCommon} highlight={converged && isCommon} />
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scan line — sweeps during phase 2 */}
      {phase >= 2 && (
        <motion.div
          className="kp-scan-line"
          initial={{ left: '-4%', opacity: 0 }}
          animate={{ left: '104%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.06, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Phase 2 — Observe label
   ═══════════════════════════════════════════════ */

function ObserveLabel({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="kp-observe-label"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.66, duration: 0.44 }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 14 }}>auto_awesome</span>
      Glean observes + learns
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Phase 3 — Distilled pipeline
   ═══════════════════════════════════════════════ */

function DistilledPipeline({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="kp-pipeline-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        className="kp-pipeline-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.17, duration: 0.33 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 15 }}>conversion_path</span>
        Distilled process
      </motion.div>

      <div className="kp-pipeline">
        {DISTILLED_STEPS.map((step, i) => (
          <motion.div
            key={step}
            className="kp-pipeline-step-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 + i * 0.13, duration: 0.39, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="kp-pipeline-step">{step}</span>
            {i < DISTILLED_STEPS.length - 1 && (
              <span className="material-symbols-rounded kp-pipeline-arrow">east</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Phase 3 — Skill pattern cards
   ═══════════════════════════════════════════════ */

function SkillCards({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <motion.div
      className="kp-clusters"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.88, duration: 0.44 }}
    >
      <div className="kp-traces-header">
        <span className="material-symbols-rounded" style={{ fontSize: 15 }}>hub</span>
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
            transition={{ delay: 1.1 + i * 0.2, duration: 0.44 }}
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
                  transition={{ delay: 1.32 + i * 0.2 + j * 0.11, duration: 0.39, ease: 'easeOut' }}
                />
              ))}
            </div>
            <motion.span
              className="kp-cluster-count"
              style={{ color: c.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.54 + i * 0.2 }}
            >
              {c.count} trace{c.count > 1 ? 's' : ''}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Right panel: Process Mining Replay (looping 3-phase)
   ═══════════════════════════════════════════════ */

function ProcessMiningReplay() {
  const [phase, setPhase] = useState(1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t2 = setTimeout(() => setPhase(2), 3850);
    const t3 = setTimeout(() => setPhase(3), 6600);
    const tReset = setTimeout(() => {
      setPhase(1);
      setCycle(c => c + 1);
    }, 12500);
    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(tReset); };
  }, [cycle]);

  return (
    <motion.div
      className="kd-data-panel"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.33, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div key={cycle} className="kp-replay-cycle">
        <TraceLanes phase={phase} />
        <ObserveLabel visible={phase >= 2} />
        <DistilledPipeline visible={phase >= 3} />
        <SkillCards visible={phase >= 3} />
      </div>
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
        <ProcessMiningReplay />
      </div>
    </div>
  );
}
