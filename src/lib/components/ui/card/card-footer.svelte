<script lang="ts">
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import { cn, type WithElementRef } from '$lib/utils.js';
let { class: className, children, ref = $bindable(null), ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();
</script>
<div bind:this={ref} data-slot="card-footer" class={cn('flex items-center p-6 pt-0', className)} {...restProps}>
{@render children?.()}
</div>
