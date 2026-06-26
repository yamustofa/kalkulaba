<script lang="ts">
import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import { cn, type WithElementRef } from '$lib/utils.js';
type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;
type Props = {
type?: InputType;
value?: unknown;
files?: FileList;
} & WithElementRef<Omit<HTMLInputAttributes, 'type' | 'value'>>;
let { ref = $bindable(null), value = $bindable(), type, files = $bindable(), class: className, ...restProps }: Props = $props();
</script>
{#if type === 'file'}
<input bind:this={ref} bind:files bind:value type="file" class={cn('border-input bg-background ring-offset-ring focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50', className)} {...restProps} />
{:else}
<input bind:this={ref} bind:value type={type} class={cn('border-input bg-background ring-offset-ring focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className)} {...restProps} />
{/if}
