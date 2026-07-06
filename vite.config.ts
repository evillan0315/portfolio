import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
// @ts-expect-error — .mjs script outside TS project root
import { generateSitemap } from "./scripts/generate-sitemap.mjs"

const base = process.env.VERCEL ? "/" : "/portfolio/"

/** Vite plugin that generates sitemap.xml into the output directory */
function sitemapPlugin(): Plugin {
  return {
    name: "sitemap-generator",
    closeBundle() {
      generateSitemap("dist")
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          /* React DOM — rarely changes, good caching */
          if (id.includes("node_modules/react-dom")) {
            return "react-dom"
          }
          /* Framer Motion — large animation lib, split separately */
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion"
          }
          /* Markdown rendering — only needed on blog article page */
          if (
            id.includes("node_modules/react-markdown") ||
            id.includes("node_modules/remark-") ||
            id.includes("node_modules/mdast-") ||
            id.includes("node_modules/unist-") ||
            id.includes("node_modules/unified") ||
            id.includes("node_modules/vfile") ||
            id.includes("node_modules/bail") ||
            id.includes("node_modules/trough") ||
            id.includes("node_modules/decode-named-character-reference") ||
            id.includes("node_modules/character-entities") ||
            id.includes("node_modules/hast-") ||
            id.includes("node_modules/property-information") ||
            id.includes("node_modules/space-separated-tokens") ||
            id.includes("node_modules/comma-separated-tokens") ||
            id.includes("node_modules/html-void-elements") ||
            id.includes("node_modules/zwitch") ||
            id.includes("node_modules/ccount") ||
            id.includes("node_modules/escape-string-regexp") ||
            id.includes("node_modules/@types/") ||
            id.includes("node_modules/devlop") ||
            id.includes("node_modules/micromark") ||
            id.includes("node_modules/trim-lines") ||
            id.includes("node_modules/lowlight") ||
            id.includes("node_modules/@ungap") ||
            id.includes("node_modules/dequal") ||
            id.includes("node_modules/triple-beam") ||
            id.includes("node_modules/is-plain-obj")
          ) {
            return "blog-content"
          }
          /* Everything else in node_modules */
          if (id.includes("node_modules")) {
            return "vendor"
          }
        },
      },
    },
  },
})
