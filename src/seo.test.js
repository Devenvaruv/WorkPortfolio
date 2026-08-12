import fs from "fs";
import path from "path";
import { projects } from "./portfolioData";
import { projectPageSchema, safeJsonLd } from "./seo";
import { siteConfig } from "./siteConfig";

const publicDir = path.join(process.cwd(), "public");

function walkFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(filePath) : [filePath];
  });
}

function htmlRoute(filePath) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, "/");
  return `/${relativePath}`
    .replace(/index\.html$/, "")
    .replace(/^\/404\.html$/, "/404.html");
}

function quotedAttributes(html, name) {
  const values = [];
  const pattern = new RegExp(`${name}=(["'])(.*?)\\1`, "gi");
  let match;

  while ((match = pattern.exec(html))) {
    values.push(match[2]);
  }

  return values;
}

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}=(["'])(.*?)\\1`, "i"));
  return match ? match[2] : "";
}

function metaContent(html, key, value) {
  const pattern = /<meta\s+([^>]+)>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    if (readAttribute(match[1], key).toLowerCase() === value.toLowerCase()) {
      return readAttribute(match[1], "content");
    }
  }

  return "";
}

function linkHref(html, rel) {
  const pattern = /<link\s+([^>]+)>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    if (readAttribute(match[1], "rel").toLowerCase() === rel.toLowerCase()) {
      return readAttribute(match[1], "href");
    }
  }

  return "";
}

function generatedPages() {
  return walkFiles(publicDir)
    .filter((filePath) => filePath.endsWith(".html"))
    .map((filePath) => ({
      filePath,
      route: htmlRoute(filePath),
      html: fs.readFileSync(filePath, "utf8"),
    }));
}

const requiredSlugs = [
  "interview-with-ai",
  "codex-session-visualizer",
  "codetown",
  "road-asset-detection",
  "catalog-intelligence-automation",
  "a2a-multi-agent-builder",
  "10-agent-board-game",
  "pokemon-mixed-reality",
  "vr-classroom",
  "quantumviz",
  "oakland-data-explorer",
  "here2stay",
  "cisco-hackaithon",
];

test("project slugs are unique and cover required SEO routes", () => {
  const slugs = projects.map((project) => project.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
  expect(slugs.sort()).toEqual(requiredSlugs.sort());
});

test("project metadata has unique titles and descriptions", () => {
  const titles = projects.map((project) => project.seoTitle);
  const descriptions = projects.map((project) => project.seoDescription);

  expect(new Set(titles).size).toBe(titles.length);
  expect(new Set(descriptions).size).toBe(descriptions.length);
  descriptions.forEach((description) => {
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(80);
  });
});

test("page titles follow requested SERP naming convention", () => {
  expect(siteConfig.name).toBe("Deven Varu");
  expect(siteConfig.defaultTitle).toBe("Deven Varu | AI Engineer");
  projects.forEach((project) => {
    expect(project.seoTitle).toBe(`${project.displayTitle || project.title} | Deven Varu`);
  });
});

test("JSON-LD helper emits valid script-safe JSON", () => {
  const schema = projectPageSchema(projects[0]);
  const serialized = safeJsonLd(schema);

  expect(() => JSON.parse(serialized)).not.toThrow();
  expect(serialized).not.toContain("<");
  expect(serialized).not.toContain("</script>");
});

test("generated sitemap includes homepage, projects index, and all project pages", () => {
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");

  expect(sitemap).toContain("https://devenvaru.com/");
  expect(sitemap).toContain("https://devenvaru.com/projects/");
  requiredSlugs.forEach((slug) => {
    expect(sitemap).toContain(`https://devenvaru.com/projects/${slug}/`);
  });
  expect(sitemap).not.toContain("localhost");
});

test("generated homepage has complete crawl metadata", () => {
  const indexPath = path.join(process.cwd(), "public", "index.html");
  const html = fs.readFileSync(indexPath, "utf8");
  const jsonLd = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );

  expect(html).toContain(`<meta name="description" content="${siteConfig.description}" />`);
  expect(html).toContain(`<meta property="og:description" content="${siteConfig.description}" />`);
  expect(html).toContain('<link rel="canonical" href="https://devenvaru.com/" />');
  expect(html).toContain("<title>Deven Varu | AI Engineer</title>");
  expect(jsonLd).toBeTruthy();
  expect(() => JSON.parse(jsonLd[1])).not.toThrow();
});

test("generated projects index uses requested title", () => {
  const projectsPath = path.join(process.cwd(), "public", "projects", "index.html");
  const html = fs.readFileSync(projectsPath, "utf8");

  expect(html).toContain("<title>Projects | Deven Varu</title>");
  expect(metaContent(html, "property", "og:title")).toBe("Projects | Deven Varu");
  expect(metaContent(html, "name", "twitter:title")).toBe("Projects | Deven Varu");
});

test("generated pages have complete SEO metadata and valid internal references", () => {
  generatedPages().forEach(({ route, html }) => {
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
    const description = metaContent(html, "name", "description");
    const canonical = linkHref(html, "canonical");
    const robots = metaContent(html, "name", "robots");
    const jsonLdBlocks = [
      ...html.matchAll(
        /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi
      ),
    ];

    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThanOrEqual(65);
    expect(description.length).toBeGreaterThanOrEqual(70);
    expect(description.length).toBeLessThanOrEqual(170);
    expect(canonical).toMatch(/^https:\/\/devenvaru\.com\//);
    expect(robots).toBe(route === "/404.html" ? "noindex,follow" : "index,follow");
    expect(metaContent(html, "property", "og:title")).toBeTruthy();
    expect(metaContent(html, "property", "og:description")).toBeTruthy();
    expect(metaContent(html, "property", "og:url")).toBeTruthy();
    expect(metaContent(html, "property", "og:image")).toBeTruthy();
    expect(metaContent(html, "name", "twitter:card")).toBe("summary_large_image");
    expect(metaContent(html, "name", "twitter:title")).toBeTruthy();
    expect(metaContent(html, "name", "twitter:description")).toBeTruthy();
    expect(metaContent(html, "name", "twitter:image")).toBeTruthy();
    expect(jsonLdBlocks.length).toBeGreaterThan(0);
    jsonLdBlocks.forEach((match) => expect(() => JSON.parse(match[1])).not.toThrow());

    [...quotedAttributes(html, "href"), ...quotedAttributes(html, "src"), ...quotedAttributes(html, "poster")]
      .filter((value) => value.startsWith("/"))
      .forEach((value) => {
        const localPath = value.split("#")[0] || "/";
        const targetPath = path.join(publicDir, decodeURIComponent(localPath).replace(/^\//, ""));
        const exists = fs.existsSync(targetPath) || fs.existsSync(path.join(targetPath, "index.html"));
        expect(exists).toBe(true);
      });
  });
});
