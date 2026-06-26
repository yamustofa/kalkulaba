<script lang="ts">
import { Lightbulb } from '@lucide/svelte';
import type { Snippet } from 'svelte';

let { rumus, contoh, children }: { rumus?: string; contoh?: string; children?: Snippet } = $props();
</script>

<div class="bg-muted/50 rounded-lg border p-4">
<div class="mb-2 flex items-center gap-1.5 text-sm font-medium">
<Lightbulb class="h-4 w-4 text-amber-500" />
<span>Rumus & Penjelasan</span>
</div>
{#if rumus}
<pre class="bg-background overflow-x-auto rounded-md p-3 text-xs"><code>{rumus}</code></pre>
{/if}
{#if children}
<div class="text-muted-foreground mt-2 text-xs leading-relaxed">{@render children()}</div>
{/if}
{#if contoh}
<p class="text-muted-foreground mt-2 text-xs"><span class="font-medium text-foreground">Contoh:</span> {contoh}</p>
{/if}
</div>
