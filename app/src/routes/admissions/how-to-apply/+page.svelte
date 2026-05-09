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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<div class="grid grid-cols-1 gap-12">
				{#each steps as step, i}
					<div class="flex flex-col md:flex-row gap-8 items-center bg-neutral-soft p-10 rounded-3xl border border-border-soft group hover:border-secondary transition-all">
						<div class="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors relative">
							<step.icon size={36} />
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-black text-sm">
								{i + 1}
							</div>
						</div>
						<div class="space-y-3 text-center md:text-left">
							<h3 class="text-2xl font-black text-primary">{step.title}</h3>
							<p class="text-lg text-primary/70 leading-relaxed">{step.desc}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-20 p-10 bg-primary rounded-3xl text-white text-center space-y-6">
				<h3 class="text-2xl font-black italic">"Start with the college admission office for proper guidance."</h3>
				<p class="text-white/70 max-w-2xl mx-auto">Students can collect the prospectus, confirm eligibility, and receive admission instructions directly from the college administration office.</p>
			</div>
		</div>
	</div>
</section>
