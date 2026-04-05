import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGOS } from '../logos';

/* ─── Types ─── */

export type MatchType = 'keyword' | 'semantic' | 'activity' | 'people' | 'entity';

export interface FedResult {
  title: string;
  app: string;
  logo: string;
  status: 'found' | 'missed' | 'stale';
  reason: string;
  callout?: string;
  calloutType?: 'mismatch' | 'warning' | 'info';
  keywordMismatch?: { searched: string; found: string };
}

export interface GleanResult {
  title: string;
  app: string;
  logo: string;
  matchTypes: MatchType[];
  reason: string;
  rankedLast?: boolean;
}

export interface SemanticBridge {
  queryTerm: string;
  matchTerm: string;
  resultIndex: number;
}

export interface ActivitySignal {
  label: string;
  icon: string;
  type: 'hot' | 'recent' | 'stale';
}

export interface TeamMember {
  role: string;
  connections: { resultIndex: number; label: string }[];
}

export interface EntityConnection {
  resultIndex: number;
  relationship: string;
}

export interface Persona {
  name: string;
  title: string;
  initials: string;
  context: string;
  searchingFor: string;
}

export interface Scenario {
  id: string;
  tab: string;
  prompt: string;
  query: string;
  keywords: string[];
  capabilities: MatchType[];
  queryApps: { name: string; logo: string; color: string }[];
  fedResults: FedResult[];
  gleanResults: GleanResult[];
  fedOutcome: string;
  gleanOutcome: string;
  fedScore: number;
  gleanScore: number;
  fedScoreText: string;
  gleanScoreText: string;
  semanticBridges?: SemanticBridge[];
  activitySignals?: ActivitySignal[][];
  teamName?: string;
  teamMembers?: TeamMember[];
  entityName?: string;
  entityConnections?: EntityConnection[];
  persona: Persona;
}

/* ─── Scenario Data ─── */

export const SCENARIOS: Scenario[] = [
  {
    id: 'keyword-gap',
    tab: 'Keyword Gap',
    prompt: "Why is Acme's onboarding taking so long?",
    query: 'Acme onboarding delays',
    keywords: ['Acme', 'onboarding', 'delays'],
    capabilities: ['keyword', 'semantic'],
    queryApps: [
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
      { name: 'Jira', logo: LOGOS.jira, color: '#0052CC' },
      { name: 'ServiceNow', logo: LOGOS.servicenow, color: '#81B5A1' },
      { name: 'Teams', logo: LOGOS.teams, color: '#6264A7' },
    ],
    fedResults: [
      { title: 'Acme onboarding checklist (draft)', app: 'Drive', logo: LOGOS.gdrive, status: 'found', reason: 'Matches "Acme" + "onboarding"' },
      { title: 'ENG-4521: Setup flow regression', app: 'Jira', logo: LOGOS.jira, status: 'missed', reason: '"setup flow" ≠ "onboarding" — keyword mismatch', keywordMismatch: { searched: 'onboarding', found: 'setup flow' } },
      { title: 'Support: Configuration wizard timeout', app: 'ServiceNow', logo: LOGOS.servicenow, status: 'missed', reason: 'No keyword overlap at all', keywordMismatch: { searched: 'onboarding delays', found: 'wizard timeout' } },
      { title: '#eng-alerts: "provisioning keeps timing out"', app: 'Teams', logo: LOGOS.teams, status: 'missed', reason: '"provisioning" ≠ "onboarding" — different terminology', keywordMismatch: { searched: 'onboarding', found: 'provisioning' } },
    ],
    gleanResults: [
      { title: 'ENG-4521: Setup flow regression', app: 'Jira', logo: LOGOS.jira, matchTypes: ['semantic'], reason: '"setup flow" ≈ "onboarding"' },
      { title: '#eng-alerts: "provisioning keeps timing out"', app: 'Teams', logo: LOGOS.teams, matchTypes: ['semantic'], reason: '"provisioning timeout" ≈ "onboarding delays"' },
      { title: 'Support: Configuration wizard timeout', app: 'ServiceNow', logo: LOGOS.servicenow, matchTypes: ['semantic'], reason: '"wizard timeout" ≈ "onboarding delay"' },
      { title: 'Acme onboarding checklist (draft)', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['keyword'], reason: 'Keyword match' },
    ],
    fedOutcome: 'Found 1 of 4 relevant results',
    gleanOutcome: 'Found 4 of 4 relevant results',
    fedScore: 1,
    gleanScore: 4,
    fedScoreText: '3 results missed — keyword mismatch',
    gleanScoreText: 'Semantic understanding finds all 4',
    semanticBridges: [
      { queryTerm: 'onboarding', matchTerm: 'setup flow', resultIndex: 0 },
      { queryTerm: 'onboarding', matchTerm: 'provisioning', resultIndex: 1 },
      { queryTerm: 'onboarding delay', matchTerm: 'wizard timeout', resultIndex: 2 },
    ],
    persona: {
      name: 'Sarah Chen',
      title: 'Customer Success Manager',
      initials: 'SC',
      context: "Acme's VP just called — onboarding is taking 3x longer than promised. Sarah needs to find the root cause across support tickets, engineering bugs, and internal docs.",
      searchingFor: 'Acme onboarding delays',
    },
  },
  {
    id: 'activity-blind',
    tab: 'Activity Blind Spot',
    prompt: 'Pull up the latest Q2 pipeline forecast for the board',
    query: 'Q2 pipeline forecast',
    keywords: ['Q2', 'pipeline', 'forecast'],
    capabilities: ['keyword', 'semantic', 'activity'],
    queryApps: [
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
      { name: 'Salesforce', logo: LOGOS.salesforce, color: '#00A1E0' },
      { name: 'Teams', logo: LOGOS.teams, color: '#6264A7' },
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
    ],
    fedResults: [
      { title: 'Q2 Pipeline Forecast (OLD — Jan draft)', app: 'Drive', logo: LOGOS.gdrive, status: 'stale', reason: 'Strong keyword match — but stale January draft', callout: '⚠ Surfaced with equal ranking', calloutType: 'warning' },
      { title: 'Revenue Analytics Board', app: 'Salesforce', logo: LOGOS.salesforce, status: 'missed', reason: '"revenue analytics" ≠ "pipeline forecast"' },
      { title: '#revenue-ops: "final deck sent to board"', app: 'Teams', logo: LOGOS.teams, status: 'missed', reason: '"final deck" — no keyword overlap with "pipeline forecast"' },
      { title: 'Q2 Pipeline Forecast — FINAL v3', app: 'Drive', logo: LOGOS.gdrive, status: 'found', reason: 'Keyword match — returned with equal ranking' },
    ],
    gleanResults: [
      { title: 'Q2 Pipeline Forecast — FINAL v3', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['activity'], reason: 'Edited 6× this week, shared by VP' },
      { title: 'Revenue Analytics Board', app: 'Salesforce', logo: LOGOS.salesforce, matchTypes: ['activity'], reason: '12 views today' },
      { title: '#revenue-ops: "final deck sent to board"', app: 'Teams', logo: LOGOS.teams, matchTypes: ['activity'], reason: 'Posted 2 hours ago by VP' },
      { title: 'Q2 Pipeline Forecast (OLD — Jan draft)', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['keyword'], reason: 'Keyword match — ranked last (stale)', rankedLast: true },
    ],
    fedOutcome: 'Found 1 of 4 (wrong version surfaced first)',
    gleanOutcome: "Found 4 of 4, ranked by what's current",
    fedScore: 1,
    gleanScore: 4,
    fedScoreText: 'Wrong version surfaced first',
    gleanScoreText: 'Ranked by freshness — right doc on top',
    activitySignals: [
      [{ label: '6 edits this week', icon: 'edit', type: 'hot' }, { label: 'Shared by VP', icon: 'share', type: 'hot' }],
      [{ label: '12 views today', icon: 'visibility', type: 'hot' }],
      [{ label: '2 hours ago', icon: 'schedule', type: 'recent' }],
      [{ label: 'Last edited: Jan 12', icon: 'schedule', type: 'stale' }],
    ],
    persona: {
      name: 'Rachel Torres',
      title: 'VP of Sales',
      initials: 'RT',
      context: 'Board meeting in 30 minutes. Rachel needs the latest Q2 pipeline forecast — but the deck has been revised 6 times this week across multiple drafts.',
      searchingFor: 'Q2 pipeline forecast',
    },
  },
  {
    id: 'team-blind',
    tab: 'Team Blind Spot',
    prompt: "What's blocking the compliance review on the Apex deal?",
    query: 'compliance review Apex deal',
    keywords: ['compliance', 'review', 'Apex'],
    capabilities: ['keyword', 'semantic', 'activity', 'people'],
    queryApps: [
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
      { name: 'Salesforce', logo: LOGOS.salesforce, color: '#00A1E0' },
      { name: 'Teams', logo: LOGOS.teams, color: '#6264A7' },
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
    ],
    fedResults: [
      { title: 'General Compliance Checklist Template', app: 'Drive', logo: LOGOS.gdrive, status: 'stale', reason: 'Matches "compliance" + "review" — but generic, not deal-specific', callout: 'Generic template — not deal-specific', calloutType: 'warning' },
      { title: 'Legal Review Tracker — Pending Approval', app: 'Salesforce', logo: LOGOS.salesforce, status: 'missed', reason: 'CRM record metadata not returned by search API' },
      { title: '#legal-reviews: "EU hosting constraint — need sign-off"', app: 'Teams', logo: LOGOS.teams, status: 'missed', reason: '"hosting constraint" — no keyword overlap', keywordMismatch: { searched: 'compliance review', found: 'hosting constraint' } },
      { title: 'Apex Corp — Legal Review Notes', app: 'Drive', logo: LOGOS.gdrive, status: 'found', reason: 'Matches "Apex" + "review" — but ranked same as generic template' },
    ],
    gleanResults: [
      { title: 'Apex Corp — Legal Review Notes', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['people'], reason: 'Author is assigned counsel for Apex deal' },
      { title: 'Legal Review Tracker — Pending Approval', app: 'Salesforce', logo: LOGOS.salesforce, matchTypes: ['people'], reason: 'Updated by Apex deal owner in CRM' },
      { title: '#legal-reviews: "EU hosting constraint — need sign-off"', app: 'Teams', logo: LOGOS.teams, matchTypes: ['people', 'semantic'], reason: 'Posted by compliance analyst + semantic' },
      { title: 'General Compliance Checklist Template', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['keyword'], reason: 'Keyword match — ranked last (generic)', rankedLast: true },
    ],
    fedOutcome: 'Found 2 of 4 — generic template ranked above deal notes',
    gleanOutcome: 'Found 4 of 4, prioritized by deal-team relevance',
    fedScore: 1,
    gleanScore: 4,
    fedScoreText: 'Generic template outranks deal-specific notes',
    gleanScoreText: 'Prioritized by deal-team relevance',
    teamName: 'Apex Deal Team',
    teamMembers: [
      { role: 'Legal Counsel', connections: [{ resultIndex: 0, label: 'Author' }, { resultIndex: 1, label: 'Updated' }] },
      { role: 'Compliance Analyst', connections: [{ resultIndex: 2, label: 'Posted by' }] },
    ],
    persona: {
      name: 'David Park',
      title: 'Account Executive',
      initials: 'DP',
      context: 'Trying to close the Apex Corp deal, but a compliance review is stalling it. David needs the legal review notes and the hosting sign-off — fast.',
      searchingFor: 'compliance review Apex deal',
    },
  },
];

/* ─── Badge config ─── */

export const BADGE_CONFIG: Record<MatchType, { label: string; icon: string; color: string; bg: string; border: string }> = {
  keyword:  { label: 'Keyword',  icon: 'text_fields',   color: '#D8FD49', bg: 'rgba(216,253,73,0.10)',  border: 'rgba(216,253,73,0.20)' },
  semantic: { label: 'Semantic', icon: 'neurology',      color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.25)' },
  activity: { label: 'Activity', icon: 'trending_up',    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.25)' },
  people:   { label: 'People',   icon: 'person_search',  color: '#0ea5e9', bg: 'rgba(14,165,233,0.12)',  border: 'rgba(14,165,233,0.25)' },
  entity:   { label: 'Entity',   icon: 'hub',            color: '#ec4899', bg: 'rgba(236,72,153,0.12)',  border: 'rgba(236,72,153,0.25)' },
};

/* ─── Match type colors (for SVG / graph use) ─── */

export const MATCH_COLORS: Record<MatchType, string> = {
  keyword: '#10b981',
  semantic: '#8b5cf6',
  activity: '#f59e0b',
  people: '#0ea5e9',
  entity: '#ec4899',
};

/* ─── Shared Sub-components ─── */

export function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const start = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) clearInterval(iv);
      }, 28);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(start);
  }, [text, delay]);

  return (
    <>
      <span>{text.slice(0, count)}</span>
      {count < text.length && <span className="s4b-cursor">|</span>}
    </>
  );
}

export function CapabilityBadge({ type, delay }: { type: MatchType; delay: number }) {
  const cfg = BADGE_CONFIG[type];
  return (
    <motion.span
      className="s4b-cap-badge"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 15 }}>{cfg.icon}</span>
      {cfg.label}
    </motion.span>
  );
}

export function MatchBadge({ type }: { type: MatchType }) {
  const cfg = BADGE_CONFIG[type];
  return (
    <span
      className="s4b-match-badge"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      <span className="material-symbols-rounded" style={{ fontSize: 12 }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

/* ─── Prompt → Query Flow ─── */

export function PromptToQuery({ prompt, query, animKey }: { prompt: string; query: string; animKey: number }) {
  const promptDuration = prompt.length * 0.028;
  const connectorDelay = promptDuration + 0.35;
  const queryDelay = connectorDelay + 0.45;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`ptq-${animKey}`}
        className="ptq-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="ptq-prompt-bar">
          <span className="material-symbols-rounded ptq-prompt-icon">person</span>
          <span className="ptq-prompt-text">
            <Typewriter text={prompt} delay={0.1} />
          </span>
        </div>

        <motion.div
          className="ptq-connector"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: connectorDelay, duration: 0.3, ease: 'easeOut' }}
        >
          <span className="ptq-connector-line" />
          <span className="ptq-connector-badge">
            <span className="material-symbols-rounded" style={{ fontSize: 13 }}>auto_awesome</span>
            AI search query
          </span>
          <span className="ptq-connector-line" />
        </motion.div>

        <div className="s4b-query-bar">
          <span className="material-symbols-rounded" style={{ fontSize: 18, color: 'rgba(255,255,255,0.35)' }}>search</span>
          <span className="s4b-query-text">
            <Typewriter text={query} delay={queryDelay} />
          </span>
          <motion.div
            className="s4b-query-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ delay: queryDelay + query.length * 0.028 + 0.1, duration: 0.8 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
