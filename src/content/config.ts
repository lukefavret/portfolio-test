import { defineCollection, z } from 'astro:content';

/**
 * Content collection schema for portfolio projects.
 */
const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    hasPrototype: z.boolean().optional(),
    prototypeUrl: z.string().url().optional(),
    media: z.object({
      thumbnailImage: z.string().optional(),
      hoverVideo: z.string().optional(),
      alt: z.string(),
    }),
    discipline: z.string().optional(),
    displayedDate: z.string().optional(),
  }),
});

export const collections = { projects };
