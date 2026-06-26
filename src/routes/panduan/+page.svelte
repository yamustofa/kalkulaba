<script lang="ts">
	import { BookOpen, Wallet, Package, Tag, Target, TrendingUp, Lightbulb } from '@lucide/svelte';

	const alur = [
		{ icon: Wallet, judul: '1. Modal Awal', deskripsi: 'Hitung berapa total modal yang dibutuhkan sebelum buka usaha, termasuk dana cadangan.', href: '/kalkulator/modal-awal', warna: 'bg-blue-100 text-blue-700' },
		{ icon: Package, judul: '2. HPP', deskripsi: 'Hitung berapa biaya produksi per unit produk/jasa yang Anda hasilkan.', href: '/kalkulator/hpp', warna: 'bg-purple-100 text-purple-700' },
		{ icon: Tag, judul: '3. Harga Jual', deskripsi: 'Tentukan harga jual ideal berdasarkan HPP dan margin yang diinginkan.', href: '/kalkulator/harga-jual', warna: 'bg-green-100 text-green-700' },
		{ icon: Target, judul: '4. BEP', deskripsi: 'Cari tahu berapa unit minimum yang harus terjual agar tidak rugi.', href: '/kalkulator/bep', warna: 'bg-orange-100 text-orange-700' },
		{ icon: TrendingUp, judul: '5. Laba Rugi', deskripsi: 'Proyeksikan keuntungan/rugi bulanan dari penjualan dan biaya operasional.', href: '/kalkulator/laba-rugi', warna: 'bg-emerald-100 text-emerald-700' }
	];

	const faq = [
		{
			q: 'Apakah data saya aman?',
			a: 'Ya. Semua perhitungan dilakukan di browser Anda dan data riwayat disimpan di localStorage perangkat. Tidak ada data yang dikirim ke server.'
		},
		{ q: 'Apa beda Markup dan Margin?', a: 'Markup menghitung laba dari HPP (contoh: HPP 10rb + markup 30% = 13rb). Margin menghitung laba dari harga jual (margin 30% berarti laba = 30% dari harga jual).' },
		{ q: 'Apakah aplikasi ini gratis?', a: 'Ya, sepenuhnya gratis tanpa registrasi dan tanpa batasan fitur.' },
		{ q: 'Apakah bisa digunakan offline?', a: 'Setelah halaman dimuat pertama kali, aplikasi dapat bekerja offline karena sifatnya sebagai web app statis.' }
	];
</script>

<svelte:head><title>Panduan — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<div class="mb-8 flex items-center gap-3">
		<div class="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg"><BookOpen class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Panduan Penggunaan</h1>
			<p class="text-muted-foreground text-sm">Pelajari urutan langkah perhitungan usaha yang tepat.</p>
		</div>
	</div>

	<!-- Alur -->
	<section class="mb-10">
		<h2 class="mb-4 text-lg font-semibold">Alur Perhitungan Usaha</h2>
		<div class="space-y-3">
			{#each alur as step}
				{@const Icon = step.icon}
				<a href={step.href} class="bg-card hover:border-primary flex items-start gap-4 rounded-xl border p-4 transition-colors">
					<div class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${step.warna}`}>
						<Icon class="h-5 w-5" />
					</div>
					<div class="flex-1">
						<h3 class="font-semibold">{step.judul}</h3>
						<p class="text-muted-foreground mt-0.5 text-sm">{step.deskripsi}</p>
					</div>
					<span class="text-muted-foreground text-sm">→</span>
				</a>
			{/each}
		</div>
	</section>

	<!-- Tips -->
	<section class="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
		<div class="mb-3 flex items-center gap-2 font-medium text-amber-900">
			<Lightbulb class="h-5 w-5" /> Tips Penting
		</div>
		<ul class="space-y-2 text-sm text-amber-900/90">
			<li class="flex gap-2"><span>•</span> Mulailah dari Modal Awal untuk memahami skala investasi sebelum buka.</li>
			<li class="flex gap-2"><span>•</span> Hasil HPP jadi dasar menghitung Harga Jual — pastikan angkanya akurat.</li>
			<li class="flex gap-2"><span>•</span> Gunakan BEP untuk menetapkan target penjualan minimum bulanan.</li>
			<li class="flex gap-2"><span>•</span> Lakukan proyeksi Laba Rugi sebelum eksekusi untuk menghindari kerugian.</li>
			<li class="flex gap-2"><span>•</span> Simpan hasil ke riwayat untuk membandingkan skenario usaha.</li>
		</ul>
	</section>

	<!-- FAQ -->
	<section>
		<h2 class="mb-4 text-lg font-semibold">Pertanyaan Umum</h2>
		<div class="space-y-3">
			{#each faq as item}
				<details class="bg-card group rounded-xl border p-4">
					<summary class="flex cursor-pointer items-center justify-between font-medium">{item.q} <span class="text-muted-foreground transition-transform group-open:rotate-45">+</span></summary>
					<p class="text-muted-foreground mt-2 text-sm">{item.a}</p>
				</details>
			{/each}
		</div>
	</section>
</div>