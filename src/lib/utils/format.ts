/**
 * Utilitas format untuk Kalkulaba
 * Semua format mengikuti standar Bahasa Indonesia (id-ID)
 */

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
	style: 'currency',
	currency: 'IDR',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat('id-ID', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});

/** Format angka menjadi Rupiah, mis. 1500000 -> "Rp 1.500.000" */
export function formatRupiah(value: number): string {
	if (!isFinite(value) || isNaN(value)) return 'Rp 0';
	return rupiahFormatter.format(Math.round(value));
}

/** Format angka tanpa simbol mata uang, mis. 1500 -> "1.500" */
export function formatAngka(value: number): string {
	if (!isFinite(value) || isNaN(value)) return '0';
	return numberFormatter.format(value);
}

/** Format persentase, mis. 0.305 -> "30,5%" */
export function formatPersen(value: number, desimal = 2): string {
	if (!isFinite(value) || isNaN(value)) return '0%';
	return `${value.toFixed(desimal).replace('.', ',')}%`;
}

/** Parse input string (mengizinkan pemisah ribuan) menjadi number */
export function parseAngka(input: string | number | undefined | null): number {
	if (typeof input === 'number') return isNaN(input) ? 0 : input;
	if (!input) return 0;
	const bersih = String(input).replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
	const angka = parseFloat(bersih);
	return isNaN(angka) ? 0 : angka;
}

/** Pembulatan ke kelipatan terdekat (mis. ke 500 rupiah) */
export function bulatkanKe(value: number, kelipatan: number): number {
	if (kelipatan <= 0) return Math.round(value);
	return Math.ceil(value / kelipatan) * kelipatan;
}

/** Tentukan status laba: untung, rugi, atau tipis */
export function statusLaba(labaBersih: number, pendapatan: number): 'untung' | 'rugi' | 'tipis' {
	if (labaBersih > 0 && pendapatan > 0 && labaBersih / pendapatan < 0.05) return 'tipis';
	if (labaBersih > 0) return 'untung';
	if (labaBersih < 0) return 'rugi';
	return 'tipis';
}