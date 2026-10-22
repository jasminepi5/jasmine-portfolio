// Logos are rendered by src/components/Icon.astro. Most come from Simple Icons
// (https://icon-sets.iconify.design/simple-icons/), added as "simple-icons:<name>".
// Simple Icons doesn't carry some brands (e.g. Java), so those come from Font Awesome brands
// (https://icon-sets.iconify.design/fa6-brands/) as "fa6-brands:<name>".
// TODO: edit this list so it matches your CV.
type LogoName = `${'simple-icons' | 'fa6-brands'}:${string}`;

export const skillGroups: { title: string; skills: { name: string; icon: LogoName }[] }[] = [
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
			{ name: 'React', icon: 'simple-icons:react' },
			{ name: 'Node.js', icon: 'simple-icons:nodedotjs' },
			{ name: 'Next.js', icon: 'simple-icons:nextdotjs' },
			{ name: 'Preact', icon: 'simple-icons:preact' },
			{ name: 'Astro', icon: 'simple-icons:astro' },
			{ name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },

		],
	},
	{
		title: 'Databases & tools',
		skills: [
			{ name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
			{ name: 'Supabase', icon: 'simple-icons:supabase' },
			{ name: 'Git', icon: 'simple-icons:git' },
			{ name: 'Android Studio', icon: 'simple-icons:androidstudio' },

		],
	},
];
