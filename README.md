# Jasmine Irawan's Portfolio

My personal portfolio site: projects, education and experience, and how to contact me.

**Live site:** <https://jasmineirawan.dev/>

## Stack

- [Astro](https://astro.build/) static site with content collections for projects and the timeline
- [Tailwind CSS](https://tailwindcss.com/) with colours based on GitHub's Primer themes (Light default and Dark default)
- [Iconify](https://iconify.design/) icon sets (Lucide, Phosphor, Simple Icons, Font Awesome brands), inlined at build time
- [GitHub Pages](https://pages.github.com/) hosting, deployed by `.github/workflows/deploy.yml` on every push to `main`

The site ships no UI framework. The few interactive parts (theme toggle, mobile sidebar, copy email button) are a native `<dialog>`, radio inputs and small vanilla scripts.

## Running locally

Requires Node 22.12 or later.

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command             | What it does                                     |
| :------------------ | :----------------------------------------------- |
| `npm run dev`       | Start the dev server (drafts are visible here)   |
| `npm run build`     | Build the production site into `dist/`           |
| `npm run preview`   | Serve the production build locally               |
| `npm run typecheck` | Type-check `.astro` and `.ts` files              |

CI (`.github/workflows/ci.yml`) runs the type-check, the build and a link check on every push and pull request.

## Project structure

```text
src/
├── components/   Header, footer, theme toggle, icon, project card, timeline item
├── content/
│   └── projects/ One Markdown file per project (frontmatter + write-up)
├── data/
│   ├── timeline.json  Education and experience entries
│   └── skills.ts      Skills & Tools icons on the About page
├── layouts/      BaseLayout (every page) and ProjectPost (project pages)
├── lib/          Shared helpers: project ordering, button/badge classes
├── pages/        Home, About, Projects, Contact, 404
└── styles/       global.css: theme colours, tooltip, sidebar animation
docs/
└── project-template.md  Starting point for a new project
```

## Adding content

**A project:** copy `docs/project-template.md` to `src/content/projects/<slug>.md` and fill it in. The file name becomes the URL (`/projects/<slug>/`). Keep `draft: true` while writing; drafts show in `npm run dev` but are left out of the production build. `featured: true` lists a project before the others.

**A timeline entry:** add an object to `src/data/timeline.json` with a unique `id`, `section` (`Education` or `Experience`), `title`, `organisation` and `startDate` (`YYYY-MM`). Leave out `endDate` for a current role.

**Your CV:** put it at `public/cv.pdf`. The Download CV buttons link there.
