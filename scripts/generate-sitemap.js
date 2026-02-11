/**
 * Generates client/public/sitemap.xml from hardcoded slugs.
 * No TS/Node resolution — run with: node scripts/generate-sitemap.js
 * When you add products or articles, update the arrays below and re-run.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://aigrowthstack.io";
const LAST_MOD = "2026-02-09";

const staticPaths = [
  { path: "/", priority: "1.0" },
  { path: "/blog", priority: "0.8" },
  { path: "/categories", priority: "0.7" },
  { path: "/compare", priority: "0.7" },
  { path: "/privacy", priority: "0.5" },
  { path: "/resources", priority: "0.7" },
  { path: "/terms", priority: "0.5" },
];

const productSlugs = [
  "adcreative",
  "jasper",
  "elevenlabs",
  "synthesia",
  "gamma",
  "surfer-seo",
  "heygen",
  "writesonic",
];

const articleSlugs = [
  "how-to-scale-your-ad-creative-with-ai",
  "the-2026-guide-to-ai-seo",
  "why-ai-voiceovers-are-replacing-traditional-studios",
];

const blogSlugs = [
  "the-ai-growth-stack-7-tools-to-scale-your-business-in-2026",
  "why-ai-generated-video-is-the-new-standard-for-b2b-marketing",
  "voice-cloning-audio-how-elevenlabs-is-disrupting-the-creator-economy",
  "smarter-seo-moving-beyond-keywords-with-ai-content-audits",
  "automating-the-boring-stuff-a-guide-to-ai-agents-for-small-teams",
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

const outPath = path.resolve(__dirname, "..", "client/public/sitemap.xml");
fs.writeFileSync(outPath, xml);
console.log("Sitemap written:", outPath);
