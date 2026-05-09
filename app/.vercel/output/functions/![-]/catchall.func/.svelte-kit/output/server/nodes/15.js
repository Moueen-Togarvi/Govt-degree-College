import * as server from '../entries/pages/admin/login/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.DXa31A1h.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/Cs5QDfgy.js"];
export const stylesheets = [];
export const fonts = [];
