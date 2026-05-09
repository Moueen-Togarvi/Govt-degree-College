import { f as sanitize_props, l as head, m as spread_props, p as slot } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/eye.svelte
function Eye($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "eye" },
		sanitize_props($$props),
		{
			/**
			* @component @name Eye
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/eye
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }], ["circle", {
				"cx": "12",
				"cy": "12",
				"r": "3"
			}]],
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
//#region node_modules/lucide-svelte/dist/icons/heart.svelte
function Heart($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "heart" },
		sanitize_props($$props),
		{
			/**
			* @component @name Heart
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMiA5LjVhNS41IDUuNSAwIDAgMSA5LjU5MS0zLjY3Ni41Ni41NiAwIDAgMCAuODE4IDBBNS40OSA1LjQ5IDAgMCAxIDIyIDkuNWMwIDIuMjktMS41IDQtMyA1LjVsLTUuNDkyIDUuMzEzYTIgMiAwIDAgMS0zIC4wMTlMNSAxNWMtMS41LTEuNS0zLTMuMi0zLTUuNSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/heart
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" }]],
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
//#region node_modules/lucide-svelte/dist/icons/target.svelte
function Target($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "target" },
		sanitize_props($$props),
		{
			/**
			* @component @name Target
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/target
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "10"
				}],
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "6"
				}],
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "2"
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
//#region src/routes/about/mission-vision/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "About",
			href: "/about/overview"
		},
		{
			label: "Mission & Vision",
			href: "/about/mission-vision"
		}
	];
	head("19mc914", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Mission &amp; Vision | About Us | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Mission & Vision",
		subtitle: "Defining our purpose and our future path.",
		breadcrumbs,
		image: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-12"><div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all"><div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">`);
	Target($$renderer, { size: 32 });
	$$renderer.push(`<!----></div> <h2 class="text-3xl font-black text-primary">Our Mission</h2> <p class="text-lg text-primary/70 leading-relaxed">To provide affordable and quality education to students, enabling them to realize their full potential and contribute meaningfully to society as responsible and ethically strong citizens.</p></div> <div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all"><div class="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">`);
	Eye($$renderer, { size: 32 });
	$$renderer.push(`<!----></div> <h2 class="text-3xl font-black text-primary">Our Vision</h2> <p class="text-lg text-primary/70 leading-relaxed">To be a leading center of academic excellence in the region, recognized for innovation in teaching, research, and for producing graduates who are leaders in their respective fields.</p></div> <div class="space-y-6 p-10 rounded-3xl bg-neutral-soft border border-border-soft group hover:border-secondary transition-all"><div class="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">`);
	Heart($$renderer, { size: 32 });
	$$renderer.push(`<!----></div> <h2 class="text-3xl font-black text-primary">Core Values</h2> <ul class="space-y-3 text-lg text-primary/70"><li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Integrity</li> <li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Excellence</li> <li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Inclusivity</li> <li class="flex items-center gap-2 font-bold"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Discipline</li></ul></div></div></div></section>`);
}
//#endregion
export { _page as default };
