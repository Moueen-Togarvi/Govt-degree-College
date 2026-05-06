<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Download, FileText } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'Syllabus', href: '/academics/syllabus' }
	];

	const categories = [
		{ name: "BISE Bahawalpur Intermediate Syllabus", items: ["FSc Pre-Medical (Part I & II)", "FSc Pre-Engineering (Part I & II)", "ICS Syllabus", "FA Subjects Syllabus"] },
		{ name: "KFUEIT BS Programs Curriculum", items: ["BS Computer Science Roadmap", "BS Mathematics Course Outline", "BS English Semester Wise", "BS Chemistry Syllabus"] }
	];
</script>

<svelte:head>
	<title>Syllabus & Curriculum | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Syllabus & Curriculum" 
	subtitle="Access the detailed roadmap for your academic journey."
	{breadcrumbs}
	image="/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto space-y-16">
			{#each categories as cat}
				<div class="space-y-8">
					<h2 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">{cat.name}</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#each cat.items as item}
							<div class="flex items-center justify-between p-6 bg-neutral-soft rounded-2xl border border-border-soft hover:shadow-md transition-all group">
								<div class="flex items-center gap-4">
									<div class="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
										<FileText size={20} />
									</div>
									<h3 class="font-bold text-primary text-sm">{item}</h3>
								</div>
								<button class="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-all" aria-label="Download {item}">
									<Download size={18} />
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
