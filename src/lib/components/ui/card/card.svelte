<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		class: className,
		children,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & { children?: Snippet } = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn('bg-card text-card-foreground rounded-xl border shadow-sm', className)}
	{...restProps}
>
	{@render children?.()}
</div>