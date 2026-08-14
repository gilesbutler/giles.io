import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Case-study projects - the stacking folder-card deck on the home page and
 * each project's own detail page. Edit the markdown files in src/content/work/.
 */
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    /** Two short category labels shown as folder-tab tags on the card. */
    tags: z.array(z.string()).default([]),
    image: z.string(),
    /** The small "JPG <name>" meta badge on the card image. */
    imageLabel: z.string().default("image.jpg"),
    imageAlt: z.string().default(""),
    /** Card background color (any CSS color). */
    cardColor: z.string(),
    /** Text color on the card body. */
    cardText: z.enum(["dark", "light"]).default("dark"),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/**
 * Journal / field notes - optional writing collection (blog).
 */
const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string().default("Notes"),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, journal };
