<script lang="ts">
import { cn } from '$lib/utils.js';

let {
label,
nilai,
hint,
utama = false,
positif = false,
negatif = false,
class: className
}: {
label: string;
nilai: string;
hint?: string;
utama?: boolean;
positif?: boolean;
negatif?: boolean;
class?: string;
} = $props();
</script>

<div class={cn('flex items-baseline justify-between gap-3 py-2', utama && 'border-b pb-3', className)}>
<div class="flex flex-col">
<span class={cn('text-muted-foreground', utama ? 'text-sm' : 'text-sm')}>{label}</span>
{#if hint}
<span class="text-muted-foreground/70 text-xs">{hint}</span>
{/if}
</div>
<span
class={cn(
'font-semibold tabular-nums',
utama ? 'text-primary text-2xl' : 'text-base',
positif && 'text-emerald-600',
negatif && 'text-destructive'
)}
>
{nilai}
</span>
</div>
