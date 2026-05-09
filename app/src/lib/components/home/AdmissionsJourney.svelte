<script lang="ts">
	import { ArrowRight, BadgeCheck, ClipboardCheck, FileText, GraduationCap } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { ensureGsap, prefersReducedMotion } from '$lib/gsap';

	const steps = [
		{
			title: 'Choose Your Program',
			description: 'Select 11th, 12th, BS Morning, or BS Evening according to your academic path.',
			icon: GraduationCap
		},
		{
			title: 'Prepare Documents',
			description: 'Collect the required certificates, records, and application materials.',
			icon: FileText
		},
		{
			title: 'Verification and Guidance',
			description: 'Follow the admission procedure, eligibility checks, and merit-related steps.',
			icon: ClipboardCheck
		},
		{
			title: 'Start Classes',
			description: 'Begin free intermediate studies or move into KFUEIT-affiliated BS classes.',
			icon: BadgeCheck
		}
	];

	let sectionEl = $state<HTMLElement | null>(null);

	onMount(() => {
		if (!sectionEl || prefersReducedMotion()) return;

		const gsap = ensureGsap();
		const context = gsap.context(() => {
			gsap.from('[data-journey-step]', {
				autoAlpha: 0,
				y: 30,
				stagger: 0.15,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 70%'
				}
			});

			gsap.from('[data-journey-path]', {
				strokeDashoffset: 1000,
				duration: 2.5,
				ease: 'power1.inOut',
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 60%'
				}
			});
		}, sectionEl);

		return () => context.revert();
	});
</script>

<section bind:this={sectionEl} class="relative overflow-hidden bg-white py-24">
	<div class="absolute inset-0 bg-[linear-gradient(180deg,_rgba(247,148,29,0.03),_transparent_30%,_rgba(13,93,86,0.05))]"></div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<div class="mx-auto mb-14 max-w-3xl text-center motion-rise">
			<p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Admissions Journey</p>
			<h2 class="text-4xl font-black text-primary lg:text-5xl">A clear path from interest to enrollment.</h2>
			<p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">
				Keep the process easy to understand: 11th and 12th classes are free, while BS programs are the ones affiliated with KFUEIT.
			</p>
		</div>

		<div class="relative">
			<div class="absolute left-0 right-0 top-10 hidden xl:block pointer-events-none">
				<svg width="100%" height="20" viewBox="0 0 1200 20" fill="none" class="overflow-visible">
					<path 
						data-journey-path
						d="M 150 10 L 1050 10" 
						stroke="#f68b1f" 
						stroke-width="2" 
						stroke-dasharray="1000" 
						stroke-dashoffset="0"
						opacity="0.25"
					/>
				</svg>
			</div>

			<div class="grid gap-6 xl:grid-cols-4">
				{#each steps as step, index}
					<div data-journey-step class="relative rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-7 shadow-[0_20px_60px_rgba(13,93,86,0.08)]">
						<div class="mb-6 flex items-center justify-between">
							<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white motion-float">
								<step.icon size={24} />
							</div>
							<span class="text-xs font-black uppercase tracking-[0.24em] text-secondary">Step {index + 1}</span>
						</div>
						<h3 class="text-xl font-black text-primary">{step.title}</h3>
						<p class="mt-3 text-sm font-medium leading-7 text-primary/65">{step.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-10 flex flex-col gap-4 rounded-[2rem] border border-secondary/20 bg-secondary/10 p-6 text-primary lg:flex-row lg:items-center lg:justify-between motion-rise">
			<div>
				<p class="text-sm font-black uppercase tracking-[0.28em] text-secondary">Important Note</p>
				<p class="mt-2 text-lg font-black">11th and 12th classes are free. KFUEIT affiliation applies to BS classes only.</p>
			</div>
			<a href="/admissions/how-to-apply" class="inline-flex items-center gap-3 self-start rounded-full bg-primary px-6 py-3 font-black text-white transition-all hover:-translate-y-1 hover:bg-accent">
				Read Admission Guide
				<ArrowRight size={18} />
			</a>
		</div>
	</div>
</section>
