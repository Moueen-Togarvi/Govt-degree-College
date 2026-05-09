<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ensureGsap, initLenis } from '$lib/gsap';

	let { children } = $props();

	onMount(() => {
		ensureGsap();
		initLenis();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Govt Post Graduate College Bahawalnagar</title>
</svelte:head>

<div class="flex flex-col min-h-screen bg-white">
	{#if !$page.url.pathname.startsWith('/admin')}
		<Navbar />
	{/if}
	
	<main class="flex-grow {$page.url.pathname.startsWith('/admin') ? '' : 'pt-[105px]'}">
		{@render children()}
	</main>

	{#if !$page.url.pathname.startsWith('/admin')}
		<Footer />
	{/if}
</div>
