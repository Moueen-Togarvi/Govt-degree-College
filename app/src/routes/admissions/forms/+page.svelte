<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Download, FileText } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'Downloadable Forms', href: '/admissions/forms' }
	];

	const forms = [
		{ name: 'BS Admission Form', size: '1.2 MB', format: 'PDF' },
		{ name: 'Intermediate Admission Form', size: '800 KB', format: 'PDF' },
		{ name: 'Scholarship Application Form', size: '500 KB', format: 'PDF' },
		{ name: 'Character Certificate Request', size: '300 KB', format: 'DOCX' }
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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
			{#each forms as form}
				<div
					class="group flex items-center justify-between rounded-2xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-md"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-secondary group-hover:text-white"
						>
							<FileText size={24} />
						</div>
						<div class="space-y-0.5">
							<h3 class="font-bold text-primary">{form.name}</h3>
							<p class="text-xs font-bold tracking-wider text-primary/50 uppercase">
								{form.size} • {form.format}
							</p>
						</div>
					</div>
					<button
						class="rounded-xl p-3 text-secondary transition-all hover:bg-secondary/10"
						aria-label="Download {form.name}"
					>
						<Download size={20} />
					</button>
				</div>
			{/each}
		</div>
	</div>
</section>
