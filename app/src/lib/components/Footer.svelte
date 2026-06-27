<script lang="ts">
	import { Mail, Phone, MapPin, ExternalLink } from 'lucide-svelte';
</script>

<footer class="bg-primary pt-16 pb-8 text-white">
	<div class="container mx-auto px-4 lg:px-8">
		<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- College Info -->
			<div class="space-y-6">
				<div class="flex items-center gap-3">
					<img
						src="/images/logos/degree4k-removebg-preview.png"
						alt="GPGC Logo"
						class="h-16 w-auto"
						loading="lazy"
						decoding="async"
					/>
					<div>
						<h2 class="text-xl leading-tight font-bold">GPGC</h2>
						<p class="text-xs font-medium tracking-widest text-secondary uppercase">Bahawalnagar</p>
					</div>
				</div>
				<p class="text-sm leading-relaxed text-white/70 italic">
					"Empowering minds, building futures. A legacy of academic excellence and character
					building in Bahawalnagar."
				</p>
				<div class="flex items-center gap-4">
					<a
						href="/"
						aria-label="Facebook"
						class="rounded-lg bg-white/5 p-2 transition-all duration-300 hover:bg-secondary hover:text-primary"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
							><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
						>
					</a>
					<a
						href="/"
						aria-label="Twitter"
						class="rounded-lg bg-white/5 p-2 transition-all duration-300 hover:bg-secondary hover:text-primary"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
							/></svg
						>
					</a>
					<a
						href="/"
						aria-label="Instagram"
						class="rounded-lg bg-white/5 p-2 transition-all duration-300 hover:bg-secondary hover:text-primary"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path
								d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
							/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg
						>
					</a>
					<a
						href="/"
						aria-label="YouTube"
						class="rounded-lg bg-white/5 p-2 transition-all duration-300 hover:bg-secondary hover:text-primary"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
							><path
								d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
							/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" /></svg
						>
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-6">
				<h3 class="border-l-4 border-secondary pl-4 text-lg font-bold">Quick Links</h3>
				<ul class="space-y-3">
					{#each ['About Us', 'Admissions', 'Academics', 'Departments', 'Student Portal', 'Resources'] as link}
						<li>
							<a
								href="/{link.toLowerCase().replace(' ', '-')}"
								class="group flex items-center gap-2 text-sm text-white/70 transition-all duration-300 hover:translate-x-2 hover:text-secondary"
							>
								<span
									class="h-1.5 w-1.5 rounded-full bg-secondary opacity-0 transition-opacity group-hover:opacity-100"
								></span>
								{link}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Affiliation -->
			<div class="space-y-6">
				<h3 class="border-l-4 border-secondary pl-4 text-lg font-bold">Affiliation</h3>
				<div class="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
					<p class="text-sm font-medium text-white/90">BS Programs are affiliated with:</p>
					<div class="flex flex-col gap-2">
						<p class="text-sm font-bold text-secondary">KFUEIT Rahim Yar Khan</p>
						<p class="text-xs text-white/60">
							Khawaja Fareed University of Engineering & Information Technology
						</p>
					</div>
					<a
						href="https://kfueit.edu.pk"
						target="_blank"
						class="inline-flex items-center gap-2 text-xs font-bold text-white transition-colors hover:text-secondary"
					>
						Visit University Website <ExternalLink size={12} />
					</a>
				</div>
			</div>

			<!-- Contact Info -->
			<div class="space-y-6">
				<h3 class="border-l-4 border-secondary pl-4 text-lg font-bold">Contact Us</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-4 text-white/70">
						<MapPin size={20} class="flex-shrink-0 text-secondary" />
						<p class="text-sm">
							Govt Post Graduate College, College Road, Bahawalnagar, Punjab, Pakistan
						</p>
					</div>
					<div class="flex items-center gap-4 text-white/70">
						<Phone size={20} class="flex-shrink-0 text-secondary" />
						<p class="text-sm">+92 (63) 9240123</p>
					</div>
					<div class="flex items-center gap-4 text-white/70">
						<Mail size={20} class="flex-shrink-0 text-secondary" />
						<p class="text-sm">info@gpgcbwn.edu.pk</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row"
		>
			<p class="text-xs text-white/40">
				&copy; {new Date().getFullYear()} Govt Post Graduate College Bahawalnagar. All Rights Reserved.
			</p>
			<div class="flex gap-6 text-xs text-white/40">
				<a href="/privacy" class="hover:text-secondary">Privacy Policy</a>
				<a href="/terms" class="hover:text-secondary">Terms of Service</a>
				<a href="/sitemap" class="hover:text-secondary">Sitemap</a>
			</div>
			<p class="text-xs text-white/40">Designed & Developed with Excellence</p>
		</div>

		<div class="mt-6 border-t border-white/8 pt-4 text-center">
			<p class="text-xs text-white/45">
				This site developed by Moueen Togarvi | Phone: 03241940988
			</p>
		</div>
	</div>
</footer>
