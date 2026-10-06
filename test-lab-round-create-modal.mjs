import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";

const require=createRequire(import.meta.url);
const hub=require("./live-hub.js");
const liveControlApi=require("./live-control.js");
const html=fs.readFileSync("live-hub.html","utf8");
const source=fs.readFileSync("live-hub.js","utf8");

assert.match(source,/hubCreateRound.*onclick=openRoundCreate/,"CREAR TORNEO debe abrir directamente el formulario");
assert.match(html,/id="hubRoundCreateDialog"[^>]*aria-hidden="true" hidden/,"El diÃ¡logo debe iniciar cerrado y accesible como oculto");
assert.match(html,/role="dialog" aria-modal="true" aria-labelledby="hubRoundDialogTitle"/);
assert.match(html,/id="hubRoundName"[^>]*placeholder="Nombre del torneo"/);
assert.match(html,/id="hubRoundOk"[^>]*>OK<\/button>/);
assert.doesNotMatch(html,/hubRoundCreateFields/,"El nombre no debe quedar expandido permanentemente en la pÃ¡gina");
assert.doesNotMatch(html,/\\n\s*<section class="round-create"/,"El botÃ³n de la pantalla no debe dejar texto de escape visible");

assert.match(source,/hubCreateRound.*onclick=openRoundCreate/,"CREAR TORNEO debe abrir directamente el formulario");
assert.match(source,/\$\("hubRoundClose"\)\.onclick=\(\)=>setRoundCreateDialogOpen\(false\)/);
assert.match(source,/event\.key==="Escape"[^\n]*setRoundCreateDialogOpen\(false\)/);
const start=source.indexOf("  async function submitRoundCreate()");
const end=source.indexOf("  async function start()",start);
¶»§q«^