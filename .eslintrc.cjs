/**
 * ESLint Configuration
 * @see https://eslint.org/docs/latest/use/configure/
 *
 * This configuration enforces a consistent and high-quality code style.
 * It is specifically tailored for an Astro project using TypeScript and Preact (for JSX).
 *
 * Key features:
 * - `eslint:recommended`: Core ESLint rules.
 * - `plugin:astro/recommended`: Best practices for Astro files.
 * - `plugin:jsx-a11y/recommended`: Accessibility rules for JSX components.
 * - TypeScript support via `@typescript-eslint/parser`.
 */
module.exports = {
  // Specifies the root of the ESLint configuration.
  root: true,

  // Defines the environment, enabling global variables for browser and Node.js.
  env: {
    node: true,
    es2022: true,
    browser: true,
  },

  // Extends recommended rule sets.
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  // Specifies the parser for TypeScript.
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // Defines rules for specific file types.
  overrides: [
    {
      // Rules specifically for Astro files.
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // Add or override Astro-specific rules here if needed.
      },
    },
    {
      // Rules specifically for TypeScript/TSX files.
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // Add or override TypeScript-specific rules here if needed.
      },
    },
  ],
};
