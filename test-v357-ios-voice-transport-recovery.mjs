import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const headers=fs.existsSync("vercel.json")?fs.readFileSync("vercel.json","utf8"):"";
const treeFiles=fs.readdirSync("api",{withFileTypes:true}).filter(x=>x.isFile()).map(x=>x.name);

assert.equal(treeFiles.includes("voice-health.js"),false,"LAB no debe restaurar api/voice-health.js");
assert.doesNotMatch(html,/DICTA ASÍ:/,"LAB no debe mostrar guía de dictado retirada");
assert.doesNotMatch(html,/MICRÓFONO DEL IPHONE ACTIVO/,"LAB no debe reactivar captura de micrófono");
assert.doesNotMatch(html,/navigator\.mediaDevices\.getUserMedia/,"LAB no debe pedir getUserMedia");
assert.doesNotMatch(html,/new\s+(?:webkit)?SpeechRecognition\s*\(/,"LAB no debe instanciar reconocimiento de voz");
assert.match(headers,/microphone=\(\)/,"Permissions-Policy debe bloquear micrófono");
assert.match(headers,/geolocation=\(\)/,"Permissions-Policy debe bloquear geolocalización retirada");

for(const token of ["CONTROL MANUAL","TARJETA DIGITAL","HISTORIAL","ATRÁS"]){
  assert.ok(html.includes(token),`Falta control manual vigente: ${token}`);
}

console.log("PASS V357 LAB · voz/micrófono retirados y bloqueados · flujo manual vigente");
