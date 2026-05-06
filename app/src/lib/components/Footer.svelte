<script lang="ts">
	import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-svelte';
</script>

<footer class="bg-primary text-white pt-16 pb-8">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
			<!-- College Info -->
			<div class="space-y-6">
				<div class="flex items-center gap-3">
					<img src="/images/logos/degree4k.png" alt="GPGC Logo" class="h-16 w-auto bg-white rounded-lg p-1" />
					<div>
						<h2 class="text-xl font-bold leading-tight">GPGC</h2>
						<p class="text-xs font-medium tracking-widest text-secondary uppercase">Bahawalnagar</p>
					</div>
				</div>
				<p class="text-sm text-white/70 leading-relaxed italic">
					"Empowering minds, building futures. A legacy of academic excellence and character building in Bahawalnagar."
				</p>
				<div class="flex items-center gap-4">
					<a href="#" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300">
						<Facebook size={18} />
					</a>
					<a href="#" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300">
						<Twitter size={18} />
					</a>
					<a href="#" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300">
						<Instagram size={18} />
					</a>
					<a href="#" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300">
						<Youtube size={18} />
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-6">
				<h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Quick Links</h3>
				<ul class="space-y-3">
					{#each ['About Us', 'Admissions', 'Academics', 'Departments', 'Student Portal', 'Resources'] as link}
						<li>
							<a href="/{link.toLowerCase().replace(' ', '-')}" class="text-sm text-white/70 hover:text-secondary hover:translate-x-2 flex items-center gap-2 transition-all duration-300 group">
								<span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></span>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Affiliation -->
			<div class="space-y-6">
				<h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Affiliation</h3>
				<div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
					<p class="text-sm font-medium text-white/90">
						BS Programs are affiliated with:
					</p>
					<div class="flex flex-col gap-2">
						<p class="text-sm font-bold text-secondary">KFUEIT Rahim Yar Khan</p>
						<p class="text-xs text-white/60">Khawaja Fareed University of Engineering & Information Technology</p>
					</div>
					<a href="https://kfueit.edu.pk" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-secondary transition-colors">
						Visit University Website <ExternalLink size={12} />
					</a>
				</div>
			</div>

			<!-- Contact Info -->
			<div class="space-y-6">
				<h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Contact Us</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-4 text-white/70">
						<MapPin size={20} class="text-secondary flex-shrink-0" />
						<p class="text-sm">Govt Post Graduate College, Minchinabad Road, Bahawalnagar, Punjab, Pakistan</p>
					</div>
					<div class="flex items-center gap-4 text-white/70">
						<Phone size={20} class="text-secondary flex-shrink-0" />
						<p class="text-sm">+92 (63) 9240123</p>
					</div>
					<div class="flex items-center gap-4 text-white/70">
						<Mail size={20} class="text-secondary flex-shrink-0" />
						<p class="text-sm">info@gpgcbwn.edu.pk</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
			<p class="text-xs text-white/40">
				&copy; {new Date().getFullYear()} Govt Post Graduate College Bahawalnagar. All Rights Reserved.
			</p>
			<div class="flex gap-6 text-xs text-white/40">
				<a href="/privacy" class="hover:text-secondary">Privacy Policy</a>
				<a href="/terms" class="hover:text-secondary">Terms of Service</a>
				<a href="/sitemap" class="hover:text-secondary">Sitemap</a>
			</div>
			<p class="text-xs text-white/40">
				Designed & Developed with Excellence
			</p>
		</div>
	</div>
</footer>
