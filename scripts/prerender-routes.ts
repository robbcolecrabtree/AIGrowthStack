/**
 * Prerender routes for SSG. Used by vite.config.ts.
 * Product pages get static HTML with FAQ schema baked in for SEO.
 */
import { mockSoftware } from "../client/src/lib/mockData";

export const prerenderRoutes: string[] = [
  "/",
  ...mockSoftware.map((s) => `/product/${s.id}`),
];
