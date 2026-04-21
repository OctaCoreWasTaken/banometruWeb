## Why

Nova Signal needs a public-facing website to promote a fundraising gala for a high-school radio station, as part of the Banometru by ING competition. The site must convince competition judges that the event concept is credible, financially sound, and professionally executed — while being easy for a non-developer team to maintain and update.

## What Changes

- Introduce a brand-new Next.js 15 web application from scratch (no prior codebase)
- All website content (text, dates, prices, team info, event program) driven by a single `content.json` file — no code changes needed to update copy
- All images stored in `/public/images/` and referenced by filename in `content.json` — swap a file to update any image
- Tailwind color tokens and design variables centralised in `tailwind.config.js` — one edit reskins the entire site
- Full space/futuristic visual theme matching Nova Signal's brand colours (#73007C primary, dark navy/black backgrounds)
- Eight self-contained page sections, each its own React component
- A fake ticket reservation modal (no real payment — hypothetical gala concept)
- Deployable for free on Vercel with a shareable URL for judges

## Capabilities

### New Capabilities

- `project-foundation`: Next.js 15 project structure, TypeScript, Tailwind theme token system, `content.json` schema with full TypeScript typings, image conventions, and Vercel deployment config
- `gala-sections`: All eight page sections — Navbar, Hero (animated star field), About Nova Signal (3-pillar cards), Event Program (vertical timeline), Budget Transparency (visual breakdown), Team, Contact form, and Footer — each reading from `content.json`
- `ticket-reservation`: Ticket tier display (General €20 / VIP €30) and a multi-step reservation modal with name, email, and quantity fields, ending in a confirmation screen (no real payment processing)

### Modified Capabilities

## Impact

- New project: no existing code is affected
- Dependencies introduced: Next.js 15, React 19, Tailwind CSS 4, Framer Motion, TypeScript
- Deployment target: Vercel (free tier)
- All content changes flow through `content.json` — venue name, date, team members, program items, prices, and section visibility are all controlled from one file
