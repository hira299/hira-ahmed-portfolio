import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ServicePage } from "./pages/ServicePage";
import { ServicesHubPage } from "./pages/ServicesHubPage";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { CaseStudiesHubPage } from "./pages/CaseStudiesHubPage";
import { services } from "./data/services";
import { caseStudies } from "./data/case-studies";
import "./index.css";

function RootRouter() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  // Check if current page is Services Hub
  if (path === "/services" || path === "/services/") {
    return <ServicesHubPage />;
  }

  // Check if current page is Case Studies Hub
  if (path === "/case-studies" || path === "/case-studies/") {
    return <CaseStudiesHubPage />;
  }

  // Check if current page is a specific Case Study Page
  if (path.startsWith("/case-studies/")) {
    const slug = path.replace(/^\/case-studies\//, "").replace(/\/$/, "");
    const matchedStudy = caseStudies.find((cs) => cs.slug === slug);
    if (matchedStudy) {
      return <CaseStudyPage study={matchedStudy} />;
    }
  }

  // Check if current page is a specific Service Page
  const matchedService = services.find(
    (s) => s.hasPage && (s.href === path || s.href === `${path}/` || `${s.href}/` === path)
  );
  if (matchedService) {
    return <ServicePage service={matchedService} />;
  }

  // Default to main App
  return <App />;
}

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <RootRouter />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <RootRouter />
    </StrictMode>
  );
}
