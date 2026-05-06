<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		breadcrumbs: { label: string; href: string }[];
		image?: string;
	}
	let { title, subtitle, breadcrumbs, image }: Props = $props();
</script>

<!-- Page Hero Banner -->
<div class="relative bg-primary overflow-hidden py-32">
	{#if image}
		<div class="absolute inset-0">
			<img src={image} alt="" class="w-full h-full object-cover opacity-20" />
		</div>
	{/if}
	<!-- Decorative shapes -->
	<div class="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mt-48 pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 pointer-events-none"></div>

	<div class="container mx-auto px-4 lg:px-8 relative z-10">
		<!-- Breadcrumbs -->
		<nav aria-label="breadcrumb" class="mb-6">
			<ol class="flex flex-wrap items-center gap-2 text-sm text-white/60 font-medium">
				{#each breadcrumbs as crumb, i}
					<li class="flex items-center gap-2">
						{#if i < breadcrumbs.length - 1}
							<a href={crumb.href} class="hover:text-secondary transition-colors">{crumb.label}</a>
							<span class="text-white/30">/</span>
						{:else}
							<span class="text-secondary font-bold">{crumb.label}</span>
						{/if}
					</li>
				{/each}
			</ol>
		</nav>

		<h1 class="text-4xl lg:text-6xl font-black text-white leading-tight">{title}</h1>
		{#if subtitle}
			<p class="mt-4 text-lg text-white/70 max-w-2xl font-medium">{subtitle}</p>
		{/if}
	</div>
</div>
