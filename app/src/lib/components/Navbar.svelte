<script lang="ts">
	import { Menu, X, ChevronDown, GraduationCap, Users, BookOpen, Newspaper, LogIn, PhoneCall, Home, Mail, MapPin } from 'lucide-svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

		const gsap = ensureGsap();
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
							duration: 0.52
						})
						.to(
							rows,
							{
								autoAlpha: 1,
								y: 0,
								skewY: 0,
								filter: 'blur(0px)',
								duration: 0.48,
								stagger: 0.06
							},
							'-=0.32'
						)
						.to(
							portal,
							{
								autoAlpha: 1,
								y: 0,
								skewY: 0,
								filter: 'blur(0px)',
								duration: 0.42
							},
							'-=0.18'
						);
				} else {
					timeline
						.to(
							[rows, portal],
							{
								autoAlpha: 0,
								y: 24,
								skewY: 4,
								filter: 'blur(8px)',
								duration: 0.2,
								stagger: {
									each: 0.03,
									from: 'end'
								}
							}
						)
						.to(
							mobileDrawer,
							{
								autoAlpha: 0,
								clipPath: 'inset(0 0 100% 0)',
								duration: 0.34
							},
							'-=0.08'
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
		window.addEventListener('scroll', handleScroll);

		if (navElement && !prefersReducedMotion()) {
			const gsap = ensureGsap();
			const context = gsap.context(() => {
				try {
					const navItems = gsap.utils.toArray<HTMLElement>('[data-nav-item]');
					const topBar = document.querySelector('[data-nav-topbar]');
					const mainNav = document.querySelector('[data-nav-shell]');

					gsap
						.timeline({
							defaults: {
								ease: 'power3.out'
							}
						})
						.from('[data-nav-shell]', {
							autoAlpha: 0,
							y: -36,
							duration: 0.6
						})
						.from(
							'[data-nav-logo]',
							{
								autoAlpha: 0,
								x: -28,
								skewY: 5,
								duration: 0.55
							},
							'-=0.25'
						)
						.from(
							navItems,
							{
								autoAlpha: 0,
								y: -20,
								skewY: 5,
								duration: 0.4,
								stagger: 0.06
							},
							'-=0.26'
						)
						.from(
							'[data-nav-cta]',
							{
								autoAlpha: 0,
								scale: 0.88,
								filter: 'blur(8px)',
								immediateRender: false,
								duration: 0.45
							},
							'-=0.18'
						);

						ScrollTrigger.create({
							start: 'top -50',
							onToggle: (self) => {
							const isScrolled = self.isActive;
							if (topBar) {
								gsap.to(topBar, {
									height: isScrolled ? 0 : 'auto',
									autoAlpha: isScrolled ? 0 : 1,
									duration: 0.4,
									ease: 'power2.inOut'
								});
							}
							if (mainNav) {
								gsap.to(mainNav, {
									paddingTop: isScrolled ? '4px' : '8px',
									paddingBottom: isScrolled ? '4px' : '8px',
									backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
									boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.08)' : '0 0 0 rgba(0,0,0,0)',
									duration: 0.4,
									ease: 'power2.inOut'
								});
							}
						}
					});
				} catch (error) {
					console.error('Navbar GSAP animation failed:', error);
					gsap.set('[data-nav-shell]', { clearProps: 'all', autoAlpha: 1 });
					gsap.set('[data-nav-cta]', { clearProps: 'all', autoAlpha: 1 });
				}
			}, navElement);

			return () => {
				window.removeEventListener('scroll', handleScroll);
				context.revert();
			};
		}

		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	bind:this={navElement}
	class="fixed top-0 z-50 w-full transition-all duration-500 {scrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : ''}"
>
	<!-- Top Bar (Inspiration from Eduka) -->
	<div data-nav-topbar class="hidden lg:block bg-primary text-white/90 py-2 border-b border-white/10 overflow-hidden">
		<div class="container mx-auto px-4 lg:px-8 flex justify-between items-center text-xs font-medium">
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2">
					<PhoneCall size={14} class="text-secondary" />
					<span>+92 (63) 9240123</span>
				</div>
				<div class="flex items-center gap-2">
					<Mail size={14} class="text-secondary" />
					<span>info@gpgcbwn.edu.pk</span>
				</div>
				<div class="flex items-center gap-2">
					<MapPin size={14} class="text-secondary" />
					<span>College Road, Bahawalnagar</span>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-white/50 text-xs">Follow us:</span>
				<!-- Facebook -->
				<a href="/" aria-label="Facebook" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				</a>
				<!-- Twitter/X -->
				<a href="/" aria-label="Twitter" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
				</a>
				<!-- Instagram -->
				<a href="/" aria-label="Instagram" class="hover:text-secondary transition-colors">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</a>
			</div>
		</div>
	</div>

	<!-- Main Navbar -->
	<div
		data-nav-shell
		class="{scrolled ? 'bg-white/95 shadow-lg backdrop-blur-md py-0.5' : 'bg-white py-1'} transition-all duration-300"
	>
		<div class="container mx-auto px-4 lg:px-8">
			<div class="flex items-center justify-between">
				<!-- Logo Section -->
				<a data-nav-logo href="/" class="flex items-center gap-4 group">
					<div class="bg-white p-1 rounded-lg shadow-sm border border-neutral-100 group-hover:border-secondary transition-colors">
						<img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
					</div>
					<div class="hidden md:block">
						<h1 class="text-xl font-black leading-tight tracking-tight text-primary">GPGC</h1>
						<p class="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">Bahawalnagar</p>
					</div>
				</a>

				<!-- Desktop Navigation -->
				<div class="hidden lg:flex items-center gap-1">
					{#each navLinks as link}
						<div 
							data-nav-item
							class="relative group"
							role="none"
							onmouseenter={() => activeDropdown = link.name}
							onmouseleave={() => activeDropdown = null}
						>
							<a 
								href={link.href} 
								class="relative flex items-center gap-1.5 px-5 py-3 text-sm font-bold tracking-wide transition-all duration-300 {$page.url.pathname === link.href ? 'text-secondary' : 'text-primary hover:text-secondary'} group/link"
							>
								{link.name}
								{#if link.subLinks}
									<ChevronDown size={14} class="transition-transform duration-300 group-hover:rotate-180 opacity-70" />
								{/if}
								
								<!-- Animated Underline -->
								<span class="absolute bottom-1 left-5 right-5 h-[2px] bg-secondary scale-x-0 transition-transform duration-300 origin-left group-hover/link:scale-x-100 {$page.url.pathname === link.href ? 'scale-x-100' : ''}"></span>
							</a>

							<!-- Dropdown Menu -->
							{#if link.subLinks}
								<div class="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
									<div class="bg-white border-t-4 border-secondary shadow-2xl rounded-b-xl overflow-hidden min-w-[240px]">
										{#each link.subLinks as sub}
											<a 
												href={sub.href} 
												class="block px-6 py-4 text-sm font-bold text-primary hover:bg-neutral-soft hover:text-secondary border-b border-neutral-100 last:border-0 transition-all duration-150"
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
					<div class="ml-6 flex items-center gap-3 pl-8 border-l border-neutral-200">
						<a
							data-nav-cta
							href="/student-portal"
							class="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-black text-white bg-secondary hover:bg-secondary/90 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 transition-all active:scale-95 uppercase tracking-widest"
						>
							<LogIn size={16} />
							Portal
						</a>
					</div>
				</div>

				<!-- Mobile Menu Toggle -->
				<button 
					class="lg:hidden p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors"
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
			class="mobile-drawer lg:hidden fixed inset-0 top-[68px] z-40 overflow-y-auto bg-white"
		>
			<div class="flex flex-col p-6 gap-2">
				{#each navLinks as link}
					<div data-mobile-row>
						<button 
							class="w-full flex items-center justify-between p-4 rounded-2xl text-lg font-bold text-primary hover:bg-primary/5"
							onclick={() => toggleDropdown(link.name)}
						>
							<span class="flex items-center gap-3">
								<link.icon size={20} class="text-secondary" />
								{link.name}
							</span>
							{#if link.subLinks}
								<ChevronDown size={20} class="transition-transform duration-200 {activeDropdown === link.name ? 'rotate-180' : ''}" />
							{/if}
						</button>
						
						{#if link.subLinks && activeDropdown === link.name}
							<div class="ml-12 flex flex-col gap-1 border-l-2 border-secondary/20 pl-4 py-2 animate-in slide-in-from-left-2">
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
</style>
