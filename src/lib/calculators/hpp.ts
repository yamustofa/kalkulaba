export interface InputHPP {
bahanBaku: number;
tenagaKerja: number;
overhead: number;
jumlahUnit: number;
}

export interface HasilHPP {
hppPerUnit: number;
totalHPP: number;
totalBiayaLangsung: number;
rekomendasi: string[];
}

export function hitungHPP(input: InputHPP): HasilHPP {
const { bahanBaku, tenagaKerja, overhead, jumlahUnit } = input;
const totalBiayaLangsung = bahanBaku + tenagaKerja + overhead;
const hppPerUnit = jumlahUnit > 0 ? totalBiayaLangsung / jumlahUnit : 0;
const totalHPP = totalBiayaLangsung;
const rekomendasi: string[] = [];
if (jumlahUnit <= 0) {
rekomendasi.push('Jumlah unit produksi harus lebih dari 0 untuk mendapatkan HPP per unit yang valid.');
}
if (hppPerUnit > 0 && bahanBaku / totalBiayaLangsung > 0.7) {
rekomendasi.push('Biaya bahan baku mendominasi (>70%) HPP. Cari pemasok alternatif untuk menekan biaya.');
}
if (rekomendasi.length === 0) {
rekomendasi.push('Struktur biaya produksi Anda terlihat wajar. Gunakan hasil HPP ini sebagai dasar menentukan harga jual.');
}
return { hppPerUnit, totalHPP, totalBiayaLangsung, rekomendasi };
}
