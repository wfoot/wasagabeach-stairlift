# Wasaga Beach Stairlift website

Plain HTML, CSS and a small progressive-enhancement script. No build step. Opens offline by double-clicking `index.html`.

## View it
- Double-click any `.html` file, or use the VS Code Live Server extension for auto-refresh.
- Works fully offline. Fonts (Lexend + Source Sans 3) are self-hosted in `/fonts`.

## Files
- `index.html` — homepage (video hero, staircase chooser, feature showcase, straight + curved lineups, gallery, why us, testimonials, booking form)
- `straight-stairlifts.html` — straight lift landing page (K2, K2 Plus, Handicare 1000, Handicare 1100)
- `curved-stairlifts.html` — curved lift landing page (Stairfriend 23, Handicare 4000, Freecurve)
- `bathrooms.html` — Quick Tub bathtub conversion page (Walk-Thru Insert + Cap; Narrow/Wide/Xtra-Deep sizes; its form's select asks "What can we help with?")
- `styles.css` — the whole design system (navy palette, type, layout, light + dark modes)
- `script.js` — scroll reveals and header shadow; the site is fully usable without it
- `fonts/` — self-hosted web fonts
- `images/` — photos and the hero video, all wired in
- `source-photos/` — unused original uploads, kept for reference; safe to exclude from deploys

## Photo map (which image shows what)
| File | Content | Used for |
|---|---|---|
| `hero.webm` | product video | hero background on all three pages |
| `hero.webp` | close-up of seat, belt and controls on dark stairs | homepage hero poster |
| `compare-staircases.webp` | side-by-side straight vs curved | "Which staircase do you have?" strip |
| `straight-lady.webp` | woman seated on lift, carpeted stairs | assessment bands, straight hero poster, galleries |
| `straight.webp` | beige lift, dark wood staircase | K2 Plus card |
| `outdoor-garden.webp` | lift on outdoor garden steps | Handicare 1000 card |
| `folded-door.webp` | lift folded beside a white door | Handicare 1100 card |
| `straight-highend.webp` | cream lift folded at stair foot | Quality tile, galleries |
| `straight-closeup.webp` | beige lift on golden-oak staircase | K2 card, Choice tile, galleries |
| `curved-dual-rail.webp` | woman beside twin-rail curved lift | Stairfriend 23 card, curved hero poster |
| `curved-outside.webp` | twin-rail curved lift, outdoor stone steps | Handicare 4000 card, cross-links |
| `freecurve final.jpg` | cream single-tube Freecurve at a curved black staircase | Freecurve card, Safety tile, galleries |
| `Single-rail-stairlift-for-curved-stairs-custom-made (2).jpg` | black-seat single-rail lift by carpeted curved stairs | homepage gallery |
| `freecurve.png` | old crop from the comparison photo | unused, safe to delete |
| `assessment.webp` | specialist photo-measuring stairs | Photo-measure tile, assessment bands |
| `bath-insert-open.jpg` | tub with walk-thru insert open, tiled bathroom | Bathrooms hero, Insert card, gallery |
| `bath-cap-closed.jpg` | same tub with cap closed, chrome handles | Cap card, bath-night split, gallery |
| `bath-relaxing.jpg` | woman in a full bath with cap in place | bath-night split, gallery |
| `bath-step-problem.jpg` | person stepping over a high tub wall | problem split, gallery |
| `bath-before.jpg` | standard tub, tall wall (before conversion) | problem split, gallery |
| `bath-after.jpg` | same tub with walk-thru opening (after) | problem split, homepage gallery |
| `bath-size-narrow.jpg` | Narrow insert product shot | sizes cards, gallery |
| `bath-size-wide.jpg` | Wide insert product shot | sizes cards, gallery |
| `bath-size-xtradeep.jpg` | Xtra-Deep insert product shot | sizes cards, gallery |

To swap any photo, drop a new file in `images/` with the same name, or change that `<img>`'s `src`.

## Before you publish — confirm these
1. **Model lineup** — product cards name K2, K2 Plus, Handicare 1000/1100, Stairfriend 23, Handicare 4000 and Freecurve. Confirm these match what you actually stock.
2. **Reviews** — the homepage shows six real Google reviews of Silver Cross Grey Bruce, transcribed verbatim, with a "Read all our reviews" link to the Google profile. Keep quotes word-for-word when rotating in new ones, and update the "5.0 from 18 reviews" line as the count grows.
3. **Domain** — built for `wasagabeachstairlift.ca`. If that changes, update each page's `<link rel="canonical">` and the schema `url`/`image` fields.

Note: the site deliberately shows **no pricing** — quotes come from the free in-home assessment.

## Form handling
The booking form on all three pages sends through Formspree (endpoint `f/xeebwbpz`) and emails
submissions to the account address. Submissions also appear in the Formspree dashboard as a backup.
A hidden `_gotcha` field filters spam bots, and `script.js` shows an on-page thank-you after sending;
without JavaScript the form falls back to Formspree's hosted thank-you page. To change where it sends,
replace the endpoint in each page's `<form action="...">`.

## SEO layer
- Every page has Open Graph / Twitter-card tags (share previews) and an extensionless canonical URL.
- The homepage has a visible FAQ section with matching FAQPage schema, plus the LocalBusiness schema.
- The deploy repo includes `robots.txt` and `sitemap.xml`; internal links there are extensionless
  (`/straight-stairlifts` instead of `.html` — GitHub Pages and Cloudflare Pages serve these automatically).
  This working copy keeps `.html` links so the site still opens by double-clicking `index.html`.

## Design notes
- One deep-navy accent (`#2c4a6e` / `#1b2f47`), locked across the page. No green, no orange.
- Video-first hero with a photo poster fallback; reduced-motion users get the still photo.
- Scroll reveals are progressive enhancement: no JS, reduced motion, and print all get fully visible content.
- Form controls are pinned to light scheme so dark-mode users can read what they type.
- Light and dark modes both defined; large readable type; visible keyboard focus everywhere, including on navy bands.
- The nav order (Straight / Curved / Why us / Book) and the booking form layout are deliberate — keep them.

## Deploy (later)
Drag this folder into Cloudflare Pages, or push to a Git repo and connect it. HTTPS is automatic. `source-photos/` can be excluded.
