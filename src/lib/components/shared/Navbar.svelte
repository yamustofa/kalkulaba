<script lang="ts">
import { page } from '$app/state';
import { Calculator, History, BookOpen, Info } from '@lucide/svelte';

const menu = [
{ href: '/', label: 'Beranda', icon: Calculator },
{ href: '/riwayat', label: 'Riwayat', icon: History },
{ href: '/panduan', label: 'Panduan', icon: BookOpen },
{ href: '/tentang', label: 'Tentang', icon: Info }
];
</script>

<header class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur no-print">
<div class="mx-auto flex h-16 max-w-6xl items-center px-4">
<a href="/" class="flex items-center gap-2 font-bold">
<span class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
<Calculator class="h-5 w-5" />
</span>
<span class="text-lg">Kalkulaba</span>
</a>
<nav class="ml-auto flex items-center gap-1">
{#each menu as m}
{@const Icon = m.icon}
<a
href={m.href}
class="hover:bg-accent flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors max-[420px]:px-2"
class:text-primary={page.url.pathname === m.href}
class:text-muted-foreground={page.url.pathname !== m.href}
>
<Icon class="h-4 w-4" />
<span class="hidden sm:inline">{m.label}</span>
</a>
{/each}
</nav>
</div>
</header>
