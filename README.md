# Astro Portfolio Starter

This project is an Astro + Tailwind CSS portfolio with an editorial aesthetic inspired by early patent documents. It favors semantic HTML and minimal JavaScript to achieve high accessibility and performance scores.

## Architecture
- **Astro** with **Tailwind CSS** and CSS variables for theming.
- Content is stored in `src/content/projects` as a content collection with a typed schema.
- Reusable components live in `src/components` and layouts in `src/layouts`.
- Client islands are used sparingly (tag filtering and email obfuscation).

## Getting Started
```bash
npm install
npm run dev
```

### Scripts
- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – run ESLint
- `npm run format` – format with Prettier
- `npm run check:a11y` – run axe-core against local site

## Adding Projects
Add JSON files to `src/content/projects` following the schema in `src/content/config.ts`. Media assets go in `public/media`.

## Accessibility & Performance
- WCAG 2.2 AA colors and focus styles.
- Respect for `prefers-reduced-motion`.
- Run `npm run check:a11y` with the dev server running to verify.
- Aim for 90+ Lighthouse scores; use optimized media.

## Styling
- Colors defined via CSS variables in `src/styles/global.css`.
- Fonts loaded from Google Fonts (Cormorant Garamond, Atkinson Hyperlegible, IBM Plex Mono).

## Deployment
Any static hosting (Netlify, Vercel). Run `npm run build` and deploy `dist`.

## Next Steps Backlog
- RSS feed & sitemap
- Dark mode respecting contrast
- Analytics without cookies

## Definition of Done
- Build passes with no TS errors.
- Lighthouse ≥90 on key pages.
- Axe: 0 serious/critical violations.
- Keyboard-only walkthrough passes.
- Two sample projects show hover video with indicator and fallback.
- Minimal JS: islands only where specified.
