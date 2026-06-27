<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { GraduationCap, Award, Star } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Admissions', href: '/admissions/how-to-apply' },
		{ label: 'Scholarships', href: '/admissions/scholarships' }
	];

	const scholarships = [
		{
			name: 'PEEF Scholarship',
			provider: 'Punjab Education Endowment Fund',
			desc: 'For talented and deserving students of Punjab to pursue high-quality education.',
			icon: Award
		},
		{
			name: 'HEC Need Based',
			provider: 'Higher Education Commission',
			desc: 'Supporting financial needs of students enrolled in BS programs.',
			icon: Star
		},
		{
			name: 'Merit Scholarship',
			provider: 'Govt Post Graduate College',
			desc: 'Awarded to top performers in annual and semester examinations.',
			icon: GraduationCap
		}
	];
</script>

<svelte:head>
	<title>Scholarships | Admissions | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Scholarship Programs"
	subtitle="Financial support for talented and deserving students."
	{breadcrumbs}
	image="/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each scholarships as item}
				<div
					class="group space-y-6 rounded-3xl border border-border-soft bg-neutral-soft p-10 transition-all hover:border-secondary hover:shadow-xl"
				>
					<div
						class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white transition-transform group-hover:scale-110"
					>
						<item.icon size={32} />
					</div>
					<div class="space-y-2">
						<h3 class="text-2xl font-black text-primary">{item.name}</h3>
						<p class="text-xs font-bold tracking-widest text-secondary uppercase">
							{item.provider}
						</p>
					</div>
					<p class="leading-relaxed font-medium text-primary/70">
						{item.desc}
					</p>
					<a
						href="/admissions/how-to-apply"
						class="inline-block text-sm font-black text-primary underline underline-offset-8 hover:text-secondary"
						>Apply Procedure →</a
					>
				</div>
			{/each}
		</div>
	</div>
</section>
