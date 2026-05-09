import * as server from '../entries/pages/about/faculty/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/faculty/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/faculty/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BmyaIpuk.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BN1fiBvV.js"];
export const stylesheets = [];
export const fonts = [];
