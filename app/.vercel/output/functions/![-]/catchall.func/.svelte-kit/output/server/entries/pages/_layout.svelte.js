import "../../chunks/index-server.js";
import { Y as escape_html, _ as unsubscribe_stores, c as ensure_array_like, f as sanitize_props, g as stringify, h as store_get, l as head, m as spread_props, n as attr_class, p as slot, q as attr } from "../../chunks/dev.js";
import { t as Icon } from "../../chunks/Icon.js";
import { t as Book_open } from "../../chunks/book-open.js";
import { t as External_link } from "../../chunks/external-link.js";
import { t as Graduation_cap } from "../../chunks/graduation-cap.js";
import { n as Mail, t as Phone } from "../../chunks/phone.js";
import { t as Map_pin } from "../../chunks/map-pin.js";
import { t as Phone_call } from "../../chunks/phone-call.js";
import { t as Users } from "../../chunks/users.js";
import { t as page } from "../../chunks/stores.js";
//#region node_modules/lucide-svelte/dist/icons/chevron-down.svelte
function Chevron_down($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "chevron-down" },
		sanitize_props($$props),
		{
			/**
			* @component @name ChevronDown
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m6 9 6 6 6-6" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region node_modules/lucide-svelte/dist/icons/house.svelte
function House($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "house" },
		sanitize_props($$props),
		{
			/**
			* @component @name House
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiIC8+CiAgPHBhdGggZD0iTTMgMTBhMiAyIDAgMCAxIC43MDktMS41MjhsNy02YTIgMiAwIDAgMSAyLjU4MiAwbDcgNkEyIDIgMCAwIDEgMjEgMTB2OWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/house
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }], ["path", { "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }]],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region node_modules/lucide-svelte/dist/icons/log-in.svelte
function Log_in($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "log-in" },
		sanitize_props($$props),
		{
			/**
			* @component @name LogIn
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTAgMTcgNS01LTUtNSIgLz4KICA8cGF0aCBkPSJNMTUgMTJIMyIgLz4KICA8cGF0aCBkPSJNMTUgM2g0YTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMmgtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/log-in
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "m10 17 5-5-5-5" }],
				["path", { "d": "M15 12H3" }],
				["path", { "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }]
			],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region node_modules/lucide-svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "menu" },
		sanitize_props($$props),
		{
			/**
			* @component @name Menu
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCA1aDE2IiAvPgogIDxwYXRoIGQ9Ik00IDEyaDE2IiAvPgogIDxwYXRoIGQ9Ik00IDE5aDE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/menu
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M4 5h16" }],
				["path", { "d": "M4 12h16" }],
				["path", { "d": "M4 19h16" }]
			],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region node_modules/lucide-svelte/dist/icons/newspaper.svelte
function Newspaper($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "newspaper" },
		sanitize_props($$props),
		{
			/**
			* @component @name Newspaper
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMThoLTUiIC8+CiAgPHBhdGggZD0iTTE4IDE0aC04IiAvPgogIDxwYXRoIGQ9Ik00IDIyaDE2YTIgMiAwIDAgMCAyLTJWNGEyIDIgMCAwIDAtMi0ySDhhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDEtNCAwdi05YTIgMiAwIDAgMSAyLTJoMiIgLz4KICA8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI0IiB4PSIxMCIgeT0iNiIgcng9IjEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/newspaper
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M15 18h-5" }],
				["path", { "d": "M18 14h-8" }],
				["path", { "d": "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" }],
				["rect", {
					"width": "8",
					"height": "4",
					"x": "10",
					"y": "6",
					"rx": "1"
				}]
			],
			children: ($$renderer) => {
				$$renderer.push(`<!--[-->`);
				slot($$renderer, $$props, "default", {}, null);
				$$renderer.push(`<!--]-->`);
			},
			$$slots: { default: true }
		}
	]));
}
//#endregion
//#region src/lib/components/Navbar.svelte
function Navbar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const navLinks = [
			{
				name: "Home",
				href: "/",
				icon: House
			},
			{
				name: "About",
				href: "/about/overview",
				icon: Users,
				subLinks: [
					{
						name: "Overview",
						href: "/about/overview"
					},
					{
						name: "History",
						href: "/about/history"
					},
					{
						name: "Mission & Vision",
						href: "/about/mission-vision"
					},
					{
						name: "Administration",
						href: "/about/administration"
					},
					{
						name: "Faculty",
						href: "/about/faculty"
					}
				]
			},
			{
				name: "Admissions",
				href: "/admissions/how-to-apply",
				icon: Graduation_cap,
				subLinks: [
					{
						name: "How to Apply",
						href: "/admissions/how-to-apply"
					},
					{
						name: "Eligibility",
						href: "/admissions/eligibility"
					},
					{
						name: "Fee Structure",
						href: "/admissions/fee-structure"
					},
					{
						name: "Scholarships",
						href: "/admissions/scholarships"
					},
					{
						name: "Forms",
						href: "/admissions/forms"
					}
				]
			},
			{
				name: "Academics",
				href: "/academics/programs",
				icon: Book_open,
				subLinks: [
					{
						name: "Programs",
						href: "/academics/programs"
					},
					{
						name: "11th Class",
						href: "/academics/11th"
					},
					{
						name: "12th Class",
						href: "/academics/12th"
					},
					{
						name: "BS Programs",
						href: "/academics/bs"
					},
					{
						name: "Syllabus",
						href: "/academics/syllabus"
					}
				]
			},
			{
				name: "Departments",
				href: "/departments/computer-science",
				icon: Book_open,
				subLinks: [
					{
						name: "Computer Science",
						href: "/departments/computer-science"
					},
					{
						name: "Mathematics",
						href: "/departments/mathematics"
					},
					{
						name: "English",
						href: "/departments/english"
					},
					{
						name: "Islamiyat",
						href: "/departments/islamiyat"
					},
					{
						name: "Urdu",
						href: "/departments/urdu"
					},
					{
						name: "Chemistry",
						href: "/departments/chemistry"
					},
					{
						name: "Zoology",
						href: "/departments/zoology"
					}
				]
			},
			{
				name: "News",
				href: "/news/announcements",
				icon: Newspaper,
				subLinks: [
					{
						name: "Announcements",
						href: "/news/announcements"
					},
					{
						name: "Events",
						href: "/news/events"
					},
					{
						name: "Results",
						href: "/news/results"
					},
					{
						name: "Gallery",
						href: "/news/gallery"
					}
				]
			}
		];
		$$renderer.push(`<nav class="fixed top-0 z-50 w-full transition-all duration-300"><div class="hidden lg:block bg-primary text-white/90 py-2 border-b border-white/10"><div class="container mx-auto px-4 lg:px-8 flex justify-between items-center text-xs font-medium"><div class="flex items-center gap-6"><div class="flex items-center gap-2">`);
		Phone_call($$renderer, {
			size: 14,
			class: "text-secondary"
		});
		$$renderer.push(`<!----> <span>+92 (63) 9240123</span></div> <div class="flex items-center gap-2">`);
		Mail($$renderer, {
			size: 14,
			class: "text-secondary"
		});
		$$renderer.push(`<!----> <span>info@gpgcbwn.edu.pk</span></div> <div class="flex items-center gap-2">`);
		Map_pin($$renderer, {
			size: 14,
			class: "text-secondary"
		});
		$$renderer.push(`<!----> <span>Minchinabad Road, Bahawalnagar</span></div></div> <div class="flex items-center gap-3"><span class="text-white/50 text-xs">Follow us:</span> <a href="/" aria-label="Facebook" class="hover:text-secondary transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a> <a href="/" aria-label="Twitter" class="hover:text-secondary transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a> <a href="/" aria-label="Instagram" class="hover:text-secondary transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a></div></div></div> <div${attr_class(`${stringify("bg-white py-1")} transition-all duration-300`)}><div class="container mx-auto px-4 lg:px-8"><div class="flex items-center justify-between"><a href="/" class="flex items-center gap-4 group"><div class="bg-white p-1 rounded-lg shadow-sm border border-neutral-100 group-hover:border-secondary transition-colors"><img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="h-14 w-auto transition-transform duration-300 group-hover:scale-105"/></div> <div class="hidden md:block"><h1 class="text-xl font-black leading-tight tracking-tight text-primary">GPGC</h1> <p class="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">Bahawalnagar</p></div></a> <div class="hidden lg:flex items-center gap-1"><!--[-->`);
		const each_array = ensure_array_like(navLinks);
		for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
			let link = each_array[$$index_1];
			$$renderer.push(`<div class="relative group" role="none"><a${attr("href", link.href)}${attr_class(`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "text-secondary" : "text-primary hover:text-secondary")}`)}>${escape_html(link.name)} `);
			if (link.subLinks) {
				$$renderer.push("<!--[0-->");
				Chevron_down($$renderer, {
					size: 14,
					class: "transition-transform duration-200 group-hover:rotate-180"
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></a> `);
			if (link.subLinks) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"><div class="bg-white border-t-4 border-secondary shadow-2xl rounded-b-xl overflow-hidden min-w-[240px]"><!--[-->`);
				const each_array_1 = ensure_array_like(link.subLinks);
				for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
					let sub = each_array_1[$$index];
					$$renderer.push(`<a${attr("href", sub.href)} class="block px-6 py-4 text-sm font-bold text-primary hover:bg-neutral-soft hover:text-secondary border-b border-neutral-100 last:border-0 transition-all duration-150">${escape_html(sub.name)}</a>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--> <div class="ml-4 flex items-center gap-3 pl-6 border-l border-neutral-200"><a href="/student-portal" class="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-black text-white bg-secondary hover:bg-secondary/90 transition-all shadow-md active:scale-95 uppercase tracking-wider">`);
		Log_in($$renderer, { size: 16 });
		$$renderer.push(`<!----> Portal</a></div></div> <button class="lg:hidden p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors" aria-label="Toggle Menu">`);
		$$renderer.push("<!--[-1-->");
		Menu($$renderer, { size: 28 });
		$$renderer.push(`<!--]--></button></div></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></nav>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/Footer.svelte
function Footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<footer class="bg-primary text-white pt-16 pb-8"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"><div class="space-y-6"><div class="flex items-center gap-3"><img src="/images/logos/degree4k-removebg-preview.png" alt="GPGC Logo" class="h-16 w-auto"/> <div><h2 class="text-xl font-bold leading-tight">GPGC</h2> <p class="text-xs font-medium tracking-widest text-secondary uppercase">Bahawalnagar</p></div></div> <p class="text-sm text-white/70 leading-relaxed italic">"Empowering minds, building futures. A legacy of academic excellence and character building in Bahawalnagar."</p> <div class="flex items-center gap-4"><a href="/" aria-label="Facebook" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a> <a href="/" aria-label="Twitter" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a> <a href="/" aria-label="Instagram" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a> <a href="/" aria-label="YouTube" class="p-2 bg-white/5 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"></polygon></svg></a></div></div> <div class="space-y-6"><h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Quick Links</h3> <ul class="space-y-3"><!--[-->`);
		const each_array = ensure_array_like([
			"About Us",
			"Admissions",
			"Academics",
			"Departments",
			"Student Portal",
			"Resources"
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let link = each_array[$$index];
			$$renderer.push(`<li><a${attr("href", `/${stringify(link.toLowerCase().replace(" ", "-"))}`)} class="text-sm text-white/70 hover:text-secondary hover:translate-x-2 flex items-center gap-2 transition-all duration-300 group"><span class="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></span> ${escape_html(link)}</a></li>`);
		}
		$$renderer.push(`<!--]--></ul></div> <div class="space-y-6"><h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Affiliation</h3> <div class="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4"><p class="text-sm font-medium text-white/90">BS Programs are affiliated with:</p> <div class="flex flex-col gap-2"><p class="text-sm font-bold text-secondary">KFUEIT Rahim Yar Khan</p> <p class="text-xs text-white/60">Khawaja Fareed University of Engineering &amp; Information Technology</p></div> <a href="https://kfueit.edu.pk" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-secondary transition-colors">Visit University Website `);
		External_link($$renderer, { size: 12 });
		$$renderer.push(`<!----></a></div></div> <div class="space-y-6"><h3 class="text-lg font-bold border-l-4 border-secondary pl-4">Contact Us</h3> <div class="space-y-4"><div class="flex items-start gap-4 text-white/70">`);
		Map_pin($$renderer, {
			size: 20,
			class: "text-secondary flex-shrink-0"
		});
		$$renderer.push(`<!----> <p class="text-sm">Govt Post Graduate College, Minchinabad Road, Bahawalnagar, Punjab, Pakistan</p></div> <div class="flex items-center gap-4 text-white/70">`);
		Phone($$renderer, {
			size: 20,
			class: "text-secondary flex-shrink-0"
		});
		$$renderer.push(`<!----> <p class="text-sm">+92 (63) 9240123</p></div> <div class="flex items-center gap-4 text-white/70">`);
		Mail($$renderer, {
			size: 20,
			class: "text-secondary flex-shrink-0"
		});
		$$renderer.push(`<!----> <p class="text-sm">info@gpgcbwn.edu.pk</p></div></div></div></div> <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center"><p class="text-xs text-white/40">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Govt Post Graduate College Bahawalnagar. All Rights Reserved.</p> <div class="flex gap-6 text-xs text-white/40"><a href="/privacy" class="hover:text-secondary">Privacy Policy</a> <a href="/terms" class="hover:text-secondary">Terms of Service</a> <a href="/sitemap" class="hover:text-secondary">Sitemap</a></div> <p class="text-xs text-white/40">Designed &amp; Developed with Excellence</p></div> <div class="mt-6 border-t border-white/8 pt-4 text-center"><p class="text-xs text-white/45">This site developed by Moueen Togarvi | Phone: 03241940988</p></div></div></footer>`);
	});
}
//#endregion
//#region src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children } = $$props;
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Govt Post Graduate College Bahawalnagar</title>`);
			});
			$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
		});
		$$renderer.push(`<div class="flex flex-col min-h-screen bg-white">`);
		if (!store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin")) {
			$$renderer.push("<!--[0-->");
			Navbar($$renderer, {});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <main${attr_class(`flex-grow ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin") ? "" : "pt-[105px]")}`)}>`);
		children($$renderer);
		$$renderer.push(`<!----></main> `);
		if (!store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/admin")) {
			$$renderer.push("<!--[0-->");
			Footer($$renderer, {});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _layout as default };
