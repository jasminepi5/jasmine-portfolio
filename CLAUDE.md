# Portfolio site (Hugo + Blowfish)

## Config
- Split across `config/_default/*.yaml` (`hugo`, `params`, `languages.en`, `menus.en`, `markup`) - there is no single root `hugo.toml`/`hugo.yaml`.
- `config/development/hugo.yaml` sets `buildDrafts: true`. Hugo merges this in automatically under the "development" environment, which is the default for `hugo server` - no flag needed.
- `hugo build` (and the GitHub Actions workflow, `.github/workflows/hugo.yaml`) default to the "production" environment and exclude drafts.
- Site-wide author info (name, bio, social links - shown in the byline on every single page) lives in `config/_default/languages.en.yaml` under `params.author`, not per-page.

## Theme
- `themes/blowfish` is a git submodule (`nunocoracao/blowfish`). Update with `git submodule update --remote themes/blowfish`.
- Never edit files inside `themes/blowfish/` directly - they're not tracked outside the submodule and will be lost on update. Site-level overrides go in this repo's own `layouts/`, which Hugo prefers over the theme's files at the same path.
- Current overrides and why:
  - `layouts/partials/article-link/simple.html` - upstream's title `<header>` has an inert `items-center` class (missing `flex`), which pushes the draft badge onto its own line instead of centering it beside the title.
  - `layouts/_default/single.html` - adds an optional small logo image to the left of the page `<h1>`, shown only when a page sets `logo: "/path/to/image"` in front matter. Inert (renders nothing extra) on pages that don't set it.
  - Both are full-file copies with a small diff, not patches - re-sync by hand if the upstream theme changes those files.

## Content conventions
- All front matter is YAML (`---`), not TOML.
- `draft: true` = hidden from production, visible locally via `hugo server`.
- Education and project pages currently use these shared front-matter fields: `showReadingTime`, `showTableOfContents`, `showPagination`. Skip `showWordCount` (disabled site-wide in `params.yaml`) and `showAuthor: false` if a page's body already introduces the author (e.g. About, Certifications).
- Prose uses commas (or semicolons when an item already contains its own comma) to separate items inline - not the middot (`·`) character. Bullet points (`-`) are reserved for actual markdown lists.

## Build
- Local preview with drafts: `hugo server`
- Production build (matches CI): `hugo --gc --minify`
