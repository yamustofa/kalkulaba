<script lang="ts">
	import { hitungModalAwal } from '$lib/calculators/modal-awal.js';
	import { formatRupiah } from '$lib/utils/format.js';
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import BarisHasil from '$lib/components/shared/BarisHasil.svelte';
	import KartuRekomendasi from '$lib/components/shared/KartuRekomendasi.svelte';
	import InfoRumus from '$lib/components/shared/InfoRumus.svelte';
	import { Printer, Save, Wallet, RotateCcw } from '@lucide/svelte';

	let asetTetap = $state('');
	let modalKerja = $state('');
	let danaCadangan = $state('');
	let biayaPraOperasional = $state('');
	let disimpan = $state(false);

	const hasil = $derived(
		hitungModalAwal({
			asetTetap: Number(asetTetap) || 0,
			modalKerja: Number(modalKerja) || 0,
			danaCadangan: Number(danaCadangan) || 0,
			biayaPraOperasional: Number(biayaPraOperasional) || 0
		})
	);

	const adaInput = $derived(Number(asetTetap) || Number(modalKerja) || Number(danaCadangan) || Number(biayaPraOperasional));

	function reset() {
		asetTetap = modalKerja = danaCadangan = biayaPraOperasional = '';
		disimpan = false;
	}

	function simpan() {
		riwayat.tambah({
			slug: 'modal-awal',
			namaKalkulator: 'Modal Awal',
			ringkasan: `Total Modal: ${formatRupiah(hasil.total)}`,
			detail: {
				'Aset Tetap': formatRupiah(Number(asetTetap) || 0),
				'Modal Kerja': formatRupiah(Number(modalKerja) || 0),
				'Dana Cadangan': formatRupiah(Number(danaCadangan) || 0),
				'B Pra-Operasional': formatRupiah(Number(biayaPraOperasional) || 0),
				'Total Modal': formatRupiah(hasil.total)
			}
		});
		disimpan = true;
	}
</script>

<svelte:head><title>Modal Awal — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm">← Beranda</a>
	<div class="mb-6 flex items-center gap-3">
		<div class="bg-blue-100 text-blue-700 flex h-11 w-11 items-center justify-center rounded-lg"><Wallet class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Kalkulator Modal Awal</h1>
			<p class="text-muted-foreground text-sm">Hitung total investasi awal untuk memulai usaha.</p>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Input -->
		<div class="bg-card rounded-xl border p-6">
			<h2 class="mb-4 font-semibold">Masukkan Data Modal</h2>
			<div class="space-y-4">
				<div>
					<label for="a" class="mb-1.5 block text-sm font-medium">Aset Tetap <span class="text-muted-foreground font-normal">(peralatan, kendaraan, dll)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="a" type="number" bind:value={asetTetap} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="b" class="mb-1.5 block text-sm font-medium">Modal Kerja Awal <span class="text-muted-foreground font-normal">(operasional 3 bulan)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="b" type="number" bind:value={modalKerja} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="c" class="mb-1.5 block text-sm font-medium">Dana Cadangan <span class="text-muted-foreground font-normal">(darurat)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="c" type="number" bind:value={danaCadangan} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>
				<div>
					<label for="d" class="mb-1.5 block text-sm font-medium">Biaya Pra-Operasional <span class="text-muted-foreground font-normal">(izin, promo pembukaan)</span></label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="d" type="number" bind:value={biayaPraOperasional} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
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

		<!-- Hasil -->
		<div class="space-y-4">
			<div class="bg-card rounded-xl border p-6">
				<BarisHasil label="TOTAL MODAL AWAL" nilai={formatRupiah(hasil.total)} utama />
				<div class="mt-3 space-y-1">
					<BarisHasil label={`Aset Tetap (${hasil.persentaseAset.toFixed(1)}%)`} nilai={formatRupiah(Number(asetTetap) || 0)} />
					<BarisHasil label={`Modal Kerja (${hasil.persentaseModalKerja.toFixed(1)}%)`} nilai={formatRupiah(Number(modalKerja) || 0)} />
					<BarisHasil label={`Dana Cadangan (${hasil.persentaseCadangan.toFixed(1)}%)`} nilai={formatRupiah(Number(danaCadangan) || 0)} />
					<BarisHasil label={`Biaya Pra-Ops (${hasil.persentasePraOps.toFixed(1)}%)`} nilai={formatRupiah(Number(biayaPraOperasional) || 0)} />
				</div>
			</div>
			<KartuRekomendasi rekomendasi={hasil.rekomendasi} />
			<InfoRumus rumus={"Modal Total = Aset Tetap + Modal Kerja + Dana Cadangan + Biaya Pra-Operasional"}>
				<p>Pastikan setiap komponen modal terisi. Dana cadangan ideal 10-15% dari total modal untuk menghadapi risiko tak terduga.</p>
			</InfoRumus>
		</div>
	</div>
</div>