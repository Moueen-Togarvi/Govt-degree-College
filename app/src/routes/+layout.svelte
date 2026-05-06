<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Govt Post Graduate College Bahawalnagar</title>
</svelte:head>

<div class="flex flex-col min-h-screen bg-white">
	<Navbar />
	
	<main class="flex-grow pt-[120px]">
		{@render children()}
	</main>

	<Footer />
</div>
