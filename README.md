# Unreal Engine 5.7 / 5.8 — C++ Learning Path

A self-contained, single-page learning path that takes you from your **first `UCLASS`** to **shipping, profiling and extending the engine** in C++. It includes curated learning resources and hands-on exercises/challenges, with two progress bars and import/export of your progress.

- **No back end, no build step, no dependencies** — pure HTML / CSS / JS.
- Runs both **directly from disk** (double-click `index.html`) and **served over HTTP** (GitHub Pages or any static host).
- Progress is stored locally in your browser; **Export/Import** moves it between machines.

## Contents / structure

```
.
├── index.html        # page shell: header, the two progress bars, toolbar
├── css/styles.css    # UE dark / Epic-style theme
├── js/content.js     # the curriculum data (8 stages, modules, exercises) — edit here to extend
├── js/app.js         # rendering, progress tracking, persistence, import/export
├── .nojekyll         # makes GitHub Pages serve files verbatim
└── README.md
```

## Running it

### Option A — open directly (no server)
Double-click **`index.html`** (or open it via `File → Open` in your browser). It works from the `file://` protocol because it uses classic `<script>` tags and embeds its data in `content.js` — no `fetch()` and no ES modules.

### Option B — local static server (optional)
Identical to how GitHub Pages serves it:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a repository and push these files to the `main` branch (keep the structure above; the paths are all relative).
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, **Branch = `main`**, **Folder = `/ (root)`**, then **Save**.
4. Wait for the build, then open `https://<your-user>.github.io/<your-repo>/`.

The included `.nojekyll` file ensures Pages serves every file as-is.

## How progress works

Each module has one **“Mark module as studied”** checkbox, plus one checkbox per **exercise/challenge**. The two bars:

- **Total progress** — every trackable item (study items + exercises/challenges).
- **Exercises & challenges** — only the exercises/challenges.

Progress is saved to `localStorage` under the key `ue5-cpp-progress-v1`, so it persists across reloads on the same browser. To back up or transfer it:

- **Export** downloads a `ue5-cpp-progress-YYYYMMDD.json` file.
- **Import** loads such a file and replaces your current progress (it validates the file and reports errors instead of crashing).
- **Reset** clears all progress (with a confirmation prompt).

> Note: opening from `file://` and serving from `http://` are treated as **different origins** by the browser, so `localStorage` is not shared between them — use Export/Import to move progress across.

## The path at a glance

| Stage | Focus | Level |
|------:|-------|-------|
| 0 | Foundations & Setup | Beginner |
| 1 | UE C++ Fundamentals (reflection, UObjects, GC, core types) | Beginner |
| 2 | Gameplay Framework (Actors, Pawns, GameMode, Enhanced Input) | Intermediate |
| 3 | C++ ↔ Blueprint Integration | Intermediate |
| 4 | Gameplay Systems & Architecture (GAS, networking, AI, animation) | Advanced |
| 5 | Engine Internals & Performance (memory, threading, profiling, UI) | Advanced |
| 6 | Tooling, Plugins & Editor Extension | Expert |
| 7 | Expert Practice & Capstone | Expert |

## Extending the curriculum

All content lives in **`js/content.js`** as `window.CURRICULUM`. Add stages, modules, resources or exercises there — no other file needs changing. Keep every `id` **unique and stable**: progress is keyed by id, so renaming an id resets that item's saved completion.

External resource links target canonical Epic documentation and well-known community resources. Links can move over time; if one breaks, search its title on [dev.epicgames.com](https://dev.epicgames.com/documentation/unreal-engine).
