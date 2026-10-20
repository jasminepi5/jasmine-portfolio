// Shared Tailwind class strings for buttons and badges, used on <a>, <button> and <li> elements.

const buttonBase =
	"inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4";

const buttonVariants = {
	default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/85',
	outline: 'border-border bg-background hover:bg-muted dark:bg-muted/40 dark:hover:bg-muted',
	ghost: 'border-transparent hover:bg-accent hover:text-foreground',
};

const buttonSizes = {
	default: 'h-8 px-2.5',
	lg: 'h-9 px-3',
	icon: 'size-8',
	'icon-lg': 'size-9',
};

export function buttonClass({
	variant = 'default',
	size = 'default',
}: { variant?: keyof typeof buttonVariants; size?: keyof typeof buttonSizes } = {}) {
	return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;
}

const badgeVariants = {
	default: 'bg-primary text-primary-foreground',
	secondary: 'border border-border bg-muted text-foreground',
};

export function badgeClass({ variant = 'default' }: { variant?: keyof typeof badgeVariants } = {}) {
	return `inline-flex h-5 items-center rounded-full px-2 text-xs font-medium whitespace-nowrap ${badgeVariants[variant]}`;
}
