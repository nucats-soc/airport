<script lang="ts">
	import classNames from 'classnames';

	type IconSize = 'sm' | 'md' | 'lg';

	interface Props {
		icon: string;
		size?: IconSize;
		extraClass?: string;
	}

	let { icon, size = 'md', extraClass }: Props = $props();

	const sizeClasses: Record<IconSize, string> = {
		sm: 'size-4',
		md: 'size-6',
		lg: 'size-8'
	};
</script>

<span class={classNames(icon, sizeClasses[size], 'shrink-0', extraClass)} aria-hidden="true"></span>
