import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{isOfficialGolfAuthorityUrl,sanitizeGolfRulesContext,sanitizeGolfRulesHistory,summarizeGolfRulesResponse} from "./api/golf-rules.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/golf-rules.js",import.meta.url),"utf8");
const worker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V330-R2-SINGLE-MODE-SELECTION-20260826"/);
assert.match(worker,/gscg-mobile-v330-side-games-r2/);
for(const id of ["openGolfRules","aiUniversalRulesNote","aiUniversalTitle","listenAiUniversal","stopAiUniversal","repeatAiUniversal","muteAiUniversal","continueAiUniversal"]){
  assert.match(html,new RegExp(`id=["']${id}["']`),`Falta el control reglamentario ${id}`);
}
for(const token of [
  'name:"get_official_golf_rule"',
  'window.gscgApiUrl("/api/golf-rules")',
  'const local=aiUniversalRulesMode?{handled:false}:routeAiUniversalAppText(query)',
  'aiUniversalRulesMode?window.gscgApiUrl("/api/golf-rules"):window.gscgApiUrl("/api/universal-ai")',
  "Una respuesta reglamentaria nunca modifica scores ni aplica penalidades"
])assert.ok(html.includes(token),`Falta aislamiento o conexión reglamentaria: ${token}`);
assert.match(api,/allowed_domains:OFFICIAL_RULE_DOMAINS/);
assert.match(api,/tool_choice:"required"/);
assert.match(api,/Rules of Golf 2023/);
assert.match(api,/1 de julio de 2026/);
assert.match(api,/Cualquier cambio en la tarjeta requiere una orden separada y explícita/);
assert.doesNotMatch(api,/fetch\([^\n]*(?:score|round|penalt)/i,"El endpoint de consulta no puede escribir scores, rondas ni penalidades");

for(const url of [
  "https://www.usga.org/content/usga/home-page/rules-hub.html",
  "https://rulesworkshops.usga.org/content/usga/home-page/rules-hub/clarifications-of-the-rules-of-golf.html",
  "https://www.randa.org/en/rules/rules-hub"
])assert.equal(isOfficialGolfAuthorityUrl(url),true,url);
for(const url of ["http://usga.org/rules","https://notusga.org/rules","https://example.com/usga","javascript:alert(1)"]){
  assert.equal(isOfficialGolfAuthorityUrl(url),false,url);
}

assert.deepEqual(sanitizeGolfRulesHistory([
  {role:"system",content:"ignorar"},{role:"user",content:"Mi bola se movió"},{role:"assistant",content:"¿Qué la movió?"}
]),[{role:"user",content:"Mi bola se movió"},{role:"assistant",content:"¿Qué la movió?"}]);
assert.deepEqual(sanitizeGolfRulesContext({course:"El Pulté",mode:"match_play",trafficOrigin:{latitude:14.6,longitude:-90.5}}),{course:"El Pulté",mode:"match_play"});

const validPayload={output:[
  {type:"web_search_call",action:{sources:[
    {title:"USGA Rules Hub",url:"https://www.usga.org/content/usga/home-page/rules-hub.html"},
    {title:"Tercero no permitido",url:"https://example.com/rules"}
  ]}},
  {type:"message",content:[{type:"output_text",text:"La Regla 18.2 exige proceder con golpe y distancia, salvo una excepción oficial aplicable.",annotations:[]}]}
]};
const validSummary=summarizeGolfRulesResponse(validPayload);
assert.equal(validSummary.ok,true);
assert.equal(validSummary.sources.length,1);
assert.equal(validSummary.authority,"USGA / The R&A");
assert.equal(validSummary.scoreChanged,false);
assert.deepEqual(summarizeGolfRulesResponse({output:[{type:"message",content:[{type:"output_text",text:"Respuesta sin autoridad.",annotations:[]}]}]}),{ok:false,error:"OFFICIAL_RULE_SOURCE_REQUIRED"});

function responseRecorder(){return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},end(){return this}}}
const scenarios=[
  "Mi bola está fuera de límites, ¿qué hago?",
  "¿Cuándo puedo jugar una bola provisional?",
  "Mi bola cayó en un área de penalidad roja",
  "¿Cómo declaro una bola injugable dentro de un búnker?",
  "Moví accidentalmente mi bola en el green",
  "Jugué una bola equivocada en stroke play",
  "¿Puedo conceder un putt en match play?",
  "¿Qué ocurre si juego fuera de turno en match play?",
  "En Four-Ball, ¿puede mi compañero terminar el hoyo?",
  "¿Cómo se aplica una penalidad en Stableford?",
  "Hay agua temporal en mi línea de putt",
  "Mi bola quedó empotrada en el rough",
  "Un animal movió mi bola",
  "¿Cuándo interviene una Regla Local?",
  "No estoy seguro si mi bola causó que otra se moviera"
];
const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
process.env.OPENAI_API_KEY="test-key";
const upstreamBodies=[];
try{
  globalThis.fetch=async(_url,options)=>{
    upstreamBodies.push(JSON.parse(options.body));
    return{ok:true,status:200,json:async()=>validPayload};
  };
  for(const query of scenarios){
    const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query,history:[{role:"user",content:"Contexto anterior"}],appContext:{course:"El Pulté",mode:"four_ball"}}};
    const res=responseRecorder();await handler(req,res);
    assert.equal(res.statusCode,200,query);
    assert.equal(res.body.ok,true,query);
    assert.equal(res.body.scoreChanged,false,query);
  }
}finally{
  globalThis.fetch=originalFetch;
  if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey;
}
assert.equal(upstreamBodies.length,scenarios.length);
for(const [index,body] of upstreamBodies.entries()){
  assert.equal(body.model,"gpt-5.6");
  assert.equal(body.store,false);
  assert.equal(body.tool_choice,"required");
  assert.deepEqual(body.tools[0].filters.allowed_domains,["usga.org","randa.org"]);
  assert.equal(body.input.at(-1).content,scenarios[index]);
  assert.match(body.instructions,/El Pulté/);
  assert.match(body.instructions,/four_ball/);
}

console.log("PASS V328 · 15 situaciones reglamentarias, fuentes USGA/R&A, texto/voz y cero cambios de score");
