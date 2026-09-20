import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index-grupal.html","utf8");
const gate=fs.readFileSync("auth-gate.js","utf8");
const accountApi=fs.readFileSync("api/account.js","utf8");

assert(html.includes('src="./auth-gate.js"'),"Auth gate no está conectado a index-grupal.html");
assert(gate.includes("CONTINUAR CON GOOGLE · EN CONFIGURACIÓN"),"Falta Google visible como configuración pendiente");
assert(gate.includes("CONTINUAR CON APPLE · PRÓXIMAMENTE"),"Falta Apple visible como próximo");
assert(gate.includes("/api/account?action="),"Auth gate no usa API de cuenta");
assert(gate.includes('credentials:"include"'),"Auth gate debe conservar cookie de sesión");
assert(accountApi.includes('session:{method:"GET",path:"/get-session"}'),"API account perdió sesión");
assert(accountApi.includes('signin:{method:"POST",path:"/sign-in/email"}'),"API account perdió signin");
assert(accountApi.includes('signup:{method:"POST",path:"/sign-up/email"}'),"API account perdió signup");
console.log("PASS LAB account gate");