import { Y as escape_html, c as ensure_array_like, f as sanitize_props, g as stringify, m as spread_props, n as attr_class, o as derived, p as slot, q as attr } from "../../../chunks/dev.js";
import { t as Icon } from "../../../chunks/Icon.js";
import { t as Bell_ring } from "../../../chunks/bell-ring.js";
import { n as Building_2, t as School } from "../../../chunks/school.js";
import { t as Calendar } from "../../../chunks/calendar.js";
import { t as File_text } from "../../../chunks/file-text.js";
import { t as Graduation_cap } from "../../../chunks/graduation-cap.js";
import { t as Scroll_text } from "../../../chunks/scroll-text.js";
//#region node_modules/lucide-svelte/dist/icons/arrow-left.svelte
function Arrow_left($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "arrow-left" },
		sanitize_props($$props),
		{
			/**
			* @component @name ArrowLeft
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTIgMTktNy03IDctNyIgLz4KICA8cGF0aCBkPSJNMTkgMTJINSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/arrow-left
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]],
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
//#region node_modules/lucide-svelte/dist/icons/image.svelte
function Image($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "image" },
		sanitize_props($$props),
		{
			/**
			* @component @name Image
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIgLz4KICA8cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMNiAyMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/image
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["rect", {
					"width": "18",
					"height": "18",
					"x": "3",
					"y": "3",
					"rx": "2",
					"ry": "2"
				}],
				["circle", {
					"cx": "9",
					"cy": "9",
					"r": "2"
				}],
				["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
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
//#region node_modules/lucide-svelte/dist/icons/megaphone.svelte
function Megaphone($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "megaphone" },
		sanitize_props($$props),
		{
			/**
			* @component @name Megaphone
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgNmExMyAxMyAwIDAgMCA4LjQtMi44QTEgMSAwIDAgMSAyMSA0djEyYTEgMSAwIDAgMS0xLjYuOEExMyAxMyAwIDAgMCAxMSAxNEg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yeiIgLz4KICA8cGF0aCBkPSJNNiAxNGExMiAxMiAwIDAgMCAyLjQgNy4yIDIgMiAwIDAgMCAzLjItMi40QTggOCAwIDAgMSAxMCAxNCIgLz4KICA8cGF0aCBkPSJNOCA2djgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/megaphone
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" }],
				["path", { "d": "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" }],
				["path", { "d": "M8 6v8" }]
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
//#region node_modules/lucide-svelte/dist/icons/pencil.svelte
function Pencil($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "pencil" },
		sanitize_props($$props),
		{
			/**
			* @component @name Pencil
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuMTc0IDYuODEyYTEgMSAwIDAgMC0zLjk4Ni0zLjk4N0wzLjg0MiAxNi4xNzRhMiAyIDAgMCAwLS41LjgzbC0xLjMyMSA0LjM1MmEuNS41IDAgMCAwIC42MjMuNjIybDQuMzUzLTEuMzJhMiAyIDAgMCAwIC44My0uNDk3eiIgLz4KICA8cGF0aCBkPSJtMTUgNSA0IDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/pencil
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" }], ["path", { "d": "m15 5 4 4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/plus.svelte
function Plus($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "plus" },
		sanitize_props($$props),
		{
			/**
			* @component @name Plus
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/plus
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]],
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
//#region node_modules/lucide-svelte/dist/icons/trash-2.svelte
function Trash_2($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "trash-2" },
		sanitize_props($$props),
		{
			/**
			* @component @name Trash2
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTQgMTF2NiIgLz4KICA8cGF0aCBkPSJNMTkgNnYxNGEyIDIgMCAwIDEtMiAySDdhMiAyIDAgMCAxLTItMlY2IiAvPgogIDxwYXRoIGQ9Ik0zIDZoMTgiIC8+CiAgPHBhdGggZD0iTTggNlY0YTIgMiAwIDAgMSAyLTJoNGEyIDIgMCAwIDEgMiAydjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trash-2
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M10 11v6" }],
				["path", { "d": "M14 11v6" }],
				["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
				["path", { "d": "M3 6h18" }],
				["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
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
//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const sections = [
			{
				key: "announcements",
				label: "Announcements",
				singular: "Announcement",
				description: "Official notices and updates",
				icon: Megaphone
			},
			{
				key: "noticeBoard",
				label: "Notice Board",
				singular: "Notice",
				description: "Homepage pinned board slips",
				icon: Scroll_text
			},
			{
				key: "latestNews",
				label: "Latest News",
				singular: "News Title",
				description: "Navbar ke neeche chalne wali news line",
				icon: Bell_ring
			},
			{
				key: "events",
				label: "Events",
				singular: "Event",
				description: "Upcoming campus activities",
				icon: Calendar
			},
			{
				key: "results",
				label: "Results",
				singular: "Result",
				description: "Exam result records and files",
				icon: File_text
			},
			{
				key: "media",
				label: "Media Library",
				singular: "Media File",
				description: "Uploaded images and documents",
				icon: Image
			},
			{
				key: "departments",
				label: "Departments",
				singular: "Department",
				description: "Faculty departments and their slugs",
				icon: Building_2
			},
			{
				key: "faculty",
				label: "Faculty Teachers",
				singular: "Teacher",
				description: "Teachers shown on the faculty page",
				icon: Graduation_cap
			}
		];
		const facultySubjects = [
			"Computer Science",
			"Artificial Intelligence",
			"English",
			"English Literature",
			"Urdu",
			"Mathematics",
			"Physics",
			"Chemistry",
			"Zoology",
			"Botany",
			"Islamiyat",
			"Pakistan Studies",
			"Economics"
		];
		function getSectionHref(section) {
			return `/admin?section=${section}`;
		}
		function isImage(url) {
			return /\.(png|jpe?g|webp|gif)$/i.test(url);
		}
		function formatSize(bytes) {
			if (bytes < 1024) return `${bytes} B`;
			if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
			return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
		}
		function formatDateTimeLocal(value) {
			return value ? value.slice(0, 16) : "";
		}
		function isExpired(expiryIsoDate) {
			return Boolean(expiryIsoDate && new Date(expiryIsoDate).getTime() < Date.now());
		}
		function getCount(section) {
			switch (section) {
				case "announcements": return data.announcements.length;
				case "noticeBoard": return data.noticeBoardItems.length;
				case "latestNews": return data.latestNewsItems.length;
				case "events": return data.events.length;
				case "results": return data.results.length;
				case "media": return data.media.length;
				case "departments": return data.departments.length;
				case "faculty": return data.facultyMembers.length;
			}
		}
		function hasItems(section) {
			return getCount(section) > 0;
		}
		function getEmptyTitle(section) {
			switch (section) {
				case "announcements": return "No announcements yet";
				case "noticeBoard": return "No notice board slips yet";
				case "latestNews": return "No latest news titles yet";
				case "events": return "No events yet";
				case "results": return "No results yet";
				case "media": return "No media uploads yet";
				case "departments": return "No departments yet";
				case "faculty": return "No teachers yet";
			}
		}
		function getEmptyDescription(section) {
			switch (section) {
				case "announcements": return "Create the first announcement and it will appear here in row format.";
				case "noticeBoard": return "Add pinned notices for the homepage board from here.";
				case "latestNews": return "Add only title text for the latest news ticker under the navbar.";
				case "events": return "Add campus events here and they will appear in a row list.";
				case "results": return "Publish result records and attached files from this section.";
				case "media": return "Upload images and documents for reuse across the site.";
				case "departments": return "Create departments first so teachers can be assigned properly.";
				case "faculty": return "Add teachers here and they will feed the public faculty page.";
			}
		}
		function summarizeFacultyRoles(member) {
			const roles = [];
			if (member.isHod) roles.push("HOD");
			if (member.isCoordinator) roles.push("Coordinator");
			if (member.isTeachingStaff) roles.push("Teaching Staff");
			return roles.join(" • ") || "No role selected";
		}
		const currentSection = derived(() => {
			const candidate = form?.section ?? data.activeSection;
			return sections.find((section) => section.key === candidate)?.key ?? null;
		});
		const activeMeta = derived(() => {
			if (!currentSection()) return null;
			return sections.find((section) => section.key === currentSection()) ?? null;
		});
		$$renderer.push(`<section class="mx-auto max-w-7xl px-6 py-10"><datalist id="faculty-subjects"><!--[-->`);
		const each_array = ensure_array_like(facultySubjects);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let subject = each_array[$$index];
			$$renderer.option({ value: subject }, ($$renderer) => {});
		}
		$$renderer.push(`<!--]--></datalist> <div class="space-y-8"><div><p class="text-sm font-black uppercase tracking-[0.32em] text-secondary">Admin Workspace</p> <h1 class="mt-3 text-4xl font-black text-primary lg:text-5xl">Manage site content clearly.</h1> <p class="mt-4 max-w-3xl text-base font-medium leading-8 text-slate-500">Open a content area, then manage its entries in a clear row-by-row list.</p></div> `);
		if (!data.databaseConnected) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-bold text-amber-900">Neon database is waqt connect nahi ho rahi. Panel load ho gaya hai, lekin live content requests fail ho sakti hain.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.message) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`rounded-[1.5rem] border px-5 py-4 text-sm font-bold ${stringify(form.success ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900")}`)}>${escape_html(form.message)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!currentSection()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
			const each_array_1 = ensure_array_like(sections);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let section = each_array_1[$$index_1];
				$$renderer.push(`<a${attr("href", getSectionHref(section.key))} class="rounded-[1.75rem] border border-slate-200 bg-white p-6 text-left text-primary shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-[0_20px_60px_rgba(13,93,86,0.12)]"><div class="flex items-start justify-between gap-4"><div class="rounded-2xl bg-primary/10 p-3 text-primary">`);
				if (section.icon) {
					$$renderer.push("<!--[-->");
					section.icon($$renderer, { size: 22 });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</div> <p class="text-3xl font-black text-primary">${escape_html(getCount(section.key))}</p></div> <h2 class="mt-6 text-2xl font-black text-primary">${escape_html(section.label)}</h2> <p class="mt-2 text-sm font-medium leading-7 text-slate-500">${escape_html(section.description)}</p></a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else if (activeMeta()) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8"><div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div class="flex items-start gap-4"><a href="/admin" class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-primary transition hover:border-secondary hover:text-secondary">`);
			Arrow_left($$renderer, { size: 20 });
			$$renderer.push(`<!----></a> <div class="flex items-start gap-4"><div class="rounded-2xl bg-primary/10 p-3 text-primary">`);
			if (activeMeta.icon) {
				$$renderer.push("<!--[-->");
				activeMeta.icon($$renderer, { size: 24 });
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div> <div><p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">Section Detail</p> <h2 class="mt-2 text-3xl font-black text-primary">${escape_html(activeMeta().label)}</h2> <p class="mt-2 text-sm font-medium leading-7 text-slate-500">${escape_html(activeMeta().description)}</p></div></div></div> <div class="flex flex-wrap items-center gap-3"><div class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-slate-500">${escape_html(getCount(currentSection()))} items</div> <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-secondary">`);
			Plus($$renderer, { size: 16 });
			$$renderer.push(`<!----> Add ${escape_html(activeMeta().singular)}</button></div></div> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="mt-8 space-y-3">`);
			if (!hasItems(currentSection())) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center"><p class="text-xs font-black uppercase tracking-[0.3em] text-secondary">${escape_html(activeMeta().label)}</p> <h3 class="mt-3 text-2xl font-black text-primary">${escape_html(getEmptyTitle(currentSection()))}</h3> <p class="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">${escape_html(getEmptyDescription(currentSection()))}</p> `);
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<button type="button" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-secondary">`);
				Plus($$renderer, { size: 16 });
				$$renderer.push(`<!----> Add ${escape_html(activeMeta().singular)}</button>`);
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (currentSection() === "announcements") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<!--[-->`);
				const each_array_3 = ensure_array_like(data.announcements);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let item = each_array_3[$$index_3];
					$$renderer.push(`<form method="POST" action="?/updateAnnouncement" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", item.id)}/> <input type="hidden" name="section" value="announcements"/> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_220px_220px_auto] xl:items-start"><input name="title"${attr("value", item.title)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="category"${attr("value", item.category)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="date" type="datetime-local"${attr("value", formatDateTimeLocal(item.isoDate))} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <div class="flex flex-wrap gap-2 xl:justify-end"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteAnnouncement" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div> <textarea name="description" rows="3" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-4">`);
					const $$body = escape_html(item.description);
					if ($$body) $$renderer.push(`${$$body}`);
					$$renderer.push(`</textarea></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "noticeBoard") {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<!--[-->`);
				const each_array_4 = ensure_array_like(data.noticeBoardItems);
				for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
					let item = each_array_4[$$index_4];
					$$renderer.push(`<form method="POST" action="?/updateNoticeBoard" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", item.id)}/> <input type="hidden" name="section" value="noticeBoard"/> <div class="mb-3 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">${escape_html(item.tag)}</span> <span${attr_class(`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] ${isExpired(item.expiryIsoDate) ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`)}>${escape_html(isExpired(item.expiryIsoDate) ? "Expired" : "Active")}</span></div> <div class="flex flex-wrap gap-2"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteNoticeBoard" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_180px_120px_220px_220px]"><input name="title"${attr("value", item.title)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="tag"${attr("value", item.tag)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="sortOrder" type="number"${attr("value", item.sortOrder)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="date" type="datetime-local"${attr("value", formatDateTimeLocal(item.isoDate))} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="expiryDate" type="datetime-local"${attr("value", formatDateTimeLocal(item.expiryIsoDate))} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <textarea name="message" rows="3" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-5">`);
					const $$body_1 = escape_html(item.message);
					if ($$body_1) $$renderer.push(`${$$body_1}`);
					$$renderer.push(`</textarea></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "latestNews") {
				$$renderer.push("<!--[2-->");
				$$renderer.push(`<!--[-->`);
				const each_array_5 = ensure_array_like(data.latestNewsItems);
				for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
					let item = each_array_5[$$index_5];
					$$renderer.push(`<form method="POST" action="?/updateLatestNews" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", item.id)}/> <input type="hidden" name="section" value="latestNews"/> <div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_140px_auto] xl:items-start"><input name="title"${attr("value", item.title)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="sortOrder" type="number"${attr("value", item.sortOrder)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <div class="flex flex-wrap gap-2 xl:justify-end"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteLatestNews" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "events") {
				$$renderer.push("<!--[3-->");
				$$renderer.push(`<!--[-->`);
				const each_array_6 = ensure_array_like(data.events);
				for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
					let event = each_array_6[$$index_6];
					$$renderer.push(`<form method="POST" action="?/updateEvent" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", event.id)}/> <input type="hidden" name="section" value="events"/> <div class="mb-3 flex flex-wrap items-center justify-between gap-3"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">${escape_html(event.status)}</span> <div class="flex flex-wrap gap-2"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteEvent" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_160px_220px_180px_auto] xl:items-start"><input name="title"${attr("value", event.title)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="date" type="date"${attr("value", event.isoDate.slice(0, 10))} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="time"${attr("value", event.time)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="location"${attr("value", event.location)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="status"${attr("value", event.status)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="imageUrl"${attr("value", event.imageUrl ?? "")} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold xl:col-span-2"/></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "results") {
				$$renderer.push("<!--[4-->");
				$$renderer.push(`<!--[-->`);
				const each_array_7 = ensure_array_like(data.results);
				for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
					let result = each_array_7[$$index_7];
					$$renderer.push(`<form method="POST" action="?/updateResult" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", result.id)}/> <input type="hidden" name="section" value="results"/> <div class="mb-3 flex flex-wrap items-center justify-between gap-3"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">${escape_html(result.type)}</span> <div class="flex flex-wrap gap-2"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteResult" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_200px_220px_minmax(0,1fr)] xl:items-start"><input name="title"${attr("value", result.title)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="publishDate" type="date"${attr("value", result.isoDate.slice(0, 10))} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="resultType"${attr("value", result.type)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="fileUrl"${attr("value", result.fileUrl ?? "")} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="fileUpload" type="file" accept="image/*,application/pdf" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold xl:col-span-2"/></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "media") {
				$$renderer.push("<!--[5-->");
				$$renderer.push(`<!--[-->`);
				const each_array_8 = ensure_array_like(data.media);
				for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
					let file = each_array_8[$$index_8];
					$$renderer.push(`<div class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><div class="grid gap-4 xl:grid-cols-[96px_minmax(0,1fr)_120px_110px_auto] xl:items-center">`);
					if (isImage(file.url)) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<img${attr("src", file.url)}${attr("alt", file.name)} class="h-24 w-24 rounded-2xl object-cover"/>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div class="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">`);
						File_text($$renderer, { size: 34 });
						$$renderer.push(`<!----></div>`);
					}
					$$renderer.push(`<!--]--> <div class="min-w-0"><p class="truncate text-base font-black text-primary">${escape_html(file.name)}</p> <p class="mt-1 text-sm font-medium text-slate-500">${escape_html(file.url)}</p></div> <p class="text-sm font-bold text-slate-500">${escape_html(formatSize(file.size))}</p> <a${attr("href", file.url)} target="_blank" class="text-sm font-black uppercase tracking-[0.18em] text-secondary">Open</a> <form method="POST" action="?/deleteMedia" class="flex justify-start xl:justify-end"><input type="hidden" name="fileName"${attr("value", file.name)}/> <input type="hidden" name="section" value="media"/> <button class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></form></div></div>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "departments") {
				$$renderer.push("<!--[6-->");
				$$renderer.push(`<!--[-->`);
				const each_array_9 = ensure_array_like(data.departments);
				for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
					let department = each_array_9[$$index_9];
					$$renderer.push(`<form method="POST" action="?/updateDepartment" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", department.id)}/> <input type="hidden" name="section" value="departments"/> <div class="mb-3 flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">${escape_html(department.slug)}</span> <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary">${escape_html(data.facultyMembers.filter((member) => member.departmentId === department.id).length)} teachers</span></div> <div class="flex flex-wrap gap-2"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteDepartment" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_220px]"><input name="name"${attr("value", department.name)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="urduName"${attr("value", department.urduName)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="slug"${attr("value", department.slug)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else if (currentSection() === "faculty") {
				$$renderer.push("<!--[7-->");
				$$renderer.push(`<!--[-->`);
				const each_array_10 = ensure_array_like(data.facultyMembers);
				for (let $$index_11 = 0, $$length = each_array_10.length; $$index_11 < $$length; $$index_11++) {
					let member = each_array_10[$$index_11];
					$$renderer.push(`<form method="POST" action="?/updateFaculty" enctype="multipart/form-data" class="rounded-[1.5rem] border border-slate-200 bg-white p-5"><input type="hidden" name="id"${attr("value", member.id)}/> <input type="hidden" name="section" value="faculty"/> <div class="mb-4 flex flex-wrap items-start justify-between gap-3"><div class="flex items-center gap-3"><div class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">`);
					if (isImage(member.imageUrl)) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<img${attr("src", member.imageUrl)}${attr("alt", member.name)} class="h-full w-full object-cover"/>`);
					} else {
						$$renderer.push("<!--[-1-->");
						School($$renderer, {
							size: 20,
							class: "text-slate-500"
						});
					}
					$$renderer.push(`<!--]--></div> <div><p class="text-base font-black text-primary">${escape_html(member.name)}</p> <p class="mt-1 text-sm font-medium text-slate-500">${escape_html(member.departmentName)} • ${escape_html(member.subject)}</p> <p class="mt-1 text-xs font-black uppercase tracking-[0.18em] text-secondary">${escape_html(summarizeFacultyRoles(member))}</p></div></div> <div class="flex flex-wrap gap-2"><button class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-black text-white hover:bg-secondary">`);
					Pencil($$renderer, { size: 16 });
					$$renderer.push(`<!----> Save</button> <button formaction="?/deleteFaculty" class="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white hover:bg-rose-700">`);
					Trash_2($$renderer, { size: 16 });
					$$renderer.push(`<!----> Delete</button></div></div> <div class="grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_220px_220px]"><input name="name"${attr("value", member.name)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="education"${attr("value", member.education)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <select name="departmentId" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"><!--[-->`);
					const each_array_11 = ensure_array_like(data.departments);
					for (let $$index_10 = 0, $$length = each_array_11.length; $$index_10 < $$length; $$index_10++) {
						let department = each_array_11[$$index_10];
						$$renderer.option({
							value: department.id,
							selected: department.id === member.departmentId
						}, ($$renderer) => {
							$$renderer.push(`${escape_html(department.name)}`);
						});
					}
					$$renderer.push(`<!--]--></select> <input name="subject"${attr("value", member.subject)} list="faculty-subjects" class="rounded-xl border border-slate-200 px-4 py-3 font-semibold"/> <input name="imageUrl"${attr("value", member.imageUrl)} class="rounded-xl border border-slate-200 px-4 py-3 font-semibold xl:col-span-2"/> <input name="imageFile" type="file" accept="image/*" class="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 font-semibold"/> <div class="flex flex-wrap gap-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><label class="inline-flex items-center gap-3 text-sm font-black text-primary"><input name="isHod" type="checkbox"${attr("checked", member.isHod, true)} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"/> Is HOD</label> <label class="inline-flex items-center gap-3 text-sm font-black text-primary"><input name="isCoordinator" type="checkbox"${attr("checked", member.isCoordinator, true)} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"/> Is Coordinator</label> <label class="inline-flex items-center gap-3 text-sm font-black text-primary"><input name="isTeachingStaff" type="checkbox"${attr("checked", member.isTeachingStaff, true)} class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"/> Teaching Staff</label></div></div></form>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
export { _page as default };
