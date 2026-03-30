/**
 * Canonical static paths for sitemap generation (March 30, 2026 build).
 * Product URLs are /product/{id} for each mockSoftware entry (47 as of this build).
 * Blog and resource URLs are derived in scripts/generate-sitemap.ts from blogPosts, articles, and blueprints.
 * Total sitemap URLs are logged at build time (static + products + resources + blog).
 *
 * Re-exported from script/build.ts so the build entrypoint remains the single place to discover sitemap config.
 */
export const SITEMAP_BASE_URL = "https://aigrowthstack.io";

/** Explicit static routes — keep in sync with client/src/App.tsx */
export const SITEMAP_STATIC_PATHS: { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/blog", priority: "0.8" },
  { path: "/categories", priority: "0.7" },
  { path: "/compare", priority: "0.7" },
  { path: "/privacy", priority: "0.5" },
  { path: "/resources", priority: "0.7" },
  { path: "/terms", priority: "0.5" },
  { path: "/disclosure", priority: "0.5" },
];
