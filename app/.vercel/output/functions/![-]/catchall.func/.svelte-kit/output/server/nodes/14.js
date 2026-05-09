import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.CrmsbUeF.js","_app/immutable/chunks/DHlSUlHC.js","_app/immutable/chunks/YAEaTr59.js","_app/immutable/chunks/Cs5QDfgy.js","_app/immutable/chunks/BMYYXutk.js","_app/immutable/chunks/DMmu068B.js","_app/immutable/chunks/CATTGB5e.js","_app/immutable/chunks/tVO9iPq2.js","_app/immutable/chunks/CCmkF-j2.js","_app/immutable/chunks/WYIdF738.js","_app/immutable/chunks/CLc41UGt.js"];
export const stylesheets = [];
export const fonts = [];
