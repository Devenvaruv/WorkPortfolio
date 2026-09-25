import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { awards, experience, profile, projects, skillGroups } from "./portfolioData";
import { profilePageSchema, safeJsonLd } from "./seo";
import TimelinePage from "./TimelinePage";

const featuredTitles = ["InterviewWithAI", "Codex Session Visualizer", "CodeTown"];
const additionalOrder = [
  "A2A Multi-Agent Builder",
  "10-Agent AI Board Game Simulation",
  "Road Asset Detection with YOLO",
  "Catalog Intelligence Automation",
];
const THEME_STORAGE_KEY = "portfolio-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [theme, setTheme] = useStoredTheme();
  const pathName =
    typeof window === "undefined" ? "/" : window.location.pathname.replace(/\/+$/, "") || "/";
  const isLightTheme = theme === LIGHT_THEME;
  const featuredProjects = featuredTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter(Boolean);
  const additionalProjects = additionalOrder
    .map((title) => projects.find((project) => project.title === title))
    .filter(Boolean);
  const heroPreviewProject = featuredProjects[0]
    ? {
        ...featuredProjects[0],
        media: "/videos/interviewwithai-home.mp4",
        mediaWidth: 1512,
        mediaHeight: 824,
      }
    : null;

  if (pathName === "/timeline") {
    return (
      <>
        <GlobalStyle />
        <TimelinePage />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <JsonLd data={profilePageSchema()} />
      <SiteShell>
        <Header>
          <Brand href="#top">{profile.name}</Brand>
          <NavBar>
            <Nav aria-label="Primary navigation">
              <a href="/projects/">Projects</a>
              <a href="/timeline">Timeline</a>
              <a href="#experience">Experience</a>
              <a href="#skills">About / Skills</a>
              <a href="#contact">Contact</a>
            </Nav>
            <ThemeToggle
              type="button"
              aria-label={`Switch to ${isLightTheme ? "dark" : "white"} mode`}
              aria-pressed={isLightTheme}
              onClick={() => setTheme(isLightTheme ? DARK_THEME : LIGHT_THEME)}
            >
              <ToggleTrack $active={isLightTheme}>
                <span />
              </ToggleTrack>
              <ToggleText>{isLightTheme ? "White" : "Dark"}</ToggleText>
            </ThemeToggle>
          </NavBar>
        </Header>

        <main id="top">
          <Hero>
            <HeroCopy>
              <IntroLine>
                {profile.title} in the {profile.location}
              </IntroLine>
              <h1 aria-label={`${profile.name} - ${profile.title}`}>{profile.name}</h1>
              <Lead>
                I build AI products and developer tools across agents,
                voice, and computer vision.
              </Lead>
              <p>
                I am currently focused on InterviewWithAI and making AI
                coding-agent behavior visible through Codex Session Visualizer.
              </p>
              <HeroActions>
                <PrimaryLink href="#projects">Selected work</PrimaryLink>
                <TextLink href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </TextLink>
                <TextLink href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </TextLink>
              </HeroActions>
            </HeroCopy>

            <HeroMedia aria-label="Featured project preview">
              <MediaPreview
                project={heroPreviewProject}
                $hero
                prefersReducedMotion={prefersReducedMotion}
              />
            </HeroMedia>
          </Hero>

          <ProofNotes aria-label="Project proof points">
            <li>
              <strong>Real-time AI</strong>
              <span>Voice and coding experiences that respond to users as they work.</span>
            </li>
            <li>
              <strong>Agent systems</strong>
              <span>Multi-agent and A2A systems that coordinate tools, tasks, and specialized agents.</span>
            </li>
            <li>
              <strong>Developer tools</strong>
              <span>Interfaces that make AI-agent behavior and complex codebases easier to understand.</span>
            </li>
          </ProofNotes>

          <Section id="projects">
            <SectionHeading>
              <h2>Selected work</h2>
              <p>
                These are the two projects I am currently spending the most time on:
                product interfaces around AI behavior, and tools that make that
                behavior easier to inspect.
              </p>
            </SectionHeading>

            <FeaturedList>
              {featuredProjects.map((project, index) => (
                <FeaturedProject key={project.title} $reverse={index % 2 === 1}>
                  <MediaPreview
                    project={project}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                  <ProjectCopy>
                    <ProjectNumber>{String(index + 1).padStart(2, "0")}</ProjectNumber>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <DetailList>
                      {project.impact.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </DetailList>
                    <TechLine>{project.stack.slice(0, 5).join(" / ")}</TechLine>
                    <ProjectLinks>
                      <ProjectLink href={`/projects/${project.slug}/`}>
                        {caseStudyLinkLabel(project)}
                      </ProjectLink>
                      {project.url && (
                        <ProjectLink href={project.url} target="_blank" rel="noreferrer">
                          {projectLinkLabel(project)}
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectCopy>
                </FeaturedProject>
              ))}
            </FeaturedList>
          </Section>

          <Section $compact>
            <SectionHeading>
              <h2>Additional work</h2>
              <p>
                Research, internships, experiments, and civic tools. The larger
                entries here are the ones with the most concrete implementation work.
              </p>
            </SectionHeading>

            <AdditionalGrid>
              {additionalProjects.map((project) => (
                <AdditionalProject
                  key={project.title}
                  $strong={
                    project.title === "Road Asset Detection with YOLO" ||
                    project.title === "Catalog Intelligence Automation"
                  }
                >
                  {project.media && (
                    <InlineMedia
                      project={project}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  )}
                  <AdditionalText>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <ContextLine>{project.impact[0]}</ContextLine>
                    <TechLine>{project.stack.slice(0, 4).join(" / ")}</TechLine>
                    <ProjectLinks>
                      <ProjectLink href={`/projects/${project.slug}/`}>
                        {caseStudyLinkLabel(project)}
                      </ProjectLink>
                      {project.url && (
                        <ProjectLink href={project.url} target="_blank" rel="noreferrer">
                          {projectLinkLabel(project)}
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </AdditionalText>
                </AdditionalProject>
              ))}
            </AdditionalGrid>
          </Section>

          <Band id="experience">
            <SectionHeading>
              <h2>Experience</h2>
            </SectionHeading>
            <Timeline>
              {experience.map((item) => (
                <TimelineItem key={`${item.company}-${item.period}`}>
                  <TimelineDate>{item.period}</TimelineDate>
                  <TimelineBody>
                    <h3>{item.company}</h3>
                    <strong>{item.role}</strong>
                    <p>{item.detail}</p>
                  </TimelineBody>
                </TimelineItem>
              ))}
            </Timeline>
          </Band>

          <Section id="skills" $compact>
            <SectionHeading>
              <h2>About / Skills</h2>
              <p>{profile.summary}</p>
            </SectionHeading>
            <SkillsList>
              {skillGroups.map((group) => (
                <SkillRow key={group.name}>
                  <h3>{group.name}</h3>
                  <p>{group.items.join(", ")}</p>
                </SkillRow>
              ))}
            </SkillsList>
          </Section>

          <Band>
            <SectionHeading>
              <h2>Recognition</h2>
            </SectionHeading>
            <AwardList>
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </AwardList>
          </Band>

          <Contact id="contact">
            <div>
              <h2>Talk with me about engineering work.</h2>
              <p>
                Best fit: AI products, developer tooling, agent systems, voice
                workflows, and computer vision pipelines.
              </p>
            </div>
            <ContactActions aria-label="Contact links">
              <PrimaryLink href={`mailto:${profile.email}`}>{profile.email}</PrimaryLink>
              <TextLink href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </TextLink>
              <TextLink href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </TextLink>
            </ContactActions>
          </Contact>
        </main>
      </SiteShell>
    </>
  );
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);

    const onChange = () => setReduced(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function useStoredTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return DARK_THEME;

    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme === LIGHT_THEME ? LIGHT_THEME : DARK_THEME;
    } catch {
      return DARK_THEME;
    }
  });

  useEffect(() => {
    const nextTheme = theme === LIGHT_THEME ? LIGHT_THEME : DARK_THEME;
    const root = document.documentElement;

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", nextTheme === LIGHT_THEME ? "#ffffff" : "#11100e");

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme still applies for the current page if storage is unavailable.
    }
  }, [theme]);

  return [theme, setTheme];
}

function MediaPreview({ project, $hero, prefersReducedMotion }) {
  const videoRef = usePlaybackRate($hero ? 2 : 1);
  if (!project) return null;

  if (project.media) {
    if (isImageMedia(project.media)) {
      return (
        <MediaFrame
          $hero={$hero}
          $mediaWidth={project.mediaWidth}
          $mediaHeight={project.mediaHeight}
        >
          <img
            src={project.media}
            width={project.mediaWidth}
            height={project.mediaHeight}
            alt={`${project.title} project preview`}
          />
        </MediaFrame>
      );
    }

    return (
      <MediaFrame
        $hero={$hero}
        $mediaWidth={project.mediaWidth}
        $mediaHeight={project.mediaHeight}
      >
        <video
          ref={videoRef}
          src={project.media}
          poster={project.thumbnail}
          width={project.mediaWidth}
          height={project.mediaHeight}
          muted
          autoPlay={!prefersReducedMotion}
          loop={$hero || !prefersReducedMotion}
          playsInline
          preload="metadata"
          aria-label={`${project.title} project media preview`}
        />
      </MediaFrame>
    );
  }

  return (
    <MediaFrame $hero={$hero}>
      <ProjectPlaceholder $type={project.visual}>
        <PlaceholderName>{project.title}</PlaceholderName>
        <PlaceholderDetail>{placeholderLine(project)}</PlaceholderDetail>
      </ProjectPlaceholder>
    </MediaFrame>
  );
}

function usePlaybackRate(playbackRate) {
  const videoRef = React.useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return videoRef;
}

function InlineMedia({ project, prefersReducedMotion }) {
  if (isImageMedia(project.media)) {
    return (
      <InlineFrame
        $mediaWidth={project.mediaWidth}
        $mediaHeight={project.mediaHeight}
      >
        <img
          src={project.media}
          width={project.mediaWidth}
          height={project.mediaHeight}
          alt={`${project.title} project preview`}
        />
      </InlineFrame>
    );
  }

  return (
    <InlineFrame
      $mediaWidth={project.mediaWidth}
      $mediaHeight={project.mediaHeight}
    >
      <video
        src={project.media}
        poster={project.thumbnail}
        width={project.mediaWidth}
        height={project.mediaHeight}
        muted
        autoPlay={!prefersReducedMotion}
        loop={!prefersReducedMotion}
        playsInline
        preload="metadata"
        aria-label={`${project.title} project media preview`}
      />
    </InlineFrame>
  );
}

function isImageMedia(media) {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(media || "");
}

function placeholderLine(project) {
  return "Project screenshot coming soon";
}

function projectLinkLabel(project) {
  if (!project.url) return null;
  if (project.url.includes("github.com")) return "View repository";
  if (project.url.includes("youtube.com")) return "View demo";
  return "View project";
}

function caseStudyLinkLabel(project) {
  if (project.slug === "road-asset-detection") {
    return "Read the road asset detection case study";
  }
  return `View ${project.title} case study`;
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Lexend";
    src: url("/fonts/Lexend-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Lexend Giga";
    src: url("/fonts/LexendGiga-VariableFont_wght.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Share Tech Mono";
    src: url("/fonts/ShareTechMono-Regular.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  :root {
    color-scheme: dark;
    --bg: #11100e;
    --panel: #1a1815;
    --panel-soft: #24211d;
    --line: #343029;
    --line-soft: rgba(237, 230, 218, 0.14);
    --text: #f5efe4;
    --body: #e1d8ca;
    --muted: #c8beb0;
    --faint: #a79b8d;
    --accent: #d2b36b;
    --accent-soft: rgba(201, 169, 99, 0.14);
    --accent-contrast: #17130a;
    --accent-hover: #d7b974;
    --accent-visited: #e0c47e;
    --band-bg: rgba(25, 23, 20, 0.58);
    --header-bg: rgba(17, 16, 14, 0.88);
    --strong-muted: #d9cfbd;
    --shadow-soft: 0 20px 50px rgba(0, 0, 0, 0.2);
    --shadow-strong: 0 28px 80px rgba(0, 0, 0, 0.28);
    --font-display: "Lexend Giga", "Lexend", ui-sans-serif, system-ui, sans-serif;
    --font-body: "Lexend", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "Share Tech Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  }

  :root[data-theme="light"] {
    color-scheme: light;
    --bg: #ffffff;
    --panel: #f4f1eb;
    --panel-soft: #ebe6dc;
    --line: #d8d0c2;
    --line-soft: rgba(38, 35, 30, 0.15);
    --text: #17130f;
    --body: #39342c;
    --muted: #5d5548;
    --faint: #776d5e;
    --accent: #8a6418;
    --accent-soft: rgba(138, 100, 24, 0.08);
    --accent-contrast: #ffffff;
    --accent-hover: #735111;
    --accent-visited: #6b4c13;
    --band-bg: rgba(244, 241, 235, 0.72);
    --header-bg: rgba(255, 255, 255, 0.9);
    --strong-muted: #51493d;
    --shadow-soft: 0 20px 50px rgba(40, 34, 24, 0.12);
    --shadow-strong: 0 28px 80px rgba(40, 34, 24, 0.16);
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-width: 320px;
    overflow-x: hidden;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    letter-spacing: 0;
  }

  a {
    color: inherit;
  }

  a:visited {
    color: inherit;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const SiteShell = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 68% 7%, var(--accent-soft), transparent 18rem),
    var(--bg);
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1rem, 4vw, 4rem);
  border-bottom: 1px solid var(--line-soft);
  background: var(--header-bg);
  backdrop-filter: blur(12px);

  @media (max-width: 680px) {
    position: static;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Brand = styled.a`
  color: var(--text);
  font-size: 1rem;
  font-weight: 750;
  text-decoration: none;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1.45rem);
  flex-wrap: wrap;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.45rem);
  flex-wrap: wrap;

  a {
    color: var(--muted);
    font-size: 0.94rem;
    text-decoration-color: transparent;
    text-underline-offset: 0.3em;
    transition: color 160ms ease, text-decoration-color 160ms ease;
  }

  a:hover {
    color: var(--text);
    text-decoration-color: var(--accent);
  }
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.8rem, 5vw, 4.5rem);
  align-items: center;
  min-height: auto;
  padding: clamp(2.8rem, 6vw, 4.4rem) clamp(1rem, 4vw, 4rem) clamp(1rem, 3vw, 1.8rem);

  @media (min-width: 981px) {
    grid-template-columns: minmax(0, 0.98fr) minmax(18rem, 0.58fr);
    min-height: min(540px, calc(100vh - 16rem));
  }
`;

const HeroCopy = styled.div`
  min-width: 0;
  width: min(720px, calc(100vw - 2rem));
  max-width: 100%;

  h1 {
    margin: 0.65rem 0 1rem;
    color: var(--text);
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 5.2vw, 5.1rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0;
    white-space: nowrap;
  }

  p {
    max-width: 58ch;
    margin: 0.9rem 0 0;
    color: var(--body);
    font-size: clamp(1rem, 1.35vw, 1.12rem);
    line-height: 1.72;
    overflow-wrap: break-word;
  }

  @media (max-width: 520px) {
    p {
      max-width: 33ch;
    }
  }
`;

const IntroLine = styled.p`
  margin: 0 !important;
  color: var(--accent) !important;
  font-family: var(--font-mono);
  font-size: 1rem !important;
  line-height: 1.45 !important;
`;

const Lead = styled.p`
  max-width: 16ch !important;
  color: var(--text) !important;
  font-family: var(--font-body);
  font-size: clamp(1.55rem, 3vw, 2.65rem) !important;
  font-weight: 600;
  line-height: 1.12 !important;
`;

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.95rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-height: 2.7rem;
  padding: 0 1rem;
  border-radius: 8px;
  background: var(--accent);
  color: var(--accent-contrast);
  font-weight: 750;
  text-decoration: none;
  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  &:visited {
    color: var(--accent-contrast);
  }
`;

const TextLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 2.7rem;
  color: var(--text);
  font-weight: 700;
  text-decoration-color: var(--line);
  text-underline-offset: 0.35em;
  transition: color 160ms ease, text-decoration-color 160ms ease;

  &:hover {
    color: var(--accent);
    text-decoration-color: var(--accent);
  }

  &:visited {
    color: var(--text);
  }
`;

const HeroMedia = styled.aside`
  min-width: 0;
  width: 100%;
  max-width: min(572px, calc(100vw - 2rem));
  justify-self: end;
  align-self: stretch;
  display: flex;
  align-items: center;

  @media (max-width: 980px) {
    max-width: 748px;
  }
`;

const ProofNotes = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 2.5rem);
  margin: 0 clamp(1rem, 4vw, 4rem);
  padding: 1rem 0 clamp(1.2rem, 2.6vw, 2rem);
  border-top: 1px solid var(--line-soft);
  list-style: none;

  li {
    min-width: 0;
  }

  strong {
    display: block;
    color: var(--text);
    font-size: clamp(1.5rem, 3vw, 2.3rem);
    font-weight: 760;
    line-height: 1;
  }

  span {
    display: block;
    max-width: 30ch;
    margin-top: 0.65rem;
    color: var(--body);
    line-height: 1.55;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const Section = styled.section`
  padding: ${({ $compact }) =>
    $compact
      ? "clamp(2.8rem, 5vw, 4.2rem) clamp(1rem, 4vw, 4rem)"
      : "clamp(2.2rem, 4.5vw, 4rem) clamp(1rem, 4vw, 4rem)"};
`;

const Band = styled(Section)`
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  background: var(--band-bg);
`;

const SectionHeading = styled.div`
  min-width: 0;
  width: min(760px, 100%);
  max-width: 760px;
  margin-bottom: clamp(2rem, 4vw, 3rem);

  h2 {
    margin: 0;
    color: var(--text);
    font-family: var(--font-body);
    font-size: clamp(2rem, 4vw, 3.25rem);
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: 0;
  }

  p {
    margin: 1rem 0 0;
    color: var(--body);
    font-size: 1.02rem;
    line-height: 1.7;
    overflow-wrap: break-word;
  }

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const FeaturedList = styled.div`
  display: grid;
  gap: clamp(3rem, 6vw, 5rem);
  min-width: 0;

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const FeaturedProject = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.7rem, 4.2vw, 3.8rem);
  align-items: center;
  min-width: 0;

  @media (min-width: 901px) {
    grid-template-columns: ${({ $reverse }) =>
      $reverse ? "minmax(22rem, 1fr) minmax(0, 0.78fr)" : "minmax(0, 0.78fr) minmax(22rem, 1fr)"};

    > :first-child {
      order: ${({ $reverse }) => ($reverse ? 1 : 2)};
    }

    > :nth-child(2) {
      order: ${({ $reverse }) => ($reverse ? 2 : 1)};
    }
  }
`;

const ProjectCopy = styled.div`
  min-width: 0;
  width: 100%;

  h3 {
    margin: 0.55rem 0 0.85rem;
    color: var(--text);
    font-size: clamp(1.8rem, 3.2vw, 2.8rem);
    line-height: 1.08;
    font-weight: 780;
    letter-spacing: 0;
  }

  p {
    margin: 0;
    max-width: 64ch;
    color: var(--body);
    font-size: clamp(1.02rem, 1.6vw, 1.18rem);
    line-height: 1.65;
    overflow-wrap: break-word;
  }
`;

const ProjectNumber = styled.span`
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 400;
`;

const DetailList = styled.ul`
  display: grid;
  gap: 0.65rem;
  margin: 1.25rem 0;
  padding-left: 1.15rem;
  max-width: 62ch;
  color: var(--muted);
  line-height: 1.58;
  overflow-wrap: break-word;

  li::marker {
    color: var(--accent);
  }
`;

const TechLine = styled.p`
  margin: 0.9rem 0 0 !important;
  max-width: 100%;
  color: var(--faint) !important;
  font-family: var(--font-mono);
  font-size: 0.92rem !important;
  line-height: 1.55 !important;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 1.15rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-weight: 750;
  text-decoration-color: rgba(201, 169, 99, 0.45);
  text-underline-offset: 0.32em;

  &:hover {
    text-decoration-color: var(--accent);
  }

  &::after {
    content: "->";
    transform: translateY(1px);
  }

  &:visited {
    color: var(--accent-visited);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  margin-top: 1.15rem;

  ${ProjectLink} {
    margin-top: 0;
  }
`;

const MediaFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $mediaWidth, $mediaHeight, $hero }) =>
    $mediaWidth && $mediaHeight ? `${$mediaWidth} / ${$mediaHeight}` : $hero ? "16 / 10" : "4 / 3"};
  min-height: 0;
  overflow: hidden;
  border-radius: 6px;
  background: var(--panel);
  box-shadow: ${({ $hero }) =>
    $hero ? "var(--shadow-strong)" : "var(--shadow-soft)"};

  video,
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    transform: scale(1.01);
  }

  @media (max-width: 520px) {
    aspect-ratio: ${({ $mediaWidth, $mediaHeight }) =>
      $mediaWidth && $mediaHeight ? `${$mediaWidth} / ${$mediaHeight}` : "4 / 3"};
    min-height: 0;
  }
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.3rem;
  padding: 0.25rem 0.7rem 0.25rem 0.35rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  background: var(--panel);
  color: var(--text);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease;

  &:hover {
    border-color: var(--accent);
  }
`;

const ToggleTrack = styled.span`
  display: inline-flex;
  align-items: center;
  width: 2.15rem;
  height: 1.22rem;
  padding: 0.15rem;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "var(--accent)" : "var(--panel-soft)")};
  transition: background 160ms ease;

  span {
    width: 0.92rem;
    height: 0.92rem;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? "#ffffff" : "var(--accent)")};
    transform: translateX(${({ $active }) => ($active ? "0.92rem" : "0")});
    transition: transform 160ms ease, background 160ms ease;
  }
`;

const ToggleText = styled.span`
  min-width: 2.65rem;
  text-align: left;
`;

const ProjectPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-content: center;
  gap: 0.75rem;
  padding: clamp(1rem, 2.3vw, 1.55rem);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.04), transparent 50%),
    ${({ $type }) => placeholderTone($type)};
`;

const PlaceholderName = styled.strong`
  display: block;
  max-width: 100%;
  color: var(--text);
  font-size: clamp(1.2rem, 2.4vw, 2rem);
  font-weight: 780;
  line-height: 1.08;
  overflow-wrap: anywhere;
`;

const PlaceholderDetail = styled.span`
  display: block;
  max-width: 34ch;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.55;
`;

function placeholderTone(type) {
  if (type === "code") {
    return "linear-gradient(135deg, var(--panel), var(--panel-soft))";
  }
  if (type === "voice" || type === "rag") {
    return "linear-gradient(135deg, var(--panel), var(--panel-soft))";
  }
  if (type === "vision" || type === "geo") {
    return "linear-gradient(135deg, var(--panel), var(--panel-soft))";
  }
  return "linear-gradient(135deg, var(--panel), var(--panel-soft))";
}

const AdditionalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem) clamp(2rem, 5vw, 5rem);
  min-width: 0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const AdditionalProject = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  align-items: start;
  min-width: 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line-soft);

  h3 {
    margin: 0;
    color: var(--text);
    font-size: ${({ $strong }) => ($strong ? "clamp(1.45rem, 2.6vw, 2rem)" : "1.18rem")};
    line-height: 1.16;
    letter-spacing: 0;
  }

  p {
    margin: 0.75rem 0 0;
    color: var(--muted);
    max-width: 66ch;
    line-height: 1.62;
  }

  @media (min-width: 1081px) {
    grid-template-columns: ${({ $strong }) => ($strong ? "minmax(12rem, 0.72fr) minmax(0, 1fr)" : "1fr")};
  }
`;

const InlineFrame = styled.div`
  aspect-ratio: ${({ $mediaWidth, $mediaHeight }) =>
    $mediaWidth && $mediaHeight ? `${$mediaWidth} / ${$mediaHeight}` : "4 / 3"};
  overflow: hidden;
  border-radius: 8px;
  background: var(--panel);

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.01);
    display: block;
  }
`;

const AdditionalText = styled.div`
  min-width: 0;
  width: 100%;
`;

const ContextLine = styled.p`
  color: var(--body) !important;
`;

const Timeline = styled.div`
  display: grid;
  gap: 1.35rem;
  min-width: 0;
  width: min(960px, 100%);
  max-width: 960px;

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--line-soft);

  @media (min-width: 701px) {
    grid-template-columns: 13rem minmax(0, 1fr);
  }
`;

const TimelineDate = styled.span`
  color: var(--accent);
  font-family: var(--font-mono);
  font-weight: 400;
`;

const TimelineBody = styled.div`
  h3 {
    margin: 0;
    color: var(--text);
    font-size: 1.25rem;
  }

  strong {
    display: block;
    margin-top: 0.25rem;
    color: var(--strong-muted);
  }

  p {
    margin: 0.7rem 0 0;
    color: var(--body);
    line-height: 1.65;
  }
`;

const SkillsList = styled.div`
  display: grid;
  gap: 1rem;
  min-width: 0;
  width: min(980px, 100%);
  max-width: 980px;

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const SkillRow = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  padding-top: 1rem;
  border-top: 1px solid var(--line-soft);

  h3 {
    margin: 0;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 400;
  }

  p {
    margin: 0;
    color: var(--body);
    line-height: 1.65;
  }

  @media (min-width: 681px) {
    grid-template-columns: 14rem minmax(0, 1fr);
  }
`;

const AwardList = styled.ul`
  display: grid;
  gap: 0.8rem;
  min-width: 0;
  width: min(860px, 100%);
  max-width: 860px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding-top: 0.8rem;
    border-top: 1px solid var(--line-soft);
    color: var(--body);
    font-size: 1.05rem;
    line-height: 1.45;
    overflow-wrap: break-word;
  }

  @media (max-width: 520px) {
    width: min(100%, 358px);
    max-width: 358px;
  }
`;

const Contact = styled.footer`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
  padding: clamp(4rem, 7vw, 6rem) clamp(1rem, 4vw, 4rem);

  h2 {
    max-width: 15ch;
    margin: 0;
    color: var(--text);
    font-size: clamp(2rem, 4vw, 3.6rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: 0;
  }

  p {
    max-width: 56ch;
    margin: 1rem 0 0;
    color: var(--body);
    line-height: 1.7;
  }

  @media (min-width: 841px) {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`;

const ContactActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (min-width: 841px) {
    justify-content: flex-end;
  }
`;

export default App;
