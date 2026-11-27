<script lang="ts">
	type Props = {
		expanded: boolean;
	};

	let { expanded }: Props = $props();
</script>

<span
	class={[
		'icon-[material-symbols--keyboard-arrow-down] size-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none',
		expanded && 'rotate-180'
	]}
	aria-hidden="true"
></span>
