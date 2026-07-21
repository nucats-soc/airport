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
                "flex-col md:flex-row": type == "horizontal",
                "flex-col": type == "vertical",
            },
            "bg-zinc-800",
            "rounded-[1.25rem]",
            "flex",
            "flex-1",
            "min-w-0",
            "overflow-hidden"
        )
    );

    let contentClasses = $derived(
        classNames(
            {
                "gap-3 p-5": padding == "sm",
                "gap-5 p-7": padding == "md",
                "gap-6 p-9": padding == "lg",
            },
            "flex",
            "flex-1",
            "flex-col",
            "min-w-0"
        )
    );

    let thumbnailClasses = $derived(
        classNames(
            {
                "w-full md:min-w-64 md:w-1/3 md:max-w-90": type == "horizontal",
                "w-full": type == "vertical",
            },
            "flex",
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
            <div class="mt-auto flex justify-center">
                {@render footer()}
            </div>
        {/if}
    </div>
</div>
