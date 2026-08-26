# Portfolio Website

Personal portfolio site for Jasmine Irawan — a Melbourne-based software developer and Monash University Computer Science graduate.

**Live site:** <https://jasminepi5.github.io/jasmine-portfolio/>

## Stack

- [Hugo](https://gohugo.io/) (extended edition) — static site generator
- [Blowfish](https://github.com/nunocoracao/blowfish) — theme, included as a git submodule
- GitHub Actions → GitHub Pages — build and deploy on every push to `main`

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
