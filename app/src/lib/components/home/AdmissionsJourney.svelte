<script lang="ts">
	import { ArrowRight, BadgeCheck, ClipboardCheck, FileText, GraduationCap } from 'lucide-svelte';

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
</script>

<section class="relative overflow-hidden bg-white py-24">
	<div
		class="absolute inset-0 bg-[linear-gradient(180deg,_rgba(247,148,29,0.03),_transparent_30%,_rgba(13,93,86,0.05))]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="motion-rise mx-auto mb-14 max-w-3xl text-center">
			<p class="mb-4 text-sm font-black tracking-[0.35em] text-secondary uppercase">
				Admissions Journey
			</p>
			<h2 class="text-4xl font-black text-primary lg:text-5xl">
				A clear path from interest to enrollment.
			</h2>
			<p class="mt-5 text-base leading-8 font-medium text-primary/65 lg:text-lg">
				Keep the process easy to understand: 11th and 12th classes are free, while BS programs are
				the ones affiliated with KFUEIT.
			</p>
		</div>

		<div class="relative">
			<div class="pointer-events-none absolute top-10 right-0 left-0 hidden xl:block">
				<svg width="100%" height="20" viewBox="0 0 1200 20" fill="none" class="overflow-visible">
					<path
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
					<div
						class="relative rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-7 shadow-[0_20px_60px_rgba(13,93,86,0.08)]"
					>
						<div class="mb-6 flex items-center justify-between">
							<div
								class="motion-float flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white"
							>
								<step.icon size={24} />
							</div>
							<span class="text-xs font-black tracking-[0.24em] text-secondary uppercase"
								>Step {index + 1}</span
							>
						</div>
						<h3 class="text-xl font-black text-primary">{step.title}</h3>
						<p class="mt-3 text-sm leading-7 font-medium text-primary/65">{step.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="motion-rise mt-10 flex flex-col gap-4 rounded-[2rem] border border-secondary/20 bg-secondary/10 p-6 text-primary lg:flex-row lg:items-center lg:justify-between"
		>
			<div>
				<p class="text-sm font-black tracking-[0.28em] text-secondary uppercase">Important Note</p>
				<p class="mt-2 text-lg font-black">
					11th and 12th classes are free. KFUEIT affiliation applies to BS classes only.
				</p>
			</div>
			<a
				href="/admissions/how-to-apply"
				class="inline-flex items-center gap-3 self-start rounded-full bg-primary px-6 py-3 font-black text-white transition-all hover:-translate-y-1 hover:bg-accent"
			>
				Read Admission Guide
				<ArrowRight size={18} />
			</a>
		</div>
	</div>
</section>
