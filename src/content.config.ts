import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'; // you don't need to install Zod as dependency thanks to Astro.


const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

/**
 * Project schema for displaying individual projects in the project post.
 * Works similarly to blog posts in default templates.
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
			liveDemoLink: z.url().optional()
		}),
});

// For now there's really only ever 2 section types for the About section timeline.
const sectionTypes = ["Education", "Experience"] as const;
const timelineItems = defineCollection({
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

export const collections = { 
	blog, 
	project,
	timelineItems
};
