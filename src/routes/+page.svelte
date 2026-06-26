<script lang="ts">
	import { DAFTAR_KALKULATOR } from '$lib/calculators/index.js';
	import {
		ArrowRight,
		ShieldCheck,
		Zap,
		Calculator as CalcIcon,
		BookOpen,
		TrendingUp,
		Wallet,
		Package,
		Tag,
		Target
	} from '@lucide/svelte';

	const ikonMap: Record<string, any> = {
		wallet: Wallet,
		package: Package,
		tag: Tag,
		target: Target,
		'trending-up': TrendingUp
	};

	const fitur = [
		{ icon: Zap, judul: 'Cepat', deskripsi: 'Input sederhana, hasil instan tanpa ribet.' },
		{ icon: ShieldCheck, judul: 'Akurat', deskripsi: 'Rumus standar akuntansi UMKM yang teruji.' },
		{ icon: BookOpen, judul: 'Profesional', deskripsi: 'Penjelasan rumus + rekomendasi praktis.' }
	];

	const langkah = [
		{ no: 1, judul: 'Pilih Kalkulator', deskripsi: 'Sesuaikan dengan kebutuhan hitung usaha Anda.' },
		{ no: 2, judul: 'Masukkan Angka', deskripsi: 'Isi data usaha, hasil muncul otomatis.' },
		{ no: 3, judul: 'Simpan & Cetak', deskripsi: 'Riwayat tersimpan lokal, bisa cetak/PDF.' }
	];
</script>

<svelte:head>
	<title>Kalkulaba — Kalkulator Usaha untuk UMKM</title>
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-b from-muted/50 to-background border-b">
	<div class="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
		<div class="bg-primary/10 text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
			<CalcIcon class="h-7 w-7" />
		</div>
		<h1 class="text-3xl font-bold tracking-tight sm:text-5xl">
			Hitung Usaha Anda,<br />Lebih <span class="text-primary">Cepat & Akurat</span>
		</h1>
		<p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
			Destinasikan kalkulator untuk calon & pemilik UMKM. Hitung modal awal, HPP, harga jual, BEP, dan proyeksi laba rugi dengan profesional.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a href="/kalkulator/modal-awal" class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center gap-2 rounded-md px-6 font-medium transition-colors">
				Mulai Hitung <ArrowRight class="h-4 w-4" />
			</a>
			<a href="/panduan" class="border-input bg-background hover:bg-accent inline-flex h-11 items-center rounded-md border px-6 font-medium transition-colors">
				Lihat Panduan
			</a>
		</div>
	</div>
</section>

<!-- Fitur -->
<section class="mx-auto max-w-6xl px-4 py-12">
	<div class="grid gap-4 sm:grid-cols-3">
		{#each fitur as f}
			{@const Icon = f.icon}
			<div class="bg-card rounded-xl border p-6 text-center">
				<div class="bg-primary/10 text-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg">
					<Icon class="h-6 w-6" />
				</div>
				<h3 class="font-semibold">{f.judul}</h3>
				<p class="text-muted-foreground mt-1 text-sm">{f.deskripsi}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Daftar Kalkulator -->
<section class="mx-auto max-w-6xl px-4 py-8">
	<div class="mb-6 flex items-end justify-between">
		<div>
			<h2 class="text-2xl font-bold">Pilih Kalkulator</h2>
			<p class="text-muted-foreground text-sm">Lima alat hitung utama untuk usaha Anda.</p>
		</div>
	</div>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each DAFTAR_KALKULATOR as k}
			{@const Icon = ikonMap[k.ikon] ?? CalcIcon}
			<a href={`/kalkulator/${k.slug}`} class="bg-card hover:border-primary group rounded-xl border p-5 transition-colors">
				<div class="mb-3 flex items-center justify-between">
					<div class={`flex h-10 w-10 items-center justify-center rounded-lg ${k.warna}`}>
						<Icon class="h-5 w-5" />
					</div>
					<ArrowRight class="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
				</div>
				<h3 class="font-semibold">{k.nama}</h3>
				<p class="text-muted-foreground mt-1 text-sm">{k.deskripsi}</p>
			</a>
		{/each}
	</div>
</section>

<!-- Cara Kerja -->
<section class="bg-muted/30 border-t">
	<div class="mx-auto max-w-6xl px-4 py-12">
		<h2 class="text-center text-2xl font-bold">Cara Kerja</h2>
		<p class="text-muted-foreground mt-1 text-center text-sm">Tiga langkah mudah mendapatkan hasil.</p>
		<div class="mt-8 grid gap-6 sm:grid-cols-3">
			{#each langkah as l}
				<div class="text-center">
					<div class="bg-primary text-primary-foreground mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full font-bold">
						{l.no}
					</div>
					<h3 class="font-semibold">{l.judul}</h3>
					<p class="text-muted-foreground mt-1 text-sm">{l.deskripsi}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Bawah -->
<section class="mx-auto max-w-6xl px-4 py-12">
	<div class="bg-primary text-primary-foreground rounded-2xl px-6 py-10 text-center">
		<TrendingUp class="mx-auto mb-3 h-10 w-10" />
		<h2 class="text-2xl font-bold">Siap memulai usaha dengan perhitungan yang tepat?</h2>
		<p class="mx-auto mt-2 max-w-xl opacity-90">Gratis tanpa registrasi. Semua data tersimpan di perangkat Anda.</p>
		<a href="/kalkulator/modal-awal" class="bg-background text-foreground hover:bg-background/90 mt-6 inline-flex h-11 items-center gap-2 rounded-md px-6 font-medium transition-colors">
			Mulai Sekarang <ArrowRight class="h-4 w-4" />
		</a>
	</div>
</section>