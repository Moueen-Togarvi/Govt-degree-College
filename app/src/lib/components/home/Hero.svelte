<script lang="ts">
	import { ArrowRight, ArrowDown } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { ensureGsap, prefersReducedMotion } from '$lib/gsap';

	const staticPrefix = 'We are dedicated to';
	const suffixes = [
		'Quality Education.',
		'Academic Excellence.',
		'A Brighter Future.',
		'Student Success.'
	];
	const accentColors = ['#f68b1f', '#ffb85c', '#f4a646', '#ffd39a'];
	const heroTitleLines = ['Govt Graduate College', 'Bahawalnagar'];

	let currentSuffixIndex = $state(0);
	let displayedSuffix = $state('');
	let isDeleting = $state(false);
	let typingSpeed = $state(100);
	const currentAccentColor = $derived(accentColors[currentSuffixIndex]);
	let heroSection = $state<HTMLElement | null>(null);
	let typeTimer: number | null = null;

	function renderCharacters(value: string) {
		return Array.from(value, (character) => (character === ' ' ? '\u00A0' : character));
	}

	function queueType(delay: number) {
		if (typeof window === 'undefined') return;
		typeTimer = window.setTimeout(type, delay);
	}

	function type() {
		const currentFullSuffix = suffixes[currentSuffixIndex];

		if (!isDeleting) {
			if (displayedSuffix.length < currentFullSuffix.length) {
				displayedSuffix = currentFullSuffix.substring(0, displayedSuffix.length + 1);
				typingSpeed = 100;
			} else {
				isDeleting = true;
				typingSpeed = 2500; // Wait before deleting
			}
		} else {
			if (displayedSuffix.length > 0) {
				displayedSuffix = currentFullSuffix.substring(0, displayedSuffix.length - 1);
				typingSpeed = 40;
			} else {
				isDeleting = false;
				currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
				typingSpeed = 500;
			}
		}

		queueType(typingSpeed);
	}

	onMount(() => {
		queueType(1000);

		if (!heroSection || prefersReducedMotion()) return;

		const gsap = ensureGsap();
		const context = gsap.context(() => {
			try {
				const titleCharacters = gsap.utils.toArray<HTMLElement>('[data-hero-char]');

				gsap.set('[data-hero-curtain]', {
					transformOrigin: 'top center',
					scaleY: 1
				});

				gsap
					.timeline({ defaults: { ease: 'power3.out' } })
					.to('[data-hero-curtain]', {
						scaleY: 0,
						duration: 1.1,
						ease: 'power4.inOut'
					})
					.from(
						'[data-hero-eyebrow]',
						{
							autoAlpha: 0,
							y: 36,
							skewY: 7,
							duration: 0.65
						},
						'-=0.5'
					)
					.from(
						['[data-hero-kicker]', '[data-hero-legacy]'],
						{
							autoAlpha: 0,
							y: 24,
							letterSpacing: '0.55em',
							duration: 0.75,
							stagger: 0.1
						},
						'-=0.45'
					)
					.from(
						titleCharacters,
						{
							autoAlpha: 0,
							yPercent: 150,
							rotateX: -110,
							skewY: 10,
							transformOrigin: '50% 100%',
							duration: 1.2,
							ease: 'back.out(2.2)',
							stagger: {
								amount: 1.2,
								from: 'center'
							}
						},
						'-=0.45'
					)
					.from(
						'[data-hero-logo-ribbon]',
						{
							autoAlpha: 0,
							scale: 0.82,
							filter: 'blur(16px)',
							duration: 0.9
						},
						'-=0.75'
					)
					.from(
						'[data-hero-quote]',
						{
							autoAlpha: 0,
							clipPath: 'inset(0 0 100% 0 round 2rem)',
							duration: 0.8
						},
						'-=0.45'
					)
					.from(
						'[data-hero-cta]',
						{
							autoAlpha: 0,
							y: 32,
							scale: 0.94,
							filter: 'blur(10px)',
							immediateRender: false,
							duration: 0.7,
							stagger: 0.12
						},
						'-=0.3'
					)
					.from(
						'[data-hero-indicator]',
						{
							autoAlpha: 0,
							y: 28,
							duration: 0.55
						},
						'-=0.15'
					);

				gsap.fromTo(
					'[data-parallax-bg]',
					{
						scale: 1.04,
						yPercent: 0
					},
					{
						scale: 1.16,
						yPercent: 10,
						ease: 'none',
						scrollTrigger: {
							trigger: heroSection,
							start: 'top top',
							end: 'bottom top',
							scrub: true
						}
					}
				);

				gsap.fromTo(
					'[data-parallax-plate]',
					{
						yPercent: 0
					},
					{
						yPercent: -16,
						ease: 'none',
						scrollTrigger: {
							trigger: heroSection,
							start: 'top top',
							end: 'bottom top',
							scrub: true
						}
					}
				);
			} catch (error) {
				console.error('Hero GSAP animation failed:', error);
				gsap.set('[data-hero-curtain]', {
					autoAlpha: 0
				});
				gsap.set('[data-hero-cta]', {
					clearProps: 'all',
					autoAlpha: 1
				});
			}
		}, heroSection);

		return () => context.revert();
	});

	onDestroy(() => {
		if (typeTimer) {
			clearTimeout(typeTimer);
		}
	});
</script>

<section
	data-stack-skip="true"
	bind:this={heroSection}
	class="relative flex min-h-[105vh] flex-col items-center justify-center overflow-hidden bg-primary"
>
	<div
		data-hero-curtain
		class="pointer-events-none absolute inset-0 z-40 origin-top bg-[linear-gradient(180deg,_#0d5d56_0%,_#f68b1f_100%)]"
	></div>

	<!-- Background Image (Forced Fill) -->
	<div class="absolute inset-0 z-0">
		<img
			data-parallax-bg
			src="/images/logos/hero section bg.png"
			alt="College Campus"
			class="w-full h-full object-cover opacity-90 transition-transform duration-[10s] hover:scale-110"
		/>
		<!-- Lighter, warmer overlay -->
		<div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/60 backdrop-brightness-[0.85]"></div>
	</div>

	<!-- Top Left: Welcome Text -->
	<div
		data-hero-eyebrow
		class="absolute left-8 top-12 z-30 lg:left-16"
	>
		<p class="text-secondary font-black uppercase tracking-[0.3em] text-sm lg:text-base">Welcome to</p>
		<div class="w-12 h-1 bg-secondary mt-2 rounded-full"></div>
	</div>



	<!-- Main Content -->
	<div class="container relative z-30 mx-auto px-4 text-center lg:px-8 flex flex-col items-center">
		<!-- Top Center: Main Title -->
		<div class="space-y-3">
			<h2
				data-hero-kicker
				class="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60 lg:text-xs"
			>
				Our Institution
			</h2>
			<p
				data-hero-legacy
				class="text-[9px] font-medium uppercase tracking-[0.35em] text-secondary/90 lg:text-[10px]"
			>
				Legacy 1945
			</p>
			<h1 class="mt-4 text-3xl font-black leading-tight tracking-tight text-white drop-shadow-2xl lg:text-5xl xl:text-7xl">
				{#each heroTitleLines as line, lineIndex}
					<span class="block overflow-hidden">
						<span
							class={`hero-title-line ${lineIndex === 1 ? 'text-secondary' : 'text-white'}`}
						>
							{#each renderCharacters(line) as character}
								<span data-hero-char class="hero-char">{character}</span>
							{/each}
						</span>
					</span>
				{/each}
			</h1>
		</div>

		<!-- Bottom Center: Typewriter Quote -->
		<div class="mx-auto mt-10 max-w-4xl">
			<div class="flex flex-col items-center gap-2">
				<div class="relative flex w-full max-w-4xl justify-center">
					<!-- Logos with Labels and Divider -->
					<div
						data-hero-logo-ribbon
						data-parallax-plate
						class="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 shadow-2xl backdrop-blur-2xl"
					>
						<div class="flex flex-col items-center group">
							<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl transition-transform group-hover:scale-110">
								<img src="/images/logos/image.png" alt="Govt Logo" class="h-full w-full object-contain" />
							</div>
						</div>
						
						<div class="h-10 w-px bg-white/10"></div>
						
						<div class="flex flex-col items-center group">
							<div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl transition-transform group-hover:scale-110">
								<img src="/images/logos/degree4k-removebg-preview.png" alt="College Logo" class="h-full w-full object-contain" />
							</div>
						</div>
					</div>

					<div data-hero-quote class="w-full pt-24">
						<svg viewBox="0 0 900 220" class="w-full overflow-visible">
							<path id="heroQuoteCurve" d="M 150 70 Q 450 138 750 70" fill="transparent" />
							<path id="heroQuoteCurveAccent" d="M 205 142 Q 450 202 695 142" fill="transparent" />
							<text
								class="fill-white text-[28px] font-bold italic tracking-tight drop-shadow-lg lg:text-[36px]"
								text-anchor="middle"
							>
								<textPath href="#heroQuoteCurve" startOffset="50%">
									{staticPrefix}
								</textPath>
							</text>
							<text
								class="text-[26px] font-black italic tracking-tight drop-shadow-lg transition-all duration-500 lg:text-[34px]"
								text-anchor="middle"
								style={`fill: ${currentAccentColor};`}
							>
								<textPath href="#heroQuoteCurveAccent" startOffset="50%">
									{displayedSuffix || " "}
								</textPath>
							</text>
						</svg>
					</div>
				</div>
			</div>

			<div class="relative mt-8 flex flex-col items-center">
				<div class="flex flex-wrap justify-center gap-4">
					<a
						data-hero-cta
						href="/admissions/how-to-apply"
						class="group flex items-center gap-3 rounded-2xl bg-secondary px-8 py-4 text-base font-black text-white shadow-2xl shadow-secondary/40 transition-all hover:scale-105 hover:bg-secondary/90 active:scale-95 lg:px-10 lg:py-4"
					>
						Start Your Journey
						<ArrowRight size={20} class="transition-transform group-hover:translate-x-2" />
					</a>
					<a
						data-hero-cta
						href="/about/overview"
						class="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur-2xl transition-all hover:scale-105 hover:bg-white/20 active:scale-95 lg:px-10 lg:py-4"
					>
						Discover More
					</a>
				</div>
			</div>
		</div>
	</div>



	<!-- Spinning Scroll Indicator -->
	<div data-hero-indicator class="absolute bottom-8 right-8 z-30 hidden lg:block">
		<div class="relative w-32 h-32 flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
			<!-- Spinning SVG Text -->
			<div class="absolute inset-0 animate-spin-slow">
				<svg viewBox="0 0 100 100" class="w-full h-full text-white/80 overflow-visible">
					<path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
					<text class="text-[12px] font-black uppercase tracking-[0.15em] fill-current">
						<textPath href="#circlePath" startOffset="0%">
							EXPLORE CAMPUS • SCROLL DOWN • 
						</textPath>
					</text>
				</svg>
			</div>
			<!-- Center Arrow -->
			<div class="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform shadow-xl">
				<ArrowDown size={20} class="animate-bounce" />
			</div>
		</div>
	</div>

	<div class="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 lg:px-8">
		<div class="container mx-auto">
			<div class="relative mx-auto h-16 max-w-6xl overflow-hidden rounded-full">
				<div class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-title-line {
		display: inline-block;
	}

	.hero-char {
		display: inline-block;
		will-change: transform, opacity;
	}

	.animate-spin-slow {
		animation: spin 12s linear infinite;
	}
</style>
