import { f as sanitize_props, l as head, m as spread_props, p as slot } from "../../../chunks/dev.js";
import { t as Icon } from "../../../chunks/Icon.js";
import { t as Bell_ring } from "../../../chunks/bell-ring.js";
import { t as PageHero } from "../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/hard-hat.svelte
function Hard_hat($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "hard-hat" },
		sanitize_props($$props),
		{
			/**
			* @component @name HardHat
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTBWNWExIDEgMCAwIDEgMS0xaDJhMSAxIDAgMCAxIDEgMXY1IiAvPgogIDxwYXRoIGQ9Ik0xNCA2YTYgNiAwIDAgMSA2IDZ2MyIgLz4KICA8cGF0aCBkPSJNNCAxNXYtM2E2IDYgMCAwIDEgNi02IiAvPgogIDxyZWN0IHg9IjIiIHk9IjE1IiB3aWR0aD0iMjAiIGhlaWdodD0iNCIgcng9IjEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/hard-hat
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" }],
				["path", { "d": "M14 6a6 6 0 0 1 6 6v3" }],
				["path", { "d": "M4 15v-3a6 6 0 0 1 6-6" }],
				["rect", {
					"x": "2",
					"y": "15",
					"width": "20",
					"height": "4",
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
//#region src/routes/student-portal/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [{
		label: "Home",
		href: "/"
	}, {
		label: "Student Portal",
		href: "/student-portal"
	}];
	head("143w9lh", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Student Portal | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Student Portal",
		subtitle: "The digital gateway for students.",
		breadcrumbs,
		image: "/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-32 bg-white relative overflow-hidden"><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div> <div class="container mx-auto px-4 lg:px-8 relative z-10 text-center"><div class="max-w-2xl mx-auto space-y-8"><div class="w-24 h-24 bg-primary text-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/20 rotate-12">`);
	Hard_hat($$renderer, { size: 48 });
	$$renderer.push(`<!----></div> <div class="space-y-4"><h2 class="text-4xl md:text-5xl font-black text-primary tracking-tight">Coming Soon</h2> <p class="text-xl text-primary/70 font-medium">We are currently building a comprehensive and state-of-the-art Student Management System.</p></div> <div class="bg-neutral-soft p-8 rounded-3xl border border-border-soft inline-block max-w-md mx-auto text-left space-y-4 mt-8"><div class="flex items-center gap-3">`);
	Bell_ring($$renderer, {
		size: 20,
		class: "text-secondary"
	});
	$$renderer.push(`<!----> <h3 class="text-lg font-black text-primary">What to expect:</h3></div> <ul class="space-y-2 text-primary/70 font-medium"><li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Real-time attendance tracking</li> <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Online fee voucher generation</li> <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Course registration and grading</li> <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> Timetable and announcements</li></ul></div> <div class="pt-8"><a href="/" class="inline-block px-8 py-4 bg-primary text-white rounded-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">Return to Homepage</a></div></div></div></section>`);
}
//#endregion
export { _page as default };
