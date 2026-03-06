/**
 * Generates dist/public/sitemap.xml from mockData + hardcoded slugs.
 * Run with: npx tsx scripts/generate-sitemap.js (as final build step after prerender)
 * lastmod uses current system date at build time.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mockSoftware } from "../client/src/lib/mockData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://aigrowthstack.io";

// Use fixed freshness date for GSC (YYYY-MM-DD). Override via SITEMAP_LASTMOD env.
const LAST_MOD = process.env.SITEMAP_LASTMOD || "2026-03-06";

const staticPaths = [
  { path: "/", priority: "1.0" },
  { path: "/blog", priority: "0.8" },
  { path: "/categories", priority: "0.7" },
  { path: "/compare", priority: "0.7" },
  { path: "/privacy", priority: "0.5" },
  { path: "/resources", priority: "0.7" },
  { path: "/terms", priority: "0.5" },
];

const productSlugs = mockSoftware.map((s) => s.id);

const articleSlugs = [
  "how-to-scale-your-ad-creative-with-ai",
  "the-2026-guide-to-ai-seo",
  "why-ai-voiceovers-are-replacing-traditional-studios",
  "browse-ai-recipe",
  "gamma-gtm-slide-master",
  "founders-time-blocking-protocol",
  "automated-sales-machine",
];

const blogSlugs = [
  "ultimate-geo-seo-guide",
  "the-top-10-ai-tools-for-business-growth-in-2026-beyond-chatgpt",
  "ai-web-scraping-for-b2b-how-browse-ai-is-revolutionizing-lead-gen",
  "gohighlevel-vs-activecampaign-why-the-ai-os-is-winning-in-2026",
  "automating-the-boring-stuff-a-growth-engineers-guide-to-zapier-ai-agents",
  "elevenlabs-voice-cloning-the-emotional-layer",
  "the-ai-growth-stack-7-tools-to-scale-your-business-in-2026",
  "why-ai-generated-video-is-the-new-standard-for-b2b-marketing",
  "voice-cloning-audio-how-elevenlabs-is-disrupting-the-creator-economy",
  "smarter-seo-moving-beyond-keywords-with-ai-content-audits",
  "automating-the-boring-stuff-a-guide-to-ai-agents-for-small-teams",
  "apollo-vs-clay-2026",
  "marketing-agents-2026",
  "geo-seo-guide",
  "zero-cac-stack",
  "growth-engineer-stack-2026",
  "apollo-data-layer-guide",
  "browse-ai-no-code-scraping",
  "gamma-ai-presentation-revolution",
  "reclaim-ai-productivity-ops",
  "heygen-vs-sora-vs-kling-which-ai-video-tool-is-actually-actionable",
  "elevenlabs-pricing-2026-is-the-pro-plan-worth-the-roi-for-marketers",
  "best-ai-video-tools-for-international-growth-heygen-elevenlabs-deepseek",
  "why-surfer-seo-jasper-is-still-the-gold-standard-for-content-automation",
  "geo-generative-engine-optimization-the-2026-playbook-for-ai-visibility",
  "how-to-get-cited-by-perplexity-and-chatgpt-search-fact-density-for-marketers",
  "ai-seo-workflows-moving-from-keyword-stuffing-to-entity-authority",
  "mastering-eleven-v3-audio-tags-character-direction-2026",
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(pathname, priority) {
  const loc = pathname.startsWith("http") ? pathname : `${BASE_URL}${pathname.startsWith("/") ? pathname : "/" + pathname}`;
  return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${LAST_MOD}</lastmod><priority>${priority}</priority></url>\n`;
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

staticPaths.forEach(({ path: p, priority }) => {
  xml += urlEntry(p, priority);
});
productSlugs.forEach((slug) => {
  xml += urlEntry(`/product/${slug}`, "0.9");
});
articleSlugs.forEach((slug) => {
  xml += urlEntry(`/resources/${slug}`, "0.8");
});
blogSlugs.forEach((slug) => {
  xml += urlEntry(`/blog/${slug}`, "0.8");
});

xml += "</urlset>\n";

const outPath = path.resolve(__dirname, "..", "dist/public/sitemap.xml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml);
console.log("Sitemap written:", outPath);
