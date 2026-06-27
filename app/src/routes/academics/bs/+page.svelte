<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { GraduationCap, ExternalLink } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'BS Programs', href: '/academics/bs' }
	];

	const programs = [
		'BS Computer Science',
		'BS Mathematics',
		'BS English',
		'BS Physics',
		'BS Chemistry',
		'BS Botany',
		'BS Zoology',
		'BS Economics',
		'BS Islamiyat',
		'BS Urdu',
		'BS Psychology',
		'BS Statistics'
	];
</script>

<svelte:head>
	<title>BS Programs (4-Year) | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="BS Programs (4-Year)"
	subtitle="Affiliated with KFUEIT Rahim Yar Khan. Excellence in higher education."
	{breadcrumbs}
	image="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
/>

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-6xl space-y-16">
			<div class="group relative overflow-hidden rounded-3xl bg-primary p-12 text-white">
				<div
					class="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
				></div>
				<div class="relative z-10 space-y-6">
					<div
						class="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-black tracking-widest text-secondary uppercase"
					>
						Affiliation Alert
					</div>
					<h2 class="text-4xl font-black italic">Affiliated with KFUEIT Rahim Yar Khan</h2>
					<p class="max-w-3xl text-lg leading-relaxed font-medium text-white/70">
						Our BS programs follow the academic calendar, examination system, and degree standards
						of Khawaja Fareed University of Engineering & Information Technology. This ensures
						global recognition and academic quality for our students.
					</p>
					<a
						href="https://kfueit.edu.pk"
						target="_blank"
						class="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-black text-primary shadow-xl transition-all hover:bg-secondary hover:text-white"
					>
						Visit KFUEIT Portal <ExternalLink size={18} />
					</a>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each programs as program}
					<div
						class="group flex items-center justify-between rounded-2xl border border-border-soft bg-neutral-soft p-8 transition-all hover:border-secondary hover:shadow-lg"
					>
						<div class="flex items-center gap-4">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-secondary group-hover:text-white"
							>
								<GraduationCap size={24} />
							</div>
							<h3 class="text-lg font-black text-primary">{program}</h3>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
