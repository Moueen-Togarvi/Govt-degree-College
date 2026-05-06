<script lang="ts">
	import { Quote, ArrowRight } from 'lucide-svelte';
</script>

<section class="py-24 bg-white relative overflow-hidden">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="flex flex-col lg:flex-row items-center gap-16">
			<!-- Image Section -->
			<div class="w-full lg:w-1/2 relative">
				<div class="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
					<img 
						src="/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg" 
						alt="Principal of GPGC" 
						class="w-full h-auto object-cover"
					/>
				</div>
				<!-- Decorative elements -->
				<div class="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl z-0"></div>
				<div class="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl z-0"></div>
				<div class="absolute bottom-10 -left-6 bg-secondary text-white px-8 py-4 rounded-2xl shadow-xl z-20">
					<p class="text-xl font-black italic">"Education is the key"</p>
				</div>
			</div>

			<!-- Text Section -->
			<div class="w-full lg:w-1/2 space-y-8">
				<div class="space-y-4">
					<p class="text-secondary font-black uppercase tracking-widest text-sm">Principal's Message</p>
					<h2 class="text-4xl lg:text-5xl font-black text-primary leading-tight">
						Our Education System <span class="text-secondary">Inspires</span> You More.
					</h2>
				</div>

				<div class="relative">
					<Quote size={48} class="absolute -top-6 -left-6 text-primary/5 -z-0" />
					<p class="text-lg text-primary/70 leading-relaxed relative z-10">
						It is a great honor to welcome you to Govt Post Graduate College Bahawalnagar. Our institution has been a beacon of light for decades, nurturing talent and fostering intellectual growth in South Punjab. We are committed to providing a holistic learning environment where students excel not only in academics but also in character and leadership.
					</p>
				</div>

				<p class="text-lg text-primary/70 leading-relaxed">
					As we embrace modern educational standards through our affiliation with KFUEIT, we ensure that our students are prepared for the challenges of the 21st century. I invite you to explore our programs and become part of our prestigious legacy.
				</p>

				<div class="pt-4">
					<h4 class="text-2xl font-black text-primary">Prof. Dr. Muhammad Ahmed</h4>
					<p class="text-secondary font-bold">Principal, GPGC Bahawalnagar</p>
				</div>

				<a href="/about/administration" class="inline-flex items-center gap-3 text-primary font-black hover:text-secondary transition-all group">
					Read Full Biography
					<div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
						<ArrowRight size={18} />
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
