// @ts-check


import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// Note: Table of content default/plain format didn't look nice it was just bullet points.
// import remarkToc from "remark-toc";
// import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
  site: "https://jasmineirawan.dev", // can't believe I actually bought a domain name off of a registrar.
  integrations: [mdx(), sitemap()],

  fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Montserrat",
        cssVariable: "--font-montserrat",
        fallbacks: ["sans-serif"],

        // Only 400 is downloaded by default; the rest cover font-medium/bold and prose headings (600/800)
        weights: [400, 500, 600, 700, 800],
      }
	],

  vite: {
    plugins: [tailwindcss()],
  },

  // markdown: {
  //   processor: unified({
  //     remarkPlugins: [remarkToc],
  //   }),
  // },
});
