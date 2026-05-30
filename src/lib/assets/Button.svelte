<script lang="ts">
    import classNames from "classnames";

    interface Props {
        value: string;
        onClick?: () => void;
        isLinkButton?: boolean;
        isDisabled?: boolean;
        type: "primary" | "secondary";
    }

    let {value, onClick, isLinkButton, isDisabled, type}: Props = $props();
    let classes = $derived(
        classNames(
            {
                "border-green-600 bg-green-700 hover:border-green-500 hover:bg-green-600 active:bg-green-600": type == "primary",
                "border-zinc-600 bg-zinc-700 hover:border-zinc-500 hover:bg-zinc-600 active:bg-zinc-700": type == "secondary",
                "cursor-not-allowed opacity-60": isDisabled,
            },
            "text-white",
            "leading-5",
            "border",
            "transition-colors",
            "duration-200",
            "rounded-md",
            "py-2",
            "px-4",
            "inline-flex",
            "items-center",
            "justify-center",
            "gap-2"
        )
    )
</script>

<button class={classes} onclick={onClick} disabled={isDisabled}>
    {value}
    {#if isLinkButton}
        <span class="icon-[tabler--arrow-up-right] size-4 shrink-0"></span>
    {/if}
</button>
