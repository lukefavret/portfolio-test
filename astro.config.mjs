import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

// Astro configuration with Tailwind and content collections.
export default defineConfig({
  integrations: [tailwind(), preact()],
  srcDir: 'src',
  server: {
    host: true,
  },
  markdown: {
    syntaxHighlight: false,
  },
});
