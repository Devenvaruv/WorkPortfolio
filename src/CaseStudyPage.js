import React, { useEffect } from "react";
import styled from "styled-components";
import CaseStudyProject from "./CaseStudyProject";
import { useLocation } from "react-router-dom";    

const MasterNav = styled.nav`
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

const MasterSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #f0f3f6;
`;

const SectionLinks = styled.div`
  border-top: 1px solid #2e2e2e;
  padding-top: 0.5rem;

  a {
    display: block;
    padding: 0.3rem 0;
    font-size: 0.95rem;
    color: #8b949e;
    text-decoration: none;

    &.is-active {
      color: #58a6ff;
      font-weight: 600;
    }

    &:hover {
      color: #58a6ff;
      text-decoration: none;
    }
  }
`;

const PageGrid = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 6rem 4vw 4rem;
  display: grid;
  grid-template-columns: 8vw minmax(0, 1fr);
  gap: 3rem;
`;

const ProjectWrapper = styled.div`
  margin-bottom: 8rem;
`;

export default function CaseStudyPage({ projects, ...single }) {
  const cases = Array.isArray(projects) ? projects : [single];
  const { hash } = useLocation();

  const toc = cases.map((proj, pi) => ({
    title: proj.title,
    links: (proj.navItems || proj.sections).map(({ id, heading }) => ({
      id: `p${pi}-${id}`,
      heading,
    })),
  }));

  useEffect(() => {
    
    const heads = toc
      .flatMap((t) => t.links)
      .map((link) => document.getElementById(link.id));

    const links = [...document.querySelectorAll("[data-masterlink]")];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = heads.indexOf(e.target);
          if (idx !== -1 && e.isIntersecting) {
            links.forEach((l) => l.classList.remove("is-active"));
            links[idx]?.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    heads.forEach((h) => h && io.observe(h));
    return () => io.disconnect();
  }, [toc]);

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);     
    let attempts = 0;
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior:"smooth", block:"start" });
      } else if (attempts < 10) { 
        attempts++; setTimeout(scroll, 100);
      }
    };
    scroll();
  }, [hash]);

  return (
    <PageGrid>
      <MasterNav>
        {toc.map(({ title, links }, i) => (
          <MasterSection key={i}>
            <SectionTitle>{title}</SectionTitle>
            <SectionLinks>
              {links.map(({ id, heading }) => (
                <a href={`#${id}`} key={id} data-masterlink>
                  {heading}
                </a>
              ))}
            </SectionLinks>
          </MasterSection>
        ))}
      </MasterNav>

      <div>
        {cases.map((proj, i) => (
          <ProjectWrapper key={i}>
            <CaseStudyProject {...proj} idPrefix={`p${i}-`} showNav={false} />
          </ProjectWrapper>
        ))}
      </div>
    </PageGrid>
  );
}
