<script lang="ts">
import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import { cn, type WithElementRef } from '$lib/utils.js';
import { badgeVariants, type BadgeVariant } from './index.js';
let { ref = $bindable(null), href, class: className, variant = 'default', children, ...restProps }: WithElementRef<HTMLAnchorAttributes> & { variant?: BadgeVariant; children?: Snippet } = $props();
</script>
<svelte:element this={href ? 'a' : 'span'} bind:this={ref} data-slot="badge" {href} class={cn(badgeVariants({ variant }), className)} {...restProps}>
{@render children?.()}
</svelte:element>
