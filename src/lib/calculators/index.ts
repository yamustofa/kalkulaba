export interface InfoKalkulator {
slug: string;
nama: string;
deskripsi: string;
deskripsiPanjang: string;
ikon: string;
warna: string;
tujuan: string;
}

export const DAFTAR_KALKULATOR: InfoKalkulator[] = [
{
slug: 'modal-awal',
nama: 'Modal Awal',
deskripsi: 'Hitung total investasi awal untuk memulai usaha.',
deskripsiPanjang:
'Kalkulator ini menghitung total modal yang Anda butuhkan untuk memulai usaha, mencakup aset tetap, modal kerja, dana cadangan, dan biaya pra-operasional.',
ikon: 'wallet',
warna: 'bg-blue-100 text-blue-700',
tujuan: 'Mengetahui kebutuhan modal total sebelum memulai usaha.'
},
{
slug: 'hpp',
nama: 'HPP',
deskripsi: 'Hitung Harga Pokok Penjualan per unit produk.',
deskripsiPanjang:
'HPP (Harga Pokok Penjualan) adalah total biaya untuk menghasilkan satu unit produk/jasa, terdiri dari bahan baku, tenaga kerja langsung, dan overhead.',
ikon: 'package',
warna: 'bg-purple-100 text-purple-700',
tujuan: 'Mengetahui biaya pokok per unit agar tidak salah harga jual.'
},
{
slug: 'harga-jual',
nama: 'Harga Jual',
deskripsi: 'Tentukan harga jual ideal dari HPP & margin.',
deskripsiPanjang:
'Tentukan harga jual optimal berdasarkan HPP dan persentase margin atau markup yang Anda inginkan, lengkap dengan saran pembulatan.',
ikon: 'tag',
warna: 'bg-green-100 text-green-700',
tujuan: 'Menentukan harga jual yang menguntungkan dan kompetitif.'
},
{
slug: 'bep',
nama: 'BEP',
deskripsi: 'Hitung titik impas (Break Even Point).',
deskripsiPanjang:
'BEP (Break Even Point) adalah titik di mana total pendapatan sama dengan total biaya — tidak untung dan tidak rugi.',
ikon: 'target',
warna: 'bg-orange-100 text-orange-700',
tujuan: 'Mengetahui berapa unit/rupiah penjualan minimum agar tidak rugi.'
},
{
slug: 'laba-rugi',
nama: 'Laba Rugi',
deskripsi: 'Proyeksi laporan laba rugi bulanan.',
deskripsiPanjang:
'Proyeksikan pendapatan, HPP total, laba kotor, dan laba bersih untuk menilai kelayakan dan profitabilitas usaha Anda.',
ikon: 'trending-up',
warna: 'bg-emerald-100 text-emerald-700',
tujuan: 'Melihat proyeksi keuntungan/rugi usaha per bulan.'
}
];

export function getKalkulator(slug: string): InfoKalkulator | undefined {
return DAFTAR_KALKULATOR.find((k) => k.slug === slug);
}
