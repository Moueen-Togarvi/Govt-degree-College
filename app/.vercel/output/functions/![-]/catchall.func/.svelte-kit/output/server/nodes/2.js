import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.Bs2IQIqc.js","_app/immutable/chunks/B-fI06gm.js","_app/immutable/chunks/Cs5QDfgy.js"];
export const stylesheets = [];
export const fonts = [];
