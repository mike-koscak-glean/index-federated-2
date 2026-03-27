# Presenter Script — Why Enterprises Need an Indexed Knowledge Graph

> "Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions."

Two paths. Same question. Radically different outcomes.

---

## Scene 0 — Cold Open

**~20 seconds**

Every enterprise leader asks this question. It sounds simple — but the answer lives across a dozen systems, owned by different teams, governed by different permissions.

Today we'll show you two fundamentally different ways to answer it. One wires up live API calls and hopes for the best. The other builds a foundation that actually understands your business.

---

## Scene 1 — How Federated / MCP Works

**~35 seconds**

This is how federated search works. Your query hits a router, which fans out live API calls to every system — Drive, Jira, Salesforce, Slack, Confluence, ServiceNow, Gong.

You're only as fast as your slowest system. But latency isn't the real issue. Each app returns its own slice using its own relevance logic. There's no shared understanding of what matters — no way to correlate a Salesforce opportunity with a Slack escalation with a Jira P1. The system stacks fragments together and calls it an answer.

No memory. No enterprise context. Every query starts from scratch. And when you pipe all that unranked content into an LLM, every irrelevant document burns tokens and money. You're overloading the context window with noise and paying more for worse answers.

For a question like Customer 360 — where the value is in the *connections* between data — this approach is fundamentally blind.

---

## Scene 2 — How Glean Indexing Works

**~35 seconds**

Now, the other path. Glean connects to over 100 enterprise systems and deeply crawls each one — not just content, but permissions, people, org structure, and activity signals.

All of that feeds into a single, permission-aware enterprise index. Glean mirrors the exact access controls from every source system. If you shouldn't see it in Salesforce, you won't see it in Glean.

On top of this index, Glean builds an enterprise knowledge graph. It doesn't just know a document exists — it knows who owns it, who's read it, which team it belongs to, and how it connects to your accounts, projects, and people. That graph powers hybrid search with over 60 ranking signals, tuned on *your* data.

This is the difference between a pile of documents and actual understanding.

---

## Scene 3 — LLM / Agent on Federated Data

**~30 seconds**

Now let's feed these results to an AI agent.

With federated retrieval, the context window fills up fast — but it's mostly noise. Stale records, duplicates, archived tickets. The LLM can't tell what's current or what's relevant. It reasons longer, makes more calls, burns more compute, and still produces unreliable output.

*Bigger context windows don't fix bad retrieval.* Garbage in, garbage out — no matter how powerful the model. Retrieval quality is the bottleneck. Not model capability.

---

## Scene 4 — LLM / Agent on Glean Index

**~40 seconds**

Now compare. Same question, but the agent calls into Glean's index.

Before the LLM sees a single token, Glean runs a purpose-built ML ranking pipeline — over 60 signals trained on *your* data. Semantic matching, personalization based on your role and activity, popularity, recency. Out of 200+ candidates, ML narrows it to four — curated, permission-checked, verified.

Only *then* does the LLM take over. From that small, high-signal context, it composes a real Customer 360: summary, health score, risks, and next best actions. No extra reasoning loops. No hallucination from stale data.

ML does the heavy lifting *before* the LLM. Better retrieval means fewer reasoning steps, lower cost, faster answers, and results you can trust.

---

## Scene 5 — MCP as Access Layer on Top of Glean

**~30 seconds**

So where does MCP fit? As the access layer *on top of* the index.

MCP is a great protocol — but it's a port, not an engine. Without an intelligent layer underneath, every MCP host reinvents retrieval and permissions from scratch.

With Glean underneath, every client — Cursor, desktop agents, Slack bots, custom apps — connects through MCP into the same governed graph. One index. One permission model. One source of truth.

MCP gives you openness. Glean gives you intelligence and governance.

---

## Scene 6 — The Search Advantage

**~20 seconds**

Latency, relevance, coverage, governance, agent reliability — across every dimension, the gap is stark. An indexed enterprise graph gives your agents a brain.

But better search and better AI answers? That's just the starting point. A real knowledge graph unlocks an entirely new category of intelligence.

---

## Scene 7 — Beyond Search

**~30 seconds**

This is what the enterprise graph makes possible — and it's the foundation for every advanced use case we're building. You've already seen agents and workflow automation in action. But the same graph also powers **Prism** — real-time entity views like account health and deal risk, built automatically from signals across Gong, Slack, Jira, and Salesforce. **Personal Graph** infers your tasks, projects, and collaborators from your activity, so every interaction is contextual. And **Proactive Intelligence** surfaces what matters — churn alerts, recommendations, next steps — before you even ask.

Every one of these capabilities compounds on the same permission-aware graph. No re-indexing. No re-integration. One foundation that keeps unlocking new value.

---

## Scene 8 — The Full Picture

**~30 seconds**

Here's the full picture. At the base: 100+ enterprise systems. Above that: a unified, permission-aware index. On top: the enterprise knowledge graph — entities, relationships, and signals tuned on *your* data.

From that one foundation, you ship an entire platform: Search, AI Assistant, Agents, Prism, Workflow Automation, Personal AI. All governed, all from one index.

Federated gives your AI fragments. An enterprise graph gives it understanding. **Index once. Unlock everything.**