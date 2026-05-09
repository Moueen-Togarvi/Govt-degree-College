<script lang="ts">
	import './layout.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onMount, tick } from 'svelte';
	import { ensureGsap, setupStickyStack } from '$lib/gsap';

	let { children } = $props();
	let mainElement = $state<HTMLElement | null>(null);

	onMount(() => {
		ensureGsap();

		let cleanup = () => {};

		const applyStack = async () => {
			cleanup();

			if (!mainElement || get(page).url.pathname.startsWith('/admin')) {
				return;
			}

			await tick();
			cleanup = setupStickyStack(mainElement, { topOffset: 116, minPanelHeight: 260 });
		};

		void applyStack();

		const unsubscribe = page.subscribe(() => {
			void applyStack();
		});

		return () => {
			cleanup();
			unsubscribe();
		};
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
