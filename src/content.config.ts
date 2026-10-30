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

			// cover image
			heroImage: z.optional(image()),
			
			/** E.g. <City>, <State> or <City>, <Country>. */
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
		
		/**
		 * Displays bullet points as a list of strings. Allows a list of strings
		 * within a bullet point item.
		 * 
		 * For example:
		 * - Bla bla bla works and is just displayed as a bullet point "Bla bla bla".
		 * - { title: "bla", "contents": ["blu", "bli", "blue"] } is displayed as "Bla: - blu\n-bli\n-blo".
		 */
		bulletPoints: z.array(z.union([
			z.string(), 
			z.object({
				title: z.string(),
				contents: z.array(z.string())
			})
		])).optional()

	}),
});

// When you get into the hang of it, this is lowkey fun lol. But it takes so much time, energy, and effort to learn a new tool :(

/** Books I've read / found useful collection. For later updates. */
const book = defineCollection({
	// Load Markdown and MDX files in the `src/content/books/` directory.
	loader: glob({ base: './src/content/books', pattern: '**/*.{md,mdx}' }),

	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string(),
			edition: z.string().optional(),
			cover: image().optional(),

			// To keep track of what individual chapters I've read. Because surely I 
			// wouldn't be reading ALL the chapters of ALL the books I read (that would be a lot).
			chapters: z.array(z.object({
				headingTitle: z.string(),
				readStatus: z.boolean()
			})),

			review: z.string().optional()

			// No need for synopsis or description. People can just search these online.
			// Assuming online records will still exist. Hopefully.
		}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),

	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		overview: z.string().optional(),

		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

// To be able to use these collections in other parts of the project code,
// export each of these collection.
export const collections = {
	project,
	timelineItem,

	// Add these back once src/content/books/ and src/content/blog/ have a post in them.
	// An empty or missing folder makes every build and dev start print a glob-loader warning.
	// book,
	// blog
};
