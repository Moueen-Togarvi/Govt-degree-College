<script lang="ts">
	import {
		Menu,
		X,
		ChevronDown,
		GraduationCap,
		Users,
		BookOpen,
		Newspaper,
		LogIn,
		PhoneCall,
		Home,
		Mail,
		MapPin
	} from 'lucide-svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { ensureGsap, prefersReducedMotion } from '$lib/gsap';

	let isMenuOpen = $state(false);
	let menuVisible = $state(false);
	let scrolled = $state(false);
	let activeDropdown = $state<string | null>(null);
	let navElement = $state<HTMLElement | null>(null);
	let mobileDrawer = $state<HTMLElement | null>(null);
	let menuAnimating = false;

	const navLinks = [
		{ name: 'Home', href: '/', icon: Home },
		{
			name: 'About',
			href: '/about/overview',
			icon: Users,
			subLinks: [
				{ name: 'Overview', href: '/about/overview' },
				{ name: 'History', href: '/about/history' },
				{ name: 'Mission & Vision', href: '/about/mission-vision' },
				{ name: 'Administration', href: '/about/administration' },
				{ name: 'Faculty', href: '/about/faculty' }
			]
		},
		{
			name: 'Admissions',
			href: '/admissions/how-to-apply',
			icon: GraduationCap,
			subLinks: [
				{ name: 'How to Apply', href: '/admissions/how-to-apply' },
				{ name: 'Eligibility', href: '/admissions/eligibility' },
				{ name: 'Fee Structure', href: '/admissions/fee-structure' },
				{ name: 'Scholarships', href: '/admissions/scholarships' },
				{ name: 'Forms', href: '/admissions/forms' }
			]
		},
		{
			name: 'Academics',
			href: '/academics/programs',
			icon: BookOpen,
			subLinks: [
				{ name: 'Programs', href: '/academics/programs' },
				{ name: '11th Class', href: '/academics/11th' },
				{ name: '12th Class', href: '/academics/12th' },
				{ name: 'BS Programs', href: '/academics/bs' },
				{ name: 'Syllabus', href: '/academics/syllabus' }
			]
		},
		{
			name: 'Departments',
			href: '/departments/computer-science',
			icon: BookOpen,
			subLinks: [
				{ name: 'Computer Science', href: '/departments/computer-science' },
				{ name: 'Mathematics', href: '/departments/mathematics' },
				{ name: 'English', href: '/departments/english' },
				{ name: 'Islamiyat', href: '/departments/islamiyat' },
				{ name: 'Urdu', href: '/departments/urdu' },
				{ name: 'Chemistry', href: '/departments/chemistry' },
				{ name: 'Zoology', href: '/departments/zoology' }
			]
		},
		{
			name: 'News',
			href: '/news/announcements',
			icon: Newspaper,
			subLinks: [
				{ name: 'Announcements', href: '/news/announcements' },
				{ name: 'Events', href: '/news/events' },
				{ name: 'Results', href: '/news/results' },
				{ name: 'Gallery', href: '/news/gallery' }
			]
		}
	];

	function toggleDropdown(name: string) {
		activeDropdown = activeDropdown === name ? null : name;
	}

	async function animateMobileMenu(direction: 'in' | 'out') {
		if (!mobileDrawer || prefersReducedMotion()) return;

		const runtime = await ensureGsap();
		if (!runtime) return;

		const { gsap } = runtime;
		const rows = mobileDrawer.querySelectorAll('[data-mobile-row]');
		const portal = mobileDrawer.querySelector('[data-mobile-portal]');

		try {
			await new Promise<void>((resolve) => {
				const timeline = gsap.timeline({
					defaults: {
						ease: direction === 'in' ? 'power3.out' : 'power3.in'
					},
					onComplete: resolve
				});

				if (direction === 'in') {
					gsap.set(mobileDrawer, {
						autoAlpha: 1,
						clipPath: 'inset(0 0 100% 0)'
					});
					gsap.set([rows, portal], {
						autoAlpha: 0,
						y: 28,
						skewY: 5,
						filter: 'blur(8px)'
					});

					timeline
						.to(mobileDrawer, {
							clipPath: 'inset(0 0 0% 0)',
							duration: 0.34
						})
						.to(
							rows,
							{
								autoAlpha: 1,
								y: 0,
								skewY: 0,
								filter: 'blur(0px)',
								duration: 0.3,
								stagger: 0.04
							},
							'-=0.2'
						)
						.to(
							portal,
							{
								autoAlpha: 1,
								y: 0,
								skewY: 0,
								filter: 'blur(0px)',
								duration: 0.28
							},
							'-=0.12'
						);
				} else {
					timeline
						.to([rows, portal], {
							autoAlpha: 0,
							y: 24,
							skewY: 4,
							filter: 'blur(8px)',
							duration: 0.16,
							stagger: {
								each: 0.02,
								from: 'end'
							}
						})
						.to(
							mobileDrawer,
							{
								autoAlpha: 0,
								clipPath: 'inset(0 0 100% 0)',
								duration: 0.22
							},
							'-=0.04'
						);
				}
			});
		} catch (error) {
			console.error('Navbar mobile menu animation failed:', error);
			gsap.set(mobileDrawer, { clearProps: 'all', autoAlpha: 1 });
			gsap.set([rows, portal], { clearProps: 'all', autoAlpha: 1 });
		}
	}

	async function openMenu() {
		if (menuAnimating) return;

		menuAnimating = true;
		menuVisible = true;
		isMenuOpen = true;
		await tick();
		await animateMobileMenu('in');
		menuAnimating = false;
	}

	async function closeMenu() {
		if (menuAnimating || !menuVisible) return;

		menuAnimating = true;
		await animateMobileMenu('out');
		isMenuOpen = false;
		menuVisible = false;
		activeDropdown = null;
		menuAnimating = false;
	}

	async function toggleMenu() {
		if (menuVisible) {
			await closeMenu();
			return;
		}

		await openMenu();
	}

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 20;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		afterNavigate(() => {
			activeDropdown = null;
			menuVisible = false;
			isMenuOpen = false;
			handleScroll();
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<nav
	bind:this={navElement}
	data-sveltekit-preload-data="hover"
	data-sveltekit-preload-code="viewport"
	class="fixed top-0 z-50 w-full transition-shadow duration-200 {scrolled
		? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
		: ''}"
>
	<!-- Top Bar (Inspiration from Eduka) -->
	<div
		data-nav-topbar
		class:hidden={scrolled}
		class="overflow-hidden border-b border-white/10 bg-primary py-1.5 text-white/90 transition-all duration-200 lg:py-2"
	>
		<div
			class="container mx-auto flex items-center justify-between px-3 text-[11px] font-medium lg:px-8 lg:text-xs"
		>
			<div
				class="topbar-scroll flex min-w-0 flex-1 items-center gap-4 overflow-x-auto pr-2 whitespace-nowrap lg:gap-6"
			>
				<div class="flex shrink-0 items-center gap-1.5">
					<PhoneCall size={12} class="text-secondary lg:size-[14px]" />
					<span>+92 (63) 9240123</span>
				</div>
				<div class="flex shrink-0 items-center gap-1.5">
					<Mail size={12} class="text-secondary lg:size-[14px]" />
					<span>info@gpgcbwn.edu.pk</span>
				</div>
				<div class="flex shrink-0 items-center gap-1.5">
					<MapPin size={12} class="text-secondary lg:size-[14px]" />
					<span>College Road, Bahawalnagar</span>
				</div>
			</div>
			<div class="hidden items-center gap-3 lg:flex">
				<span class="text-xs text-white/50">Follow us:</span>
				<!-- Facebook -->
				<a href="/" aria-label="Facebook" class="transition-colors hover:text-secondary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
						><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
					>
				</a>
				<!-- Twitter/X -->
				<a href="/" aria-label="Twitter" class="transition-colors hover:text-secondary">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
						/></svg
					>
				</a>
				<!-- Instagram -->
				<a href="/" aria-label="Instagram" class="transition-colors hover:text-secondary">
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path
							d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
						/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg
					>
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navbar -->
	<div
		data-nav-shell
		class="{scrolled
			? 'bg-white/95 py-0.5 shadow-lg backdrop-blur-md'
			: 'bg-white py-1'} transition-all duration-200"
	>
		<div class="container mx-auto px-4 lg:px-8">
			<div class="flex items-center justify-between">
				<!-- Logo Section -->
				<a data-nav-logo href="/" class="group flex items-center gap-2.5 sm:gap-4">
					<div
						class="rounded-lg border border-neutral-100 bg-white p-1 shadow-sm transition-colors group-hover:border-secondary"
					>
						<img
							src="/images/logos/degree4k-removebg-preview.png"
							alt="GPGC Logo"
							class="h-11 w-auto transition-transform duration-300 group-hover:scale-105 sm:h-14"
							loading="eager"
							decoding="async"
							fetchpriority="high"
						/>
					</div>
					<div class="hidden sm:block md:block">
						<h1 class="text-xl leading-tight font-black tracking-tight text-primary">GPGC</h1>
						<p class="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
							Bahawalnagar
						</p>
					</div>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden items-center gap-1 lg:flex">
					{#each navLinks as link}
						<div
							data-nav-item
							class="group relative"
							role="none"
							onmouseenter={() => (activeDropdown = link.name)}
							onmouseleave={() => (activeDropdown = null)}
						>
							<a
								href={link.href}
								class="relative flex items-center gap-1.5 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-300 {$page
									.url.pathname === link.href
									? 'text-secondary'
									: 'text-primary hover:text-secondary'} group/link"
							>
								{link.name}
								{#if link.subLinks}
									<ChevronDown
										size={14}
										class="opacity-70 transition-transform duration-300 group-hover:rotate-180"
									/>
								{/if}

								<!-- Animated Underline -->
								<span
									class="absolute right-5 bottom-1 left-5 h-[2px] origin-left scale-x-0 bg-secondary transition-transform duration-300 group-hover/link:scale-x-100 {$page
										.url.pathname === link.href
										? 'scale-x-100'
										: ''}"
								></span>
							</a>

							<!-- Dropdown Menu -->
							{#if link.subLinks}
								<div
									class="invisible absolute top-full left-0 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
								>
									<div
										class="min-w-[240px] overflow-hidden rounded-b-xl border-t-4 border-secondary bg-white shadow-2xl"
									>
										{#each link.subLinks as sub}
											<a
												href={sub.href}
												class="block border-b border-neutral-100 px-6 py-4 text-sm font-bold text-primary transition-all duration-150 last:border-0 hover:bg-neutral-soft hover:text-secondary"
											>
												{sub.name}
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/each}

					<!-- Action Buttons -->
					<div class="ml-6 flex items-center gap-3 border-l border-neutral-200 pl-8">
						<a
							data-nav-cta
							href="/student-portal"
							class="flex items-center gap-2 rounded-xl bg-secondary px-7 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 active:scale-95"
						>
							<LogIn size={16} />
							Portal
						</a>
					</div>
				</div>

				<!-- Mobile Menu Toggle -->
				<button
					class="rounded-xl p-2 text-primary transition-colors hover:bg-primary/5 lg:hidden"
					onclick={toggleMenu}
					aria-label="Toggle Menu"
				>
					{#if isMenuOpen}
						<X size={28} />
					{:else}
						<Menu size={28} />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation Drawer -->
	{#if menuVisible}
		<div
			bind:this={mobileDrawer}
			class="mobile-drawer fixed inset-0 top-[68px] z-40 overflow-y-auto bg-white lg:hidden"
		>
			<div class="flex flex-col gap-2 p-6">
				{#each navLinks as link}
					<div data-mobile-row>
						<button
							class="flex w-full items-center justify-between rounded-2xl p-4 text-lg font-bold text-primary hover:bg-primary/5"
							onclick={() => toggleDropdown(link.name)}
						>
							<span class="flex items-center gap-3">
								<link.icon size={20} class="text-secondary" />
								{link.name}
							</span>
							{#if link.subLinks}
								<ChevronDown
									size={20}
									class="transition-transform duration-200 {activeDropdown === link.name
										? 'rotate-180'
										: ''}"
								/>
							{/if}
						</button>

						{#if link.subLinks && activeDropdown === link.name}
							<div
								class="animate-in slide-in-from-left-2 ml-12 flex flex-col gap-1 border-l-2 border-secondary/20 py-2 pl-4"
							>
								{#each link.subLinks as sub}
									<a
										href={sub.href}
										class="p-3 text-sm font-semibold text-primary/70 transition-colors hover:text-primary"
										onclick={closeMenu}
									>
										{sub.name}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}

				<div class="mt-6 flex flex-col gap-3">
					<a
						data-mobile-portal
						href="/student-portal"
						class="flex items-center justify-center gap-2 rounded-2xl bg-secondary p-4 text-center font-bold text-white shadow-lg"
						onclick={closeMenu}
					>
						<LogIn size={20} />
						Student Portal
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	.mobile-drawer {
		clip-path: inset(0 0 100% 0);
		will-change: clip-path, opacity, transform;
	}

	.topbar-scroll {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.topbar-scroll::-webkit-scrollbar {
		display: none;
	}
</style>
