<script lang="ts">
	import './layout.css';
	import { afterNavigate } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onMount, tick } from 'svelte';
	import { setupStickyStack } from '$lib/gsap';

	let { children } = $props();
	let mainElement = $state<HTMLElement | null>(null);

	onMount(() => {
		let cleanup = () => {};

		const applyStack = async () => {
			cleanup();

			const pathname = get(page).url.pathname;
			if (!mainElement || pathname.startsWith('/admin') || pathname !== '/') {
				return;
			}

			await tick();
			cleanup = await setupStickyStack(mainElement, { topOffset: 116, minPanelHeight: 260 });
		};

		void applyStack();

		afterNavigate(() => {
			void applyStack();
		});

		return () => {
			cleanup();
		};
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/images/logos/degree4k-removebg-preview.png" />
	<title>Govt Post Graduate College Bahawalnagar</title>
</svelte:head>

<div class="flex flex-col min-h-screen bg-white">
	{#if !$page.url.pathname.startsWith('/admin')}
		<Navbar />
	{/if}
	
	<main
		bind:this={mainElement}
		class="flex-grow overflow-x-clip {$page.url.pathname.startsWith('/admin') ? '' : 'pt-[105px]'}"
	>
		{@render children()}
	</main>

	{#if !$page.url.pathname.startsWith('/admin')}
		<Footer />
	{/if}
</div>

<style>
	:global(.stack-shell) {
		position: relative;
		min-height: var(--stack-shell-height, 140vh);
	}

	:global(.stack-panel) {
		position: sticky;
		top: var(--stack-top, 116px);
		will-change: transform;
	}

	@media (max-width: 1023px) {
		:global(.stack-shell) {
			min-height: auto;
		}

		:global(.stack-panel) {
			position: relative;
			top: auto;
		}
	}
</style>
