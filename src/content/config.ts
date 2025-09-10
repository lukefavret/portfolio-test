// src/content/config.ts
import { defineCollection, z } from 'astro:content';

/**
 * Content Collection for Projects
 *
 * This file defines the schema for the `projects` content collection.
 * Astro's content collections provide data validation, type-safety, and
 * helper functions for querying Markdown or MDX files.
 *
 * The schema is defined using Zod, a TypeScript-first schema validation library.
 * @see https://docs.astro.build/en/guides/content-collections/
 * @see https://zod.dev/
 */

// Define the 'projects' collection.
const projectsCollection = defineCollection({
  // Type 'content' means the main body of the document will be processed as Markdown/MDX.
  type: 'content',
  // The schema defines the expected frontmatter for each project file.
  schema: z.object({
    /** The main title of the project. */
    title: z.string(),
    /** A short, one-sentence summary of the project. Used for cards and meta descriptions. */
    summary: z.string(),
    /** The date the project was published, in ISO 8601 format (YYYY-MM-DD). Used for sorting. */
    date: z.string().transform((str) => new Date(str)), // Transform string to Date object
    /** A list of tags categorizing the project. */
    tags: z.array(z.string()),
    /** The main discipline or role for the project, e.g., "UX Design / Full Stack Dev." */
    discipline: z.string().default('UX Design / Full Stack Dev.'),
    /** A human-readable date range for display, e.g., "July–August 2025" */
    displayedDate: z.string().optional(),
    /** A boolean indicating if there is a live prototype to link to. */
    hasPrototype: z.boolean().optional(),
    /** The URL for the live prototype, if it exists. */
    prototypeUrl: z.string().url().optional(),
    /** The URL for the git repository, if it exists. */
    repoUrl: z.string().url().optional(),
    /** An object containing paths to media assets. */
    media: z.object({
      /** The primary thumbnail image for the project card. */
      thumbnailImage: z.string().optional(),
      /** A short, looping video to show on hover. */
      hoverVideo: z.string().optional(),
      /** Meaningful alt text for the thumbnail, or empty if decorative. */
      alt: z.string(),
    }),
  }),
});

// Export the collections object to be registered by Astro.
export const collections = {
  projects: projectsCollection,
};
