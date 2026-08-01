import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'icon';

export function getButtonStyle(
	type: ButtonVariant,
	isDisabled: boolean | undefined,
	extraClass: string | undefined
): string {
	return classNames(
		{
			'bg-green-700 hover:bg-green-600 active:bg-green-600 py-3 px-6':
				type == 'primary' && !isDisabled,
			'bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 py-3 px-6':
				type == 'secondary' && !isDisabled,
			'bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 py-3 px-4': type == 'icon' && !isDisabled,

			'cursor-not-allowed opacity-60': isDisabled,
			'cursor-pointer': !isDisabled
		},
		'tx-button-label text-white rounded-full',
		'transition-colors duration-200',
		'inline-flex items-center justify-center gap-4',
		extraClass
	);
}
