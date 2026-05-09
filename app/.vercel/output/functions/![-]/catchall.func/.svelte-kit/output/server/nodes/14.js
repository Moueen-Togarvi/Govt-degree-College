import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.CzEMA3tM.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/D_g_VcK0.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BGbd1LBk.js","_app/immutable/chunks/Dnhe63aw.js","_app/immutable/chunks/DTbLZfiK.js","_app/immutable/chunks/0iXmfYSD.js","_app/immutable/chunks/ShBqAWrh.js","_app/immutable/chunks/DbXqVstm.js","_app/immutable/chunks/CX9c7nye.js"];
export const stylesheets = [];
export const fonts = [];
