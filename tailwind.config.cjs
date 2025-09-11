const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 *
 * Tailwind CSS Configuration
 *
 * This configuration file sets up the design system for the portfolio,
 * adhering to the "Wright brothers patent" aesthetic.
 *
 * It uses CSS variables for theming, allowing for easy adjustments
 * and potential future features like dark mode.
 *
 * Key features:
 * - Theming: Colors are sourced from CSS variables defined in `src/styles/global.css`.
 * - Typography: Custom fonts `Cormorant Garamond`, `Atkinson Hyperlegible`, and `IBM Plex Mono` are defined.
 * - Spacing: A consistent spacing scale is used for a clean, editorial layout.
 * - Focus Ring: A custom focus-visible utility is added for accessibility.
 */
module.exports = {
  // Specifies the files to scan for Tailwind classes.
  // This includes Astro components, layouts, pages, and Preact components.
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: [
    {
      pattern: /^tag-.*/,
    },
  ],

  theme: {
    extend: {
      // Defines the color palette using CSS variables for easy theming.
      // The actual color values are set in `src/styles/global.css`.
      colors: {
        background: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-bg) / ${opacityValue})`
            : `rgb(var(--color-bg) / 1)`,
        text: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-text) / ${opacityValue})`
            : `rgb(var(--color-text) / 1)`,
        textSecondary: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-textSecondary) / ${opacityValue})`
            : `rgb(var(--color-textSecondary) / 1)`,
        textTertiary: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-textTertiary) / ${opacityValue})`
            : `rgb(var(--color-textTertiary) / 1)`,
        accent: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-accent) / ${opacityValue})`
            : `rgb(var(--color-accent) / 1)`,
        surface: ({ opacityValue }) =>
          opacityValue
            ? `rgb(var(--color-surface) / ${opacityValue})`
            : `rgb(var(--color-surface) / 1)`,
      },

      // Defines the custom font families for the project.
      // Fallback fonts are chosen to maintain a similar feel if the primary font fails to load.
      fontFamily: {
        // Serif for headings (editorial vibe)
        'heading': ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        // Sans-serif for body text (highly legible)
        'body': ['"Atkinson Hyperlegible"', ...defaultTheme.fontFamily.sans],
        // Mono for figure captions and accents
        'mono': ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },

      // Custom text-shadow utility for subtle depth effects.
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },

  // Tailwind plugins can extend its functionality.
  plugins: [
    // Plugin for adding custom text-shadow utilities.
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
};
