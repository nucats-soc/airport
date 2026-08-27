<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Props {
		isOpen: boolean;
	}

	let { isOpen }: Props = $props();
	const transitionClasses =
		'absolute inset-0 transition-[opacity,scale,rotate] duration-200 ease-out motion-reduce:transition-none';
</script>

<span class="relative size-8" aria-hidden="true">
	<Icon
		icon="icon-[material-symbols--menu-rounded]"
		size="lg"
		extraClass={`${transitionClasses} ${isOpen ? '-rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
	/>
	<Icon
		icon="icon-[material-symbols--close-rounded]"
		size="lg"
		extraClass={`${transitionClasses} ${isOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-75 opacity-0'}`}
	/>
</span>
