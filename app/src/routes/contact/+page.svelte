<script lang="ts">
	import PageHero from '$lib/components/shared/PageHero.svelte';
	import { MapPin, Phone, Mail, Clock, Send } from 'lucide-svelte';

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Contact Us', href: '/contact' }
	];
</script>

<svelte:head>
	<title>Contact Us | GPGC Bahawalnagar</title>
</svelte:head>

<PageHero
	title="Contact Us"
	subtitle="We're here to answer any questions about admissions, academics, and campus life."
	{breadcrumbs}
	image="/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg"
/>

<section class="relative bg-white py-24">
	<div
		class="pointer-events-none absolute top-0 right-0 -mt-48 -mr-48 h-96 w-96 rounded-full bg-secondary/5 blur-3xl"
	></div>

	<div class="relative z-10 container mx-auto px-4 lg:px-8">
		<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
			<!-- Contact Information -->
			<div class="space-y-12">
				<div class="space-y-6">
					<h2
						class="border-l-8 border-secondary pl-6 text-4xl leading-tight font-black text-primary"
					>
						Get in Touch with Us
					</h2>
					<p class="max-w-md text-lg leading-relaxed text-primary/70">
						Our administration office is open during regular college hours. Feel free to visit the
						campus or reach out via phone or email.
					</p>
				</div>

				<div class="space-y-6">
					<div
						class="group flex items-start gap-6 rounded-3xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-lg"
					>
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition-all group-hover:scale-110 group-hover:bg-secondary"
						>
							<MapPin size={24} />
						</div>
						<div class="space-y-2">
							<h3 class="text-xl font-black text-primary">Campus Address</h3>
							<p class="font-medium text-primary/70">
								Govt Post Graduate College,<br />Minchinabad Road, Bahawalnagar,<br />Punjab 62300,
								Pakistan
							</p>
						</div>
					</div>

					<div
						class="group flex items-start gap-6 rounded-3xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-lg"
					>
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition-all group-hover:scale-110 group-hover:bg-secondary"
						>
							<Phone size={24} />
						</div>
						<div class="space-y-2">
							<h3 class="text-xl font-black text-primary">Phone Numbers</h3>
							<p class="font-medium text-primary/70">+92 63 9240123 (Principal Office)</p>
							<p class="font-medium text-primary/70">+92 63 9240124 (Student Affairs)</p>
						</div>
					</div>

					<div
						class="group flex items-start gap-6 rounded-3xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-lg"
					>
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition-all group-hover:scale-110 group-hover:bg-secondary"
						>
							<Mail size={24} />
						</div>
						<div class="space-y-2">
							<h3 class="text-xl font-black text-primary">Email Addresses</h3>
							<p class="font-medium text-primary/70">info@gpgcbwn.edu.pk</p>
							<p class="font-medium text-primary/70">admissions@gpgcbwn.edu.pk</p>
						</div>
					</div>

					<div
						class="group flex items-start gap-6 rounded-3xl border border-border-soft bg-neutral-soft p-6 transition-all hover:shadow-lg"
					>
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md transition-all group-hover:scale-110 group-hover:bg-secondary"
						>
							<Clock size={24} />
						</div>
						<div class="space-y-2">
							<h3 class="text-xl font-black text-primary">Office Hours</h3>
							<p class="font-medium text-primary/70">Mon - Thu & Sat: 8:00 AM - 2:00 PM</p>
							<p class="font-medium text-primary/70">Friday: 8:00 AM - 12:00 PM</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div
				class="relative overflow-hidden rounded-[2rem] bg-primary p-10 text-white shadow-2xl md:p-12"
			>
				<div
					class="pointer-events-none absolute right-0 bottom-0 -mr-32 -mb-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
				></div>

				<div class="relative z-10 space-y-8">
					<div class="space-y-2">
						<h3 class="text-3xl font-black italic">Send us a Message</h3>
						<p class="font-medium text-white/70">
							Fill out the form below and our team will get back to you shortly.
						</p>
					</div>

					<form class="space-y-6">
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div class="space-y-2">
								<label
									for="firstName"
									class="text-sm font-bold tracking-widest text-white/80 uppercase"
									>First Name</label
								>
								<input
									type="text"
									id="firstName"
									class="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
									placeholder="Ali"
									required
								/>
							</div>
							<div class="space-y-2">
								<label
									for="lastName"
									class="text-sm font-bold tracking-widest text-white/80 uppercase">Last Name</label
								>
								<input
									type="text"
									id="lastName"
									class="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
									placeholder="Khan"
									required
								/>
							</div>
						</div>

						<div class="space-y-2">
							<label for="email" class="text-sm font-bold tracking-widest text-white/80 uppercase"
								>Email Address</label
							>
							<input
								type="email"
								id="email"
								class="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
								placeholder="ali@example.com"
								required
							/>
						</div>

						<div class="space-y-2">
							<label for="subject" class="text-sm font-bold tracking-widest text-white/80 uppercase"
								>Subject</label
							>
							<select
								id="subject"
								class="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/50 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
							>
								<option value="admission">Admissions Inquiry</option>
								<option value="academic">Academic Programs</option>
								<option value="fees">Fee & Scholarships</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div class="space-y-2">
							<label for="message" class="text-sm font-bold tracking-widest text-white/80 uppercase"
								>Message</label
							>
							<textarea
								id="message"
								rows="4"
								class="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/50 focus:outline-none"
								placeholder="How can we help you?"
								required
							></textarea>
						</div>

						<button
							type="submit"
							class="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-4 font-black text-white shadow-xl shadow-secondary/20 transition-all hover:scale-[1.02] hover:bg-secondary/90"
						>
							Send Message <Send size={18} />
						</button>
					</form>
				</div>
			</div>
		</div>

		<!-- Map Placeholder Section -->
		<div class="mt-24 space-y-8">
			<h2 class="text-center text-3xl font-black text-primary">Find Us on Campus</h2>
			<div
				class="relative h-[400px] w-full overflow-hidden rounded-[2rem] bg-neutral-200 shadow-inner"
			>
				<!-- In a real scenario, an iframe or map library would go here -->
				<div
					class="absolute inset-0 flex flex-col items-center justify-center bg-primary/5 text-primary"
				>
					<MapPin size={48} class="mb-4 text-secondary drop-shadow-md" />
					<p class="text-2xl font-black">Campus Map View</p>
					<p class="mt-2 font-medium text-primary/60">Map Integration Placeholder</p>
				</div>
			</div>
		</div>
	</div>
</section>
