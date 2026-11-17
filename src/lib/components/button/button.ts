import type { Snippet } from 'svelte';
import type { ClassValue } from 'svelte/elements';

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonShape = 'square' | 'pill';

export type ButtonProps = {
	type: ButtonType;
	shape?: ButtonShape;
	fill?: boolean;
	between?: boolean;
	class?: ClassValue;
	children?: Snippet;
};

export function getButtonClasses({
	type,
	shape = 'pill',
	fill = false,
	between = false
}: ButtonProps): ClassValue {
	return [
		'inline-flex items-center gap-xs transition-colors cursor-pointer',
		'disabled:cursor-not-allowed disabled:opacity-60',
		{
			'text-white bg-brand not-disabled:hover:brightness-120': type === 'primary',
			'text-white bg-zinc-700 not-disabled:hover:bg-zinc-600': type === 'secondary',
			'text-white bg-zinc-900 not-disabled:hover:bg-zinc-800': type === 'tertiary',
			'text-zinc-300 not-disabled:hover:bg-zinc-700 not-disabled:hover:text-white': type === 'ghost'
		},
		shape === 'square' ? 'p-xs aspect-square rounded-lg' : 'px-lg py-xs rounded-full',
		between ? 'justify-between' : 'justify-center',
		fill && 'w-full'
	];
}
