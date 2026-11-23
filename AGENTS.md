# AGENTS.md

KF2 achievement tracker: React 19 + Vite SPA with a Spanish UI. The backend scrapes Steam Community achievement pages. Node ESM (`"type": "module"`), Tailwind v4, deployed on Vercel.

## Commands

- `npm run dev` — Vite dev server. `/api/achievements` is served by middleware defined in `vite.config.js`; no separate backend process is needed.
- `npm run build` then `npm start` — production server (`server.js`, `PORT` defaults to 3000) serves `dist/` plus the API. `npm start` fails or serves stale files without a prior build.
- `npm run preview` — static assets only; `/api/achievements` falls through to `index.html`, so profile loading appears broken. Use `npm run dev` or `npm start` to test the real flow.
- There are no test, lint, or typecheck scripts. Verify with `npm run build` and a manual profile load in `npm run dev`.
- Testing the API requires live Steam access. Private profiles return 403, unknown profiles 404, Steam failures 502. Successful responses are cached in-process for 60 seconds.

## Architecture

- `server/api-handler.js` owns all API behavior and is reused by three entrypoints: the Vite dev middleware (`vite.config.js`), production (`server.js`), and the Vercel function (`api/achievements.js`). Change API logic there, not in the wrappers.
- The API accepts `?profile=` (or `?q=`) with a SteamID64, vanity name, or Steam profile URL (`buildStatsUrl`). It loads Steam's server-rendered page in Spanish and parses `valve-ssr-data`; names, descriptions, unlocked state, and global percentages come from Steam per request.
- Client data flow: `src/hooks/useProfileData.js` handles fetching, React Query, and localStorage; `src/App.jsx` owns view-only filters (search, difficulty, sort). Query defaults in `src/main.jsx` intentionally disable retry and refetch on focus/reconnect; changing them can reset user filters or trigger unexpected requests.

## Data files (easy to get wrong)

- `server/diffs.js` is the only runtime `id -> difficulty` map used by the API. Its comment says it is generated from `src/data/achievements.json`, but no generator script is checked in: update it by hand when adding/removing achievements or changing a difficulty.
- `src/data/achievements.json` (307 entries) is a reference dataset; no runtime file imports it. Editing it alone does not change the app.
- `diffs.json` at the repo root is an exact duplicate of `server/diffs.js` and is not imported. Treat `server/diffs.js` as canonical.
- Achievement names and descriptions shown in the UI come from Steam, not from the JSON dataset.
- `src/data/combos.js` is the only source for the "Una partida" view. It is hand-curated by Steam id and groups achievements that overlap in one run. Only "Difícil o superior" overlaps are valid; KF2 does not stack difficulty ladders (Normal/Hard/Suicidal/Hell on Earth each need their own run). `bonusIds` are optional same-run achievements and do not count toward combo progress. Add/update ids by hand when Steam achievements change; missing ids are skipped at runtime.

## Conventions

- UI copy, comments, confirmation prompts, and error messages are Spanish; formatting uses `es-ES`. Keep new user-facing text in Spanish.
- Difficulty keys are the English strings `Normal`, `Hard`, `Suicidal`, `Hell on Earth`, and `Otros`; `Todas` is a pseudo-filter meaning "all". Display labels (for example `Hard` -> `Difícil`) live in `src/difficulties.js`, not in data files.
- Tailwind v4 uses CSS-first config in `src/index.css` (there is no `tailwind.config.*`). Use v4 syntax such as `bg-linear-to-r`, `@theme`, and `@utility`; custom utilities include `bg-grid`, `bg-noise`, and `mask-fade-edges`.
- Client persistence uses `kf2-tracker-v1:<steamid>`, `kf2-tracker-last-profile`, and a legacy migration tied to one hardcoded SteamID. Preserve the `kf2-tracker-v1:` prefix to avoid wiping existing user progress.
- Global `fetch` and `AbortSignal.timeout` require Node 18+.
