import * as server from '../entries/pages/news/announcements/_page.server.ts.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/announcements/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/announcements/+page.server.ts";
export const imports = ["_app/immutable/nodes/23.DXVQmQxA.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/D_g_VcK0.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/DTbLZfiK.js","_app/immutable/chunks/BN1fiBvV.js"];
export const stylesheets = [];
export const fonts = [];
