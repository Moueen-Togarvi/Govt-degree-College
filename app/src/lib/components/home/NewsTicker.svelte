<script lang="ts">
	import { BellRing } from 'lucide-svelte';
	import { fallbackTickerAnnouncements } from '$lib/content/fallback';
	import type { LatestNewsItem } from '$lib/types/content';

	let { announcements = fallbackTickerAnnouncements }: { announcements?: LatestNewsItem[] } =
		$props();
</script>

<div
	class="flex items-center overflow-hidden border-y border-secondary/20 bg-secondary/10 py-1.5 sm:py-2"
>
	<div class="container mx-auto flex min-w-0 items-center px-3 lg:px-8">
		<div
			class="z-10 flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-black tracking-tight whitespace-nowrap text-white uppercase shadow-sm sm:gap-2 sm:px-4 sm:text-xs"
		>
			<BellRing size={14} />
			<span>Latest News</span>
		</div>

		<div class="relative ml-2 min-w-0 flex-1 overflow-hidden sm:ml-4">
			<div class="animate-marquee flex gap-7 whitespace-nowrap sm:gap-12">
				{#each announcements as news}
					<a
						href={news.href}
						class="flex shrink-0 items-center gap-2 text-xs font-bold text-primary transition-colors hover:text-secondary sm:text-sm"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span>
						{news.title}
					</a>
				{/each}
				<!-- Duplicate for seamless scroll -->
				{#each announcements as news}
					<a
						href={news.href}
						class="flex shrink-0 items-center gap-2 text-xs font-bold text-primary transition-colors hover:text-secondary sm:text-sm"
					>
						<span class="h-1.5 w-1.5 rounded-full bg-secondary"></span>
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
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
