<script lang="ts">
	import { hitungHPP } from '$lib/calculators/hpp.js';
	import { formatRupiah } from '$lib/utils/format.js';
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import BarisHasil from '$lib/components/shared/BarisHasil.svelte';
	import KartuRekomendasi from '$lib/components/shared/KartuRekomendasi.svelte';
	import InfoRumus from '$lib/components/shared/InfoRumus.svelte';
	import { Printer, Save, Package, RotateCcw } from '@lucide/svelte';

	let bahanBaku = $state('');
	let tenagaKerja = $state('');
	let overhead = $state('');
	let jumlahUnit = $state('');
	let disimpan = $state(false);

	const hasil = $derived(
		hitungHPP({
			bahanBaku: Number(bahanBaku) || 0,
			tenagaKerja: Number(tenagaKerja) || 0,
			overhead: Number(overhead) || 0,
			jumlahUnit: Number(jumlahUnit) || 0
		})
	);

	const adaInput = $derived(Number(bahanBaku) || Number(tenagaKerja) || Number(overhead) || Number(jumlahUnit));

	function reset() {
		bahanBaku = tenagaKerja = overhead = jumlahUnit = '';
		disimpan = false;
	}

	function simpan() {
		riwayat.tambah({
			slug: 'hpp',
			namaKalkulator: 'HPP',
			ringkasan: `HPP: ${formatRupiah(hasil.hppPerUnit)}/unit`,
			detail: {
				'Bahan Baku': formatRupiah(Number(bahanBaku) || 0),
				'Tenaga Kerja': formatRupiah(Number(tenagaKerja) || 0),
				Overhead: formatRupiah(Number(overhead) || 0),
				'Jumlah Unit': String(jumlahUnit),
				'HPP/unit': formatRupiah(hasil.hppPerUnit)
			}
		});
		disimpan = true;
	}
</script>

<svelte:head><title>HPP — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm">← Beranda</a>
	<div class="mb-6 flex items-center gap-3">
		<div class="bg-purple-100 text-purple-700 flex h-11 w-11 items-center justify-center rounded-lg"><Package class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Kalkulator HPP</h1>
			<p class="text-muted-foreground text-sm">Hitung Harga Pokok Penjualan per unit produk.</p>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="bg-card rounded-xl border p-6">
			<h2 class="mb-4 font-semibold">Data Biaya Produksi</h2>
			<div class="space-y-4">
				<div>
					<label for="bb" class="mb-1.5 block text-sm font-medium">Biaya Bahan Baku (total)</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="bb" type="number" bind:value={bahanBaku} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="tk" class="mb-1.5 block text-sm font-medium">Biaya Tenaga Kerja Langsung</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="tk" type="number" bind:value={tenagaKerja} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="oh" class="mb-1.5 block text-sm font-medium">Biaya Overhead Pabrik <span class="text-muted-foreground font-normal">(listrik, gas, dll)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="oh" type="number" bind:value={overhead} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="ju" class="mb-1.5 block text-sm font-medium">Jumlah Unit yang Dihasilkan</label>
					<input id="ju" type="number" bind:value={jumlahUnit} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border px-3 py-2 text-sm" />
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
				<BarisHasil label="HPP PER UNIT" nilai={formatRupiah(hasil.hppPerUnit)} utama hint="Harga Pokok Penjualan per unit" />
				<div class="mt-3 space-y-1">
					<BarisHasil label="Total Biaya Produksi" nilai={formatRupiah(hasil.totalHPP)} />
					<BarisHasil label="Bahan Baku" nilai={formatRupiah(Number(bahanBaku) || 0)} />
					<BarisHasil label="Tenaga Kerja" nilai={formatRupiah(Number(tenagaKerja) || 0)} />
					<BarisHasil label="Overhead" nilai={formatRupiah(Number(overhead) || 0)} />
				</div>
			</div>
			<KartuRekomendasi rekomendasi={hasil.rekomendasi} />
			<InfoRumus rumus={"HPP/unit = (Bahan Baku + Tenaga Kerja + Overhead) ÷ Jumlah Unit"}>
				<p>HPP adalah dasar penentuan harga jual. Jangan menjual di bawah HPP karena akan merugi. Gunakan hasil ini di kalkulator Harga Jual.</p>
			</InfoRumus>
		</div>
	</div>
</div>