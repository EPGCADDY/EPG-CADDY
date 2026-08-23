import assert from "node:assert/strict";
import fs from "node:fs";

const sessionApi=fs.readFileSync("api/session-grupal.js","utf8");
const sourceStart=sessionApi.indexOf("const MAX_TRANSCRIPTION_PROMPT_LENGTH");
const sourceEnd=sessionApi.indexOf("\nexport default",sourceStart);

assert.ok(sourceStart>=0&&sourceEnd>sourceStart,"No se encontró el constructor protegido del prompt Realtime");
const roundTranscriptionPrompt=new Function(`${sessionApi.slice(sourceStart,sourceEnd)};return roundTranscriptionPrompt`)();
const rosters=[
  "",
  "FITO, JAIME, NELSON, JUNIOR, PEDRO, CARLOS",
  Array.from({length:6},(_,index)=>`${String.fromCharCode(65+index)}${"J".repeat(48)}`).join(","),
  "J".repeat(300)
];

for(const roster of rosters){
  const prompt=roundTranscriptionPrompt(roster);
  assert.ok(prompt.length<=1024,`Prompt Realtime fuera de contrato: ${prompt.length}`);
  assert.match(prompt,/automáticamente el hoyo activo/);
  assert.match(prompt,/Nombre \+ Score/);
  assert.match(prompt,/Falta NOMBRE/);
  assert.match(prompt,/sin score/);
  assert.match(prompt,/no le anotes/);
}

assert.match(sessionApi,/const MAX_TRANSCRIPTION_PROMPT_LENGTH = 1024/);
assert.match(sessionApi,/roundTranscriptionPrompt\(players\)/);
assert.match(sessionApi,/model: "gpt-live-transcribe", languages: \["es"\], keywords: roundKeywords/);

console.log("PASS V271 · sesión Realtime limitada a 1024 caracteres con vocabulario operacional intacto");
