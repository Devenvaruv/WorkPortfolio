# SEO Setup

This portfolio is a Create React App site. The homepage is React-rendered, and SEO project pages are generated as static HTML under `public/projects/` by `npm run seo:generate`.

## Production URL

Set the canonical production URL before deployment:

```bash
REACT_APP_SITE_URL=https://your-production-domain.example
```

The current checked-in default is centralized in `src/siteConfig.js`. Update that value if the production domain is not `https://devenvaru.com`.

## Webmaster Verification

Do not commit verification tokens directly into source control. The build-time generator emits Google Search Console and Bing Webmaster verification tags when these environment variables are present:

```bash
REACT_APP_GOOGLE_SITE_VERIFICATION=...
REACT_APP_BING_SITE_VERIFICATION=...
```

## Adding A Project Page

1. Add or update one project object in `src/portfolioData.js`.
2. Include a unique `slug`.
3. Add `seoTitle`, `seoDescription`, `organization`, `role`, `schemaType`, `sections`, and `related`.
4. Add real media through `media` when a screenshot or demo is available.
5. Run `npm run seo:generate`.
6. Confirm the new route exists under `public/projects/{slug}/index.html`.

## Generated Files

`npm run seo:generate` creates or updates:

- `public/projects/index.html`
- `public/projects/{slug}/index.html`
- `public/index.html`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/404.html`

`npm run build` runs this generator automatically through `prebuild`.

## Open Graph Image

The current Open Graph image is a 1200 x 630 PNG at:

```text
public/images/og-deven-varu.png
```

It is referenced by default Open Graph and Twitter metadata as `https://devenvaru.com/images/og-deven-varu.png`.

## Replacing Screenshots

Add project screenshots or short demo media under `public/images/` or `public/videos/`, then update the relevant project object in `src/portfolioData.js`.

Use descriptive filenames and visible captions. Do not use fake screenshots or generic AI artwork.

## Structured Data Validation

After deployment, validate the homepage and project pages with:

- Google Rich Results Test
- Schema.org validator
- Google Search Console URL inspection
- Bing Webmaster URL inspection

Check that JSON-LD matches visible page content and does not include placeholder media as real images.

## Local Validation

```bash
npm run seo:generate
npx eslint src --ext .js
npm test -- --watchAll=false
npm run build
```

After serving the build:

```bash
curl -I https://your-production-domain.example/
curl -I https://your-production-domain.example/projects/
curl -I https://your-production-domain.example/projects/interview-with-ai/
curl https://your-production-domain.example/robots.txt
curl https://your-production-domain.example/sitemap.xml
```

## Post-Deployment Checklist

1. Deploy the production site.
2. Confirm the production domain.
3. Verify canonical URLs.
4. Open `/robots.txt`.
5. Open `/sitemap.xml`.
6. Open each project route.
7. Confirm Open Graph previews.
8. Add site to Google Search Console.
9. Add site to Bing Webmaster Tools.
10. Submit the sitemap.
11. Request indexing for the homepage, projects index, InterviewWithAI, Codex Session Visualizer, Road Asset Detection, and Catalog Intelligence Automation.
12. Add the portfolio URL to LinkedIn.
13. Add the portfolio URL to the GitHub profile.
14. Add relevant case-study links to project repository READMEs.
15. Monitor impressions, indexed pages, and crawl errors.

## Known SEO Risks

- CRA is not a server-rendered framework. The static generated project pages improve crawlability, but a future migration to a static-first framework such as Astro or Next.js would provide stronger route-native metadata.
- The production domain was not present in repo config. Confirm `REACT_APP_SITE_URL` before deployment.
- Several priority projects still need real screenshots or videos.
