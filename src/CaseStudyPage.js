// --------------------------------------------------------------------
//  CaseStudyPage.jsx — reusable product / project detail template
// --------------------------------------------------------------------
// Usage:
//    <CaseStudyPage {...caseStudyData} />
//
// Required props
//    title            → page H1
//    hero             → mp4 / webm / gif URL (autoplays & loops)
//    gallery          → array of image URLs (thumbnails)
//    stats            → array of { label, value }
//    description      → markdown‑style string (basic <p> split on \n) 
//    ctaLabel / ctaHref  (optional)
//    next / prev      → { title, path }  (optional breadcrumb nav)
//
// Fully responsive:
//  • ≥900 px :  two‑column layout (stats | media)
//  • <900 px :  stacked layout  (media, stats, gallery)
//
// Integration steps (App.jsx):
//  1.  import CaseStudyPage from "./CaseStudyPage";
//  2.  define data objects for each tile (see bottom of file).
//  3.  Add routes, e.g. <Route path="/full-stack" element={<CaseStudyPage {...fullStack} />} />
// --------------------------------------------------------------------
import React, { useState } from "react";
import styled from "styled-components";

/* ------------------------- Styled Layout ------------------------- */
const Wrapper = styled.main`
  padding: 4rem 1rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-gap: 2.5rem;
  color: #f0f3f6;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Left: key/value stats list
const StatsRail = styled.dl`
  margin: 0;
  display: grid;
  grid-auto-rows: minmax(0, auto);
  dt {
    font-weight: 600;
    color: #8b949e;
    margin-top: 1rem;
  }
  dd {
    margin: 0;
    font-weight: 400;
    font-size: 1.075rem;
  }
`;

// Right: hero + gallery
const MediaRail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Hero = styled.video`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 1rem;
  background: #000;
`;

const HeroImg = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 1rem;
`;

const Gallery = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const Thumb = styled.img`
  width: 96px;
  height: 64px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: opacity 0.25s;
  &:hover {
    opacity: 1;
  }
`;

// Below the split layout
const Description = styled.section`
  grid-column: 1/-1;
  margin-top: 3rem;

  p {
    line-height: 1.65;
    margin: 0 0 1.25rem 0;
    color: #d0d7de;
  }
`;

// CTA bar
const CTA = styled.a`
  display: inline-block;
  margin-top: 1rem;
  background: #238636;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  text-decoration: none;
  &:hover {
    filter: brightness(1.1);
  }
`;

// Next / Prev breadcrumb
const NavBar = styled.nav`
  grid-column: 1/-1;
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
  a {
    color: #58a6ff;
    text-decoration: none;
    font-size: 0.95rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ------------------------- Component ------------------------- */
export default function CaseStudyPage({
  title,
  hero,
  gallery = [],
  stats = [],
  description = "",
  ctaLabel,
  ctaHref,
  next,
  prev,
}) {
  const [active, setActive] = useState(0);
  const isVideo = hero?.match(/\.mp4|\.webm|\.mov|\.gif$/i) && !gallery[active];

  return (
    <Wrapper>
      {/* ── Stats rail ───────────────────────── */}
      <StatsRail>
        <h1 style={{ margin: 0, fontSize: "1.75rem" }}>{title}</h1>
        {stats.map(({ label, value }) => (
          <React.Fragment key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </React.Fragment>
        ))}
      </StatsRail>

      {/* ── Media rail ──────────────────────── */}
      <MediaRail>
        {isVideo ? (
          <Hero src={hero} autoPlay muted loop playsInline />
        ) : (
          <HeroImg src={gallery[active] || hero} alt="preview" />
        )}
        {gallery.length > 0 && (
          <Gallery>
            {gallery.map((src, i) => (
              <Thumb
                key={src}
                src={src}
                onClick={() => setActive(i)}
                $active={i === active}
              />
            ))}
          </Gallery>
        )}
      </MediaRail>

      {/* ── Description & CTA ──────────────── */}
      <Description>
        {description.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        {ctaHref && (
          <CTA href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </CTA>
        )}
      </Description>

      {/* ── Next / Prev nav ─────────────────── */}
      {(next || prev) && (
        <NavBar>
          {prev ? <LinkStyled to={prev.path}>← {prev.title}</LinkStyled> : <span />}
          {next ? <LinkStyled to={next.path}>{next.title} →</LinkStyled> : <span />}
        </NavBar>
      )}
    </Wrapper>
  );
}

/* Local helper to avoid pulling react‑router here */
const LinkStyled = styled.a``; // Replace with react-router <Link> if desired

/* ------------------------- Example data  ----------------------- */
// Export in case you want to import in App.jsx
export const fullStack = {
  title: "Full‑Stack Portal",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  gallery: [
    "/images/fs-snap1.jpg",
    "/images/fs-snap2.jpg",
    "/images/fs-snap3.jpg",
  ],
  stats: [
    { label: "In production", value: "May 2023" },
    { label: "Users served", value: "12K monthly" },
    { label: "Tech stack", value: "Next.js • FastAPI • Postgres" },
    { label: "Latency", value: "99 ms avg" },
    { label: "Problem solved", value: "Self‑service data catalog" },
  ],
  description: `A responsive web portal that lets analysts discover, preview and request data assets in seconds. Built with a service‑oriented architecture so each domain team owns its own micro‑backend.  \nKey features include SSO, role‑based access, and realtime lineage graphs.  \nDeployed on AWS Fargate with GitHub Actions.`,
  ctaLabel: "View repo",
  ctaHref: "https://github.com/example/fullstack",
};

export const computerVision = {
  title: "Edge Computer Vision",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  gallery: [
    "/images/cv-board.jpg",
    "/images/cv-detect.jpg",
  ],
  stats: [
    { label: "Launch", value: "Feb 2024" },
    { label: "Frames / sec", value: "60 FPS realtime" },
    { label: "Models", value: "YOLOv8 • MiDaS" },
    { label: "Devices", value: "Jetson Xavier NX" },
    { label: "Core value", value: "Safety alerts under 0.4 s" },
  ],
  description: `Deploys a custom YOLO model to low‑power edge boxes that run on site, removing cloud latency entirely.  \nIncludes an OTA update channel so new checkpoints reach production in <2 minutes.`,
  ctaLabel: "Watch live demo",
  ctaHref: "https://example.com/live-demo",
};

export const vrTraining = {
  title: "Immersive VR Training",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  gallery: [
    "/images/vr-shot1.png",
    "/images/vr-shot2.png",
    "/images/vr-shot3.png",
  ],
  stats: [
    { label: "Pilot cohort", value: "30 forklift operators" },
    { label: "Retention lift", value: "+19 pts" },
    { label: "Engine", value: "Unity HDRP" },
    { label: "Headsets", value: "Quest 2 / Quest Pro" },
    { label: "Launch", value: "Q1 2025" },
  ],
  description: `A scenario‑based VR module that teaches hazard awareness. The simulation runs full physics so trainees can test multiple mitigation strategies without real‑world risk.  \nAnalytics are streamed to a dashboard for instructor oversight.`,
  ctaLabel: "Book a walkthrough",
  ctaHref: "mailto:contact@usfteam.com",
};
