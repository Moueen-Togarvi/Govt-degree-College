<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		breadcrumbs: { label: string; href: string }[];
		image?: string;
	}
	let { title, subtitle, breadcrumbs, image = '' }: Props = $props();
	const sharedBackgroundImage = '/images/logos/hero%20section%20bg.png';
</script>

<!-- Page Hero Banner -->
<div class="relative min-h-[36vh] overflow-hidden bg-primary py-16 lg:min-h-[42vh] lg:py-20">
	<div class="absolute inset-0">
		<img
			src={sharedBackgroundImage}
			alt=""
			class="h-full w-full object-cover object-center opacity-75"
			data-uses-shared-image={image ? 'true' : 'default'}
		/>
		<div class="absolute inset-0 bg-primary/62"></div>
	</div>
	<!-- Decorative shapes -->
	<div class="pointer-events-none absolute -right-36 -top-36 h-72 w-72 rounded-full bg-secondary/10"></div>
	<div class="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5"></div>

	<div class="container relative z-10 mx-auto px-4 lg:px-8">
		<!-- Breadcrumbs -->
		<nav aria-label="breadcrumb" class="mb-5">
			<ol class="flex flex-wrap items-center gap-2 text-xs font-bold text-white/65 lg:text-sm">
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

		<h1 class="max-w-4xl text-3xl font-black leading-tight text-white lg:text-5xl">{title}</h1>
		{#if subtitle}
			<p class="mt-3 max-w-2xl text-base font-medium leading-7 text-white/78 lg:text-lg">
				{subtitle}
			</p>
		{/if}
	</div>
</div>
