// --------------------------------------------------------------------
//  App.jsx — React (no Next.js) single‑page setup with React Router v6
// --------------------------------------------------------------------
// 1. `npm i react-router-dom styled-components`
// 2. Put this as src/App.jsx (or split into separate files as preferred).
// 3. In index.js: `import App from "./App";` + `<BrowserRouter><App/></BrowserRouter>`
//
// This version adds a fake 3‑monitor 3‑D effect:
//   • CSS perspective on the grid
//   • Side tiles rotated on the Y‑axis (+ brightness drop)
//   • Centre tile pushed out with translateZ for curvature illusion
//   • Tiles flatten, zoom and rise on hover
//   • On small screens (< 900 px) it disables all 3‑D transforms
// --------------------------------------------------------------------
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled, { css, createGlobalStyle } from "styled-components";
import CaseStudyPage, {
  fullStack,
  computerVision,
  vrTraining,
} from "./CaseStudyPage";
/******************** Global Styles ***********************************/
const GlobalStyle = createGlobalStyle`
  html{scroll-behavior:smooth;}
  body{margin:0;font-family:Inter,sans-serif;background:#0d1117;color:#f0f3f6;}
  *,*:before,*:after{box-sizing:border-box;}
`;

/******************** Shared Header ***********************************/
const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <NavBar>
      <Brand to="/">USF Team</Brand>
      <div>
        <NavLinks $open={open} onClick={() => setOpen(false)}>
          {/* <Anchor to="/#projects">Projects</Anchor> */}
          <Anchor to="/#about">About</Anchor>
          <Anchor to="/#contact">Contact</Anchor>
          <a href="mailto:contact@usfteam.com">Hire Us</a>
        </NavLinks>
      </div>
      <Hamburger onClick={() => setOpen(!open)}>☰</Hamburger>
    </NavBar>
  );
};

/******************** Hero + Tiles ************************************/
const TILES = [
  {
    title: "Full‑Stack",
    subtitle: "End‑to‑end builds",
    poster: "/images/poster-fullstack.jpg",
    video: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
    path: "/full-stack",
  },
  {
    title: "Computer Vision",
    subtitle: "Real‑time ML",
    poster: "/images/poster-cv.jpg",
    video: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
    path: "/computer-vision",
  },
  {
    title: "VR",
    subtitle: "Immersive learning",
    poster: "/images/poster-vr.jpg",
    video: "https://storage.googleapis.com/videobucker/newplaceholder.mp4",
    path: "/vr",
  },
];

const HeroSection = () => {
  const [paused, setPaused] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useLazyVideoLoad(prefersReduced);

  return (
    <HeroWrapper id="home">
      <BGLayer $paused={paused || prefersReduced} />
      <HeroInner>
        <TileGrid>
          {TILES.map((t) => (
            <HeroTile
              key={t.title}
              data={t}
              paused={paused || prefersReduced}
            />
          ))}
        </TileGrid>
      </HeroInner>
    </HeroWrapper>
  );
};

const HeroTile = ({ data, paused }) => {
  const { title, subtitle, poster, video, path } = data;
  const ref = useRef(null);
  const play = () => {
    if (paused) return;
    const v = ref.current;
    if (v && v.readyState >= 3) v.play();
  };

  return (
    <TileLink
      to={path}
      onMouseEnter={play}
      onMouseLeave={() => ref.current.pause()}
    >
      <video
        ref={ref}
        poster={poster}
        data-src={paused ? undefined : video}
        muted
        loop
        playsInline
        preload="none"
      />
      <Overlay>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </Overlay>
    </TileLink>
  );
};

/******************** Placeholder Sub‑pages ***************************/
const PageShell = ({ title, children }) => (
  <Section>
    <h1>{title}</h1>
    {children || <p>Coming soon…</p>}
  </Section>
);
const FullStack = () => <PageShell title="Full‑Stack Development" />;
const ComputerVision = () => <PageShell title="Computer Vision" />;
const VR = () => <PageShell title="Virtual Reality" />;

/******************** Landing page with sections **********************/
const Landing = () => (
  <>
    <HeroSection />
    <Section id="about">
      <h2>About Us</h2>
      <p>
        We’re a research-driven crew of graduate technologists who turn ideas
        into production-grade software, real-time vision pipelines and immersive
        VR learning tools. From proof-of-concept to deployment, we cover the
        full stack so you can focus on impact.
      </p>
    </Section>
    <Section id="contact">
      <h2>Contact</h2>
      <p>
        📧 <a href="mailto:contact@usfteam.com">contact@usfteam.com</a>
        <br />
        📍 Based in San Francisco — serving teams worldwide
      </p>
    </Section>
  </>
);

/******************** Main App & Router *******************************/
export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/full-stack" element={<CaseStudyPage {...fullStack} />} />
        <Route
          path="/computer-vision"
          element={<CaseStudyPage {...computerVision} />}
        />
        <Route path="/vr" element={<CaseStudyPage {...vrTraining} />} />
      </Routes>
    </Router>
  );
}

/******************** Hooks *******************************************/
const usePrefersReducedMotion = () => {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPref(mq.matches);
    const fn = () => setPref(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return pref;
};

const useLazyVideoLoad = (disabled) => {
  useEffect(() => {
    if (disabled) return;
    const vids = document.querySelectorAll("video[data-src]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const v = e.target;
            if (v.dataset.src) {
              v.src = v.dataset.src;
              v.load();
              v.removeAttribute("data-src");
            }
          }
        });
      },
      { rootMargin: "0px 0px 200px" }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [disabled]);
};

/******************** Styled Components *******************************/
const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;

  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const Brand = styled(Link)`
  font-weight: 700;
  font-size: 1.25rem;
  color: inherit;
  text-decoration: none;
`;
const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: inherit;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;
const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  a {
    color: inherit;
    text-decoration: none;
    position: relative;
    font-size: 0.95rem;
  }
  a:hover {
    opacity: 0.85;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    right: 0;
    background: rgba(13, 17, 23, 0.95);
    flex-direction: column;
    padding: 1rem 2rem;
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(120%)")};
    transition: 0.3s;
  }
`;
const Anchor = styled(Link)``;

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  background: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const BGLayer = styled.div`
  position: absolute;
  inset: 0;
  background: url("/images/particle-bg.svg") center / cover repeat;
  opacity: 0.15;
  animation: drift 60s linear infinite;
  pointer-events: none;
  ${({ $paused }) =>
    $paused &&
    css`
      animation-play-state: paused;
    `};
  @keyframes drift {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const HeroInner = styled.div`
  flex: 1; /* takes all vertical space under header */
  display: flex;
  flex-direction: column;
  justify-content: center; /* centers content vertically */
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

/***** 3‑D GRID *********************************************************/
const TileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 1.5rem;
  flex: 1;
  align-items: stretch;
  perspective: 1200px; /* 3‑D camera distance */

  /* Turn off fancy stuff on narrow screens */
  @media (max-width: 900px) {
    perspective: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  span {
    font-size: 0.9rem;
    color: #d1d9e6;
  }
`;

/***** SINGLE TILE *****************************************************/
const TileLink = styled(Link)`
  position: relative;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  height: 100%;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.45s;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  video,
  ${Overlay} {
    border-radius: inherit;
  }

  /* ───────── Left & right “monitors” ───────── */
  &:nth-child(1) {
    transform-origin: right center;
    transform: rotateY(22deg);
    filter: brightness(0.9);
  }
  &:nth-child(3) {
    transform-origin: left center;
    transform: rotateY(-22deg);
    filter: brightness(0.9);
  }
  /* Centre tile pops forward slightly to continue the curve */
  &:nth-child(2) {
    transform: translateZ(30px) translateY(12px);
  }

  /* Hover: flatten & zoom for focus */
  &:hover {
    transform: translateZ(40px) rotateY(0deg) scale(1.05);
    filter: brightness(1);
    z-index: 2; /* rise above the neighbours */
  }

  /* Disable transforms on mobile for legibility */
  @media (max-width: 900px) {
    transform: none !important;
    filter: none !important;
  }
`;

const Section = styled.section`
  padding: 6rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
  background: ${({ $alt }) => ($alt ? "#161b22" : "#0d1117")};
`;
