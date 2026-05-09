export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["images/gallery/474558875_1114316157054803_792575752398067320_n.jpg","images/gallery/474603261_1114315973721488_3688329175050708929_n.jpg","images/gallery/474603631_1113700027116416_3753317337439731517_n.jpg","images/gallery/484544563_1134076872063951_6371907864995137236_n.jpg","images/gallery/484852720_1133834088754896_1279503849941319094_n.jpg","images/gallery/488504405_1150873360384302_7113898617720777839_n.jpg","images/gallery/488783450_1151077853697186_3781161808171656315_n.jpg","images/gallery/488905244_1152937746844530_1596883519374966200_n.jpg","images/gallery/488936577_1152937786844526_8441555087243500544_n.jpg","images/gallery/489290757_1152937760177862_1944043555997507703_n.jpg","images/gallery/491999992_1166947772110194_8921941246071863873_n.jpg","images/gallery/492399272_1167128012092170_5475953652365738597_n.jpg","images/gallery/497498149_1184322940372677_5964474392879878424_n.jpg","images/gallery/534824860_1270404345097869_1184833402474722556_n.jpg","images/gallery/542487158_1286791010125869_1656553405617648794_n.jpg","images/gallery/543048564_1288642513274052_5600636149883735634_n.jpg","images/gallery/543406756_1287667523371551_8002641646226004304_n.jpg","images/gallery/543459255_1288642623274041_7370685911892750194_n.jpg","images/gallery/544756802_1288642559940714_7566178749056628309_n.jpg","images/gallery/547755271_1299324492205854_5011253499358894922_n.jpg","images/gallery/665935849_1474659488005686_1995084685341788433_n.jpg","images/gallery/675459636_1485390776932557_6411374330442371269_n.jpg","images/gallery/682757218_1491086206363014_2879876708562002240_n.jpg","images/logos/degree4k-removebg-preview.png","images/logos/hero section bg.png","images/logos/image copy 2.png","images/logos/image copy.png","images/logos/image.png","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.t-Clgwdq.js",app:"_app/immutable/entry/app.BevlV6vA.js",imports:["_app/immutable/entry/start.t-Clgwdq.js","_app/immutable/chunks/NVre9AMh.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/entry/app.BevlV6vA.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/kl1j1IRd.js","_app/immutable/chunks/Cs5QDfgy.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
