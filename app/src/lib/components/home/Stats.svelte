<script lang="ts">
	import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-svelte';

	const stats = [
		{ label: "Total Courses", value: "100+", icon: BookOpen, anim: "anim-book" },
		{ label: "Active Students", value: "5000+", icon: GraduationCap, anim: "anim-float" },
		{ label: "Skilled Lecturers", value: "150+", icon: Users, anim: "anim-pulse" },
		{ label: "Awards Won", value: "45+", icon: Trophy, anim: "anim-wiggle" }
	];
</script>

<section class="relative py-24 bg-white overflow-hidden border-t border-b border-gray-100">
	<div class="container mx-auto px-4 lg:px-8 relative z-10">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
			{#each stats as stat}
				<div class="flex flex-col items-center text-center space-y-6 group">
					<!-- Icon Container with glass/shadow effect -->
					<div class="w-24 h-24 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center justify-center text-secondary transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(234,88,12,0.2)] group-hover:-translate-y-2">
						<!-- Realtime Animated Icon -->
						<div class="{stat.anim}">
							<stat.icon size={44} strokeWidth={1.5} />
						</div>
					</div>
					<div class="space-y-2">
						<p class="text-4xl lg:text-5xl font-black text-primary drop-shadow-sm">{stat.value}</p>
						<p class="text-sm font-bold text-secondary uppercase tracking-[0.2em]">{stat.label}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Attach the continuous animations */
	.anim-book { animation: book-flip 3s ease-in-out infinite; }
	.anim-float { animation: float 3.5s ease-in-out infinite; }
	.anim-pulse { animation: pulse-icon 2.5s ease-in-out infinite; }
	.anim-wiggle { animation: trophy-wiggle 3s ease-in-out infinite; }

	/* 3D Book Flip Effect */
	@keyframes book-flip {
		0%, 100% { transform: perspective(400px) rotateY(0deg); }
		50% { transform: perspective(400px) rotateY(-40deg) scale(1.1); }
	}

	/* Floating Cap Effect */
	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	/* Pulsing Users Effect */
	@keyframes pulse-icon {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.15); }
	}

	/* Wiggling Trophy Effect */
	@keyframes trophy-wiggle {
		0%, 100% { transform: rotate(0deg); }
		10% { transform: rotate(-15deg) scale(1.1); }
		20% { transform: rotate(15deg) scale(1.1); }
		30% { transform: rotate(-15deg) scale(1.1); }
		40% { transform: rotate(15deg) scale(1.1); }
		50%, 100% { transform: rotate(0deg) scale(1); }
	}
</style>
