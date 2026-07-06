/**
 * Generates sitemap.xml at build time.
 * Called by vite.config.ts as a Vite plugin.
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/* ── Configuration ── */
const SITE_URL = "https://evillan0315.github.io/portfolio"

/** Blog post slugs with their last modified dates */
const BLOG_SLUGS = [
  { slug: "building-multi-agent-systems-langgraph", date: "2025-12-15" },
  { slug: "rag-at-scale-production-best-practices", date: "2025-11-28" },
  { slug: "clean-architecture-full-stack-applications", date: "2025-10-10" },
  { slug: "kubernetes-for-developers-practical-guide", date: "2025-09-05" },
  { slug: "art-of-prompt-engineering", date: "2025-08-20" },
  { slug: "terraform-at-scale-multi-environment-infrastructure", date: "2025-07-14" },
  { slug: "building-premium-portfolio-with-opencode", date: "2026-05-20" },
]

/**
 * @param {string} outDir — output directory path
 */
export function generateSitemap(outDir) {
  const now = new Date().toISOString().split("T")[0]

  const urls = [
    /* Homepage */
    `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
    /* Blog articles */
    ...BLOG_SLUGS.map(
      ({ slug, date }) => `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`

  const outputPath = path.resolve(outDir, "sitemap.xml")
  fs.writeFileSync(outputPath, sitemap, "utf-8")
  console.log(`✅ Sitemap generated: ${outputPath} (${urls.length} URLs)`)
}
