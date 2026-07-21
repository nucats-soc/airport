<script lang="ts">
    import type {Snippet} from "svelte";
    import {type ButtonVariant, getButtonStyle} from "./button";

    type Props = {
        children?: Snippet;
        type: ButtonVariant;
        href: string;
        isExternal?: boolean;
        extraClass?: string;
        isDisabled?: boolean;
    };

    let {children, type, extraClass, isDisabled, href, isExternal}: Props = $props();

    let target = $derived(isExternal ? "_blank" : "_self");
    let rel = $derived(isExternal ? "noopener noreferrer" : undefined);
    let classNames = $derived(getButtonStyle(type, isDisabled, extraClass));

</script>

<a href={isDisabled ? undefined : href} {target} {rel} class={classNames}>
    {#if children}
        {@render children()}
    {/if}
    {#if isExternal}
        <span class="icon-[material-symbols--arrow-outward] size-4 shrink-0"></span>
    {/if}
</a>