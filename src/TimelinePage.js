import React, { useEffect, useRef, useState } from "react";
import LiquidGlass from "liquid-glass-react";
import styled, { createGlobalStyle } from "styled-components";
import timelineData from "./timelineData.json";

const monthCount = timelineData.months.length;
const columnCount = timelineData.design.columnCount;

function TimelinePage() {
  const transitionTimerRef = useRef(null);
  const [yearTransition, setYearTransition] = useState({
    active: false,
    direction: "down",
    targetYear: null,
  });

  useEffect(() => {
    document.title = "Rainbow Carryover Timeline | Deven Varu";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "A vertical rainbow carryover timeline with liquid-glass rectangles spanning months and years."
      );
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", timelineData.screens[0].color);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const visibleHeight =
    timelineData.screens.length * timelineData.design.screenHeight;
  const visibleRectangles = timelineData.rectangles.filter(
    (rect) => rectangleGeometry(rect).y < visibleHeight
  );

  function handleYearNavigation(event, targetYear, direction) {
    if (!targetYear) return;

    event.preventDefault();

    const target = document.getElementById(`year-${targetYear}`);
    if (!target) return;

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setYearTransition({
      active: !prefersReducedMotion,
      direction,
      targetYear,
    });

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#year-${targetYear}`);

    transitionTimerRef.current = window.setTimeout(
      () =>
        setYearTransition((current) => ({
          ...current,
          active: false,
        })),
      prefersReducedMotion ? 0 : 1050
    );
  }

  return (
    <TimelineShell
      $transitioning={yearTransition.active}
      $transitionDirection={yearTransition.direction}
      aria-busy={yearTransition.active}
    >
      <TimelineGlobalStyle />
      <TimelineStage
        $screenCount={timelineData.screens.length}
        $transitioning={yearTransition.active}
        $transitionDirection={yearTransition.direction}
      >
        {timelineData.screens.map((screen, index) => (
          <YearScreen
            id={`year-${screen.year}`}
            key={screen.year}
            $color={screen.color}
            $isTransitionTarget={yearTransition.targetYear === screen.year}
            $transitionActive={yearTransition.active}
            aria-label={`${screen.year} timeline screen`}
          >
            <MonthTicks aria-hidden="true">
              {timelineData.months.map((month) => (
                <span key={month} />
              ))}
            </MonthTicks>
            <MonthLabels aria-label={`${screen.year} months`}>
              {timelineData.months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </MonthLabels>
            <YearLabel>{screen.year}</YearLabel>
            <GlassArrow
              as={timelineData.screens[index - 1] ? "a" : "span"}
              href={
                timelineData.screens[index - 1]
                  ? `#year-${timelineData.screens[index - 1].year}`
                  : undefined
              }
              $direction="up"
              $dimmed={index === 0}
              aria-disabled={index === 0}
              aria-label={`Previous year from ${screen.year}`}
              tabIndex={index === 0 ? -1 : undefined}
              onClick={(event) =>
                handleYearNavigation(
                  event,
                  timelineData.screens[index - 1]?.year,
                  "up"
                )
              }
            >
              <span />
            </GlassArrow>
            <GlassArrow
              as={timelineData.screens[index + 1] ? "a" : "span"}
              href={
                timelineData.screens[index + 1]
                  ? `#year-${timelineData.screens[index + 1].year}`
                  : undefined
              }
              $direction="down"
              $dimmed={index === timelineData.screens.length - 1}
              aria-disabled={index === timelineData.screens.length - 1}
              aria-label={`Next year from ${screen.year}`}
              tabIndex={index === timelineData.screens.length - 1 ? -1 : undefined}
              onClick={(event) =>
                handleYearNavigation(
                  event,
                  timelineData.screens[index + 1]?.year,
                  "down"
                )
              }
            >
              <span />
            </GlassArrow>
          </YearScreen>
        ))}

        <ColumnAtmosphere aria-hidden="true">
          {Array.from({ length: columnCount }, (_, index) => (
            <span key={index} style={columnStyle(index)} />
          ))}
        </ColumnAtmosphere>

        <RectangleOverlay aria-label="Carryover glass rectangles">
          {visibleRectangles.map((rect, index) => {
            const geometry = rectangleGeometry(rect);
            const isCompact = geometry.height < 150;
            const continuationMarkers = rectangleContinuationMarkers(
              rect,
              visibleHeight
            );

            return (
              <GlassRectangle
                as={rect.url ? "a" : "article"}
                key={rect.id}
                href={rect.url || undefined}
                target={rect.url ? "_blank" : undefined}
                rel={rect.url ? "noreferrer" : undefined}
                $clickable={Boolean(rect.url)}
                aria-label={`${rect.url ? "Open " : ""}${rect.name}, ${rect.content?.date || `${rect.start.month} ${rect.start.year}`}`}
                style={rectangleStyle(rect, visibleHeight, index)}
              >
                <ClientLiquidGlass
                  className="liquid-glass-rect"
                  displacementScale={48}
                  blurAmount={0.075}
                  saturation={142}
                  aberrationIntensity={1.6}
                  elasticity={0.16}
                  cornerRadius={24}
                  padding="0"
                  overLight
                  mode="standard"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  <span className="liquid-glass-fill" aria-hidden="true" />
                </ClientLiquidGlass>
                {rect.content && (
                  <RectangleText $compact={isCompact}>
                    <h1>{rect.content.heading}</h1>
                    {rect.content.date && <time>{rect.content.date}</time>}
                    {rect.content.meta && <strong>{rect.content.meta}</strong>}
                    {!isCompact && <p>{rect.content.body}</p>}
                  </RectangleText>
                )}
                {continuationMarkers.map((marker) => (
                  <ContinuationMarker
                    key={marker.year}
                    style={{ "--continue-top": `${marker.top}%` }}
                  >
                    continue: {marker.label}
                  </ContinuationMarker>
                ))}
                {rect.endMilestone && !isCompact && (
                  <EndMilestone>
                    <h2>{rect.endMilestone.heading}</h2>
                    <time>{rect.endMilestone.date}</time>
                    {rect.endMilestone.meta && <span>{rect.endMilestone.meta}</span>}
                  </EndMilestone>
                )}
              </GlassRectangle>
            );
          })}
        </RectangleOverlay>
      </TimelineStage>
    </TimelineShell>
  );
}

function ClientLiquidGlass({ children, className, style, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          ...style,
          transform: "translate(-50%, -50%)",
          borderRadius: `${props.cornerRadius || 24}px`,
        }}
      />
    );
  }

  return (
    <LiquidGlass className={className} style={style} {...props}>
      {children}
    </LiquidGlass>
  );
}

function columnStyle(index) {
  const rectForColumn = timelineData.rectangles.find(
    (rect) => rect.column === index + 1
  );
  const color =
    rectForColumn?.originColor ||
    timelineData.screens[index % timelineData.screens.length].color;
  const rgb = hexToRgb(color);
  const left =
    (index * timelineData.design.columnWidth / timelineData.design.width) * 100;
  const width =
    (timelineData.design.columnWidth / timelineData.design.width) * 100;

  return {
    "--column-left": `${left}%`,
    "--column-width": `${width}%`,
    "--column-rgb": `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    "--column-delay": `${index * -1.35}s`,
    "--column-sway": index % 2 === 0 ? "1" : "-1",
  };
}

function rectangleContinuationMarkers(rect, visibleHeight) {
  const { design, screens } = timelineData;
  const geometry = rectangleGeometry(rect);
  const clampedHeight = Math.min(
    geometry.height,
    Math.max(0, visibleHeight - geometry.y)
  );
  const startIndex = screens.findIndex((screen) => screen.year === rect.start.year);
  const endIndex = screens.findIndex((screen) => screen.year === rect.end.year);

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
      label: rect.continueLabel || rect.content?.heading || rect.name,
    });
  }

  markers.push(
    ...screens
    .slice(startIndex + 1, endIndex + 1)
    .map((screen) => {
      const boundaryY = screens.findIndex((item) => item.year === screen.year) * design.screenHeight;
      const top = ((boundaryY - geometry.y) / clampedHeight) * 100;

      return {
        year: screen.year,
        top: Math.min(96, Math.max(2, top + 1.4)),
        label: rect.continueLabel || rect.content?.heading || rect.name,
      };
    })
  );

  return markers;
}

function rectangleStyle(rect, visibleHeight, index) {
  const { design } = timelineData;
  const geometry = rectangleGeometry(rect);
  const clampedHeight = Math.min(
    geometry.height,
    Math.max(0, visibleHeight - geometry.y)
  );
  const rgb = hexToRgb(rect.originColor);

  return {
    "--rect-left": `${(geometry.x / design.width) * 100}%`,
    "--rect-top": `${(geometry.y / visibleHeight) * 100}%`,
    "--rect-width": `${(geometry.width / design.width) * 100}%`,
    "--rect-height": `${(clampedHeight / visibleHeight) * 100}%`,
    "--origin-color": rect.originColor,
    "--origin-rgb": `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    "--wave-offset": `${index * 17}%`,
    "--rect-delay": `${index * -0.72}s`,
  };
}

function rectangleGeometry(rect) {
  if (rect.figma) return rect.figma;

  const { design } = timelineData;
  const y = datePosition(rect.start);
  const endY = datePosition(rect.end);
  const minHeight = design.screenHeight * 0.075;

  return {
    x: (rect.column - 1) * design.columnWidth + design.rectangleInset,
    y,
    width: design.rectangleWidth,
    height: Math.max(minHeight, endY - y),
  };
}

function datePosition(point) {
  const screenIndex = timelineData.screens.findIndex(
    (screen) => screen.year === point.year
  );
  const monthIndex = timelineData.months.indexOf(point.month);

  if (screenIndex < 0 || monthIndex < 0) return 0;

  const monthHeight = timelineData.design.screenHeight / monthCount;
  return (
    screenIndex * timelineData.design.screenHeight +
    monthIndex * monthHeight +
    (point.offset || 0) * monthHeight
  );
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

const TimelineGlobalStyle = createGlobalStyle`
  html,
  body {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

const TimelineShell = styled.main`
  --travel-start: ${({ $transitionDirection }) =>
    $transitionDirection === "up" ? "-118%" : "118%"};
  --travel-end: ${({ $transitionDirection }) =>
    $transitionDirection === "up" ? "118%" : "-118%"};
  min-width: 320px;
  min-height: 100vh;
  background: #11100e;
  color: #ffffff;
  font-family: var(--font-body);
  isolation: isolate;

  &::before,
  &::after {
    content: "";
    position: fixed;
    inset: -14vh -8vw;
    z-index: 30;
    pointer-events: none;
    opacity: ${({ $transitioning }) => ($transitioning ? 1 : 0)};
  }

  &::before {
    background:
      linear-gradient(
        to bottom,
        transparent 0,
        rgba(255, 255, 255, 0.08) 23%,
        rgba(255, 255, 255, 0.34) 47%,
        rgba(255, 255, 255, 0.13) 61%,
        transparent 100%
      );
    filter: blur(0.5px);
    mix-blend-mode: screen;
    transform: translate3d(0, var(--travel-start), 0) skewY(-5deg);
    animation: ${({ $transitioning }) =>
      $transitioning ? "carryoverGlassWash 1050ms cubic-bezier(0.22, 1, 0.36, 1)" : "none"};
  }

  &::after {
    background:
      radial-gradient(ellipse at 50% 42%, rgba(255, 255, 255, 0.18), transparent 38%),
      linear-gradient(
        90deg,
        transparent 0,
        rgba(255, 255, 255, 0.08) 18%,
        rgba(255, 255, 255, 0.16) 50%,
        rgba(255, 255, 255, 0.08) 82%,
        transparent 100%
      );
    mix-blend-mode: overlay;
    animation: ${({ $transitioning }) =>
      $transitioning ? "carryoverBloom 1050ms ease-out" : "none"};
  }

  @keyframes carryoverGlassWash {
    0% {
      transform: translate3d(0, var(--travel-start), 0) skewY(-5deg);
      opacity: 0;
    }

    18% {
      opacity: 0.86;
    }

    100% {
      transform: translate3d(0, var(--travel-end), 0) skewY(-5deg);
      opacity: 0;
    }
  }

  @keyframes carryoverBloom {
    0%,
    100% {
      opacity: 0;
      transform: scaleY(0.94);
    }

    42% {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const TimelineStage = styled.div`
  position: relative;
  width: 100vw;
  min-height: ${({ $screenCount }) => `${$screenCount * 100}svh`};
  overflow: hidden;
  isolation: isolate;
  transform-origin: center;
  animation: ${({ $transitioning }) =>
    $transitioning ? "stageTravelDepth 1050ms cubic-bezier(0.22, 1, 0.36, 1)" : "none"};

  @keyframes stageTravelDepth {
    0%,
    100% {
      filter: saturate(1) brightness(1);
      transform: scale(1);
    }

    38% {
      filter: saturate(1.18) brightness(1.04);
      transform: scale(1.006);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const YearScreen = styled.section`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  background:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(100% / 12 - 1px),
      rgba(255, 255, 255, 0.14) calc(100% / 12 - 1px),
      rgba(255, 255, 255, 0.14) calc(100% / 12)
    ),
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(100% / 12),
      rgba(255, 255, 255, 0.045) calc(100% / 12),
      rgba(255, 255, 255, 0.045) calc(100% / 6)
    ),
    ${({ $color }) => $color};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.18), transparent 38%),
      linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.12), transparent);
    opacity: ${({ $isTransitionTarget, $transitionActive }) =>
      $isTransitionTarget && $transitionActive ? 1 : 0};
    mix-blend-mode: soft-light;
    animation: ${({ $isTransitionTarget, $transitionActive }) =>
      $isTransitionTarget && $transitionActive
        ? "targetYearArrival 1050ms cubic-bezier(0.22, 1, 0.36, 1)"
        : "none"};
  }

  @keyframes targetYearArrival {
    0% {
      opacity: 0;
      transform: scaleY(0.94);
    }

    52% {
      opacity: 1;
      transform: scaleY(1);
    }

    100% {
      opacity: 0;
      transform: scaleY(1.04);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
    }
  }
`;

const MonthTicks = styled.div`
  position: absolute;
  inset: 0 auto 0 1.43%;
  z-index: 2;
  display: grid;
  grid-template-rows: repeat(${monthCount}, 1fr);
  width: 0.86%;
  pointer-events: none;

  span {
    align-self: center;
    width: 100%;
    height: 3px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 999px;
  }

  @media (max-width: 680px) {
    left: 12px;
    width: 10px;
  }
`;

const MonthLabels = styled.div`
  position: absolute;
  top: 0;
  right: 2.42%;
  bottom: 0;
  z-index: 4;
  display: grid;
  grid-template-rows: repeat(${monthCount}, 1fr);
  width: 2.72%;
  min-width: 34px;
  pointer-events: none;

  span {
    align-self: center;
    color: rgba(255, 255, 255, 0.56);
    font-size: clamp(0.6rem, 0.93vw, 0.82rem);
    font-weight: 500;
    line-height: 1;
    text-align: right;
  }

  @media (max-width: 680px) {
    right: 12px;
  }
`;

const YearLabel = styled.div`
  position: absolute;
  right: 2.42%;
  bottom: 0.67%;
  z-index: 5;
  width: 5.72%;
  min-width: 70px;
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(0.82rem, 1.43vw, 1.25rem);
  font-weight: 650;
  line-height: 1.2;
  text-align: right;

  @media (max-width: 680px) {
    right: 12px;
  }
`;

const GlassArrow = styled.a`
  position: absolute;
  right: ${({ $direction }) => ($direction === "up" ? "2.14%" : "2.14%")};
  top: ${({ $direction }) => ($direction === "up" ? "2.3%" : "auto")};
  bottom: ${({ $direction }) => ($direction === "down" ? "5.78%" : "auto")};
  z-index: 6;
  display: grid;
  width: clamp(38px, 3.86vw, 54px);
  height: clamp(38px, 3.86vw, 54px);
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.55 : 0.9)};
  pointer-events: ${({ $dimmed }) => ($dimmed ? "none" : "auto")};

  span {
    display: block;
    width: 78%;
    height: 68%;
    clip-path: polygon(
      50% 0,
      100% 44%,
      73% 44%,
      73% 100%,
      27% 100%,
      27% 44%,
      0 44%
    );
    transform: ${({ $direction }) =>
      $direction === "down" ? "rotate(180deg)" : "none"};
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.28) 58%, rgba(255, 255, 255, 0.72)),
      rgba(255, 255, 255, 0.34);
    filter: drop-shadow(0 9px 10px rgba(0, 0, 0, 0.14));
    box-shadow:
      inset 2px 2px 4px rgba(255, 255, 255, 0.8),
      inset -3px -4px 7px rgba(255, 255, 255, 0.24);
    backdrop-filter: blur(20px) saturate(1.18);
  }

  &[aria-disabled="true"] {
    cursor: default;
  }

  @media (max-width: 680px) {
    right: 12px;
  }
`;

const RectangleOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
`;

const ColumnAtmosphere = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;

  span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--column-left);
    width: var(--column-width);
    overflow: hidden;
    opacity: 0.62;
    background:
      linear-gradient(
        to right,
        transparent 0,
        rgba(var(--column-rgb), 0.08) 18%,
        rgba(255, 255, 255, 0.075) 50%,
        rgba(var(--column-rgb), 0.08) 82%,
        transparent 100%
      );
  }

  span::before,
  span::after {
    content: "";
    position: absolute;
    inset: -18% 9%;
    border-radius: 999px;
    pointer-events: none;
  }

  span::before {
    background:
      radial-gradient(ellipse at 50% 8%, rgba(255, 255, 255, 0.22), transparent 17%),
      radial-gradient(ellipse at 50% 46%, rgba(var(--column-rgb), 0.22), transparent 24%),
      radial-gradient(ellipse at 50% 88%, rgba(255, 255, 255, 0.12), transparent 18%);
    filter: blur(18px);
    animation: columnBreath 9s ease-in-out infinite;
    animation-delay: var(--column-delay);
  }

  span::after {
    background:
      linear-gradient(
        108deg,
        transparent 0,
        transparent 34%,
        rgba(255, 255, 255, 0.16) 44%,
        rgba(var(--column-rgb), 0.16) 51%,
        transparent 62%,
        transparent 100%
      );
    filter: blur(10px);
    opacity: 0.42;
    transform: translateX(calc(var(--column-sway) * -11%));
    animation: columnGlint 13s ease-in-out infinite;
    animation-delay: calc(var(--column-delay) - 1.5s);
  }

  @keyframes columnBreath {
    0%,
    100% {
      transform: translate3d(0, -2.5%, 0) scaleY(1);
      opacity: 0.5;
    }

    50% {
      transform: translate3d(0, 2.5%, 0) scaleY(1.035);
      opacity: 0.86;
    }
  }

  @keyframes columnGlint {
    0%,
    100% {
      transform: translate3d(calc(var(--column-sway) * -13%), -1.5%, 0) skewY(-8deg);
      opacity: 0.24;
    }

    48%,
    58% {
      transform: translate3d(calc(var(--column-sway) * 14%), 1.5%, 0) skewY(-8deg);
      opacity: 0.58;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    span::before,
    span::after {
      animation: none;
    }
  }
`;

const GlassRectangle = styled.article`
  position: absolute;
  left: var(--rect-left);
  top: var(--rect-top);
  width: var(--rect-width);
  height: var(--rect-height);
  min-width: 44px;
  min-height: 64px;
  overflow: visible;
  border: 0;
  border-radius: clamp(14px, 1.72vw, 24px);
  background: transparent;
  color: inherit;
  filter: drop-shadow(16px 0 28px rgba(0, 0, 0, 0.16));
  opacity: 0.98;
  pointer-events: ${({ $clickable }) => ($clickable ? "auto" : "none")};
  text-decoration: none;
  animation: rectangleFloat 8s ease-in-out infinite;
  animation-delay: var(--rect-delay);
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  .liquid-glass-rect {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .liquid-glass-rect > .glass {
    width: 100%;
    height: 100%;
    min-width: 100%;
    padding: 0 !important;
    border-radius: inherit !important;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.02) 34%, rgba(0, 0, 0, 0.08)),
      rgba(var(--origin-rgb), 0.08);
    box-shadow:
      0 14px 30px rgba(0, 0, 0, 0.13),
      inset 0 0 0 1px rgba(255, 255, 255, 0.42),
      inset 0 16px 28px rgba(255, 255, 255, 0.16),
      inset -8px -12px 22px rgba(255, 255, 255, 0.14) !important;
  }

  .liquid-glass-rect .glass__warp {
    border-radius: inherit;
    opacity: 0.82;
  }

  .liquid-glass-rect .glass > div {
    width: 100%;
    height: 100%;
  }

  .liquid-glass-fill {
    position: absolute;
    inset: 0;
    display: block;
    border-radius: inherit;
    background:
      radial-gradient(ellipse at 44% calc(16% + var(--wave-offset)), rgba(255, 255, 255, 0.32), transparent 22%),
      radial-gradient(ellipse at 58% 48%, rgba(255, 255, 255, 0.14), transparent 28%),
      linear-gradient(104deg, rgba(255, 255, 255, 0.2), rgba(var(--origin-rgb), 0.72) 28%, rgba(var(--origin-rgb), 0.88) 58%, rgba(255, 255, 255, 0.12)),
      rgba(var(--origin-rgb), 0.62);
    box-shadow:
      inset 9px 0 12px rgba(255, 255, 255, 0.34),
      inset -10px 0 18px rgba(255, 255, 255, 0.12);
    opacity: 0.82;
    animation: liquidWave 10s ease-in-out infinite;
    animation-delay: var(--rect-delay);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 8px 10px 10px 9px;
    z-index: 2;
    border-radius: inherit;
    background:
      linear-gradient(to bottom, rgba(255, 255, 255, 0.54), transparent 12%),
      linear-gradient(to right, rgba(255, 255, 255, 0.58), transparent 8%, transparent 88%, rgba(255, 255, 255, 0.3)),
      radial-gradient(circle at 78% 9%, rgba(255, 255, 255, 0.36), transparent 14%);
    mix-blend-mode: screen;
    pointer-events: none;
    animation: rimPulse 6.8s ease-in-out infinite;
    animation-delay: calc(var(--rect-delay) - 0.8s);
  }

  &:hover,
  &:focus-within {
    filter:
      drop-shadow(18px 0 30px rgba(0, 0, 0, 0.18))
      drop-shadow(0 12px 22px rgba(var(--origin-rgb), 0.18));
  }

  @keyframes rectangleFloat {
    0%,
    100% {
      transform: translate3d(0, 0, 0);
    }

    50% {
      transform: translate3d(0, -0.42%, 0);
    }
  }

  @keyframes liquidWave {
    0%,
    100% {
      transform: translate3d(-1.5%, -0.8%, 0) skewY(-8deg);
      opacity: 0.76;
    }

    50% {
      transform: translate3d(2.2%, 1.2%, 0) skewY(-5deg);
      opacity: 0.9;
    }
  }

  @keyframes rimPulse {
    0%,
    100% {
      opacity: 0.74;
      transform: translate3d(0, 0, 0);
    }

    50% {
      opacity: 1;
      transform: translate3d(0, -0.8%, 0);
    }
  }

  @media (max-width: 680px) {
    filter: drop-shadow(10px 0 18px rgba(0, 0, 0, 0.14));
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::before,
    &::after {
      animation: none;
    }
  }
`;

const RectangleText = styled.div`
  position: relative;
  z-index: 4;
  display: grid;
  gap: clamp(0.12rem, 0.42vw, 0.32rem);
  width: calc(100% - 18px);
  max-height: calc(100% - 18px);
  margin: 9px auto 0;
  padding: clamp(0.36rem, 0.72vw, 0.62rem) clamp(0.32rem, 0.72vw, 0.56rem);
  overflow: hidden;
  border-radius: clamp(10px, 1.14vw, 16px);
  background: rgba(30, 20, 12, 0.18);
  text-align: left;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(10px);

  h1 {
    margin: 0;
    color: #ffffff;
    font-size: clamp(0.54rem, 1.02vw, 0.98rem);
    font-weight: 800;
    line-height: 1.08;
    overflow-wrap: break-word;
    word-break: normal;
  }

  time,
  strong {
    display: block;
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(0.42rem, 0.62vw, 0.64rem);
    font-weight: 700;
    line-height: 1.12;
  }

  strong {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 650;
  }

  p {
    display: -webkit-box;
    margin: 0;
    max-width: none;
    color: rgba(255, 255, 255, 0.88);
    font-size: clamp(0.42rem, 0.68vw, 0.68rem);
    line-height: 1.22;
    overflow: hidden;
    overflow-wrap: break-word;
    word-break: normal;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  ${({ $compact }) =>
    $compact &&
    `
      align-content: center;

      h1 {
        font-size: clamp(0.58rem, 1.08vw, 1rem);
      }

      strong {
        display: none;
      }
    `}

  @media (max-width: 760px) {
    width: calc(100% - 10px);
    margin-top: 5px;
    padding-inline: 0.25rem;

    strong,
    p {
      display: none;
    }
  }
`;

const EndMilestone = styled.div`
  position: absolute;
  left: 9px;
  right: 9px;
  bottom: 9px;
  z-index: 4;
  display: grid;
  gap: 0.12rem;
  padding: clamp(0.34rem, 0.66vw, 0.58rem);
  overflow: hidden;
  border-radius: clamp(10px, 1vw, 15px);
  background: rgba(30, 20, 12, 0.2);
  color: #ffffff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(10px);

  h2 {
    margin: 0;
    font-size: clamp(0.52rem, 0.92vw, 0.9rem);
    line-height: 1.08;
  }

  time,
  span {
    color: rgba(255, 255, 255, 0.78);
    font-size: clamp(0.4rem, 0.58vw, 0.6rem);
    font-weight: 700;
    line-height: 1.12;
  }

  span {
    color: rgba(255, 255, 255, 0.68);
  }

  @media (max-width: 760px) {
    left: 5px;
    right: 5px;
    bottom: 5px;

    span {
      display: none;
    }
  }
`;

const ContinuationMarker = styled.div`
  position: absolute;
  top: var(--continue-top);
  left: 9px;
  right: 9px;
  z-index: 5;
  padding: 0.28rem 0.38rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.38rem, 0.58vw, 0.58rem);
  font-weight: 800;
  line-height: 1;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.24);
  text-transform: lowercase;
  white-space: nowrap;
  backdrop-filter: blur(12px) saturate(1.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    0 6px 14px rgba(0, 0, 0, 0.12);

  @media (max-width: 760px) {
    left: 5px;
    right: 5px;
    padding-inline: 0.24rem;
  }
`;

export default TimelinePage;
