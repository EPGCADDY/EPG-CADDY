import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/async function speakClosure\(text\)[\s\S]*await ensureSession\(\)[\s\S]*speakAuthorized\("closure",text\)/);

const speakClosureStart=html.indexOf("async function speakClosure"),speakClosureEnd=html.indexOf("async function speakQuery",speakClosureStart);
assert.ok(speakClosureStart>0&&speakClosureEnd>speakClosureStart,"No se encontró speakClosure");
const speakClosureSource=html.slice(speakClosureStart,speakClosureEnd);
let speechAttempts=0,sessionRetries=0;
const speakAuthorized=()=>++speechAttempts>1;
const ensureSession=async()=>{sessionRetries+=1;return true};
const speakClosure=new Function("speakAuthorized","ensureSession",`${speakClosureSource};return speakClosure`)(speakAuthorized,ensureSession);
assert.equal(await speakClosure("Primera vuelta."),true);
assert.equal(speechAttempts,2,"Debe reintentar el cierre hablado una vez abierta la sesión");
assert.equal(sessionRetries,1,"Debe recuperar la sesión de voz si el primer envío no estaba disponible");

console.log("PASS V265 · cierre automático recupera la sesión de voz y reintenta");
