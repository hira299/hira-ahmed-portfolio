import type { Service } from "../src/data/services";
import type { CaseStudy } from "../src/data/case-studies";

export const SITE_URL = "https://hiraahmed.me";

export const MINIMAL_PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  "name": "Hira Ahmed",
  "url": `${SITE_URL}/`,
};

export const APPROVED_AREAS_SERVED = [
  { "@type": "Country", "name": "United States" },
  { "@type": "Country", "name": "Canada" },
  { "@type": "Country", "name": "United Kingdom" },
  { "@type": "Country", "name": "Ireland" },
  { "@type": "Country", "name": "Germany" },
];

export const APPROVED_SAME_AS = [
  "https://www.linkedin.com/in/hira-ahmed-4068402a7",
  "https://github.com/hira299",
  "https://www.fiverr.com/hira299",
  "https://www.upwork.com/freelancers/~0178616a4e00b82166",
  "https://topmate.io/hira_ahmed",
  "https://orcid.org/0009-0005-3219-7252",
  "https://www.researchgate.net/profile/Hira-Ahmed-28",
  "https://www.webofscience.com/wos/author/record/QIV-1552-2026",
  "https://medium.com/@hira299",
];

/**
 * T1: Homepage Schema
 * Exactly ONE Person node on the homepage.
 * WebSite and ProfessionalService reference Person via minimal node.
 * No seoTitle, no "| Hira Ahmed" suffix in names, no education, no dates, no address, no email.
 */
export function getHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Hira Ahmed",
        "jobTitle": "AI Engineer & Systems QA Lead",
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/og-image.png`,
        "sameAs": APPROVED_SAME_AS,
        "knowsAbout": [
          "Autonomous LLM Pipelines",
          "n8n Automation",
          "Multi-Tenant SaaS QA",
          "API Testing",
          "LangGraph",
          "Python",
          "FastAPI",
          "PostgreSQL",
          "AWS",
          "Z3 SMT Solver",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}/`,
        "name": "Hira Ahmed",
        "description":
          "QA Lead with 1,500+ documented defects and production LLM pipelines. Available remotely for teams in the US, Canada, UK, Ireland and Germany. Get in touch.",
        "publisher": MINIMAL_PERSON,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        "name": "Hira Ahmed",
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/og-image.png`,
        "provider": MINIMAL_PERSON,
        "areaServed": APPROVED_AREAS_SERVED,
      },
    ],
  };
}

/**
 * T2: Services Hub Schema (/services/)
 * CollectionPage + BreadcrumbList
 * Name equals visible text; no seoTitle or "| Hira Ahmed".
 */
export function getServicesHubSchema(serviceList: Service[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/services/#webpage`,
        "url": `${SITE_URL}/services/`,
        "name": "AI Engineering & QA Services",
        "description":
          "Production AI pipelines, n8n automations, and multi-tenant SaaS QA governance for high-assurance systems. Review services or start an engagement.",
        "publisher": MINIMAL_PERSON,
        "mainEntity": {
          "@type": "ItemList",
          "name": "AI Engineering & QA Services",
          "itemListElement": serviceList.map((svc, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": svc.title,
            "url": svc.href.endsWith("/")
              ? `${SITE_URL}${svc.href}`
              : `${SITE_URL}${svc.href}/`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/services/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${SITE_URL}/services/`,
          },
        ],
      },
    ],
  };
}

/**
 * T3: Service Pages Schema (6 individual service pages)
 * Service entity + BreadcrumbList.
 * WebPage node removed per user approval.
 * Name equals visible text from services.ts; no seoTitle or "| Hira Ahmed".
 */
export function getServicePageSchema(svc: Service) {
  const serviceCanonical = svc.href.endsWith("/")
    ? `${SITE_URL}${svc.href}`
    : `${SITE_URL}${svc.href}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceCanonical}#service`,
        "name": svc.title,
        "description": svc.description,
        "url": serviceCanonical,
        "provider": MINIMAL_PERSON,
        "areaServed": APPROVED_AREAS_SERVED,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceCanonical}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": `${SITE_URL}/services/`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": svc.title,
            "item": serviceCanonical,
          },
        ],
      },
    ],
  };
}

/**
 * T4: Case Studies Hub Schema (/case-studies/)
 * CollectionPage + BreadcrumbList.
 * Name equals visible text; no seoTitle or "| Hira Ahmed".
 */
export function getCaseStudiesHubSchema(studies: CaseStudy[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/case-studies/#webpage`,
        "url": `${SITE_URL}/case-studies/`,
        "name": "Technical Case Studies & Engineering Proof",
        "description":
          "Documented proof across 28K+ record AI pipelines, multi-tenant SaaS QA audits, and cloud compliance engines. Read technical breakdowns.",
        "publisher": MINIMAL_PERSON,
        "mainEntity": {
          "@type": "ItemList",
          "name": "Technical Case Studies & Engineering Proof",
          "itemListElement": studies.map((cs, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": cs.title,
            "url": `${SITE_URL}/case-studies/${cs.slug}/`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/case-studies/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Case Studies",
            "item": `${SITE_URL}/case-studies/`,
          },
        ],
      },
    ],
  };
}

/**
 * T5: Case Study Pages Schema (9 individual case study pages)
 * TechArticle (or ScholarlyArticle for Sentinel-Mesh preprint) + BreadcrumbList.
 * WebPage node removed per user approval.
 * Headline equals visible text from case-studies.ts; no seoTitle or "| Hira Ahmed".
 * Omit datePublished and dateModified per T6 Q2.
 */
export function getCaseStudyPageSchema(cs: CaseStudy) {
  const pageCanonical = `${SITE_URL}/case-studies/${cs.slug}/`;
  const isSentinelMesh = cs.slug === "sentinel-mesh";

  const articleNode: Record<string, any> = {
    "@type": isSentinelMesh ? "ScholarlyArticle" : "TechArticle",
    "@id": `${pageCanonical}#article`,
    "headline": cs.title,
    "description": cs.description,
    "url": pageCanonical,
    "author": MINIMAL_PERSON,
    "publisher": MINIMAL_PERSON,
  };

  if (isSentinelMesh) {
    // Preprint publication DOI, manuscript under review
    articleNode["identifier"] = "https://doi.org/10.21203/rs.3.rs-10674271/v1";
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      articleNode,
      {
        "@type": "BreadcrumbList",
        "@id": `${pageCanonical}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Case Studies",
            "item": `${SITE_URL}/case-studies/`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": cs.title,
            "item": pageCanonical,
          },
        ],
      },
    ],
  };
}
