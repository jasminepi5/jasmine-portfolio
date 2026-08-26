# Portfolio site (Hugo + Blowfish)

## Config

- Split across `config/_default/*.yaml` (`hugo`, `params`, `languages.en`, `menus.en`, `markup`) - there is no single root `hugo.toml`/`hugo.yaml`.
- `config/development/hugo.yaml` sets `buildDrafts: true`. Hugo merges this in automatically under the "development" environment, which is the default for `hugo server` - no flag needed.
- `hugo build` (and the Vercel deploy) default to the "production" environment and exclude drafts.
- `baseURL` in `config/_default/hugo.yaml` is the local/fallback value only. Production builds override it from `vercel.json` using Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so a custom domain needs no config change.
- Site-wide author info (name, bio, social links - shown in the byline on every single page) lives in `config/_default/languages.en.yaml` under `params.author`, not per-page.

## Theme

- `themes/blowfish` is a git submodule (`nunocoracao/blowfish`). Update with `git submodule update --remote themes/blowfish`.
- Never edit files inside `themes/blowfish/` directly - they're not tracked outside the submodule and will be lost on update. Site-level overrides go in this repo's own `layouts/`, which Hugo prefers over the theme's files at the same path.
- Current overrides and why:
  - `layouts/partials/article-link/simple.html` - upstream's title `<header>` has an inert `items-center` class (missing `flex`), which pushes the draft badge onto its own line instead of centering it beside the title. This is a full-file copy with a one-line diff, not a patch - re-sync by hand if the upstream theme changes it.
  - `layouts/partials/extend-head.html` - Blowfish hook (not a copy) for injecting into `<head>`. Currently holds the Vercel Web Analytics script, gated behind `hugo.IsProduction` so `hugo server` doesn't 404 on `/_vercel/insights/`.

## Content conventions

- All front matter is YAML (`---`), not TOML.
- `draft: true` = hidden from production, visible locally via `hugo server`.
- Don't restate site-wide defaults in front matter. `showReadingTime` and `showPagination` are already true in `params.yaml`; only set a flag per-page when it differs from the default (e.g. `showTableOfContents: true`, which is off site-wide, and worth omitting on pages with a single heading).
- Prose uses commas (or semicolons when an item already contains its own comma) to separate items inline - not the middot (`·`) character. Bullet points (`-`) are reserved for actual markdown lists.

## Build & hosting

- Local preview with drafts: `hugo server`
- Production build: `hugo --gc --minify` (the deployed build adds `--baseURL`; see `vercel.json`)
- Hosted on Vercel, deploying on push to `main`, with preview deployments per branch. Hugo version is pinned in `vercel.json` (`HUGO_VERSION`) and must stay inside the range Blowfish declares in `themes/blowfish/config.toml`.
- `.github/workflows/hugo.yaml` still exists as a GitHub Pages fallback but no longer runs on push - it is `workflow_dispatch` only.
