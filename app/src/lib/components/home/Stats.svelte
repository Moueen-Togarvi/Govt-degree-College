<script lang="ts">
	import { Building2, Clock3, GraduationCap, School, Users } from 'lucide-svelte';

	const stats = [
		{
			label: 'Active Students',
			value: '5,000+',
			icon: Users
		},
		{
			label: 'Departments',
			value: '7',
			icon: Building2
		},
		{
			label: 'Teachers',
			value: '50+',
			icon: School
		},
		{
			label: 'BS Shifts',
			value: '2',
			icon: Clock3
		},
		{
			label: 'Legacy',
			value: '1945',
			icon: GraduationCap
		}
	];

	const particles = [
		{ top: '14%', left: '8%', size: 4, delay: '0s', duration: '6.5s' },
		{ top: '22%', left: '27%', size: 6, delay: '1.2s', duration: '7.2s' },
		{ top: '18%', left: '74%', size: 5, delay: '0.5s', duration: '6.8s' },
		{ top: '30%', left: '88%', size: 3, delay: '1.6s', duration: '7.6s' },
		{ top: '52%', left: '14%', size: 5, delay: '0.9s', duration: '6.9s' },
		{ top: '64%', left: '38%', size: 4, delay: '1.8s', duration: '7.4s' },
		{ top: '58%', left: '62%', size: 6, delay: '0.4s', duration: '6.7s' },
		{ top: '74%', left: '82%', size: 4, delay: '1.1s', duration: '7.1s' },
		{ top: '82%', left: '22%', size: 3, delay: '0.7s', duration: '6.4s' },
		{ top: '86%', left: '69%', size: 5, delay: '1.4s', duration: '7.7s' }
	];
</script>

<section class="relative overflow-hidden bg-white py-14 lg:py-16">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,148,29,0.06),_transparent_38%)]"></div>
	<div class="stats-orb stats-orb-teal"></div>
	<div class="stats-orb stats-orb-orange"></div>
	<div class="stats-orb stats-orb-soft"></div>

	<div class="pointer-events-none absolute inset-0">
		<div class="stats-corner stats-corner-top-left"></div>
		<div class="stats-corner stats-corner-top-right"></div>
		<div class="stats-corner stats-corner-bottom-left"></div>
		<div class="stats-corner stats-corner-bottom-right"></div>

		{#each particles as particle}
			<span
				class="stats-particle"
				style={`top:${particle.top};left:${particle.left};width:${particle.size}px;height:${particle.size}px;animation-delay:${particle.delay};animation-duration:${particle.duration};`}
			></span>
		{/each}
	</div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-border-soft py-8 md:grid-cols-3 xl:grid-cols-5">
			{#each stats as stat, index}
				<div class="text-center motion-rise" style={`animation-delay: ${index * 90}ms`}>
					<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white motion-float">
						<stat.icon size={24} strokeWidth={1.9} />
					</div>
					<p class="text-3xl font-black text-primary lg:text-4xl">{stat.value}</p>
					<h3 class="mt-2 text-sm font-black uppercase tracking-[0.18em] text-primary/65 lg:text-base">
						{stat.label}
					</h3>
				</div>
			{/each}
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
		border-radius: 9999px;
		background: rgba(247, 148, 29, 0.42);
		box-shadow: 0 0 12px rgba(247, 148, 29, 0.22);
		animation: stats-particle-drift 7s ease-in-out infinite;
	}

	.stats-corner {
		position: absolute;
		width: 6rem;
		height: 6rem;
		border-color: rgba(13, 93, 86, 0.16);
		opacity: 0;
		animation: stats-corner-pulse 6.5s ease-in-out infinite;
	}

	.stats-corner-top-left {
		top: 1.5rem;
		left: 1.5rem;
		border-top: 2px solid;
		border-left: 2px solid;
		border-top-left-radius: 1.5rem;
	}

	.stats-corner-top-right {
		top: 1.5rem;
		right: 1.5rem;
		border-top: 2px solid;
		border-right: 2px solid;
		border-top-right-radius: 1.5rem;
		animation-delay: 1.2s;
	}

	.stats-corner-bottom-left {
		bottom: 1.5rem;
		left: 1.5rem;
		border-bottom: 2px solid;
		border-left: 2px solid;
		border-bottom-left-radius: 1.5rem;
		animation-delay: 2.4s;
	}

	.stats-corner-bottom-right {
		right: 1.5rem;
		bottom: 1.5rem;
		border-right: 2px solid;
		border-bottom: 2px solid;
		border-bottom-right-radius: 1.5rem;
		animation-delay: 3.6s;
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
			opacity: 0.25;
		}

		50% {
			transform: translate3d(0, -10px, 0);
			opacity: 0.9;
		}
	}

	@keyframes stats-corner-pulse {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.94);
		}

		40%,
		60% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
