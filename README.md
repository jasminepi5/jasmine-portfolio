# Portfolio Website

Personal portfolio site for Jasmine Irawan — a Melbourne-based software developer and Monash University Computer Science graduate.

**Live site:** <https://jasmine-portfolio-smoky.vercel.app/>

## Stack

- [Hugo](https://gohugo.io/) (extended edition) — static site generator
- [Blowfish](https://github.com/nunocoracao/blowfish) — theme, included as a git submodule
- [Vercel](https://vercel.com/) — hosting, with a deploy on every push to `main` and a
  preview deployment for every branch

Build settings live in `vercel.json`. The production `baseURL` is derived from Vercel's
`VERCEL_PROJECT_PRODUCTION_URL` at build time, so attaching a custom domain later needs
no config change.

A GitHub Actions workflow for GitHub Pages is kept at `.github/workflows/hugo.yaml` as a
manual fallback. It no longer runs on push — trigger it from the Actions tab if needed.

## Running locally

Requires the **extended** edition of Hugo (see the version range in `themes/blowfish/config.toml`).

```bash
git clone --recurse-submodules https://github.com/jasminepi5/jasmine-portfolio.git
cd jasmine-portfolio
hugo server
```

The site is then at <http://localhost:1313>.

If you cloned without `--recurse-submodules`, fetch the theme with:

```bash
git submodule update --init --recursive
```

### Drafts

`hugo server` runs in Hugo's `development` environment, which picks up
`config/development/hugo.yaml` and builds draft content. Production builds
(`hugo`, and the GitHub Actions workflow) exclude drafts, so work in progress
can sit in the repo without appearing on the live site.

## Layout

```text
config/_default/    Site config, split by concern (hugo, params, menus, languages, markup)
config/development/ Local-only overrides (draft visibility)
content/            Markdown pages, YAML front matter
  projects/         Project write-ups
  education/        Education history
assets/images/      Animated SVG background, Open Graph social card
layouts/            Site-level template overrides that take precedence over the theme
themes/blowfish/    Theme (git submodule — don't edit directly)
```

## Building

```bash
hugo --gc --minify    # production build into public/
```

`public/` is generated output and is not tracked; CI rebuilds it on every deploy.
