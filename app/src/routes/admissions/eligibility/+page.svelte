<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { CheckCircle } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'Eligibility', href: '/admissions/eligibility' }
	];

	const criteria = [
		{ 
			program: "Intermediate (FSc/FA)", 
			marks: "Minimum 60% in Matriculation", 
			age: "Maximum 18 years",
			reqs: ["Matric Certificate", "B-Form / CNIC", "Domicile"]
		},
		{ 
			program: "BS Programs (4-Year)", 
			marks: "Minimum 50% in Intermediate", 
			age: "Maximum 22 years",
			reqs: ["Intermediate Certificate", "CNIC", "Character Certificate"]
		}
	];
</script>

<svelte:head>
	<title>Eligibility | Admissions | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Admission Eligibility" 
	subtitle="Check the minimum requirements for your desired program."
	{breadcrumbs}
	image="/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
			{#each criteria as item}
				<div class="bg-neutral-soft p-12 rounded-3xl border border-border-soft hover:shadow-xl transition-all space-y-8 relative overflow-hidden group">
					<div class="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
					
					<div class="space-y-2">
						<h3 class="text-3xl font-black text-primary">{item.program}</h3>
						<div class="w-16 h-1.5 bg-secondary rounded-full"></div>
					</div>

					<div class="space-y-6">
						<div class="space-y-2">
							<p class="text-xs font-black uppercase tracking-widest text-secondary">Academic Marks</p>
							<p class="text-xl font-bold text-primary">{item.marks}</p>
						</div>
						<div class="space-y-2">
							<p class="text-xs font-black uppercase tracking-widest text-secondary">Age Limit</p>
							<p class="text-xl font-bold text-primary">{item.age}</p>
						</div>
						<div class="space-y-4">
							<p class="text-xs font-black uppercase tracking-widest text-secondary">Documents Required</p>
							<div class="flex flex-wrap gap-2">
								{#each item.reqs as req}
									<span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold">
										<CheckCircle size={14} class="text-secondary" />
										{req}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
