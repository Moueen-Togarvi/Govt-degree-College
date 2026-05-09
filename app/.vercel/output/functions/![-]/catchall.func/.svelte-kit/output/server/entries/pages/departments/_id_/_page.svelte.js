import { Y as escape_html, _ as unsubscribe_stores, c as ensure_array_like, f as sanitize_props, g as stringify, h as store_get, l as head, m as spread_props, o as derived, p as slot } from "../../../../chunks/dev.js";
import { t as Icon } from "../../../../chunks/Icon.js";
import { t as Book_open } from "../../../../chunks/book-open.js";
import { t as Users } from "../../../../chunks/users.js";
import { t as page } from "../../../../chunks/stores.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region node_modules/lucide-svelte/dist/icons/globe.svelte
function Globe($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "globe" },
		sanitize_props($$props),
		{
			/**
			* @component @name Globe
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgMmExNC41IDE0LjUgMCAwIDAgMCAyMCAxNC41IDE0LjUgMCAwIDAgMC0yMCIgLz4KICA8cGF0aCBkPSJNMiAxMmgyMCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/globe
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
				["path", { "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
				["path", { "d": "M2 12h20" }]
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
//#region node_modules/lucide-svelte/dist/icons/lightbulb.svelte
function Lightbulb($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "lightbulb" },
		sanitize_props($$props),
		{
			/**
			* @component @name Lightbulb
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMTRjLjItMSAuNy0xLjcgMS41LTIuNSAxLS45IDEuNS0yLjIgMS41LTMuNUE2IDYgMCAwIDAgNiA4YzAgMSAuMiAyLjIgMS41IDMuNS43LjcgMS4zIDEuNSAxLjUgMi41IiAvPgogIDxwYXRoIGQ9Ik05IDE4aDYiIC8+CiAgPHBhdGggZD0iTTEwIDIyaDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/lightbulb
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" }],
				["path", { "d": "M9 18h6" }],
				["path", { "d": "M10 22h4" }]
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
//#region node_modules/lucide-svelte/dist/icons/microscope.svelte
function Microscope($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "microscope" },
		sanitize_props($$props),
		{
			/**
			* @component @name Microscope
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNiAxOGg4IiAvPgogIDxwYXRoIGQ9Ik0zIDIyaDE4IiAvPgogIDxwYXRoIGQ9Ik0xNCAyMmE3IDcgMCAxIDAgMC0xNGgtMSIgLz4KICA8cGF0aCBkPSJNOSAxNGgyIiAvPgogIDxwYXRoIGQ9Ik05IDEyYTIgMiAwIDAgMS0yLTJWNmg2djRhMiAyIDAgMCAxLTIgMloiIC8+CiAgPHBhdGggZD0iTTEyIDZWM2ExIDEgMCAwIDAtMS0xSDlhMSAxIDAgMCAwLTEgMXYzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/microscope
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M6 18h8" }],
				["path", { "d": "M3 22h18" }],
				["path", { "d": "M14 22a7 7 0 1 0 0-14h-1" }],
				["path", { "d": "M9 14h2" }],
				["path", { "d": "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" }],
				["path", { "d": "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }]
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
//#region node_modules/lucide-svelte/dist/icons/pen-tool.svelte
function Pen_tool($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "pen-tool" },
		sanitize_props($$props),
		{
			/**
			* @component @name PenTool
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUuNzA3IDIxLjI5M2ExIDEgMCAwIDEtMS40MTQgMGwtMS41ODYtMS41ODZhMSAxIDAgMCAxIDAtMS40MTRsNS41ODYtNS41ODZhMSAxIDAgMCAxIDEuNDE0IDBsMS41ODYgMS41ODZhMSAxIDAgMCAxIDAgMS40MTR6IiAvPgogIDxwYXRoIGQ9Im0xOCAxMy0xLjM3NS02Ljg3NGExIDEgMCAwIDAtLjc0Ni0uNzc2TDMuMjM1IDIuMDI4YTEgMSAwIDAgMC0xLjIwNyAxLjIwN0w1LjM1IDE1Ljg3OWExIDEgMCAwIDAgLjc3Ni43NDZMMTMgMTgiIC8+CiAgPHBhdGggZD0ibTIuMyAyLjMgNy4yODYgNy4yODYiIC8+CiAgPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/pen-tool
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" }],
				["path", { "d": "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" }],
				["path", { "d": "m2.3 2.3 7.286 7.286" }],
				["circle", {
					"cx": "11",
					"cy": "11",
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
//#region node_modules/lucide-svelte/dist/icons/users-round.svelte
function Users_round($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "users-round" },
		sanitize_props($$props),
		{
			/**
			* @component @name UsersRound
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTggMjFhOCA4IDAgMCAwLTE2IDAiIC8+CiAgPGNpcmNsZSBjeD0iMTAiIGN5PSI4IiByPSI1IiAvPgogIDxwYXRoIGQ9Ik0yMiAyMGMwLTMuMzctMi02LjUtNC04YTUgNSAwIDAgMC0uNDUtOC4zIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/users-round
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M18 21a8 8 0 0 0-16 0" }],
				["circle", {
					"cx": "10",
					"cy": "8",
					"r": "5"
				}],
				["path", { "d": "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" }]
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
//#region src/routes/departments/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		const departments = {
			"computer-science": {
				name: "Computer Science",
				icon: Globe,
				desc: "Leading the digital revolution with cutting-edge IT education.",
				hod: "Prof. Muhammad Zahid",
				programs: ["BS Computer Science", "ICS (Physics/Stats)"],
				facilities: [
					"Modern Computer Labs",
					"High-Speed Internet",
					"Digital Library"
				],
				image: "/images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg"
			},
			"mathematics": {
				name: "Mathematics",
				icon: Lightbulb,
				desc: "Fostering analytical thinking and problem-solving skills.",
				hod: "Prof. Shakeel Ahmed",
				programs: ["BS Mathematics", "FSc Pre-Engineering"],
				facilities: ["Dedicated Math Library", "Research Seminar Room"],
				image: "/images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg"
			},
			"english": {
				name: "English",
				icon: Pen_tool,
				desc: "Exploring literature and language to build global communicators.",
				hod: "Prof. Sajjad Haider",
				programs: ["BS English", "FA (General)"],
				facilities: ["Language Lab", "Literary Society"],
				image: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
			},
			"islamiyat": {
				name: "Islamiyat",
				icon: Users,
				desc: "Imparting Islamic values and theological knowledge.",
				hod: "Prof. Hafiz Muhammad Ali",
				programs: ["BS Islamiyat", "Compulsory Islamiyat for all levels"],
				facilities: ["Islamic Research Center"],
				image: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
			},
			"urdu": {
				name: "Urdu",
				icon: Pen_tool,
				desc: "Promoting our national language and its rich literary heritage.",
				hod: "Prof. Dr. Tahir Mahmood",
				programs: ["BS Urdu", "Compulsory Urdu for all levels"],
				facilities: ["Urdu Literary Society"],
				image: "/images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg"
			},
			"chemistry": {
				name: "Chemistry",
				icon: Microscope,
				desc: "Exploring the molecular world through advanced research.",
				hod: "Prof. Muhammad Aslam",
				programs: ["BS Chemistry", "FSc Pre-Medical/Pre-Engineering"],
				facilities: ["Fully Equipped Chemistry Lab", "Chemical Storage"],
				image: "/images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg"
			},
			"zoology": {
				name: "Zoology",
				icon: Microscope,
				desc: "Studying animal life and biological sciences.",
				hod: "Prof. Dr. Nasir Abbas",
				programs: ["BS Zoology", "FSc Pre-Medical"],
				facilities: ["Zoology Museum", "Advanced Bio Lab"],
				image: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg"
			}
		};
		let deptId = derived(() => store_get($$store_subs ??= {}, "$page", page).params.id ?? "");
		let dept = derived(() => departments[deptId()]);
		let breadcrumbs = derived(() => [
			{
				label: "Home",
				href: "/"
			},
			{
				label: "Departments",
				href: "/departments/computer-science"
			},
			{
				label: dept()?.name || "Department",
				href: `/departments/${deptId()}`
			}
		]);
		head("e7116w", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(dept()?.name || "Department")} | GPGC Bahawalnagar</title>`);
			});
		});
		if (dept()) {
			$$renderer.push("<!--[0-->");
			PageHero($$renderer, {
				title: `Dept. of ${stringify(dept().name)}`,
				subtitle: dept().desc,
				breadcrumbs: breadcrumbs(),
				image: dept().image
			});
			$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-16"><div class="lg:col-span-2 space-y-12"><div class="space-y-6"><h2 class="text-3xl font-black text-primary border-l-8 border-secondary pl-6">About the Department</h2> <p class="text-lg text-primary/70 leading-relaxed">The Department of ${escape_html(dept().name)} at Govt Post Graduate College Bahawalnagar is one of the most vibrant and academically rigorous departments. We are dedicated to excellence in teaching and providing students with the skills needed for their professional lives.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6"><h3 class="text-xl font-black text-primary flex items-center gap-3">`);
			Book_open($$renderer, {
				size: 24,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> Programs Offered</h3> <ul class="space-y-3"><!--[-->`);
			const each_array = ensure_array_like(dept().programs);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let prog = each_array[$$index];
				$$renderer.push(`<li class="flex items-center gap-2 font-bold text-primary/70"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> ${escape_html(prog)}</li>`);
			}
			$$renderer.push(`<!--]--></ul></div> <div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6"><h3 class="text-xl font-black text-primary flex items-center gap-3">`);
			Microscope($$renderer, {
				size: 24,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> Key Facilities</h3> <ul class="space-y-3"><!--[-->`);
			const each_array_1 = ensure_array_like(dept().facilities);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let facility = each_array_1[$$index_1];
				$$renderer.push(`<li class="flex items-center gap-2 font-bold text-primary/70"><span class="w-1.5 h-1.5 bg-secondary rounded-full"></span> ${escape_html(facility)}</li>`);
			}
			$$renderer.push(`<!--]--></ul></div></div></div> <div class="space-y-8"><div class="p-8 bg-primary rounded-3xl text-white space-y-6"><h3 class="text-xl font-black italic">Head of Department</h3> <div class="flex items-center gap-4"><div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">`);
			Users_round($$renderer, {
				size: 32,
				class: "text-secondary"
			});
			$$renderer.push(`<!----></div> <div><p class="text-lg font-black">${escape_html(dept().hod)}</p> <p class="text-secondary text-xs font-bold uppercase tracking-widest">HOD, ${escape_html(dept().name)}</p></div></div> <button class="w-full py-4 bg-secondary text-white rounded-xl font-black hover:scale-105 transition-all shadow-xl shadow-secondary/20">Contact HOD</button></div> <div class="p-8 bg-neutral-soft rounded-3xl border border-border-soft space-y-6"><h3 class="text-xl font-black text-primary">Quick Links</h3> <div class="flex flex-col gap-3"><a href="/admissions/how-to-apply" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Admission Guide</a> <a href="/academics/syllabus" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Course Syllabus</a> <a href="/about/faculty" class="text-sm font-bold text-primary/70 hover:text-secondary transition-colors">Faculty Directory</a></div></div></div></div></div></section>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="min-h-screen flex items-center justify-center"><p class="text-2xl font-black text-primary">Department not found.</p></div>`);
		}
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
