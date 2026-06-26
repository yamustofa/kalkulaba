<script lang="ts">
	import { hitungHargaJual } from '$lib/calculators/harga-jual.js';
	import { formatRupiah } from '$lib/utils/format.js';
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import BarisHasil from '$lib/components/shared/BarisHasil.svelte';
	import KartuRekomendasi from '$lib/components/shared/KartuRekomendasi.svelte';
	import InfoRumus from '$lib/components/shared/InfoRumus.svelte';
	import { Printer, Save, Tag, RotateCcw } from '@lucide/svelte';

	let hpp = $state('');
	let mode: 'margin' | 'markup' = $state('markup');
	let persentase = $state('30');
	let disimpan = $state(false);

	const hasil = $derived(hitungHargaJual({ hpp: Number(hpp) || 0, mode, persentase: Number(persentase) || 0 }));

	const adaInput = $derived(Number(hpp) && Number(persentase));

	function reset() {
		hpp = '';
		persentase = '30';
		mode = 'markup';
		disimpan = false;
	}

	function simpan() {
		riwayat.tambah({
			slug: 'harga-jual',
			namaKalkulator: 'Harga Jual',
			ringkasan: `Harga Jual: ${formatRupiah(hasil.hargaBulat)}`,
			detail: {
				HPP: formatRupiah(Number(hpp) || 0),
				'Mode': mode === 'margin' ? `Margin ${persentase}%` : `Markup ${persentase}%`,
				'Harga Jual (mentah)': formatRupiah(hasil.hargaJual),
				'Harga Jual (bulat)': formatRupiah(hasil.hargaBulat),
				'Laba/unit': formatRupiah(hasil.labaPerUnit)
			}
		});
		disimpan = true;
	}
</script>

<svelte:head><title>Harga Jual — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<a href="/" class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm">← Beranda</a>
	<div class="mb-6 flex items-center gap-3">
		<div class="bg-green-100 text-green-700 flex h-11 w-11 items-center justify-center rounded-lg"><Tag class="h-6 w-6" /></div>
		<div>
			<h1 class="text-2xl font-bold">Kalkulator Harga Jual</h1>
			<p class="text-muted-foreground text-sm">Tentukan harga jual ideal dari HPP & margin.</p>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="bg-card rounded-xl border p-6">
			<h2 class="mb-4 font-semibold">Input Harga</h2>
			<div class="space-y-4">
				<div>
					<label for="hpp" class="mb-1.5 block text-sm font-medium">HPP (Harga Pokok Penjualan per unit)</label>
					<div class="relative">
						<span class="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">Rp</span>
						<input id="hpp" type="number" bind:value={hpp} placeholder="0" class="border-input bg-background h-10 w-full rounded-md border py-2 pl-9 pr-3 text-sm" />
					</div>
				</div>

				<div>
					<span class="mb-1.5 block text-sm font-medium">Metode Perhitungan</span>
					<div class="grid grid-cols-2 gap-2">
						<button
							onclick={() => (mode = 'markup')}
							class="rounded-md border px-3 py-2.5 text-sm font-medium transition-colors {mode === 'markup' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent border-input'}"
						>
							Markup %
							<span class="block text-[11px] opacity-80">laba dari HPP</span>
						</button>
						<button
							onclick={() => (mode = 'margin')}
							class="rounded-md border px-3 py-2.5 text-sm font-medium transition-colors {mode === 'margin' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-accent border-input'}"
						>
							Margin %
							<span class="block text-[11px] opacity-80">laba dari harga jual</span>
						</button>
					</div>
				</div>

				<div>
					<label for="pct" class="mb-1.5 block text-sm font-medium">{mode === 'markup' ? 'Persentase Markup' : 'Persentase Margin'} (%)</label>
					<div class="relative">
						<input id="pct" type="number" bind:value={persentase} placeholder="30" class="border-input bg-background h-10 w-full rounded-md border px-3 pr-8 text-sm" />
						<span class="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 text-sm">%</span>
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
				<BarisHasil label="HARGA JUAL DISARANKAN" nilai={formatRupiah(hasil.hargaBulat)} utama hint={`Pembulatan dari ${formatRupiah(hasil.hargaJual)}`} positif />
				<div class="mt-3 space-y-1">
					<BarisHasil label="Laba per Unit" nilai={formatRupiah(hasil.labaPerUnit)} positif />
					<BarisHasil label="Margin Laba (dari harga jual)" nilai={`${hasil.persentaseMarginEkuivalen.toFixed(1)}%`} />
					<BarisHasil label="Markup Laba (dari HPP)" nilai={`${hasil.persentaseMarkupEkuivalen.toFixed(1)}%`} />
					<BarisHasil label="Selisih Pembulatan" nilai={formatRupiah(hasil.selisihBulat)} hint="Tambahan dari pembulatan" />
				</div>
			</div>
			<KartuRekomendasi rekomendasi={hasil.rekomendasi} />
			<InfoRumus rumus={`Markup: Harga Jual = HPP × (1 + %)\nMargin: Harga Jual = HPP ÷ (1 - %)`} contoh={`HPP Rp10.000, markup 30% → Rp13.000. Margin 30% → Rp14.286 (karena 30% dari harga jual, bukan HPP).`}>
				<p><b>Markup</b> menghitung laba dari HPP. <b>Margin</b> menghitung laba dari harga jual. Margin 30% selalu menghasilkan harga lebih tinggi dari markup 30%.</p>
			</InfoRumus>
		</div>
	</div>
</div>