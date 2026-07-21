<script>
    let { children } = $props();
</script>

<div class="mx-auto w-full max-w-225">
    {#if children}
        {@render children()}
    {/if}
</div>
