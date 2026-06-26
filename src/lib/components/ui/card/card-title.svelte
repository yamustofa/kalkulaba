<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import { cn, type WithElementRef } from '$lib/utils.js';
let { class: className, children, ref = $bindable(null), ...restProps }: WithElementRef<HTMLAttributes<HTMLHeadingElement>> & { children?: Snippet } = $props();
</script>
<div bind:this={ref} data-slot="card-title" class={cn('font-semibold leading-none', className)} {...restProps}>
{@render children?.()}
</div>
