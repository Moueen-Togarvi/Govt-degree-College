<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Download, FileText } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'Downloadable Forms', href: '/admissions/forms' }
	];

	const forms = [
		{ name: "BS Admission Form", size: "1.2 MB", format: "PDF" },
		{ name: "Intermediate Admission Form", size: "800 KB", format: "PDF" },
		{ name: "Scholarship Application Form", size: "500 KB", format: "PDF" },
		{ name: "Character Certificate Request", size: "300 KB", format: "DOCX" },
		{ name: "Hostel Allotment Form", size: "450 KB", format: "PDF" }
	];
</script>

<svelte:head>
	<title>Forms | Admissions | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Downloadable Forms" 
	subtitle="Access all necessary documents and application forms here."
	{breadcrumbs}
	image="/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each forms as form}
				<div class="flex items-center justify-between p-6 bg-neutral-soft rounded-2xl border border-border-soft hover:shadow-md transition-all group">
					<div class="flex items-center gap-4">
						<div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
							<FileText size={24} />
						</div>
						<div class="space-y-0.5">
							<h3 class="font-bold text-primary">{form.name}</h3>
							<p class="text-xs text-primary/50 font-bold uppercase tracking-wider">{form.size} • {form.format}</p>
						</div>
					</div>
					<button class="p-3 text-secondary hover:bg-secondary/10 rounded-xl transition-all" aria-label="Download {form.name}">
						<Download size={20} />
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>
