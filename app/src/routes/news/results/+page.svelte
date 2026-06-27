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

<section class="bg-white py-24">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mx-auto max-w-4xl space-y-12">
			<!-- Search Bar -->
			<form method="GET" class="group relative">
				<Search
					class="absolute top-1/2 left-6 -translate-y-1/2 text-primary/40 transition-colors group-focus-within:text-secondary"
					size={24}
				/>
				<input
					type="text"
					name="q"
					value={data.search}
					placeholder="Search for your program or result..."
					class="w-full rounded-2xl border border-border-soft bg-neutral-soft py-6 pr-32 pl-16 font-bold text-primary transition-all focus:border-secondary focus:ring-4 focus:ring-secondary/5 focus:outline-none"
				/>
				<button
					type="submit"
					class="absolute top-1/2 right-3 -translate-y-1/2 rounded-xl bg-primary px-5 py-3 text-sm font-black text-white transition-colors hover:bg-secondary"
				>
					Search
				</button>
			</form>

			<!-- Results List -->
			<div class="space-y-4">
				{#if data.results.length === 0}
					<div class="rounded-3xl border border-border-soft bg-neutral-soft p-10 text-center">
						<p class="text-lg font-bold text-primary">No results matched your search.</p>
					</div>
				{/if}

				{#each data.results as result}
					<div
						class="group flex items-center justify-between rounded-3xl border border-border-soft bg-neutral-soft p-8 transition-all hover:border-secondary hover:shadow-xl"
					>
						<div class="flex items-center gap-6">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-secondary group-hover:text-white"
							>
								<FileCheck size={28} />
							</div>
							<div class="space-y-1">
								<h3 class="text-xl leading-tight font-black text-primary">{result.title}</h3>
								<div class="flex items-center gap-3">
									<span class="text-xs font-black tracking-widest text-secondary uppercase"
										>{result.type}</span
									>
									<span class="text-xs font-bold text-primary/40 italic"
										>Published on {result.date}</span
									>
								</div>
							</div>
						</div>
						{#if result.fileUrl}
							<a
								href={result.fileUrl}
								class="flex items-center gap-2 rounded-xl border border-border-soft bg-white px-6 py-3 text-sm font-black text-primary shadow-sm transition-all hover:border-secondary hover:bg-secondary hover:text-white"
							>
								<Download size={18} />
								Download
							</a>
						{:else}
							<div
								class="flex items-center gap-2 rounded-xl border border-border-soft bg-white px-6 py-3 text-sm font-black text-primary/50 shadow-sm"
							>
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
