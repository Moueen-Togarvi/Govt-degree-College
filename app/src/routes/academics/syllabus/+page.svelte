<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Download, FileText } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'Syllabus', href: '/academics/syllabus' }
	];

	const categories = [
		{
			name: 'BISE Bahawalpur Intermediate Syllabus',
			items: [
				'FSc Pre-Medical (Part I & II)',
				'FSc Pre-Engineering (Part I & II)',
				'ICS Syllabus',
				'FA Subjects Syllabus'
			]
		},
		{
			name: 'KFUEIT BS Programs Curriculum',
			items: [
				'BS Computer Science Roadmap',
				'BS Mathematics Course Outline',
				'BS English Semester Wise',
				'BS Chemistry Syllabus'
			]
		}
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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl space-y-16">
			{#each categories as cat}
				<div class="space-y-8">
					<h2 class="border-l-8 border-secondary pl-6 text-3xl font-black text-primary">
						{cat.name}
					</h2>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						{#each cat.items as item}
							<div
								class="group flex items-center justify-between rounded-2xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-md"
							>
								<div class="flex items-center gap-4">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-secondary group-hover:text-white"
									>
										<FileText size={20} />
									</div>
									<h3 class="text-sm font-bold text-primary">{item}</h3>
								</div>
								<button
									class="rounded-lg p-2 text-secondary transition-all hover:bg-secondary/10"
									aria-label="Download {item}"
								>
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
