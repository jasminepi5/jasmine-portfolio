import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'; // you don't need to install Zod as dependency thanks to Astro.


/**
 * Project schema for displaying individual projects in the project post.
 */
const project = defineCollection({
	// Load Markdown and MDX files in the `src/content/projects/` directory.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			type: z.string(), // what kind of product (e.g. web-app, android, desktop, etc.)
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			location: z.string().optional(),
			techStack: z.array(z.string()),
			githubLink: z.url().optional(),
			liveDemoLink: z.url().optional(),
			/** Hidden from production builds (still shown in `astro dev`) until the write-up is ready. */
			draft: z.boolean().default(false),
			/** Listed before non-featured projects, so a strong older project can lead. */
			featured: z.boolean().default(false),
		}),
});

// For now there's really only ever 2 section types for the About section timeline.
const sectionTypes = ["Education", "Experience"] as const;
const timelineItem = defineCollection({
	// We store timeline in just one JSON file (not multiple markdowns.)
	loader: file('./src/data/timeline.json'),

	schema: z.object({
		/** What timeline category/section does this belong to (e.g. Education, Experience). */
		section: z.enum(sectionTypes),

		/** Job title, position name, or degree/name */
		title: z.string(),

		/** Company name or school/Uni name */
		organisation: z.string(),

		/** Additional info. like: "Part-time", "Contract Work", or "Specialization: XYZ", etc. */
		extraDetails: z.string().optional(),
		
		/** E.g. Melbourne, VIC. Surabaya, Indonesia. Melbourne, Australia. etc. */
		location: z.string().optional(),

		// JSON stores date as strings. Zod's z.date() only accepts actual Date objects. Use .coerce
		// z.coerce.date() takes the string from JSON and converts into real Date object, then validates it.

		/** YYYY-MM-DD or YYYY-MM. */
		startDate: z.coerce.date(),

		/** YYYY-MM-DD or YYYY-MM. */
		endDate: z.coerce.date().optional(),
		
		bulletPoints: z.array(z.string()).optional(),

	}),
});

// To be able to use these collections in other parts of the project code,
// export each of these collection.
export const collections = {
	project,
	timelineItem
};
