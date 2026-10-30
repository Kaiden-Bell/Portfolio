---
name: Kaiden Bell
description: A personal portfolio printed as a magazine, The Bone Issue, with Kaiden as the cover star and the work screened as a reel of posters.
colors:
  graphite-ink: "oklch(0.21 0.006 75)"
  graphite-lift: "oklch(0.26 0.008 75)"
  graphite-rule: "oklch(0.33 0.01 75)"
  poster-stock: "oklch(0.27 0.009 75)"
  bone-stock: "oklch(0.95 0.014 85)"
  bone-dim: "oklch(0.78 0.016 85)"
  lit-stock: "oklch(0.97 0.01 85)"
  leaf-gold: "oklch(0.79 0.14 82)"
  burnished-gold: "oklch(0.52 0.1 72)"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "min(17.6vw, 28svh)"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 62"
  poster-title:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "min(20cqi, calc(158cqi / longest-word-length))"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  story-title:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "min(15cqi, 13svh)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, min(3.9vw, 7svh), 3.9rem)"
    fontWeight: 900
    lineHeight: 0.86
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.35rem, min(2.1vw, 3.6svh), 2rem)"
    fontWeight: 900
    lineHeight: 0.95
    fontVariation: "'wdth' 62"
  standfirst:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(0.875rem, 1vw, 0.9375rem)"
    fontWeight: 500
    lineHeight: 1.4
  body-long:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(0.9375rem, 1.05vw, 1rem)"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 800
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 112"
  label-small:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.7
    letterSpacing: "0.06em"
  data:
    fontFamily: "'Martian Mono Variable', 'Martian Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "0.625rem"
    letterSpacing: "0.02em"
  spine:
    fontFamily: "'Dela Gothic One', 'Hiragino Kaku Gothic StdN', 'Yu Gothic', sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.9rem)"
    lineHeight: 1
    letterSpacing: "0.08em"
  spine-compact:
    fontFamily: "'Dela Gothic One', 'Hiragino Kaku Gothic StdN', 'Yu Gothic', sans-serif"
    fontSize: "1.9rem"
    lineHeight: 1
    letterSpacing: "0.08em"
  seal-year:
    fontFamily: "'Archivo Variable', 'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "80px"
    fontWeight: 900
    fontVariation: "'wdth' 62"
rounded:
  none: "0"
  round: "50%"
spacing:
  gutter: "clamp(1rem, 3vw, 2.75rem)"
  spine: "clamp(2.5rem, 5vw, 4.5rem)"
  column-gap: "clamp(0.75rem, 1.6vw, 1.75rem)"
  line-gap: "clamp(0.55rem, 1.6svh, 1.1rem)"
  section-gap: "clamp(3rem, 10svh, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.bone-stock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.55rem 0.55rem 1.25rem"
  button-primary-inverse:
    backgroundColor: "{colors.bone-stock}"
    textColor: "{colors.graphite-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.55rem 0.55rem 0.55rem 1.25rem"
  button-primary-arrow-chip:
    backgroundColor: "{colors.leaf-gold}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.none}"
    size: "2.4rem"
  nav-link:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.label}"
  nav-link-on-ink:
    textColor: "{colors.bone-stock}"
    typography: "{typography.label}"
  cover-line-title:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.title}"
  cover-line-body:
    textColor: "{colors.graphite-ink}"
    typography: "{typography.body}"
  seal:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.bone-stock}"
    rounded: "{rounded.round}"
    width: "clamp(7rem, 10vw, 9.5rem)"
  barcode:
    backgroundColor: "{colors.bone-stock}"
    textColor: "{colors.graphite-ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.6rem 0.35rem"
  barcode-hover:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.bone-stock}"
  spine:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.leaf-gold}"
    typography: "{typography.spine}"
    width: "{spacing.spine}"
  spine-on-ink:
    backgroundColor: "{colors.graphite-lift}"
    textColor: "{colors.leaf-gold}"
    typography: "{typography.spine}"
    width: "{spacing.spine}"
  poster:
    backgroundColor: "{colors.poster-stock}"
    textColor: "{colors.bone-stock}"
    rounded: "{rounded.none}"
    aspectRatio: "2 / 3"
  title-plate:
    textColor: "{colors.bone-stock}"
    typography: "{typography.poster-title}"
  explore-chip:
    backgroundColor: "{colors.leaf-gold}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.none}"
    size: "2.1rem"
  reel-caption:
    textColor: "{colors.bone-dim}"
    typography: "{typography.label-small}"
  story-spread:
    backgroundColor: "{colors.bone-stock}"
    textColor: "{colors.graphite-ink}"
    typography: "{typography.body-long}"
    rounded: "{rounded.none}"
  index-row:
    textColor: "{colors.bone-stock}"
    typography: "{typography.title}"
---

# Design System: Kaiden Bell

## Overview

**Creative North Star: "The Bone Issue"**

The site is a printed magazine and Kaiden is the cover star. The home page is the **cover**: the masthead carries the name across the full width, a backlit cut-out portrait stands in front of it, and the projects are cover lines, not cards. Everything is set as if for print: uncoated off-white stock with a visible grain, charcoal ink, one charcoal spine bound down the left edge, and gold used the way a printer uses a spot foil, in small, deliberate places.

The cover is dense and fits one viewport (100svh from 1280x720 upward). Typography does the work that boxes and cards would do elsewhere: very condensed heavy Archivo for anything that shouts, Archivo at normal width for reading, wide Archivo for labels, and Martian Mono only for machine data. Rules are 2px lines, corners are square, and the only round things are the class seal and the dot separators. The cover is close to still: the figure arrives once on load, and the one signature interaction is a gold highlighter swipe under a cover-line title.

The **Work page** is the same issue turned to its inside spread and printed in reverse: Graphite Ink stock with Bone Stock type, the screening room of the magazine. The projects are a reel of film posters on a WebGL "molten ring": the page scroll turns the ring, one poster at a time squares up to the viewer at about 70% of the screen height, and its title is set over the art in the cover's condensed type. Opening the front poster prints its story as a Bone Stock feature spread over the reel. This is the one place on the site where motion is the content, and it is still held to one curve, one gesture (scroll) and a renderer that stops when nothing moves.

The system rejects the developer-portfolio default of a centred headline, subtitle and a row of project cards.

**Key Characteristics:**
- Two stocks, one press: Bone Stock with multiply grain on the cover and in the story spread; Graphite Ink with Bone type on the Work page.
- One spine down the left edge of every page carrying the name in gold katakana.
- Archivo at 62% width and 900 weight for masthead, lead, cover-line titles, poster titles and story titles.
- Gold is spot colour only: spine katakana, highlighter swipes, the seal's numerals and ring, arrow chips, dot separators, the keyboard focus ring on Graphite Ink.
- Square corners; 2px rules (Graphite Ink on bone, Bone Stock on ink); one round seal, tilted.
- The cover is still; the Work reel moves only when scrolled, hovered or opened.

## Colors

Two inks on one stock, with a single metallic spot: charcoal and off-white carry every surface, gold only marks. The Work page swaps which one is the paper.

### Primary
- **Leaf Gold** (oklch(0.79 0.14 82)): the spot colour. Spine katakana, the static highlighter under the lead's closing phrase, the hover/focus swipe under cover-line titles, nav links and text links, the seal's '27 numerals and inner ring, the CTA and Explore arrow chips, the dot separators in the stack index, and text selection. On Graphite Ink it also carries the keyboard focus ring. Never a fill for a page, section or panel.

### Neutral
- **Graphite Ink** (oklch(0.21 0.006 75)): all type and rules on Bone Stock, the cover's spine, the CTA body, the seal disc, barcode bars and focus rings on Bone Stock. The paper of the Work page and the browser body behind the cover.
- **Graphite Lift** (oklch(0.26 0.008 75)): the spine on the Work page, a half step off the page ink so the band still reads as bound.
- **Graphite Rule** (oklch(0.33 0.01 75)): 1px row rules in the Work index, and the colour of the ring's loading silhouette before the posters decode.
- **Poster Stock** (oklch(0.27 0.009 75), lit to oklch(0.33 0.01 75) by a 90% x 55% radial at 50% 28%): the ground of every generated poster, lifted off the page ink so the posters read as objects in the dark.
- **Bone Stock** (oklch(0.95 0.014 85)): the cover's paper and the story spread; on the Work page, all primary type, the 2px rules and the inverse CTA block.
- **Bone Dim** (oklch(0.78 0.016 85)): secondary type on Graphite Ink only: the Work deck, reel captions, index numbers and categories, poster billing.
- **Lit Stock** (oklch(0.97 0.01 85)): only as the soft radial light on Bone Stock (cover: 80% x 70% at 55% 55%; story spread: 80% x 70% at 55% 45%; both fading out by 75%).
- **Burnished Gold** (oklch(0.52 0.1 72)): the browser scrollbar thumb only, on a Graphite Ink track. Not used on the page itself.

### Named Rules
**The Two Inks Rule.** Graphite Ink and Bone Stock, and their ranges, carry every surface. Leaf Gold is an accent only and never fills a page or a section. If gold covers more than a chip, a stroke or a swipe, it is wrong.

**The Reversed Stock Rule.** A page printed on Graphite Ink swaps the inks and nothing else: Bone Stock for type and 2px rules, Bone Dim for secondary text, gold still only a spot. It never introduces a third surface colour or a gradient fill.

**The Focus Follows the Stock Rule.** On Bone Stock, focus rings are Graphite Ink (2px, 3px offset); Leaf Gold fails 3:1 against Bone Stock, so it never carries focus there. On Graphite Ink, focus rings are Leaf Gold (2px, 3px offset; the reel stage uses a -2px inset). The story spread is Bone Stock, so focus inside it is Graphite Ink again.

## Typography

**Display Font:** Archivo Variable (with Archivo, Helvetica Neue, Arial), driven on its width axis
**Body Font:** Archivo Variable at 100% width
**Label/Mono Font:** Martian Mono Variable (with ui-monospace, SFMono-Regular, Menlo), data only
**Spine Face:** Dela Gothic One, Japanese subset, for the katakana name only

**Character:** One family stretched across its width axis does almost all the work: crushed to 62% for headlines that read like cover type, opened to 112% for small uppercase labels that read like a magazine's running head. Mono appears only where the content is literally machine text.

### Hierarchy
- **Display** (900, 62% width, min(17.6vw, 28svh), line-height 0.8, -0.02em, uppercase): the cover masthead (single line, centred, word-spacing 0.16em) and the Work page masthead (left-aligned). Wraps at 31vw on mobile.
- **Poster title** (900, 62% width, min(20cqi, 158cqi ÷ longest word's letters), line-height 0.82, -0.01em, uppercase, balanced): the project name over the front poster, sized to the poster's width so its longest word never leaves the art.
- **Story title** (900, 62% width, min(15cqi, 13svh) of the copy column, line-height 0.82, uppercase, balanced): the project name in the story spread.
- **Headline** (900, 62% width, clamp(2rem, min(3.9vw, 7svh), 3.9rem), line-height 0.86, uppercase): the cover's lead line and the Work page's section heads (Index). 12vw on mobile for the cover lead.
- **Title** (900, 62% width, clamp(1.35rem, min(2.1vw, 3.6svh), 2rem), line-height 0.95, uppercase): cover-line titles, index rows and the reel's index numeral. The '27 seal numerals use the same face and width at 80px in the seal's 200-unit viewBox.
- **Standfirst** (600, clamp(1.05rem, 1.4vw, 1.25rem), line-height 1.35, max 34ch): the one-sentence line under a story title.
- **Body** (500, clamp(0.875rem, 1vw, 0.9375rem), line-height 1.35 to 1.4, sentence case): decks, cover-line copy and the poster line. Decks max 34ch; right-hand cover lines max 22ch.
- **Body long** (500, clamp(0.9375rem, 1.05vw, 1rem), line-height 1.5, max 58ch): story paragraphs, the only long reading on the site.
- **Label** (800, 112% width, 0.8125rem, 0.08em, uppercase): nav, dateline, story section heads, story meta, Close, Explore project, index links. The CTA uses the same treatment at 0.875rem and 0.06em.
- **Label small** (700, 100% width, 0.6875rem, 0.06em, uppercase, line-height 1.7): the stack index, reel captions (category, year, "/ 05"), index numbers and categories.
- **Data** (Martian Mono, 0.625rem, 0.02em): the barcode's URL caption. URLs, handles, cron strings and coordinates only, including those printed inside posters.

### Named Rules
**The Narrow Shout Rule.** Anything set to be read from across a room (mastheads, lead, cover-line titles, poster and story titles, index names, seal numerals) is Archivo 900 at 62% width, uppercase. Nothing else uses that width.

**The Mono Is Data Rule.** Martian Mono only sets machine text: URLs, handles, coordinates, cron strings. Never labels, never headings.

## Layout

### Cover
A 13-column cover grid: one fixed spine column (clamp(2.5rem, 5vw, 4.5rem)) then 12 equal columns, with clamp(0.75rem, 1.6vw, 1.75rem) column gaps and a right gutter of clamp(1rem, 3vw, 2.75rem). Rows run nav bar, masthead, cover lines (1fr), footer. The cover is min-height 100svh with overflow hidden and is built to fit one viewport at 1280x720 and up; vertical sizes use svh-capped clamps so short screens compress rather than scroll.

Layering is z-ordered like a print cover: masthead behind the figure, figure (about 90svh tall, centred at 55%) overlapping the masthead's lower edge, cover lines and seal in front, grain over everything. Cover lines sit left (columns 2 to 4, left-aligned, opened by the lead, deck and a 2px rule) and right (columns 10 to 13, right-aligned, dropped lower). The footer holds the CTA, the stack index and the barcode on one baseline.

Content yields in a fixed order as space shrinks: the stack index disappears at or below 1360px wide or 820px tall; below 780px tall the third left cover line yields. At 860px and below the grid collapses to a 2.6rem spine plus one column, and everything flows: masthead wraps, the figure enters the flow with a 2px rule under it, cover lines stack, the dateline is dropped, and the seal pins near the top right.

### Work page
The same spine column and gutters, then a single column that scrolls in four movements:
1. **Head:** the nav bar over a 2px Bone Stock rule, then the "Work" masthead left with the deck bottom-right (34ch, Bone Dim).
2. **Reel:** a section `count × 100svh` tall holding a sticky 100svh stage, so each project owns exactly one viewport of scroll. The front poster is centred on the stage at 2:3, about 70% of the stage height (its width capped at 78% of the stage on narrow screens). The ring's radius is the larger of 1.25 stage widths and 2.6 poster heights, so neighbours tilt by the same ~24° on a phone as on a laptop; centres sit 1.22 poster heights apart along the arc, so the neighbours show only as slivers top and bottom. Captions flank the poster at mid-height (index left at clamp(1rem, 4vw, 3.5rem), category and year right at the gutter); at 860px and below they move to the top corners.
3. **Index:** a Headline-scale "Index" over a 2px Bone Stock rule and one row per project (grid 3rem / 1.4fr / 1fr / 8rem: number, name, category and year, links), rows ruled in 1px Graphite Rule. At 860px and below the row stacks into a 2.25rem number column and one text column.
4. **Foot:** the inverse CTA and a GitHub text link on one line.

The page uses `scroll-snap-type: y proximity` with snap points at the nav bar, at each poster, and at the index, so a settled scroll lands square on a poster and proximity never holds anyone at either end of the reel. Sections are separated by clamp(3rem, 10svh, 6rem).

## Elevation & Depth

Depth comes from print layering (masthead behind figure, seal on the figure's shoulder, title plate over poster, story spread over the reel) and from paper texture, not from raised surfaces. Bone Stock is lit by a Lit Stock radial with a fractal-noise grain at 30% opacity in multiply blend. Posters carry their own grain, screened (not multiplied) at 22% for the dark stock. Three soft, warm shadows exist and each belongs to a physical object sitting on the page.

### Shadow Vocabulary
- **Seal drop** (`filter: drop-shadow(0 10px 18px oklch(0.25 0.01 75 / 0.35))`): the tilted seal only, so it reads as a sticker lifted off the stock.
- **CTA cast** (`box-shadow: 0 16px 30px -16px oklch(0.2 0.01 75 / 0.7)`): the Graphite Ink CTA blocks (cover, story spread). The inverse CTA on Graphite Ink casts nothing, since there is no lighter ground for a shadow to fall on.
- **Print lift** (`box-shadow: 0 30px 60px -30px oklch(0.2 0.01 75 / 0.7)`): the story spread's hero poster, laid on the Bone Stock.

The story dialog's backdrop dims the reel to oklch(0.15 0.006 75 / 0.72); it is a lowered light, not a panel.

### Named Rules
**The Paper Not Panels Rule.** Surfaces are flat stock. Shadows are soft and warm, and only under objects that sit on the paper (seal, CTA, the hero print). No hard offset shadows, no cards.

## Shapes

Square corners everywhere (0 radius). Structure is drawn with 2px rules: Graphite Ink on Bone Stock (under the nav bar, under the deck, under the figure on mobile, under the story standfirst, under Close), Bone Stock on Graphite Ink (under the Work nav bar, over the index). The barcode is framed by a 1.5px inset Graphite Ink outline. Circles are reserved for two things the world uses natively: the seal (a round printed roundel, rotated -12deg) and the small dot separators (0.32rem) between stack items.

The ring's posters are rounded boxes in the shader, but at a corner of 1.5% of the poster's width they read as square; the only soft shapes on the site are the liquid bridges and strands that form between posters while they move, which are the reel's material, not a container style.

## Components

### Buttons
Tactile and blunt, a printed block with a foil chip.
- **Shape:** square (0).
- **Primary:** Graphite Ink block, Bone Stock label in the Label treatment (800, 112% width, 0.875rem, 0.06em, uppercase), padding 0.55rem 0.55rem 0.55rem 1.25rem, 0.9rem gap, CTA cast shadow. Used on the cover ("See the work") and in the story spread ("View the code").
- **Primary inverse:** the same block in Bone Stock with Graphite Ink text, on Graphite Ink pages only ("Get in touch"). No shadow.
- **Arrow chip:** 2.4rem square of Leaf Gold holding a 16px Graphite Ink arrow (inline SVG, 1.75 stroke, square caps).
- **Hover / Focus:** on hover the chip slides 0.25rem right (0.4s, expo-out). Focus follows the stock.

### Navigation
- **Style:** a single row above a 2px rule; links left, dateline right; Label treatment. On the Work page the list opens with "Cover" and the rule is Bone Stock.
- **Hover:** a 3px Leaf Gold bar grows from the left under the link (background-size 0 to 100%, 0.4s expo-out). The current page (`aria-current="page"`) keeps the bar at full width. The same bar marks hover on text links (index links, "Visit the live site", the GitHub link).
- **Mobile:** links remain; the dateline is dropped.

### Cover Line (signature, cover)
A project rendered as a magazine cover line: a Title-scale name over one sentence of Body copy, the whole block one link. Projects with a story link to `/work#<id>`; the rest link to GitHub.
- **Highlighter swipe:** on hover and focus-visible, a Leaf Gold band 0.38em tall at 88% of the title's height grows across the title (0.5s, expo-out). Left cover lines swipe from the left; right-aligned lines swipe from the right.
- **Static highlighter:** the lead line's closing phrase carries a permanent Leaf Gold band (0.3em at 85%). One per cover.

### Seal
A round Graphite Ink roundel: a 1.5px Leaf Gold inner ring, the ring text in Bone Stock (Archivo 800, 13px in a 200-unit viewBox, 0.04em) set on a circular path, and the class year in Leaf Gold at Title face and width. Placed on the figure's shoulder, rotated -12deg, with the seal drop shadow.

### Barcode
A deterministic barcode generated from the GitHub handle, linking to GitHub: Graphite Ink bars on Bone Stock, a Martian Mono URL caption, framed by a 1.5px inset Graphite Ink outline. On hover the ground and ink invert (0.3s, expo-out).

### Spine
A full-height band in the first grid column with the name set vertically (writing-mode vertical-rl) in Dela Gothic One, Leaf Gold, 0.08em tracking. Graphite Ink on the cover, Graphite Lift on the Work page. Decorative and hidden from assistive tech. 2.6rem wide, top-aligned, with the katakana at 1.9rem on mobile.

### Poster
The art for one project, 2:3, rendered from `scripts/posters/poster.html` at 1200x1800 (or a real image in the same frame).
- **Ground:** Poster Stock with its radial light and screened grain.
- **Motif:** one image drawn from a real fact of the project (a keypad, a pipeline, a text thread, a question and its features, the live site laid on as a print, rotated -3deg). It keeps to the top ~58% of the frame; the lower third stays quiet for the title plate.
- **Billing block:** the stack in two halves across the foot, over a 2px rule in oklch(0.4 0.01 75); Label treatment at 19px in the 1200px frame, Bone Dim.
- **Gold:** at most one mark per poster (a lit key, a highlighted stage, a final bubble, one bar, one number).
- **No title:** the poster never prints the project name; the page sets it.

### Molten Reel (signature, Work)
The WebGL ring that holds the posters (`src/components/ui/molten-ring-carousel.tsx`). Each poster is a distance field and the frame is one smooth-minimum pass, so neighbours fuse when they meet and pull strands when they part. The renderer only draws: page scroll sets its position, and it reports the active poster, the hovered poster and its status (entering, moving, settled).
- **Arrival:** once per visit, when half the stage is on screen, the deck starts fused into one mass at the front and spreads into the ring over 2.6s (in-out cubic), pulling strands as it goes.
- **Turn:** the ring eases after the scroll position (8% of the remaining distance per 60fps frame, rescaled for other refresh rates). Surface wobble appears only while moving and falls to zero at rest.
- **Cursor:** never painted. It widens the fusion radius beneath itself, tips nearby posters toward it, nudges the hovered poster's neighbours aside and dims them by 15%, and leaves a small capillary wake.
- **Glass:** an optical band (8% of the stage height) bends the image at the stage's top and bottom edges, where the neighbouring slivers pass.
- **Rest:** a settled, untouched ring stops rendering. Nothing loops.
- **Input:** scroll, keyboard (arrows, Home, End), mouse drag (scrolls the page), click (an inactive poster scrolls to it; the active poster opens its story). A press counts as a click only under 6px of travel, so a drag never opens a story. Touch scrolls natively (`touch-action: pan-y`).

### Title Plate
The HTML layer over the front poster's resting footprint: the poster title, an optional transparent subject cut-out in front of it, and a reveal block (6.5rem tall, 5.75rem on mobile) holding the poster line (Body, max 34ch, two lines) and **Explore project** (Label with a 2.1rem Leaf Gold arrow chip).
- **Resting:** title at 94% opacity, sitting lower by 55% of the reveal's height; the subject, if any, fully over it; the reveal hidden.
- **Focus** (hovering the front poster, keyboard focus on the stage, arriving by scroll or key until the mouse points elsewhere, or always on touch screens): the ring darkens the front poster to 58% brightness and grows it 1.8%; the title rises into place at full opacity; the subject drops to 30%; the reveal fades in with a 0.6rem rise. All transform and opacity, 0.45 to 0.6s expo-out.
- **Moving:** the whole plate fades out in 0.18s and back in over 0.45s once the ring settles, already showing the new project.

### Reel Captions
Outside the poster, small and understated: the index numeral in Title face with "/ 05" in Label small (Bone Dim) to the left; category in Label small (Bone Dim) over the year (Bone Stock) to the right.

### Story Spread
A full-viewport `<dialog>` printed on Bone Stock with its Lit Stock radial, opened from the front poster.
- **Hero:** the poster at 2:3, the full height of the sheet less its padding, with the print lift shadow. It flies out of the title plate's rectangle into place over 720ms (expo-out) and flies back over 540ms on close; the copy and Close fade before it leaves.
- **Copy column:** story meta (category · year, Label), story title, standfirst over a 2px Graphite Ink rule, then three short sections headed in Label: **The idea**, **The hard part**, **Where it landed** (Body long, max 58ch). The column rises 1rem and fades in over 0.7s, 0.15s after opening, and scrolls on its own if it overflows.
- **Links:** "View the code" as the primary CTA; "Visit the live site" as a text link with the gold bar.
- **Close:** a Label button with a 14px cross over a 2px Graphite Ink rule, top right, focused on open. Escape runs the same close.
- **Behaviour:** the rest of the page is inert while it is open; the page does not scroll and the reel pauses; focus returns to the control that opened it.
- **Mobile:** stacks: hero (width min(100%, 58svh × 2/3)) then copy, the whole sheet scrolling.

### No-WebGL Fallback
Without WebGL2 the reel becomes a simple grid of the same posters (auto-fill, min 16rem), each a button opening the same story: poster, a Label small line (number · category · year), and the name in Title face with the cover-line highlighter swipe. This is the one place projects appear side by side, and only because the reel cannot run.

### Motion
- **Curve:** one, expo-out, cubic-bezier(0.16, 1, 0.3, 1), for every CSS transition and the story flight. The reel's arrival uses in-out cubic, the only other curve.
- **Cover:** one load motion, the figure arriving (opacity 0 to 1, a 3% rise with a slight horizontal settle, 1.5s); in flow on mobile. Everything else is still until hovered.
- **Work:** the reel's arrival, turning only when scrolled, cursor response only under the cursor, plate fades, the story flight. No ambient or looping motion.
- **Reduced motion:** CSS durations collapse globally. The reel drops strands, wobble, wake and glass, and tracks the scroll exactly with no easing; the arrival is instant; the story opens and closes without the flight; programmatic scrolls jump instead of gliding.

## Do's and Don'ts

### Do:
- **Do** keep every surface Graphite Ink or Bone Stock (and their named ranges); use Leaf Gold only for the spine type, highlighter swipes and nav bars, the seal's numerals and ring, arrow chips, dot separators, text selection, one mark per poster, and focus rings on Graphite Ink.
- **Do** set mastheads, leads, cover-line titles, poster and story titles in Archivo 900 at 62% width, uppercase.
- **Do** draw structure with 2px rules in the opposite ink and keep corners square.
- **Do** let focus follow the stock: Graphite Ink rings on Bone Stock, Leaf Gold rings on Graphite Ink (2px, 3px offset).
- **Do** link every project to real work: cover lines to `/work#<id>` or GitHub, stories to the repo and any live site.
- **Do** keep poster motifs to facts from the project, in the top ~58% of the frame, and leave the title to the page.
- **Do** keep the cover still apart from the figure arrival and the highlighter swipe, and keep the reel at rest unless scrolled, hovered or opened.

### Don't:
- **Don't** fill a page, section or panel with Leaf Gold.
- **Don't** use gold for focus indicators on Bone Stock; it fails 3:1.
- **Don't** add section numbers or eyebrow labels above headings.
- **Don't** lay projects out as a row of cards, or centre a headline over a subtitle as the hero. The no-WebGL fallback grid is the only exception.
- **Don't** print the project name inside a poster, or put more than one gold mark on it.
- **Don't** let the reel intercept the wheel or trap the scroll; leaving it at either end is just scrolling.
- **Don't** use Martian Mono for anything but machine text such as URLs, handles, cron strings and coordinates.
- **Don't** add hard offset shadows or rounded corners; the seal and dot separators are the only circles.
- **Don't** add ambient or looping animation anywhere on the site.
