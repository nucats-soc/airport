import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'icon' | 'compact';

export function getButtonStyle(
	type: ButtonVariant,
	isDisabled: boolean | undefined,
	extraClass: string | undefined,
	isSelected: boolean | undefined = false
): string {
	return classNames(
		{
			'bg-green-700 px-6 py-3 hover:bg-green-600 active:bg-green-600':
				type == 'primary' && !isDisabled,
			'bg-zinc-700 px-6 py-3 hover:bg-zinc-600 active:bg-zinc-700':
				type == 'secondary' && !isDisabled,
			'px-4 py-3 text-zinc-400 hover:bg-zinc-700 hover:text-white active:bg-zinc-700':
				type == 'subtle' && !isDisabled,
			'bg-zinc-700 size-9 hover:bg-zinc-600 active:bg-zinc-700': type == 'icon' && !isDisabled,
			'min-w-16 px-3 py-2': type == 'compact',
			'bg-zinc-600 text-white': type == 'compact' && isSelected,
			'text-zinc-200 hover:bg-zinc-600': type == 'compact' && !isSelected && !isDisabled,
			'cursor-not-allowed opacity-60': isDisabled,
			'cursor-pointer': !isDisabled
		},
		'tx-button-label',
		type == 'compact' ? 'rounded-lg' : 'rounded-full',
		type != 'subtle' && type != 'compact' && 'text-white',
		'transition-colors duration-200',
		'inline-flex items-center justify-center gap-4',
		extraClass
	);
}
