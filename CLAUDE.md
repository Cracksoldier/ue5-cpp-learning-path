# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A self-contained, zero-dependency single-page web app: a guided Unreal Engine 5.7/5.8 C++ learning path with trackable progress. Pure HTML/CSS/vanilla JS — **no build step, no package manager, no back end, no tests**. It is deployed as static files to GitHub Pages.

## Running

There is nothing to build or install.

- **From disk:** open `index.html` (landing) or `app.html` (the tracker) directly in a browser via `file://`.
- **Over HTTP** (mirrors GitHub Pages): `python -m http.server 8000`, then open `http://localhost:8000`.

> `file://` and `http://` are different origins, so `localStorage` progress is **not shared** between them — use the in-app Export/Import to move it.

## Hard constraint: must run from `file://`

This is the single most important architectural rule. Everything is loaded with **classic `<script>` tags** — no ES modules, no `fetch()`, no `import`. That is why the curriculum data lives in `js/content.js` as a global (`window.CURRICULUM`) rather than a JSON file loaded at runtime: `fetch()` of a local JSON file is blocked under `file://`. **Do not introduce modules, fetch, bundlers, or any tooling that breaks double-click-to-open.**

Script load order matters: `content.js` must load **before** `app.js` / `landing.js` (they read `window.CURRICULUM` at parse/init time).

## Architecture

Two pages share one stylesheet and one data file:

- `js/content.js` — **the curriculum** (`window.CURRICULUM`): 8 stages → modules → resources + exercises/challenges. This is the only file you edit to change content. Everything else is rendering/plumbing.
- `js/app.js` — the tracker (`app.html`): renders stages, owns progress state, persistence, and import/export. IIFE, vanilla DOM via an `el()` helper.
- `js/landing.js` — the landing page (`index.html`): renders stats + topic cards from the same data. **Read-only** — it never writes `localStorage`; `app.js` owns the storage key.
- `css/styles.css` — UE/Epic dark theme, shared by both pages.

### Progress model (in `app.js`)

Every trackable item has a stable string id:
- `"<moduleId>:study"` — the "Mark module as studied" checkbox
- `"<exerciseId>"` — one per exercise/challenge

State shape persisted to `localStorage` key `ue5-cpp-progress-v1`:
`{ version, completed: { [id]: true }, updatedAt }`. Two progress bars derive from it: **Total** (all study + exercise items) and **Exercises & challenges** (exercises only). `sanitizeCompleted()` guards every entry point (load + import) so corrupt/tampered data can't enter state. Unknown ids survive a round-trip through export but never appear in the UI.

### Cross-file invariants (keep these in sync if you touch them)

- The storage key `"ue5-cpp-progress-v1"` is duplicated in both `app.js` and `landing.js`.
- The id scheme (`<module>:study` + exercise ids) is recomputed independently in both files (`collectValidIds` / `validIds`) — they must agree.
- Stat counts shown on the landing page are computed from the data, not hardcoded (the numbers in `index.html` are just placeholders overwritten on load).

## Editing the curriculum

All content is in `js/content.js`. Add/edit stages, modules, `resources`, `exercises` there — no other file changes. **Keep every `id` unique and stable**: progress is keyed by id, so renaming an id silently resets that item's saved completion. Stage ids are `s0`…`s7`; module ids `s0-m1`; exercise ids `s0-m1-e1`. Exercise fields: `kind` (`"exercise"`|`"challenge"`), `difficulty`, `goal`, `steps[]`, `acceptance[]`, `hints[]`. Resource `type` drives an icon (`doc`/`video`/`book`/`repo`).

Landing topic cards deep-link to `app.html#<stageId>`; `applyHash()` in `app.js` validates the hash against real stage ids before using it as a selector, then opens/scrolls to that stage.

## Resource links & verification

External links target canonical Epic docs (`dev.epicgames.com`) and known community resources. Note (from project memory): the corporate network 403-blocks `dev.epicgames.com` / `tomlooman.com` even via the WinFoom proxy (`http://localhost:3129`) — verify such URLs via `r.jina.ai` and judge by page title, since Epic soft-404s (returns 200 with a "not found"-style title) on dead doc URLs.

## Deploying

Push to `main`; GitHub Pages serves from branch `main`, folder `/ (root)`. `.nojekyll` makes Pages serve every file verbatim. All paths are relative, so the same files work from disk, a subpath, or a custom domain.
