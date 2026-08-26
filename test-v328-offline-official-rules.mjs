import assert from "node:assert/strict";
import fs from "node:fs";
import offline from "./golf-rules-offline.js";

class MemoryStorage{
  constructor(){this.values=new Map()}
  getItem(key){return this.values.has(key)?this.values.get(key):null}
  setItem(key,value){this.values.set(key,String(value))}
}

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const moduleSource=fs.readFileSync(new URL("./golf-rules-offline.js",import.meta.url),"utf8");
const now=Date.parse("2026-08-26T12:00:00.000Z");
const officialResult={
  ok:true,
  answer:"La Regla 16.3 permite alivio sin penalidad para una bola empotrada en el área general, salvo las excepciones oficiales aplicables.",
  sources:[
    {title:"USGA Rules Hub",url:"https://www.usga.org/content/usga/home-page/rules-hub.html"},
    {title:"Fuente no autorizada",url:"https://example.com/rules"}
  ],
  authority:"USGA / The R&A",
  edition:"Rules of Golf 2023",
  clarificationsUpdated:"2026-07-01",
  scoreChanged:false
};

const storage=new MemoryStorage();
const originalQuery="Señor Pérez pregunta por una bola empotrada en el rough";
assert.equal(offline.save(storage,originalQuery,officialResult,{mode:"stroke_play"},now),true);
const serialized=storage.getItem(offline.STORAGE_KEY);
assert.ok(serialized,"Debe existir una copia local");
assert.equal(serialized.includes(originalQuery),false,"No se debe conservar la consulta completa");
assert.equal(serialized.includes("example.com"),false,"No se deben guardar fuentes no oficiales");

const similar=offline.find(storage,"¿Qué hago con la bola empotrada en rough?",{mode:"stroke_play"},now+60_000);
assert.equal(similar?.ok,true);
assert.equal(similar?.offline,true);
assert.equal(similar?.scoreChanged,false);
assert.equal(similar?.sources.length,1);
assert.match(similar?.sources[0]?.url||"",/usga\.org/);
assert.equal(offline.find(storage,"¿Qué hago con la bola empotrada en rough?",{mode:"match_play"},now+60_000),null,"No debe cruzar modalidades activas");
assert.equal(offline.find(storage,"¿Qué hago con una bola perdida?",{mode:"stroke_play"},now+60_000),null,"No debe responder con una coincidencia débil");

const expiredStorage=new MemoryStorage();
assert.equal(offline.save(expiredStorage,"bola empotrada rough",officialResult,{mode:"stroke_play"},now-offline.MAX_AGE_MS-1),true);
assert.equal(offline.find(expiredStorage,"bola empotrada rough",{mode:"stroke_play"},now),null);
assert.equal(JSON.parse(expiredStorage.getItem(offline.STORAGE_KEY)).length,0,"La entrada vencida debe podarse");

assert.equal(offline.save(new MemoryStorage(),"bola empotrada rough",{...officialResult,sources:[{title:"No oficial",url:"https://example.com/rules"}]},{mode:"stroke_play"},now),false);
assert.equal(offline.save(new MemoryStorage(),"bola empotrada rough",{...officialResult,scoreChanged:true},{mode:"stroke_play"},now),false);

const boundedStorage=new MemoryStorage();
for(let index=0;index<offline.MAX_ENTRIES+7;index+=1){
  assert.equal(offline.save(boundedStorage,`situacion reglamentaria especial numero ${1000+index}`,officialResult,{mode:"general"},now+index),true);
}
assert.equal(JSON.parse(boundedStorage.getItem(offline.STORAGE_KEY)).length,offline.MAX_ENTRIES);

for(const token of [
  '<script src="./golf-rules-offline.js"></script>',
  "function officialGolfRuleOfflineResult(query)",
  "function saveOfficialGolfRuleForOffline(query,result)",
  "MODO BÁSICO SIN CONEXIÓN · RESPUESTA OFICIAL GUARDADA",
  "Sin conexión sólo se reutilizan respuestas oficiales confirmadas",
  "REGLAS PUEDE GUARDAR SÓLO TOKENS Y RESPUESTAS OFICIALES"
])assert.ok(html.includes(token),`Falta integración sin conexión: ${token}`);
assert.match(worker,/gscg-mobile-v330-side-games-r1/);
assert.ok(worker.includes('"/golf-rules-offline.js"'));
assert.doesNotMatch(moduleSource,/(?:setScore|saveScore|applyPenalty|updateScore|fetch\()/i,"El modo sin conexión no puede escribir scores ni llamar servicios externos");

console.log("PASS V328-R2 · reglas oficiales guardadas, coincidencia segura, 90 días, 24 entradas, privacidad y cero score");
