## ADDED Requirements

### Requirement: Navbar component
The site SHALL render a fixed top navigation bar containing the Nova Signal logo, the site name, and anchor links to each major section. On scroll, the navbar SHALL gain a frosted-glass background. On mobile, navigation links SHALL collapse into a hamburger menu.

#### Scenario: Smooth scroll to section
- **WHEN** a user clicks a navbar link (e.g., "Bilete")
- **THEN** the page smoothly scrolls to the corresponding section

#### Scenario: Navbar becomes opaque on scroll
- **WHEN** the user scrolls more than 50px from the top
- **THEN** the navbar background changes from transparent to a frosted-glass `bg-elevated` surface

### Requirement: Hero section with animated star field
The Hero section SHALL display a full-viewport dark background with an animated star-field canvas behind the text content. It SHALL show the gala name, tagline ("Every voice finds its frequency."), date, venue, and two CTAs: a primary "Cumpără bilet" button (anchors to Tickets) and a secondary "Află mai mult" button (anchors to About).

The star field SHALL be implemented as an HTML `<canvas>` element with particles moving slowly across the screen. It SHALL respect `prefers-reduced-motion` — if the user has reduced motion enabled, the stars SHALL be static.

#### Scenario: Hero renders with all content from JSON
- **WHEN** the page loads
- **THEN** the Hero section displays the site name, tagline, date, and venue from `content.json` over the animated star field

#### Scenario: Primary CTA scrolls to Tickets
- **WHEN** a user clicks "Cumpără bilet"
- **THEN** the page smooth-scrolls to the Tickets section

#### Scenario: Reduced motion respected
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the star field is rendered as a static set of dots, not animated

### Requirement: About Nova Signal section
The About section SHALL display a heading, a paragraph describing Nova Signal's mission, and three "pillar" cards representing the three use cases: Jurnalism, Anunțuri școlare, and Muzică. Each pillar card SHALL have an icon, a title, and a short description — all sourced from `content.json`. Each card SHALL have a subtle glowing purple border on hover.

#### Scenario: Three pillar cards rendered
- **WHEN** the About section is in view
- **THEN** three cards are displayed, one per entry in `content.json about.pillars`

#### Scenario: Section animates in on scroll
- **WHEN** the About section scrolls into the viewport
- **THEN** the cards animate in with a staggered fade-up using Framer Motion

### Requirement: Event Program section
The Program section SHALL display a vertical timeline of gala events. Each item SHALL show a time, a title, and an optional description — all from `content.json program.items`. The active/current event item SHALL be visually distinguished. Items SHALL alternate sides on desktop and stack vertically on mobile.

#### Scenario: Program items rendered from JSON
- **WHEN** the Program section is visible
- **THEN** one timeline entry is rendered per item in `content.json program.items`, in order

#### Scenario: Adding a new program item requires no code change
- **WHEN** a new object is appended to `content.json program.items`
- **THEN** the new event appears in the timeline after rebuild

### Requirement: Budget Transparency section
The Budget section SHALL display a visual breakdown of where the gala funds come from and where they go. It SHALL show at minimum: total investment (€5,000), ticket revenue (€8,500), miscellaneous costs (€1,000), and net funds raised for Nova Signal. The breakdown SHALL use animated bar or ring charts (CSS or SVG-based) with labelled segments. This section SHALL be hideable via `content.json sections.budget.visible`.

#### Scenario: Budget figures match content.json
- **WHEN** the Budget section is visible
- **THEN** all monetary values displayed match the values in `content.json budget.items`

#### Scenario: Section hidden when toggled off
- **WHEN** `sections.budget.visible` is `false`
- **THEN** the Budget section is not rendered and no gap appears in the page layout

### Requirement: Team section
The Team section SHALL display a grid of team member cards. Each card SHALL show a photo (or gradient placeholder if no photo is provided), a name, and a role — all from `content.json team.members`. This section SHALL be hideable via `content.json sections.team.visible`.

#### Scenario: Team grid rendered from JSON
- **WHEN** the Team section is visible
- **THEN** one card is rendered per entry in `content.json team.members`

#### Scenario: Gradient avatar shown when no photo
- **WHEN** a team member's `photo` field is empty
- **THEN** a purple-gradient circle avatar is shown in place of a photo

### Requirement: Contact section
The Contact section SHALL display a form with fields: Nume (Name), Email, and Mesaj (Message). On submit, the form SHALL display a success message in Romanian. The form SHALL NOT send data to any real backend — it is a visual demonstration. Basic client-side validation (non-empty fields, valid email format) SHALL run before the success state is shown.

#### Scenario: Form shows success state on valid submission
- **WHEN** a user fills all fields correctly and clicks the submit button
- **THEN** the form is replaced with a success message: "Îți mulțumim! Te vom contacta în curând."

#### Scenario: Validation blocks empty submission
- **WHEN** a user clicks submit with one or more empty fields
- **THEN** the form displays inline error messages and does not show the success state

### Requirement: Footer
The Footer SHALL display the Nova Signal logo, the tagline, and optional social/contact links from `content.json footer.links`. It SHALL use a slightly lighter surface colour than the page background to visually close the layout.

#### Scenario: Footer renders tagline from JSON
- **WHEN** the page is fully scrolled down
- **THEN** the footer displays the tagline value from `content.json footer.tagline`

### Requirement: Responsive layout
Every section SHALL be fully usable on mobile (≥320px), tablet (≥768px), and desktop (≥1280px) screen widths. Text SHALL never overflow its container. Tap targets SHALL be at least 44×44px on mobile.

#### Scenario: Site usable on 375px mobile viewport
- **WHEN** the site is viewed on a 375px-wide screen
- **THEN** all text is readable, buttons are tappable, and no horizontal scrollbar appears

### Requirement: Scroll-triggered animations
All sections below the Hero SHALL animate in using Framer Motion `useInView` — a fade-up entrance when the section first scrolls into the viewport. Animations SHALL only play once (not replay on scroll-back). The `prefers-reduced-motion` setting SHALL disable all animations.

#### Scenario: Section animates on first scroll into view
- **WHEN** a section enters the viewport for the first time
- **THEN** it fades up from 20px below its final position over 0.5s

#### Scenario: Animation skipped under reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** sections appear immediately without any animation
