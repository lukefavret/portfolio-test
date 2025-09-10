# Astro Portfolio – "Wright" Theme

This is a complete, production-ready portfolio website built with **Astro** and **Tailwind CSS**. It is designed to be **modular, extensible, impeccably clean, and heavily documented**. The aesthetic is inspired by the clean, editorial look of the Wright brothers' patent documents—tasteful, not gimmicky.

The core philosophy is to **use as little JavaScript as reasonably possible**, favoring Astro's server-first rendering, native HTML, and CSS. Client-side JavaScript is used sparingly and intentionally through Astro Islands for specific interactive features.

**Live Demo:** [TODO: Add link to your deployed site]

![Screenshot of the portfolio homepage](public/media/placeholder-16-9.png)
_TODO: Replace with a screenshot of your actual deployed site._

## Key Features

-   **Framework**: Astro (TypeScript enabled)
-   **Styling**: Tailwind CSS with a CSS variable-based theming system.
-   **Content**: All project data is managed through **Astro Content Collections** for type-safety and easy updates.
-   **Accessibility**: Aims for **WCAG 2.2 AA** compliance, with semantic HTML, full keyboard navigability, visible focus states, and `prefers-reduced-motion` support.
-   **Performance**: Built for a 90+ Lighthouse score across all categories.
-   **Minimal JS**: Client-side islands are used only for the tag filter, email obfuscation, and video hover behavior.

---

## Architecture

The project follows a standard Astro project structure.

-   `src/components`: Reusable components, categorized into `global`, `ui`, `utility`, and `interactive` (client islands).
-   `src/content`: Contains the content collections, with `projects/` holding all project Markdown files.
-   `src/layouts`: The main `BaseLayout.astro` provides the HTML shell for all pages.
-   `src/pages`: Defines the routes for the website.
-   `src/styles`: Global CSS, including theme variables and focus ring styles.
-   `public`: Static assets like images, fonts, and documents.

### Islands Architecture

Client-side JavaScript is handled by Preact components rendered via Astro Islands. This ensures that JS is only shipped to the browser for components that absolutely need it. The current islands are:
-   `TagFilter.tsx`: Manages the state of the portfolio filter.
-   `EmailObfuscator.tsx`: Constructs `mailto:` links on the client to deter basic scrapers.
-   The `<script>` within `ProjectCard.astro` handles the hover-to-play video logic.

---

## Project Setup & Installation

Follow these steps to get the project running locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.0.0 or higher)
-   [pnpm](https://pnpm.io/) (or npm/yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:4321`.

---

## Available Scripts

-   `npm run dev`: Starts the development server with hot-reloading.
-   `npm run build`: Builds the static site for production to the `dist/` directory.
-   `npm run preview`: Serves the production build locally to preview before deploying.
-   `npm run lint`: Lints the code using ESLint to check for errors and style issues.
-   `npm run format`: Formats all code using Prettier.
-   `npm run check:a11y`: Runs the `axe-core` accessibility checker against the live dev server. **Important for verifying WCAG compliance.**

---

## Content Management

### Adding a New Project

1.  Create a new Markdown file in `src/content/projects/`, for example `my-new-project.md`.
2.  Add the required frontmatter fields as defined in the schema (`src/content/config.ts`).
3.  Write the project's "STAR Overview" in the body of the Markdown file.
4.  Add your media assets to `public/media/` and update the `media` frontmatter fields.

### Media Pipeline

For optimal performance, media should be carefully optimized.

-   **Images**:
    -   Run images through an optimizer like [ImageOptim](https://imageoptim.com/mac) or [Squoosh](https://squoosh.app/).
    -   Serve next-gen formats like WebP or AVIF if possible. Astro's `<Image />` component can help automate this.
-   **Videos**:
    -   Keep hover videos **short (3-5 seconds)** and **small in file size (< 1MB)**.
    -   Provide both `.mp4` and `.webm` formats for broad browser support. `ffmpeg` is an excellent tool for this conversion.
    -   Example `ffmpeg` command: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm`

---

## Styling & Theming

The site uses Tailwind CSS with a thin layer of CSS variables for theming.

-   **Theme Colors**: The core colors (`--color-bg`, `--color-text`, `--color-accent`) are defined in `src/styles/global.css`. You can change these values to instantly re-theme the entire site.
-   **Fonts**: The fonts (`Cormorant Garamond`, `Atkinson Hyperlegible`, `IBM Plex Mono`) are configured in `tailwind.config.cjs` and imported in `src/styles/global.css`. For production, it is highly recommended to **self-host these fonts** to avoid reliance on Google Fonts and improve performance.

---

## Accessibility Testing

Ensuring the site is accessible is a primary goal. Here is a checklist for testing:

1.  **Automated Check**: Run `npm run check:a11y` to catch common violations with Axe. Aim for 0 critical/serious issues.
2.  **Keyboard Walk-through**:
    -   Can you navigate the entire site using only the `Tab` key?
    -   Is the focus indicator (`.focus-ring`) always visible and clear?
    -   Can you operate all interactive elements (links, buttons, filters) with `Enter` or `Space`?
3.  **Screen Reader Test**: Use a screen reader (VoiceOver, NVDA, JAWS) to navigate the site.
    -   Are landmarks (`header`, `nav`, `main`, `footer`) correctly identified?
    -   Is `alt` text meaningful?
    -   Are `aria` attributes used correctly (e.g., `aria-current`, `aria-live`)?
4.  **Reduced Motion Check**: Enable the "Reduce Motion" setting in your OS.
    -   Do hover videos pause and show the image fallback?
    -   Are all animations (like smooth scrolling) disabled?

---

## Deployment

This Astro site is fully static and can be deployed to any static hosting provider.

### Vercel / Netlify

1.  Connect your Git repository to Vercel or Netlify.
2.  Set the build command to `npm run build`.
3.  Set the output directory to `dist`.
4.  Deploy.

No environment variables are required by default.

---

## Definition of Done

-   [x] Build passes with no TS errors.
-   [ ] Lighthouse ≥ 90 for Performance/Best Practices/Accessibility/SEO on `/`, `/portfolio`, and one case-study page.
-   [ ] Axe: 0 serious/critical violations.
-   [ ] Keyboard-only walkthrough passes on all pages.
-   [ ] Two sample projects show hover video with `►` and image fallback when reduced motion is enabled.
-   [x] Minimal JS: no large client bundles; islands only where specified.

_Note: Items are checked if they are programmatically verifiable. The unchecked items require manual testing of the final deployed product._

---

## Next Steps & Future Improvements

This codebase is a strong foundation. Here are some potential next steps:

-   **RSS Feed**: Add an RSS feed for the portfolio projects.
-   **Sitemap**: Generate a `sitemap.xml` for better SEO.
-   **Image Optimization**: Integrate `@astrojs/image` for automatic image optimization.
-   **Analytics**: Add a privacy-focused analytics tool like Plausible or Fathom.
-   **Dark Mode**: Implement a dark mode toggle, ensuring all color contrasts remain AA compliant.
-   **i18n**: Add internationalization support if needed.
