<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { Search, Download, FileCheck } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'News', href: '/news/announcements' },
		{ label: 'Exam Results', href: '/news/results' }
	];

	let { data } = $props();
</script>

<svelte:head>
	<title>Exam Results | News | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Examination Results" 
	subtitle="Access and download the latest semester and annual results."
	{breadcrumbs}
	image="/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="max-w-4xl mx-auto space-y-12">
			<!-- Search Bar -->
			<form method="GET" class="relative group">
				<Search class="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary transition-colors" size={24} />
				<input 
					type="text" 
					name="q"
					value={data.search}
					placeholder="Search for your program or result..." 
					class="w-full pl-16 pr-32 py-6 bg-neutral-soft rounded-2xl border border-border-soft focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/5 font-bold text-primary transition-all"
				/>
				<button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-black hover:bg-secondary transition-colors">
					Search
				</button>
			</form>

			<!-- Results List -->
			<div class="space-y-4">
				{#if data.results.length === 0}
					<div class="p-10 rounded-3xl border border-border-soft bg-neutral-soft text-center">
						<p class="text-lg font-bold text-primary">No results matched your search.</p>
					</div>
				{/if}

				{#each data.results as result}
					<div class="flex items-center justify-between p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group">
						<div class="flex items-center gap-6">
							<div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
								<FileCheck size={28} />
							</div>
							<div class="space-y-1">
								<h3 class="text-xl font-black text-primary leading-tight">{result.title}</h3>
								<div class="flex items-center gap-3">
									<span class="text-xs font-black uppercase tracking-widest text-secondary">{result.type}</span>
									<span class="text-xs font-bold text-primary/40 italic">Published on {result.date}</span>
								</div>
							</div>
						</div>
						{#if result.fileUrl}
							<a href={result.fileUrl} class="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-black text-sm border border-border-soft hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">
								<Download size={18} />
								Download
							</a>
						{:else}
							<div class="flex items-center gap-2 px-6 py-3 bg-white text-primary/50 rounded-xl font-black text-sm border border-border-soft shadow-sm">
								<Download size={18} />
								Details Soon
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
