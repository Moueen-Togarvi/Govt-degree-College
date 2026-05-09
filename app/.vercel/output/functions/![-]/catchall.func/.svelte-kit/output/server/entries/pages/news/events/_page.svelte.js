import { Y as escape_html, c as ensure_array_like, l as head, q as attr } from "../../../../chunks/dev.js";
import { t as Calendar } from "../../../../chunks/calendar.js";
import { t as Clock } from "../../../../chunks/clock.js";
import { t as Map_pin } from "../../../../chunks/map-pin.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/news/events/+page.svelte
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
				label: "Events",
				href: "/news/events"
			}
		];
		let { data } = $$props;
		head("9y9hqm", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Events | News | GPGC Bahawalnagar</title>`);
			});
		});
		PageHero($$renderer, {
			title: "Upcoming Events",
			subtitle: "Join us in celebrating academic and extracurricular achievements.",
			breadcrumbs,
			image: "/images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg"
		});
		$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-12"><!--[-->`);
		const each_array = ensure_array_like(data.events);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let event = each_array[$$index];
			$$renderer.push(`<div class="flex flex-col bg-neutral-soft rounded-3xl border border-border-soft overflow-hidden hover:shadow-2xl transition-all group"><div class="relative h-64 overflow-hidden"><img${attr("src", event.imageUrl)}${attr("alt", event.title)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/> <div class="absolute top-6 left-6 bg-secondary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">${escape_html(event.status)}</div></div> <div class="p-10 space-y-6"><h3 class="text-3xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">${escape_html(event.title)}</h3> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="flex items-center gap-3 text-primary/60 font-bold text-sm">`);
			Calendar($$renderer, {
				size: 18,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> <span>${escape_html(event.date)}</span></div> <div class="flex items-center gap-3 text-primary/60 font-bold text-sm">`);
			Clock($$renderer, {
				size: 18,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> <span>${escape_html(event.time)}</span></div> <div class="flex items-center gap-3 text-primary/60 font-bold text-sm sm:col-span-2">`);
			Map_pin($$renderer, {
				size: 18,
				class: "text-secondary"
			});
			$$renderer.push(`<!----> <span>${escape_html(event.location)}</span></div></div> <div class="pt-4"><button class="px-8 py-3 bg-primary text-white rounded-xl font-black hover:bg-secondary transition-all shadow-xl shadow-primary/10">Event Details</button></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
export { _page as default };
