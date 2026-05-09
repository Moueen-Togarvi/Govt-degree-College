import { Y as escape_html, c as ensure_array_like, f as sanitize_props, g as stringify, l as head, m as spread_props, n as attr_class, p as slot } from "../../../chunks/dev.js";
import { t as Icon } from "../../../chunks/Icon.js";
import { t as Arrow_right } from "../../../chunks/arrow-right.js";
import { t as Download } from "../../../chunks/download.js";
import { t as File_text } from "../../../chunks/file-text.js";
import { t as Scroll_text } from "../../../chunks/scroll-text.js";
import { t as PageHero } from "../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/library.svelte
function Library($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "library" },
		sanitize_props($$props),
		{
			/**
			* @component @name Library
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgNiA0IDE0IiAvPgogIDxwYXRoIGQ9Ik0xMiA2djE0IiAvPgogIDxwYXRoIGQ9Ik04IDh2MTIiIC8+CiAgPHBhdGggZD0iTTQgNHYxNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/library
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "m16 6 4 14" }],
				["path", { "d": "M12 6v14" }],
				["path", { "d": "M8 8v12" }],
				["path", { "d": "M4 4v16" }]
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
//#region src/routes/resources/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [{
		label: "Home",
		href: "/"
	}, {
		label: "Resources",
		href: "/resources"
	}];
	const resourceCards = [
		{
			title: "Digital Library",
			icon: Library,
			count: "50,000+ Books",
			color: "bg-blue-600"
		},
		{
			title: "Past Papers",
			icon: Scroll_text,
			count: "BISE & KFUEIT",
			color: "bg-teal-600"
		},
		{
			title: "Academic Notes",
			icon: File_text,
			count: "All Subjects",
			color: "bg-orange-600"
		},
		{
			title: "Useful Downloads",
			icon: Download,
			count: "Forms & Guides",
			color: "bg-purple-600"
		}
	];
	head("gczoum", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Resource Center | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Resource Center",
		subtitle: "Everything you need for your academic success in one place.",
		breadcrumbs,
		image: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"><!--[-->`);
	const each_array = ensure_array_like(resourceCards);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let card = each_array[$$index];
		$$renderer.push(`<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group relative overflow-hidden"><div${attr_class(`absolute top-0 right-0 w-24 h-24 ${stringify(card.color)} opacity-5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150`)}></div> <div class="space-y-6 relative z-10"><div${attr_class(`w-14 h-14 ${stringify(card.color)} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`)}>`);
		if (card.icon) {
			$$renderer.push("<!--[-->");
			card.icon($$renderer, { size: 28 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div> <div class="space-y-1"><h3 class="text-xl font-black text-primary">${escape_html(card.title)}</h3> <p class="text-xs font-bold text-secondary uppercase tracking-widest">${escape_html(card.count)}</p></div> <button class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">Explore `);
		Arrow_right($$renderer, { size: 14 });
		$$renderer.push(`<!----></button></div></div>`);
	}
	$$renderer.push(`<!--]--></div> <div class="bg-primary p-12 rounded-3xl text-white relative overflow-hidden"><div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-48 -mb-48"></div> <div class="max-w-3xl space-y-6 relative z-10"><h2 class="text-4xl font-black italic">Need specialized help?</h2> <p class="text-white/70 text-lg font-medium leading-relaxed">Our IT department and library staff are available during college hours to help you find the resources you need. Visit the central library for offline access to journals and rare manuscripts.</p> <div class="pt-4"><a href="/about/administration" class="inline-block px-10 py-4 bg-secondary text-white rounded-xl font-black shadow-xl shadow-secondary/20 hover:scale-105 transition-all">Contact Librarian</a></div></div></div></div></section>`);
}
//#endregion
export { _page as default };
