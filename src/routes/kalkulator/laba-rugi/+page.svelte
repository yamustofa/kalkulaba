<script lang="ts">
	import { hitungLabaRugi } from '$lib/calculators/laba-rugi.js';
	import { formatRupiah } from '$lib/utils/format.js';
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import BarisHasil from '$lib/components/shared/BarisHasil.svelte';
	import KartuRekomendasi from '$lib/components/shared/KartuRekomendasi.svelte';
	import InfoRumus from '$lib/components/shared/InfoRumus.svelte';
	import { Printer, Save, TrendingUp, RotateCcw } from '@lucide/svelte';

	let estimasiPenjualan = $state('');
	let hargaJual = $state('');
	let hppPerUnit = $state('');
	let biayaOperasional = $state('');
	let disimpan = $state(false);

	const hasil = $derived(
		hitungLabaRugi({
			estimasiPenjualan: Number(estimasiPenjualan) || 0,
			hargaJual: Number(hargaJual) || 0,
			hppPerUnit: Number(hppPerUnit) || 0,
			biayaOperasional: Number(biayaOperasional) || 0
		})
	);

	const adaInput = $derived(Number(estimasiPenjualan) || Number(hargaJual));

	function reset() {
		estimasiPenjualan = hargaJual = hppPerUnit = biayaOperasional = '';
		disimpan = false;
	}

	function simpan() {
		riwayat.tambah({
			slug: 'laba-rugi',
			namaKalkulator: 'Laba Rugi',
			ringkasan: `Laba Bersih: ${formatRupiah(hasil.labaBersih)} (${hasil.status})`,
			detail: {
				'Penjualan (unit)': String(estimasiPenjualan),
				'Harga Jual/unit': formatRupiah(Number(hargaJual) || 0),
				Pendapatan: formatRupiah(hasil.pendapatan),
				'Total HPP': formatRupiah(hasil.totalHPP),
				'Laba Kotor': formatRupiah(hasil.labaKotor),
				'Biaya Operasional': formatRupiah(Number(biayaOperasional) || 0),
				'Laba Bersih': formatRupiah(hasil.labaBersih)
			}
		});
		disimpan = true;
	}

	const statusLabel = { untung: 'UNTUNG', rugi: 'RUGI', tipis: 'TIPIS' };
</script>

<svelte:head><title>Laba Rugi — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm">← Beranda</a>
	<div class="mb-6 flex items-center gap-3">
		<div class="bg-emerald-100 text-emerald-700 flex h-11 w-11 items-center justify-center rounded-lg"><TrendingUp class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Proyeksi Laba Rugi</h1>
			<p class="text-muted-foreground text-sm">Lihat estimasi keuntungan/rugi usaha per bulan.</p>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="bg-card rounded-xl border p-6">
			<h2 class="mb-4 font-semibold">Data Proyeksi Bulanan</h2>
			<div class="space-y-4">
				<div>
					<label for="ep" class="mb-1.5 block text-sm font-medium">Estimasi Penjualan (unit/bulan)</label>
					<input id="ep" type="number" bind:value={estimasiPenjualan} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm" />
				</div>
				<div>
					<label for="hj" class="mb-1.5 block text-sm font-medium">Harga Jual per Unit</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="hj" type="number" bind:value={hargaJual} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="hpp" class="mb-1.5 block text-sm font-medium">HPP per Unit</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="hpp" type="number" bind:value={hppPerUnit} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="bo" class="mb-1.5 block text-sm font-medium">Biaya Operasional per Bulan <span class="text-muted-foreground font-normal">(sewa, gaji, listrik)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="bo" type="number" bind:value={biayaOperasional} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
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
				<BarisHasil
					label={`LABA BERSIH — ${statusLabel[hasil.status]}`}
					nilai={formatRupiah(hasil.labaBersih)}
					utama
					positif={hasil.status === 'untung'}
					negatif={hasil.status === 'rugi'}
				/>
				<div class="mt-3 space-y-1">
					<BarisHasil label="Pendapatan (Revenue)" nilai={formatRupiah(hasil.pendapatan)} />
					<BarisHasil label="Total HPP" nilai={formatRupiah(hasil.totalHPP)} negatif />
					<BarisHasil label="Laba Kotor" nilai={formatRupiah(hasil.labaKotor)} hint={`Margin ${hasil.marginLabaKotor.toFixed(1)}%`} positif={hasil.labaKotor > 0} />
					<BarisHasil label="Biaya Operasional" nilai={`- ${formatRupiah(Number(biayaOperasional) || 0)}`} />
					<BarisHasil label="Margin Laba Bersih" nilai={`${hasil.marginLabaBersih.toFixed(1)}%`} />
				</div>
			</div>
			<KartuRekomendasi rekomendasi={hasil.rekomendasi} />
			<InfoRumus rumus={"Pendapatan = Estimasi Penjualan × Harga Jual\nTotal HPP = Estimasi Penjualan × HPP/unit\nLaba Kotor = Pendapatan − Total HPP\nLaba Bersih = Laba Kotor − Biaya Operasional"}>
				<p>Margin laba bersih yang sehat untuk UMKM biasanya di atas 10%. Jika di bawah 5%, usaha tergolong rentan.</p>
			</InfoRumus>
		</div>
	</div>
</div>