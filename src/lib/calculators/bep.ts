export interface InputBEP {
biayaTetap: number;
hargaJual: number;
biayaVariabel: number;
}

export interface HasilBEP {
kontribusiMarginPerUnit: number;
rasioKontribusiMargin: number;
bepUnit: number;
bepRupiah: number;
rekomendasi: string[];
}

export function hitungBEP(input: InputBEP): HasilBEP {
const { biayaTetap, hargaJual, biayaVariabel } = input;
const kontribusiMarginPerUnit = hargaJual - biayaVariabel;
const rasioKontribusiMargin = hargaJual > 0 ? (kontribusiMarginPerUnit / hargaJual) * 100 : 0;
const bepUnit = kontribusiMarginPerUnit > 0 ? biayaTetap / kontribusiMarginPerUnit : 0;
const bepRupiah = bepUnit * hargaJual;
const rekomendasi: string[] = [];
if (kontribusiMarginPerUnit <= 0) {
rekomendasi.push('Harga jual lebih kecil atau sama dengan biaya variabel. Anda akan rugi di setiap unit terjual. Naikkan harga atau tekan biaya variabel.');
}
if (rasioKontribusiMargin < 20 && kontribusiMarginPerUnit > 0) {
rekomendasi.push('Rasio kontribusi margin di bawah 20%, artinya butuh volume penjualan yang sangat tinggi untuk balik modal.');
}
if (rekomendasi.length === 0) {
rekomendasi.push(`Anda perlu menjual minimal ${Math.ceil(bepUnit)} unit/bulan untuk mencapai titik impas. Targetkan penjualan di atas angka tersebut untuk meraih laba.`);
}
return { kontribusiMarginPerUnit, rasioKontribusiMargin, bepUnit, bepRupiah, rekomendasi };
}
