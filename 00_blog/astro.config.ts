import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./00_src/utils/transformers/fileName";
import { SITE } from "./00_src/config";
import { readFileSync } from "node:fs";

// Sitemap lastmod dates: generated from git history (last content-changing commit
// per post, floored at pubDatetime). Regenerate 00_src/data/postLastmod.json when
// posts change outside frontmatter modDatetime. Only /posts/<slug>/ URLs get lastmod;
// other pages omit it rather than claim a date we do not know.
const postLastmod: Record<string, string> = JSON.parse(
  readFileSync(new URL("./00_src/data/postLastmod.json", import.meta.url), "utf-8")
);

// https://astro.build/config
export default defineConfig({
  srcDir: "./00_src",
  publicDir: "./01_public",
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
      serialize(item) {
        const m = item.url.match(/\/posts\/([^/]+)\/$/);
        if (m && postLastmod[m[1]]) item.lastmod = postLastmod[m[1]];
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Heebo",
        cssVariable: "--font-heebo",
        provider: fontProviders.google(),
        fallbacks: ["system-ui", "sans-serif"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["hebrew", "latin"],
      },
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },
});
