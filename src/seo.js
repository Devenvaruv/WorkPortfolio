import { profile, projects } from "./portfolioData";
import { absoluteUrl, siteConfig } from "./siteConfig";

export function compactJsonLd(value) {
  if (Array.isArray(value)) {
    const items = value.map(compactJsonLd).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }

  if (value && typeof value === "object") {
    const result = Object.entries(value).reduce((acc, [key, item]) => {
      const compacted = compactJsonLd(item);
      if (compacted !== undefined) acc[key] = compacted;
      return acc;
    }, {});
    return Object.keys(result).length ? result : undefined;
  }

  if (value === null || value === undefined || value === "") return undefined;
  return value;
}

export function safeJsonLd(data) {
  return JSON.stringify(compactJsonLd(data))
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: profile.name,
    url: absoluteUrl("/"),
    jobTitle: profile.title,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of San Francisco",
    },
    knowsAbout: siteConfig.topics,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profile-page`,
        url: absoluteUrl("/"),
        name: siteConfig.defaultTitle,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

export function breadcrumbSchema(items, idPath = "") {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(idPath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectSchema(project) {
  const projectUrl = absoluteUrl(`/projects/${project.slug}/`);
  const schemaType = project.schemaType || "CreativeWork";
  const base = {
    "@type": schemaType,
    "@id": `${projectUrl}#project`,
    name: project.title,
    alternateName: project.displayTitle,
    description: project.summary,
    url: projectUrl,
    author: { "@id": `${siteConfig.url}/#person` },
    creator: { "@id": `${siteConfig.url}/#person` },
    keywords: project.stack,
    sameAs: project.url && !project.url.includes("github.com/devenvaruv") ? project.url : undefined,
  };

  if (schemaType === "SoftwareApplication" || schemaType === "WebApplication") {
    return {
      ...base,
      applicationCategory: project.applicationCategory,
      operatingSystem: project.operatingSystem,
      softwareRequirements: project.softwareRequirements,
    };
  }

  if (schemaType === "SoftwareSourceCode") {
    return {
      ...base,
      programmingLanguage: project.stack,
      codeRepository: project.repositoryUrl && project.repositoryUrl !== profile.github
        ? project.repositoryUrl
        : undefined,
    };
  }

  return base;
}

export function projectPageSchema(project) {
  const projectPath = `/projects/${project.slug}/`;
  const projectUrl = absoluteUrl(projectPath);

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      breadcrumbSchema(
        [
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects/" },
          { name: project.title, path: projectPath },
        ],
        projectPath
      ),
      projectSchema(project),
      {
        "@type": "WebPage",
        "@id": `${projectUrl}#webpage`,
        url: projectUrl,
        name: project.seoTitle,
        description: project.seoDescription,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: { "@id": `${projectUrl}#project` },
        breadcrumb: { "@id": `${projectUrl}#breadcrumb` },
      },
    ],
  };
}

export function projectsIndexSchema() {
  const path = "/projects/";
  const visibleProjects = projects.filter((project) => project.portfolioGroup !== "hidden");

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteSchema(),
      personSchema(),
      breadcrumbSchema(
        [
          { name: "Home", path: "/" },
          { name: "Projects", path },
        ],
        path
      ),
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: "Projects | Deven Varu",
        description:
          "AI engineering projects across voice agents, multi-agent systems, developer tools, computer vision, retrieval systems, and full-stack products.",
        mainEntity: visibleProjects.map((project) => ({
          "@id": `${absoluteUrl(`/projects/${project.slug}/`)}#project`,
        })),
      },
    ],
  };
}
