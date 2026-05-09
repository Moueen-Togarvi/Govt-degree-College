import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, p as slot } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as File_text } from "../../../../chunks/file-text.js";
import { t as Send } from "../../../../chunks/send.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/circle-check.svelte
function Circle_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "circle-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name CircleCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtOSAxMiAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}], ["path", { "d": "m9 12 2 2 4-4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/user-check.svelte
function User_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "user-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name UserCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgMTEgMiAyIDQtNCIgLz4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/user-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "m16 11 2 2 4-4" }],
				["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
				["circle", {
					"cx": "9",
					"cy": "7",
					"r": "4"
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
//#region src/routes/admissions/how-to-apply/+page.svelte
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
			label: "How to Apply",
			href: "/admissions/how-to-apply"
		}
	];
	const steps = [
		{
			title: "Visit College Admin Office",
			desc: "Visit the college admission office first and get the prospectus with complete admission guidance.",
			icon: User_check
		},
		{
			title: "Fill Information",
			desc: "Complete the admission form with your personal and academic details according to your previous result.",
			icon: File_text
		},
		{
			title: "Submit Documents",
			desc: "Attach required documents including result card, photographs, and CNIC or B-Form copy.",
			icon: Send
		},
		{
			title: "Verification & Confirmation",
			desc: "Submit the form for verification and follow the office instructions for final admission confirmation.",
			icon: Circle_check
		}
	];
	head("dw1bot", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>How to Apply | Admissions | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "How to Apply",
		subtitle: "Follow these simple steps to start your journey with us.",
		breadcrumbs,
		image: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="max-w-4xl mx-auto"><div class="grid grid-cols-1 gap-12"><!--[-->`);
	const each_array = ensure_array_like(steps);
	for (let i = 0, $$length = each_array.length; i < $$length; i++) {
		let step = each_array[i];
		$$renderer.push(`<div class="flex flex-col md:flex-row gap-8 items-center bg-neutral-soft p-10 rounded-3xl border border-border-soft group hover:border-secondary transition-all"><div class="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary transition-colors relative">`);
		if (step.icon) {
			$$renderer.push("<!--[-->");
			step.icon($$renderer, { size: 36 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` <div class="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-black text-sm">${escape_html(i + 1)}</div></div> <div class="space-y-3 text-center md:text-left"><h3 class="text-2xl font-black text-primary">${escape_html(step.title)}</h3> <p class="text-lg text-primary/70 leading-relaxed">${escape_html(step.desc)}</p></div></div>`);
	}
	$$renderer.push(`<!--]--></div> <div class="mt-20 p-10 bg-primary rounded-3xl text-white text-center space-y-6"><h3 class="text-2xl font-black italic">"Start with the college admission office for proper guidance."</h3> <p class="text-white/70 max-w-2xl mx-auto">Students can collect the prospectus, confirm eligibility, and receive admission instructions directly from the college administration office.</p></div></div></div></section>`);
}
//#endregion
export { _page as default };
