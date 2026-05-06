<script lang="ts">
	import { BellRing } from 'lucide-svelte';
	import { fallbackTickerAnnouncements } from '$lib/content/fallback';
	import type { TickerAnnouncement } from '$lib/types/content';

	let { announcements = fallbackTickerAnnouncements }: { announcements?: TickerAnnouncement[] } = $props();
</script>

<div class="bg-secondary/10 border-y border-secondary/20 py-2 overflow-hidden flex items-center">
	<div class="container mx-auto px-4 lg:px-8 flex items-center">
		<div class="flex items-center gap-2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter whitespace-nowrap z-10 shadow-sm">
			<BellRing size={14} />
			<span>Latest News</span>
		</div>
		
		<div class="flex-1 overflow-hidden ml-4 relative">
			<div class="flex animate-marquee whitespace-nowrap gap-12">
				{#each announcements as news}
					<a href={news.href} class="text-sm font-bold text-primary flex items-center gap-2 hover:text-secondary transition-colors">
						<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
						{news.title}
					</a>
				{/each}
				<!-- Duplicate for seamless scroll -->
				{#each announcements as news}
					<a href={news.href} class="text-sm font-bold text-primary flex items-center gap-2 hover:text-secondary transition-colors">
						<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
						{news.title}
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.animate-marquee {
		display: inline-flex;
		animation: marquee 30s linear infinite;
	}

	@keyframes marquee {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
