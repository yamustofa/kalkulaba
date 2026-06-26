# Product Requirements Document (PRD)
## KALKULABA — Kalkulator Usaha untuk UMKM

> **Tagline:** *Hitung modal, HPP, harga jual, dan laba usaha dalam hitungan menit — cepat, akurat, dan profesional.*

| Item | Keterangan |
|---|---|
| **Nama Produk** | Kalkulaba |
| **Tipe** | Web Application (PWA-ready) |
| **Platform Target** | Web (mobile-first, desktop-ready) |
| **Stack Teknologi** | SvelteKit + Tailwind CSS v4 + shadcn-svelte |
| **Versi Dokumen** | 1.0 (MVP) |
| **Tanggal** | 25 Juni 2026 |
| **Bahasa Antarmuka** | Bahasa Indonesia |
| **Mata Uang** | Rupiah (IDR) |

---

## 1. Ringkasan Eksekutif

### 1.1 Latar Belakang Masalah
Banyak calon wirausahawan dan pemilik UMKM di Indonesia memulai usaha tanpa perhitungan finansial yang matang. Akibatnya mereka sering mengalami:

- **Salah menentukan modal awal** → kekurangan dana di tengah jalan.
- **Tidak tahu HPP (Harga Pokok Penjualan)** → harga jual menebak, margin tipis/rugi.
- **Tidak paham BEP** → tidak tahu kapan balik modal.
- **Tidak punya proyeksi laba rugi** → sulit mengambil keputusan.
- **Kesulitan menghitung pinjaman/KUR** → ketakutan salah ambil kredit usaha.
- **Menggunakan Excel/spreadsheet rumit** → membingungkan untuk pengguna awam.

### 1.2 Solusi Produk
**Kalkulaba** adalah aplikasi web berisi kumpulan **kalkulator usaha** yang dirancang khusus untuk UMKM. Pengguna cukup memasukkan angka-angka usaha mereka, lalu aplikasi **otomatis menghitung** beserta **penjelasan, rekomendasi, dan visualisasi**. Tidak perlu rumus, tidak perlu Excel, tidak perlu login.

### 1.3 Visi & Misi
- **Visi:** Menjadi kalkulator usaha standar bagi jutaan UMKM Indonesia untuk mengambil keputusan finansial yang tepat.
- **Misi:** Menyederhanakan perhitungan bisnis yang rumit menjadi proses yang cepat, akurat, dan dapat dipahami siapa saja.

---

## 2. Target Pengguna & Persona

### 2.1 Segmen Pengguna
1. **Calon wirausahawan** — sedang merencanakan membuka usaha, butuh gambaran modal & kelayakan.
2. **Pemilik UMKM aktif** — sudah berjalan, ingin evaluasi/menentukan ulang harga & margin.
3. **Pelaku usaha kuliner, jasa, dagang, produksi** — butuh hitung HPP spesifik per produk.
4. **Mahasiswa & pelajar ekonomi/bisnis** — media belajar perhitungan usaha.

### 2.2 Persona

#### 🧑 Persona 1 — "Dewi" (Calon Wirausahawa Kuliner, 28 th)
- Mau buka cafe kecil, bingung berapa modal & kapan balik modal.
- **Kebutuhan:** Kalkulator Modal Awal + BEP + proyeksi laba rugi.
- **Frustrasi:** Excel membingungkan, minta hasil instan + rekomendasi.

#### 👨 Persona 2 — "Pak Budi" (Pemilik UMKM Dagang, 42 th)
- Punya toko sembako, ingin tentukan harga jual yang menguntungkan.
- **Kebutuhan:** HPP + Harga Jual + Margin/Markup.
- **Frustrasi:** Sering rugi karena harga jual menebak.

#### 👩 Persona 3 — "Sari" (UMKM Jasa Laundry, 31 th)
- Ingin ekspansi, butuh pinjaman KUR, takut tidak mampu cicilan.
- **Kebutuhan:** Simulasi Pinjaman/KUR + Cash Flow + ROI.
- **Frustrasi:** Tidak paham istilah bank & bunga.

---

## 3. Tujuan & Metrik Sukses

### 3.1 Tujuan Produk
1. Menyediakan kalkulator usaha yang **akurat** sesuai rumus bisnis standar.
2. Memberikan **pengalaman cepat & mudah** (input → hasil < 2 menit).
3. Menghasilkan output **profesional** (bisa disimpan & dicetak).
4. Mendukung **privasi pengguna** (tanpa wajib login).

### 3.2 KPI / Metrik Sukses
| KPI | Target MVP |
|---|---|
| Jumlah sesi kalkulasi / minggu | ≥ 1.000 |
| Rata-rata durasi sesi | 2–5 menit |
| Bounce rate halaman utama | < 40% |
| Completion rate (input → hasil) | ≥ 70% |
| Skor akurasi rumus (audit) | 100% |
| Skor kepuasan (NPS) | ≥ 40 |
| Core Web Vitals (LCP) | < 2.5 detik |

---

## 4. Ruang Lingkup Produk

### 4.1 In Scope (MVP v1.0)
- 5 kalkulator inti: **Modal Awal, HPP, Harga Jual, BEP, Laba Rugi**.
- Penyimpanan riwayat di `localStorage`.
- Tampilan mobile-first & responsif.
- Ekspor hasil: **Cetak / Print-to-PDF** bawaan browser.
- Multi-bahasa tidak diperlukan (IDR & Bahasa Indonesia).

### 4.2 Out of Scope (MVP)
- Akun pengguna & cloud sync (v2).
- Dashboard ringkasan multi-usaha (v2).
- Integrasi marketplace / bank (v3).
- API publik (v3).

---

## 5. Fitur Utama — Modul Kalkulator

Setiap modul mengikuti pola: **Input → Validasi → Hitung → Tampilkan Hasil + Rekomendasi → Simpan/Ekspor**.

### 5.1 Modul: Modal Awal
**Tujuan:** Menghitung total investasi yang dibutuhkan untuk memulai usaha.

**Input:**
| Field | Tipe | Contoh |
|---|---|---|
| Aset tetap (peralatan, renovasi, kendaraan) | Angka | Rp 30.000.000 |
| Modal kerja awal (stok, gaji, operasional 3 bln) | Angka | Rp 15.000.000 |
| Dana cadangan / kontingensi | Angka | Rp 5.000.000 |
| Biaya pra-operasional (legal, lisensi, promosi) | Angka | Rp 2.000.000 |

**Rumus:**
```
Total Modal Awal = Aset Tetap + Modal Kerja Awal + Dana Cadangan + Biaya Pra-operasional
```

**Contoh:**
```
= 30.000.000 + 15.000.000 + 5.000.000 + 2.000.000
= Rp 52.000.000
```

**Output:** Total modal awal + breakdown persentase per komponen + rekomendasi (mis. "Cadangan Anda < 10%, pertimbangkan menambah dana darurat").

---

### 5.2 Modul: HPP (Harga Pokok Penjualan / COGS)
**Tujuan:** Menghitung biaya pokok untuk menghasilkan **satu unit** produk/jasa.

**Input:**
| Field | Tipe | Contoh |
|---|---|---|
| Biaya bahan baku per unit | Angka | Rp 8.000 |
| Biaya tenaga kerja langsung per unit | Angka | Rp 2.000 |
| Biaya overhead pabrik per unit | Angka | Rp 1.500 |
| Jumlah unit produksi | Angka | 1.000 |

**Rumus:**
```
HPP per unit = Biaya Bahan Baku + Biaya Tenaga Kerja Langsung + Biaya Overhead
Total HPP   = HPP per unit × Jumlah Unit Produksi
```

**Contoh:**
```
HPP/unit = 8.000 + 2.000 + 1.500 = Rp 11.500
Total HPP = 11.500 × 1.000 = Rp 11.500.000
```

**Output:** HPP per unit + total HPP + peringatan jika margin < biaya.

---

### 5.3 Modul: Harga Jual
**Tujuan:** Menentukan harga jual ideal berdasarkan HPP & margin/markup.

**Input:**
| Field | Tipe | Contoh |
|---|---|---|
| HPP per unit | Angka | Rp 11.500 |
| Mode | Pilihan: Margin % / Markup % | Margin 30% |
| Persentase | Angka | 30% |

**Rumus:**
```
[Mode Margin]
Harga Jual = HPP / (1 - Margin%)

[Mode Markup]
Harga Jual = HPP × (1 + Markup%)

Laba per unit = Harga Jual − HPP
```

**Contoh (Margin 30%):**
```
Harga Jual = 11.500 / (1 − 0,30) = 11.500 / 0,70 = Rp 16.429
Laba/unit  = 16.429 − 11.500 = Rp 4.929
```

**Output:** Harga jual + laba per unit + saran pembulatan harga (mis. ke Rp 16.500) + perbandingan margin vs markup.

---

### 5.4 Modul: BEP (Break Even Point)
**Tujuan:** Mengetahui titik impas — jumlah penjualan minimum agar tidak rugi.

**Input:**
| Field | Tipe | Contoh |
|---|---|---|
| Biaya tetap (sewa, gaji tetap) per bulan | Angka | Rp 10.000.000 |
| Harga jual per unit | Angka | Rp 16.500 |
| Biaya variabel per unit | Angka | Rp 11.500 |

**Rumus:**
```
Kontribusi Margin per unit = Harga Jual − Biaya Variabel
BEP (unit)  = Biaya Tetap / Kontribusi Margin per unit
BEP (Rupiah)= BEP (unit) × Harga Jual
```

**Contoh:**
```
Kontribusi Margin = 16.500 − 11.500 = Rp 5.000
BEP (unit)   = 10.000.000 / 5.000 = 2.000 unit/bulan
BEP (Rupiah) = 2.000 × 16.500 = Rp 33.000.000/bulan
```

**Output:** BEP unit & rupiah + visualisasi grafik (garis pendapatan vs biaya) + rekomendasi kapasitas.

---

### 5.5 Modul: Laba Rugi (Proyeksi)
**Tujuan:** Proyeksi profit & loss bulanan/tahunan sederhana.

**Input:**
| Field | Tipe | Contoh |
|---|---|---|
| Estimasi penjualan (unit/bulan) | Angka | 2.500 |
| Harga jual per unit | Angka | Rp 16.500 |
| HPP per unit | Angka | Rp 11.500 |
| Biaya operasional (sewa, gaji, utilitas) | Angka | Rp 12.000.000 |

**Rumus:**
```
Pendapatan      = Estimasi Penjualan × Harga Jual
HPP Total       = Estimasi Penjualan × HPP per unit
Laba Kotor      = Pendapatan − HPP Total
Laba Bersih     = Laba Kotor − Biaya Operasional
Margin Laba Bersih = Laba Bersih / Pendapatan × 100%
```

**Contoh:**
```
Pendapatan   = 2.500 × 16.500 = Rp 41.250.000
HPP Total    = 2.500 × 11.500 = Rp 28.750.000
Laba Kotor   = 41.250.000 − 28.750.000 = Rp 12.500.000
Laba Bersih  = 12.500.000 − 12.000.000 = Rp 500.000
Margin       = 500.000 / 41.250.000 × 100% = 1,21%
```

**Output:** Laporan laba rugi terstruktur + indikator status (Untung/Rugi/Tipis) + saran peningkatan.

---

## 6. Pengalaman Pengguna (UX) & User Flow

### 6.1 Prinsip UX
- **Sederhana:** minimal input wajib, label Bahasa Indonesia jelas.
- **Cepat:** perhitungan real-time saat mengetik (reaktif).
- **Edukatif:** tooltip & info rumus di tiap field.
- **Profesional:** output rapi seperti laporan, siap cetak.
- **Mobile-first:** dominan pengguna UMKM via HP.

### 6.2 User Flow Utama
```
Halaman Beranda
   │
   ├─ Pilih Kalkulator (grid kartu)
   │
   ▼
Halaman Kalkulator
   │
   ├─ Form input (reaktif) ──► Hasil real-time di samping/bawah
   │                          ├─ Kartu hasil utama
   │                          ├─ Breakdown detail
   │                          ├─ Rekomendasi/saran
   │                          └─ Grafik (jika relevan)
   │
   ├─ [Simpan] ──► Riwayat (localStorage)
   ├─ [Cetak / PDF] ──► Dialog print browser
   └─ [Reset]
```

### 6.3 Navigasi
- **Beranda (`/`)**: Hero + grid pilihan kalkulator + ringkasan manfaat.
- **Kalkulator (`/kalkulator/[slug]`)**: halaman per modul.
- **Riwayat (`/riwayat`)**: daftar hasil tersimpan.
- **Panduan (`/panduan`)**: penjelasan rumus & istilah.
- **Tentang (`/tentang`)**: info produk.

### 6.4 Komponen UI (shadcn-svelte)
`Card`, `Input`, `Label`, `Button`, `Select`, `Tabs`, `Table`, `Separator`, `Tooltip`, `Badge`, `Slider`, `Sonner` (toast).

---

## 7. Persyaratan Teknis

### 7.1 Tech Stack
| Lapisan | Teknologi |
|---|---|
| Framework | **SvelteKit** (mode SPA/SSR adaptif) |
| Bahasa | TypeScript |
| Styling | **Tailwind CSS v4** |
| Komponen UI | **shadcn-svelte** (berbasis bits-ui + Tailwind) |
| Ikon | lucide-svelte |
| Formatting Rupiah | `Intl.NumberFormat('id-ID', ...)` |
| Chart (opsional) | Chart.js / LayerChart |
| Penyimpanan | `localStorage` (client-side) |
| Deployment | Vercel / Netlify / static adapter |

### 7.2 Arsitektur Folder (Proposal)
```
src/
├─ lib/
│  ├─ components/
│  │  ├─ ui/                  # komponen shadcn-svelte
│  │  └─ shared/              # ResultCard, InputField, FormulaInfo
│  ├─ calculators/
│  │  ├─ modal-awal.ts        # tipe, skema, & fungsi hitung
│  │  ├─ hpp.ts
│  │  ├─ harga-jual.ts
│  │  ├─ bep.ts
│  │  └─ laba-rugi.ts
│  ├─ stores/
│  │  └─ riwayat.svelte.ts    # store localStorage
│  ├─ utils/
│  │  ├─ format.ts            # formatRupiah, formatPersen
│  │  └─ hitung.ts            # helper umum
│  └─ types.ts
├─ routes/
│  ├─ +layout.svelte
│  ├─ +page.svelte            # beranda
│  ├─ kalkulator/
│  │  └─ [slug]/+page.svelte
│  ├─ riwayat/+page.svelte
│  ├─ panduan/+page.svelte
│  └─ tentang/+page.svelte
└─ app.css                    # Tailwind v4 entry
```

### 7.3 Konvensi
- Setiap kalkulator = modul terpisah dengan: `interface Input`, `interface Hasil`, `function hitung(input): Hasil`.
- Semua angka ditampilkan dengan pemisah ribuan & prefix "Rp".
- Validasi input (angka ≥ 0, tidak kosong) → tampilkan pesan inline.
- Hasil real-time menggunakan reaktivitas Svelte (`$derived` / `$state` runes).

---

## 8. Non-Functional Requirements

| Aspek | Persyaratan |
|---|---|
| **Performa** | LCP < 2.5s, tidak ada JS blocking besar, lazy-load halaman |
| **Aksesibilitas** | Kontras AA, label ARIA, navigasi keyboard, fokus terlihat |
| **SEO** | Metadata per halaman, Open Graph, sitemap |
| **Responsif** | Bekerja optimal di 360px → 1920px |
| **Privasi** | Tanpa login, tanpa pelacakan data input, tanpa server-side storage |
| **Kompatibilitas** | Browser modern (Chrome, Edge, Safari, Firefox versi terbaru) |
| **Keamanan** | Input sanitasi, tanpa injeksi, static host aman |
| **Offline-friendly** | Service worker (PWA) di v1.1 |

---

## 9. Roadmap

### MVP v1.0 (Sekarang)
- [x] 5 kalkulator inti
- [x] Beranda + navigasi
- [x] Riwayat localStorage
- [x] Cetak/PDF
- [x] Panduan & rumus

### v1.1
- [ ] Kalkulator: Margin/Markup, Cash Flow, Simulasi KUR, ROI
- [ ] PWA (offline + installable)
- [ ] Dark mode

### v2.0
- [ ] Akun & cloud sync (Supabase/Firebase)
- [ ] Dashboard ringkasan multi-usaha
- [ ] Export Excel/CSV
- [ ] Template per jenis usaha (kuliner, jasa, dll)

### v3.0
- [ ] API publik
- [ ] Integrasi marketplace/bank
- [ ] AI saran harga & optimasi

---

## 10. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Rumus tidak akurat | Tinggi | Validasi rumus oleh ahli/rujukan akuntansi standar + unit test |
| Pengguna bingung istilah | Sedang | Tooltip, halaman panduan, label sederhana |
| Drop-off karena input banyak | Sedang | Real-time hasil, minimum input wajib, default contoh |
| Kompetisi (Excel/kalkulator lain) | Sedang | UX unggul, instan, tanpa login, hasil profesional |
| Ketergantungan localStorage | Rendah | Info "simpan di perangkat ini" + roadmap cloud sync |

---

## 11. Kriteria Penerimaan (Acceptance Criteria) MVP

1. ✅ Pengguna dapat membuka beranda & memilih 5 kalkulator.
2. ✅ Tiap kalkulator menerima input & menampilkan hasil real-time.
3. ✅ Hasil sesuai rumus standar (diverifikasi unit test).
4. ✅ Pengguna dapat menyimpan hasil ke riwayat lokal.
5. ✅ Pengguna dapat mencetak/menyimpan PDF hasil.
6. ✅ Tampilan responsif di mobile & desktop.
7. ✅ Semua label & konten dalam Bahasa Indonesia.
8. ✅ Tanpa error konsol & lolos audit aksesibilitas dasar.

---

## 12. Lampiran

### 12.1 Glosarium Istilah
- **HPP** — Harga Pokok Penjualan, biaya untuk menghasilkan produk.
- **BEP** — Break Even Point, titik impas (pendapatan = biaya).
- **Margin** — persentase laba terhadap harga jual.
- **Markup** — persentase tambahan di atas HPP.
- **Biaya Tetap** — biaya tidak berubah walau produksi naik (sewa).
- **Biaya Variabel** — biaya berubah mengikuti produksi (bahan baku).
- **ROI** — Return on Investment, tingkat pengembalian modal.
- **KUR** — Kredit Usaha Rakyat, pinjaman pemerintah untuk UMKM.

### 12.2 Referensi Rumus
- Standar akuntansi keuangan UMKM (PSAK EMKM).
- Prinsip *cost-volume-profit (CVP) analysis*.

---

*Dokumen ini bersifat hidup (living document) dan akan diperbarui seiring perkembangan produk.*