const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const projectsDir = path.join(publicDir, "projects");
const imagesDir = path.join(publicDir, "images");
const resumeSourcePdf = path.join(root, "Deven V Resume.pdf");
const legacyResumePublicPath = path.join(publicDir, "resume");
const resumePublicPath = path.join(publicDir, "resume.pdf");
const resumeBuildFallbackPath = path.join(root, "build", "resume.pdf");

function loadExports(filePath, context = {}) {
  const source = fs.readFileSync(filePath, "utf8");
  const functionNames = [];
  const transformed = source
    .replace(/^import .*;$/gm, "")
    .replace(/export const ([A-Za-z0-9_]+) =/g, "const $1 = exports.$1 =")
    .replace(/export function ([A-Za-z0-9_]+)\(/g, (_, name) => {
      functionNames.push(name);
      return `function ${name}(`;
    });
  const executable = `${transformed}\n${functionNames
    .map((name) => `exports.${name} = ${name};`)
    .join("\n")}`;
  const exports = {};
  vm.runInNewContext(executable, {
    exports,
    process,
    ...context,
  }, { filename: filePath });
  return exports;
}

const data = loadExports(path.join(root, "src", "portfolioData.js"));
const configExports = loadExports(path.join(root, "src", "siteConfig.js"), {
  profile: data.profile,
  projects: data.projects,
  normalizeSiteUrl: (url) => String(url || "").replace(/\/+$/, ""),
});
const seo = loadExports(path.join(root, "src", "seo.js"), {
  profile: data.profile,
  projects: data.projects,
  skillGroups: data.skillGroups,
  siteConfig: configExports.siteConfig,
  absoluteUrl: configExports.absoluteUrl,
});

const { projects, profile } = data;
const { siteConfig, absoluteUrl } = configExports;

const portfolioSections = [
  { group: "featured", title: "Featured Work", headingId: "featured-work" },
  { group: "ai-systems", title: "AI Systems", headingId: "ai-systems" },
  { group: "experiments", title: "Experiments", headingId: "experiments" },
  { group: "earlier-work", title: "Earlier Work", headingId: "earlier-work" },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents, "utf8");
}

function copyFile(sourcePath, destinationPath) {
  ensureDir(path.dirname(destinationPath));
  fs.copyFileSync(sourcePath, destinationPath);
}

function removeIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
}

function syncResumePdf() {
  removeIfExists(legacyResumePublicPath);

  if (fs.existsSync(resumeSourcePdf)) {
    copyFile(resumeSourcePdf, resumePublicPath);
    return;
  }

  if (!fs.existsSync(resumePublicPath) && fs.existsSync(resumeBuildFallbackPath)) {
    copyFile(resumeBuildFallbackPath, resumePublicPath);
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function verificationMeta() {
  const tags = [];
  const googleVerification = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.REACT_APP_BING_SITE_VERIFICATION;

  if (googleVerification) {
    tags.push(
      `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />`,
    );
  }

  if (bingVerification) {
    tags.push(
      `<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />`,
    );
  }

  return tags.join("\n  ");
}

function pageHead({ title, description, canonical, jsonLd, robots = "index,follow", ogType = "website" }) {
  const ogImage = absoluteUrl(siteConfig.ogImage);
  const verificationTags = verificationMeta();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="${siteConfig.themeColor}" />
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="${escapeHtml(siteConfig.author)}" />
  <meta name="robots" content="${escapeHtml(robots)}" />
  ${verificationTags}
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <link rel="icon" type="image/png" href="/images/favicon.png" />
  <link rel="apple-touch-icon" href="/images/favicon.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta property="og:type" content="${escapeHtml(ogType)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />
  <meta property="og:locale" content="${siteConfig.locale}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:type" content="${siteConfig.ogImageType}" />
  <meta property="og:image:width" content="${siteConfig.ogImageWidth}" />
  <meta property="og:image:height" content="${siteConfig.ogImageHeight}" />
  <meta property="og:image:alt" content="${escapeHtml(siteConfig.ogImageAlt)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(siteConfig.ogImageAlt)}" />
  <script type="application/ld+json">${seo.safeJsonLd(jsonLd)}</script>
  <title>${escapeHtml(title)}</title>
  <style>${staticCss()}</style>
</head>`;
}

function staticCss() {
  return `
@font-face{font-family:Lexend;src:url('/fonts/Lexend-VariableFont_wght.ttf') format('truetype');font-weight:100 900;font-display:swap}
@font-face{font-family:'Lexend Giga';src:url('/fonts/LexendGiga-VariableFont_wght.ttf') format('truetype');font-weight:100 900;font-display:swap}
@font-face{font-family:'Share Tech Mono';src:url('/fonts/ShareTechMono-Regular.ttf') format('truetype');font-weight:400;font-display:swap}
:root{color-scheme:dark;--bg:#11100e;--panel:#1a1815;--line:rgba(237,230,218,.14);--text:#f5efe4;--body:#e1d8ca;--muted:#c8beb0;--faint:#a79b8d;--accent:#d2b36b;--body-font:Lexend,ui-sans-serif,system-ui,sans-serif;--display-font:'Lexend Giga',Lexend,ui-sans-serif,system-ui,sans-serif;--mono:'Share Tech Mono','SFMono-Regular',Consolas,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--body-font);line-height:1.65}a{color:var(--accent);text-underline-offset:.28em}a:focus-visible{outline:2px solid var(--accent);outline-offset:4px}.shell{max-width:1180px;margin:0 auto;padding:1.1rem clamp(1rem,4vw,3rem) 4rem}.top{display:flex;justify-content:space-between;gap:1rem;align-items:center;border-bottom:1px solid var(--line);padding-bottom:1rem;margin-bottom:clamp(2.5rem,5vw,4.5rem)}.brand{color:var(--text);font-weight:700;text-decoration:none}.nav{display:flex;gap:1rem;flex-wrap:wrap}.nav a{color:var(--muted)}h1{font-size:clamp(2.35rem,5vw,4.8rem);line-height:1.04;margin:0 0 1rem;font-weight:700}h2{font-size:clamp(1.6rem,3vw,2.5rem);line-height:1.12;margin:2.5rem 0 .75rem}.lede{max-width:68ch;color:var(--body);font-size:1.08rem}.meta,.stack,.eyebrow,.crumbs{font-family:var(--mono);color:var(--faint)}.crumbs{margin-bottom:1.2rem}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem 3rem}.project-list{display:grid;gap:1.1rem;margin-top:2rem}.project-list article,.media{border-top:1px solid var(--line);padding-top:1rem}.media{margin:2rem 0}.media video,.media img{width:100%;max-width:720px;aspect-ratio:var(--media-aspect,16/10);object-fit:contain;transform:scale(1.01);border-radius:8px;background:var(--panel);display:block}.placeholder{max-width:720px;aspect-ratio:16/10;display:grid;align-content:center;gap:.6rem;padding:1.5rem;border-radius:8px;background:linear-gradient(135deg,#1a1815,#24211d)}.placeholder strong{font-size:1.4rem}.section{max-width:820px}.section h3{font-size:1.18rem;line-height:1.25;margin:1.6rem 0 .45rem;color:var(--text)}.links{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1rem}.related{display:grid;gap:.7rem;margin:1rem 0 0;padding:0;list-style:none}.footer{border-top:1px solid var(--line);margin-top:3rem;padding-top:1rem;color:var(--muted)}@media(max-width:760px){.top{align-items:flex-start;flex-direction:column}.grid{grid-template-columns:1fr}}`;
}

function layout({ title, description, canonical, jsonLd, body, robots, ogType }) {
  return `${pageHead({ title, description, canonical, jsonLd, robots, ogType })}
<body>
  <div class="shell">
    <header class="top">
      <a class="brand" href="/">${siteConfig.name}</a>
      <nav class="nav" aria-label="Primary navigation">
        <a href="/projects/">Projects</a>
        <a href="/#experience">Experience</a>
        <a href="/#skills">About / Skills</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
    <main>${body}</main>
    <footer class="footer">
      <p><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a> / <a href="${escapeHtml(profile.linkedin)}">LinkedIn</a> / <a href="${escapeHtml(profile.github)}">GitHub</a></p>
    </footer>
  </div>
</body>
</html>`;
}

function projectDisplayTitle(project) {
  return project.displayTitle || project.title;
}

function isImageMedia(media) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(media || "");
}

function mediaDimensionAttributes(project) {
  if (!project.mediaWidth || !project.mediaHeight) return "";
  return ` width="${escapeHtml(project.mediaWidth)}" height="${escapeHtml(project.mediaHeight)}" style="--media-aspect:${escapeHtml(project.mediaWidth)} / ${escapeHtml(project.mediaHeight)}"`;
}

function projectMedia(project) {
  if (project.media) {
    const dimensionAttributes = mediaDimensionAttributes(project);

    if (isImageMedia(project.media)) {
      return `<figure class="media">
      <img src="${escapeHtml(project.media)}"${dimensionAttributes} alt="${escapeHtml(project.title)} project preview" />
      <figcaption class="meta">${escapeHtml(project.title)} project preview</figcaption>
    </figure>`;
    }

    const poster = project.thumbnail ? ` poster="${escapeHtml(project.thumbnail)}"` : "";
    return `<figure class="media">
      <video src="${escapeHtml(project.media)}"${poster}${dimensionAttributes} controls preload="metadata" aria-label="${escapeHtml(project.title)} project media preview"></video>
      <figcaption class="meta">${escapeHtml(project.title)} project media preview</figcaption>
    </figure>`;
  }

  return `<figure class="media">
    <div class="placeholder">
      <strong>${escapeHtml(project.title)}</strong>
      <span class="meta">Project screenshot coming soon</span>
    </div>
    <figcaption class="meta">Project screenshot coming soon</figcaption>
  </figure>`;
}

function renderParagraphs(value) {
  return value
    ? value
        .split(/\n\s*\n/)
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("")
    : "";
}

function renderItems(items) {
  return items ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "";
}

function renderSections(project) {
  return (project.sections || [])
    .map((section) => {
      const body = renderParagraphs(section.body);
      const items = renderItems(section.items);
      const after = renderParagraphs(section.after);
      const subsections = (section.subsections || [])
        .map(
          (subsection) =>
            `<h3>${escapeHtml(subsection.heading)}</h3>${renderParagraphs(subsection.body)}${renderItems(
              subsection.items
            )}`
        )
        .join("");
      return `<section class="section"><h2>${escapeHtml(section.heading)}</h2>${body}${items}${subsections}${after}</section>`;
    })
    .join("\n");
}

function relatedProjects(project) {
  const related = (project.related || [])
    .map((slug) => projects.find((candidate) => candidate.slug === slug))
    .filter(Boolean);

  if (!related.length) return "";

  return `<section class="section">
    <h2>Related projects</h2>
    <ul class="related">
      ${related
        .map(
          (item) =>
            `<li><a href="/projects/${item.slug}/">${escapeHtml(projectDisplayTitle(item))}</a> - ${escapeHtml(item.summary)}</li>`
        )
        .join("")}
    </ul>
  </section>`;
}

function projectPage(project) {
  const pathName = `/projects/${project.slug}/`;
  const canonical = absoluteUrl(pathName);
  const summary = project.caseStudySummary || project.summary;
  const impact = project.caseStudyImpact || project.impact;
  const stack = project.caseStudyStack || project.stack;
  return layout({
    title: project.seoTitle,
    description: project.seoDescription,
    canonical,
    ogType: "article",
    jsonLd: seo.projectPageSchema(project),
    body: `
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/projects/">Projects</a> / <span aria-current="page">${escapeHtml(project.title)}</span>
      </nav>
      <article>
        <p class="eyebrow">${escapeHtml(project.eyebrow)} / ${escapeHtml(project.period)}</p>
        <h1>${escapeHtml(projectDisplayTitle(project))}</h1>
        <p class="lede">${escapeHtml(summary)}</p>
        <p class="meta">${escapeHtml(project.organization || "")}${project.role ? ` / ${escapeHtml(project.role)}` : ""}${project.status ? ` / ${escapeHtml(project.status)}` : ""}</p>
        <p class="stack">${escapeHtml(stack.join(" / "))}</p>
        ${projectMedia(project)}
        <section class="section">
          <h2>Highlights</h2>
          <ul>${impact.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        ${renderSections(project)}
        <div class="links">
          ${project.url ? `<a href="${escapeHtml(project.url)}">View external project</a>` : ""}
          ${project.repositoryUrl && project.repositoryUrl !== profile.github ? `<a href="${escapeHtml(project.repositoryUrl)}">View repository</a>` : ""}
          <a href="/projects/">Back to projects</a>
        </div>
        ${relatedProjects(project)}
      </article>`,
  });
}

function homepagePage() {
  return `${pageHead({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    canonical: absoluteUrl("/"),
    jsonLd: seo.profilePageSchema(),
  })}
<body>
  <noscript>
    Deven Varu is an AI engineer building multi-agent systems, intelligent developer tools,
    computer vision pipelines, and practical automation products. Enable JavaScript to use the
    interactive portfolio, or visit /projects/ for crawlable project case studies.
  </noscript>
  <div id="root"></div>
</body>
</html>`;
}

function projectsIndexPage() {
  const title = "AI Engineering Projects | Deven Varu";
  const description =
    "AI engineering projects across voice agents, multi-agent systems, developer tools, computer vision, retrieval systems, and full-stack products.";
  const renderProject = (project) => `<article>
    <h2><a href="/projects/${project.slug}/">${escapeHtml(projectDisplayTitle(project))}</a></h2>
    <p>${escapeHtml(project.summary)}</p>
    <p class="meta">${escapeHtml(project.period)} / ${escapeHtml(project.status)}</p>
  </article>`;
  const renderSection = (section) => {
    const sectionProjects = projects
      .filter((project) => project.portfolioGroup === section.group)
      .sort((a, b) => (a.portfolioOrder || 0) - (b.portfolioOrder || 0));

    if (!sectionProjects.length) return "";

    return `<section class="project-list" aria-labelledby="${section.headingId}">
        <h2 id="${section.headingId}">${section.title}</h2>
        ${sectionProjects.map(renderProject).join("")}
      </section>`;
  };

  return layout({
    title,
    description,
    canonical: absoluteUrl("/projects/"),
    jsonLd: seo.projectsIndexSchema(),
    body: `
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / Projects</nav>
      <h1>Projects</h1>
      <p class="lede">${escapeHtml(description)}</p>
      ${portfolioSections.map(renderSection).join("\n")}`,
  });
}

function notFoundPage() {
  return layout({
    title: "Page not found | Deven Varu",
    description:
      "The requested portfolio page was not found. View Deven Varu's AI engineering projects, experience, skills, and contact links.",
    canonical: absoluteUrl("/404.html"),
    robots: "noindex,follow",
    jsonLd: seo.profilePageSchema(),
    body: `
      <h1>Page not found</h1>
      <p class="lede">This page does not exist. The project case studies and homepage are still available.</p>
      <div class="links"><a href="/">Go home</a><a href="/projects/">View projects</a></div>`,
  });
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: absoluteUrl("/"), priority: "1.0" },
    { loc: absoluteUrl("/projects/"), priority: "0.9" },
    ...projects.map((project) => ({
      loc: absoluteUrl(`/projects/${project.slug}/`),
      priority: ["interview-with-ai", "codex-session-visualizer"].includes(project.slug)
        ? "0.9"
        : "0.8",
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${toXml(url.loc)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /preview/
Disallow: /admin/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}

function generate() {
  ensureDir(projectsDir);
  ensureDir(imagesDir);

  writeFile(path.join(publicDir, "index.html"), homepagePage());
  writeFile(path.join(projectsDir, "index.html"), projectsIndexPage());
  syncResumePdf();
  projects.forEach((project) => {
    writeFile(path.join(projectsDir, project.slug, "index.html"), projectPage(project));
  });
  writeFile(path.join(publicDir, "404.html"), notFoundPage());
  writeFile(path.join(publicDir, "sitemap.xml"), sitemap());
  writeFile(path.join(publicDir, "robots.txt"), robots());
}

generate();
