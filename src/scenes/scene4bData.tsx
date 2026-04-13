import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGOS } from '../logos';

/* ─── Types ─── */

export type MatchType = 'keyword' | 'semantic' | 'activity' | 'people' | 'entity' | 'personalized';

export interface FedResult {
  title: string;
  app: string;
  logo: string;
  status: 'found' | 'missed' | 'stale';
  reason: string;
  callout?: string;
  calloutType?: 'mismatch' | 'warning' | 'info';
  keywordMismatch?: { searched: string; found: string };
  badgeText?: string;
}

export interface GleanResult {
  title: string;
  app: string;
  logo: string;
  matchTypes: MatchType[];
  reason: string;
  rankedLast?: boolean;
  subNote?: string;
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

export interface PersonalizationSignal {
  label: string;
  icon: string;
}

export interface Persona {
  name: string;
  title: string;
  initials: string;
  avatarSrc?: string;
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
  personalizationSignals?: PersonalizationSignal[];
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
      name: 'Sarah',
      title: 'Customer Success Manager',
      initials: 'SC',
      avatarSrc: '/csm.png',
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
      name: 'Rachel',
      title: 'VP of Sales',
      initials: 'RT',
      avatarSrc: '/vp.png',
      context: 'Board meeting in 30 minutes. Rachel needs the latest Q2 pipeline forecast — but the deck has been revised 6 times this week across multiple drafts.',
      searchingFor: 'Q2 pipeline forecast',
    },
  },
  {
    id: 'personalization-gap',
    tab: 'Personalization Gap',
    prompt: "What's our latest positioning on the enterprise tier?",
    query: 'enterprise tier positioning latest',
    keywords: ['enterprise', 'tier', 'positioning'],
    capabilities: ['keyword', 'semantic', 'personalized'],
    queryApps: [
      { name: 'Drive', logo: LOGOS.gdrive, color: '#0F9D58' },
      { name: 'Confluence', logo: LOGOS.confluence, color: '#1868DB' },
      { name: 'Salesforce', logo: LOGOS.salesforce, color: '#00A1E0' },
      { name: 'Teams', logo: LOGOS.teams, color: '#6264A7' },
    ],
    fedResults: [
      { title: 'Enterprise Tier — Pricing Overview (APAC)', app: 'Drive', logo: LOGOS.gdrive, status: 'stale', reason: 'Keyword "enterprise tier" matches but this is APAC team\'s doc, not David\'s product/region', badgeText: 'Wrong region', callout: 'APAC team doc — wrong region for David', calloutType: 'warning' },
      { title: 'Enterprise Tier Feature Comparison (2024)', app: 'Confluence', logo: LOGOS.confluence, status: 'stale', reason: 'Outdated doc from last year, keyword match only', badgeText: 'Stale' },
      { title: 'Q1 Marketing — Enterprise Messaging Brief', app: 'Drive', logo: LOGOS.gdrive, status: 'missed', reason: 'Marketing team doc, not product positioning' },
      { title: 'Enterprise Tier Expansion — Acme Corp', app: 'Salesforce', logo: LOGOS.salesforce, status: 'missed', reason: 'Sales opp record, not a positioning doc' },
    ],
    gleanResults: [
      { title: 'Platform Team — Enterprise Tier Positioning (NA Launch)', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['personalized'], reason: 'Your team\'s doc · Last edited 3 days ago', subNote: 'Your team\'s doc · Last edited 3 days ago' },
      { title: '#platform-launch: "Updated enterprise positioning per David\'s feedback"', app: 'Teams', logo: LOGOS.teams, matchTypes: ['personalized'], reason: 'Your channel · Mentioned by name', subNote: 'Your channel · Mentioned by name' },
      { title: 'Enterprise Tier Feature Comparison (2024)', app: 'Confluence', logo: LOGOS.confluence, matchTypes: ['keyword'], reason: 'Keyword match — deprioritized (stale, cross-team)', rankedLast: true, subNote: 'Deprioritized — stale, cross-team' },
      { title: 'Enterprise Tier — Pricing Overview (APAC)', app: 'Drive', logo: LOGOS.gdrive, matchTypes: ['keyword'], reason: 'Keyword match — deprioritized (wrong region)', rankedLast: true, subNote: 'Deprioritized — wrong region' },
    ],
    fedOutcome: '⚠ Found 0 of 4 relevant to David\'s team or role — no identity context',
    gleanOutcome: 'Found 4 of 4, ranked by identity and relevance',
    fedScore: 0,
    gleanScore: 4,
    fedScoreText: 'No identity context — same results for everyone',
    gleanScoreText: 'Personalized by team, role, and activity',
    personalizationSignals: [
      { label: 'David → Platform Team', icon: 'group' },
      { label: 'David → Recently edited NA Launch Deck', icon: 'edit_note' },
      { label: 'David → Role: Product Manager', icon: 'badge' },
    ],
    persona: {
      name: 'David',
      title: 'Product Manager',
      initials: 'DP',
      avatarSrc: '/ae.jpg',
      context: 'Preparing the NA enterprise launch, but a search for positioning docs returns results from every team and region — federated search doesn\'t know who\'s asking.',
      searchingFor: 'enterprise tier positioning latest',
    },
  },
];

/* ─── Badge config ─── */

export const BADGE_CONFIG: Record<MatchType, { label: string; icon: string; color: string; bg: string; border: string }> = {
  keyword:  { label: 'Keyword',  icon: 'text_fields',   color: '#D8FD49', bg: 'rgba(216,253,73,0.10)',  border: 'rgba(216,253,73,0.20)' },
  semantic: { label: 'Semantic', icon: 'neurology',      color: '#343CED', bg: 'rgba(52,60,237,0.12)',   border: 'rgba(52,60,237,0.25)' },
  activity: { label: 'Activity', icon: 'trending_up',    color: '#FF7E4C', bg: 'rgba(255,126,76,0.12)',  border: 'rgba(255,126,76,0.25)' },
  people:   { label: 'People',   icon: 'person_search',  color: '#3FA3FF', bg: 'rgba(63,163,255,0.12)',  border: 'rgba(63,163,255,0.25)' },
  entity:       { label: 'Entity',       icon: 'hub',            color: '#E16BFF', bg: 'rgba(225,107,255,0.12)', border: 'rgba(225,107,255,0.25)' },
  personalized: { label: 'Personalized', icon: 'person_pin',     color: '#D8FD49', bg: 'rgba(216,253,73,0.12)',  border: 'rgba(216,253,73,0.25)' },
};

/* ─── Match type colors (for SVG / graph use) ─── */

export const MATCH_COLORS: Record<MatchType, string> = {
  keyword: '#00B207',
  semantic: '#343CED',
  activity: '#FF7E4C',
  people: '#3FA3FF',
  entity: '#E16BFF',
  personalized: '#D8FD49',
};

/* ─── Shared Sub-components ─── */

export function Typewriter({ text, delay }: { text: string; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let iv: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) clearInterval(iv!);
      }, 28);
    }, delay * 1000);
    return () => {
      clearTimeout(start);
      if (iv) clearInterval(iv);
    };
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

/* ─── Outcome Text with Count-Up ─── */

export function OutcomeText({ text, delay }: { text: string; delay: number }) {
  const match = text.match(/^(.*?)(\d+)(\s+of\s+)(\d+)(.*)$/);
  if (!match) return <>{text}</>;

  const [, prefix, numStr, sep, totalStr, suffix] = match;
  const target = parseInt(numStr, 10);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setCount(0);
    setStarted(false);
    let iv: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      setStarted(true);
      if (target === 0) return;
      let i = 0;
      iv = setInterval(() => {
        i++;
        setCount(i);
        if (i >= target) clearInterval(iv!);
      }, 150);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      if (iv) clearInterval(iv);
    };
  }, [text, delay, target]);

  if (!started) return null;
  return <>{prefix}{count}{sep}{totalStr}{suffix}</>;
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
