<script>
    let { children } = $props();
</script>

<div class="w-full px-8 py-8">
    <div class="mx-auto w-full max-w-225">
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>
