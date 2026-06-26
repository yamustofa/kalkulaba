<script lang="ts">
	import { hitungBEP } from '$lib/calculators/bep.js';
	import { formatRupiah } from '$lib/utils/format.js';
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import BarisHasil from '$lib/components/shared/BarisHasil.svelte';
	import KartuRekomendasi from '$lib/components/shared/KartuRekomendasi.svelte';
	import InfoRumus from '$lib/components/shared/InfoRumus.svelte';
	import { Printer, Save, Target, RotateCcw } from '@lucide/svelte';

	let biayaTetap = $state('');
	let hargaJual = $state('');
	let biayaVariabel = $state('');
	let disimpan = $state(false);

	const hasil = $derived(
		hitungBEP({
			biayaTetap: Number(biayaTetap) || 0,
			hargaJual: Number(hargaJual) || 0,
			biayaVariabel: Number(biayaVariabel) || 0
		})
	);

	const adaInput = $derived(Number(biayaTetap) || Number(hargaJual) || Number(biayaVariabel));

	function reset() {
		biayaTetap = hargaJual = biayaVariabel = '';
		disimpan = false;
	}

	function simpan() {
		riwayat.tambah({
			slug: 'bep',
			namaKalkulator: 'BEP',
			ringkasan: `BEP: ${Math.ceil(hasil.bepUnit)} unit / ${formatRupiah(hasil.bepRupiah)}`,
			detail: {
				'Biaya Tetap': formatRupiah(Number(biayaTetap) || 0),
				'Harga Jual/unit': formatRupiah(Number(hargaJual) || 0),
				'Biaya Variabel/unit': formatRupiah(Number(biayaVariabel) || 0),
				'Kontribusi Margin/unit': formatRupiah(hasil.kontribusiMarginPerUnit),
				'BEP (unit)': String(Math.ceil(hasil.bepUnit)),
				'BEP (rupiah)': formatRupiah(hasil.bepRupiah)
			}
		});
		disimpan = true;
	}
</script>

<svelte:head><title>BEP — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm">← Beranda</a>
	<div class="mb-6 flex items-center gap-3">
		<div class="bg-orange-100 text-orange-700 flex h-11 w-11 items-center justify-center rounded-lg"><Target class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Kalkulator BEP</h1>
			<p class="text-muted-foreground text-sm">Hitung titik impas (Break Even Point) usaha Anda.</p>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="bg-card rounded-xl border p-6">
			<h2 class="mb-4 font-semibold">Data Usaha</h2>
			<div class="space-y-4">
				<div>
					<label for="bt" class="mb-1.5 block text-sm font-medium">Biaya Tetap (per bulan)</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="bt" type="number" bind:value={biayaTetap} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
					<p class="text-muted-foreground mt-1 text-xs">Contoh: sewa, gaji tetap, cicilan — biaya yang tidak berubah walau penjualan naik/turun.</p>
				</div>
				<div>
					<label for="hj" class="mb-1.5 block text-sm font-medium">Harga Jual per Unit</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="hj" type="number" bind:value={hargaJual} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="bv" class="mb-1.5 block text-sm font-medium">Biaya Variabel per Unit</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="bv" type="number" bind:value={biayaVariabel} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
					<p class="text-muted-foreground mt-1 text-xs">Contoh: bahan baku, kemasan, komisi — biaya per unit produk yang terjual.</p>
				</div>
			</div>
			<div class="mt-6 flex gap-2 no-print">
				<button onclick={simpan} disabled={!adaInput} class="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors">
					<Save class="h-4 w-4" /> Simpan ke Riwayat
				</button>
				<button onclick={reset} class="border-input bg-background hover:bg-accent inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors">
					<RotateCcw class="h-4 w-4" />
				</button>
				<button onclick={() => window.print()} class="border-input bg-background hover:bg-accent inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors">
					<Printer class="h-4 w-4" />
				</button>
			</div>
			{#if disimpan}<p class="mt-2 text-center text-xs text-emerald-600">✓ Tersimpan ke riwayat</p>{/if}
		</div>

		<div class="space-y-4">
			<div class="bg-card rounded-xl border p-6">
				<BarisHasil label="TITIK IMPAS (BEP)" nilai={`${Math.ceil(hasil.bepUnit)} unit`} utama hint={`Setara ${formatRupiah(hasil.bepRupiah)} penjualan`} />
				<div class="mt-3 space-y-1">
					<BarisHasil label="BEP dalam Rupiah" nilai={formatRupiah(hasil.bepRupiah)} positif />
					<BarisHasil label="Kontribusi Margin per Unit" nilai={formatRupiah(hasil.kontribusiMarginPerUnit)} hint="Harga jual − biaya variabel" />
					<BarisHasil label="Rasio Kontribusi Margin" nilai={`${hasil.rasioKontribusiMargin.toFixed(1)}%`} />
				</div>
			</div>
			<KartuRekomendasi rekomendasi={hasil.rekomendasi} />
			<InfoRumus rumus={"Kontribusi Margin/unit = Harga Jual − Biaya Variabel\nBEP (unit) = Biaya Tetap ÷ Kontribusi Margin/unit\nBEP (rupiah) = BEP (unit) × Harga Jual"}>
				<p>BEP adalah titik di mana pendapatan total sama dengan total biaya — tidak untung dan tidak rugi. Setiap penjualan di atas BEP akan menghasilkan laba.</p>
			</InfoRumus>
		</div>
	</div>
</div>