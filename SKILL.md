# SKILL.md — Frontend Design
# How to build production-grade, visually distinctive interfaces.
# Read this before writing any CSS or HTML.

---

## Core principle

You are not a code generator. You are a high-end frontend developer and art director working on a distinctive, cinematic non-profit brand. Every interface decision must be intentional, beautiful, and specific to House of Navi — never generic.

The biggest mistake coding agents make is writing the entire implementation in one shot. This produces weak layouts. Always build in layers: structure → tokens → layout → detail → polish.

---

## Before writing code — think first

Answer these four questions before touching a file:

1. **Purpose** — What does this page make the visitor feel and do?
2. **Tone** — What is the one word that describes this page's mood? (e.g. "arrival", "weight", "invitation")
3. **Differentiation** — What one thing will a visitor remember about this page?
4. **Constraints** — What assets, colours, and fonts must I use? (See BRAND.md and CLAUDE.md)

Only then open an editor.

---

## Typography — the most important design decision

- **Display (Lilita One):** Minimum 80px on desktop for hero text. Let it be enormous. It should feel pressed into the page like a stamp.
- **Body (Baloo 2):** 16–18px, weight 400, line-height 1.7. Never cramped.
- **Labels/eyebrows:** Baloo 2, 11–12px, weight 600, ALL CAPS, letter-spacing 0.2em.
- **Script (Caveat):** Only for signatures and handwritten moments. Never for headlines.
- **Pairing rule:** Display and body should feel like two different materials — one heavy and pressed, one light and readable.
- **Never use:** Inter, Roboto, Arial, system-ui, or any sans-serif not in the brand spec.

---

## Colour — commit, don't hedge

- Dominant colour wins. Don't distribute colour evenly across a page — let one colour own it.
- Use CSS custom properties from CLAUDE.md for every colour value. No hardcoded hex except in the token definitions.
- On dark/textured grounds: `--navi-first-light` (#F5DDD5) for all type.
- CTAs and identity: `--navi-blood-dune` (#6B1A0E).
- Highlight words in body copy: `--navi-mid-dune` (#D9907A).
- Canvas: `--navi-clay-cream` (#EDE3D0).
- Never: cool greys, pure black (#000), blue tones, purple gradients.

---

## Motion — CSS only, high impact

### The rule
One well-orchestrated page load with staggered scroll-reveals creates more delight than 20 scattered micro-interactions. Choose your moments.

### How to implement scroll-reveals
Use `IntersectionObserver` + CSS class toggling. Never GSAP or external animation libraries.

```javascript
// Paste this script at the bottom of every page
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
/* Base reveal state */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

/* Stagger variants */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

/* Visible state */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Page load animation
```css
/* Hero headline enters on load */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-title {
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.hero-tagline {
  animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}
```

### Hover states
- Nav links: opacity 1 on hover (from 0.6), no colour change
- Support pill: `transform: translateY(-1px)`, shadow deepens
- Project links: underline slides in from left using `::after` pseudo-element
- Never animate colours on hover — only position, opacity, shadow

---

## Layout — asymmetry is the point

### Never do this (generic):
```css
/* ❌ Centred everything */
.page { display: flex; flex-direction: column; align-items: center; text-align: center; }
```

### Do this instead:
```css
/* ✓ Asymmetric editorial grid */
.page-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: var(--space-lg);
  padding: var(--space-xl) var(--space-lg);
}

/* Large headline anchored left, body floats right */
.headline-col { grid-column: 1; }
.body-col { grid-column: 2; padding-top: var(--space-xl); }
```

### Layout principles
- **Headlines are never centred** unless it's a single full-bleed hero word
- **Content anchors to corners and edges**, not to the centre of the page
- **Overlapping elements** create depth — let large type bleed behind content blocks
- **Generous negative space** in the lower half of pages — don't fill every gap
- **Fixed elements** (logo, nav, support pill) create a stable frame the content moves inside

---

## Depth and atmosphere — the texture stack

Every page must feel like a physical material, not a screen. Achieve this with layers:

```
Layer 1: Texture image (full-bleed, cover)
Layer 2: Multiply scrim (dark, 0.42–0.68 opacity)
Layer 3: Vignette (radial gradient, darkens edges)
Layer 4: Grain overlay (SVG noise, 0.04 opacity)
Layer 5: Content (z-index: 10)
```

The grain overlay code (use on every page):
```css
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 180px;
}
```

---

## Responsiveness — mobile first

### Breakpoints
```css
/* Mobile first — base styles are for 390px */
/* Tablet */
@media (min-width: 768px) { ... }
/* Desktop */
@media (min-width: 1200px) { ... }
```

### Mobile rules
- Single column layouts on mobile
- Display font: minimum 48px on mobile (hero), scales up with clamp()
- Nav collapses to hamburger or stacks vertically
- Support pill stays fixed bottom-right, shrinks slightly
- Touch targets minimum 44px height
- Never horizontal scroll

---

## What makes this site unforgettable

One person looks at this site and feels: *"This was made by people who care deeply about what they're doing."*

That feeling comes from:
1. Type that is large enough to feel like a statement, not a label
2. Textures that make you feel the earth, the bark, the clay
3. Copy that is specific and human, never vague or charitable-sounding
4. Motion that reveals content like a documentary reveal — patient, deliberate
5. Space that is respected — not every pixel needs to be filled

---

## Quality check before calling anything done

- [ ] Lilita One visible in browser DevTools network tab (loaded, not fallback)
- [ ] Baloo 2 visible in browser DevTools network tab
- [ ] Texture image loading (check Network tab, no 404)
- [ ] Grain overlay visible (subtle but present)
- [ ] Scroll-reveal animations firing on scroll
- [ ] No element is centred that shouldn't be
- [ ] No white background anywhere
- [ ] No generic sans-serif font anywhere
- [ ] Responsive at 390px without horizontal scroll
- [ ] Support pill fixed and visible on all pages
