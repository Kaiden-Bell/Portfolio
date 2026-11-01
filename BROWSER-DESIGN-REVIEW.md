# Portfolio design review

**Review date:** 2026-10-31  
**Review method:** Playwright Chromium browser captures and interaction checks  
**Viewports:** Desktop, 1440 × 900; mobile, 390 × 844 with touch emulation

## Scope and limits

This review considers the rendered design concept: layout, visual hierarchy, color, navigation, and the impression the site may give different visitors. It sets aside missing typography and imagery as requested. The visitor perspectives below are simulated readings of the browser captures, not interviews, surveys, or measured user sentiment. They are useful hypotheses to validate with real visitors.

The browser run loaded the home, work, and contact pages at both viewport sizes. The menu opened and closed, and all three project dialogs opened and closed. The run recorded no uncaught browser JavaScript errors or failed local HTTP responses. It also captured the first view of three About scenes. This is a browser review, not a full accessibility audit or device compatibility study.

## Overall impression

The site presents itself as a personal magazine: the bone and charcoal “paper,” a persistent spine, oversized cover typography, restrained gold accents, and a dark work reel form a coherent visual system. The pages feel authored and connected. The design communicates technical ambition and personal taste more strongly than a generic portfolio template would.

Its main tradeoff is that discovery is designed as an experience. The cover and work reel ask visitors to look, scroll, and explore. That supports atmosphere and memorability, while making project details less immediately scannable. The design sets a high expectation for the depth and finish of the work; placeholder project details currently make that expectation difficult to meet.

## Simulated visitor reactions

### 1. Recruiter at a small Nevada tech company

**Likely first impression:** Distinctive, confident, and carefully art-directed. The opening identifies Kaiden, shows a broad technical range, and locates the portfolio in Sparks, Nevada. The editorial style may help the candidate remain memorable after a quick visit.

**What supports that impression:** The home cover combines the name, portrait, short technical introduction, featured projects, contact links, and a clear “Enter the reel” path. The consistent charcoal and bone palette and gold details make the experience feel intentional. Project names are visible in the work reel, and a visitor can open a project story from the poster.

**Likely question or hesitation:** “What did Kaiden actually build, and what was their contribution?” The reel focuses on one project at a time, so comparing projects requires interaction. In the RootMap story, the category and stack are generic and the description is a placeholder. RandomEvents also has placeholder description and stack content. Those details weaken the evidence a recruiter needs to assess scope and technical judgment.

**Message received:** “I have a strong visual point of view and work across several technical areas.” The browser presentation does not yet consistently substantiate: “Here is the depth, outcome, and impact of my work.”

### 2. Family member visiting on a phone

**Likely first impression:** Personal and memorable. The portrait and very large name make it clear whose site this is, and the visual treatment feels carefully made rather than generic.

**What supports that impression:** The mobile home page stacks the name and introduction, and the contact page is a straightforward path to the email address, GitHub, location, and school. The contact page’s content remains readable in a single vertical flow. The menu can be opened with touch and exposes the main destinations.

**Likely question or hesitation:** “Where do I tap to get to the work or learn more?” The navigation is built into a narrow persistent spine and expands when activated. This is distinctive, though less familiar than a standard menu button. On the home page, the introductory copy and featured projects sit below the opening name and portrait, so a visitor needs to scroll to reach them. The mobile work reel is visually immersive and vertical; a first-time visitor may need a moment to discover that the thumbnails change the active project.

**Message received:** “This is a personal site with a strong visual identity, and I can contact Kaiden easily.” The initial view emphasizes the cover portrait and name more than the project details.

### 3. Professor or researcher visiting for context

**Likely first impression:** A technically broad student with a strong visual identity and care for presentation. The cover names computer science and engineering, and the contact page supplies school and location context.

**What supports that impression:** The About section extends the magazine concept into a sequence of scenes, giving the visitor a sense that the site has more context beyond the cover. The work story has a repeatable structure for a project’s category, year, description, stack, and external link. The contact page makes academic context and contact information easy to locate.

**Likely question or hesitation:** “What are the research interests, technical decisions, or results behind these projects?” The visual structure creates a place for that information, but the captured RootMap story is sparse and generic. The reel and poster treatment take up most of the work page’s attention, so the details arrive only after opening a project.

**Message received:** “Kaiden cares about both engineering and presentation.” The site gives a clear identity, but the current project stories leave the academic or technical substance mostly unstated.

## Design observations by page

### Home

The cover delivers the magazine concept immediately. The masthead, central portrait, cover-line introduction, project list, seal, and footer work together as a designed composition. On desktop, the density feels like a magazine cover and the side spine reinforces the binding metaphor. On mobile, the name wraps across two lines and the portrait remains the visual center; the main introduction begins lower in the page, so the initial viewport is more identity-led than information-led.

The bone, charcoal, and gold palette is coherent. Gold works as a spot accent for emphasis and calls to action, while the two neutral stocks do most of the structural work. The repeated square buttons and heavy rules reinforce the print language without introducing competing styles.

### Work

The dark page creates a clear change of pace from the cover. Large poster panels and a small project index establish the reel metaphor, and the focused project title is easy to identify. The focused story dialog is a useful shift from display to reading: on desktop it pairs the project art with a copy column; on mobile it becomes a vertically stacked reading view.

The visual experience is stronger than the current project evidence. In the RootMap capture, the poster is a mostly flat dark ground with a large title, while the opened story has an empty dark hero area and generic description and stack. That may be intentional placeholder content, but a visitor will read it as thin project detail until it is replaced. This is the largest gap between the polish promised by the design and the information delivered by the current content.

### Contact

The contact page is the most immediately task-oriented page. The email address dominates, the copy-address button is clear, and the GitHub, location, and study details form a compact supporting row on desktop and a readable stack on mobile. The page retains the established stocks, spine, rules, and gold accents, so it stays within the same visual world while serving a practical purpose.

### Navigation and About

The vertical spine acts as both a brand element and the site’s persistent navigation. On mobile it occupies a noticeable strip, but the menu expands into clearly labeled links when tapped. This makes the metaphor consistent across pages and screen sizes, though it relies on the visitor recognizing the spine as an interactive menu.

The About scenes extend the editorial idea beyond the landing page and give the site room for narrative. The captures establish the changing scenes, but this review did not assess every scroll position or every possible interaction state in the About sequence.

## Main takeaways

1. **The central design concept is coherent.** The visual language carries across the cover, work, contact, and About experiences.
2. **The identity comes through before the evidence.** Visitors are likely to remember the magazine concept, portrait, and palette quickly.
3. **The work page asks for exploration.** That makes it memorable, while adding a step for visitors who want to scan project names or compare projects quickly.
4. **Project detail is the largest communication gap.** Generic and placeholder copy currently makes the portfolio feel less complete than the visual system suggests.
5. **Mobile preserves the concept.** The menu, contact page, work reel, and project story remain usable in the tested viewport, with the spine and vertically paced work experience taking a substantial share of the screen.

## Practical conclusion

The strongest message currently conveyed is: **“I’m a technically broad student with a distinct personal identity and a strong interest in presentation.”** The design supports this message consistently on desktop and mobile.

The message that needs more support is: **“Here is what I built, why it matters, and what I contributed.”** Replacing placeholder project categories, descriptions, and stack entries with concrete project context would bring the content up to the level of confidence established by the visual design.

## Browser evidence

The captured browser evidence is in [`artifacts/browser-review/`](artifacts/browser-review/). The run summary is [`results.json`](artifacts/browser-review/results.json); it records both viewport sizes, all three pages, the menu check, three project dialogs per viewport, and zero errors.
