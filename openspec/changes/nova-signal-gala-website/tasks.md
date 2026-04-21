## 1. Project Bootstrap

- [x] 1.1 Initialise Next.js 15 project with TypeScript, Tailwind CSS 4, and App Router (`npx create-next-app@latest`)
- [x] 1.2 Install Framer Motion (`npm install framer-motion`)
- [x] 1.3 Configure `next.config.js` with `output: 'export'` and `images: { unoptimized: true }`
- [x] 1.4 Define all design tokens (colours, border-radius, font) in `tailwind.config.js` — no raw hex in components
- [x] 1.5 Set global CSS baseline: dark background, default font (e.g. Inter or Space Grotesk), smooth scroll
- [x] 1.6 Create `/public/images/` and `/public/images/team/` directories with `.gitkeep` placeholders

## 2. Content Layer

- [x] 2.1 Create `content.json` at project root with all required fields: meta, nav, hero, about, program, tickets, budget, team, contact, footer, sections
- [x] 2.2 Populate `content.json` with all Romanian copy, Nova Signal branding, 24 Iunie date, venue "TBD", ticket prices (General €20, VIP €30), and budget figures (€5,000 venue, €1,000 misc, €8,500 revenue)
- [x] 2.3 Create `src/lib/content.ts` with `SiteContent` TypeScript interface matching the full `content.json` schema
- [x] 2.4 Add a typed `getContent()` helper that imports and returns `content.json` as `SiteContent`

## 3. Layout and Navbar

- [x] 3.1 Create `src/app/layout.tsx` with HTML shell, font import, and global metadata (title, description, favicon)
- [x] 3.2 Build `src/components/Navbar.tsx`: logo, site name, anchor links, scroll-based frosted-glass background
- [x] 3.3 Implement hamburger menu for mobile (toggle nav links on small screens)
- [x] 3.4 Wire Navbar into layout so it appears on all pages

## 4. Hero Section

- [x] 4.1 Build `src/components/Hero.tsx` with full-viewport layout, content from `content.json hero`
- [x] 4.2 Implement star-field canvas animation (`useEffect` + `requestAnimationFrame`, 150–200 particles)
- [x] 4.3 Add `prefers-reduced-motion` check — skip animation if enabled, render static stars
- [x] 4.4 Add primary CTA ("Cumpără bilet", anchors to `#bilete`) and secondary CTA ("Află mai mult", anchors to `#despre`)
- [x] 4.5 Add Framer Motion entrance animation for headline and CTAs

## 5. About Nova Signal Section

- [x] 5.1 Build `src/components/About.tsx` with heading, mission paragraph, and three pillar cards from `content.json about`
- [x] 5.2 Style pillar cards with glowing purple border on hover, icon, title, description
- [x] 5.3 Add staggered fade-up scroll animation via Framer Motion `useInView`

## 6. Event Program Section

- [x] 6.1 Build `src/components/Program.tsx` with vertical timeline layout from `content.json program.items`
- [x] 6.2 Style each timeline item with time badge, connector line, title, and description
- [x] 6.3 Make timeline stack vertically on mobile and alternate sides on desktop
- [x] 6.4 Add scroll-triggered animation per timeline item

## 7. Budget Transparency Section

- [x] 7.1 Build `src/components/Budget.tsx` gated by `content.json sections.budget.visible`
- [x] 7.2 Render labelled segments (venue, misc, net raised) as animated horizontal bars or an SVG ring chart
- [x] 7.3 Show euro amounts and labels from `content.json budget.items`
- [x] 7.4 Add scroll-triggered animation for bar/chart fill

## 8. Team Section

- [x] 8.1 Build `src/components/Team.tsx` gated by `content.json sections.team.visible`
- [x] 8.2 Render team member grid from `content.json team.members` (photo, name, role)
- [x] 8.3 Implement gradient placeholder avatar for members with empty `photo` field
- [x] 8.4 Add hover lift effect on cards

## 9. Ticket Tiers Display

- [x] 9.1 Build `src/components/Tickets.tsx` with General and VIP tier cards from `content.json tickets`
- [x] 9.2 Render perks list with checkmark icons per tier
- [x] 9.3 Style VIP card with glowing border and "VIP" badge to distinguish it visually
- [x] 9.4 Add "Rezervă" button to each card that opens the reservation modal with the correct tier pre-selected

## 10. Ticket Reservation Modal

- [x] 10.1 Build `src/components/ReservationModal.tsx` as a client component with three-step internal state
- [x] 10.2 Implement Step 1: tier selector (General / VIP) with pre-selection from prop, and "Continuă" button
- [x] 10.3 Implement Step 2: contact form (Nume, Email, Număr bilete 1–10), dynamic total price, client-side validation, and "Confirmă rezervarea" button
- [x] 10.4 Implement Step 3: confirmation screen with summary (tier, quantity, total), Romanian disclaimer text, and "Închide" button that resets modal to Step 1
- [x] 10.5 Add dark overlay, Escape-key dismissal, overlay-click dismissal, and visible × close button
- [x] 10.6 Implement focus trap (Tab cycles only within open modal)
- [x] 10.7 Animate modal entrance/exit with Framer Motion (`AnimatePresence`)

## 11. Contact Section

- [x] 11.1 Build `src/components/Contact.tsx` with Nume, Email, Mesaj fields
- [x] 11.2 Implement client-side validation (non-empty fields, valid email format)
- [x] 11.3 On valid submit, replace form with success message: "Îți mulțumim! Te vom contacta în curând."
- [x] 11.4 Style form inputs with purple focus rings matching the design token system

## 12. Footer

- [x] 12.1 Build `src/components/Footer.tsx` with logo, tagline, and links from `content.json footer`
- [x] 12.2 Style with `bg-surface` to visually close the layout

## 13. Page Assembly and QA

- [x] 13.1 Assemble all sections in `src/app/page.tsx` in order: Navbar, Hero, About, Program, Tickets, Budget (if visible), Team (if visible), Contact, Footer
- [x] 13.2 Add `id` anchors to each section matching navbar links (`#sobre`, `#program`, `#bilete`, `#contact`)
- [ ] 13.3 Test responsive layout at 375px (mobile), 768px (tablet), and 1280px (desktop)
- [x] 13.4 Verify `prefers-reduced-motion` disables all Framer Motion animations and the star-field animation
- [x] 13.5 Run `npm run build` and confirm the `out/` static export has no errors
- [x] 13.6 Deploy to Vercel and confirm the live URL loads correctly
- [ ] 13.7 Add logo PNG (transparent background) to `/public/images/logo.png` and wire into Navbar and Footer
