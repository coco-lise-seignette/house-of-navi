# BRAND.md — House of Navi Visual Identity
# This is the visual law. Every design decision must comply with it.
# Version 1.0 · May 2026

---

## Brand position in one sentence

House of Navi is a cinematic, earth-first, artisan non-profit — not a corporate charity.

**References:** Namibian red dunes · Moroccan clay · Latin American craft culture · hand-pressed letterpress type · ceramic vessels · documentary film.
**Never:** digital-native · corporate · cold · gradient-heavy · stock-photo · emoji-driven.
**Always:** organic · cinematic · documentary · made by a person with their hands.

---

## Logo

**Primary file:** `brand/assets/logo-navi-firstlight.png`
**Use this logo on:** all textured/dark page backgrounds (every page on this site).

**Other variants (do not use unless specified):**
- `logo-navi-sossusvlei-red.png` — on cream/light grounds
- `logo-navi-midnight-dune.png` — dark variant
- `logo-navi-fired-clay.png` — fired clay
- `logo-navi-pale-herb.png` — rare, dark grounds only

**Logo rules (non-negotiable):**
- Always sits on a transparent background — never inside a block, panel, chip, or badge
- Never stretched, re-drawn, or distorted
- Never with drop-shadow, glow, or gradient effects
- Clear space: ≥ 1× cap-height of letter H on every side
- Minimum digital size: 88px wide
- Position: top-left of every page, 24px from edges

```html
<!-- Correct logo usage on every page -->
<a href="index.html" class="navi-logo">
  <img src="brand/assets/logo-navi-firstlight.png" alt="House of Navi" height="48">
</a>
```

---

## Colour

### Primary palette — use these on every page

| Token | Hex | Role |
|---|---|---|
| `--navi-first-light` | `#F5DDD5` | **All type on dark/textured grounds.** Logo on dark. Default text colour. |
| `--navi-clay-cream` | `#EDE3D0` | Default light ground. The canvas. Support pill fill. |
| `--navi-blood-dune` | `#6B1A0E` | **Identity colour.** CTAs, Support pill text, headlines on cream. |
| `--navi-midnight-dune` | `#280800` | Dark mode ground. Page background fallback. |
| `--navi-warm-sand` | `#DDD0B8` | Muted metadata, dates, numerals like № 02. |

### Supporting palette — use sparingly

| Token | Hex | Role |
|---|---|---|
| `--navi-original-terracotta` | `#9B4420` | Secondary headlines · accent panels |
| `--navi-sunlit-face` | `#B85040` | Warm red mid-tone · accent type on cream |
| `--navi-mid-dune` | `#D9907A` | **Highlight words in body copy** — e.g. "not a solution" |
| `--navi-pale-mist` | `#F2EEF7` | Flair only. Soft cool panels. Never dominant. |
| `--navi-pale-herb` | `#C8DECA` | Environment/conservation content only. |

### Colour rules
- Maximum three supporting colours on a single screen
- First Light leads on dark. Blood Dune is the identity. Clay Cream is the canvas.
- Mid Dune highlights specific words in body copy — not entire paragraphs
- Never: pure black (#000), cool grey, blue tones, purple

---

## Typography

### Fonts (load from Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Baloo+2:wght@400;500;600;700;800&family=Caveat:wght@400;600&display=swap" rel="stylesheet">
```

### Font roles

**Lilita One** — Display. The brand's voice. Hand-pressed, generous weight.
- Use for: page titles, hero quotes, all display/H1 text
- Minimum: 40px. Prefer 80px+ for heroes.
- Letter spacing: −0.005em at display sizes
- Weight: 400 only (it's a single-weight font)

**Baloo 2** — Body. Friendly, rounded, human.
- Use for: paragraphs, captions, UI labels, nav, eyebrows
- Weights: 400 (body), 500 (UI), 600 (caps/labels), 700–800 (emphasis)

**Caveat** — Script. Rare, deliberate.
- Use for: signatures only (e.g. "— the House of Navi team")
- Never for headlines, body copy, or UI

### Type scale
```css
--fs-display-xl: clamp(80px, 10vw, 152px);  /* Contact hero "Say hello." */
--fs-display-l:  clamp(60px, 8vw, 124px);   /* Page title heroes */
--fs-display-m:  clamp(48px, 6vw, 96px);    /* Manifesto / About headline */
--fs-h1:         clamp(36px, 4vw, 56px);    /* Sub-hero */
--fs-h2:         clamp(28px, 3vw, 40px);    /* Section titles */
--fs-h3:         28px;                       /* Card titles */
--fs-body-lg:    18px;                       /* Lede paragraphs */
--fs-body:       16px;                       /* Default body */
--fs-cap:        12px;                       /* Eyebrows — uppercase, 0.32em tracking */
```

---

## Textures — the backbone of every page

Every page has a full-bleed natural texture. Never a flat colour background.

| Page | Texture file | Mood |
|---|---|---|
| Landing (index.html) | `texture-terracotta.png` | Fired clay — warm, foundational |
| Projects | `texture-elephant-warm.jpg` | Warm brown skin — editorial, grounded |
| Get Involved | `texture-tree-roots.jpg` | Roots — organic, action |
| About | `texture-knuckles.jpg` | Dark bark — deep, honest |
| Contact | `texture-croc.jpg` | Croc skin olive — quiet, open |

### Texture scrim recipe (mandatory on every page)
```css
.texture-stack {
  position: fixed;
  inset: 0;
}
.texture-stack .texture {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.texture-stack .scrim {
  position: absolute;
  inset: 0;
  background: rgba(20, 4, 0, 0.55);
  mix-blend-mode: multiply;
}
.texture-stack .vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 90% 70% at 50% 50%, transparent 35%, rgba(15,4,0,0.55) 100%);
  mix-blend-mode: multiply;
}
```

Scrim opacity range: **0.42 – 0.68** depending on texture lightness. Adjust so First Light type is always legible.

### Texture rules
- Never use a texture without a scrim overlay
- Never crop so the source (elephant, bark, root) is obviously literal — keep it abstract
- Never tile — always full-bleed cover
- Never use a texture as a card background or panel — only as full-page background

---

## Components

### Support pill (primary CTA — appears on every page)

Fixed position, bottom-right, 24px from edges. Never hidden. Never moves.

```html
<a href="get-involved.html#donate" class="navi-pill">
  <span class="navi-pill__heart">♥</span>
  Support
</a>
```

```css
.navi-pill {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: var(--navi-clay-cream);
  color: var(--navi-blood-dune);
  font-family: var(--ff-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: 100px;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 20px rgba(40, 8, 0, 0.3);
}
.navi-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 32px rgba(40, 8, 0, 0.4);
}
.navi-pill__heart {
  color: var(--navi-blood-dune);
  font-size: 13px;
}
```

### Navigation

```css
.navi-nav {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  gap: 32px;
  align-items: center;
}
.navi-nav-link {
  font-family: var(--ff-body);
  font-size: var(--fs-cap);
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--navi-first-light);
  opacity: 0.6;
  text-decoration: none;
  transition: opacity 0.2s;
}
.navi-nav-link:hover,
.navi-nav-link.is-current {
  opacity: 1;
}
.navi-nav-link.is-current {
  text-decoration: underline;
  text-underline-offset: 4px;
}
```

### Tagline ornament

```html
<div class="navi-tagline">A SPOTLIGHT · NOT A SOLUTION</div>
```

```css
.navi-tagline {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--ff-body);
  font-size: var(--fs-cap);
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--navi-first-light);
  opacity: 0.5;
}
.navi-tagline::before,
.navi-tagline::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--navi-first-light);
  opacity: 0.3;
  max-width: 60px;
}
```

---

## Iconography

SVG icons live in `brand/assets/icons/`. Eight glyphs: sun · eye · vessel · bird · seed · dunes · earth · flag.

**Project assignments:**
- Mkasanga Clinic → vessel
- Lower Zambezi Schools → bird
- Black Rhino Expansion → earth

**Display rules:**
- Stroke: 1.6px, rounded caps and joins
- Sizes: 24 / 48 / 88 / 110px
- Colour: First Light on dark, Blood Dune on cream
- Never combine with emoji or third-party icon sets

---

## Photography direction

- **Documentary, never staged.** Real people, real light, real moments.
- **Golden hour, blue hour, weather** as a subject. Natural light only.
- **Black-and-white:** project pages only, for human portraits.
- **Never:** drone shots, lens flares, HDR, stock smiles, safari-brochure wildlife clichés.
- **Composition:** breathing room, one subject per frame, text overlays only on frames with negative space.

---

## Tone of voice

**Words we own:**
- "A spotlight, not a solution"
- "Stories first, funding follows"
- "Walk with us"
- "The work"
- "Listening"
- "In motion"

**Words we ban:**
- Empower / empowering
- Vulnerable communities
- Giving back
- Making a difference
- Impactful / impactful solutions
- Sustainable development
- Holistic approach
- Any NGO buzzword that could appear in any charity's brochure

**Voice:**
- Specific, not vague. Name the place, the person, the number.
- Patient, not urgent. We don't beg. We invite.
- Cinematic, not corporate. Write like a documentary filmmaker, not a fundraiser.
- Human, not institutional. First person plural (we/our) always.

---

*House of Navi · BRAND.md v1.0 · May 2026 · NPC 2026/246813/08 · hello@houseofnavi.org*
