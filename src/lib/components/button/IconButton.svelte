<script lang="ts">
    import type {Snippet} from "svelte";
    import {type ButtonVariant, getButtonStyle} from "./button";

    type Props = {
        children?: Snippet;
        type: ButtonVariant;
        onClick: () => void;
        extraClass?: string;
        isDisabled?: boolean;
    };

    let {children, type, extraClass, isDisabled, onClick}: Props = $props();
    let classNames = $derived(getButtonStyle(type, isDisabled, extraClass));
</script>

<button onclick={isDisabled ? undefined : onClick} class={classNames}>
    {#if children}
        {@render children()}
    {/if}
</button>