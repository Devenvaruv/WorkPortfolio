import fs from "fs";
import path from "path";
import { projects } from "./portfolioData";
import { projectPageSchema, safeJsonLd } from "./seo";
import { siteConfig } from "./siteConfig";

const requiredSlugs = [
  "interview-with-ai",
  "codex-session-visualizer",
  "road-asset-detection",
  "catalog-intelligence-automation",
  "a2a-multi-agent-builder",
  "10-agent-board-game",
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
  expect(jsonLd).toBeTruthy();
  expect(() => JSON.parse(jsonLd[1])).not.toThrow();
});
