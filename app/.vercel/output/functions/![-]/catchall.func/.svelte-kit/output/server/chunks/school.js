import { f as sanitize_props, m as spread_props, p as slot } from "./dev.js";
import { t as Icon } from "./Icon.js";
//#region node_modules/lucide-svelte/dist/icons/building-2.svelte
function Building_2($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "building-2" },
		sanitize_props($$props),
		{
			/**
			* @component @name Building2
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAgMTJoNCIgLz4KICA8cGF0aCBkPSJNMTAgOGg0IiAvPgogIDxwYXRoIGQ9Ik0xNCAyMXYtM2EyIDIgMCAwIDAtNCAwdjMiIC8+CiAgPHBhdGggZD0iTTYgMTBINGEyIDIgMCAwIDAtMiAydjdhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0yVjlhMiAyIDAgMCAwLTItMmgtMiIgLz4KICA8cGF0aCBkPSJNNiAyMVY1YTIgMiAwIDAgMSAyLTJoOGEyIDIgMCAwIDEgMiAydjE2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/building-2
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M10 12h4" }],
				["path", { "d": "M10 8h4" }],
				["path", { "d": "M14 21v-3a2 2 0 0 0-4 0v3" }],
				["path", { "d": "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" }],
				["path", { "d": "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" }]
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
//#region node_modules/lucide-svelte/dist/icons/school.svelte
function School($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "school" },
		sanitize_props($$props),
		{
			/**
			* @component @name School
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQgMjF2LTNhMiAyIDAgMCAwLTQgMHYzIiAvPgogIDxwYXRoIGQ9Ik0xOCA0LjkzM1YyMSIgLz4KICA8cGF0aCBkPSJtNCA2IDcuMTA2LTMuNzlhMiAyIDAgMCAxIDEuNzg4IDBMMjAgNiIgLz4KICA8cGF0aCBkPSJtNiAxMS0zLjUyIDIuMTQ3YTEgMSAwIDAgMC0uNDguODU0VjE5YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtNWExIDEgMCAwIDAtLjQ4LS44NTNMMTggMTEiIC8+CiAgPHBhdGggZD0iTTYgNC45MzNWMjEiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSI5IiByPSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/school
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M14 21v-3a2 2 0 0 0-4 0v3" }],
				["path", { "d": "M18 4.933V21" }],
				["path", { "d": "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" }],
				["path", { "d": "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" }],
				["path", { "d": "M6 4.933V21" }],
				["circle", {
					"cx": "12",
					"cy": "9",
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
export { Building_2 as n, School as t };
