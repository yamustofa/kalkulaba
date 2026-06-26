<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from './index.js';

	type Props = {
		class?: string;
		variant?: ButtonVariant;
		size?: ButtonSize;
		href?: string;
		children?: Snippet;
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes;

	let {
		class: className,
		variant = 'default',
		size = 'default',
		href = undefined,
		children,
		...restProps
	}: Props = $props();
</script>

{#if href}
	<a {href} class={cn(buttonVariants({ variant, size }), className)} {...restProps}>
		{@render children?.()}
	</a>
{:else}
	<button class={cn(buttonVariants({ variant, size }), className)} {...restProps}>
		{@render children?.()}
	</button>
{/if}