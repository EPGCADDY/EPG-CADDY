import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const access=fs.readFileSync("access.html","utf8");
const accountApi=fs.readFileSync("api/account.js","utf8");
const authGate=fs.readFileSync("auth-gate.js","utf8");
const organizerUi=fs.readFileSync("personal-events.js","utf8");
const routes=JSON.parse(fs.readFileSync("vercel.json","utf8"));

assert(!html.includes('src="./auth-gate.js"'),"La app principal no debe cargar el candado de cuenta");
assert(!html.includes('id="ownerShare24h"')&&!html.includes('id="ownerTrialReport"'),"El scorecard público no debe mostrar controles propietarios de invitación temporal");
assert(access.includes('type="password"')&&access.includes('COMPARTIR APP 48 HORAS'),"El panel temporal conserva administración autenticada de invitaciones 48h");
assert(!access.includes('ABRIR APLICACIÓN'),"La credencial del panel no puede ser requisito ni puerta para abrir la app");
assert(access.includes('no necesitas credenciales'),"El panel debe aclarar que Registro es libre");
for(const path of ["/","/index.html","/inicio"]){
  const route=routes.redirects.find(item=>item.source===path);
  assert.equal(route?.destination,"/index-grupal.html?inicio=1",`${path} must route directly to Registration`);
  assert.doesNotMatch(route.destination,/access\.html|code-entry\.html/i,`${path} must not reach a credentials gate`);
}
assert(accountApi.includes('session:{method:"GET",path:"/get-session"}'),"API account perdió sesión");
assert(accountApi.includes('signin:{method:"POST",path:"/sign-in/email"}'),"API account perdió signin");
assert(accountApi.includes('signup:{method:"POST",path:"/sign-up/email"}'),"API account perdió signup");
const authInit=authGate.match(/async function init\(\)\{[\s\S]*?\n\}/)?.[0]||"";
assert(authInit.includes("if(new URLSearchParams(location.search).get('account')==='1')show()"),"La cuenta sólo se abre mediante solicitud explícita");
assert(!authInit.includes("if(!session.ok||!session.user?.id)show()"),"No-session no debe bloquear Registro ni Scores");
assert(!organizerUi.includes("data-owner-login")&&!organizerUi.includes("GSCOpenAccountLogin"),"Organizador no debe saltar al formulario de correo y contraseña");
assert(organizerUi.includes("data-redeem-organizer")&&organizerUi.includes("organizerAuthorizationCode"),"Organizador conserva un único control por código");
console.log("PASS LAB: Registro no carga login global; credenciales permanecen sólo en la herramienta opcional de invitaciones de 48 horas");
