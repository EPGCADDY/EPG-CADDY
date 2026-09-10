import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index-grupal.html","utf8");
const control=fs.readFileSync("live-control.js","utf8");
const hub=fs.readFileSync("live-hub.html","utf8");

assert.match(html,/id="shareRoundLiveButton"[^>]*>COMPARTIR LIVE<\/button>/,"la tarjeta activa comparte LIVE");
assert.match(html,/id="shareFinalLiveButton"[^>]*>COMPARTIR LIVE<\/button>/,"la Tarjeta Digital comparte LIVE");
assert.match(html,/\["shareRoundLiveButton","shareFinalLiveButton"\]/,"ambas tarjetas usan el mismo enlace común");
assert.match(control,/async function quickShareGroup\(\)/);
assert.match(control,/scope:"group",selectedPlayerIds/,"el enlace incluye al grupo completo");
assert.match(control,/selectedPlayerIds=snapshot\.players\.map\(player=>player\.id\)/,"incluye a todos los jugadores de la tarjeta");
assert.match(control,/durationHours:24/,"el enlace directo conserva duración definida");
assert.match(control,/root\.navigator\.share\(shareData\)/,"un toque abre la hoja nativa de compartir");
assert.match(control,/function publicAppOrigin\(\)/,"LIVE resuelve el dominio público antes de compartir");
assert.match(control,/return"https:\/\/golf-sc-gt-lab\.vercel\.app"/,"un Preview de LAB comparte siempre el dominio público estable");
assert.match(control,/new URL\("\/live\.html",publicAppOrigin\(\)\)/,"el invitado abre la Score Card LIVE pública");
assert.doesNotMatch(control,/searchParams\.set\("_vercel_share"/,"el enlace LIVE nunca transporta el acceso privado de Vercel");
assert.doesNotMatch(`${html}\n${control}\n${hub}`,/>COMPARTIR GENERAL ♾️<|>COMPARTIR ♾️</,"los botones públicos usan un solo nombre");
console.log("PASS V406-R22 COMPARTIR LIVE · GRUPO COMPLETO · DOMINIO PÚBLICO · NOMBRE HOMOGÉNEO");
