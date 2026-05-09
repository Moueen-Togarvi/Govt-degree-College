<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { GraduationCap, ExternalLink } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'BS Programs', href: '/academics/bs' }
	];

	const programs = [
		"BS Computer Science", "BS Mathematics", "BS English", "BS Physics", 
		"BS Chemistry", "BS Botany", "BS Zoology", "BS Economics", 
		"BS Islamiyat", "BS Urdu", "BS Psychology", "BS Statistics"
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

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-6xl mx-auto space-y-16">
			<div class="bg-primary p-12 rounded-3xl text-white relative overflow-hidden group">
				<div class="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
				<div class="relative z-10 space-y-6">
					<div class="inline-flex items-center gap-2 bg-secondary/20 px-4 py-1.5 rounded-full text-secondary text-sm font-black uppercase tracking-widest">
						Affiliation Alert
					</div>
					<h2 class="text-4xl font-black italic">Affiliated with KFUEIT Rahim Yar Khan</h2>
					<p class="text-white/70 max-w-3xl text-lg font-medium leading-relaxed">
						Our BS programs follow the academic calendar, examination system, and degree standards of Khawaja Fareed University of Engineering & Information Technology. This ensures global recognition and academic quality for our students.
					</p>
					<a href="https://kfueit.edu.pk" target="_blank" class="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-xl font-black hover:bg-secondary hover:text-white transition-all shadow-xl">
						Visit KFUEIT Portal <ExternalLink size={18} />
					</a>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each programs as program}
					<div class="p-8 bg-neutral-soft rounded-2xl border border-border-soft hover:border-secondary hover:shadow-lg transition-all group flex items-center justify-between">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
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
