export type ResearchItem = {
  title: string;
  status: string;
  summary: string;
  highlights?: string[];
  links: { label: string; href: string }[];
};

export const research: ResearchItem[] = [
  {
    title:
      "Sentinel-Mesh: A Neuro-Symbolic Framework for Formally Verified Remediation of Cloud Misconfigurations",
    status: "Research Square preprint · manuscript under review at IEEE Transactions on Cloud Computing",
    summary:
      "Lead author and developer. Sentinel-Mesh combines LLM-based patch synthesis with Z3 SMT formal verification for autonomous Terraform remediation.",
    highlights: [
      "83.81% remediation rate reported on CloudFix-Bench",
      "0% regression within the stated Cloud Perimeter Model scope",
    ],
    links: [
      { label: "Research Square preprint", href: "https://www.researchsquare.com/article/rs-10674271/latest" },
      { label: "DOI", href: "https://doi.org/10.21203/rs.3.rs-10674271/v1" },
      { label: "Code", href: "https://github.com/hira299/sentinel-mesh" },
      {
        label: "Medium Article",
        href: "https://medium.com/@hira299/beyond-heuristics-formally-verifying-ai-generated-infrastructure-with-z3-smt-solvers-e95fd3a7bf95",
      },
    ],
  },
  {
    title: "CloudFix-Bench",
    status: "Open benchmark archived on Zenodo",
    summary:
      "A benchmark of 105 AWS Terraform misconfiguration patterns covering 60+ AWS service types, built for the Sentinel-Mesh research.",
    links: [{ label: "Zenodo", href: "https://doi.org/10.5281/zenodo.20975067" }],
  },
  {
    title: "IEEE Access peer review",
    status: "5 verified reviews",
    summary: "Verified peer reviewer for IEEE Access, recorded on Web of Science and ORCID.",
    links: [
      {
        label: "Web of Science",
        href: "https://www.webofscience.com/wos/author/record/QIV-1552-2026",
      },
      { label: "ORCID", href: "https://orcid.org/0009-0005-3219-7252" },
    ],
  },
];
