import { l as head } from "../../../chunks/dev.js";
import { t as Clock } from "../../../chunks/clock.js";
import { n as Mail, t as Phone } from "../../../chunks/phone.js";
import { t as Map_pin } from "../../../chunks/map-pin.js";
import { t as Send } from "../../../chunks/send.js";
import { t as PageHero } from "../../../chunks/PageHero.js";
//#region src/routes/contact/+page.svelte
function _page($$renderer) {
	const breadcrumbs = [{
		label: "Home",
		href: "/"
	}, {
		label: "Contact Us",
		href: "/contact"
	}];
	head("1bv7ezn", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Contact Us | GPGC Bahawalnagar</title>`);
		});
	});
	PageHero($$renderer, {
		title: "Contact Us",
		subtitle: "We're here to answer any questions about admissions, academics, and campus life.",
		breadcrumbs,
		image: "/images/gallery/489370014_1155981606540144_7733475266851659714_n.jpg"
	});
	$$renderer.push(`<!----> <section class="py-24 bg-white relative"><div class="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div> <div class="container mx-auto px-4 lg:px-8 relative z-10"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16"><div class="space-y-12"><div class="space-y-6"><h2 class="text-4xl font-black text-primary border-l-8 border-secondary pl-6 leading-tight">Get in Touch with Us</h2> <p class="text-lg text-primary/70 leading-relaxed max-w-md">Our administration office is open during regular college hours. Feel free to visit the campus or reach out via phone or email.</p></div> <div class="space-y-6"><div class="flex items-start gap-6 p-6 bg-neutral-soft rounded-3xl border border-border-soft hover:shadow-lg transition-all group"><div class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary transition-all shadow-md">`);
	Map_pin($$renderer, { size: 24 });
	$$renderer.push(`<!----></div> <div class="space-y-2"><h3 class="text-xl font-black text-primary">Campus Address</h3> <p class="text-primary/70 font-medium">Govt Post Graduate College,<br/>Minchinabad Road, Bahawalnagar,<br/>Punjab 62300, Pakistan</p></div></div> <div class="flex items-start gap-6 p-6 bg-neutral-soft rounded-3xl border border-border-soft hover:shadow-lg transition-all group"><div class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary transition-all shadow-md">`);
	Phone($$renderer, { size: 24 });
	$$renderer.push(`<!----></div> <div class="space-y-2"><h3 class="text-xl font-black text-primary">Phone Numbers</h3> <p class="text-primary/70 font-medium">+92 63 9240123 (Principal Office)</p> <p class="text-primary/70 font-medium">+92 63 9240124 (Student Affairs)</p></div></div> <div class="flex items-start gap-6 p-6 bg-neutral-soft rounded-3xl border border-border-soft hover:shadow-lg transition-all group"><div class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary transition-all shadow-md">`);
	Mail($$renderer, { size: 24 });
	$$renderer.push(`<!----></div> <div class="space-y-2"><h3 class="text-xl font-black text-primary">Email Addresses</h3> <p class="text-primary/70 font-medium">info@gpgcbwn.edu.pk</p> <p class="text-primary/70 font-medium">admissions@gpgcbwn.edu.pk</p></div></div> <div class="flex items-start gap-6 p-6 bg-neutral-soft rounded-3xl border border-border-soft hover:shadow-lg transition-all group"><div class="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary transition-all shadow-md">`);
	Clock($$renderer, { size: 24 });
	$$renderer.push(`<!----></div> <div class="space-y-2"><h3 class="text-xl font-black text-primary">Office Hours</h3> <p class="text-primary/70 font-medium">Mon - Thu &amp; Sat: 8:00 AM - 2:00 PM</p> <p class="text-primary/70 font-medium">Friday: 8:00 AM - 12:00 PM</p></div></div></div></div> <div class="bg-primary p-10 md:p-12 rounded-[2rem] text-white shadow-2xl relative overflow-hidden"><div class="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -mr-32 -mb-32 pointer-events-none"></div> <div class="relative z-10 space-y-8"><div class="space-y-2"><h3 class="text-3xl font-black italic">Send us a Message</h3> <p class="text-white/70 font-medium">Fill out the form below and our team will get back to you shortly.</p></div> <form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><label for="firstName" class="text-sm font-bold uppercase tracking-widest text-white/80">First Name</label> <input type="text" id="firstName" class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all" placeholder="Ali" required=""/></div> <div class="space-y-2"><label for="lastName" class="text-sm font-bold uppercase tracking-widest text-white/80">Last Name</label> <input type="text" id="lastName" class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all" placeholder="Khan" required=""/></div></div> <div class="space-y-2"><label for="email" class="text-sm font-bold uppercase tracking-widest text-white/80">Email Address</label> <input type="email" id="email" class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all" placeholder="ali@example.com" required=""/></div> <div class="space-y-2"><label for="subject" class="text-sm font-bold uppercase tracking-widest text-white/80">Subject</label> <select id="subject" class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all [&amp;>option]:bg-primary [&amp;>option]:text-white">`);
	$$renderer.option({ value: "admission" }, ($$renderer) => {
		$$renderer.push(`Admissions Inquiry`);
	});
	$$renderer.option({ value: "academic" }, ($$renderer) => {
		$$renderer.push(`Academic Programs`);
	});
	$$renderer.option({ value: "fees" }, ($$renderer) => {
		$$renderer.push(`Fee &amp; Scholarships`);
	});
	$$renderer.option({ value: "other" }, ($$renderer) => {
		$$renderer.push(`Other`);
	});
	$$renderer.push(`</select></div> <div class="space-y-2"><label for="message" class="text-sm font-bold uppercase tracking-widest text-white/80">Message</label> <textarea id="message" rows="4" class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 transition-all resize-none" placeholder="How can we help you?" required=""></textarea></div> <button type="submit" class="w-full bg-secondary text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 hover:scale-[1.02] transition-all shadow-xl shadow-secondary/20">Send Message `);
	Send($$renderer, { size: 18 });
	$$renderer.push(`<!----></button></form></div></div></div> <div class="mt-24 space-y-8"><h2 class="text-3xl font-black text-primary text-center">Find Us on Campus</h2> <div class="w-full h-[400px] bg-neutral-200 rounded-[2rem] overflow-hidden relative shadow-inner"><div class="absolute inset-0 flex flex-col items-center justify-center bg-primary/5 text-primary">`);
	Map_pin($$renderer, {
		size: 48,
		class: "text-secondary mb-4 drop-shadow-md"
	});
	$$renderer.push(`<!----> <p class="font-black text-2xl">Campus Map View</p> <p class="text-primary/60 font-medium mt-2">Map Integration Placeholder</p></div></div></div></div></section>`);
}
//#endregion
export { _page as default };
