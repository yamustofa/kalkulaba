<script lang="ts">
	import { Info, ShieldCheck, Lock, Zap, Code } from '@lucide/svelte';
	import { DAFTAR_KALKULATOR } from '$lib/calculators/index.js';

	const nilai = [
		{ icon: Zap, judul: 'Cepat', deskripsi: 'Hasil instan tanpa menunggu, cocok untuk keputusan bisnis cepat.' },
		{ icon: ShieldCheck, judul: 'Akurat', deskripsi: 'Menggunakan rumus akuntansi UMKM yang teruji dan dipercaya.' },
		{ icon: Lock, judul: 'Privasi', deskripsi: 'Semua data tersimpan lokal di perangkat Anda, tidak dikirim ke mana pun.' }
	];

	const tech = ['SvelteKit', 'Tailwind CSS v4', 'shadcn-svelte', 'TypeScript', 'Vite'];
</script>

<svelte:head><title>Tentang — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<div class="mb-8 flex items-center gap-3">
		<div class="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg"><Info class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Tentang Kalkulaba</h1>
			<p class="text-muted-foreground text-sm">Aplikasi kalkulator usaha untuk UMKM Indonesia.</p>
		</div>
	</div>

	<!-- Misi -->
	<section class="bg-card mb-8 rounded-xl border p-6">
		<h2 class="mb-3 font-semibold">Misi Kami</h2>
		<p class="text-muted-foreground text-sm leading-relaxed">
			Banyak pelaku UMKM gagal bukan karena produknya jelek, melainkan karena salah perhitungan modal, harga jual, dan BEP. Kalkulaba hadir untuk mempermudah Anda menghitung angka-angka penting tersebut dengan benar — tanpa harus jago akuntansi.
		</p>
	</section>

	<!-- Nilai -->
	<section class="mb-8 grid gap-4 sm:grid-cols-3">
		{#each nilai as n}
			{@const Icon = n.icon}
			<div class="bg-card rounded-xl border p-5 text-center">
				<div class="bg-primary/10 text-primary mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg">
					<Icon class="h-5 w-5" />
				</div>
				<h3 class="font-semibold">{n.judul}</h3>
				<p class="text-muted-foreground mt-1 text-xs">{n.deskripsi}</p>
			</div>
		{/each}
	</section>

	<!-- Kalkulator tersedia -->
	<section class="bg-card mb-8 rounded-xl border p-6">
		<h2 class="mb-3 font-semibold">Kalkulator Tersedia</h2>
		<ul class="grid gap-2 sm:grid-cols-2">
			{#each DAFTAR_KALKULATOR as k}
				<li class="text-sm">
					<a href={`/kalkulator/${k.slug}`} class="hover:text-primary flex items-center gap-2">
						<span class={`inline-flex h-7 w-7 items-center justify-center rounded ${k.warna} text-xs font-bold`}>→</span>
						<span>{k.nama}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Teknologi -->
	<section class="bg-card mb-8 rounded-xl border p-6">
		<div class="mb-3 flex items-center gap-2 font-semibold"><Code class="h-4 w-4" /> Dibangun Dengan</div>
		<div class="flex flex-wrap gap-2">
			{#each tech as t}
				<span class="bg-muted rounded-md px-3 py-1 text-xs font-medium">{t}</span>
			{/each}
		</div>
	</section>

</div>
