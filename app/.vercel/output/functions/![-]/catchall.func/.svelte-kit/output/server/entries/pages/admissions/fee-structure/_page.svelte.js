import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, p as slot } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/banknote.svelte
function Banknote($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "banknote" },
		sanitize_props($$props),
		{
			/**
			* @component @name Banknote
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHg9IjIiIHk9IjYiIHJ4PSIyIiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIC8+CiAgPHBhdGggZD0iTTYgMTJoLjAxTTE4IDEyaC4wMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/banknote
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["rect", {
					"width": "20",
					"height": "12",
					"x": "2",
					"y": "6",
					"rx": "2"
				}],
				["circle", {
					"cx": "12",
					"cy": "12",
					"r": "2"
				}],
				["path", { "d": "M6 12h.01M18 12h.01" }]
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
//#region src/routes/admissions/fee-structure/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "Admissions",
			href: "/admissions/how-to-apply"
		},
		{
			label: "Fee Structure",
			href: "/admissions/fee-structure"
		}
	];
	const fees = [
		{
			category: "Intermediate (11th & 12th)",
			fee: "Free",
			detail: "Intermediate classes are free under the Government of Punjab."
		},
		{
			category: "BS Morning Program",
			fee: "Rs. 8,000",
			detail: "Current announced fee for the morning BS program."
		},
		{
			category: "BS Evening Program",
			fee: "Rs. 20,000",
			detail: "Current announced fee for the evening BS program."
		}
	];
	head("ixmyie", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Fee Structure | Admissions | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Fee Structure",
		subtitle: "Affordable quality education for every student.",
		breadcrumbs,
		image: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto space-y-12"><div class="overflow-hidden rounded-3xl border border-border-soft shadow-sm"><table class="w-full text-left"><thead class="bg-primary text-white"><tr><th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Program Category</th><th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Current Fee</th><th class="px-8 py-6 text-sm font-black uppercase tracking-widest">Details</th></tr></thead><tbody class="divide-y divide-neutral-100"><!--[-->`);
	const each_array = ensure_array_like(fees);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let item = each_array[$$index];
		$$renderer.push(`<tr class="hover:bg-neutral-soft transition-colors group"><td class="px-8 py-8 font-black text-primary text-xl">${escape_html(item.category)}</td><td class="px-8 py-8 font-bold text-primary/70">${escape_html(item.fee)}</td><td class="px-8 py-8"><p class="max-w-md text-sm font-medium leading-7 text-primary/70">${escape_html(item.detail)}</p></td></tr>`);
	}
	$$renderer.push(`<!--]--></tbody></table></div> <div class="flex items-start gap-6 p-10 bg-secondary/5 rounded-3xl border border-secondary/20 italic text-primary/70 font-medium">`);
	Banknote($$renderer, {
		size: 32,
		class: "text-secondary shrink-0"
	});
	$$renderer.push(`<!----> <p>Note: Fee structure har saal change ho sakti hai. Final fee amount admission ke waqt official challan ya college notice ke mutabiq apply hogi.</p></div></div></div></section>`);
}
//#endregion
export { _page as default };
