import assert from "node:assert/strict";
import fs from "node:fs";

const universal=fs.readFileSync("api/universal-ai.js","utf8");

assert.doesNotMatch(universal,/Responde en el idioma del usuario|responde en su idioma/);
assert.equal((universal.match(/Responde siempre y exclusivamente en español neutral latinoamericano/g)||[]).length,3);
assert.ok((universal.match(/No uses inglés ni Spanglish/g)||[]).length>=3);
assert.match(universal,/aunque la transcripción contenga palabras inglesas o detecte otro idioma/);
assert.match(universal,/conserva únicamente nombres propios o términos técnicos inevitables y explícalos en español/);

console.log("PASS V371-R5 · comunicación universal, clima y tráfico obligatoriamente en español neutral; inglés y Spanglish bloqueados");
