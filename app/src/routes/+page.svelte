<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import NewsTicker from '$lib/components/home/NewsTicker.svelte';
	import HomeLogos from '$lib/components/home/HomeLogos.svelte';
	import ImportantNotices from '$lib/components/home/ImportantNotices.svelte';
	import PrincipalMessage from '$lib/components/home/PrincipalMessage.svelte';
	import Stats from '$lib/components/home/Stats.svelte';
	import FeaturedPrograms from '$lib/components/home/FeaturedPrograms.svelte';
	import GalleryPreview from '$lib/components/home/GalleryPreview.svelte';
	import AdmissionsJourney from '$lib/components/home/AdmissionsJourney.svelte';
	import FinalCta from '$lib/components/home/FinalCta.svelte';
	import LightBeamDivider from '$lib/components/home/LightBeamDivider.svelte';
	import { onMount } from 'svelte';
	import { ensureGsap, prefersReducedMotion } from '$lib/gsap';

	let { data } = $props();
	let stackZone = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!stackZone || prefersReducedMotion()) return;

		const gsap = ensureGsap();
		const context = gsap.context(() => {
			const stackPanels = gsap.utils.toArray<HTMLElement>('[data-stack-sticky]');

			stackPanels.forEach((panel, index) => {
				const wrapper = panel.parentElement;
				if (!wrapper) return;

				gsap.fromTo(
					panel,
					{
						autoAlpha: 0.45,
						yPercent: index === 0 ? 0 : 12,
						scale: 0.94,
						rotate: [-2.6, 0, 2.6][index] ?? 0,
						filter: 'blur(12px)'
					},
					{
						autoAlpha: 1,
						yPercent: 0,
						scale: 1,
						rotate: 0,
						filter: 'blur(0px)',
						ease: 'power3.out',
						scrollTrigger: {
							trigger: wrapper,
							start: 'top bottom-=120',
							end: 'top top+=160',
							scrub: true
						}
					}
				);

				if (index < stackPanels.length - 1) {
					gsap.to(panel, {
						scale: 0.95,
						yPercent: -6,
						filter: 'blur(4px)',
						ease: 'none',
						scrollTrigger: {
							trigger: stackPanels[index + 1].parentElement,
							start: 'top bottom-=120',
							end: 'top top+=100',
							scrub: true
						}
					});
				}
			});
		}, stackZone);

		return () => context.revert();
	});
</script>

<svelte:head>
	<title>Home | Govt Post Graduate College Bahawalnagar</title>
	<meta
		name="description"
		content="Govt Post Graduate College Bahawalnagar offers free 11th and 12th classes under the Government of Punjab and BS programs affiliated with KFUEIT."
	/>
</svelte:head>

<NewsTicker announcements={data.tickerAnnouncements} />
<Hero />
<div bind:this={stackZone} class="home-stack-zone">
	<div class="home-stack-panel">
		<div data-stack-sticky class="home-stack-sticky">
			<Stats />
		</div>
	</div>

	<div class="home-stack-panel">
		<div data-stack-sticky class="home-stack-sticky">
			<FeaturedPrograms />
		</div>
	</div>

	<div class="home-stack-panel">
		<div data-stack-sticky class="home-stack-sticky">
			<ImportantNotices notices={data.noticeBoardItems} />
		</div>
	</div>
</div>
<HomeLogos />
<PrincipalMessage />
<GalleryPreview />
<AdmissionsJourney />
<LightBeamDivider />
<FinalCta />

<style>
	@media (min-width: 1024px) {
		.home-stack-zone {
			position: relative;
			margin-top: -2rem;
		}

		.home-stack-panel {
			position: relative;
			min-height: 140vh;
		}

		.home-stack-sticky {
			position: sticky;
			top: 5.75rem;
			will-change: transform, filter, opacity;
		}
	}
</style>
