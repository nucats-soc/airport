<script>
    let { value, onclick, isLinkButton, isGreen, isRed } = $props();

    // these are the default classes for the button, can add/remove based on props
    let classes = $state("bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-600 hover:border-zinc-500 transition-colors duration-200 rounded-lg py-1 px-4");

    if (isGreen) {
        classes = "bg-green-600 hover:bg-green-500 text-white border border-green-500 hover:border-green-400 transition-colors duration-200 rounded-lg py-1 px-4";
    } else if (isRed) {
        classes = "bg-red-600 hover:bg-red-500 text-white border border-red-500 hover:border-red-400 transition-colors duration-200 rounded-lg py-1 px-4";
    }
</script>

<button class={classes} {onclick}>
    {value}
    {#if isLinkButton}
        <span class="icon-[tabler--arrow-up-right]"></span>
    {/if}
</button>