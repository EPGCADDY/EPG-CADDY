import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/if\(!target\)return;/,"Un evento ajeno a los campos del registro debe ignorarse sin error");
assert.match(html,/addEventListener\("compositionstart"[\s\S]*composingRegistrationNames\.add\(input\)/);
assert.match(html,/addEventListener\("compositionend"[\s\S]*inputType:"insertFromComposition"/);
assert.match(html,/e\.inputType!=="insertReplacementText"&&applyInlineManualRosterPhrase/,
  "La selección de una sugerencia iOS se conserva como texto literal");
assert.match(html,/data-draft-name="\$\{i\}" type="text" inputmode="text" value="\$\{safeName\}" autocomplete="name" autocapitalize="words" autocorrect="on" spellcheck="true" enterkeyhint="next"/);
assert.equal((html.match(/data-stableford-name="\d" autocomplete="name" .{0,250}autocapitalize="words" autocorrect="on" spellcheck="true" inputmode="text"/g)||[]).length,6,
  "Las seis entradas de nombre Stableford habilitan sugerencias y dictado del teclado");

const start=html.indexOf("function handleManualDraftInput("),end=html.indexOf('\n$("detectedBody").addEventListener("input"',start);
assert.ok(start>=0&&end>start,"Debe existir el manejador oficial de texto de Registro");
const rows=[{name:"",dirty:false}],composing=new WeakSet(),calls={persist:0,reveal:0,validity:0,phrase:0};
const handler=new Function("manualDraftRows","composingRegistrationNames","persistDraftState","revealNextRegistrationSlot","updateGeneralSetupValidity","applyInlineManualRosterPhrase",
  `${html.slice(start,end)};return handleManualDraftInput`)(rows,composing,()=>calls.persist++,()=>calls.reveal++,()=>calls.validity++,()=>{calls.phrase++;return false});
const input={value:"María López",dataset:{draftName:"0"},closest(selector){return selector==="[data-draft-name]"?this:null}};

handler({target:input,isComposing:false,inputType:"insertReplacementText"});
assert.equal(rows[0].name,"María López","Una sugerencia tocada se guarda completa, con acentos y espacios");
assert.equal(calls.phrase,0,"La sugerencia no se trata como comando dictado");
assert.equal(calls.persist,1,"La sugerencia queda guardada en el borrador al recibir input");

input.value="José Antonio";
composing.add(input);
handler({target:input,isComposing:true,inputType:"insertCompositionText"});
assert.equal(rows[0].name,"José Antonio","El dictado se conserva durante composición");
assert.equal(calls.phrase,0,"No se interpreta un dictado antes de que iOS lo termine");
composing.delete(input);
handler({target:input,isComposing:false,inputType:"insertFromComposition"});
assert.equal(rows[0].name,"José Antonio","El resultado final del dictado se guarda como nombre");
assert.equal(calls.phrase,1,"Las frases dictadas completas conservan el analizador autorizado nombre/HDCP/marcas");
assert.ok(calls.validity>=2);

console.log("PASS R192 iPhone keyboard: accepted suggestions, Spanish accents, native dictation composition, draft persistence and Stableford names");
