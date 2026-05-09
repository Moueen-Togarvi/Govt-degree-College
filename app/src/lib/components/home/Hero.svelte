<script lang="ts">
	import { ArrowRight, ArrowDown } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const staticPrefix = "We are dedicated to";
	const suffixes = [
		"Quality Education.",
		"Academic Excellence.",
		"A Brighter Future.",
		"Student Success."
	];
	const accentColors = ["#f68b1f", "#ffb85c", "#f4a646", "#ffd39a"];

	let currentSuffixIndex = $state(0);
	let displayedSuffix = $state("");
	let isDeleting = $state(false);
	let typingSpeed = $state(100);
	const currentAccentColor = $derived(accentColors[currentSuffixIndex]);

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
		setTimeout(type, typingSpeed);
	}

	onMount(() => {
		setTimeout(type, 1000);
	});
</script>

<section class="relative min-h-[105vh] flex flex-col items-center justify-center overflow-hidden bg-primary">
	<!-- Background Image (Forced Fill) -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/images/logos/hero%20section%20bg.png" 
			alt="College Campus" 
			class="w-full h-full object-fill opacity-80"
		/>
		<div class="absolute inset-0 bg-primary/50"></div>
	</div>

	<!-- Top Left: Welcome Text -->
	<div class="absolute top-12 left-8 lg:left-16 z-30 animate-in fade-in slide-in-from-left-4 duration-1000">
		<p class="text-secondary font-black uppercase tracking-[0.3em] text-sm lg:text-base">Welcome to</p>
		<div class="w-12 h-1 bg-secondary mt-2 rounded-full"></div>
	</div>



	<!-- Main Content -->
	<div class="container relative z-30 mx-auto px-4 pt-16 text-center lg:px-8">
		<!-- Top Center: Main Title -->
		<div class="space-y-4 animate-in fade-in slide-in-from-top-8 duration-1000 delay-200">
			<h2 class="text-white/50 font-bold uppercase tracking-[0.5em] text-xs lg:text-sm">Our Institution</h2>
			<p class="text-secondary font-black uppercase tracking-[0.45em] text-[0.65rem] lg:text-xs">Legacy 1945</p>
			<h1 class="text-2xl lg:text-4xl xl:text-5xl font-black text-white leading-tight drop-shadow-2xl">
				Govt Graduate College <br /> <span class="text-secondary">Bahawalnagar</span>
			</h1>
		</div>

		<!-- Bottom Center: Typewriter Quote -->
		<div class="mx-auto mt-6 max-w-4xl">
			<div class="flex flex-col items-center gap-2">
				<div class="relative flex w-full max-w-4xl justify-center">
					<div class="absolute left-1/2 top-1 z-10 flex -translate-x-1/2 items-center gap-4 rounded-[1.6rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-2xl shadow-primary/20">
						<div class="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-white/90 p-3 shadow-lg shadow-black/10">
							<img
								src="/images/logos/image.png"
								alt="Government of Punjab logo"
								class="h-full w-full object-contain"
							/>
						</div>
						<div class="flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-white/90 p-3 shadow-lg shadow-black/10">
							<img
								src="/images/logos/degree4k-removebg-preview.png"
								alt="GPGC Bahawalnagar logo"
								class="h-full w-full object-contain"
							/>
						</div>
					</div>

					<div class="w-full pt-13">
						<svg viewBox="0 0 900 220" class="w-full overflow-visible">
							<path
								id="heroQuoteCurve"
								d="M 150 70 Q 450 138 750 70"
								fill="transparent"
							/>
							<path
								id="heroQuoteCurveAccent"
								d="M 205 142 Q 450 202 695 142"
								fill="transparent"
							/>
							<text
								class="fill-white text-[28px] font-black italic tracking-[0.02em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] lg:text-[33px]"
								text-anchor="middle"
							>
								<textPath href="#heroQuoteCurve" startOffset="50%">
									{staticPrefix}
								</textPath>
							</text>
							<text
								class="text-[24px] font-black italic tracking-[0.02em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-all duration-500 lg:text-[30px]"
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

			<div class="relative mt-2 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
				<div class="flex flex-wrap justify-center gap-6">
					<a href="/admissions/how-to-apply" class="flex items-center gap-3 px-10 py-5 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-secondary/90 hover:scale-105 transition-all shadow-2xl shadow-secondary/30 active:scale-95 group">
						Start Your Journey
						<ArrowRight size={22} class="transition-transform group-hover:translate-x-2" />
					</a>
					<a href="/about/overview" class="flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95">
						Discover More
					</a>
				</div>
			</div>
		</div>
	</div>



	<!-- Spinning Scroll Indicator -->
	<div class="hidden lg:block absolute bottom-8 right-8 z-30 animate-in fade-in duration-1000 delay-1000">
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
	.animate-spin-slow {
		animation: spin 12s linear infinite;
	}
</style>
