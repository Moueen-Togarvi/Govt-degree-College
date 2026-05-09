import * as server from '../entries/pages/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.CUBLKv9E.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/D_g_VcK0.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/CO958ruj.js","_app/immutable/chunks/BGbd1LBk.js","_app/immutable/chunks/Dnhe63aw.js","_app/immutable/chunks/0iXmfYSD.js","_app/immutable/chunks/ShBqAWrh.js","_app/immutable/chunks/cLYYhlaQ.js","_app/immutable/chunks/DbXqVstm.js","_app/immutable/chunks/gR9-vBTb.js"];
export const stylesheets = ["_app/immutable/assets/3.mXMMH4jQ.css"];
export const fonts = [];
