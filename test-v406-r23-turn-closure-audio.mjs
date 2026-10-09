import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const html=readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const start=html.indexOf("async function speakClosure"),end=html.indexOf("async function speakQuery",start),source=html.slice(start,end);

assert.ok(start>0&&end>start,"Debe existir el cierre hablado");
assert.match(source,/if\(await speakAiUniversalText\(text\)\)return true/);
assert.match(source,/if\(\/Primera vuelta\\\.\/\.test\(text\)\)round\.announced\.front=false/);
assert.match(source,/if\(\/Segunda vuelta\\\.\/\.test\(text\)\)round\.announced\.back=false/);
assert.match(source,/if\(\/Ronda completa\\\.\/\.test\(text\)\)round\.announced\.complete=false/);
assert.match(source,/persist\(\);\s*return false/);
assert.match(html,/const saveManualHole=\(\)=>\{primeAiUniversalSpeechFromGesture\(\)/);
assert.match(html,/if\(result\.closure\)speakClosure\(result\.closure\)/);

console.log("PASS V406-R23 CIERRES HABLADOS · HOYOS 9 Y 18 · REINTENTO SEGURO");
