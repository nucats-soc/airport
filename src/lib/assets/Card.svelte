<script>
    import Button from "$lib/assets/Button.svelte";
    let {
        title,
        description,
        buttonText,
        buttonLink
    } = $props();
</script>

<div class="bg-zinc-800 p-4 rounded-lg border border-zinc-700 flex-1 flex flex-col">
    <h2 class="text-lg font-bold mb-2">{@html title}</h2>
    <p class="mb-4">{description}</p>
    <div class="mt-auto">
        <Button value={buttonText}  type="secondary" isLinkButton onClick={() => window.open(buttonLink)} />
    </div>
</div>