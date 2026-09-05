import assert from "node:assert/strict";
import fs from "node:fs";
import {summarizeUniversalResponse} from "./api/universal-ai.js";

const classic={output:[{type:"message",content:[{type:"output_text",text:"Primera respuesta"}]}]};
const gatewayText={output:[{type:"message",content:[{type:"text",text:"Segunda respuesta"}]}]};
const direct={output_text:"Tercera respuesta"};
assert.equal(summarizeUniversalResponse(classic).answer,"Primera respuesta");
assert.equal(summarizeUniversalResponse(gatewayText).answer,"Segunda respuesta");
assert.equal(summarizeUniversalResponse(direct).answer,"Tercera respuesta");
const worker=fs.readFileSync("service-worker.js","utf8");
assert.match(worker,/v393-manual-hole-universal-response/);
console.log("PASS V393 · Universal conserva respuestas de tres turnos aunque el Gateway alterne formatos válidos");
