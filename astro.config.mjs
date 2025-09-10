import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

/**
 * Astro Configuration
 * @see https://docs.astro.build/en/reference/configuration-reference/
 *
 * This configuration sets up a modern, accessible, and performant portfolio website.
 *
 * Key features enabled:
 * - Tailwind CSS: For utility-first styling, integrated via `@astrojs/tailwind`.
 * - Preact: For lightweight, client-side interactive islands (`.tsx` components).
 * - Strict TypeScript: Ensures type safety across the project.
 *
 * The configuration is designed to be clean and extensible, aligning with the
 * project's goal of creating a production-ready, heavily documented codebase.
 */
export default defineConfig({
  // Integrations are Astro's way of adding support for new frameworks and tools.
  integrations: [
    // Tailwind CSS integration for styling.
    // It handles PostCSS setup and applies Tailwind's utility classes.
    tailwind({
      // We disable the default base styles from Tailwind (`preflight`)
      // because we're providing our own fine-tuned global styles in `src/styles/global.css`.
      // This gives us more control over the base styling to match the "Wright patent" aesthetic.
      applyBaseStyles: false,
    }),
    // Preact integration for interactive components.
    // This allows us to use `.tsx` files for components that need client-side JavaScript,
    // following Astro's island architecture for minimal JS delivery.
    preact()
  ],

  // Site-wide metadata.
  // This is used for SEO and in places like the RSS feed or sitemap.
  // TODO: The user should replace these placeholder values.
  site: 'https://example.com',

  // TypeScript compiler options.
  // We enforce strict mode to catch common errors and ensure code quality.
  typescript: {
    strict: true
  }
});
