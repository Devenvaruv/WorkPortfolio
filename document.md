# Rainbow Carryover Timeline Website Brief

## Source Figma Pages

Use the Figma file pages as the visual source of truth:

- `Rainbow Carryover Screens - Vertical` is the primary design to build.
- `Rainbow Carryover Screens` is the horizontal experiment/reference.
- `Page 2` includes earlier rainbow liquid-glass column experiments and a pasted liquid-glass reference.

The website should recreate the vertical page unless otherwise specified.

## Core Concept

Create a vertically scrolling timeline made of five full-screen color panels. Each panel represents a year and is divided into 12 month sections. Glass rectangles appear in seven fixed vertical columns and may span from one year panel into the next. When a rectangle crosses into the next color panel, it keeps the color from the panel where it started.

This creates the effect of a colored memory or event carrying forward through time.

## Canvas And Layout

- Design width: `1400px`
- Design height per screen: `900px`
- Number of screens: `5`
- Total vertical design height: `4500px`
- Screens stack vertically with no gap.
- Each screen fills the viewport when adapted responsively.

Suggested responsive behavior:

- Desktop: preserve the `1400 / 900` visual ratio where possible.
- Web implementation can use `min-height: 100vh` per screen.
- The seven glass columns should scale with container width.

## Screen Colors And Years

Use these screen backgrounds from top to bottom:

1. Red: `#FF1A1A`, year `2023`
2. Orange: `#FF7A00`, year `2024`
3. Yellow: `#FFE600`, year `2025`
4. Green: `#00D85B`, year `2026`
5. Blue: `#134CFF`, year `2027`

Year labels:

- Position: bottom-right corner of each screen.
- Color: white.
- Size: small, around `20px` desktop.
- Weight: medium.
- Opacity: around `0.86`.

## Month Structure

Each screen is divided into 12 horizontal month bands.

Month labels:

- Labels: `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`
- Position: right-side rail of each screen.
- Size: around `13px`.
- Color: white.
- Opacity: around `0.52`.
- Text aligned right.

Month indicators:

- Add subtle horizontal separator lines between months.
- Add alternating soft bands for every other month.
- Alternating band style: white overlay at roughly `4.5%` opacity.
- Separator style: white at roughly `14%` opacity.
- Do not make this look like a table; it should remain atmospheric and quiet.

## Seven Glass Rectangles

There must be exactly seven vertical glass rectangles.

Column math:

- Total width: `1400px`
- Column count: `7`
- Column width: `1400 / 7 = 200px`
- The visual rectangle may be inset inside its 200px slot, as in the Figma design.
- Current visual width in Figma: about `168px`, with `16px` inset on each side.

Shape:

- Rounded rectangle, not capsule.
- Corner radius: around `24px`.
- Rectangles are vertical and vary in height.
- Some stay within one year; some cross into the next year.

Current vertical span layout:

1. Red rectangle:
   - Column 1
   - Starts in 2023 around February
   - Continues into 2024 around July
   - Carries red into orange

2. Orange rectangle:
   - Column 2
   - Starts in 2024 around March
   - Continues into 2025 around June
   - Carries orange into yellow

3. Yellow short rectangle:
   - Column 3
   - Starts near the beginning of 2025
   - Ends around March 2025

4. Yellow-to-green rectangle:
   - Column 4
   - Starts around June 2025
   - Continues into 2026 around September
   - Carries yellow into green

5. Green rectangle:
   - Column 5
   - Starts around March 2026
   - Continues into 2027 around July
   - Carries green into blue

6. Green short rectangle:
   - Column 6
   - Starts around October 2026
   - Ends around December 2026

7. Blue rectangle:
   - Column 7
   - Starts around February 2027
   - Ends around June 2027

## Liquid Glass Style

The rectangles should look like saturated liquid glass:

- Strong carried color core.
- Translucent glossy surface.
- Subtle texture/noise.
- Bright white rim highlights.
- Soft internal color waves.
- Soft shadow.
- Background blur/refraction effect where possible.

Approximate CSS direction:

```css
.glass-rect {
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.32), color-mix(in srgb, var(--origin-color) 68%, transparent), rgba(0,0,0,.18)),
    var(--origin-color);
  opacity: .95;
  border: 1.5px solid rgba(255,255,255,.68);
  box-shadow:
    16px 0 30px rgba(0,0,0,.16),
    inset -5px -6px 10px rgba(255,255,255,.50);
  backdrop-filter: blur(68px) saturate(1.25);
}
```

Add pseudo-elements:

- `::before`: organic/wavy color core.
- `::after`: rim highlight and glossy white edge.

Use SVG masks, CSS gradients, or absolutely positioned blurred shapes to create the wavy liquid texture.

## Text Experiment On Red Rectangle

The red rectangle includes an experimental text overlay near its top.

Header:

- Text: `Carry Forward`
- White.
- Bold.
- Centered.
- Around `30px` desktop.
- Line breaks may be used.

Paragraph:

- Text: `A red memory moves through each month, keeping its color as the screen changes.`
- White.
- Centered.
- Around `13px`.
- Line height around `17px`.

Important:

- Text should sit above the glass surface, not be swallowed by the glass blur.
- A subtle dark-red translucent wash behind the text is acceptable for legibility.

## Navigation Arrows

Each screen has two liquid-glass arrows:

- Up arrow near the top-right.
- Down arrow near the bottom-right.

Important details:

- The arrows are standalone transparent/liquid-glass arrow shapes.
- They do not have a square or circular button background.
- The arrow itself should be glassy: translucent white fill, soft blur, rim highlight, slight shadow/noise.
- The top arrow points up.
- The bottom arrow points down.
- They are visual affordances only; they do not need to actually navigate unless desired.

Placement:

- Top arrow: top-right, slightly inset so it does not sit directly on `Jan`.
- Bottom arrow: bottom-right area, above the year/month corner.
- `Dec` remains in the month rail.
- Year remains in the true bottom-right corner.

Dimmed state:

- On the first screen, the up arrow can be dimmer.
- On the last screen, the down arrow can be dimmer.

## Visual Priorities

The final website should feel:

- Colorful but clean.
- Timeline-like without becoming a spreadsheet.
- Liquid, glossy, and tactile.
- Spacious, with the month system visible but quiet.
- Focused on the carrying-over glass rectangles.

Avoid:

- Button boxes behind the arrows.
- Pill/capsule rectangle ends.
- Overly strong month grid lines.
- Crowding the bottom-right corner.
- Text being placed inside layers where blur/glass effects make it disappear.

## Implementation Notes

Use the Figma page `Rainbow Carryover Screens - Vertical` as the source of truth for spacing and composition.

Recommended DOM structure:

```html
<main class="timeline">
  <section class="year-screen red">
    <div class="month-bands"></div>
    <div class="month-labels"></div>
    <div class="year-label">2023</div>
    <button class="glass-arrow up" aria-label="Previous year"></button>
    <button class="glass-arrow down" aria-label="Next year"></button>
  </section>
  ...
  <div class="glass-rect red span-red-2023-2024">...</div>
</main>
```

It may be easier to render the glass rectangles in a single absolute overlay spanning the full timeline height, rather than nesting each rectangle inside a year screen. This preserves cross-screen carryover cleanly.

