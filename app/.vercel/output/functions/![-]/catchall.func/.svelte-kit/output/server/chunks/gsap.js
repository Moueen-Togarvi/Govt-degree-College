import { f as sanitize_props, m as spread_props, p as slot } from "./dev.js";
import { t as Icon } from "./Icon.js";
import "gsap/ScrollTrigger";
import { gsap } from "gsap";
//#region node_modules/lucide-svelte/dist/icons/phone-call.svelte
function Phone_call($$renderer, $$props) {
	Icon($$renderer, spread_props([
		{ name: "phone-call" },
		sanitize_props($$props),
		{
			/**
			* @component @name PhoneCall
			* @description Lucide SVG icon component, renders SVG Element with children.
			*
			* @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTMgMmE5IDkgMCAwIDEgOSA5IiAvPgogIDxwYXRoIGQ9Ik0xMyA2YTUgNSAwIDAgMSA1IDUiIC8+CiAgPHBhdGggZD0iTTEzLjgzMiAxNi41NjhhMSAxIDAgMCAwIDEuMjEzLS4zMDNsLjM1NS0uNDY1QTIgMiAwIDAgMSAxNyAxNWgzYTIgMiAwIDAgMSAyIDJ2M2EyIDIgMCAwIDEtMiAyQTE4IDE4IDAgMCAxIDIgNGEyIDIgMCAwIDEgMi0yaDNhMiAyIDAgMCAxIDIgMnYzYTIgMiAwIDAgMS0uOCAxLjZsLS40NjguMzUxYTEgMSAwIDAgMC0uMjkyIDEuMjMzIDE0IDE0IDAgMCAwIDYuMzkyIDYuMzg0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/phone-call
			* @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
			*
			* @param {Object} props - Lucide icons props and any valid SVG attribute
			* @returns {FunctionalComponent} Svelte component
			*
			*/
			iconNode: [
				["path", { "d": "M13 2a9 9 0 0 1 9 9" }],
				["path", { "d": "M13 6a5 5 0 0 1 5 5" }],
				["path", { "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }]
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
function ensureGsap() {
	return gsap;
}
//#endregion
export { Phone_call as n, ensureGsap as t };
