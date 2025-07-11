// --------------------------------------------------------------------
//  CaseStudyPage.jsx — sticky‑rail variant (Layout B)
// --------------------------------------------------------------------
//  Desktop‑first implementation of the layout we finalised:
//     • Left   — vertical nav rail (sticky)
//     • Centre — scrolling sections (H1 + body copy)
//     • Right  — hero media (video / image) then sticky stats card underneath
//
//  Integration:
//    import CaseStudyPage, { fullStack, computerVision, vrTraining } from "./CaseStudyPage";
//    <Route path="/full-stack" element={<CaseStudyPage {...fullStack} />} />
//    …etc.
//
//  Props
//    title          — page H1
//    sections       — [{ id, heading, body }] (minimum one)
//    hero           — mp4 / webm / gif / jpg / png (string)
//    stats          — array of { label, value }
//    navItems       — optional override for left rail (defaults to sections)
//    ctaLabel/ctaHref  (optional bottom CTA)
//    next / prev    — optional breadcrumb nav
// --------------------------------------------------------------------
import React, { useState } from "react";
import styled from "styled-components";

/* ------------------------- Layout Grid ------------------------- */
const Wrapper = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 6rem 4vw 4rem;
  display: grid;
  grid-template-columns: 9vw minmax(0, 1fr) 26rem;
  gap: 3rem;
`;

/* ------------------------- Left Nav Rail ----------------------- */
const NavRail = styled.nav`
  position: sticky;
  top: 6rem;
  align-self: start;
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;

  a {
    color: #8b949e;
    text-decoration: none;
    padding: 0.4rem 0;
  }
  a.is-active {
    color: #58a6ff;
    font-weight: 600;
  }
`;

/* ------------------------- Centre Column ----------------------- */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;

  h1 {
    font-size: 2.75rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    line-height: 1.2;
    color: #f0f3f6;
  }

  p {
    line-height: 1.65;
    color: #d0d7de;
    margin: 0 0 1.25rem 0;
    font-size: 1.05rem;
  }
`;

/* ------------------------- Right Column ------------------------ */
const MediaRail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

/* --- Sticky stats card --- */
const StatsCard = styled.dl`
  position: sticky;
  top: 6rem;
  align-self: start;
  background: rgba(22, 27, 34, 0.85);
  backdrop-filter: blur(6px);
  border-radius: 0.75rem;
  padding: 1.5rem 1.25rem;
  color: #f0f3f6;
  width: 100%;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);

  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 0.75rem;
  column-gap: 0.75rem;

  dt {
    font-size: 0.9rem;
    color: #8b949e;
  }
  dd {
    margin: 0;
    font-size: 1.05rem;
  }
`;

/* ------------------------- CTA & Breadcrumb -------------------- */
const CTA = styled.a`
  display: inline-block;
  margin-top: 2rem;
  background: #238636;
  color: #fff;
  padding: 0.8rem 1.4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    filter: brightness(1.1);
  }
`;

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

/* ------------------------- Component --------------------------- */
export default function CaseStudyPage({
  title,
  sections = [{ id: "overview", heading: "Overview", body: "Add content" }],
  hero,
  stats = [],
  navItems,
  ctaLabel,
  ctaHref,
  next,
  prev,
}) {
  const [posterLoaded, setPosterLoaded] = useState(false);
  const firstSectionId = sections[0]?.id || "top";

  const items =
    navItems || sections.map(({ id, heading }) => ({ id, heading }));

  const isVideo = hero?.match(/\.mp4|\.webm|\.mov|\.gif$/i);

  /* --- simple scroll spy --- */
  React.useEffect(() => {
    const headings = sections.map((s) => document.getElementById(s.id));
    const navLinks = [...document.querySelectorAll("[data-navlink]")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = headings.indexOf(e.target);
          if (idx !== -1 && e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            navLinks[idx]?.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    headings.forEach((h) => h && io.observe(h));
    return () => io.disconnect();
  }, [sections]);

  return (
    <Wrapper>
      {/* ── Left nav ───────────────────────────────────────── */}
      <NavRail>
        {items.map(({ id, heading }) => (
          <a key={id} href={`#${id}`} data-navlink>
            {heading}
          </a>
        ))}
      </NavRail>

      {/* ── Centre scrolling content ──────────────────────── */}
      <Content>
        {/* Intro headline */}
        <section id={firstSectionId}>
          <h1>{title}</h1>
          {sections[0]?.body?.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Additional sections */}
        {sections.slice(1).map(({ id, heading, body }) => (
          <section key={id} id={id}>
            <h2 style={{ fontSize: "1.6rem", margin: "0 0 1rem 0" }}>
              {heading}
            </h2>
            {body.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}

        {ctaHref && (
          <CTA href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </CTA>
        )}
      </Content>

      {/* ── Right rail (hero + sticky stats) ──────────────── */}
      <MediaRail>
        {isVideo ? (
          <Hero
            src={hero}
            poster={hero + "#t=0.1"}
            muted
            playsInline
            onCanPlayThrough={() => setPosterLoaded(true)}
            style={{ filter: posterLoaded ? "none" : "grayscale(1)" }}
          />
        ) : (
          <HeroImg src={hero} alt="preview" />
        )}

        <StatsCard>
          {stats.map(({ label, value }) => (
            <React.Fragment key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </React.Fragment>
          ))}
        </StatsCard>
      </MediaRail>

      {/* breadcrumb */}
      {(next || prev) && (
        <NavBar>
          {prev ? <a href={prev.path}>← {prev.title}</a> : <span />}
          {next ? <a href={next.path}>{next.title} →</a> : <span />}
        </NavBar>
      )}
    </Wrapper>
  );
}

/* ------------------------- Sample Data ------------------------- */
export const fullStack = {
  title: "Full-Stack Portal",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: `A responsive web portal that lets analysts discover and request data assets.\nBuilt with a service-oriented architecture so each domain team owns its own micro‑backend.`,
    },
    {
      id: "results",
      heading: "Results",
      body: `Onboarded 12K monthly users in six months.\nReduced data request lead‑time from 3 days to 15 minutes.`,
    },
  ],
  stats: [
    { label: "Launch", value: "May 2023" },
    { label: "Monthly users", value: "12 k" },
    { label: "Stack", value: "Next.js • FastAPI" },
    { label: "Latency", value: "99 ms" },
    { label: "Core win", value: "+19 pt retention" },
  ],
  ctaLabel: "View repo",
  ctaHref: "https://github.com/example/fullstack",
};

export const computerVision = {
  title: "Edge Computer Vision",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: "Deploys a custom YOLO model to low‑power edge boxes.",
    },
    {
      id: "results",
      heading: "Results",
      body: "+0.4 s safety alerts, 60 FPS realtime.",
    },
  ],
  stats: [
    { label: "Launch", value: "Feb 2024" },
    { label: "FPS", value: "60" },
    { label: "Model", value: "YOLOv8" },
    { label: "Devices", value: "Jetson NX" },
    { label: "Core value", value: "Safety alerts" },
  ],
};

export const vrTraining = {
  title: "Immersive VR Training",
  hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: "Scenario-based VR module that teaches hazard awareness.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: "results",
      heading: "Results",
      body: "+19 pts It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).knowledge retention lift. lorem It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
  ],
  stats: [
    { label: "Cohort", value: "30 operators" },
    { label: "Engine", value: "Unity HDRP" },
    { label: "Headsets", value: "Quest 2" },
    { label: "Launch", value: "Q1 2025" },
    { label: "Retention", value: "+19 pts" },
  ],
  ctaLabel: "Book a walkthrough",
  ctaHref: "mailto:contact@usfteam.com",
};
