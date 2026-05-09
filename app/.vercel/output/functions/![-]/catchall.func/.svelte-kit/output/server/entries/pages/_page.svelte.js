import "../../chunks/index-server.js";
import { Y as escape_html, c as ensure_array_like, f as sanitize_props, l as head, m as spread_props, n as attr_class, o as derived, p as slot, q as attr, r as attr_style } from "../../chunks/dev.js";
import { o as fallbackTickerAnnouncements, r as fallbackNoticeBoardItems } from "../../chunks/fallback.js";
import { t as Icon } from "../../chunks/Icon.js";
import { t as Arrow_right } from "../../chunks/arrow-right.js";
import { t as Bell_ring } from "../../chunks/bell-ring.js";
import { n as Building_2, t as School } from "../../chunks/school.js";
import { t as File_text } from "../../chunks/file-text.js";
import { t as Graduation_cap } from "../../chunks/graduation-cap.js";
import { t as Phone_call } from "../../chunks/phone-call.js";
import { t as Scroll_text } from "../../chunks/scroll-text.js";
import { t as Users } from "../../chunks/users.js";
//#region node_modules/lucide-svelte/dist/icons/arrow-down.svelte
function Arrow_down($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "arrow-down" },
		sanitize_props($$props),
		{
			/**
			* @component @name ArrowDown
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KICA8cGF0aCBkPSJtMTkgMTItNyA3LTctNyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/arrow-down
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M12 5v14" }], ["path", { "d": "m19 12-7 7-7-7" }]],
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
//#region node_modules/lucide-svelte/dist/icons/badge-check.svelte
function Badge_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "badge-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name BadgeCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMy44NSA4LjYyYTQgNCAwIDAgMSA0Ljc4LTQuNzcgNCA0IDAgMCAxIDYuNzQgMCA0IDQgMCAwIDEgNC43OCA0Ljc4IDQgNCAwIDAgMSAwIDYuNzQgNCA0IDAgMCAxLTQuNzcgNC43OCA0IDQgMCAwIDEtNi43NSAwIDQgNCAwIDAgMS00Ljc4LTQuNzcgNCA0IDAgMCAxIDAtNi43NloiIC8+CiAgPHBhdGggZD0ibTkgMTIgMiAyIDQtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/badge-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }], ["path", { "d": "m9 12 2 2 4-4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/calendar-days.svelte
function Calendar_days($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "calendar-days" },
		sanitize_props($$props),
		{
			/**
			* @component @name CalendarDays
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiAvPgogIDxwYXRoIGQ9Ik0zIDEwaDE4IiAvPgogIDxwYXRoIGQ9Ik04IDE0aC4wMSIgLz4KICA8cGF0aCBkPSJNMTIgMTRoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xNiAxNGguMDEiIC8+CiAgPHBhdGggZD0iTTggMThoLjAxIiAvPgogIDxwYXRoIGQ9Ik0xMiAxOGguMDEiIC8+CiAgPHBhdGggZD0iTTE2IDE4aC4wMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/calendar-days
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M8 2v4" }],
				["path", { "d": "M16 2v4" }],
				["rect", {
					"width": "18",
					"height": "18",
					"x": "3",
					"y": "4",
					"rx": "2"
				}],
				["path", { "d": "M3 10h18" }],
				["path", { "d": "M8 14h.01" }],
				["path", { "d": "M12 14h.01" }],
				["path", { "d": "M16 14h.01" }],
				["path", { "d": "M8 18h.01" }],
				["path", { "d": "M12 18h.01" }],
				["path", { "d": "M16 18h.01" }]
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
//#region node_modules/lucide-svelte/dist/icons/clipboard-check.svelte
function Clipboard_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "clipboard-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name ClipboardCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI0IiB4PSI4IiB5PSIyIiByeD0iMSIgcnk9IjEiIC8+CiAgPHBhdGggZD0iTTE2IDRoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgyIiAvPgogIDxwYXRoIGQ9Im05IDE0IDIgMiA0LTQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/clipboard-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["rect", {
					"width": "8",
					"height": "4",
					"x": "8",
					"y": "2",
					"rx": "1",
					"ry": "1"
				}],
				["path", { "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
				["path", { "d": "m9 14 2 2 4-4" }]
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
//#region node_modules/lucide-svelte/dist/icons/clock-3.svelte
function Clock_3($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "clock-3" },
		sanitize_props($$props),
		{
			/**
			* @component @name Clock3
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgNnY2aDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/clock-3
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
			}], ["path", { "d": "M12 6v6h4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/quote.svelte
function Quote($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "quote" },
		sanitize_props($$props),
		{
			/**
			* @component @name Quote
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgM2EyIDIgMCAwIDAtMiAydjZhMiAyIDAgMCAwIDIgMiAxIDEgMCAwIDEgMSAxdjFhMiAyIDAgMCAxLTIgMiAxIDEgMCAwIDAtMSAxdjJhMSAxIDAgMCAwIDEgMSA2IDYgMCAwIDAgNi02VjVhMiAyIDAgMCAwLTItMnoiIC8+CiAgPHBhdGggZD0iTTUgM2EyIDIgMCAwIDAtMiAydjZhMiAyIDAgMCAwIDIgMiAxIDEgMCAwIDEgMSAxdjFhMiAyIDAgMCAxLTIgMiAxIDEgMCAwIDAtMSAxdjJhMSAxIDAgMCAwIDEgMSA2IDYgMCAwIDAgNi02VjVhMiAyIDAgMCAwLTItMnoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/quote
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" }], ["path", { "d": "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" }]],
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
//#region node_modules/lucide-svelte/dist/icons/shield-check.svelte
function Shield_check($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "shield-check" },
		sanitize_props($$props),
		{
			/**
			* @component @name ShieldCheck
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+CiAgPHBhdGggZD0ibTkgMTIgMiAyIDQtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/shield-check
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "m9 12 2 2 4-4" }]],
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
//#region node_modules/lucide-svelte/dist/icons/university.svelte
function University($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "university" },
		sanitize_props($$props),
		{
			/**
			* @component @name University
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQgMjF2LTNhMiAyIDAgMCAwLTQgMHYzIiAvPgogIDxwYXRoIGQ9Ik0xOCAxMmguMDEiIC8+CiAgPHBhdGggZD0iTTE4IDE2aC4wMSIgLz4KICA8cGF0aCBkPSJNMjIgN2ExIDEgMCAwIDAtMS0xaC0yYTIgMiAwIDAgMS0xLjE0My0uMzU5TDEzLjE0MyAyLjM2YTIgMiAwIDAgMC0yLjI4Ni0uMDAxTDYuMTQzIDUuNjRBMiAyIDAgMCAxIDUgNkgzYTEgMSAwIDAgMC0xIDF2MTJhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yeiIgLz4KICA8cGF0aCBkPSJNNiAxMmguMDEiIC8+CiAgPHBhdGggZD0iTTYgMTZoLjAxIiAvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/university
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M14 21v-3a2 2 0 0 0-4 0v3" }],
				["path", { "d": "M18 12h.01" }],
				["path", { "d": "M18 16h.01" }],
				["path", { "d": "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" }],
				["path", { "d": "M6 12h.01" }],
				["path", { "d": "M6 16h.01" }],
				["circle", {
					"cx": "12",
					"cy": "10",
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
//#region src/lib/components/home/Hero.svelte
function Hero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const suffixes = [
			"Quality Education.",
			"Academic Excellence.",
			"A Brighter Future.",
			"Student Success."
		];
		const accentColors = [
			"#f68b1f",
			"#ffb85c",
			"#f4a646",
			"#ffd39a"
		];
		let currentSuffixIndex = 0;
		let displayedSuffix = "";
		let isDeleting = false;
		let typingSpeed = 100;
		const currentAccentColor = derived(() => accentColors[currentSuffixIndex]);
		function type() {
			const currentFullSuffix = suffixes[currentSuffixIndex];
			if (!isDeleting) if (displayedSuffix.length < currentFullSuffix.length) {
				displayedSuffix = currentFullSuffix.substring(0, displayedSuffix.length + 1);
				typingSpeed = 100;
			} else {
				isDeleting = true;
				typingSpeed = 2500;
			}
			else if (displayedSuffix.length > 0) {
				displayedSuffix = currentFullSuffix.substring(0, displayedSuffix.length - 1);
				typingSpeed = 40;
			} else {
				isDeleting = false;
				currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
				typingSpeed = 500;
			}
			setTimeout(type, typingSpeed);
		}
		$$renderer.push(`<section class="relative min-h-[105vh] flex flex-col items-center justify-center overflow-hidden bg-primary"><div class="absolute inset-0 z-0"><img src="/images/logos/hero section bg.png" alt="College Campus" class="w-full h-full object-cover opacity-90 transition-transform duration-[10s] hover:scale-110"/> <div class="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/60 backdrop-brightness-[0.85]"></div></div> <div class="absolute top-12 left-8 lg:left-16 z-30 animate-in fade-in slide-in-from-left-4 duration-1000"><p class="text-secondary font-black uppercase tracking-[0.3em] text-sm lg:text-base">Welcome to</p> <div class="w-12 h-1 bg-secondary mt-2 rounded-full"></div></div> <div class="container relative z-30 mx-auto px-4 text-center lg:px-8 flex flex-col items-center"><div class="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-1000"><h2 class="text-white/60 font-bold uppercase tracking-[0.35em] text-[10px] lg:text-xs">Our Institution</h2> <p class="text-secondary/90 font-medium uppercase tracking-[0.35em] text-[9px] lg:text-[10px]">Legacy 1945</p> <h1 class="mt-4 text-3xl lg:text-5xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl tracking-tight">Govt Graduate College <br/> <span class="text-secondary">Bahawalnagar</span></h1></div> <div class="mx-auto mt-10 max-w-4xl"><div class="flex flex-col items-center gap-2"><div class="relative flex w-full max-w-4xl justify-center"><div class="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300"><div class="flex flex-col items-center group"><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl transition-transform group-hover:scale-110"><img src="/images/logos/image.png" alt="Govt Logo" class="h-full w-full object-contain"/></div></div> <div class="h-10 w-px bg-white/10"></div> <div class="flex flex-col items-center group"><div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl transition-transform group-hover:scale-110"><img src="/images/logos/degree4k-removebg-preview.png" alt="College Logo" class="h-full w-full object-contain"/></div></div></div> <div class="w-full pt-24"><svg viewBox="0 0 900 220" class="w-full overflow-visible"><path id="heroQuoteCurve" d="M 150 70 Q 450 138 750 70" fill="transparent"></path><path id="heroQuoteCurveAccent" d="M 205 142 Q 450 202 695 142" fill="transparent"></path><text class="fill-white text-[28px] font-bold italic tracking-tight drop-shadow-lg lg:text-[36px]" text-anchor="middle"><textPath href="#heroQuoteCurve" startOffset="50%">We are dedicated to</textPath></text><text class="text-[26px] font-black italic tracking-tight drop-shadow-lg transition-all duration-500 lg:text-[34px]" text-anchor="middle"${attr_style(`fill: ${currentAccentColor()};`)}><textPath href="#heroQuoteCurveAccent" startOffset="50%">${escape_html(displayedSuffix || " ")}</textPath></text></svg></div></div></div> <div class="relative mt-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700"><div class="flex flex-wrap justify-center gap-6"><a href="/admissions/how-to-apply" class="flex items-center gap-4 px-12 py-5 bg-secondary text-white rounded-2xl font-black text-lg hover:bg-secondary/90 hover:scale-105 transition-all shadow-2xl shadow-secondary/40 active:scale-95 group">Start Your Journey `);
		Arrow_right($$renderer, {
			size: 22,
			class: "transition-transform group-hover:translate-x-2"
		});
		$$renderer.push(`<!----></a> <a href="/about/overview" class="flex items-center gap-4 px-12 py-5 bg-white/10 backdrop-blur-2xl border border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all active:scale-95 hover:scale-105">Discover More</a></div></div></div></div> <div class="hidden lg:block absolute bottom-8 right-8 z-30 animate-in fade-in duration-1000 delay-1000"><div class="relative w-32 h-32 flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform"><div class="absolute inset-0 animate-spin-slow svelte-tc3uts"><svg viewBox="0 0 100 100" class="w-full h-full text-white/80 overflow-visible"><path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent"></path><text class="text-[12px] font-black uppercase tracking-[0.15em] fill-current"><textPath href="#circlePath" startOffset="0%">EXPLORE CAMPUS • SCROLL DOWN •</textPath></text></svg></div> <div class="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center relative z-10 group-hover:-translate-y-2 transition-transform shadow-xl">`);
		Arrow_down($$renderer, {
			size: 20,
			class: "animate-bounce"
		});
		$$renderer.push(`<!----></div></div></div> <div class="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-4 lg:px-8"><div class="container mx-auto"><div class="relative mx-auto h-16 max-w-6xl overflow-hidden rounded-full"><div class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/home/NewsTicker.svelte
function NewsTicker($$renderer, $$props) {
	let { announcements = fallbackTickerAnnouncements } = $$props;
	$$renderer.push(`<div class="bg-secondary/10 border-y border-secondary/20 py-2 overflow-hidden flex items-center"><div class="container mx-auto px-4 lg:px-8 flex items-center"><div class="flex items-center gap-2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter whitespace-nowrap z-10 shadow-sm">`);
	Bell_ring($$renderer, { size: 14 });
	$$renderer.push(`<!----> <span>Latest News</span></div> <div class="flex-1 overflow-hidden ml-4 relative"><div class="flex animate-marquee whitespace-nowrap gap-12 svelte-lveuch"><!--[-->`);
	const each_array = ensure_array_like(announcements);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let news = each_array[$$index];
		$$renderer.push(`<a${attr("href", news.href)} class="text-sm font-bold text-primary flex items-center gap-2 hover:text-secondary transition-colors"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> ${escape_html(news.title)}</a>`);
	}
	$$renderer.push(`<!--]--> <!--[-->`);
	const each_array_1 = ensure_array_like(announcements);
	for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
		let news = each_array_1[$$index_1];
		$$renderer.push(`<a${attr("href", news.href)} class="text-sm font-bold text-primary flex items-center gap-2 hover:text-secondary transition-colors"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> ${escape_html(news.title)}</a>`);
	}
	$$renderer.push(`<!--]--></div></div></div></div>`);
}
//#endregion
//#region src/lib/components/home/HomeLogos.svelte
function HomeLogos($$renderer) {
	const logos = [
		{
			image: "/images/logos/image.png",
			alt: "Government of Punjab logo"
		},
		{
			image: "/images/logos/degree4k-removebg-preview.png",
			alt: "GPGC Bahawalnagar logo"
		},
		{
			image: "/images/logos/image%20copy.png",
			alt: "KFUEIT logo"
		}
	];
	const marqueeLogos = [
		...logos,
		...logos,
		...logos
	];
	$$renderer.push(`<section class="relative overflow-hidden bg-white py-18 lg:py-22"><div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(247,148,29,0.08),_transparent_34%)]"></div> <div class="relative z-10"><div class="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-white to-transparent"></div> <div class="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-white to-transparent"></div> <div class="logo-marquee flex w-max items-center gap-6 lg:gap-10 svelte-1u81q07"><!--[-->`);
	const each_array = ensure_array_like(marqueeLogos);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let logo = each_array[$$index];
		$$renderer.push(`<div class="group flex h-28 w-44 shrink-0 items-center justify-center rounded-[1.75rem] border border-border-soft bg-neutral-soft/80 px-6 py-5 shadow-[0_16px_45px_rgba(13,93,86,0.08)] transition-transform duration-300 hover:-translate-y-1 motion-rise lg:h-32 lg:w-52"><img${attr("src", logo.image)}${attr("alt", logo.alt)} class="max-h-16 w-auto object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 lg:max-h-20"/></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/ImportantNotices.svelte
function ImportantNotices($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { notices = [] } = $$props;
		const boardNotices = derived(() => (notices.length > 0 ? notices : fallbackNoticeBoardItems).slice(0, 3));
		$$renderer.push(`<section class="relative overflow-hidden bg-neutral-soft py-24"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,148,29,0.08),_transparent_36%)]"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><div class="relative mx-auto max-w-6xl rounded-[2.5rem] border border-secondary/25 bg-secondary/20 p-4 shadow-[0_30px_90px_rgba(13,93,86,0.12)] motion-rise lg:p-6"><div class="rounded-[2rem] border border-primary/12 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(247,148,29,0.14))] p-6 lg:p-10"><div class="mb-8 rounded-[1.75rem] border border-primary/10 bg-primary px-5 py-5 text-white shadow-[0_18px_50px_rgba(13,93,86,0.20)]"><div class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white">`);
		Bell_ring($$renderer, { size: 22 });
		$$renderer.push(`<!----></div> <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">`);
		Scroll_text($$renderer, { size: 22 });
		$$renderer.push(`<!----></div> <div><p class="text-xs font-black uppercase tracking-[0.32em] text-secondary">Announcements</p> <h2 class="mt-1 text-2xl font-black lg:text-3xl">College Notice Board</h2></div></div> <div class="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-white/85">Pinned Updates</div></div> <p class="mt-4 max-w-3xl text-sm font-medium leading-7 text-white/78 lg:text-base">Admissions, class schedule updates, and important instructions are displayed here for students.</p></div> <div class="grid gap-6 lg:grid-cols-3"><!--[-->`);
		const each_array = ensure_array_like(boardNotices());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let notice = each_array[index];
			$$renderer.push(`<div${attr_class(`relative min-h-[280px] rounded-[1.75rem] border border-primary/10 bg-white p-6 shadow-[0_18px_45px_rgba(13,93,86,0.10)] transition-transform duration-300 hover:-translate-y-1 motion-rise ${index === 1 ? "lg:rotate-[-1.5deg]" : index === 2 ? "lg:rotate-[1.5deg]" : "lg:-rotate-[1deg]"}`)}${attr_style(`animation-delay: ${index * 140}ms`)}><div class="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-secondary shadow-lg shadow-secondary/30"></div> <div class="flex h-full flex-col"><div class="mb-5 flex items-start justify-between gap-4"><span class="rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-secondary">${escape_html(notice.tag)}</span> <div class="flex items-center gap-2 text-primary/55">`);
			Calendar_days($$renderer, { size: 16 });
			$$renderer.push(`<!----> <span class="text-xs font-bold">${escape_html(notice.date)}</span></div></div> <h4 class="text-2xl font-black leading-tight text-primary">${escape_html(notice.title)}</h4> <p class="mt-4 flex-1 text-sm font-medium leading-7 text-primary/68">${escape_html(notice.message)}</p> <div class="mt-5 border-t border-dashed border-primary/10 pt-4"><p class="text-xs font-black uppercase tracking-[0.24em] text-primary/45">College Notice Board</p></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/home/PrincipalMessage.svelte
function PrincipalMessage($$renderer) {
	$$renderer.push(`<section class="relative overflow-hidden bg-white py-24"><div class="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(13,93,86,0.06),_transparent_40%)]"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"><div class="relative motion-slide"><div class="absolute -left-4 top-10 h-28 w-28 rounded-full bg-secondary/15 blur-3xl"></div> <div class="absolute -bottom-10 right-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl"></div> <div class="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_28px_80px_rgba(13,93,86,0.12)]"><img src="/images/logos/image%20copy%202.png" alt="Prof. Wajahat Majeed" class="h-full w-full rounded-[1.5rem] object-cover"/></div> <div class="absolute bottom-8 left-0 right-8 mx-auto max-w-xs rounded-[1.5rem] border border-white/20 bg-primary/90 px-6 py-5 text-white shadow-2xl shadow-primary/30 backdrop-blur"><div class="mb-3 flex items-center gap-2 text-secondary">`);
	Shield_check($$renderer, { size: 18 });
	$$renderer.push(`<!----> <span class="text-xs font-black uppercase tracking-[0.28em]">Accessible Learning</span></div> <p class="text-lg font-black leading-7">Education from intermediate to BS level with a public-sector foundation.</p></div></div> <div class="space-y-8 motion-rise"><div class="space-y-4"><p class="text-sm font-black uppercase tracking-[0.35em] text-secondary">Principal's Message</p> <p class="max-w-2xl text-base font-medium leading-8 text-primary/65 lg:text-lg">Our mission is to keep quality education within reach for the students of Bahawalnagar, from free intermediate classes to guided BS pathways.</p></div> <div class="relative overflow-hidden rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-8 shadow-[0_20px_60px_rgba(13,93,86,0.08)]">`);
	Quote($$renderer, {
		size: 42,
		class: "mb-5 text-secondary/70"
	});
	$$renderer.push(`<!----> <p class="text-lg font-medium leading-8 text-primary/80">It is a privilege to welcome students and families to Govt Post Graduate College Bahawalnagar. We are committed to an environment where ambition is supported by strong teaching, clear guidance, and public trust.</p> <p class="mt-5 text-base font-medium leading-8 text-primary/65">Our 11th and 12th classes open the door to free intermediate education, while our BS programs extend that journey through KFUEIT-affiliated study in both morning and evening shifts.</p></div> <div class="pt-2"><h4 class="text-2xl font-black text-primary">Prof. Wajahat Majeed</h4> <p class="font-bold text-secondary">Principal, GPGC Bahawalnagar</p></div> <a href="/about/administration" class="inline-flex items-center gap-3 font-black text-primary transition-all group hover:text-secondary">Read Full Biography <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 transition-all group-hover:bg-secondary group-hover:text-white">`);
	Arrow_right($$renderer, { size: 18 });
	$$renderer.push(`<!----></div></a></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/Stats.svelte
function Stats($$renderer) {
	const stats = [
		{
			label: "Active Students",
			value: "5,000+",
			icon: Users
		},
		{
			label: "Departments",
			value: "7",
			icon: Building_2
		},
		{
			label: "Teachers",
			value: "50+",
			icon: School
		},
		{
			label: "BS Shifts",
			value: "2",
			icon: Clock_3
		},
		{
			label: "Legacy",
			value: "1945",
			icon: Graduation_cap
		}
	];
	const particles = [
		{
			top: "14%",
			left: "8%",
			size: 12,
			delay: "0s",
			duration: "6.5s",
			variant: "star"
		},
		{
			top: "22%",
			left: "27%",
			size: 14,
			delay: "1.2s",
			duration: "7.2s",
			variant: "broken"
		},
		{
			top: "18%",
			left: "74%",
			size: 12,
			delay: "0.5s",
			duration: "6.8s",
			variant: "star"
		},
		{
			top: "30%",
			left: "88%",
			size: 10,
			delay: "1.6s",
			duration: "7.6s",
			variant: "broken"
		},
		{
			top: "52%",
			left: "14%",
			size: 12,
			delay: "0.9s",
			duration: "6.9s",
			variant: "star"
		},
		{
			top: "64%",
			left: "38%",
			size: 10,
			delay: "1.8s",
			duration: "7.4s",
			variant: "broken"
		},
		{
			top: "58%",
			left: "62%",
			size: 13,
			delay: "0.4s",
			duration: "6.7s",
			variant: "star"
		},
		{
			top: "74%",
			left: "82%",
			size: 11,
			delay: "1.1s",
			duration: "7.1s",
			variant: "broken"
		},
		{
			top: "82%",
			left: "22%",
			size: 10,
			delay: "0.7s",
			duration: "6.4s",
			variant: "star"
		},
		{
			top: "86%",
			left: "69%",
			size: 12,
			delay: "1.4s",
			duration: "7.7s",
			variant: "broken"
		}
	];
	$$renderer.push(`<section class="relative overflow-hidden bg-white py-14 lg:py-16 svelte-19rawm5"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(247,148,29,0.06),_transparent_38%)] svelte-19rawm5"></div> <div class="stats-orb stats-orb-teal svelte-19rawm5"></div> <div class="stats-orb stats-orb-orange svelte-19rawm5"></div> <div class="stats-orb stats-orb-soft svelte-19rawm5"></div> <div class="pointer-events-none absolute inset-0 svelte-19rawm5"><!--[-->`);
	const each_array = ensure_array_like(particles);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let particle = each_array[$$index];
		$$renderer.push(`<span${attr_class(`stats-particle ${particle.variant === "broken" ? "stats-particle-broken" : "stats-particle-star"}`, "svelte-19rawm5")}${attr_style(`top:${particle.top};left:${particle.left};width:${particle.size}px;height:${particle.size}px;animation-delay:${particle.delay};animation-duration:${particle.duration};`)}></span>`);
	}
	$$renderer.push(`<!--]--></div> <div class="container relative z-10 mx-auto px-4 lg:px-8 svelte-19rawm5"><div class="stats-frame relative overflow-hidden rounded-[2rem] border border-primary/10 px-4 py-8 lg:px-6 svelte-19rawm5"><div class="pointer-events-none absolute inset-0 svelte-19rawm5"><div class="stats-frame-border svelte-19rawm5"></div> <span class="stats-beam stats-beam-top svelte-19rawm5"></span> <span class="stats-beam stats-beam-right svelte-19rawm5"></span> <span class="stats-beam stats-beam-bottom svelte-19rawm5"></span> <span class="stats-beam stats-beam-left svelte-19rawm5"></span></div> <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5 svelte-19rawm5"><!--[-->`);
	const each_array_1 = ensure_array_like(stats);
	for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
		let stat = each_array_1[index];
		$$renderer.push(`<div class="text-center motion-rise svelte-19rawm5"${attr_style(`animation-delay: ${index * 90}ms`)}><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white motion-float svelte-19rawm5">`);
		if (stat.icon) {
			$$renderer.push("<!--[-->");
			stat.icon($$renderer, {
				size: 24,
				strokeWidth: 1.9
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div> <p class="text-3xl font-black text-primary lg:text-4xl svelte-19rawm5">${escape_html(stat.value)}</p> <h3 class="mt-2 text-sm font-black uppercase tracking-[0.18em] text-primary/65 lg:text-base svelte-19rawm5">${escape_html(stat.label)}</h3></div>`);
	}
	$$renderer.push(`<!--]--></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/FeaturedPrograms.svelte
function FeaturedPrograms($$renderer) {
	const programs = [
		{
			title: "11th Class",
			tag: "Free",
			tagStyle: "bg-secondary/10 text-secondary border-secondary/20",
			description: "Intermediate Part-I under the Government of Punjab with accessible, no-fee learning.",
			href: "/academics/11th",
			cta: "View 11th Class",
			icon: University
		},
		{
			title: "12th Class",
			tag: "Free",
			tagStyle: "bg-secondary/10 text-secondary border-secondary/20",
			description: "Intermediate Part-II continues the same public-sector pathway with zero tuition burden.",
			href: "/academics/12th",
			cta: "View 12th Class",
			icon: Badge_check
		},
		{
			title: "BS Morning",
			tag: "KFUEIT Affiliated",
			tagStyle: "bg-primary/10 text-primary border-primary/15",
			description: "Structured morning BS classes with university-linked academic direction and campus support.",
			href: "/academics/bs",
			cta: "Explore BS Morning",
			icon: Graduation_cap
		},
		{
			title: "BS Evening",
			tag: "KFUEIT Affiliated",
			tagStyle: "bg-primary/10 text-primary border-primary/15",
			description: "An evening BS option designed for flexibility while staying within the same affiliated framework.",
			href: "/academics/bs",
			cta: "Explore BS Evening",
			icon: Clock_3
		}
	];
	$$renderer.push(`<section class="relative overflow-hidden bg-neutral-soft py-24"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(13,93,86,0.07),_transparent_36%)]"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><div class="mx-auto mb-14 max-w-3xl text-center motion-rise"><p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Featured Programs</p> <h2 class="text-4xl font-black text-primary lg:text-5xl">Clear paths for intermediate and BS students.</h2> <p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">Every card below matches the actual academic structure of the college, with free intermediate classes and KFUEIT-affiliated BS study.</p></div> <div class="grid gap-6 lg:grid-cols-2 2xl:grid-cols-4"><!--[-->`);
	const each_array = ensure_array_like(programs);
	for (let index = 0, $$length = each_array.length; index < $$length; index++) {
		let program = each_array[index];
		$$renderer.push(`<div class="group relative overflow-hidden rounded-[2rem] border border-border-soft bg-white p-8 shadow-[0_24px_70px_rgba(13,93,86,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(13,93,86,0.12)] motion-rise"${attr_style(`animation-delay: ${index * 110}ms`)}><div class="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/10 blur-3xl transition-transform duration-500 group-hover:scale-125"></div> <div class="relative flex h-full flex-col"><div class="mb-8 flex items-start justify-between gap-4"><div class="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white motion-float">`);
		if (program.icon) {
			$$renderer.push("<!--[-->");
			program.icon($$renderer, { size: 30 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div> <span${attr_class(`rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] ${program.tagStyle}`)}>${escape_html(program.tag)}</span></div> <h3 class="text-2xl font-black text-primary">${escape_html(program.title)}</h3> <p class="mt-4 flex-1 text-sm font-medium leading-7 text-primary/65">${escape_html(program.description)}</p> <a${attr("href", program.href)} class="mt-8 inline-flex items-center gap-3 font-black text-primary transition-colors hover:text-secondary">${escape_html(program.cta)} `);
		Arrow_right($$renderer, {
			size: 18,
			class: "transition-transform group-hover:translate-x-1"
		});
		$$renderer.push(`<!----></a></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/GalleryPreview.svelte
function GalleryPreview($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const galleryItems = [
			{
				src: "/images/gallery/Gemini_Generated_Image_hwtnmyhwtnmyhwtn.png",
				title: "Open-Air Academic Session",
				tag: "Campus Life"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_jec4ltjec4ltjec4.png",
				title: "Courtyard Garden",
				tag: "Campus"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_kgigjckgigjckgig.png",
				title: "Mathematics Weekly Test",
				tag: "Academics"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_dcuevidcuevidcue.png",
				title: "Hockey Team Spirit",
				tag: "Sports"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_v7frg0v7frg0v7fr.png",
				title: "Promotion Award Ceremony",
				tag: "Events"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_kbyw6zkbyw6zkbyw.png",
				title: "Football Team Gathering",
				tag: "Students"
			},
			{
				src: "/images/gallery/Gemini_Generated_Image_5tkvlb5tkvlb5tkv.png",
				title: "Achievement Recognition",
				tag: "Honours"
			},
			{
				src: "/images/gallery/opst1.png",
				title: "Sports Week Participation",
				tag: "Activities"
			}
		];
		let activeIndex = 0;
		const visibleItems = derived(() => Array.from({ length: 5 }, (_, offset) => galleryItems[(activeIndex + offset) % galleryItems.length]));
		$$renderer.push(`<section class="relative overflow-hidden bg-neutral-soft py-24"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(247,148,29,0.10),_transparent_26%)]"></div> <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(13,93,86,0.08),_transparent_26%)]"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><div class="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div class="max-w-3xl motion-rise"><p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Campus Life</p> <h2 class="text-4xl font-black text-primary lg:text-5xl">A premium grid shaped around real moments from campus.</h2> <p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">Images now rotate every 5 seconds with smooth transitions, while the layout keeps one large campus frame and compact square highlights.</p></div> <a href="/news/gallery" class="inline-flex items-center gap-3 self-start rounded-full border border-primary/15 bg-white px-6 py-3 font-black text-primary shadow-sm transition-all hover:-translate-y-1 hover:text-secondary motion-rise">View Full Gallery `);
		Arrow_right($$renderer, { size: 18 });
		$$renderer.push(`<!----></a></div> <div class="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch"><div class="group relative isolate h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-[0_24px_70px_rgba(13,93,86,0.10)] lg:h-[470px]"><!---->`);
		$$renderer.push(`<div class="absolute inset-0"><img${attr("src", visibleItems()[0].src)}${attr("alt", visibleItems()[0].title)} class="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]" fetchpriority="high"/> <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/18 to-transparent"></div> <div class="absolute inset-x-0 bottom-0 p-8 text-white"><p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">${escape_html(visibleItems()[0].tag)}</p> <h3 class="mt-3 text-3xl font-black lg:text-4xl">${escape_html(visibleItems()[0].title)}</h3></div></div>`);
		$$renderer.push(`<!----></div> <div class="grid gap-5 sm:grid-cols-2 lg:h-[470px] lg:grid-cols-2 lg:grid-rows-2"><!--[-->`);
		const each_array = ensure_array_like(visibleItems().slice(1));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="group relative isolate aspect-square overflow-hidden rounded-[1.7rem] border border-white/60 bg-white shadow-[0_18px_50px_rgba(13,93,86,0.08)] lg:h-full"><!---->`);
			$$renderer.push(`<div class="absolute inset-0"><img${attr("src", item.src)}${attr("alt", item.title)} class="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]" loading="lazy" decoding="async"/> <div class="absolute inset-0 bg-gradient-to-t from-primary/88 via-primary/8 to-transparent"></div> <div class="absolute inset-x-0 bottom-0 p-4 text-white"><p class="text-[11px] font-black uppercase tracking-[0.22em] text-secondary">${escape_html(item.tag)}</p> <h3 class="mt-2 text-lg font-black leading-tight lg:text-xl">${escape_html(item.title)}</h3></div></div>`);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/home/AdmissionsJourney.svelte
function AdmissionsJourney($$renderer) {
	const steps = [
		{
			title: "Choose Your Program",
			description: "Select 11th, 12th, BS Morning, or BS Evening according to your academic path.",
			icon: Graduation_cap
		},
		{
			title: "Prepare Documents",
			description: "Collect the required certificates, records, and application materials.",
			icon: File_text
		},
		{
			title: "Verification and Guidance",
			description: "Follow the admission procedure, eligibility checks, and merit-related steps.",
			icon: Clipboard_check
		},
		{
			title: "Start Classes",
			description: "Begin free intermediate studies or move into KFUEIT-affiliated BS classes.",
			icon: Badge_check
		}
	];
	$$renderer.push(`<section class="relative overflow-hidden bg-white py-24"><div class="absolute inset-0 bg-[linear-gradient(180deg,_rgba(247,148,29,0.03),_transparent_30%,_rgba(13,93,86,0.05))]"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><div class="mx-auto mb-14 max-w-3xl text-center motion-rise"><p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Admissions Journey</p> <h2 class="text-4xl font-black text-primary lg:text-5xl">A clear path from interest to enrollment.</h2> <p class="mt-5 text-base font-medium leading-8 text-primary/65 lg:text-lg">Keep the process easy to understand: 11th and 12th classes are free, while BS programs are the ones affiliated with KFUEIT.</p></div> <div class="relative"><div class="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent xl:block"></div> <div class="grid gap-6 xl:grid-cols-4"><!--[-->`);
	const each_array = ensure_array_like(steps);
	for (let index = 0, $$length = each_array.length; index < $$length; index++) {
		let step = each_array[index];
		$$renderer.push(`<div class="relative rounded-[2rem] border border-border-soft bg-neutral-soft/80 p-7 shadow-[0_20px_60px_rgba(13,93,86,0.08)] motion-rise"${attr_style(`animation-delay: ${index * 120}ms`)}><div class="mb-6 flex items-center justify-between"><div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white motion-float">`);
		if (step.icon) {
			$$renderer.push("<!--[-->");
			step.icon($$renderer, { size: 24 });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div> <span class="text-xs font-black uppercase tracking-[0.24em] text-secondary">Step ${escape_html(index + 1)}</span></div> <h3 class="text-xl font-black text-primary">${escape_html(step.title)}</h3> <p class="mt-3 text-sm font-medium leading-7 text-primary/65">${escape_html(step.description)}</p></div>`);
	}
	$$renderer.push(`<!--]--></div></div> <div class="mt-10 flex flex-col gap-4 rounded-[2rem] border border-secondary/20 bg-secondary/10 p-6 text-primary lg:flex-row lg:items-center lg:justify-between motion-rise"><div><p class="text-sm font-black uppercase tracking-[0.28em] text-secondary">Important Note</p> <p class="mt-2 text-lg font-black">11th and 12th classes are free. KFUEIT affiliation applies to BS classes only.</p></div> <a href="/admissions/how-to-apply" class="inline-flex items-center gap-3 self-start rounded-full bg-primary px-6 py-3 font-black text-white transition-all hover:-translate-y-1 hover:bg-accent">Read Admission Guide `);
	Arrow_right($$renderer, { size: 18 });
	$$renderer.push(`<!----></a></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/FinalCta.svelte
function FinalCta($$renderer) {
	$$renderer.push(`<section class="relative overflow-hidden bg-neutral-soft py-24"><div class="container mx-auto px-4 lg:px-8"><div class="motion-glow relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-12 text-white shadow-[0_30px_90px_rgba(13,93,86,0.26)] lg:px-12 lg:py-14"><div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(247,148,29,0.3),_transparent_32%)]"></div> <div class="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"><div class="max-w-3xl motion-rise"><p class="mb-4 text-sm font-black uppercase tracking-[0.35em] text-secondary">Ready To Apply</p> <h2 class="text-4xl font-black leading-tight lg:text-5xl">Begin your academic journey with GPGC Bahawalnagar.</h2> <p class="mt-5 text-base font-medium leading-8 text-white/78 lg:text-lg">Free intermediate education and KFUEIT-affiliated BS classes come together in one trusted Government of Punjab institution.</p></div> <div class="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row"><a href="/admissions/how-to-apply" class="inline-flex items-center justify-center gap-3 rounded-full bg-secondary px-7 py-4 font-black text-white transition-all hover:-translate-y-1 hover:bg-secondary/90">Apply Now `);
	Arrow_right($$renderer, { size: 18 });
	$$renderer.push(`<!----></a> <a href="/contact" class="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-7 py-4 font-black text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/12">Contact College `);
	Phone_call($$renderer, { size: 18 });
	$$renderer.push(`<!----></a></div></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/home/LightBeamDivider.svelte
function LightBeamDivider($$renderer) {
	$$renderer.push(`<section class="relative overflow-hidden bg-white py-8 lg:py-10"><div class="container mx-auto px-4 lg:px-8"><div class="relative mx-auto h-16 max-w-6xl overflow-hidden rounded-full"><div class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/18 to-transparent"></div></div></div></section>`);
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Home | Govt Post Graduate College Bahawalnagar</title>`);
			});
			$$renderer.push(`<meta name="description" content="Govt Post Graduate College Bahawalnagar offers free 11th and 12th classes under the Government of Punjab and BS programs affiliated with KFUEIT."/>`);
		});
		NewsTicker($$renderer, { announcements: data.tickerAnnouncements });
		$$renderer.push(`<!----> `);
		Hero($$renderer, {});
		$$renderer.push(`<!----> `);
		Stats($$renderer, {});
		$$renderer.push(`<!----> `);
		FeaturedPrograms($$renderer, {});
		$$renderer.push(`<!----> `);
		HomeLogos($$renderer, {});
		$$renderer.push(`<!----> `);
		ImportantNotices($$renderer, { notices: data.noticeBoardItems });
		$$renderer.push(`<!----> `);
		PrincipalMessage($$renderer, {});
		$$renderer.push(`<!----> `);
		GalleryPreview($$renderer, {});
		$$renderer.push(`<!----> `);
		AdmissionsJourney($$renderer, {});
		$$renderer.push(`<!----> `);
		LightBeamDivider($$renderer, {});
		$$renderer.push(`<!----> `);
		FinalCta($$renderer, {});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
