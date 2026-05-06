<script lang="ts">
	import { ArrowRight, GraduationCap, Users } from 'lucide-svelte';
</script>

<section class="relative min-h-[85vh] flex items-center overflow-hidden">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg" 
			alt="College Campus" 
			class="w-full h-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent"></div>
	</div>

	<div class="container mx-auto px-4 lg:px-8 relative z-10">
		<div class="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
			<div class="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 px-4 py-1.5 rounded-full text-secondary text-sm font-bold tracking-wide uppercase">
				<GraduationCap size={16} />
				<span>Welcome to GPGC Bahawalnagar</span>
			</div>
			
			<h1 class="text-5xl lg:text-7xl font-black text-white leading-[1.1]">
				Start Your Beautiful <br />
				And <span class="text-secondary">Bright</span> Future
			</h1>
			
			<p class="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl font-medium">
				Empowering students with quality education, modern facilities, and a legacy of academic excellence since founding. Join the premier institution of Bahawalnagar.
			</p>

			<div class="flex flex-wrap gap-4 pt-4">
				<a href="/admissions" class="flex items-center gap-3 px-8 py-4 bg-secondary text-white rounded-xl font-bold text-lg hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl shadow-secondary/20 active:scale-95 group">
					Apply Now
					<ArrowRight size={20} class="transition-transform group-hover:translate-x-1" />
				</a>
				<a href="/about" class="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
					Explore More
				</a>
			</div>

			<!-- Quick Stats -->
			<div class="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
				<div class="space-y-1">
					<p class="text-3xl font-black text-secondary">5000+</p>
					<p class="text-sm font-bold text-white/60 uppercase tracking-widest">Students</p>
				</div>
				<div class="space-y-1">
					<p class="text-3xl font-black text-secondary">150+</p>
					<p class="text-sm font-bold text-white/60 uppercase tracking-widest">Expert Faculty</p>
				</div>
				<div class="space-y-1">
					<p class="text-3xl font-black text-secondary">25+</p>
					<p class="text-sm font-bold text-white/60 uppercase tracking-widest">BS Programs</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Floating Element (Decorative) -->
	<div class="hidden xl:block absolute right-20 top-1/2 -translate-y-1/2 w-96 h-96 animate-float opacity-20">
		<img src="/images/logos/degree4k.png" alt="" class="w-full h-full object-contain brightness-0 invert" />
	</div>
</section>
