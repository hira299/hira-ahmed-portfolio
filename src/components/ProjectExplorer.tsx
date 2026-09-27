import { useState, useMemo } from "react";
import { projects, type Project } from "@/data/projects";
import { caseStudies, type CaseStudy } from "@/data/case-studies";

interface ProjectExplorerProps {
  onSelectCaseStudy: (slug: string) => void;
}

export function ProjectExplorer({ onSelectCaseStudy }: ProjectExplorerProps) {
  const [viewMode, setViewMode] = useState<"projects" | "caseStudies">("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = [
    { id: "all", label: "All Repositories" },
    { id: "n8n", label: "n8n Automations" },
    { id: "ai", label: "AI & LLMs" },
    { id: "cloud", label: "Cloud & DevSec" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project: Project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedTag === "all") return true;
      if (selectedTag === "n8n") {
        return (
          project.title.toLowerCase().includes("n8n") ||
          project.summary.toLowerCase().includes("n8n") ||
          project.stack.some((s) => s.toLowerCase().includes("n8n")) ||
          project.categories.includes("n8n")
        );
      }
      if (selectedTag === "ai") {
        return (
          project.stack.some((s) =>
            ["openai", "gemini", "langchain", "llamaindex", "rag", "claude", "chromadb"].some((k) =>
              s.toLowerCase().includes(k)
            )
          ) ||
          project.summary.toLowerCase().includes("ai") ||
          project.summary.toLowerCase().includes("llm") ||
          project.categories.includes("AI Automation") ||
          project.categories.includes("AI Agents")
        );
      }
      if (selectedTag === "qa") {
        return (
          project.title.toLowerCase().includes("qa") ||
          project.summary.toLowerCase().includes("test") ||
          project.summary.toLowerCase().includes("postman") ||
          project.stack.some((s) =>
            ["postman", "newman", "cypress", "playwright", "jest"].some((k) =>
              s.toLowerCase().includes(k)
            )
          )
        );
      }
      if (selectedTag === "cloud") {
        return (
          project.stack.some((s) =>
            ["aws", "terraform", "docker", "cloud", "security", "z3"].some((k) =>
              s.toLowerCase().includes(k)
            )
          ) ||
          project.summary.toLowerCase().includes("cloud") ||
          project.categories.includes("Cloud") ||
          project.categories.includes("Cybersecurity")
        );
      }

      return true;
    });
  }, [searchTerm, selectedTag]);

  const filteredCaseStudies = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return caseStudies.filter((study: CaseStudy) => {
      if (!q) return true;
      return (
        study.title.toLowerCase().includes(q) ||
        study.summary.toLowerCase().includes(q) ||
        study.client.toLowerCase().includes(q) ||
        study.stack.some((tech) => tech.toLowerCase().includes(q))
      );
    });
  }, [searchTerm]);

  return (
    <section id="archive" className="pt-2 pb-12 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-10 pb-4 sm:pb-6 border-b border-[#E8E1D7] gap-4 sm:gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#6B1724] mb-1.5 sm:mb-2 font-medium">
              04 / Complete Index
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1416] font-normal">
              {viewMode === "projects" ? "Project Archive & Open Repositories" : "Case Studies Archive"}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {/* View Switch Button: Switch between Projects & Case Studies */}
            <div className="inline-flex p-1 bg-[#EFEAE2] rounded-lg border border-[#E8E1D7]">
              <button
                type="button"
                onClick={() => setViewMode("projects")}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  viewMode === "projects"
                    ? "bg-[#6B1724] text-[#FAF8F5] shadow-xs"
                    : "text-[#5C5254] hover:text-[#1C1416]"
                }`}
              >
                Projects ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode("caseStudies")}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  viewMode === "caseStudies"
                    ? "bg-[#6B1724] text-[#FAF8F5] shadow-xs"
                    : "text-[#5C5254] hover:text-[#1C1416]"
                }`}
              >
                Case Studies ({caseStudies.length})
              </button>
            </div>

            <div className="text-xs sm:text-sm font-mono text-[#827577]">
              Showing{" "}
              <span className="text-[#6B1724] font-semibold">
                {viewMode === "projects" ? filteredProjects.length : filteredCaseStudies.length}
              </span>{" "}
              {viewMode === "projects" ? `of ${projects.length} systems` : `of ${caseStudies.length} studies`}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center mb-5 sm:mb-8">
          {/* Tag Chips (shown when in projects view) */}
          {viewMode === "projects" ? (
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-xs font-mono transition-all border cursor-pointer ${
                    selectedTag === tag.id
                      ? "bg-[#6B1724] text-[#FAF8F5] border-[#6B1724] font-medium"
                      : "bg-white text-[#5C5254] border-[#E8E1D7] hover:border-[#6B1724]"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C5254]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1724]" />
              <span>All In-Depth Production &amp; Research Case Studies</span>
            </div>
          )}

          {/* Search Box */}
          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              placeholder={viewMode === "projects" ? "Search stack, keywords, or title..." : "Search case studies..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#E8E1D7] focus:border-[#6B1724] px-3.5 py-1.5 pl-9 rounded text-xs text-[#1C1416] placeholder-[#827577] outline-none transition-colors"
            />
            <svg
              className="w-4 h-4 text-[#827577] absolute left-2.5 top-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Content Grid */}
        {viewMode === "projects" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.title}
                className="relative bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                {/* Smaller Ticket Notches */}
                <div className="ticket-notch-sm-left" aria-hidden="true" />
                <div className="ticket-notch-sm-right" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#6B1724] font-medium">
                      {project.categories[0] ?? "Open Source"}
                    </span>
                    {project.caseStudy && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8]">
                        Case Study
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5C5254] leading-relaxed mb-2.5 line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#827577]">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2.5 border-t border-[#E8E1D7] flex items-center justify-between gap-2 text-xs font-mono">
                  {project.caseStudy ? (
                    <button
                      onClick={() => {
                        const cleanSlug = project.caseStudy!.replace(/^\/case-studies\//, "").replace(/\/$/, "");
                        onSelectCaseStudy(cleanSlug);
                      }}
                      className="text-[#6B1724] hover:text-[#54111B] font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Study</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <span className="text-[#827577] text-[11px]">System Spec</span>
                  )}

                  <div className="flex items-center gap-2.5">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5C5254] hover:text-[#6B1724] inline-flex items-center gap-1"
                      >
                        <span>Demo</span>
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5C5254] hover:text-[#6B1724] inline-flex items-center gap-1"
                      >
                        <span>GitHub</span>
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredCaseStudies.map((study: CaseStudy) => (
              <div
                key={study.slug}
                className="bg-white border border-[#E8E1D7] hover:border-[#6B1724] rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all group hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#6B1724] font-medium uppercase tracking-wider">
                      {study.client}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#FAF0F0] text-[#6B1724] border border-[#F0D5D8]">
                      Case Study
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg text-[#1C1416] group-hover:text-[#6B1724] transition-colors mb-1.5 leading-snug">
                    {study.title}
                  </h3>

                  <p className="text-xs text-[#5C5254] leading-relaxed mb-2.5 line-clamp-2">
                    {study.summary || study.description}
                  </p>

                  {/* Top Key Metric */}
                  {study.metrics && study.metrics.length > 0 && (
                    <div className="mb-2.5 py-1.5 px-2 bg-[#FAF8F5] border border-[#E8E1D7] rounded text-xs font-mono">
                      <span className="text-[#6B1724] font-semibold text-xs">
                        {study.metrics[0].value}
                      </span>{" "}
                      <span className="text-[#827577] text-[10px]">
                        {study.metrics[0].label}
                      </span>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-2.5">
                    {study.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[9px] font-mono bg-[#FAF8F5] text-[#5C5254] border border-[#E8E1D7] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {study.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#827577]">
                        +{study.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 sm:pt-4 border-t border-[#E8E1D7] flex items-center justify-between gap-3 text-xs font-mono">
                  <button
                    onClick={() => onSelectCaseStudy(study.slug)}
                    className="text-[#6B1724] hover:text-[#54111B] font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Study</span>
                    <span>→</span>
                  </button>
                  <span className="text-[#827577] text-[11px] font-mono">{study.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
