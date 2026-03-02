import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // Serve prerendered product pages for /product/:id (no trailing slash)
  app.use((req, res, next) => {
    const match = req.path.match(/^\/product\/([^/]+)\/?$/);
    if (match) {
      const productId = match[1];
      const prerenderedPath = path.resolve(distPath, "product", productId, "index.html");
      if (fs.existsSync(prerenderedPath)) {
        return res.sendFile(prerenderedPath);
      }
    }
    next();
  });

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
