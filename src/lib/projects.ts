import { getCollection } from 'astro:content';

/**
 * Projects to list on the site: drafts are left out of production builds (but kept in `astro dev`
 * so you can preview them), then featured projects come first and the rest are newest first.
 */
export async function getPublishedProjects() {
	const projects = await getCollection('project', ({ data }) => import.meta.env.DEV || !data.draft);
	return projects.sort(
		(a, b) =>
			Number(b.data.featured) - Number(a.data.featured) || b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}
