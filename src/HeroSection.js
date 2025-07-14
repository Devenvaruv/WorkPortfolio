import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import styled, { css, createGlobalStyle } from "styled-components";
import { fullStack, computerVision, vrTraining } from "./CaseStudyProject";
import CaseStudyPage from "./CaseStudyPage";

const GlobalStyle = createGlobalStyle`
  html{scroll-behavior:smooth;}
  body{margin:0;font-family:Inter,sans-serif;background:#0d1117;color:#f0f3f6;}
  *,*:before,*:after{box-sizing:border-box;}
`;

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 0);
      }
    }
  }, [location.pathname, location.hash]);

  return null;
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projOpen, setProjOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();

  const projects = [
    ...fullStack.map((proj, idx) => ({
      label: proj.title,
      path: `/full-stack#p${idx}-${proj.sections[0].id}`,
    })),
    { label: computerVision.title, path: "/computer-vision" },
    { label: vrTraining.title, path: "/vr" },
  ];

  useEffect(() => {
    const close = (e) =>
      dropRef.current &&
      !dropRef.current.contains(e.target) &&
      setProjOpen(false);
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProjOpen(false);
  }, [location]);

  return (
    <NavBar ref={dropRef}>
      <Brand to="/">USF Team</Brand>

      <NavLinks $open={menuOpen}>
        <ProjectsWrap>
          <ProjectsBtn $open={projOpen} onClick={() => setProjOpen(!projOpen)}>
            Projects
            <Caret viewBox="0 0 10 6">
              <path
                d="M1 1l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Caret>
          </ProjectsBtn>

          <Menu $open={projOpen}>
            {projects.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} onClick={() => setProjOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </Menu>
        </ProjectsWrap>

        <Anchor to="/#about">About</Anchor>
        <Anchor to="/#contact">Contact</Anchor>
      </NavLinks>

      <Hamburger onClick={() => setMenuOpen(!menuOpen)}>☰</Hamburger>
    </NavBar>
  );
};

const TILES = [
  {
    title: "Full‑Stack",
    subtitle: "End‑to‑end builds",
    poster: "/images/poster-fullstack.jpg",
    video: "/videos/full-stack.mp4",
    path: "/full-stack",
  },
  {
    title: "AI",
    subtitle: "Real‑time ML",
    poster: "/images/poster-cv.jpg",
    video: "/videos/AI-stack.mp4",
    path: "/computer-vision",
  },
  {
    title: "VR",
    subtitle: "Immersive learning",
    poster: "/images/poster-vr.jpg",
    video: "/videos/vr-stack.mp4",
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
        data-src={video}
        muted
        loop
        playsInline
        preload="metadata"
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

const Landing = () => (
  <>
    <HeroSection />
    <Section id="about">
      <h2>About Us</h2>
      <p>
        We are a team of research‑driven graduate technologists at the
        University of San Francisco, focused on building impactful digital
        solutions — from real-time AI systems to immersive VR training tools.
      </p>
      <p>
        Our work spans full-stack applications, machine learning pipelines, and
        simulation-based learning experiences, all tailored to solve real-world
        problems with scalable technology.
      </p>
    </Section>

    <Section id="contact" $alt>
      <h2>Contact</h2>
      <p>
        📧 <a href="mailto:dvvaru@dons.usfca.edu">dvvaru@dons.usfca.edu</a>
        <br />
        🌍 San Francisco, California
        <br />
        🔗{" "}
        <a href="https://www.linkedin.com/in/deven-varu-027318155/">
          LinkedIn
        </a>{" "}
        | <a href="https://github.com/devenvaruv">GitHub</a>
      </p>
    </Section>
  </>
);

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <ScrollToHash />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/full-stack"
          element={<CaseStudyPage projects={fullStack} />}
        />
        <Route
          path="/computer-vision"
          element={<CaseStudyPage projects={[computerVision]} />}
        />
        <Route path="/vr" element={<CaseStudyPage projects={[vrTraining]} />} />
      </Routes>
    </Router>
  );
}

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

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  left: 1.5rem;
`;
const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: inherit;
  cursor: pointer;
  position: absolute;
  right: 1.5rem;
  @media (max-width: 768px) {
    display: block;
  }
`;
const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
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

const ProjectsWrap = styled.div`
  position: relative;
  display: inline-block;
`;
const ProjectsBtn = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.95rem;
  color: inherit;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.85;
  }
  svg {
    width: 0.6rem;
    height: 0.6rem;
    transition: transform 0.2s;
    ${({ $open }) => $open && "transform: rotate(180deg);"}
  }
`;
const Caret = styled.svg`
  pointer-events: none;
`;
const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.4rem 0;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 12rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "-8px")});
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.18s, transform 0.18s;
  a {
    display: block;
    padding: 0.55rem 1rem;
    font-size: 0.9rem;
    color: #c9d1d9;
    text-decoration: none;
  }
  a:hover {
    color: #fff;
  }
`;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  padding: 2rem max(5rem, 5vw);
  margin: 0 auto;
  width: 100%;
`;

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 0.9fr;
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
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  h3 {
    margin: 0;
    font-size: 1.5rem;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
  span {
    font-size: 0.9rem;
    color: #e2e8f1ff;
    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  }
`;

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
  padding: 6rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #30363d;
    padding-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: #c9d1d9;
  }

  a {
    color: #58a6ff;
    text-decoration: underline;
  }
`;
