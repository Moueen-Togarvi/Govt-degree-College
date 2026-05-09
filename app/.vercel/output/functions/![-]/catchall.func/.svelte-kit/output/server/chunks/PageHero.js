import { Y as escape_html, c as ensure_array_like, q as attr } from "./dev.js";
//#region src/lib/components/shared/PageHero.svelte
function PageHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, subtitle, breadcrumbs, image = "" } = $$props;
		$$renderer.push(`<section data-stack-panel="true" class="relative min-h-[36vh] overflow-hidden bg-primary py-16 lg:min-h-[42vh] lg:py-20"><div class="absolute inset-0"><img${attr("src", "/images/logos/hero%20section%20bg.png")} alt="" class="h-full w-full object-cover object-center opacity-75"${attr("data-uses-shared-image", image ? "true" : "default")}/> <div class="absolute inset-0 bg-primary/62"></div></div> <div class="pointer-events-none absolute -right-36 -top-36 h-72 w-72 rounded-full bg-secondary/10"></div> <div class="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5"></div> <div class="container relative z-10 mx-auto px-4 lg:px-8"><nav aria-label="breadcrumb" class="mb-5"><ol class="flex flex-wrap items-center gap-2 text-xs font-bold text-white/65 lg:text-sm"><!--[-->`);
		const each_array = ensure_array_like(breadcrumbs);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let crumb = each_array[i];
			$$renderer.push(`<li class="flex items-center gap-2">`);
			if (i < breadcrumbs.length - 1) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", crumb.href)} class="hover:text-secondary transition-colors">${escape_html(crumb.label)}</a> <span class="text-white/30">/</span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<span class="text-secondary font-bold">${escape_html(crumb.label)}</span>`);
			}
			$$renderer.push(`<!--]--></li>`);
		}
		$$renderer.push(`<!--]--></ol></nav> <h1 class="max-w-4xl text-3xl font-black leading-tight text-white lg:text-5xl">${escape_html(title)}</h1> `);
		if (subtitle) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="mt-3 max-w-2xl text-base font-medium leading-7 text-white/78 lg:text-lg">${escape_html(subtitle)}</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
export { PageHero as t };
