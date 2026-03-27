# Presenter Script — Why Enterprises Need an Indexed Knowledge Graph

> "Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions."

Two paths. Same question. Radically different outcomes.

---

## Scene 0 — Cold Open
**~30 seconds**

Every enterprise leader eventually asks this question. "What's really happening with our most important customer?" It sounds simple. It's not — because the answer lives across a dozen systems, owned by different teams, governed by different permissions.

Today we're going to show you two fundamentally different ways to answer it. One wires up live API calls and hopes for the best. The other builds a foundation that actually understands your business. By the end, the right choice will be obvious.

---

## Scene 1 — How Federated / MCP Works
**~45 seconds**

This is how federated search works. Your query hits a router, which fans out live API calls to every system — Drive, Jira, Salesforce, Slack, Confluence, ServiceNow, Gong.

The problem starts immediately: you're only as fast as your slowest system. One overloaded endpoint and the entire experience stalls.

But latency isn't even the real issue. Each app returns its own slice of results using its own relevance logic. There's no shared understanding of what matters. No way to correlate a Salesforce opportunity with a Slack escalation with a Jira P1. The system just stacks fragments together and calls it an answer.

No memory. No enterprise context. Every query starts from scratch. For a question like Customer 360 — where the value is in the *connections* between data — this approach is fundamentally blind.

---

## Scene 2 — How Glean Indexing Works
**~45 seconds**

Now, the other path. Glean connects to over 100 enterprise systems and deeply crawls each one — not just content, but permissions, people, org structure, and activity signals like views, edits, and comments.

All of that feeds into a single, permission-aware enterprise index. Glean mirrors the exact access controls from every source system, enforced at both index time and query time. If you shouldn't see it in Salesforce, you won't see it in Glean.

But the real power is what Glean builds on top: an enterprise knowledge graph. It doesn't just know that a document exists — it knows who owns it, who's read it 124 times, which team it belongs to, and how it connects to your accounts, projects, and people. That graph powers hybrid lexical and semantic search with over 60 ranking signals, tuned on *your* enterprise data.

This is the difference between a pile of documents and actual understanding.

---

## Scene 3 — Federated vs Indexed Results
**~45 seconds**

Same query, side by side. The difference is immediate.

On the left, federated results: a list of links, grouped by app. Half of them are stale — closed-lost opportunities, archived tickets, an outdated runbook. And buried at position six, a Slack thread where the customer is *threatening to churn*. The most critical insight in the entire result set, and it's invisible.

Now look at the right side. Glean doesn't just return links — it returns an *answer*. At the top, an AI-generated Customer 360: deal value, churn risk, open P1, executive sponsor change. Below that, suggested next actions — schedule an EBR, escalate the bug, share the roadmap. Then a key contact card with the account owner. And *then* the supporting documents — each with rich context: who owns it, how many times it's been viewed, whether you were in the meeting where it was discussed.

This is the difference between a search engine and a knowledge engine. Federated gives you fragments to sift through. Glean gives you understanding — synthesized, ranked, actionable, and permission-verified.

---

## Scene 4 — LLM / Agent on Federated Data
**~40 seconds**

Now let's feed these results to an AI agent.

With federated retrieval, the agent's context window fills up fast — but it's mostly noise. Stale records, duplicates, archived tickets, an 18-month-old runbook. The LLM has no way to tell what's current, what's authoritative, or what's relevant. So it reasons longer, makes more calls, burns more compute, and still produces unreliable output.

This is the fundamental insight people miss: *bigger context windows don't fix bad retrieval.* Garbage in, garbage out — no matter how powerful the model. And every MCP host has to reinvent this retrieval from scratch, with no shared enterprise memory.

Retrieval quality is the bottleneck. Not model capability.

---

## Scene 5 — LLM / Agent on Glean Index
**~50 seconds**

Now compare. Same question, but the agent calls into Glean's index.

On the left you can see what happens *before* the LLM ever sees a token. Glean runs a machine-learning relevance engine — not an LLM, a purpose-built ranking pipeline with over 60 signals trained on *your* enterprise data. Semantic matching understands meaning beyond keywords. Personalization weighs what matters to *you* based on your role, your activity, your team. Popularity surfaces what the rest of the company actually uses. Recency ensures the freshest information wins.

The result: out of 200+ candidate documents, ML narrows it to four — curated, permission-checked, verified. The active opportunity. The churn escalation. The latest QBR. The key contact.

Only *then* does the LLM take over. From that small, high-signal context, it composes a real Customer 360: summary, health score, risks, and next best actions. No extra reasoning loops. No hallucination from stale data. No permission leaks.

This is the key insight: ML does the heavy lifting *before* the LLM. Better retrieval means fewer reasoning steps, lower cost, faster answers, and results you can actually trust.

---

## Scene 6 — MCP as Access Layer on Top of Glean
**~35 seconds**

So where does MCP fit? Right here — as the access layer *on top of* the index.

MCP is a great protocol for connecting tools and agents. But it's a port, not an engine. Without an intelligent layer underneath, every MCP host is on its own — reinventing retrieval, reimplementing permissions, getting inconsistent results.

With Glean underneath, every client — Cursor, desktop agents, Slack bots, internal tools, custom apps — connects through MCP into the same governed enterprise graph. One index. One permission model. One source of truth.

MCP gives you openness. Glean gives you intelligence and governance. You need both.

---

## Scene 7 — Final Comparison & Takeaway
**~40 seconds**

Latency, relevance, coverage, governance, agent reliability — across every dimension that matters, the gap is stark.

Federated search gives you fragments. An indexed enterprise graph gives your agents a brain.

The question isn't whether MCP is useful — it is. The question is what's underneath it. If the answer is "live API calls and hope," you'll get inconsistent, slow, ungoverned results. If the answer is a deep, permission-aware index that understands your content, your people, and your business — you get AI that actually works.

**Index once with Glean. Reuse everywhere.**
