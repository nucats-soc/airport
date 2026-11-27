import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonShape = 'square' | 'pill';

export type ButtonProps = {
	variant: ButtonVariant;
	shape?: ButtonShape;
	fill?: boolean;
	between?: boolean;
	class?: ClassValue;
	children?: Snippet;
};

export function getButtonClasses({
	variant,
	shape = 'pill',
	fill = false,
	between = false
}: ButtonProps): ClassValue {
	return [
		'inline-flex items-center gap-xs transition-colors cursor-pointer',
		'disabled:cursor-not-allowed disabled:opacity-60',
		{
			'text-white bg-brand not-disabled:hover:brightness-120': variant === 'primary',
			'text-white bg-zinc-700 not-disabled:hover:bg-zinc-600': variant === 'secondary',
			'text-white bg-zinc-900 not-disabled:hover:bg-zinc-800': variant === 'tertiary',
			'text-zinc-300 not-disabled:hover:bg-zinc-700 not-disabled:hover:text-white':
				variant === 'ghost'
		},
		shape === 'square' ? 'p-xs aspect-square rounded-lg' : 'px-lg py-xs rounded-full',
		between ? 'justify-between' : 'justify-center',
		fill && 'w-full'
	];
}
