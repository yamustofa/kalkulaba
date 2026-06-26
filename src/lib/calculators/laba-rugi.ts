export interface InputLabaRugi {
estimasiPenjualan: number;
hargaJual: number;
hppPerUnit: number;
biayaOperasional: number;
}

export interface HasilLabaRugi {
pendapatan: number;
totalHPP: number;
labaKotor: number;
labaBersih: number;
marginLabaKotor: number;
marginLabaBersih: number;
status: 'untung' | 'rugi' | 'tipis';
rekomendasi: string[];
}

export function hitungLabaRugi(input: InputLabaRugi): HasilLabaRugi {
const { estimasiPenjualan, hargaJual, hppPerUnit, biayaOperasional } = input;
const pendapatan = estimasiPenjualan * hargaJual;
const totalHPP = estimasiPenjualan * hppPerUnit;
const labaKotor = pendapatan - totalHPP;
const labaBersih = labaKotor - biayaOperasional;
const marginLabaKotor = pendapatan > 0 ? (labaKotor / pendapatan) * 100 : 0;
const marginLabaBersih = pendapatan > 0 ? (labaBersih / pendapatan) * 100 : 0;
let status: 'untung' | 'rugi' | 'tipis' = 'tipis';
if (labaBersih > 0 && marginLabaBersih < 5) status = 'tipis';
else if (labaBersih > 0) status = 'untung';
else if (labaBersih < 0) status = 'rugi';
const rekomendasi: string[] = [];
if (status === 'rugi') {
rekomendasi.push('Usaha Anda diproyeksikan RUGI. Pertimbangkan: menaikkan harga jual, menekan HPP/biaya operasional, atau meningkatkan volume penjualan.');
} else if (status === 'tipis') {
rekomendasi.push('Margin laba bersih Anda tipis (<5%). Sedikit fluktuasi biaya dapat membuat usaha rugi. Optimalkan efisiensi operasional.');
} else {
rekomendasi.push(`Usaha Anda untung dengan margin ${marginLabaBersih.toFixed(1)}%. Pertimbangkan reinvestasi laba untuk pertumbuhan.`);
}
if (marginLabaKotor < 25) {
rekomendasi.push('Margin laba kotor di bawah 25% menunjukkan HPP terlalu tinggi relatif terhadap harga jual.');
}
return {
pendapatan,
totalHPP,
labaKotor,
labaBersih,
marginLabaKotor,
marginLabaBersih,
status,
rekomendasi
};
}
