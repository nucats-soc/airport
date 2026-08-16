import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export function getButtonStyle(
	type: ButtonVariant,
	isDisabled: boolean | undefined,
	extraClass: string | undefined
): string {
	return classNames(
		{
			'bg-green-700 px-6 py-3 hover:bg-green-600 active:bg-green-600':
				type == 'primary' && !isDisabled,
			'bg-zinc-700 px-6 py-3 hover:bg-zinc-600 active:bg-zinc-700':
				type == 'secondary' && !isDisabled,
			'bg-zinc-700 px-4 py-3 hover:bg-zinc-600 active:bg-zinc-700': type == 'icon' && !isDisabled,

			'cursor-not-allowed opacity-60': isDisabled,
			'cursor-pointer': !isDisabled
		},
		'tx-button-label rounded-full text-white',
		'transition-colors duration-200',
		'inline-flex items-center justify-center gap-4',
		extraClass
	);
}
