<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { GraduationCap, BookOpen, ScrollText } from 'lucide-svelte';
	
	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Academics', href: '/academics/programs' },
		{ label: 'Programs', href: '/academics/programs' }
	];

	const categories = [
		{ 
			title: "Intermediate Programs", 
			icon: BookOpen, 
			desc: "FSc Pre-Medical, Pre-Engineering, ICS, and FA programs for high school graduates.",
			href: "/academics/11th"
		},
		{ 
			title: "BS Programs (4-Year)", 
			icon: GraduationCap, 
			desc: "Comprehensive degree programs affiliated with KFUEIT in various disciplines.",
			href: "/academics/bs"
		},
		{ 
			title: "Syllabus & Curriculum", 
			icon: ScrollText, 
			desc: "Access the latest BISE and HEC approved syllabus for all our offered courses.",
			href: "/academics/syllabus"
		}
	];
</script>

<svelte:head>
	<title>Academic Programs | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero 
	title="Academic Programs" 
	subtitle="Diverse educational paths designed to help you achieve your career goals."
	{breadcrumbs}
	image="/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
/>

<section class="py-24 bg-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
			{#each categories as category}
				<a href={category.href} class="flex flex-col p-10 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group">
					<div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all mb-8 shadow-lg shadow-primary/10">
						<category.icon size={32} />
					</div>
					<h3 class="text-2xl font-black text-primary mb-4">{category.title}</h3>
					<p class="text-primary/70 leading-relaxed font-medium mb-8 flex-grow">
						{category.desc}
					</p>
					<span class="text-sm font-black text-secondary group-hover:translate-x-2 transition-transform">View Details →</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="py-24 bg-primary text-white overflow-hidden relative">
	<div class="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
	<div class="container mx-auto px-4 lg:px-8 text-center space-y-8 relative z-10">
		<h2 class="text-4xl lg:text-5xl font-black leading-tight">Empowering Students Through <br /> Academic Excellence</h2>
		<p class="text-white/70 max-w-2xl mx-auto text-lg font-medium">Join over 5,000 students who are building their future at Bahawalnagar's most prestigious institution.</p>
		<div class="flex justify-center gap-4">
			<a href="/admissions/how-to-apply" class="px-8 py-4 bg-secondary text-white rounded-xl font-black shadow-xl shadow-secondary/20 hover:scale-105 transition-all">Start Application</a>
		</div>
	</div>
</section>
