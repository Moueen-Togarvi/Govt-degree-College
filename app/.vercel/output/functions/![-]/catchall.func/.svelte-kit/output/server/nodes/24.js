import * as server from '../entries/pages/news/events/_page.server.ts.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/events/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/news/events/+page.server.ts";
export const imports = ["_app/immutable/nodes/24.CeI38g53.js","_app/immutable/chunks/DO4RVCPR.js","_app/immutable/chunks/DTbLZfiK.js","_app/immutable/chunks/D_g_VcK0.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BO9ZEypo.js","_app/immutable/chunks/WphbW6YB.js","_app/immutable/chunks/BN1fiBvV.js"];
export const stylesheets = [];
export const fonts = [];
