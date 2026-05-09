import { Y as escape_html, c as ensure_array_like, l as head, q as attr } from "../../../../chunks/dev.js";
import { n as Mail, t as Phone } from "../../../../chunks/phone.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
//#region src/routes/about/administration/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [
		{
			label: "Home",
			href: "/"
		},
		{
			label: "About",
			href: "/about/overview"
		},
		{
			label: "Administration",
			href: "/about/administration"
		}
	];
	const admin = [{
		role: "Principal",
		name: "Prof. Wajahat Majeed",
		photo: "/images/logos/image copy 2.png",
		email: "principal@gpgcbwn.edu.pk",
		phone: "+92 63 9240123"
	}, {
		role: "Vice Principal",
		name: "Prof. Muhammad Akram",
		photo: "/images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg",
		email: "viceprincipal@gpgcbwn.edu.pk",
		phone: "+92 63 9240124"
	}];
	head("ag1pfd", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Administration | About Us | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "College Administration",
		subtitle: "The dedicated team leading our institution towards excellence.",
		breadcrumbs,
		image: "/images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white"><div class="container mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 gap-12"><!--[-->`);
	const each_array = ensure_array_like(admin);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let person = each_array[$$index];
		$$renderer.push(`<div class="flex flex-col lg:flex-row gap-8 bg-neutral-soft p-8 rounded-3xl border border-border-soft hover:shadow-xl transition-all group"><div class="w-full lg:w-48 h-64 overflow-hidden rounded-2xl shrink-0"><img${attr("src", person.photo)}${attr("alt", person.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/></div> <div class="flex flex-col justify-center space-y-4"><div class="space-y-1"><p class="text-secondary font-black uppercase tracking-widest text-xs">${escape_html(person.role)}</p> <h3 class="text-2xl font-black text-primary">${escape_html(person.name)}</h3></div> <div class="space-y-2"><div class="flex items-center gap-3 text-primary/70">`);
		Mail($$renderer, {
			size: 16,
			class: "text-secondary"
		});
		$$renderer.push(`<!----> <span class="text-sm font-medium">${escape_html(person.email)}</span></div> <div class="flex items-center gap-3 text-primary/70">`);
		Phone($$renderer, {
			size: 16,
			class: "text-secondary"
		});
		$$renderer.push(`<!----> <span class="text-sm font-medium">${escape_html(person.phone)}</span></div></div></div></div>`);
	}
	$$renderer.push(`<!--]--></div></div></section>`);
}
//#endregion
export { _page as default };
