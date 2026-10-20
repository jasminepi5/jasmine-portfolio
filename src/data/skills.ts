// Logos are Simple Icons, rendered by src/components/Icon.astro.
// Find more names at https://icon-sets.iconify.design/simple-icons/ and add them as "simple-icons:<name>".
// TODO: edit this list so it matches your CV.
export const skillGroups: { title: string; skills: { name: string; icon: `simple-icons:${string}` }[] }[] = [
	{
		title: 'Languages',
		skills: [
			{ name: 'TypeScript', icon: 'simple-icons:typescript' },
			{ name: 'JavaScript', icon: 'simple-icons:javascript' },
			{ name: 'Kotlin', icon: 'simple-icons:kotlin' },
			{ name: 'C++', icon: 'simple-icons:cplusplus' },
		],
	},
	{
		title: 'Frameworks & libraries',
		skills: [
			{ name: 'React', icon: 'simple-icons:react' },
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
