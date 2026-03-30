/**
 * Generates dist/public/sitemap.xml from script/sitemap-routes.ts + mockData + blog/resources data.
 * Run via: npx tsx scripts/generate-sitemap.ts (invoked from script/build.ts)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mockSoftware } from "../client/src/lib/mockData";
import { CURRENT_DATE_ISO } from "../client/src/lib/constants";
import { articles } from "../client/src/lib/articles";
import { blueprints } from "../client/src/lib/blueprints";
import { BLOG_POSTS } from "../client/src/lib/blogPosts";
import {
  SITEMAP_BASE_URL,
  SITEMAP_STATIC_PATHS,
} from "../script/sitemap-routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LAST_MOD = process.env.SITEMAP_LASTMOD || CURRENT_DATE_ISO;

const resourceSlugs = [
  ...new Set([
    ...articles.map((a) => a.slug),
    ...blueprints.map((b) => b.slug),
  ]),
];

const blogSlugs = BLOG_POSTS.map((p) => p.slug);
const productSlugs = mockSoftware.map((s) => s.id);

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(pathname: string, priority: string) {
  const p = pathname.startsWith("/") ? pathname : "/" + pathname;
  const pathWithSlash = p === "/" ? p : p.endsWith("/") ? p : p + "/";
  const loc = pathname.startsWith("http")
    ? pathname
    : `${SITEMAP_BASE_URL}${pathWithSlash}`;
  return `  <url><loc>${escapeXml(loc)}</loc><lastmod>${LAST_MOD}</lastmod><priority>${priority}</priority></url>\n`;
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

SITEMAP_STATIC_PATHS.forEach(({ path: p, priority }) => {
  xml += urlEntry(p, priority);
});
productSlugs.forEach((slug) => {
  xml += urlEntry(`/product/${slug}`, "0.9");
});
resourceSlugs.forEach((slug) => {
  xml += urlEntry(`/resources/${slug}`, "0.8");
});
blogSlugs.forEach((slug) => {
  xml += urlEntry(`/blog/${slug}`, "0.8");
});

xml += "</urlset>\n";

const outPath = path.resolve(__dirname, "..", "dist/public/sitemap.xml");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml);

const totalUrls =
  SITEMAP_STATIC_PATHS.length +
  productSlugs.length +
  resourceSlugs.length +
  blogSlugs.length;

console.log("Sitemap written:", outPath);
console.log(
  `Sitemap URL count: ${totalUrls} (static ${SITEMAP_STATIC_PATHS.length}, products ${productSlugs.length}, resources ${resourceSlugs.length}, blog ${blogSlugs.length})`
);
