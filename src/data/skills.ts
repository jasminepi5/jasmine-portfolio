// Logos are rendered by src/components/Icon.astro. Most come from Simple Icons
// (https://icon-sets.iconify.design/simple-icons/), added as "simple-icons:<name>".

// Simple Icons doesn't carry some brands (e.g. Java), so those come from Font Awesome brands
// (https://icon-sets.iconify.design/fa6-brands/) as "fa6-brands:<name>".

// This list is the source of truth: keep the CV in step with it.
type LogoName = `${'simple-icons' | 'fa6-brands'}:${string}`;

export const skillGroups: {
	title: string;
	skills: { name: string; icon: LogoName }[] }[] = [

	{
		title: 'Languages',
		skills: [
			{ name: 'TypeScript', icon: 'simple-icons:typescript' },
			{ name: 'JavaScript', icon: 'simple-icons:javascript' },
			{ name: 'Python', icon: 'simple-icons:python' },
			{ name: 'Kotlin', icon: 'simple-icons:kotlin' },

			// Optimistic wishlist:
			// { name: 'C', icon: 'simple-icons:c' },
			// { name: 'C++', icon: 'simple-icons:cplusplus' },
		],
	},
	{
		title: 'Frameworks & libraries',
		skills: [
			{ name: 'React.js', icon: 'simple-icons:react' },
			{ name: 'Next.js', icon: 'simple-icons:nextdotjs' },
			{ name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },

			// Really only for 1 project, Astro for portfolio only.
			// { name: 'Preact', icon: 'simple-icons:preact' },
			// { name: 'Astro', icon: 'simple-icons:astro' },

		],
	},
	{
		title: 'Backend & databases',
		skills: [
			{ name: 'Node.js', icon: 'simple-icons:nodedotjs' },
			{ name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
			{ name: 'Supabase', icon: 'simple-icons:supabase' },
		],
	},
	{
		title: 'Testing',
		skills: [
			{ name: 'Playwright', icon: 'simple-icons:playwright' },
			{ name: 'Pytest', icon: 'simple-icons:pytest' },
		],
	},
	{
		title: 'Tools',
		skills: [
			{ name: 'Git', icon: 'simple-icons:git' },
			{ name: 'VS Code', icon: 'simple-icons:visualstudiocode' },
			{ name: 'Android Studio', icon: 'simple-icons:androidstudio' },
			{ name: 'Jira', icon: 'simple-icons:jira' },

			// { name: 'Vite', icon: 'simple-icons:vite' },
		],
	},
];

// To consider: object list vs json for these things which one is better?
