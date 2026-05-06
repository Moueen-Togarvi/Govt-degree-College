<script lang="ts">
	import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-svelte';

	const stats = [
		{ label: "Total Courses", value: "100+", icon: BookOpen },
		{ label: "Active Students", value: "5000+", icon: GraduationCap },
		{ label: "Skilled Lecturers", value: "150+", icon: Users },
		{ label: "Awards Won", value: "45+", icon: Trophy }
	];
</script>

<section class="relative py-24 overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg" 
			alt="Students in campus" 
			class="w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-primary/90 backdrop-blur-sm"></div>
	</div>

	<div class="container mx-auto px-4 lg:px-8 relative z-10">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
			{#each stats as stat}
				<div class="flex flex-col items-center text-center space-y-4 group">
					<div class="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
						<stat.icon size={36} strokeWidth={2.5} />
					</div>
					<div class="space-y-1">
						<p class="text-4xl lg:text-5xl font-black text-white">{stat.value}</p>
						<p class="text-sm font-bold text-secondary uppercase tracking-[0.2em]">{stat.label}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
