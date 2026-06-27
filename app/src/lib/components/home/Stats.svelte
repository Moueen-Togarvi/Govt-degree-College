<script lang="ts">
	import { Building2, Clock3, GraduationCap, School, Users } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { ensureGsap, prefersReducedMotion } from '$lib/gsap';

	const stats = [
		{
			label: 'Active Students',
			value: '5,000+',
			target: 5000,
			suffix: '+',
			icon: Users
		},
		{
			label: 'Departments',
			value: '7',
			target: 7,
			suffix: '',
			icon: Building2
		},
		{
			label: 'Teachers',
			value: '50+',
			target: 50,
			suffix: '+',
			icon: School
		},
		{
			label: 'BS Shifts',
			value: '2',
			target: 2,
			suffix: '',
			icon: Clock3
		},
		{
			label: 'Legacy',
			value: '1945',
			target: 1945,
			suffix: '',
			icon: GraduationCap
		}
	];

	const particles = [
		{ top: '14%', left: '8%', size: 12, delay: '0s', duration: '6.5s', variant: 'star' },
		{ top: '22%', left: '27%', size: 14, delay: '1.2s', duration: '7.2s', variant: 'broken' },
		{ top: '18%', left: '74%', size: 12, delay: '0.5s', duration: '6.8s', variant: 'star' },
		{ top: '30%', left: '88%', size: 10, delay: '1.6s', duration: '7.6s', variant: 'broken' },
		{ top: '52%', left: '14%', size: 12, delay: '0.9s', duration: '6.9s', variant: 'star' },
		{ top: '64%', left: '38%', size: 10, delay: '1.8s', duration: '7.4s', variant: 'broken' },
		{ top: '58%', left: '62%', size: 13, delay: '0.4s', duration: '6.7s', variant: 'star' },
		{ top: '74%', left: '82%', size: 11, delay: '1.1s', duration: '7.1s', variant: 'broken' },
		{ top: '82%', left: '22%', size: 10, delay: '0.7s', duration: '6.4s', variant: 'star' },
		{ top: '86%', left: '69%', size: 12, delay: '1.4s', duration: '7.7s', variant: 'broken' }
	];

	let sectionEl = $state<HTMLElement | null>(null);

	function formatStatValue(index: number, value: number) {
		const stat = stats[index];
		const rounded = Math.round(value);

		if (stat.target >= 1000) {
			return `${rounded.toLocaleString()}${stat.suffix}`;
		}

		return `${rounded}${stat.suffix}`;
	}

	onMount(() => {
		if (!sectionEl || prefersReducedMotion()) return;

		let disposed = false;
		const triggers: Array<{ kill: () => void } | undefined> = [];

		void (async () => {
			const runtime = await ensureGsap();
			if (!runtime || !sectionEl || disposed) return;

			const { gsap } = runtime;
			const values = Array.from(sectionEl.querySelectorAll<HTMLElement>('[data-stat-value]'));

			triggers.push(
				...values.map(
					(element, index) =>
						gsap.fromTo(
							{ value: 0 },
							{ value: 0 },
							{
								value: stats[index].target,
								duration: index === stats.length - 1 ? 1.15 : 0.9,
								ease: 'power2.out',
								scrollTrigger: {
									trigger: sectionEl,
									start: 'top 72%',
									once: true
								},
								onUpdate(this: any) {
									element.textContent = formatStatValue(index, this.targets()[0].value);
								}
							}
						).scrollTrigger as { kill: () => void } | undefined
				)
			);
		})();

		return () => {
			disposed = true;
			triggers.forEach((trigger) => trigger?.kill());
		};
	});
</script>

<section bind:this={sectionEl} class="relative overflow-hidden bg-white py-14 lg:py-16">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,148,29,0.06),_transparent_38%)]"
	></div>
	<div class="stats-orb stats-orb-teal"></div>
	<div class="stats-orb stats-orb-orange"></div>
	<div class="stats-orb stats-orb-soft"></div>

	<div class="pointer-events-none absolute inset-0">
		{#each particles as particle}
			<span
				class={`stats-particle ${particle.variant === 'broken' ? 'stats-particle-broken' : 'stats-particle-star'}`}
				style={`top:${particle.top};left:${particle.left};width:${particle.size}px;height:${particle.size}px;animation-delay:${particle.delay};animation-duration:${particle.duration};`}
			></span>
		{/each}
	</div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div
			class="stats-frame relative overflow-hidden rounded-[2rem] border border-primary/10 px-4 py-8 lg:px-6"
		>
			<div class="pointer-events-none absolute inset-0">
				<div class="stats-frame-border"></div>
				<span class="stats-beam stats-beam-top"></span>
				<span class="stats-beam stats-beam-right"></span>
				<span class="stats-beam stats-beam-bottom"></span>
				<span class="stats-beam stats-beam-left"></span>
			</div>

			<div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
				{#each stats as stat, index}
					<div class="text-center" style={`animation-delay: ${index * 90}ms`}>
						<div
							class="motion-float mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white"
						>
							<stat.icon size={24} strokeWidth={1.9} />
						</div>
						<p data-stat-value class="text-3xl font-black text-primary lg:text-4xl">{stat.value}</p>
						<h3
							class="mt-2 text-sm font-black tracking-[0.18em] text-primary/65 uppercase lg:text-base"
						>
							{stat.label}
						</h3>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.stats-orb {
		position: absolute;
		border-radius: 9999px;
		filter: blur(70px);
		opacity: 0.22;
		animation: stats-orb-float 12s ease-in-out infinite;
		pointer-events: none;
	}

	.stats-orb-teal {
		top: 8%;
		left: 6%;
		width: 18rem;
		height: 18rem;
		background: rgba(13, 93, 86, 0.16);
	}

	.stats-orb-orange {
		right: 8%;
		top: 18%;
		width: 14rem;
		height: 14rem;
		background: rgba(247, 148, 29, 0.18);
		animation-delay: -3.2s;
	}

	.stats-orb-soft {
		left: 42%;
		bottom: -4rem;
		width: 16rem;
		height: 16rem;
		background: rgba(17, 125, 116, 0.12);
		animation-delay: -6s;
	}

	.stats-particle {
		position: absolute;
		display: block;
		animation: stats-particle-drift 7s ease-in-out infinite;
		filter: drop-shadow(0 0 10px rgba(247, 148, 29, 0.2));
	}

	.stats-particle-star {
		background: rgba(247, 148, 29, 0.72);
		clip-path: polygon(50% 0%, 62% 36%, 100% 50%, 62% 64%, 50% 100%, 38% 64%, 0% 50%, 38% 36%);
	}

	.stats-particle-broken {
		background:
			linear-gradient(rgba(247, 148, 29, 0.78), rgba(247, 148, 29, 0.78)) center/28% 100% no-repeat,
			linear-gradient(90deg, rgba(247, 148, 29, 0.78), rgba(247, 148, 29, 0.78)) center/100% 28%
				no-repeat;
		clip-path: polygon(50% 0%, 59% 30%, 100% 50%, 59% 70%, 50% 100%, 41% 70%, 0% 50%, 41% 30%);
		opacity: 0.8;
	}

	.stats-frame-border {
		position: absolute;
		inset: 0;
		border-radius: 2rem;
		border: 1px solid rgba(13, 93, 86, 0.08);
	}

	.stats-beam {
		position: absolute;
		display: block;
		border-radius: 9999px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(247, 148, 29, 0.95),
			rgba(255, 255, 255, 0.95),
			transparent
		);
		filter: blur(0.2px);
		box-shadow: 0 0 20px rgba(247, 148, 29, 0.38);
		opacity: 0;
	}

	.stats-beam-top {
		top: 0;
		left: 0;
		width: 8rem;
		height: 2px;
		animation: stats-beam-top-run 8s linear infinite;
	}

	.stats-beam-right {
		top: 0;
		right: 0;
		width: 2px;
		height: 8rem;
		background: linear-gradient(
			180deg,
			transparent,
			rgba(247, 148, 29, 0.95),
			rgba(255, 255, 255, 0.95),
			transparent
		);
		animation: stats-beam-right-run 8s linear infinite;
		animation-delay: 2s;
	}

	.stats-beam-bottom {
		right: 0;
		bottom: 0;
		width: 8rem;
		height: 2px;
		animation: stats-beam-bottom-run 8s linear infinite;
		animation-delay: 4s;
	}

	.stats-beam-left {
		left: 0;
		bottom: 0;
		width: 2px;
		height: 8rem;
		background: linear-gradient(
			180deg,
			transparent,
			rgba(247, 148, 29, 0.95),
			rgba(255, 255, 255, 0.95),
			transparent
		);
		animation: stats-beam-left-run 8s linear infinite;
		animation-delay: 6s;
	}

	@keyframes stats-orb-float {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}

		50% {
			transform: translate3d(0, -16px, 0) scale(1.06);
		}
	}

	@keyframes stats-particle-drift {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
			opacity: 0.3;
		}

		50% {
			transform: translate3d(0, -10px, 0) rotate(22deg);
			opacity: 0.9;
		}
	}

	@keyframes stats-beam-top-run {
		0% {
			transform: translate3d(-8rem, 0, 0);
			opacity: 0;
		}
		10%,
		40% {
			opacity: 1;
		}
		50%,
		100% {
			transform: translate3d(calc(100% + 8rem), 0, 0);
			opacity: 0;
		}
	}

	@keyframes stats-beam-right-run {
		0% {
			transform: translate3d(0, -8rem, 0);
			opacity: 0;
		}
		10%,
		40% {
			opacity: 1;
		}
		50%,
		100% {
			transform: translate3d(0, calc(100% + 8rem), 0);
			opacity: 0;
		}
	}

	@keyframes stats-beam-bottom-run {
		0% {
			transform: translate3d(8rem, 0, 0);
			opacity: 0;
		}
		10%,
		40% {
			opacity: 1;
		}
		50%,
		100% {
			transform: translate3d(calc(-100% - 8rem), 0, 0);
			opacity: 0;
		}
	}

	@keyframes stats-beam-left-run {
		0% {
			transform: translate3d(0, 8rem, 0);
			opacity: 0;
		}
		10%,
		40% {
			opacity: 1;
		}
		50%,
		100% {
			transform: translate3d(0, calc(-100% - 8rem), 0);
			opacity: 0;
		}
	}
</style>
