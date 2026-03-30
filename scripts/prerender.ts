/**
 * Post-build prerender: generates static HTML for product pages (and home)
 * so FAQ JSON-LD and metadata are visible in View Page Source for bots.
 * Runs after Vite build, uses Puppeteer to capture rendered output.
 * Injects FAQPage schema into product pages (Helmet may not persist in head during capture).
 */
import express from "express";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { prerenderRoutes } from "./prerender-routes";
import { mockSoftware } from "../client/src/lib/mockData";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distPublic = path.resolve(projectRoot, "dist", "public");

function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function injectFaqSchema(html: string, productId: string): string {
  const software = mockSoftware.find((s) => s.id.toLowerCase() === productId.toLowerCase());
  if (!software?.faqs?.length) return html;
  const schema = JSON.stringify(buildFaqSchema(software.faqs));
  const script = `<script type="application/ld+json">${schema}</script>`;
  return html.replace("</head>", `${script}</head>`);
}

async function main() {
  if (!fs.existsSync(distPublic)) {
    throw new Error(`Build output not found: ${distPublic}`);
  }

  const app = express();
  app.use(express.static(distPublic));
  app.use((_req, res) => {
    res.sendFile(path.join(distPublic, "index.html"));
  });

  const server = app.listen(0);
  const port = (server.address() as { port: number }).port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
  const page = await browser.newPage();

  for (const route of prerenderRoutes) {
    const url = `${baseUrl}${route}`;
    process.stdout.write(`Prerendering ${route}... `);
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 1500));
    let html = await page.content();
    const match = route.match(/^\/product\/([^/]+)$/);
    if (match) {
      html = injectFaqSchema(html, match[1]);
    }
    const outPath = route === "/" ? path.join(distPublic, "index.html") : path.join(distPublic, route, "index.html");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, "utf-8");
    console.log("ok");
  }

  await browser.close();
  server.close();
  console.log(`Prerendered ${prerenderRoutes.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
