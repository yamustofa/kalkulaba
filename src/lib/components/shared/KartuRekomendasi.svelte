<script lang="ts">
import { Sparkles, CheckCircle2, AlertTriangle } from '@lucide/svelte';

let { rekomendasi }: { rekomendasi: string[] } = $props();
</script>

{#if rekomendasi.length > 0}
<div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
<div class="mb-2 flex items-center gap-1.5 text-sm font-medium text-amber-900">
<Sparkles class="h-4 w-4" />
<span>Rekomendasi & Saran</span>
</div>
<ul class="space-y-1.5">
{#each rekomendasi as r}
{@const isWarning = r.toLowerCase().includes('rugi') || r.toLowerCase().includes('tipis') || r.toLowerCase().includes('kurang') || r.toLowerCase().includes('rendah')}
<li class="flex items-start gap-2 text-sm text-amber-900/90">
{#if isWarning}
<AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
{:else}
<CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
{/if}
<span>{r}</span>
</li>
{/each}
</ul>
</div>
{/if}
