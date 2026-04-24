# Glean Search Index vs Federated - Interactive Presentation

An animated, click-through React presentation that compares:

- federated retrieval + MCP only
- vs. a unified, permission-aware search index + enterprise graph

It is designed for live narration (customer demos, enablement, talks), with keyboard and click navigation between scenes.

## Narrative in one line

The deck follows this core prompt:

> "Provide a Customer 360 for Acme: recent deals, support issues, key contacts, risks, and next best actions."

and shows why pre-indexed, relevance-ranked retrieval produces better downstream AI behavior than live fan-out queries alone.

## Current scene flow (13 steps)

The active scene order is defined in `src/App.tsx`.

| Step | Label | Component | What it shows |
| --- | --- | --- | --- |
| 0 | Question | `Scene0` | Opening query typing animation + roadmap |
| 1 | Federated | `Scene1` | Fan-out retrieval pattern and noisy result flood |
| 2 | Fed Problem | `SceneFedProblem` | Why keyword-only federated retrieval misses/returns stale content |
| 3 | Index | `Scene2` | Unified index + enterprise graph build-up and query traversal |
| 4 | Search Gap | `Scene4B1` | Side-by-side scenario walk-through: federated vs unified index |
| 5 | Agent + Glean | `Scene5` | Ranking signals + curated context into a stronger agent answer |
| 6 | MCP + Glean | `Scene6` | Architecture layering: MCP/actions on top of enterprise graph |
| 7 | Search Win | `Scene7` | Dimension-by-dimension comparison table |
| 8 | Beyond Search | `Scene8` | Expanded platform outcomes beyond classic search |
| 9 | Knows Your Data | `SceneKnowsData` | Structured + unstructured signal fusion for churn assessment |
| 10 | Knows Your People | `SceneKnowsPeople` | Org/collaboration graph for stakeholder recommendations |
| 11 | Knows Your Processes | `SceneKnowsProcesses` | Process pattern extraction and operational actions |
| 12 | Full Picture | `Scene9` | Final stack synthesis + closing message |

## Running locally

```bash
npm install
npm run dev
```

Local URL: `http://localhost:5173`

### Controls

- `ArrowRight` or `Space`: next scene
- `ArrowLeft`: previous scene
- Bottom stepper dots: jump to any step
- Back/Next buttons: click navigation

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.tsx`: scene orchestration, transitions, keyboard navigation, step labels
- `src/scenes/`: all presentation scenes and comparison panels
- `src/components/StepIndicator.tsx`: bottom navigation UI
- `src/logos.ts`: centralized logo/icon asset URLs
- `src/scenes/scenes.css`: scene-level styling
- `public/`: local image assets (avatars and supporting visuals)
- `presenter-script.md`: optional talk track

## Customizing the deck

### Reorder, add, or remove scenes

Update both arrays in `src/App.tsx`:

- `STEP_LABELS` (text shown in the stepper)
- `scenes` (actual component order)

Also keep `TOTAL_STEPS` in sync with the number of scenes.

### Update scenario content

Scene comparison data is centralized in `src/scenes/scene4bData.tsx`.

### Swap logos and connectors

Edit `src/logos.ts` (used throughout scene components).

## Tech stack

- React 19
- TypeScript
- Vite
- Framer Motion
- Material Symbols (icon font)
