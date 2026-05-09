import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, p as slot, q as attr } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as Download } from "../../../../chunks/download.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/file-check.svelte
function File_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "file-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name FileCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiAyMmEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg4YTIuNCAyLjQgMCAwIDEgMS43MDQuNzA2bDMuNTg4IDMuNTg4QTIuNCAyLjQgMCAwIDEgMjAgOHYxMmEyIDIgMCAwIDEtMiAyeiIgLz4KICA8cGF0aCBkPSJNMTQgMnY1YTEgMSAwIDAgMCAxIDFoNSIgLz4KICA8cGF0aCBkPSJtOSAxNSAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/file-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }],
				["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
				["path", { "d": "m9 15 2 2 4-4" }]
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
//#region node_modules/lucide-svelte/dist/icons/search.svelte
function Search($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "search" },
		sanitize_props($$props),
		{
			/**
			* @component @name Search
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEgMjEtNC4zNC00LjM0IiAvPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/search
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m21 21-4.34-4.34" }], ["circle", {
				"cx": "11",
				"cy": "11",
				"r": "8"
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
//#region src/routes/news/results/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
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
				label: "Exam Results",
				href: "/news/results"
			}
		];
		let { data } = $$props;
		head("nm6suv", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Exam Results | News | GPGC Bahawalnagar</title>`);
			});
		});
		PageHero($$renderer, {
			title: "Examination Results",
			subtitle: "Access and download the latest semester and annual results.",
			breadcrumbs,
			image: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
		});
		$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto space-y-12"><form method="GET" class="relative group">`);
		Search($$renderer, {
			class: "absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-secondary transition-colors",
			size: 24
		});
		$$renderer.push(`<!----> <input type="text" name="q"${attr("value", data.search)} placeholder="Search for your program or result..." class="w-full pl-16 pr-32 py-6 bg-neutral-soft rounded-2xl border border-border-soft focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/5 font-bold text-primary transition-all"/> <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-black hover:bg-secondary transition-colors">Search</button></form> <div class="space-y-4">`);
		if (data.results.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-10 rounded-3xl border border-border-soft bg-neutral-soft text-center"><p class="text-lg font-bold text-primary">No results matched your search.</p></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array = ensure_array_like(data.results);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let result = each_array[$$index];
			$$renderer.push(`<div class="flex items-center justify-between p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group"><div class="flex items-center gap-6"><div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">`);
			File_check($$renderer, { size: 28 });
			$$renderer.push(`<!----></div> <div class="space-y-1"><h3 class="text-xl font-black text-primary leading-tight">${escape_html(result.title)}</h3> <div class="flex items-center gap-3"><span class="text-xs font-black uppercase tracking-widest text-secondary">${escape_html(result.type)}</span> <span class="text-xs font-bold text-primary/40 italic">Published on ${escape_html(result.date)}</span></div></div></div> `);
			if (result.fileUrl) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", result.fileUrl)} class="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-black text-sm border border-border-soft hover:bg-secondary hover:text-white hover:border-secondary transition-all shadow-sm">`);
				Download($$renderer, { size: 18 });
				$$renderer.push(`<!----> Download</a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="flex items-center gap-2 px-6 py-3 bg-white text-primary/50 rounded-xl font-black text-sm border border-border-soft shadow-sm">`);
				Download($$renderer, { size: 18 });
				$$renderer.push(`<!----> Details Soon</div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
export { _page as default };
