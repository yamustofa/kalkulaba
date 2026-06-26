# Kalkulaba

Aplikasi web kalkulator usaha yang membantu calon & pemilik **UMKM** membuat perhitungan awal usaha secara **cepat, akurat, dan profesional**.

## Fitur

- **5 Kalkulator Usaha**: Modal Awal, HPP, Harga Jual, BEP (Break Even Point), dan Proyeksi Laba Rugi.
- **Hasil Instan**: Perhitungan real-time saat mengetik.
- **Rekomendasi Cerdas**: Saran otomatis berdasarkan hasil perhitungan.
- **Riwayat Lokal**: Semua hasil tersimpan di `localStorage` perangkat, tanpa server.
- **Cetak/PDF**: Setiap halaman bisa dicetak langsung.
- **Privasi Penuh**: Tidak ada data yang dikirim ke server.
- **Responsif**: Bekerja baik di mobile maupun desktop.

## Tech Stack

- [SvelteKit](https://svelte.dev/) (Svelte 5 dengan runes)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/) (komponen UI)
- [lucide-svelte](https://lucide.dev/) (ikon)
- TypeScript + Vite

## Cara Menjalankan

```sh
# install dependensi
npm install

# jalankan dev server
npm run dev

# build untuk produksi
npm run build

# preview hasil build
npm run preview
```

## Struktur Proyek

```
src/
├── lib/
│   ├── calculators/      # Logika 5 kalkulator (pure functions)
│   ├── components/
│   │   ├── shared/       # Navbar, Footer, BarisHasil, InfoRumus, dll
│   │   └── ui/           # Komponen shadcn-svelte (card, input, badge, dll)
│   ├── stores/           # Store riwayat (localStorage) dengan runes Svelte 5
│   └── utils/            # Utilitas format Rupiah, persentase, dll
├── routes/
│   ├── +layout.svelte    # Layout global (Navbar + Footer)
│   ├── +page.svelte      # Beranda
│   ├── kalkulator/       # 5 halaman kalkulator
│   ├── riwayat/          # Halaman riwayat perhitungan
│   ├── panduan/          # Halaman panduan penggunaan + FAQ
│   └── tentang/          # Halaman tentang aplikasi
└── app.css               # Global styles + CSS variables shadcn

docs/
└── PRD.md                # Product Requirements Document
```

## Dokumentasi

Lihat [`docs/PRD.md`](docs/PRD.md) untuk Product Requirements Document lengkap.

---

Dibuat dengan ❤️ untuk UMKM Indonesia.