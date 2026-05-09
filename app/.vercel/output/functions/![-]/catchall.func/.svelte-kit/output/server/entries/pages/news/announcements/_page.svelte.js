import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, p as slot } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as Calendar } from "../../../../chunks/calendar.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/chevron-right.svelte
function Chevron_right($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "chevron-right" },
		sanitize_props($$props),
		{
			/**
			* @component @name ChevronRight
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m9 18 6-6-6-6" }]],
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
//#region src/routes/news/announcements/+page.svelte
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
				label: "Announcements",
				href: "/news/announcements"
			}
		];
		let { data } = $$props;
		head("1qihx1x", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Announcements | News | GPGC Bahawalnagar</title>`);
			});
		});
		PageHero($$renderer, {
			title: "Latest Announcements",
			subtitle: "Stay updated with the latest news and official notices from the college.",
			breadcrumbs,
			image: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
		});
		$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto space-y-8"><!--[-->`);
		const each_array = ensure_array_like(data.announcements);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft hover:border-secondary hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8 items-start"><div class="flex-shrink-0 w-24 h-24 bg-primary rounded-2xl flex flex-col items-center justify-center text-white shadow-lg"><span class="text-xs font-bold uppercase tracking-tighter opacity-70">${escape_html(item.date.split(" ")[0])}</span> <span class="text-2xl font-black">${escape_html(item.date.split(" ")[1].replace(",", ""))}</span> <span class="text-xs font-bold uppercase tracking-tighter opacity-70">${escape_html(item.date.split(" ")[2])}</span></div> <div class="flex-grow space-y-4"><div class="flex items-center gap-3"><span class="px-3 py-1 bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest rounded-full">${escape_html(item.category)}</span> <div class="flex items-center gap-2 text-primary/50 text-xs font-bold">`);
			Calendar($$renderer, { size: 14 });
			$$renderer.push(`<!----> <span>${escape_html(item.date)}</span></div></div> <h3 class="text-2xl font-black text-primary group-hover:text-secondary transition-colors leading-tight">${escape_html(item.title)}</h3> <p class="text-primary/70 leading-relaxed font-medium">${escape_html(item.description)}</p> <div class="inline-flex items-center gap-2 text-sm font-black text-primary/70">Official Notice `);
			Chevron_right($$renderer, { size: 16 });
			$$renderer.push(`<!----></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
export { _page as default };
