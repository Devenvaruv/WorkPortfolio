import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

export const fullStack = [
  {
    title: "Here2Stay Interest Form",
    hero: "videos/full-stack-preview.mp4",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: "Launched in July 2023, Here2Stay Interest Form is a responsive web portal developed by a University of San Francisco (USF) team for the East Bay Permanent Real Estate Cooperative (EBPREC):contentReference[oaicite:0]{index=0}. It aims to prevent residential and small business displacement in Deep East Oakland by streamlining outreach and access to resources:contentReference[oaicite:1]{index=1}. The portal digitized a previously manual intake process, offering both a comprehensive multi-page form and a lightweight quick form for events to capture community interest:contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}. Available in English and Spanish, it also features an AI-powered chatbot (using a Pinecone vector database with a RAG approach) that offers accurate, context-based support to users at any time:contentReference[oaicite:4]{index=4}. All submissions automatically populate 18 structured Google Sheets (9 read-only, 9 editable) categorized by referral source, eliminating manual data entry and helping the EBPREC team efficiently organize and follow up on community needs:contentReference[oaicite:5]{index=5}.",
      },
      {
        id: "features",
        heading: "Features",
        body: "For users, the portal provides a guided multi-page form for a smooth experience and a lightweight form for quick submissions at community events:contentReference[oaicite:6]{index=6}. Users can toggle the interface to Spanish for broader accessibility:contentReference[oaicite:7]{index=7}, and each submission triggers an immediate resource packet emailed to them based on their selected interests:contentReference[oaicite:8]{index=8}. The platform also includes a community events calendar to highlight upcoming workshops:contentReference[oaicite:9]{index=9}, as well as a generative AI chatbot that offers on-demand help by retrieving relevant answers from a curated database of local resources:contentReference[oaicite:10]{index=10}. On the backend, all entries flow into Google Sheets automatically (18 total sheets segmented by referral source) for organized, no-touch data management:contentReference[oaicite:11]{index=11}. The EBPREC team can easily update the chatbot’s knowledge base and has full access to the system’s code and configuration, ensuring transparency and allowing independent improvements over time:contentReference[oaicite:12]{index=12}.",
      },
      {
        id: "Technical Highlights",
        heading: "Technical Highlights",
        body: "The platform is built on Next.js with Tailwind CSS and leverages Google Sheets (via the Sheets API) for data storage and management:contentReference[oaicite:13]{index=13}. Form submissions are automatically routed into 18 specific Google Sheets (9 read-only, 9 editable) based on the user's referral source, eliminating manual data handling:contentReference[oaicite:14]{index=14}. An AI-powered chatbot is integrated using Pinecone (a vector database) and OpenAI’s GPT models. It employs a retrieval-augmented generation (RAG) workflow: user queries are rephrased by the AI, relevant resource content is fetched from the vector index, and context-specific answers are generated with contact details and links:contentReference[oaicite:15]{index=15}. The chatbot supports bilingual interaction (English and Spanish) and can be easily updated with new information (for example, staff can upload a PDF to refresh its knowledge base):contentReference[oaicite:16]{index=16}. Other technical features include an email notification system (via Nodemailer) for instant follow-ups and a sub-1-second average response time for chatbot answers, ensuring a smooth user experience:contentReference[oaicite:17]{index=17}.",
      },
      {
        id: "Community Impact",
        heading: "Community Impact",
        body: "This project makes it easier for East Oakland residents to access the help and resources they need to avoid displacement:contentReference[oaicite:18]{index=18}. By offering a simple form and an always-available chatbot, residents can quickly find information on housing assistance, financial aid, tenant rights, and more in one centralized place, saving time, reducing confusion, and breaking down barriers to assistance:contentReference[oaicite:19]{index=19}. For example, someone searching for affordable housing can use the chatbot to get a concise list of vetted resources and contacts, instead of spending hours navigating various websites or offices:contentReference[oaicite:20]{index=20}. The bilingual support and integration with local community events ensure that language or technological barriers do not prevent people from getting the help they need:contentReference[oaicite:21]{index=21}. Ultimately, the Here2Stay platform enables EBPREC and its partners to focus on directly assisting residents, while building a more connected community that is empowered to stay and thrive in Deep East Oakland:contentReference[oaicite:22]{index=22}.",
      },
      {
        id: "Results",
        heading: "Results",
        body: "Since launch, the Here2Stay portal has been serving roughly 100 users per month, transforming a formerly manual intake into a fast, efficient digital system. The redesigned multi-page form and the new lightweight version have improved completion rates—especially on mobile devices and at community events:contentReference[oaicite:23]{index=23}:contentReference[oaicite:24]{index=24}. By automating data entry and immediate follow-ups, the platform frees up staff time for direct outreach, and its Spanish-language support has significantly broadened EBPREC's engagement with non-English-speaking residents:contentReference[oaicite:25]{index=25}. The AI chatbot also provides nearly instant answers (under 1 second), giving people critical information when they need it. Overall, this project has streamlined EBPREC's outreach efforts, increased community participation, and helped deliver vital resources more effectively to those at risk of displacement.",
      },
    ],
    stats: [
      { label: "Launch", value: "June 2023" },
      { label: "Monthly users", value: "~100" },
      {
        label: "Stack",
        value:
          "Next.js • Tailwind CSS • Google Sheets API • Pinecone • OpenAI • Nodemailer",
      },
      { label: "Chatbot Latency", value: "<1 second" },
      { label: "Languages Supported", value: "English & Spanish" },
    ],
    ctaLabel: "View Website",
    ctaHref: "https://interest-form.vercel.app/",
  },
  {
    title: "Oakland Data Explorer",
    hero: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
    sections: [
      {
        id: "overview",
        heading: "Overview",
        body: "Interactive web dashboard that visualises nine years (2016-2024) of satellite imagery and environmental metrics for Oakland, CA. Users can explore temporal changes, toggle vegetation masks, and analyse correlations between green-space density, traffic, and air-quality data.",
      },
      {
        id: "functionality",
        heading: "Key Functionality",
        body: "• Animated landing navigation (Demo / Map / Charts / About Us)\n• Year-slider to compare imagery across time\n• Mask-toggle to switch between raw and vegetation-highlighted images\n• Location grid → detailed map view with contextual side-panel\n• Real-time theme switch (dark / light)\n• Accessible UI with keyboard navigation and ARIA labels",
      },
      {
      id: "architecture",
      heading: "Architecture",
      body: "Micro-frontend style split into three folders:\n1. **frontend-service** – layout, routing, theme state\n2. **visualization-service** – map components, 3-D menu, charts\n3. **data-service** – fetch / transform satellite imagery & metrics\nBuilt with Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui and hosted assets on Google Cloud Storage."
    },
    {
      id: "data",
      heading: "Data & Analysis",
      body: "• Satellite imagery for Downtown & West Oakland + extra grid cells\n• Vegetation coverage calculated per-tile (green density 6.19 – 18.39 %)\n• Air-quality (PM2.5) vs traffic pattern correlations\n• Population density overlays for urban-planning insight"
    },
    {
      "id": "results",
      "heading": "Results",
      "body": "• **Awarded $400** at USF Innovation Summit 2025 for the Geo-Spatial Analysis Bot poster.\n• Adopted by the **City of Oakland** planning team as a prototype for rapid environmental insight.\n• Demonstrates:\n  – Green-space growth/decline visualisation\n  – Traffic-vs-vegetation and air-quality trend analysis\n  – Population-shift tracking over a nine-year span.\n• Sparked community feedback and feature requests for a Version 2 during the summit."
    }
    ],
    stats: [
      { label: "Launch", value: "May 2025" },
      { label: "Data span", value: "2012 - 2025" },
      { label: "Locations", value: "Oakland" },
      { label: "Green density", value: "6.19 - 18.39 %" },
      { label: "Stack",value: "Next.js 14 • TypeScript • Tailwind" },

    ],
    ctaLabel: "View repo",
    ctaHref: "https://github.com/devenvaruv",
  },
];

export const computerVision = {
  title: "Automated Road Mapping",
  hero: "videos/AI-preview.mp4",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      body: "This project automated the mapping of road infrastructure for Boone County by using computer vision to replace manual image labeling. Multiple custom YOLO models were trained to detect road features like lane lines, shoulders, barriers, street lights, and more across roughly ten asset classes.",
    },
    {
      id: "solution",
      heading: "Solution",
      body: "Using labeled road imagery and the Roboflow platform, we trained three specialized YOLO-based models for different feature types. We applied extensive data augmentation and iterative fine-tuning to boost accuracy, addressing issues like class confusion with techniques such as anchor tuning and label smoothing. The detection pipeline outputs both segmentation masks and bounding boxes, which are automatically converted into JSON/CSV formats for easy integration. A React web application was also developed to visualize the model’s detections on stitched 360° road imagery for quality assurance.",
    },
    {
      id: "results",
      heading: "Results",
      body: "The AI pipeline improved mean average precision by over 20%, achieving above 0.80 mAP on key classes (e.g. lane markings, road shoulders, and barriers). This significantly reduced the need for manual labeling, speeding up the mapping process while maintaining high accuracy. The system reliably detects infrastructure in varied conditions—from poor lighting to occluded or rural scenes—ensuring a robust solution for the client.",
    },
  ],
  stats: [
    { label: "Launch", value: "Feb 2024" },
    { label: "Assets Detected", value: "14 classes" },
    { label: "Accuracy (mAP)", value: "91%" },
    { label: "Models", value: "3 custom YOLO models" },
    { label: "Stack", value: "Python • React • Roboflow" },
  ],
};

export const vrTraining = {
  title: "Immersive VR Training",
  hero: "videos/vr-preview.mp4",
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

const Wrapper = styled.main`
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 26rem;
  gap: 3rem;
`;

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

  section {
    scroll-margin-top: 6rem; // <-- This is the fix
  }

  h1 {
    font-size: 2.75rem;
    font-weight: 600;
    margin: 0 0 1.5rem 0;
    line-height: 1.2;
    color: #f0f3f6;
  }

  p {
    line-height: 1.65;
    color: #c9d1d9;
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
  background: #1f6feb;
  color: #fff;
  padding: 0.8rem 1.4rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    filter: brightness(1.1);
    background: #388bfd;
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

const HeroWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  cursor: pointer;

  &:hover button {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease, background 0.2s ease;

  img {
    width: 1.8rem;
    height: 1.8rem;
    filter: invert(1);
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FullscreenOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullscreenVideo = styled.video`
  width: 90%;
  height: auto;
  max-height: 90vh;
  background: #000;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10000;
  padding: 0.25em 0.6em;
  border-radius: 0.4em;
  transition: background 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

/* ------------------------- Component --------------------------- */
export default function CaseStudyProject({
  title,
  sections,
  hero,
  stats,
  navItems,
  ctaLabel,
  ctaHref,
  next,
  prev,
  idPrefix = "",
  showNav = true,
}) {
  const prefix = (id) => `${idPrefix}${id}`;
  const isVideo = hero?.match(/\.mp4|\.webm|\.mov|\.gif$/i);

  const navRailRef = useRef(null);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [fullscreenIdx, setFullscreenIdx] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const firstSectionId = sections[0]?.id || "top";

  //   const openFullscreen = () => setFullscreen(true);
  //   const closeFullscreen = () => {
  //     setFullscreen(false);
  //     if (videoRef) {
  //       videoRef.pause();
  //       videoRef.currentTime = 0;
  //     }
  //   };

  const items =
    navItems || sections.map(({ id, heading }) => ({ id, heading }));

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(prefix(s.id)))
      .filter(Boolean);

    const navLinks = navRailRef.current
      ? [...navRailRef.current.querySelectorAll("[data-navlink]")]
      : [];

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

    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [sections, idPrefix]);

  return (
    <Wrapper id={idPrefix.slice(0, -1) /* e.g. p0 */}>
      {/* ── Left nav ───────────────────────── */}
      {showNav && (
        <NavRail ref={navRailRef}>
          {(navItems || sections).map(({ id, heading }) => (
            <a key={id} href={`#${prefix(id)}`} data-navlink>
              {heading}
            </a>
          ))}
        </NavRail>
      )}

      {/* ── Centre content ─────────────────── */}
      <Content>
        <section id={prefix(sections[0].id)}>
          <h1>{title}</h1>
          {sections[0].body.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {sections.slice(1).map(({ id, heading, body }) => (
          <section key={id} id={prefix(id)}>
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

      {/* ── Right rail ─────────────────────── */}
      <MediaRail>
        {isVideo ? (
          <HeroWrapper onClick={() => setFullscreenIdx(true)}>
            <Hero
              src={hero}
              muted
              playsInline
              preload="metadata"
              style={{ filter: posterLoaded ? "none" : "grayscale(1)" }}
              onCanPlayThrough={() => setPosterLoaded(true)}
            />
            <PlayButton>
              <img src="/images/play.svg" alt="Play" />
            </PlayButton>
          </HeroWrapper>
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

      {/* ── Video overlay ───────────────────── */}
      {fullscreenIdx && (
        <FullscreenOverlay onClick={() => setFullscreenIdx(false)}>
          <FullscreenVideo
            ref={(r) => setVideoRef(r)}
            src={hero}
            autoPlay
            controls
            onEnded={() => setFullscreenIdx(false)}
          />
          <CloseBtn onClick={() => setFullscreenIdx(false)}>✕</CloseBtn>
        </FullscreenOverlay>
      )}

      {/* ── Breadcrumb (optional) ───────────── */}
      {(next || prev) && (
        <NavBar>
          {prev ? <a href={prev.path}>← {prev.title}</a> : <span />}
          {next ? <a href={next.path}>{next.title} →</a> : <span />}
        </NavBar>
      )}
    </Wrapper>
  );
}
