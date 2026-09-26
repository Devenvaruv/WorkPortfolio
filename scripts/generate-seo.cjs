const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const projectsDir = path.join(publicDir, "projects");
const timelineDir = path.join(publicDir, "timeline");
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
const timelineData = JSON.parse(fs.readFileSync(path.join(root, "src", "timelineData.json"), "utf8"));

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

function pageHead({
  title,
  description,
  canonical,
  jsonLd,
  robots = "index,follow",
  ogType = "website",
  extraCss = "",
}) {
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
  <script>${initialThemeScript()}</script>
  <style>${staticCss()}${extraCss}</style>
</head>`;
}

function initialThemeScript() {
  return `(function(){try{var theme=localStorage.getItem('portfolio-theme');if(theme==='light'){document.documentElement.dataset.theme='light';document.documentElement.style.colorScheme='light';var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content','#ffffff');}}catch(error){}})();`;
}

function themeToggleScript() {
  return `(function(){var key='portfolio-theme';function readTheme(){try{return localStorage.getItem(key)==='light'?'light':'dark';}catch(error){return document.documentElement.dataset.theme==='light'?'light':'dark';}}function applyTheme(theme){var next=theme==='light'?'light':'dark';var light=next==='light';document.documentElement.dataset.theme=next;document.documentElement.style.colorScheme=next;var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',light?'#ffffff':'#11100e');try{localStorage.setItem(key,next);}catch(error){}document.querySelectorAll('[data-theme-toggle]').forEach(function(button){button.setAttribute('aria-pressed',String(light));button.setAttribute('aria-label','Switch to '+(light?'dark':'white')+' mode');var label=button.querySelector('[data-theme-label]');if(label)label.textContent=light?'White':'Dark';});}function setup(){applyTheme(readTheme());document.querySelectorAll('[data-theme-toggle]').forEach(function(button){button.addEventListener('click',function(){applyTheme(readTheme()==='light'?'dark':'light');});});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',setup);}else{setup();}})();`;
}

function staticCss() {
  return `
@font-face{font-family:Lexend;src:url('/fonts/Lexend-VariableFont_wght.ttf') format('truetype');font-weight:100 900;font-display:swap}
@font-face{font-family:'Lexend Giga';src:url('/fonts/LexendGiga-VariableFont_wght.ttf') format('truetype');font-weight:100 900;font-display:swap}
@font-face{font-family:'Share Tech Mono';src:url('/fonts/ShareTechMono-Regular.ttf') format('truetype');font-weight:400;font-display:swap}
:root{color-scheme:dark;--bg:#11100e;--panel:#1a1815;--panel-soft:#24211d;--line:rgba(237,230,218,.14);--text:#f5efe4;--body:#e1d8ca;--muted:#c8beb0;--faint:#a79b8d;--accent:#d2b36b;--body-font:Lexend,ui-sans-serif,system-ui,sans-serif;--display-font:'Lexend Giga',Lexend,ui-sans-serif,system-ui,sans-serif;--mono:'Share Tech Mono','SFMono-Regular',Consolas,monospace}
:root[data-theme=light]{color-scheme:light;--bg:#fff;--panel:#f4f1eb;--panel-soft:#ebe6dc;--line:rgba(38,35,30,.15);--text:#17130f;--body:#39342c;--muted:#5d5548;--faint:#776d5e;--accent:#8a6418}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:var(--body-font);line-height:1.65}a{color:var(--accent);text-underline-offset:.28em}a:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:4px}.shell{max-width:1180px;margin:0 auto;padding:1.1rem clamp(1rem,4vw,3rem) 4rem}.top{display:flex;justify-content:space-between;gap:1rem;align-items:center;border-bottom:1px solid var(--line);padding-bottom:1rem;margin-bottom:clamp(2.5rem,5vw,4.5rem)}.brand{color:var(--text);font-weight:700;text-decoration:none}.top-actions{display:flex;align-items:center;justify-content:flex-end;gap:clamp(.75rem,2vw,1.45rem);flex-wrap:wrap}.nav{display:flex;gap:1rem;flex-wrap:wrap}.nav a{color:var(--muted)}.theme-toggle{display:inline-flex;align-items:center;gap:.55rem;min-height:2.3rem;padding:.25rem .7rem .25rem .35rem;border:1px solid var(--line);border-radius:999px;background:var(--panel);color:var(--text);font:inherit;font-size:.86rem;font-weight:700;cursor:pointer}.theme-toggle:hover{border-color:var(--accent)}.toggle-track{display:inline-flex;align-items:center;width:2.15rem;height:1.22rem;padding:.15rem;border-radius:999px;background:var(--panel-soft)}.toggle-track span{width:.92rem;height:.92rem;border-radius:50%;background:var(--accent);transition:transform 160ms ease,background 160ms ease}.theme-toggle[aria-pressed=true] .toggle-track{background:var(--accent)}.theme-toggle[aria-pressed=true] .toggle-track span{background:#fff;transform:translateX(.92rem)}.theme-label{min-width:2.65rem;text-align:left}h1{font-size:clamp(2.35rem,5vw,4.8rem);line-height:1.04;margin:0 0 1rem;font-weight:700}h2{font-size:clamp(1.6rem,3vw,2.5rem);line-height:1.12;margin:2.5rem 0 .75rem}.lede{max-width:68ch;color:var(--body);font-size:1.08rem}.meta,.stack,.eyebrow,.crumbs{font-family:var(--mono);color:var(--faint)}.crumbs{margin-bottom:1.2rem}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem 3rem}.project-list{display:grid;gap:1.1rem;margin-top:2rem}.project-list article,.media{border-top:1px solid var(--line);padding-top:1rem}.media{margin:2rem 0}.media video,.media img{width:100%;max-width:720px;aspect-ratio:var(--media-aspect,16/10);object-fit:contain;transform:scale(1.01);border-radius:8px;background:var(--panel);display:block}.placeholder{max-width:720px;aspect-ratio:16/10;display:grid;align-content:center;gap:.6rem;padding:1.5rem;border-radius:8px;background:linear-gradient(135deg,var(--panel),var(--panel-soft))}.placeholder strong{font-size:1.4rem}.section{max-width:820px}.section h3{font-size:1.18rem;line-height:1.25;margin:1.6rem 0 .45rem;color:var(--text)}.links{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1rem}.related{display:grid;gap:.7rem;margin:1rem 0 0;padding:0;list-style:none}.footer{border-top:1px solid var(--line);margin-top:3rem;padding-top:1rem;color:var(--muted)}@media(max-width:760px){.top{align-items:flex-start;flex-direction:column}.top-actions{justify-content:flex-start}.grid{grid-template-columns:1fr}}`;
}

function layout({ title, description, canonical, jsonLd, body, robots, ogType }) {
  return `${pageHead({ title, description, canonical, jsonLd, robots, ogType })}
<body>
  <div class="shell">
    <header class="top">
      <a class="brand" href="/">${siteConfig.name}</a>
      <div class="top-actions">
        <nav class="nav" aria-label="Primary navigation">
          <a href="/projects/">Projects</a>
          <a href="/timeline">Timeline</a>
          <a href="/#experience">Experience</a>
          <a href="/#skills">About / Skills</a>
          <a href="/#contact">Contact</a>
        </nav>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to white mode" aria-pressed="false">
          <span class="toggle-track" aria-hidden="true"><span></span></span>
          <span class="theme-label" data-theme-label>Dark</span>
        </button>
      </div>
    </header>
    <main>${body}</main>
    <footer class="footer">
      <p><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a> / <a href="${escapeHtml(profile.linkedin)}">LinkedIn</a> / <a href="${escapeHtml(profile.github)}">GitHub</a></p>
    </footer>
  </div>
  <script>${themeToggleScript()}</script>
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
  const title = "Projects | Deven Varu";
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

function timelineStaticCss() {
  return `
html,body{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar,body::-webkit-scrollbar{width:0;height:0;display:none}body{margin:0;overflow-x:hidden;background:#11100e;color:#fff}.timeline-stage{position:relative;width:100vw;min-height:${timelineData.screens.length * 100}svh;overflow:hidden;isolation:isolate}.timeline-screen{position:relative;width:100vw;height:100svh;overflow:hidden;background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(100% / 12 - 1px),rgba(255,255,255,.14) calc(100% / 12 - 1px),rgba(255,255,255,.14) calc(100% / 12)),repeating-linear-gradient(to bottom,transparent 0,transparent calc(100% / 12),rgba(255,255,255,.045) calc(100% / 12),rgba(255,255,255,.045) calc(100% / 6)),var(--screen-color)}.month-ticks{position:absolute;inset:0 auto 0 1.43%;z-index:2;display:grid;grid-template-rows:repeat(12,1fr);width:.86%;pointer-events:none}.month-ticks span{align-self:center;width:100%;height:3px;border-radius:999px;background:rgba(255,255,255,.18)}.month-labels{position:absolute;inset:0 2.42% 0 auto;z-index:4;display:grid;grid-template-rows:repeat(12,1fr);width:2.72%;min-width:34px;pointer-events:none}.month-labels span{align-self:center;color:rgba(255,255,255,.56);font-size:clamp(.6rem,.93vw,.82rem);font-weight:500;line-height:1;text-align:right}.year-label{position:absolute;right:2.42%;bottom:.67%;z-index:5;width:5.72%;min-width:70px;color:rgba(255,255,255,.86);font-size:clamp(.82rem,1.43vw,1.25rem);font-weight:650;line-height:1.2;text-align:right}.glass-arrow{position:absolute;right:2.14%;z-index:6;display:grid;width:clamp(38px,3.86vw,54px);height:clamp(38px,3.86vw,54px);padding:0;place-items:center;border:0;background:transparent;opacity:.9;cursor:pointer;text-decoration:none}.glass-arrow.up{top:2.3%}.glass-arrow.down{bottom:5.78%}.glass-arrow.dimmed{opacity:.55;pointer-events:none}.glass-arrow span{display:block;width:78%;height:68%;clip-path:polygon(50% 0,100% 44%,73% 44%,73% 100%,27% 100%,27% 44%,0 44%);background:linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.28) 58%,rgba(255,255,255,.72)),rgba(255,255,255,.34);filter:drop-shadow(0 9px 10px rgba(0,0,0,.14));box-shadow:inset 2px 2px 4px rgba(255,255,255,.8),inset -3px -4px 7px rgba(255,255,255,.24);backdrop-filter:blur(20px) saturate(1.18)}.glass-arrow.down span{transform:rotate(180deg)}.rectangle-overlay{position:absolute;inset:0;z-index:3;pointer-events:none}.glass-rect{position:absolute;left:var(--rect-left);top:var(--rect-top);width:var(--rect-width);height:var(--rect-height);min-width:42px;min-height:72px;overflow:hidden;border:1.5px solid rgba(255,255,255,.68);border-radius:clamp(14px,1.72vw,24px);background:linear-gradient(135deg,rgba(255,255,255,.38),rgba(var(--origin-rgb),.68) 38%,rgba(0,0,0,.18)),var(--origin-color);box-shadow:16px 0 30px rgba(0,0,0,.16),0 10px 24px rgba(0,0,0,.12),inset -5px -6px 10px rgba(255,255,255,.5),inset 4px 5px 10px rgba(255,255,255,.38);opacity:.95;backdrop-filter:blur(68px) saturate(1.25)}.glass-rect:before{content:"";position:absolute;inset:-8% -26%;background:radial-gradient(ellipse at 46% calc(18% + var(--wave-offset)),rgba(255,255,255,.24),transparent 26%),radial-gradient(ellipse at 56% calc(42% + var(--wave-offset)),rgba(255,255,255,.16),transparent 28%),linear-gradient(104deg,transparent 14%,rgba(255,255,255,.16) 38%,rgba(var(--origin-rgb),.94) 50%,transparent 73%);filter:blur(9px);opacity:.82;transform:skewY(-11deg)}.glass-rect:after{content:"";position:absolute;inset:10px 12px 12px 10px;border-radius:inherit;background:linear-gradient(to bottom,rgba(255,255,255,.52),transparent 11%),linear-gradient(to right,rgba(255,255,255,.62),transparent 8%,transparent 88%,rgba(255,255,255,.32)),radial-gradient(circle at 78% 9%,rgba(255,255,255,.36),transparent 14%);mix-blend-mode:screen;pointer-events:none}.rect-text{position:relative;z-index:2;display:grid;gap:clamp(.45rem,1.3vw,.8rem);width:calc(100% - 24px);margin:clamp(3.4rem,6vw,4.5rem) auto 0;padding:clamp(.75rem,1.4vw,1rem) .45rem;border-radius:16px;background:rgba(115,0,0,.18);text-align:center;text-shadow:0 1px 8px rgba(80,0,0,.34)}.rect-text h1{margin:0;color:#fff;font-size:clamp(.78rem,2.14vw,1.9rem);font-weight:800;line-height:1.1}.rect-text p{margin:0 auto;max-width:16ch;color:rgba(255,255,255,.94);font-size:clamp(.48rem,.93vw,.82rem);line-height:1.32}@media(max-width:680px){.month-ticks{left:12px;width:10px}.month-labels,.year-label,.glass-arrow{right:12px}.glass-rect{border-width:1px}.rect-text{width:calc(100% - 12px);margin-top:2.6rem;padding-inline:.25rem}}`;
}

function timelineLifeStaticCss() {
  return `.column-atmosphere{position:absolute;inset:0;z-index:1;pointer-events:none;mix-blend-mode:screen}.column-atmosphere span{position:absolute;top:0;bottom:0;left:var(--column-left);width:var(--column-width);overflow:hidden;opacity:.62;background:linear-gradient(to right,transparent 0,rgba(var(--column-rgb),.08) 18%,rgba(255,255,255,.075) 50%,rgba(var(--column-rgb),.08) 82%,transparent 100%)}.column-atmosphere span:before,.column-atmosphere span:after{content:"";position:absolute;inset:-18% 9%;border-radius:999px;pointer-events:none}.column-atmosphere span:before{background:radial-gradient(ellipse at 50% 8%,rgba(255,255,255,.22),transparent 17%),radial-gradient(ellipse at 50% 46%,rgba(var(--column-rgb),.22),transparent 24%),radial-gradient(ellipse at 50% 88%,rgba(255,255,255,.12),transparent 18%);filter:blur(18px);animation:columnBreath 9s ease-in-out infinite;animation-delay:var(--column-delay)}.column-atmosphere span:after{background:linear-gradient(108deg,transparent 0,transparent 34%,rgba(255,255,255,.16) 44%,rgba(var(--column-rgb),.16) 51%,transparent 62%,transparent 100%);filter:blur(10px);opacity:.42;animation:columnGlint 13s ease-in-out infinite;animation-delay:calc(var(--column-delay) - 1.5s)}.rect-text{z-index:4;gap:clamp(.12rem,.42vw,.32rem);width:calc(100% - 18px);max-height:calc(100% - 18px);margin:9px auto 0;padding:clamp(.36rem,.72vw,.62rem) clamp(.32rem,.72vw,.56rem);overflow:hidden;border-radius:clamp(10px,1.14vw,16px);background:rgba(30,20,12,.18);text-align:left;text-shadow:0 1px 8px rgba(0,0,0,.24);backdrop-filter:blur(10px)}.rect-text h1{font-size:clamp(.54rem,1.02vw,.98rem);line-height:1.08;overflow-wrap:break-word;word-break:normal}.rect-text time,.rect-text strong{display:block;color:rgba(255,255,255,.8);font-size:clamp(.42rem,.62vw,.64rem);font-weight:700;line-height:1.12;overflow-wrap:break-word;word-break:normal}.rect-text strong{color:rgba(255,255,255,.7);font-weight:650}.rect-text p{display:-webkit-box;margin:0;max-width:none;color:rgba(255,255,255,.88);font-size:clamp(.42rem,.68vw,.68rem);line-height:1.22;overflow:hidden;overflow-wrap:break-word;word-break:normal;-webkit-box-orient:vertical;-webkit-line-clamp:5}.end-milestone{position:absolute;left:9px;right:9px;bottom:9px;z-index:4;display:grid;gap:.12rem;padding:clamp(.34rem,.66vw,.58rem);overflow:hidden;border-radius:clamp(10px,1vw,15px);background:rgba(30,20,12,.2);color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.24);backdrop-filter:blur(10px)}.end-milestone h2{margin:0;font-size:clamp(.52rem,.92vw,.9rem);line-height:1.08}.end-milestone time,.end-milestone span{color:rgba(255,255,255,.78);font-size:clamp(.4rem,.58vw,.6rem);font-weight:700;line-height:1.12}.end-milestone span{color:rgba(255,255,255,.68)}.glass-rect{animation:rectangleFloat 8s ease-in-out infinite;animation-delay:var(--rect-delay)}.glass-rect:before{inset:6px 8px 8px 7px;z-index:3;border-radius:inherit;background:radial-gradient(ellipse at 35% 24%,rgba(255,255,255,.34),transparent 20%),radial-gradient(ellipse at 72% 68%,rgba(255,255,255,.18),transparent 26%),linear-gradient(115deg,transparent 0%,rgba(255,255,255,.18) 28%,rgba(var(--origin-rgb),.26) 49%,rgba(255,255,255,.12) 64%,transparent 100%);background-size:160% 160%,150% 150%,190% 100%;mix-blend-mode:screen;opacity:.56;animation:glassCurrent 7.8s ease-in-out infinite;animation-delay:calc(var(--rect-delay) - .35s)}.glass-rect:after{animation:rimPulse 6.8s ease-in-out infinite;animation-delay:calc(var(--rect-delay) - .8s)}.glass-rect:hover{box-shadow:18px 0 34px rgba(0,0,0,.18),0 16px 34px rgba(var(--origin-rgb),.28),inset -5px -6px 10px rgba(255,255,255,.58),inset 4px 5px 12px rgba(255,255,255,.44)}@keyframes columnBreath{0%,100%{transform:translate3d(0,-2.5%,0) scaleY(1);opacity:.5}50%{transform:translate3d(0,2.5%,0) scaleY(1.035);opacity:.86}}@keyframes columnGlint{0%,100%{transform:translate3d(calc(var(--column-sway) * -13%),-1.5%,0) skewY(-8deg);opacity:.24}48%,58%{transform:translate3d(calc(var(--column-sway) * 14%),1.5%,0) skewY(-8deg);opacity:.58}}@keyframes rectangleFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-.42%,0)}}@keyframes liquidWave{0%,100%{transform:translate3d(-2%,-1%,0) skewY(-11deg);opacity:.72}50%{transform:translate3d(3%,1.5%,0) skewY(-8deg);opacity:.94}}@keyframes glassCurrent{0%,100%{background-position:8% 14%,88% 76%,-34% 50%;transform:translate3d(-1.2%,-.8%,0) skewY(-4deg);opacity:.42}46%{background-position:58% 42%,38% 28%,94% 50%;transform:translate3d(1.5%,1%,0) skewY(-1deg);opacity:.72}}@keyframes rimPulse{0%,100%{opacity:.74;transform:translate3d(0,0,0)}50%{opacity:1;transform:translate3d(0,-.8%,0)}}@media(max-width:760px){.rect-text{width:calc(100% - 10px);margin-top:5px;padding-inline:.25rem}.rect-text strong,.rect-text p{display:none}.end-milestone{left:5px;right:5px;bottom:5px}.end-milestone span{display:none}}@media(prefers-reduced-motion:reduce){.column-atmosphere span:before,.column-atmosphere span:after,.glass-rect,.glass-rect:before,.glass-rect:after{animation:none}}`;
}

function timelineNavigationStaticCss() {
  return `body{--travel-start:118%;--travel-end:-118%}body.timeline-up{--travel-start:-118%;--travel-end:118%}body.timeline-transitioning:before,body.timeline-transitioning:after{content:"";position:fixed;inset:-14vh -8vw;z-index:30;pointer-events:none}body.timeline-transitioning:before{background:linear-gradient(to bottom,transparent 0,rgba(255,255,255,.08) 23%,rgba(255,255,255,.34) 47%,rgba(255,255,255,.13) 61%,transparent 100%);filter:blur(.5px);mix-blend-mode:screen;animation:carryoverGlassWash 1050ms cubic-bezier(.22,1,.36,1)}body.timeline-transitioning:after{background:radial-gradient(ellipse at 50% 42%,rgba(255,255,255,.18),transparent 38%),linear-gradient(90deg,transparent 0,rgba(255,255,255,.08) 18%,rgba(255,255,255,.16) 50%,rgba(255,255,255,.08) 82%,transparent 100%);mix-blend-mode:overlay;animation:carryoverBloom 1050ms ease-out}.timeline-stage.timeline-transitioning{animation:stageTravelDepth 1050ms cubic-bezier(.22,1,.36,1)}.timeline-screen:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.18),transparent 38%),linear-gradient(to bottom,transparent,rgba(255,255,255,.12),transparent);opacity:0;mix-blend-mode:soft-light}.timeline-screen.is-arriving:after{animation:targetYearArrival 1050ms cubic-bezier(.22,1,.36,1)}@keyframes carryoverGlassWash{0%{transform:translate3d(0,var(--travel-start),0) skewY(-5deg);opacity:0}18%{opacity:.86}100%{transform:translate3d(0,var(--travel-end),0) skewY(-5deg);opacity:0}}@keyframes carryoverBloom{0%,100%{opacity:0;transform:scaleY(.94)}42%{opacity:1;transform:scaleY(1)}}@keyframes stageTravelDepth{0%,100%{filter:saturate(1) brightness(1);transform:scale(1)}38%{filter:saturate(1.18) brightness(1.04);transform:scale(1.006)}}@keyframes targetYearArrival{0%{opacity:0;transform:scaleY(.94)}52%{opacity:1;transform:scaleY(1)}100%{opacity:0;transform:scaleY(1.04)}}@media(prefers-reduced-motion:reduce){body.timeline-transitioning:before,body.timeline-transitioning:after,.timeline-stage.timeline-transitioning,.timeline-screen.is-arriving:after{animation:none;opacity:0}}`;
}

function timelineContinuationStaticCss() {
  return `.continue-marker{position:absolute;top:var(--continue-top);left:9px;right:9px;z-index:5;padding:.28rem .38rem;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.2);color:rgba(255,255,255,.9);font-size:clamp(.38rem,.58vw,.58rem);font-weight:800;line-height:1;text-align:center;text-overflow:ellipsis;text-shadow:0 1px 8px rgba(0,0,0,.24);text-transform:lowercase;white-space:nowrap;backdrop-filter:blur(12px) saturate(1.12);box-shadow:inset 0 1px 0 rgba(255,255,255,.34),0 6px 14px rgba(0,0,0,.12)}@media(max-width:760px){.continue-marker{left:5px;right:5px;padding-inline:.24rem}}`;
}

function timelineLinkStaticCss() {
  return `.glass-rect{color:inherit;text-decoration:none}.glass-rect[href]{pointer-events:auto;cursor:pointer}`;
}

function timelineMilestoneStaticCss() {
  return `.rect-text.has-milestones{align-content:start;gap:.08rem;width:calc(100% - 26px);padding-block:clamp(.24rem,.48vw,.42rem)}.rect-text.has-milestones h1{font-size:clamp(.48rem,.86vw,.82rem)}.rect-text.has-milestones time,.rect-text.has-milestones strong{font-size:clamp(.34rem,.48vw,.5rem)}.milestone-track{position:absolute;inset:0;z-index:5;margin:0;padding:0;list-style:none;pointer-events:none}.milestone-track li{position:absolute;top:var(--milestone-top);left:9px;right:9px;transform:translateY(var(--milestone-shift));display:grid;gap:.08rem;padding:clamp(.24rem,.5vw,.42rem);border-radius:clamp(8px,.86vw,12px);background:rgba(30,20,12,.2);text-shadow:0 1px 8px rgba(0,0,0,.24);backdrop-filter:blur(10px);box-shadow:inset 0 1px 0 rgba(255,255,255,.2),0 7px 16px rgba(0,0,0,.12)}.milestone-track time{color:rgba(255,255,255,.66);font-size:clamp(.34rem,.48vw,.5rem);font-weight:800;line-height:1;text-transform:uppercase}.milestone-track h2{margin:0;color:#fff;font-size:clamp(.48rem,.78vw,.78rem);font-weight:850;line-height:1.05;overflow-wrap:break-word}.milestone-track p{display:block;margin:0;color:rgba(255,255,255,.76);font-size:clamp(.34rem,.5vw,.52rem);line-height:1.16;overflow:hidden;-webkit-line-clamp:unset}@media(max-width:760px){.milestone-track li{left:5px;right:5px}.milestone-track p{display:none}}`;
}

function timelineNavigationScript() {
  return `(function(){var timer;function cleanup(stage,target){document.body.classList.remove('timeline-transitioning','timeline-up','timeline-down');if(stage)stage.classList.remove('timeline-transitioning');if(target)target.classList.remove('is-arriving');}function setup(){var stage=document.querySelector('.timeline-stage');var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;document.querySelectorAll('.glass-arrow[href^="#year-"]').forEach(function(link){link.addEventListener('click',function(event){var id=link.getAttribute('href');var target=document.querySelector(id);if(!target)return;event.preventDefault();if(timer)window.clearTimeout(timer);var direction=link.classList.contains('up')?'up':'down';cleanup(stage,document.querySelector('.timeline-screen.is-arriving'));if(!reduce){document.body.classList.add('timeline-transitioning','timeline-'+direction);if(stage)stage.classList.add('timeline-transitioning');target.classList.add('is-arriving');}target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});window.history.replaceState(null,'',id);timer=window.setTimeout(function(){cleanup(stage,target);},reduce?0:1050);});});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',setup);}else{setup();}})();`;
}

function hexToRgb(hex) {
  const value = parseInt(hex.replace("#", ""), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function timelineRectangleStyle(rect, visibleHeight, index) {
  const geometry = timelineRectangleGeometry(rect);
  const clampedHeight = Math.min(
    geometry.height,
    Math.max(0, visibleHeight - geometry.y)
  );
  const rgb = hexToRgb(rect.originColor);
  return [
    `--rect-left:${(geometry.x / timelineData.design.width) * 100}%`,
    `--rect-top:${(geometry.y / visibleHeight) * 100}%`,
    `--rect-width:${(geometry.width / timelineData.design.width) * 100}%`,
    `--rect-height:${(clampedHeight / visibleHeight) * 100}%`,
    `--origin-color:${rect.originColor}`,
    `--origin-rgb:${rgb.r},${rgb.g},${rgb.b}`,
    `--wave-offset:${index * 17}%`,
    `--rect-delay:${index * -0.72}s`,
  ].join(";");
}

function timelineRectangleGeometry(rect) {
  if (rect.figma) return rect.figma;

  const y = timelineDatePosition(rect.start);
  const endY = timelineDatePosition(rect.end);
  const minHeight = timelineData.design.screenHeight * 0.075;

  return {
    x: (rect.column - 1) * timelineData.design.columnWidth + timelineData.design.rectangleInset,
    y,
    width: timelineData.design.rectangleWidth,
    height: Math.max(minHeight, endY - y),
  };
}

function timelineContinuationMarkers(rect, visibleHeight) {
  if (rect.milestones) {
    return [];
  }

  const geometry = timelineRectangleGeometry(rect);
  const clampedHeight = Math.min(
    geometry.height,
    Math.max(0, visibleHeight - geometry.y)
  );
  const startIndex = timelineData.screens.findIndex((screen) => screen.year === rect.start.year);
  const endIndex = timelineData.screens.findIndex((screen) => screen.year === rect.end.year);

  if (startIndex < 0 || endIndex <= startIndex || clampedHeight <= 0) {
    if (!rect.continuesFromBefore || clampedHeight <= 0) {
      return [];
    }
  }

  const markers = [];

  if (rect.continuesFromBefore) {
    markers.push({
      year: "before",
      top: Math.min(96, Math.max(2, ((0 - geometry.y) / clampedHeight) * 100 + 1.4)),
      label: rect.continueLabel || (rect.content && rect.content.heading) || rect.name,
    });
  }

  markers.push(
    ...timelineData.screens.slice(startIndex + 1, endIndex + 1).map((screen) => {
      const screenIndex = timelineData.screens.findIndex((item) => item.year === screen.year);
      const boundaryY = screenIndex * timelineData.design.screenHeight;
      const top = ((boundaryY - geometry.y) / clampedHeight) * 100;
      return {
        year: screen.year,
        top: Math.min(96, Math.max(2, top + 1.4)),
        label: rect.continueLabel || (rect.content && rect.content.heading) || rect.name,
      };
    })
  );

  return markers;
}

function timelineDatePosition(point) {
  const screenIndex = timelineData.screens.findIndex((screen) => screen.year === point.year);
  const monthIndex = timelineData.months.indexOf(point.month);

  if (screenIndex < 0 || monthIndex < 0) return 0;

  const monthHeight = timelineData.design.screenHeight / timelineData.months.length;
  return (
    screenIndex * timelineData.design.screenHeight +
    monthIndex * monthHeight +
    (point.offset || 0) * monthHeight
  );
}

function timelineMilestoneStyle(rect, milestone, visibleHeight) {
  const geometry = timelineRectangleGeometry(rect);
  const clampedHeight = Math.min(
    geometry.height,
    Math.max(0, visibleHeight - geometry.y)
  );
  const point = milestone.point || parseMilestoneDate(milestone.date);
  const rawTop =
    clampedHeight > 0 ? ((timelineDatePosition(point) - geometry.y) / clampedHeight) * 100 : 0;
  const top = Math.min(97.5, Math.max(5.5, rawTop));
  const shift = rawTop > 91 ? "-100%" : rawTop < 8 ? "0" : "-50%";

  return `--milestone-top:${top}%;--milestone-shift:${shift}`;
}

function parseMilestoneDate(date) {
  const [month, year] = String(date).split(" ");
  return {
    year,
    month: month ? month.slice(0, 3) : timelineData.months[0],
    offset: 0.5,
  };
}

function timelineColumnStyle(index) {
  const rectForColumn = timelineData.rectangles.find((rect) => rect.column === index + 1);
  const color =
    (rectForColumn && rectForColumn.originColor) ||
    timelineData.screens[index % timelineData.screens.length].color;
  const rgb = hexToRgb(color);
  const left =
    (index * timelineData.design.columnWidth / timelineData.design.width) * 100;
  const width =
    (timelineData.design.columnWidth / timelineData.design.width) * 100;

  return [
    `--column-left:${left}%`,
    `--column-width:${width}%`,
    `--column-rgb:${rgb.r},${rgb.g},${rgb.b}`,
    `--column-delay:${index * -1.35}s`,
    `--column-sway:${index % 2 === 0 ? 1 : -1}`,
  ].join(";");
}

function timelinePage() {
  const title = "Rainbow Carryover Timeline | Deven Varu";
  const description =
    "A vertical rainbow carryover timeline with liquid-glass rectangles spanning months and years.";
  const visibleHeight = timelineData.screens.length * timelineData.design.screenHeight;
  const monthLabels = timelineData.months
    .map((month) => `<span>${escapeHtml(month)}</span>`)
    .join("");
  const monthTicks = timelineData.months.map(() => "<span></span>").join("");
  const screens = timelineData.screens
    .map((screen, index) => {
      const previousScreen = timelineData.screens[index - 1];
      const nextScreen = timelineData.screens[index + 1];
      const previousArrow = previousScreen
        ? `<a class="glass-arrow up" href="#year-${escapeHtml(previousScreen.year)}" aria-label="Previous year from ${escapeHtml(screen.year)}"><span></span></a>`
        : `<span class="glass-arrow up dimmed" aria-label="Previous year from ${escapeHtml(screen.year)}" aria-disabled="true"><span></span></span>`;
      const nextArrow = nextScreen
        ? `<a class="glass-arrow down" href="#year-${escapeHtml(nextScreen.year)}" aria-label="Next year from ${escapeHtml(screen.year)}"><span></span></a>`
        : `<span class="glass-arrow down dimmed" aria-label="Next year from ${escapeHtml(screen.year)}" aria-disabled="true"><span></span></span>`;

      return `<section id="year-${escapeHtml(screen.year)}" class="timeline-screen" style="--screen-color:${escapeHtml(screen.color)}" aria-label="${escapeHtml(screen.year)} timeline screen">
        <div class="month-ticks" aria-hidden="true">${monthTicks}</div>
        <div class="month-labels" aria-label="${escapeHtml(screen.year)} months">${monthLabels}</div>
        <div class="year-label">${escapeHtml(screen.year)}</div>
        ${previousArrow}
        ${nextArrow}
      </section>`;
    })
    .join("");
  const columns = Array.from({ length: timelineData.design.columnCount }, (_, index) =>
    `<span style="${timelineColumnStyle(index)}"></span>`
  ).join("");
  const rectangles = timelineData.rectangles
    .filter((rect) => timelineRectangleGeometry(rect).y < visibleHeight)
    .map((rect, index) => {
      const isCompact = timelineRectangleGeometry(rect).height < 150;
      const milestones = rect.milestones && !isCompact ? `<ul class="milestone-track">
          ${rect.milestones
            .map(
              (milestone) => `<li style="${timelineMilestoneStyle(rect, milestone, visibleHeight)}">
            <time>${escapeHtml(milestone.date)}</time>
            <h2>${escapeHtml(milestone.heading)}</h2>
            ${milestone.description ? `<p>${escapeHtml(milestone.description)}</p>` : ""}
          </li>`
            )
            .join("")}
        </ul>` : "";
      const content = rect.content ? `<div class="rect-text${rect.milestones ? " has-milestones" : ""}">
          <h1>${escapeHtml(rect.content.heading)}</h1>
          ${rect.content.date ? `<time>${escapeHtml(rect.content.date)}</time>` : ""}
          ${rect.content.meta && !isCompact ? `<strong>${escapeHtml(rect.content.meta)}</strong>` : ""}
          ${!isCompact && !rect.milestones ? `<p>${escapeHtml(rect.content.body)}</p>` : ""}
        </div>` : "";
      const endMilestone = rect.endMilestone && !isCompact ? `<div class="end-milestone">
          <h2>${escapeHtml(rect.endMilestone.heading)}</h2>
          <time>${escapeHtml(rect.endMilestone.date)}</time>
          ${rect.endMilestone.meta ? `<span>${escapeHtml(rect.endMilestone.meta)}</span>` : ""}
        </div>` : "";
      const continuationMarkers = timelineContinuationMarkers(rect, visibleHeight)
        .map(
          (marker) =>
            `<div class="continue-marker" style="--continue-top:${marker.top}%">continue: ${escapeHtml(marker.label)}</div>`
        )
        .join("");
      const tagName = rect.url ? "a" : "article";
      const href = rect.url
        ? ` href="${escapeHtml(rect.url)}" target="_blank" rel="noreferrer"`
        : "";
      const labelPrefix = rect.url ? "Open " : "";
      return `<${tagName} class="glass-rect"${href} style="${timelineRectangleStyle(rect, visibleHeight, index)}" aria-label="${labelPrefix}${escapeHtml(rect.name)}">${content}${milestones}${continuationMarkers}${endMilestone}</${tagName}>`;
    })
    .join("");

  return `${pageHead({
    title,
    description,
    canonical: absoluteUrl("/timeline"),
    jsonLd: seo.profilePageSchema(),
    extraCss: timelineStaticCss() + timelineLifeStaticCss() + timelineNavigationStaticCss() + timelineContinuationStaticCss() + timelineLinkStaticCss() + timelineMilestoneStaticCss(),
  })}
<body>
  <main class="timeline-stage" aria-label="Rainbow carryover timeline">
    ${screens}
    <div class="column-atmosphere" aria-hidden="true">${columns}</div>
    <div class="rectangle-overlay" aria-label="Carryover glass rectangles">${rectangles}</div>
  </main>
  <script>${timelineNavigationScript()}</script>
</body>
</html>`;
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
    { loc: absoluteUrl("/timeline"), priority: "0.6" },
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
  writeFile(path.join(timelineDir, "index.html"), timelinePage());
  syncResumePdf();
  projects.forEach((project) => {
    writeFile(path.join(projectsDir, project.slug, "index.html"), projectPage(project));
  });
  writeFile(path.join(publicDir, "404.html"), notFoundPage());
  writeFile(path.join(publicDir, "sitemap.xml"), sitemap());
  writeFile(path.join(publicDir, "robots.txt"), robots());
}

generate();
