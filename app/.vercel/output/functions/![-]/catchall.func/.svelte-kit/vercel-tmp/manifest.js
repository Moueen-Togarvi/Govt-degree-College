export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/gallery/Gemini_Generated_Image_5tkvlb5tkvlb5tkv.png","images/gallery/Gemini_Generated_Image_dcuevidcuevidcue.png","images/gallery/Gemini_Generated_Image_hwtnmyhwtnmyhwtn.png","images/gallery/Gemini_Generated_Image_iyh10xiyh10xiyh1.png","images/gallery/Gemini_Generated_Image_jec4ltjec4ltjec4.png","images/gallery/Gemini_Generated_Image_kbyw6zkbyw6zkbyw.png","images/gallery/Gemini_Generated_Image_kgigjckgigjckgig.png","images/gallery/Gemini_Generated_Image_t8ri2ct8ri2ct8ri (1).png","images/gallery/Gemini_Generated_Image_t8ri2ct8ri2ct8ri.png","images/gallery/Gemini_Generated_Image_v7frg0v7frg0v7fr.png","images/gallery/opst1.png","images/logos/degree4k-removebg-preview.png","images/logos/hero section bg.png","images/logos/image copy 2.png","images/logos/image copy.png","images/logos/image.png","images/staff/jabbar4k.png","images/staff/mushaid hussain 4k.png","images/staff/saed4k.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DtvphCgm.js",app:"_app/immutable/entry/app.B5Kx_dSL.js",imports:["_app/immutable/entry/start.DtvphCgm.js","_app/immutable/chunks/BLRiAD6y.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/entry/app.B5Kx_dSL.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/kl1j1IRd.js","_app/immutable/chunks/Cs5QDfgy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js')),
			__memo(() => import('../output/server/nodes/8.js')),
			__memo(() => import('../output/server/nodes/9.js')),
			__memo(() => import('../output/server/nodes/10.js')),
			__memo(() => import('../output/server/nodes/11.js')),
			__memo(() => import('../output/server/nodes/12.js')),
			__memo(() => import('../output/server/nodes/13.js')),
			__memo(() => import('../output/server/nodes/14.js')),
			__memo(() => import('../output/server/nodes/15.js')),
			__memo(() => import('../output/server/nodes/16.js')),
			__memo(() => import('../output/server/nodes/17.js')),
			__memo(() => import('../output/server/nodes/18.js')),
			__memo(() => import('../output/server/nodes/19.js')),
			__memo(() => import('../output/server/nodes/20.js')),
			__memo(() => import('../output/server/nodes/21.js')),
			__memo(() => import('../output/server/nodes/22.js')),
			__memo(() => import('../output/server/nodes/23.js')),
			__memo(() => import('../output/server/nodes/24.js')),
			__memo(() => import('../output/server/nodes/25.js')),
			__memo(() => import('../output/server/nodes/26.js')),
			__memo(() => import('../output/server/nodes/27.js')),
			__memo(() => import('../output/server/nodes/28.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about/administration",
				pattern: /^\/about\/administration\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/about/faculty",
				pattern: /^\/about\/faculty\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/about/history",
				pattern: /^\/about\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/about/mission-vision",
				pattern: /^\/about\/mission-vision\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/about/overview",
				pattern: /^\/about\/overview\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/academics/11th",
				pattern: /^\/academics\/11th\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/academics/12th",
				pattern: /^\/academics\/12th\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/academics/bs",
				pattern: /^\/academics\/bs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/academics/programs",
				pattern: /^\/academics\/programs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/academics/syllabus",
				pattern: /^\/academics\/syllabus\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/admin/logout/_server.ts.js'))
			},
			{
				id: "/admissions/eligibility",
				pattern: /^\/admissions\/eligibility\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admissions/fee-structure",
				pattern: /^\/admissions\/fee-structure\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admissions/forms",
				pattern: /^\/admissions\/forms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admissions/how-to-apply",
				pattern: /^\/admissions\/how-to-apply\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/admissions/scholarships",
				pattern: /^\/admissions\/scholarships\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/api/announcements",
				pattern: /^\/api\/announcements\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/announcements/_server.ts.js'))
			},
			{
				id: "/api/events",
				pattern: /^\/api\/events\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/events/_server.ts.js'))
			},
			{
				id: "/api/init-db",
				pattern: /^\/api\/init-db\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/init-db/_server.ts.js'))
			},
			{
				id: "/api/quick-links",
				pattern: /^\/api\/quick-links\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/quick-links/_server.ts.js'))
			},
			{
				id: "/api/results",
				pattern: /^\/api\/results\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/results/_server.ts.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/departments/[id]",
				pattern: /^\/departments\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/news/announcements",
				pattern: /^\/news\/announcements\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/news/events",
				pattern: /^\/news\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/news/gallery",
				pattern: /^\/news\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/news/results",
				pattern: /^\/news\/results\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/student-portal",
				pattern: /^\/student-portal\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
