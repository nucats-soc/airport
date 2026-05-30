<script lang="ts">
    import classNames from "classnames";

    interface Props {
        value: string;
        onClick?: () => void;
        isLinkButton?: boolean;
        isDisabled?: boolean;
        type: "primary" | "secondary";
    }

    let {value, onClick, isLinkButton, type}: Props = $props();
    let classes = $derived(
        classNames(
            {
                "bg-green-600 border-green-500 hover:bg-green-500 hover:border-green-400": type == "primary",
                "bg-zinc-700 border-zinc-600 hover:bg-zinc-600 hover:border-zinc-500": type == "secondary",
            },
            "text-white",
            "border",
            "transition-colors",
            "duration-200",
            "rounded-lg",
            "py-1",
            "px-4"
        )
    )
</script>

<button class={classes} onclick={onClick}>
    {value}
    {#if isLinkButton}
        <span class="icon-[tabler--arrow-up-right]"></span>
    {/if}
</button>