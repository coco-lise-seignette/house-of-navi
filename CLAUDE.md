# CLAUDE.md — House of Navi
# Master instructions for every Claude Code session.
# Read this file FIRST before touching any code.

---

## 0 · Skills check — run this before anything else

Before writing any code, confirm the frontend-design skill is active:

1. Check if `~/.claude/skills/frontend-design/` exists on this system
2. If yes — load it. It defines production-grade frontend design standards.
3. If no — run this in terminal to install it:
   ```bash
   git clone https://github.com/anthropics/skills.git
   cp -r skills/skills/frontend-design ~/.claude/skills/
   ```
4. After confirming the skill is loaded, read `SKILL.md` in this project folder — it extends and overrides the base skill with House of Navi-specific rules.

**The frontend-design skill must be active before writing a single line of CSS or HTML.**

---

## 0b · Read these files before writing a single line of code

1. Load the `frontend-design` skill from `~/.claude/skills/frontend-design/` (see above)
2. Read `BRAND.md` in full — it is the visual law of this project
3. Read `SKILL.md` in full — it extends the skill for House of Navi specifically
4. Confirm all three are loaded by summarising the key rules back before starting

If you cannot find any of these files, stop and ask. Do not proceed with defaults.

---

## 0c · Environment rules — read before running anything

This is a **static HTML/CSS/JS website**. There is no Node.js, no npm, no bundler, no React, no build step.

### How to serve the site locally
Always use Python's built-in server — never Node:
```bash
python3 -m http.server 8001
```
Run this from the project root folder. Then open `http://localhost:8001/index.html` in the browser.

### Rules that must never be broken
- **Never run HTML or JS files with Node.js** — this causes `document is not defined` errors
- **Never use `require()` or `import` in frontend files** — these are Node.js patterns, not browser patterns
- **Never install npm packages** for this project
- **Never create a `package.json`** unless explicitly asked
- **Never use a bundler** (webpack, vite, parcel, esbuild)
- **All JS must be plain browser JavaScript** written inside `<script>` tags or `.js` files loaded with `<script src="">`
- **All CSS must be plain CSS** in `<style>` tags or `.css` files loaded with `<link>`

### If you see these errors, here is the fix
| Error | Cause | Fix |
|---|---|---|
| `document is not defined` | Running browser JS in Node | Use `python3 -m http.server 8001` instead |
| `require is not defined` | Node syntax in browser file | Replace with browser-native code |
| `Cannot use import statement` | ES modules without type=module | Add `type="module"` to script tag or rewrite as classic JS |
| Copilot 400 timeout error | VS Code routing through GitHub Copilot | Disable Copilot in VS Code settings |

### Self-checking rule — mandatory before every review
Before showing me any result, you must:
1. Open the corresponding design PNG from `brand/assets/designs/`
2. List every visible difference between the PNG and your current output
3. Fix each difference one at a time
4. Confirm your difference list is empty
5. Only then ask for my feedback

**Never show me a result without first self-checking against the design PNG.**

---

## 1 · Project identity

**Client:** House of Navi
**Type:** South African Non-Profit Company (NPC 2026/246813/08)
**Mission:** Spotlight invisible communities and environments across Africa. Connect donors, storytellers, and changemakers to the people and places that need them most.
**Taglines:** "A spotlight, not a solution." · "Stories first, funding follows." · "Walk with us."
**Domain:** houseofnavi.com
**Stack:** Vanilla HTML + CSS + JS (no frameworks unless explicitly requested)
**Host:** Vercel
**Fonts:** Loaded from Google Fonts — Lilita One (display) + Baloo 2 (body) + Caveat (script/signature)

---

## 2 · Asset locations

All brand assets live in `brand/assets/`. Never reference assets from anywhere else.

```
brand/assets/
├── logo-navi-firstlight.png        ← PRIMARY LOGO — use this everywhere on dark/textured grounds
├── logo-navi-sossusvlei-red.png    ← on cream/light grounds only
├── logo-navi-midnight-dune.png     ← dark variant
├── logo-navi-fired-clay.png        ← fired clay variant
├── textures/
│   ├── texture-terracotta.png      ← Landing page
│   ├── texture-elephant-warm.jpg   ← Projects page
│   ├── texture-elephant-olive.jpg  ← long-form / editorial
│   ├── texture-knuckles.jpg        ← About page
│   ├── texture-tree-roots.jpg      ← Get Involved page
│   └── texture-croc.jpg            ← Contact page
└── icons/
    ├── icon-sun.svg
    ├── icon-eye.svg
    ├── icon-vessel.svg
    ├── icon-bird.svg
    ├── icon-seed.svg
    ├── icon-dunes.svg
    ├── icon-earth.svg
    └── icon-flag.svg
```

Before writing any HTML, verify these files exist at these paths.
If a file is missing, tell me — do not invent a fallback.

---

## 3 · Site structure — 5 pages

Build one page at a time. Complete and confirm each before moving to the next.

| File | Page | Texture | Purpose |
|---|---|---|---|
| `index.html` | Landing | texture-terracotta.png | Hero brand statement. Single CTA: Support. |
| `projects.html` | Projects | texture-elephant-warm.jpg | The three active projects. |
| `get-involved.html` | Get Involved | texture-tree-roots.jpg | Three paths: Donate · Partner · Spread the word. |
| `about.html` | About | texture-knuckles.jpg | Who we are. The Navi promise. |
| `contact.html` | Contact | texture-croc.jpg | Say hello. Contact details. |

Every page shares the same nav, logo, and Support pill. Build these as a shared component or repeated consistently.

---

## 4 · Build process — follow this order every time

**Never write the full implementation in one shot. Build in layers.**

### Layer 1 — Structure (HTML skeleton)
- Semantic HTML only
- All sections present, no styling
- Correct asset paths verified
- Confirm before proceeding

### Layer 2 — Design tokens + base styles (CSS)
- Load Google Fonts
- Set all CSS custom properties (colours, type scale, spacing)
- Apply texture backgrounds with scrim
- Apply typography
- Confirm before proceeding

### Layer 3 — Layout
- Apply grid and flexbox layouts
- Position nav, logo, support pill
- Confirm before proceeding

### Layer 4 — Detail + motion
- Scroll-reveal animations (IntersectionObserver, CSS only)
- Hover states
- Grain overlay
- Vignette
- Confirm before proceeding

### Layer 5 — Polish + QA
- Cross-browser check
- Mobile responsiveness
- Console error check (zero errors required)
- Asset load check (zero 404s required)

---

## 5 · UI design principles — how to build interfaces here

### Motion — CSS only, high impact
- Use `IntersectionObserver` + CSS class toggling for scroll-reveals
- Stagger reveals with `animation-delay` (0.1s increments)
- Fade-up on headlines, fade-in on body text, slide-in on nav items
- One well-orchestrated page load beats scattered micro-interactions
- Never use GSAP, Framer Motion, or animation libraries unless explicitly asked

### Layout — asymmetry and depth
- Avoid centred, symmetrical layouts — they read as generic
- Use asymmetric grid: large headline left, body text right, or vice versa
- Overlap elements where it adds depth (e.g. large display text bleeding behind a content block)
- Use generous negative space — don't fill every gap
- Diagonal flow and grid-breaking elements are encouraged

### Depth and atmosphere
- Every page has a texture background — never a flat colour
- Layer: texture → multiply scrim → vignette → grain overlay → content
- Add subtle CSS grain overlay (`background-image: url("data:image/svg+xml...")`) on top of everything
- Use `mix-blend-mode: multiply` on scrims
- Shadows should feel warm and directional, never cold or diffuse

### Typography
- Display text (Lilita One) should be LARGE — at least 80px on desktop for hero headlines
- Let type breathe — generous line-height and letter spacing
- Body text (Baloo 2) at 16–18px, weight 400, line-height 1.7
- Labels and eyebrows: Baloo 2, 11–12px, weight 600, uppercase, 0.2em letter-spacing
- Caveat only for signatures and handwritten moments

### What to never do
- Never use Inter, Roboto, Arial, or system fonts
- Never use flat colour backgrounds (texture is mandatory)
- Never use purple gradients, blue tones, or cool greys
- Never use drop shadows or glows on the logo
- Never centre-align everything — it kills the editorial feel
- Never add emoji
- Never use generic card layouts with white backgrounds and border-radius shadows

---

## 6 · Shared components — same on every page

### Logo
```html
<a href="index.html" class="navi-logo">
  <img src="brand/assets/logo-navi-firstlight.png" alt="House of Navi" height="48">
</a>
```
- Top-left, 24px from edges
- Always `logo-navi-firstlight.png` on textured/dark grounds

### Navigation
```html
<nav class="navi-nav">
  <a href="index.html" class="navi-nav-link">Landing</a>
  <a href="projects.html" class="navi-nav-link">Projects</a>
  <a href="get-involved.html" class="navi-nav-link">Get Involved</a>
  <a href="about.html" class="navi-nav-link">About</a>
  <a href="contact.html" class="navi-nav-link">Contact</a>
</nav>
```
- Top-right
- Uppercase, caption style (11px, 0.2em tracking)
- Current page underlined
- Colour: `#F5DDD5` (First Light), opacity 0.6 on inactive links

### Support pill
```html
<a href="get-involved.html#donate" class="navi-pill">
  <span class="navi-pill__heart">♥</span> Support
</a>
```
- Fixed, bottom-right, 24px from edges
- Cream fill (`#EDE3D0`), dark text (`#280800`)
- Hover: lifts 1px, shadow deepens
- Always visible on every page

### Texture stack (every page)
```html
<div class="texture-stack">
  <div class="texture" style="background-image: url('brand/assets/textures/TEXTURE-FILE-HERE')"></div>
  <div class="scrim"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
  <main><!-- page content --></main>
</div>
```

```css
.texture-stack { position: fixed; inset: 0; }
.texture { position: absolute; inset: 0; background-size: cover; background-position: center; }
.scrim { position: absolute; inset: 0; background: rgba(20, 4, 0, 0.55); mix-blend-mode: multiply; }
.vignette { position: absolute; inset: 0; background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, rgba(15,4,0,0.55) 100%); mix-blend-mode: multiply; }
.grain { position: absolute; inset: 0; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px; }
main { position: relative; z-index: 10; }
```

---

## 7 · CSS design tokens — use these everywhere

```css
:root {
  /* Colours */
  --navi-first-light:        #F5DDD5;
  --navi-clay-cream:         #EDE3D0;
  --navi-blood-dune:         #6B1A0E;
  --navi-midnight-dune:      #280800;
  --navi-warm-sand:          #DDD0B8;
  --navi-original-terracotta:#9B4420;
  --navi-sunlit-face:        #B85040;
  --navi-mid-dune:           #D9907A;
  --navi-pale-herb:          #C8DECA;
  --navi-pale-mist:          #F2EEF7;

  /* Typography */
  --ff-display: 'Lilita One', cursive;
  --ff-body:    'Baloo 2', sans-serif;
  --ff-script:  'Caveat', cursive;

  /* Type scale */
  --fs-display-xl: clamp(80px, 10vw, 152px);
  --fs-display-l:  clamp(60px, 8vw, 124px);
  --fs-display-m:  clamp(48px, 6vw, 96px);
  --fs-h1:         clamp(36px, 4vw, 56px);
  --fs-h2:         clamp(28px, 3vw, 40px);
  --fs-h3:         28px;
  --fs-body-lg:    18px;
  --fs-body:       16px;
  --fs-cap:        12px;

  /* Spacing */
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  24px;
  --space-lg:  48px;
  --space-xl:  80px;
  --space-2xl: 120px;
}
```

---

## 8 · Copy — use this exactly, do not paraphrase

### Landing page
- Hero: **HOUSE OF NAVI**
- Tagline: A SPOTLIGHT · NOT A SOLUTION
- Footer left: EST · MMXXIV — SOUTH LUANGWA

### Projects page
- Eyebrow: THE WORK
- H1: Projects
- Intro: "Carefully curated, locally led. Each project is a person, a place, and a quiet promise to show up — for as long as it takes."
- Project 01: **Mkasanga Community Clinic** · Healthcare · South Luangwa · Zambia · "A community-built clinic on the edge of the wild. Six to eight hours from the nearest hospital, cut off entirely during the rains — and already half-built by the people who need it."
- Project 02: **Lower Zambezi Schools** · Education · Lower Zambezi · Zambia · "A network of village schools led by local teachers, supported by the wildlife concessions whose livelihoods depend on the river that runs past every classroom."
- Project 03: **Black Rhino Expansion** · Conservation · KwaZulu-Natal · South Africa · "Returning the black rhino to ancestral range, hand-in-hand with the communities that live alongside them. Conservation and community — the same conversation."

### Get Involved page
- Eyebrow: GET INVOLVED
- H1: Walk with us.
- Tagline: A SPOTLIGHT · NOT A SOLUTION
- I · **Donate** — "Direct, transparent funding to the projects we walk with. No middle layer, no overhead skim — every contribution carries a name, a place, a thank-you." CTA: WALK WITH US →
- II · **Partner** — "Whether you're a brand, foundation, photographer, or fellow non-profit — there is almost always a way to multiply what we can do together. Tell us yours." CTA: START THE CONVERSATION →
- III · **Spread the word** — "A spotlight only works when it's pointed somewhere. Share a story, send a film, post a photo, or simply tell one person about the people doing this work." CTA: SEE THE STORIES →
- Footer: THREE WAYS IN · PICK WHICHEVER FITS

### About page
- Eyebrow: ABOUT
- H1 (large, left): "We arrive with a spotlight, *not a solution.*"
- Tagline: THE NAVI PROMISE
- Body (right column): "House of Navi is a South African non-profit shining a light on carefully curated local projects across the continent — and connecting them to the donors, storytellers and changemakers who can help carry them forward. We don't lead with statistics. We lead with the people on the ground, and the work already in motion, and we let the rest of the world catch up. Stories first. Funding follows. Conservation and community are not separate conversations. They are the same one — and we will keep listening for as long as it takes."
- Signature: *— the House of Navi team*
- Footer left: FOUNDED 2024 · CAPE TOWN, SOUTH AFRICA
- Footer right: House of Navi · est. MMXXIV

### Contact page
- Eyebrow: CONTACT
- H1: Say hello.
- Body: "Whether you're a donor, a fellow non-profit, a photographer with time to give, or a stranger who simply wants to know more — we'd love to hear from you."
- Tagline: STORIES FIRST · FUNDING FOLLOWS
- Footer: THE DOOR IS OPEN
- Top right: S 33°55' · E 18°25'
- Contacts:
  - GENERAL → hello@houseofnavi.org
  - PARTNERSHIPS → partners@houseofnavi.org
  - PRESS → press@houseofnavi.org
  - POST → Studio 4, 24 Bree St · Cape Town · 8001
  - IN MOTION → @houseofnavi · Instagram

---

## 9 · Quality gates — check before marking any page done

- [ ] Zero console errors
- [ ] Zero 404s (all assets loading)
- [ ] Logo loads from `brand/assets/logo-navi-firstlight.png`
- [ ] Correct texture loads per page
- [ ] Scrim + vignette + grain all present
- [ ] Lilita One rendering in all display text
- [ ] Baloo 2 rendering in all body text
- [ ] Support pill visible and fixed bottom-right
- [ ] Nav present with correct current-page underline
- [ ] Scroll-reveal animations firing
- [ ] Fully responsive — test at 390px (mobile) and 1440px (desktop)
- [ ] No flat white backgrounds anywhere
- [ ] No generic fonts anywhere

---

## 10 · How to start a fresh build

Paste this as your first message in every new Claude Code session:

> "Read CLAUDE.md, BRAND.md, and SKILL.md in full. Summarise the key rules from each. Then tell me which assets you can confirm exist in brand/assets/. Do not write any code until I confirm you have read everything correctly."
