export interface InputModalAwal {
asetTetap: number;
modalKerja: number;
danaCadangan: number;
biayaPraOperasional: number;
}

export interface HasilModalAwal {
total: number;
persentaseAset: number;
persentaseModalKerja: number;
persentaseCadangan: number;
persentasePraOps: number;
rekomendasi: string[];
}

export function hitungModalAwal(input: InputModalAwal): HasilModalAwal {
const { asetTetap, modalKerja, danaCadangan, biayaPraOperasional } = input;
const total = asetTetap + modalKerja + danaCadangan + biayaPraOperasional;
const persentaseAset = total > 0 ? (asetTetap / total) * 100 : 0;
const persentaseModalKerja = total > 0 ? (modalKerja / total) * 100 : 0;
const persentaseCadangan = total > 0 ? (danaCadangan / total) * 100 : 0;
const persentasePraOps = total > 0 ? (biayaPraOperasional / total) * 100 : 0;
const rekomendasi: string[] = [];
if (persentaseCadangan < 10) {
rekomendasi.push('Dana cadangan Anda di bawah 10% dari total modal. Pertimbangkan menambah dana darurat minimal 10-15% untuk mengantisipasi risiko.');
}
if (persentaseModalKerja < 20) {
rekomendasi.push('Modal kerja awal Anda relatif kecil. Pastikan cukup untuk operasional minimal 3 bulan pertama.');
}
if (total > 0 && persentaseAset > 70) {
rekomendasi.push('Porsi aset tetap sangat dominan (>70%). Pertimbangkan apakah semua aset memang perlu dibeli baru.');
}
if (rekomendasi.length === 0) {
rekomendasi.push('Komposisi modal Anda terlihat seimbang. Lanjutkan dengan perencanaan operasional.');
}
return {
total,
persentaseAset,
persentaseModalKerja,
persentaseCadangan,
persentasePraOps,
rekomendasi
};
}
