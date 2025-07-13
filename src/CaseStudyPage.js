import React, { useEffect } from "react";
import styled from "styled-components";
import CaseStudyProject from "./CaseStudyProject";

/* —— master rail style re-uses colours from local rail —— */
const MasterNav = styled.nav`
  position: sticky;
  top: 6rem;
  align-self: start;
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  a { color:#8b949e; text-decoration:none; padding:0.4rem 0; }
  a.is-active { color:#58a6ff; font-weight:600; }
`;

/* —— two-column grid: rail + everything else —— */
const PageGrid = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 6rem 4vw 4rem;
  display: grid;
  grid-template-columns: 8vw minmax(0,1fr);
  gap: 3rem;
`;

export default function CaseStudyPage({ projects, ...single }) {
  const cases = Array.isArray(projects) ? projects : [single];

  /* ── Build one combined list ── */
  const toc = cases.flatMap((proj, pi) =>
    (proj.navItems || proj.sections).map(({ id, heading }) => ({
      id: `p${pi}-${id}`,
      label: `${proj.title} / ${heading}`,
    }))
  );

  /* ── Scroll-spy for master rail ── */
  useEffect(() => {
    const heads = toc.map((t) => document.getElementById(t.id));
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

  return (
    <PageGrid>
      {/* —— master rail —— */}
      <MasterNav>
        {toc.map(({ id, label }) => (
          <a href={`#${id}`} key={id} data-masterlink>
            {label}
          </a>
        ))}
      </MasterNav>

      {/* —— stack the projects —— */}
      <div>
        {cases.map((proj, i) => (
          <CaseStudyProject
            key={i}
            {...proj}
            idPrefix={`p${i}-`}
            showNav={false}            /* hide per-project nav */
          />
        ))}
      </div>
    </PageGrid>
  );
}
