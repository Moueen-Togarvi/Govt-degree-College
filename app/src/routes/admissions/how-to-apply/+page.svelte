<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle2, FileText, Send, UserCheck } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'How to Apply', href: '/admissions/how-to-apply' }
	];

	const steps = [
		{ title: 'Online Registration', desc: 'Visit the OCAS portal or our website and register with your email.', icon: UserCheck },
		{ title: 'Fill Information', desc: 'Enter your personal and academic details as per your matric results.', icon: FileText },
		{ title: 'Submit Documents', desc: 'Upload scanned copies of your matric certificate and CNIC/B-Form.', icon: Send },
		{ title: 'Verify & Confirm', desc: 'Review your application and submit. Print the fee challan for payment.', icon: CheckCircle2 }
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
				<h3 class="text-2xl font-black italic">"Ready to Join the Premier College of Bahawalnagar?"</h3>
				<p class="text-white/70 max-w-2xl mx-auto">Click the button below to visit the official OCAS portal and begin your application process today.</p>
				<a href="https://ocas.punjab.gov.pk" target="_blank" class="inline-block bg-secondary text-white px-10 py-4 rounded-xl font-black hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl shadow-secondary/20">
					Visit OCAS Portal
				</a>
			</div>
		</div>
	</div>
</section>
