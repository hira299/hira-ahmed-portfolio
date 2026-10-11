import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

async function prerenderHomepage() {
  const distDir = path.resolve(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("Template dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf8");

  // Render homepage HTML (only summaries and links rendered in App)
  const appHtml = renderToString(React.createElement(App));

  // Insert SSR HTML into the <div id="root"></div> mount point
  const prerendered = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  fs.writeFileSync(templatePath, prerendered, "utf8");

  // Verify word count of prerendered homepage
  const plainText = appHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainText.split(" ").filter(Boolean).length;
  console.log(`[prerender] Homepage prerendered successfully into dist/index.html`);
  console.log(`[prerender] Homepage body word count: ${wordCount} words`);
}

prerenderHomepage().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
