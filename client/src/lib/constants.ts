/**
 * Build-time date constants.
 * Evaluated when the module is first loaded (at build during prerender or sitemap generation).
 * Every build captures the current date for freshness signals across the site.
 */
const now = new Date();

/** Human-readable format: "March 11, 2026" */
export const CURRENT_DATE = now.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/** ISO format for sitemap lastmod: "2026-03-11" */
export const CURRENT_DATE_ISO = now.toISOString().slice(0, 10);
