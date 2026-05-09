<script lang="ts">
	import { GraduationCap, Users, Library, Banknote, ArrowUpRight } from 'lucide-svelte';
	import { fallbackQuickLinks } from '$lib/content/fallback';
	import type { QuickLink } from '$lib/types/content';

	let { links = fallbackQuickLinks }: { links?: QuickLink[] } = $props();

	const iconMap = {
		'graduation-cap': GraduationCap,
		users: Users,
		library: Library,
		banknote: Banknote
	} as const;

	const colorMap = {
		'graduation-cap': 'text-blue-600',
		users: 'text-teal-600',
		library: 'text-orange-600',
		banknote: 'text-purple-600'
	} as const;

	const backgroundMap = {
		'graduation-cap': 'bg-blue-50',
		users: 'bg-teal-50',
		library: 'bg-orange-50',
		banknote: 'bg-purple-50'
	} as const;

	function getIcon(iconName: string) {
		return iconMap[iconName as keyof typeof iconMap] ?? GraduationCap;
	}

	function getColor(iconName: string) {
		return colorMap[iconName as keyof typeof colorMap] ?? 'text-blue-600';
	}

	function getBackground(iconName: string) {
		return backgroundMap[iconName as keyof typeof backgroundMap] ?? 'bg-blue-50';
	}
</script>

<section class="py-24 bg-neutral-soft">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each links as link}
				{@const Icon = getIcon(link.iconName)}
				<div class="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border-soft relative overflow-hidden">
					<!-- Hover Accent -->
					<div class="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
					
					<div class="space-y-6 relative z-10">
						<div class="w-16 h-16 {getBackground(link.iconName)} {getColor(link.iconName)} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
							<Icon size={32} />
						</div>
						
						<div class="space-y-3">
							<h3 class="text-xl font-black text-primary">{link.title}</h3>
							<p class="text-sm font-medium text-primary/60 leading-relaxed">
								{link.description}
							</p>
						</div>

						<a href={link.href} class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">
							Learn More
							<ArrowUpRight size={14} />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
