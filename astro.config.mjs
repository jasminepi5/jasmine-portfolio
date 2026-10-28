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
          provider: fontProviders.local(),
          name: "Atkinson",
          cssVariable: "--font-atkinson",
          fallbacks: ["sans-serif"],
          options: {
              variants: [
                  {
                      src: ["./src/assets/fonts/atkinson-regular.woff"],
                      weight: 400,
                      style: "normal",
                      display: "swap",
                  },
                  {
                      src: ["./src/assets/fonts/atkinson-bold.woff"],
                      weight: 700,
                      style: "normal",
                      display: "swap",
                  },
              ],
          },
      },
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
