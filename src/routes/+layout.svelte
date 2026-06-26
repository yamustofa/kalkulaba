<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Kalkulaba — Kalkulator Usaha untuk UMKM</title>
	<meta
		name="description"
		content="Hitung modal awal, HPP, harga jual, BEP, dan laba rugi usaha Anda dengan cepat, akurat, dan profesional."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>