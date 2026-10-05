<script lang="ts">
	import classNames from 'classnames';

	type Props = {
		expanded: boolean;
	};

	let { expanded }: Props = $props();

	let classes = $derived(
		classNames(
			'icon-[material-symbols--keyboard-arrow-down] size-4 transition-transform duration-300',
			{
				'rotate-180': expanded
			}
		)
	);
</script>

<span class={classes}> </span>
