<script lang="ts">
	import { riwayat } from '$lib/stores/riwayat.svelte.js';
	import { DAFTAR_KALKULATOR } from '$lib/calculators/index.js';
	import { History, Trash2, Printer, Calculator } from '@lucide/svelte';

	const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

	function formatTanggal(ts: number): string {
		const d = new Date(ts);
		return `${d.getDate()} ${namaBulan[d.getMonth()]} ${d.getFullYear()}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
	}

	function warnaKalkulator(slug: string): string {
		return DAFTAR_KALKULATOR.find((k) => k.slug === slug)?.warna ?? 'bg-muted text-foreground';
	}

	function konfirmasiBersihkan() {
		if (confirm('Hapus semua riwayat perhitungan? Tindakan ini tidak dapat dibatalkan.')) {
			riwayat.bersihkan();
		}
	}
</script>

<svelte:head><title>Riwayat — Kalkulaba</title></svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div class="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg"><History class="h-6 w-6" /></div>
			<div>
				<h1 class="text-2xl font-bold">Riwayat Perhitungan</h1>
				<p class="text-muted-foreground text-sm">{riwayat.items.length} catatan tersimpan di perangkat ini.</p>
			</div>
		</div>
		<div class="flex gap-2 no-print">
			<button onclick={() => window.print()} disabled={riwayat.items.length === 0} class="border-input bg-background hover:bg-accent disabled:opacity-50 inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors">
				<Printer class="h-4 w-4" /> Cetak
			</button>
			<button onclick={konfirmasiBersihkan} disabled={riwayat.items.length === 0} class="border-destructive/30 text-destructive hover:bg-destructive/5 disabled:opacity-50 inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors">
				<Trash2 class="h-4 w-4" /> Hapus Semua
			</button>
		</div>
	</div>

	{#if riwayat.items.length === 0}
		<div class="bg-card rounded-xl border p-12 text-center">
			<div class="bg-muted mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
				<Calculator class="text-muted-foreground h-7 w-7" />
			</div>
			<h3 class="font-semibold">Belum ada riwayat</h3>
			<p class="text-muted-foreground mx-auto mt-1 max-w-md text-sm">Hasil perhitungan yang Anda simpan dari kalkulator akan tampil di sini sebagai kartu berisi ringkasan dan rincian angka.</p>
			<a href="/" class="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-flex h-10 items-center rounded-md px-5 text-sm font-medium transition-colors">Mulai Hitung</a>
		</div>
	{:else}
		<div class="space-y-3">
			{#each riwayat.items as item (item.id)}
				<div class="bg-card rounded-xl border p-4">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0 flex-1">
							<div class="mb-1 flex items-center gap-2">
								<span class={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${warnaKalkulator(item.slug)}`}>{item.namaKalkulator}</span>
								<span class="text-muted-foreground text-xs">{formatTanggal(item.tanggal)}</span>
							</div>
							<p class="truncate font-semibold">{item.ringkasan}</p>
							<dl class="mt-2 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs sm:grid-cols-3">
								{#each Object.entries(item.detail) as [k, v]}
									<div class="flex justify-between gap-1 border-b border-dashed py-0.5">
										<dt class="text-muted-foreground">{k}</dt>
										<dd class="font-medium tabular-nums">{v}</dd>
									</div>
								{/each}
							</dl>
						</div>
						<button
							onclick={() => riwayat.hapus(item.id)}
							class="text-muted-foreground hover:text-destructive no-print shrink-0 rounded p-1.5 transition-colors"
							aria-label="Hapus"
						>
							<Trash2 class="h-4 w-4" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>