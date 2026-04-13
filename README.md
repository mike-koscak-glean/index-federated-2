# Glean Search Index vs Federated — Interactive Presentation

An animated, click-through presentation that explains why enterprises need a deep, permission-aware index instead of relying solely on MCP / federated search.

## What this is

A single-page React app with 10 animated scenes you click (or arrow-key) through while narrating. Built for screen-sharing in customer conversations, internal enablement, and conference demos.

The narrative follows one enterprise question through two paths:

> "Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions."

- **Left path:** MCP / federated-only — live API calls, no shared index, shallow ranking
- **Right path:** Glean's Search Index + Enterprise Graph — 100+ connectors, permission-aware search index, 60+ ranking signals

## Scenes

| Step | Title | What it shows |
|------|-------|---------------|
| 0 | Cold Open | Typing query, two path cards |
| 1 | Federated / MCP | Hub-spoke diagram with latency, messy results |
| 2 | Glean Indexing | Connectors → search index → Enterprise Graph — see [Scene 2 prototypes](#scene-2-prototypes) |
| 3 | Results Comparison | Side-by-side: bad AI answer vs Glean's synthesized Customer 360 |
| 4 | Agent on Federated | Noisy context window, garbage-in-garbage-out |
| 5 | Agent on Glean | Curated context, composed answer with actions |
| 6 | MCP + Glean | Architecture: MCP as access layer on top of Glean's graph |
| 7 | Search Win | Metric comparison, transition tease |
| 8 | Beyond Search | Constellation: agents, Prism, Personal graph, proactive intel, workflows |
| 9 | Full Picture | Platform stack visual, closing tagline |

## Running locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. Use arrow keys, spacebar, or the bottom stepper to navigate.

## Presenter script

See [`presenter-script.md`](./presenter-script.md) for a scene-by-scene verbal script (~5 minutes total).

## Scene 2 prototypes

Scene 2 ("The Glean Search Index") has three alternative visualizations. Only one is active at a time — swap it in `src/App.tsx` line 34:

```typescript
// Change Scene2B to Scene2A, Scene2, or Scene2C
const scenes = [Scene0, Scene1, Scene2B, Scene4, ...];
```

| File | Approach | Visual concept |
|------|----------|----------------|
| `Scene2.tsx` | Radial (original) | Circular connector ring, concentric layer rings with flowing dashes, particle streams, Enterprise Graph nodes emerge from center |
| `Scene2A.tsx` | Stacked Layers | Four translucent planes in CSS 3D perspective (`rotateX 55°`), each representing a search index layer. Planes reveal sequentially, data dots materialize, Enterprise Graph overlays the stack |
| `Scene2B.tsx` | Neural Mesh | Dense spider-web mesh radiating from center, illuminates progressively outward. Each quadrant lights up in a different layer color. Subtle flow dots travel from connectors to center |
| `Scene2C.tsx` | Prism Flow | Left-to-right transformation: messy data fragments on the left pass through a hexagonal prism (Glean), emerge as organized color-coded beams feeding into the Enterprise Graph on the right |

Once a winner is chosen, replace `Scene2.tsx` with it and delete the others.

## Tech stack

- React 19 + TypeScript
- Vite
- Framer Motion (animations)
- App logos from Glean's CDN (`image_urls_combined_unique.txt`)
- Material Symbols for generic icons
- Glean brand colors: `#343CED` (blue), `#D8FD49` (green), `#F6F3EB` (oatmeal)
