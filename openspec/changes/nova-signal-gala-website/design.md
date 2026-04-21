## Context

Brand-new web project for the Nova Signal Gala — a hypothetical fundraising event for a high-school radio station, created for the Banometru by ING competition. There is no existing codebase. The primary audience is competition judges who need to see a professional, credible event website. The secondary audience is prospective gala attendees. The team maintaining the site after launch are high-school students with limited developer experience.

## Goals / Non-Goals

**Goals:**
- Build a visually polished, space-themed single-page website in Romanian
- Make every piece of content editable via `content.json` without touching React code
- Make all images swappable by replacing files in `/public/images/`
- Make the entire color palette changeable from a single `tailwind.config.js` edit
- Implement a fake ticket reservation modal to demonstrate the concept to judges
- Deploy to a public Vercel URL shareable with judges

**Non-Goals:**
- Real payment processing (all transactions are hypothetical)
- Backend / database / user accounts
- Multi-language support
- CMS integration (JSON file is sufficient for this scale)
- Mobile app

## Decisions

### D1: Next.js 15 (App Router) over plain HTML or Vite+React

**Decision:** Use Next.js 15 with the App Router.

**Rationale:** Vercel deployment is zero-config with Next.js. The App Router allows each section to be a server component by default (fast initial load), with client components only where interactivity is needed (modal, form). Static export (`output: 'export'`) means the site is a set of static files — no server needed, fast and free to host.

**Alternative considered:** Plain HTML/CSS/JS with a `fetch('content.json')`. Simpler setup, but no component model makes the codebase harder to maintain, and Tailwind integration is messier without a build step.

### D2: Single `content.json` as the content layer

**Decision:** One flat JSON file at the project root drives all on-screen text, dates, prices, and image filenames.

**Rationale:** The team has no CMS budget or technical overhead to maintain one. A JSON file can be edited in any text editor or directly on GitHub. TypeScript types (`src/lib/content.ts`) catch typos at build time. The venue name, a frequently-changing field, appears exactly once in `content.json` and is referenced everywhere via a prop — no find-and-replace needed.

**Alternative considered:** MDX files per section. More flexible for rich content, but overkill and harder for non-developers to edit.

### D3: Tailwind CSS 4 with named design tokens

**Decision:** All colours, font sizes, and spacing values are defined as CSS custom properties in `tailwind.config.js` under semantic token names (`primary`, `surface`, `accent-blue`, etc.). Component classes reference token names, never raw hex values.

**Rationale:** Changing the entire site's colour scheme to a new palette requires editing only the token map — no component files are touched. This directly satisfies the "modify the look easily" requirement.

**Token map:**
```
bg-base        → #050008   (page background)
bg-surface     → #0D001A   (card backgrounds)
bg-elevated    → #150025   (modals, elevated cards)
color-primary  → #73007C   (main brand purple)
color-secondary→ #6B0466   (hover states)
color-shadow   → #60015C   (shadows, depth)
color-accent   → #003399   (dark blue accent)
color-highlight→ #00AAFF   (cyan highlight / subtle)
text-base      → #F0E6FF   (primary text)
text-muted     → #9966AA   (secondary text)
```

### D4: One React component per page section

**Decision:** Each visible section (Hero, About, Program, Tickets, Budget, Team, Contact, Footer) is its own file in `src/components/`. The root `page.tsx` imports and sequences them.

**Rationale:** A developer can restyle or replace one section without reading any other section's code. Components receive their data as typed props sourced from `content.json`, never fetch or manage their own state (except the Tickets modal which is a client component).

### D5: Framer Motion for all animations

**Decision:** Use Framer Motion for scroll-triggered reveals, the hero star field, and modal transitions.

**Rationale:** Already planned in the tech stack. `useInView` + `motion.div` covers 90% of animation needs with minimal boilerplate. The star field is a canvas element animated via `requestAnimationFrame` in a `useEffect` — lightweight and fully custom.

### D6: Static export + Vercel

**Decision:** `next.config.js` sets `output: 'export'`. Deploy to Vercel via GitHub integration.

**Rationale:** No server-side logic is needed (all content is static, the reservation form is fake). Static export means the entire site is a folder of HTML/CSS/JS files — near-zero hosting cost, instant global CDN, one-click Vercel deploy from GitHub.

## Risks / Trade-offs

- **Logo with non-transparent background** → Team must export a transparent-background PNG before launch. A CSS `mix-blend-mode: screen` fallback can be used temporarily but may degrade on non-dark backgrounds.
- **Fake reservation form gives no confirmation email** → Judges may question this. Mitigation: display a clear "This is a demonstration — in the real event, you will receive a confirmation email" disclaimer in the modal.
- **content.json has no validation at runtime** → If a team member makes a JSON syntax error, the site breaks with no helpful error. Mitigation: TypeScript compilation catches shape errors at build time; add a JSON schema comment block to guide editing.
- **Star field canvas animation** → Can be CPU-intensive on older devices. Mitigation: reduce particle count on mobile via a CSS `prefers-reduced-motion` check and a `window.innerWidth` guard.

## Open Questions

- Venue name: currently `"TBD"` in content.json — team to update once decided
- Exact ticket split (General vs VIP count): currently unspecified, displayed as totals only
- Team member photos: team to supply — placeholder gradient avatars used until then
- Whether a concert artist/performer name should appear in the program section
