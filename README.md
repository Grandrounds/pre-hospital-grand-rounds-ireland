# EMS E Café — Version 5

Independent educational website for Ireland's pre-hospital community.
Static site, hosted on GitHub Pages.

## What's in this update

- White interface with EMS-green accent (no more brown UI panels).
- New sticky header with rounded pill navigation and a search toggle.
- Utility bar with the four values (Evidence · Empathy · Education · Excellence).
- Redesigned hero with a glass card and a stronger trust strip below it.
- Consistent "What's happening", category, join-band and page-hero patterns.
- Inline SVG icon set — no emoji, no external icon library.
- Fully responsive (desktop, tablet, mobile) with an accessible mobile menu.
- Reduced-motion, keyboard focus, and print styles included.

## Deploy

1. Upload every file in this folder to the repository **root**, including the
   hidden `.nojekyll` file and your existing `images/` folder.
2. In the repository, go to Settings → Pages → Build and deployment.
3. Source: **Deploy from a branch**. Branch: `main` (or `master`) → `/ (root)`.
4. Save. GitHub Pages will publish within a minute or two.

## Required images

Place these in an `images/` folder at the repository root (same names as before):

- `ems-cafe-logo.jpg` – circular logo used in the header and footer
- `ems-concept-hero-v8.jpg` – homepage hero background
- `ambulance.png`
- `air-ambulance.png`
- `ems-cafe-hero.jpg`
- `ems-concept-hero.jpg`

If you rename any image, update the reference in `index.html`.

## Files

- `index.html`, `learning.html`, `case-studies.html`, `grand-rounds.html`,
  `resources.html`, `community.html`, `about.html`, `governance.html`,
  `contact.html`, `portal.html`, `membership.html`, `submit-case.html`,
  `privacy.html`
- `styles.css` – single stylesheet, no build step.
- `script.js` – mobile menu, search toggle, sticky-header shadow, demo forms,
  gentle scroll reveal.
- `.nojekyll` – disables Jekyll processing on GitHub Pages.

## Notes on demo forms

All forms carry `data-demo` and are intercepted client-side. They show a short
notice and do not send anything anywhere. Wire up a real backend before
collecting personal or professional data.
