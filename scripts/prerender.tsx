import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import { services } from "../src/data/services";
import { caseStudies } from "../src/data/case-studies";
import { ServicePage } from "../src/pages/ServicePage";
import { ServicesHubPage } from "../src/pages/ServicesHubPage";
import { CaseStudyPage } from "../src/pages/CaseStudyPage";
import { CaseStudiesHubPage } from "../src/pages/CaseStudiesHubPage";

export const SITE_URL = "https://hiraahmed.me";

function applyMetadata(
  template: string,
  meta: { title: string; description: string; canonical: string }
): string {
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace <meta name="description" ...>
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace or inject canonical
  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  } else {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`
    );
  }

  // Replace og:title & twitter:title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  // Replace og:description & twitter:description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${meta.description}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${meta.canonical}" />`
  );

  return html;
}

async function prerenderAll() {
  const distDir = path.resolve(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");

  if (!fs.existsSync(templatePath)) {
    console.error("Template dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, "utf8");

  // 1. Homepage
  console.log("--> Prerendering Homepage (/)");
  const homeHtml = renderToString(React.createElement(App));
  let homeFull = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${homeHtml}</div>`
  );
  homeFull = applyMetadata(homeFull, {
    title: "Hira Ahmed | AI Engineer & Systems QA Lead",
    description: "QA Lead across four concurrent client contracts with 1,500+ defects documented. Autonomous LLM pipelines and mission-critical software verification.",
    canonical: `${SITE_URL}/`
  });
  fs.writeFileSync(templatePath, homeFull, "utf8");
  const homeWords = homeHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  console.log(`    Done: dist/index.html (${homeWords} words)`);

  // 2. Services Hub (/services/)
  console.log("--> Prerendering Services Hub (/services/)");
  const hubHtml = renderToString(React.createElement(ServicesHubPage));
  let hubFull = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${hubHtml}</div>`
  );
  hubFull = applyMetadata(hubFull, {
    title: "Services & Practice Areas | Hira Ahmed",
    description: "Production-grade engineering across autonomous AI pipelines, resilient n8n automation, deterministic API integrations, and multi-tenant B2B SaaS QA governance.",
    canonical: `${SITE_URL}/services/`
  });
  const servicesHubDir = path.join(distDir, "services");
  fs.mkdirSync(servicesHubDir, { recursive: true });
  fs.writeFileSync(path.join(servicesHubDir, "index.html"), hubFull, "utf8");
  const hubWords = hubHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  console.log(`    Done: dist/services/index.html (${hubWords} words)`);

  // 3. Service pages (the 6 pages with hasPage: true)
  const servicePages = services.filter((s) => s.hasPage);
  for (const svc of servicePages) {
    const routeFolder = svc.href.replace(/^\//, "").replace(/\/$/, "");
    console.log(`--> Prerendering Service Page: ${svc.href}`);
    const svcHtml = renderToString(React.createElement(ServicePage, { service: svc }));
    let svcFull = baseTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${svcHtml}</div>`
    );
    const serviceCanonical = svc.href.endsWith("/") ? `${SITE_URL}${svc.href}` : `${SITE_URL}${svc.href}/`;
    svcFull = applyMetadata(svcFull, {
      title: svc.seoTitle || svc.title,
      description: svc.description,
      canonical: serviceCanonical
    });
    const targetDir = path.join(distDir, routeFolder);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "index.html"), svcFull, "utf8");
    const svcWords = svcHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
    console.log(`    Done: dist/${routeFolder}/index.html (${svcWords} words)`);
  }

  // 4. Case Studies Hub (/case-studies/)
  console.log("--> Prerendering Case Studies Hub (/case-studies/)");
  const csHubHtml = renderToString(React.createElement(CaseStudiesHubPage));
  let csHubFull = baseTemplate.replace(
    '<div id="root"></div>',
    `<div id="root">${csHubHtml}</div>`
  );
  csHubFull = applyMetadata(csHubFull, {
    title: "Technical Case Studies & Engineering Proof | Hira Ahmed",
    description: "Deep-dive case studies covering 28K+ record AI pipelines, multi-tenant SaaS QA governance, automated cloud security compliance, and infrastructure optimization.",
    canonical: `${SITE_URL}/case-studies/`
  });
  const csHubDir = path.join(distDir, "case-studies");
  fs.mkdirSync(csHubDir, { recursive: true });
  fs.writeFileSync(path.join(csHubDir, "index.html"), csHubFull, "utf8");
  const csHubWords = csHubHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
  console.log(`    Done: dist/case-studies/index.html (${csHubWords} words)`);

  // 5. The 9 Case Study Pages (/case-studies/[slug]/)
  for (const cs of caseStudies) {
    console.log(`--> Prerendering Case Study Page: /case-studies/${cs.slug}/`);
    const csHtml = renderToString(React.createElement(CaseStudyPage, { study: cs }));
    let csFull = baseTemplate.replace(
      '<div id="root"></div>',
      `<div id="root">${csHtml}</div>`
    );
    csFull = applyMetadata(csFull, {
      title: cs.title,
      description: cs.description,
      canonical: `${SITE_URL}/case-studies/${cs.slug}/`
    });
    const targetDir = path.join(csHubDir, cs.slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "index.html"), csFull, "utf8");
    const csWords = csHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;
    console.log(`    Done: dist/case-studies/${cs.slug}/index.html (${csWords} words)`);
  }

  // 6. Generate sitemap.xml for all 18 routes
  const today = new Date().toISOString().split("T")[0];
  const sitemapRoutes = [
    "/",
    "/services/",
    ...servicePages.map((s) => (s.href.endsWith("/") ? s.href : `${s.href}/`)),
    "/case-studies/",
    ...caseStudies.map((cs) => `/case-studies/${cs.slug}/`),
  ];

  const xmlEntries = sitemapRoutes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r}</loc>
    <lastmod>${today}</lastmod>
  </url>`
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");
  console.log(`--> Generated dist/sitemap.xml (${sitemapRoutes.length} routes)`);
}

prerenderAll().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
