<script lang="ts">
    import classNames from "classnames";
    import type {Snippet} from "svelte";

    interface Props {
        left: Snippet;
        right: Snippet;
        gap?: "sm" | "md" | "lg";
        class?: string;
    }

    let {left, right, gap = "lg", class: extraClass}: Props = $props();

    let layoutClasses = $derived(
        classNames(
            {
                "gap-4": gap == "sm",
                "gap-4 md:gap-6": gap == "md",
                "gap-6 md:gap-8": gap == "lg",
            },
            "grid",
            "grid-cols-1",
            "md:grid-cols-2",
            extraClass
        )
    );
</script>

<div class={layoutClasses}>
    <div class="flex min-w-0">
        {@render left()}
    </div>
    <div class="flex min-w-0">
        {@render right()}
    </div>
</div>
