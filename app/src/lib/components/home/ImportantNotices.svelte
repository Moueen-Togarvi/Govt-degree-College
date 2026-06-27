<script lang="ts">
	import type { NoticeBoardItem } from '$lib/types/content';
	import { fallbackNoticeBoardItems } from '$lib/content/fallback';
	import { BellRing, CalendarDays, ScrollText } from 'lucide-svelte';

	let { notices = [] as NoticeBoardItem[] }: { notices?: NoticeBoardItem[] } = $props();

	const boardNotices = $derived(
		(notices.length > 0 ? notices : fallbackNoticeBoardItems).slice(0, 3)
	);
</script>

<section class="relative overflow-hidden bg-neutral-soft py-24">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,148,29,0.08),_transparent_36%)]"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div
			class="motion-rise relative mx-auto max-w-6xl rounded-[2.5rem] border border-secondary/25 bg-secondary/20 p-4 shadow-[0_30px_90px_rgba(13,93,86,0.12)] lg:p-6"
		>
			<div
				class="rounded-[2rem] border border-primary/12 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(247,148,29,0.14))] p-6 lg:p-10"
			>
				<div
					class="mb-8 rounded-[1.75rem] border border-primary/10 bg-primary px-5 py-5 text-white shadow-[0_18px_50px_rgba(13,93,86,0.20)]"
				>
					<div
						class="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
					>
						<div class="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white"
								>
									<BellRing size={22} />
								</div>
								<div
									class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white"
								>
									<ScrollText size={22} />
								</div>
							</div>
							<div>
								<p class="text-xs font-black tracking-[0.32em] text-secondary uppercase">
									Announcements
								</p>
								<h2 class="mt-1 text-2xl font-black lg:text-3xl">College Notice Board</h2>
							</div>
						</div>

						<div
							class="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black tracking-[0.22em] text-white/85 uppercase"
						>
							Pinned Updates
						</div>
					</div>

					<p
						class="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 font-medium text-white/78 lg:text-base"
					>
						Admissions, class schedule updates, and important instructions are displayed here for
						students.
					</p>
				</div>

				<div class="grid gap-6 lg:grid-cols-3">
					{#each boardNotices as notice, index}
						<div
							class={`motion-rise relative min-h-[280px] rounded-[1.75rem] border border-primary/10 bg-white p-6 shadow-[0_18px_45px_rgba(13,93,86,0.10)] transition-transform duration-300 hover:-translate-y-1 ${
								index === 1
									? 'lg:rotate-[-1.5deg]'
									: index === 2
										? 'lg:rotate-[1.5deg]'
										: 'lg:-rotate-[1deg]'
							}`}
							style={`animation-delay: ${index * 140}ms`}
						>
							<div
								class="absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-secondary shadow-lg shadow-secondary/30"
							></div>

							<div class="flex h-full flex-col">
								<div class="mb-5 flex items-start justify-between gap-4">
									<span
										class="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-[11px] font-black tracking-[0.24em] text-secondary uppercase"
									>
										{notice.tag}
									</span>
									<div class="flex items-center gap-2 text-primary/55">
										<CalendarDays size={16} />
										<span class="text-xs font-bold">{notice.date}</span>
									</div>
								</div>

								<h4 class="text-2xl leading-tight font-black text-primary">{notice.title}</h4>
								<p class="mt-4 flex-1 text-sm leading-7 font-medium text-primary/68">
									{notice.message}
								</p>

								<div class="mt-5 border-t border-dashed border-primary/10 pt-4">
									<p class="text-xs font-black tracking-[0.24em] text-primary/45 uppercase">
										College Notice Board
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
