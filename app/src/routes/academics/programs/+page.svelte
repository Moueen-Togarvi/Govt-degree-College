<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { GraduationCap, BookOpen, ScrollText } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'Programs', href: '/academics/programs' }
	];

	const categories = [
		{
			title: 'Intermediate Programs',
			icon: BookOpen,
			desc: 'FSc Pre-Medical, Pre-Engineering, ICS, and FA programs for high school graduates.',
			href: '/academics/11th'
		},
		{
			title: 'BS Programs (4-Year)',
			icon: GraduationCap,
			desc: 'Comprehensive degree programs affiliated with KFUEIT in various disciplines.',
			href: '/academics/bs'
		},
		{
			title: 'Syllabus & Curriculum',
			icon: ScrollText,
			desc: 'Access the latest BISE and HEC approved syllabus for all our offered courses.',
			href: '/academics/syllabus'
		}
	];
</script>

<svelte:head>
	<title>Academic Programs | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Academic Programs"
	subtitle="Diverse educational paths designed to help you achieve your career goals."
	{breadcrumbs}
	image="/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			{#each categories as category}
				<a
					href={category.href}
					class="group flex flex-col rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary hover:shadow-xl"
				>
					<div
						class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/10 transition-all group-hover:scale-110 group-hover:bg-secondary"
					>
						<category.icon size={32} />
					</div>
					<h3 class="mb-4 text-2xl font-black text-primary">{category.title}</h3>
					<p class="mb-8 flex-grow leading-relaxed font-medium text-primary/70">
						{category.desc}
					</p>
					<span
						class="text-sm font-black text-secondary transition-transform group-hover:translate-x-2"
						>View Details →</span
					>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-primary py-24 text-white">
	<div
		class="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
	></div>
	<div class="relative z-10 container mx-auto space-y-8 px-4 text-center lg:px-8">
		<h2 class="text-4xl leading-tight font-black lg:text-5xl">
			Empowering Students Through <br /> Academic Excellence
		</h2>
		<p class="mx-auto max-w-2xl text-lg font-medium text-white/70">
			Join over 5,000 students who are building their future at Bahawalnagar's most prestigious
			institution.
		</p>
		<div class="flex justify-center gap-4">
			<a
				href="/admissions/how-to-apply"
				class="rounded-xl bg-secondary px-8 py-4 font-black text-white shadow-xl shadow-secondary/20 transition-all hover:scale-105"
				>Start Application</a
			>
		</div>
	</div>
</section>
