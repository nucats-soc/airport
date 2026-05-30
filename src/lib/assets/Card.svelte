<script lang="ts">
    import classNames from "classnames";
    import type {Snippet} from "svelte";

    interface Props {
        type?: "horizontal" | "vertical";
        padding?: "sm" | "md" | "lg";
        thumbnail?: Snippet;
        children?: Snippet;
        footer?: Snippet;
    }

    let {
        type = "vertical",
        padding = "md",
        thumbnail,
        children,
        footer
    }: Props = $props();

    let cardClasses = $derived(
        classNames(
            {
                "flex-row": type == "horizontal",
                "flex-col": type == "vertical",
            },
            "bg-zinc-800",
            "rounded-lg",
            "border",
            "border-zinc-700",
            "flex",
            "flex-1",
            "overflow-hidden"
        )
    );

    let contentClasses = $derived(
        classNames(
            {
                "gap-3 p-4": padding == "sm",
                "gap-4 p-6": padding == "md",
                "gap-6 p-8": padding == "lg",
            },
            "flex",
            "flex-1",
            "flex-col"
        )
    );

    let thumbnailClasses = $derived(
        classNames(
            {
                "min-w-36 w-1/3 max-w-80": type == "horizontal",
                "w-full": type == "vertical",
            },
            "shrink-0"
        )
    );
</script>

<div class={cardClasses}>
    {#if thumbnail}
        <div class={thumbnailClasses}>
            {@render thumbnail()}
        </div>
    {/if}

    <div class={contentClasses}>
        <div class="flex flex-col gap-2">
            {#if children}
                {@render children()}
            {/if}
        </div>

        {#if footer}
            <div class="mt-auto">
                {@render footer()}
            </div>
        {/if}
    </div>
</div>
