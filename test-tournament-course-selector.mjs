import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const html=readFileSync("index-grupal.html","utf8");
const expected=["El Pulté","Country Club","San Isidro","Mayan Golf","Hacienda Nueva","Alta Vista","La Reunión"];

const hub=readFileSync(new URL("./live-hub.html",import.meta.url),"utf8");
const selector=hub.match(/<select id="hubRoundCourse"[^>]*>([\s\S]*?)<\/select>/)?.[1];
assert.ok(selector,"Crear torneo debe ofrecer un selector de campos");
const catalog=html.split("const COURSE_CATALOG={")[1].split("\n};")[0];
for(const [,name,,configured] of catalog.matchAll(/name:"([^"]+)",displayName:"([^"]+)",configured:(true|false)/g)){
 const option=selector.match(new RegExp(`<option value="${name}"([^>]*)>`));
 assert.ok(option,`Falta ${name} en Crear torneo`);
 assert.equal(option[1].includes("disabled"),configured==="false",`Disponibilidad distinta para ${name}`);
}
assert.equal((selector.match(/<option value="[^"]+"/g)||[]).length,expected.length);
console.log("PASS selector Campo de torneo: paridad completa con registro inicial y campos pendientes bloqueados");
