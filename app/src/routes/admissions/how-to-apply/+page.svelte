<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle2, FileText, Send, UserCheck } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'How to Apply', href: '/admissions/how-to-apply' }
	];

	const steps = [
		{
			title: 'Visit College Admin Office',
			desc: 'Visit the college admission office first and get the prospectus with complete admission guidance.',
			icon: UserCheck
		},
		{
			title: 'Fill Information',
			desc: 'Complete the admission form with your personal and academic details according to your previous result.',
			icon: FileText
		},
		{
			title: 'Submit Documents',
			desc: 'Attach required documents including result card, photographs, and CNIC or B-Form copy.',
			icon: Send
		},
		{
			title: 'Verification & Confirmation',
			desc: 'Submit the form for verification and follow the office instructions for final admission confirmation.',
			icon: CheckCircle2
		}
	];
</script>

<svelte:head>
	<title>How to Apply | Admissions | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="How to Apply"
	subtitle="Follow these simple steps to start your journey with us."
	{breadcrumbs}
	image="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl">
			<div class="grid grid-cols-1 gap-12">
				{#each steps as step, i}
					<div
						class="group flex flex-col items-center gap-8 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary md:flex-row"
					>
						<div
							class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-secondary"
						>
							<step.icon size={36} />
							<div
								class="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-black text-white"
							>
								{i + 1}
							</div>
						</div>
						<div class="space-y-3 text-center md:text-left">
							<h3 class="text-2xl font-black text-primary">{step.title}</h3>
							<p class="text-lg leading-relaxed text-primary/70">{step.desc}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-20 space-y-6 rounded-3xl bg-primary p-10 text-center text-white">
				<h3 class="text-2xl font-black italic">
					"Start with the college admission office for proper guidance."
				</h3>
				<p class="mx-auto max-w-2xl text-white/70">
					Students can collect the prospectus, confirm eligibility, and receive admission
					instructions directly from the college administration office.
				</p>
			</div>
		</div>
	</div>
</section>
