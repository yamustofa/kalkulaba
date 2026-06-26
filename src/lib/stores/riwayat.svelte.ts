/**
 * Store riwayat perhitungan — disimpan di localStorage perangkat.
 */
import { browser } from '$app/environment';

export interface ItemRiwayat {
	id: string;
	slug: string;
	namaKalkulator: string;
	ringkasan: string;
	detail: Record<string, string>;
	tanggal: number;
}

const KEY = 'kalkulaba:riwayat';

function muat(): ItemRiwayat[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const data = JSON.parse(raw);
		return Array.isArray(data) ? data : [];
	} catch {
		return [];
	}
}

function simpan(items: ItemRiwayat[]) {
	if (!browser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(items));
	} catch {
		/* storage penuh / tidak tersedia — abaikan */
	}
}

class StoreRiwayat {
	items = $state<ItemRiwayat[]>(muat());

	dapatkan() {
		return this.items;
	}

	tambah(item: Omit<ItemRiwayat, 'id' | 'tanggal'>) {
		const baru: ItemRiwayat = {
			...item,
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
			tanggal: Date.now()
		};
		this.items = [baru, ...this.items].slice(0, 100); // maks 100 item
		simpan(this.items);
		return baru;
	}

	hapus(id: string) {
		this.items = this.items.filter((i) => i.id !== id);
		simpan(this.items);
	}

	bersihkan() {
		this.items = [];
		simpan(this.items);
	}
}

export const riwayat = new StoreRiwayat();