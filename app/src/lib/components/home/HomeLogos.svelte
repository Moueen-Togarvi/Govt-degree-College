<script lang="ts">
	const logos = [
		{
			image: '/images/logos/image.png',
			alt: 'Government of Punjab logo'
		},
		{
			image: '/images/logos/degree4k-removebg-preview.png',
			alt: 'GPGC Bahawalnagar logo'
		},
		{
			image: '/images/logos/image%20copy.png',
			alt: 'KFUEIT logo'
		}
	];

	const marqueeLogos = [...logos, ...logos, ...logos];
</script>

<section class="relative overflow-hidden bg-white py-18 lg:py-22">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(247,148,29,0.08),_transparent_34%)]"
	></div>

	<div class="relative z-10">
		<div
			class="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-white to-transparent"
		></div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-white to-transparent"
		></div>

		<div class="logo-marquee flex w-max items-center gap-6 lg:gap-10">
			{#each marqueeLogos as logo}
				<div
					class="group motion-rise flex h-28 w-44 shrink-0 items-center justify-center rounded-[1.75rem] border border-border-soft bg-neutral-soft/80 px-6 py-5 shadow-[0_16px_45px_rgba(13,93,86,0.08)] transition-transform duration-300 hover:-translate-y-1 lg:h-32 lg:w-52"
				>
					<img
						src={logo.image}
						alt={logo.alt}
						loading="lazy"
						decoding="async"
						class="max-h-16 w-auto object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 lg:max-h-20"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.logo-marquee {
		animation: logo-marquee 26s linear infinite;
	}

	.logo-marquee:hover {
		animation-play-state: paused;
	}

	@keyframes logo-marquee {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(-33.333% - 0.75rem));
		}
	}
</style>
