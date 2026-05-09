import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, p as slot, q as attr } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/maximize-2.svelte
function Maximize_2($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "maximize-2" },
		sanitize_props($$props),
		{
			/**
			* @component @name Maximize2
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgM2g2djYiIC8+CiAgPHBhdGggZD0ibTIxIDMtNyA3IiAvPgogIDxwYXRoIGQ9Im0zIDIxIDctNyIgLz4KICA8cGF0aCBkPSJNOSAyMUgzdi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/maximize-2
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M15 3h6v6" }],
				["path", { "d": "m21 3-7 7" }],
				["path", { "d": "m3 21 7-7" }],
				["path", { "d": "M9 21H3v-6" }]
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
//#region src/routes/news/gallery/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "News",
			href: "/news/announcements"
		},
		{
			label: "Gallery",
			href: "/news/gallery"
		}
	];
	const images = [
		{
			src: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg",
			title: "College Campus"
		},
		{
			src: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg",
			title: "Science Block"
		},
		{
			src: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg",
			title: "Library Hall"
		},
		{
			src: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg",
			title: "Main Gate"
		},
		{
			src: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg",
			title: "Academic Block"
		},
		{
			src: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg",
			title: "Admin Office"
		},
		{
			src: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg",
			title: "Auditorium"
		},
		{
			src: "/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg",
			title: "Sports Complex"
		}
	];
	head("1osk9cj", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Gallery | News | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Campus Gallery",
		subtitle: "A visual journey through our campus and academic life.",
		breadcrumbs,
		image: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
	const each_array = ensure_array_like(images);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let image = each_array[$$index];
		$$renderer.push(`<div class="group relative aspect-square overflow-hidden rounded-3xl bg-neutral-soft border border-border-soft hover:shadow-2xl transition-all duration-500 cursor-pointer"><img${attr("src", image.src)}${attr("alt", image.title)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/> <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8"><div class="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"><p class="text-secondary font-black uppercase tracking-widest text-xs">Category</p> <h3 class="text-xl font-black text-white">${escape_html(image.title)}</h3> <div class="pt-2"><div class="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg">`);
		Maximize_2($$renderer, { size: 18 });
		$$renderer.push(`<!----></div></div></div></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
