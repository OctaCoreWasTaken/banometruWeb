## ADDED Requirements

### Requirement: Next.js project initialised with TypeScript and Tailwind CSS 4
The project SHALL be a Next.js 15 application using the App Router, TypeScript, and Tailwind CSS 4. The `next.config.js` SHALL set `output: 'export'` for static site generation. No `src/app/api/` routes are required.

#### Scenario: Project builds successfully
- **WHEN** `npm run build` is executed
- **THEN** the build completes without errors and produces a static `out/` directory

#### Scenario: Development server starts
- **WHEN** `npm run dev` is executed
- **THEN** the development server starts at `http://localhost:3000` and serves the site

### Requirement: Tailwind design token system
All colours, and key spacing/radius values SHALL be defined as named tokens in `tailwind.config.js`. No component file SHALL contain a raw hex colour value — all classes MUST reference token names (e.g., `bg-base`, `text-primary`, `border-accent`).

The token map SHALL include at minimum:
- `base` (#050008) — page background
- `surface` (#0D001A) — card/section backgrounds
- `elevated` (#150025) — modals and elevated panels
- `primary` (#73007C) — brand purple
- `secondary` (#6B0466) — hover states
- `shadow-color` (#60015C) — depth/shadow tints
- `accent` (#003399) — dark blue accent
- `highlight` (#00AAFF) — cyan highlight
- `text-bright` (#F0E6FF) — primary text
- `text-muted` (#9966AA) — secondary/caption text

#### Scenario: Full reskin by editing one file
- **WHEN** a developer changes the hex value of `primary` in `tailwind.config.js`
- **THEN** every element that uses the `primary` token updates its colour across the entire site after rebuild

### Requirement: content.json as the single source of truth
A `content.json` file SHALL exist at the project root and SHALL be the only place where on-screen text, dates, prices, image filenames, and team member data are defined. React components SHALL NOT contain hardcoded Romanian strings or numeric prices.

The schema SHALL include at minimum:
```
meta:      { siteName, tagline, date, venue, city }
nav:       { links: [{ label, href }] }
hero:      { headline, subheadline, ctaPrimary, ctaSecondary, backgroundImage }
about:     { title, description, pillars: [{ icon, title, description }] }
program:   { title, items: [{ time, title, description }] }
tickets:   { title, general: { price, label, perks: [] }, vip: { price, label, perks: [] }, totalSpots, disclaimer }
budget:    { title, items: [{ label, amount, color }], total, netRaised }
team:      { title, members: [{ name, role, photo }] }
contact:   { title, description, email }
footer:    { tagline, links: [] }
sections:  { budget: { visible }, team: { visible } }
```

#### Scenario: Venue name updated in one place
- **WHEN** the `meta.venue` value in `content.json` is changed from `"TBD"` to `"Hotel Marriott"`
- **THEN** every section that displays the venue (Hero, Program, Footer) shows the new name without any component file being edited

#### Scenario: Section toggled off
- **WHEN** `sections.budget.visible` is set to `false` in `content.json`
- **THEN** the Budget section does not render on the page

### Requirement: TypeScript typings for content.json
A `src/lib/content.ts` file SHALL export a TypeScript interface `SiteContent` that matches the `content.json` schema exactly. The root `page.tsx` SHALL import and parse `content.json` with this type. Type mismatches SHALL cause a build error.

#### Scenario: Type error on schema mismatch
- **WHEN** a required field is removed from `content.json`
- **THEN** `npm run build` fails with a TypeScript error identifying the missing field

### Requirement: Image conventions
All images SHALL be stored in `/public/images/`. Team member photos SHALL be in `/public/images/team/`. Image filenames SHALL be referenced in `content.json` as relative paths from `/public/` (e.g., `"images/hero-bg.jpg"`). Components SHALL use Next.js `<Image>` with the path from content.

#### Scenario: Image swapped without code change
- **WHEN** a file in `/public/images/` is replaced with a new file of the same name
- **THEN** the site displays the new image after rebuild without any component or JSON edit

#### Scenario: Placeholder used when image is missing
- **WHEN** a team member's `photo` field is an empty string or omitted
- **THEN** a gradient placeholder avatar is displayed instead of a broken image
