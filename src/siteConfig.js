import { profile, projects } from "./portfolioData";

export const SITE_URL = normalizeSiteUrl(
  process.env.REACT_APP_SITE_URL || "https://devenvaru.com"
);

export const siteConfig = {
  name: "Deven Varu",
  defaultTitle: "Deven Varu | AI Engineer",
  description:
    "AI engineer in the San Francisco Bay Area building voice AI products, multi-agent systems, developer tools, and computer vision pipelines.",
  defaultDescription:
    "AI engineer in the San Francisco Bay Area building voice AI products, multi-agent systems, developer tools, and computer vision pipelines.",
  author: profile.name,
  jobTitle: profile.title,
  location: profile.location,
  url: SITE_URL,
  email: profile.email,
  linkedin: profile.linkedin,
  github: profile.github,
  ogImage: "/images/og-deven-varu.png",
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    "Open Graph image for Deven Varu, AI engineer building agents, voice AI, developer tools, and computer vision systems.",
  locale: "en_US",
  themeColor: "#11100e",
  keywords: [
    "AI Engineer",
    "Multi-agent Systems",
    "Voice AI",
    "Computer Vision",
    "Agent-to-Agent Protocol",
    "AI Developer Tools",
    "San Francisco Bay Area",
  ],
  topics: [
    "Artificial Intelligence",
    "Multi-agent Systems",
    "Voice AI",
    "Computer Vision",
    "Agent-to-Agent Protocol",
    "Retrieval-Augmented Generation",
    "AI Developer Tools",
    "Machine Learning",
  ],
  projectUrls: projects.map((project) => ({
    title: project.title,
    path: `/projects/${project.slug}/`,
    externalUrl: project.url,
  })),
};

export function normalizeSiteUrl(url) {
  return String(url || "").replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
