import classNames from 'classnames';
import type { Snippet } from 'svelte';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps = {
	type: ButtonType;
	fill?: boolean;
	between?: boolean;
	children?: Snippet;
};

export function getButtonClasses(props: ButtonProps): string {
	return classNames(
		'flex items-center gap-xs px-lg py-xs hover:brightness-120 hover:cursor-pointer rounded-full',
		{
			'text-white bg-brand': props.type === 'primary',
			'text-white bg-zinc-700': props.type === 'secondary',
			'text-white bg-zinc-900': props.type === 'tertiary'
		},
		{
			'w-full': props.fill ?? false,
			'justify-between': props.between ?? false
		}
	);
}
