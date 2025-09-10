/**
 * PostCSS Configuration
 *
 * This file is necessary for Tailwind CSS to be processed correctly.
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 *
 * The plugins configured are:
 * - `tailwindcss`: Processes Tailwind directives and functions.
 * - `autoprefixer`: Adds vendor prefixes to CSS rules for better browser compatibility.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
