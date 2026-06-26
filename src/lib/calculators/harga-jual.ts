export interface InputHargaJual {
hpp: number;
mode: 'margin' | 'markup';
persentase: number;
}

export interface HasilHargaJual {
hargaJual: number;
labaPerUnit: number;
persentaseAktual: number;
hargaBulat: number;
selisihBulat: number;
persentaseMarkupEkuivalen: number;
persentaseMarginEkuivalen: number;
rekomendasi: string[];
}

export function hitungHargaJual(input: InputHargaJual): HasilHargaJual {
const { hpp, mode, persentase } = input;
let hargaJual = 0;
let labaPerUnit = 0;
if (mode === 'margin') {
const faktor = 1 - persentase / 100;
hargaJual = faktor > 0 ? hpp / faktor : hpp;
labaPerUnit = hargaJual - hpp;
} else {
hargaJual = hpp * (1 + persentase / 100);
labaPerUnit = hargaJual - hpp;
}
const persentaseMarginEkuivalen = hargaJual > 0 ? (labaPerUnit / hargaJual) * 100 : 0;
const persentaseMarkupEkuivalen = hpp > 0 ? (labaPerUnit / hpp) * 100 : 0;
const hargaBulat = hargaJual > 0 ? Math.ceil(hargaJual / 500) * 500 : 0;
const selisihBulat = hargaBulat - hargaJual;
const rekomendasi: string[] = [];
if (persentase <= 0) {
rekomendasi.push('Persentase laba harus lebih dari 0%. Jika tidak, Anda akan rugi.');
}
if (persentaseMarginEkuivalen < 15 && persentase > 0) {
rekomendasi.push('Margin laba di bawah 15% tergolong tipis. Pastikan volume penjualan tinggi untuk menutup biaya operasional.');
}
if (hpp <= 0) {
rekomendasi.push('HPP belum diisi. Masukkan Harga Pokok Penjualan terlebih dahulu.');
}
if (rekomendasi.length === 0) {
rekomendasi.push(`Harga jual disarankan Rp ${Math.ceil(hargaJual / 500) * 500} (dibulatkan ke kelipatan 500). Lakukan riset kompetitor untuk validasi.`);
}
return {
hargaJual,
labaPerUnit,
persentaseAktual: mode === 'margin' ? persentaseMarginEkuivalen : persentaseMarkupEkuivalen,
hargaBulat,
selisihBulat,
persentaseMarkupEkuivalen,
persentaseMarginEkuivalen,
rekomendasi
};
}
