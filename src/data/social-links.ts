export type SocialLink = {
  label: string;
  href: string;
  kind: "hire" | "professional" | "research";
};

export const email = "hira229922@gmail.com";

const rawSocialLinks: SocialLink[] = [
  { label: "Fiverr", href: "https://www.fiverr.com/hira299", kind: "hire" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0178616a4e00b82166",
    kind: "hire",
  },
  { label: "Topmate", href: "https://topmate.io/hira_ahmed", kind: "hire" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hira-ahmed-4068402a7",
    kind: "professional",
  },
  { label: "GitHub", href: "https://github.com/hira299", kind: "professional" },
  { label: "ORCID", href: "https://orcid.org/0009-0005-3219-7252", kind: "research" },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Hira-Ahmed-28",
    kind: "research",
  },
  {
    label: "Web of Science",
    href: "https://www.webofscience.com/wos/author/record/QIV-1552-2026",
    kind: "research",
  },
  {
    label: "Medium",
    href: "https://medium.com/@hira299/beyond-heuristics-formally-verifying-ai-generated-infrastructure-with-z3-smt-solvers-e95fd3a7bf95",
    kind: "research",
  },
];

export type SocialLinksList = SocialLink[] & {
  github: string;
  linkedin: string;
  resume: string;
};

export const socialLinks: SocialLinksList = Object.assign(rawSocialLinks, {
  github: "https://github.com/hira299",
  linkedin: "https://www.linkedin.com/in/hira-ahmed-4068402a7",
  resume: "/Hira_Ahmed_AI_Engineer_Resume.pdf",
});

export function getLink(label: string) {
  return socialLinks.find((link) => link.label === label);
}
