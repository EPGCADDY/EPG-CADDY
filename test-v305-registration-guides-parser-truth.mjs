import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

const generalStart=html.indexOf("function normalizeTee(value)");
const generalEnd=html.indexOf("function applySetupChanges(changes)",generalStart);
assert.ok(generalStart>0&&generalEnd>generalStart,"No se encontró el analizador General");
const canonicalPlayerNameKey=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").trim();
const generalApi=new Function("draftPlayers","rosterAddMode","handicapRectificationMode","round","canonicalPlayerNameKey",`${html.slice(generalStart,generalEnd)};return{parseSetupTranscript,looksLikeSetupRosterTranscript,normalizeSpeech,playerPositionToken,titleName,parseSpanishNumberTokens,parseSetupNumberTokens,romanHandicapValue,romanScoreValue,parseScoreNumberTokens}`)([],false,false,{players:[]},canonicalPlayerNameKey);

const direct=generalApi.parseSetupTranscript("Jaime catorce blancas Roberto veintiuno azules");
assert.equal(direct.ok,true);
assert.deepEqual(direct.changes.map(({position,name,handicap,tee})=>({position,name,handicap,tee})),[
  {position:null,name:"Jaime",handicap:14,tee:"Blanco"},
  {position:null,name:"Roberto",handicap:21,tee:"Azul"}
]);
const numbered=generalApi.parseSetupTranscript("Jugador uno Jaime catorce blancas jugador dos Roberto veintiuno azules");
assert.equal(numbered.ok,true);
assert.deepEqual(numbered.changes.map(({position,name})=>({position,name})),[{position:1,name:"Jaime"},{position:2,name:"Roberto"}]);
const repeated=generalApi.parseSetupTranscript("Jaime catorce blancas Roberto veintiuno azules Jaime catorce blancas Roberto veintiuno azules");
assert.equal(repeated.ok,true);
assert.deepEqual(repeated.changes.map(({name,handicap,tee})=>({name,handicap,tee})),[{name:"Jaime",handicap:14,tee:"Blanco"},{name:"Roberto",handicap:21,tee:"Azul"}]);
const guided=generalApi.parseSetupTranscript("Miguel catorce blancas otro jugador Roberto veintiuno azules");
assert.equal(guided.ok,true);
assert.deepEqual(guided.changes.map(({name,handicap,tee})=>({name,handicap,tee})),[{name:"Miguel",handicap:14,tee:"Blanco"},{name:"Roberto",handicap:21,tee:"Azul"}]);
const guidedNatural=generalApi.parseSetupTranscript("Miguel handicap catorce y marcas blancas otro jugador Roberto handicap veintiuno y marcas azules");
assert.equal(guidedNatural.ok,true);
assert.deepEqual(guidedNatural.changes.map(({name,handicap,tee})=>({name,handicap,tee})),[{name:"Miguel",handicap:14,tee:"Blanco"},{name:"Roberto",handicap:21,tee:"Azul"}]);
const safariRoman=generalApi.parseSetupTranscript("Jaime xiv blancas Jorge seis azules");
assert.equal(safariRoman.ok,true);
assert.deepEqual(safariRoman.changes.map(({name,handicap,tee})=>({name,handicap,tee})),[{name:"Jaime",handicap:14,tee:"Blanco"},{name:"Jorge",handicap:6,tee:"Azul"}]);
for(const [token,value] of [["i",1],["vi",6],["xiv",14],["xxi",21],["xl",40],["liv",54]])assert.deepEqual(generalApi.parseSetupNumberTokens([token],0),{value,next:1});
for(const token of ["iiv","vx","lv","mix","xivx"])assert.equal(generalApi.romanHandicapValue(token),null);
assert.equal(generalApi.parseSpanishNumberTokens(["x"],0),null,"La X del score no puede convertirse globalmente en diez");
assert.deepEqual(generalApi.parseScoreNumberTokens(["iv"],0),{value:4,next:1},"Safari IV debe convertirse únicamente dentro del Gross");
assert.deepEqual(generalApi.parseScoreNumberTokens(["v"],0),{value:5,next:1},"Safari V debe convertirse únicamente dentro del Gross");
assert.equal(generalApi.parseScoreNumberTokens(["x"],0),null,"La X oficial conserva la omisión y nunca se convierte en Gross 10");
assert.equal(generalApi.looksLikeSetupRosterTranscript("Miguel catorce blancas"),true);
assert.equal(generalApi.looksLikeSetupRosterTranscript("¿Cómo puedo ver las yardas del campo?"),false);

const stableStart=stable.indexOf("let stablefordParseSetupTranscript=null;");
const stableEnd=stable.indexOf("if(typeof applySetupChanges",stableStart);
assert.ok(stableStart>0&&stableEnd>stableStart,"No se encontró el analizador Stableford");
const overlay={classList:{contains:()=>true}};
const document={querySelector:selector=>selector.includes("data-stableford-category")?{getAttribute:()=>"senior"}:null};
const categoryConfig=category=>category==="senior"?{key:"senior",handicap:0,tee:"Blanco"}:null;
const cleanName=value=>String(value||"").trim().replace(/\s+/g," ").toUpperCase();
const stableParser=new Function("parseSetupTranscript","overlay","document","stablefordSetupCategory","categoryConfig","normalizeSpeech","playerPositionToken","MAX_PLAYERS","titleName","cleanName",`${stable.slice(stableStart,stableEnd)};return parseSetupTranscript`)(()=>({ok:false}),overlay,document,"senior",categoryConfig,generalApi.normalizeSpeech,generalApi.playerPositionToken,6,generalApi.titleName,cleanName);
const stableNumbered=stableParser("Jugador uno Jaime jugador dos Roberto");
assert.equal(stableNumbered.ok,true);
assert.deepEqual(stableNumbered.changes,[
  {position:1,name:"Jaime",handicap:0,tee:"Blanco",matrix:"Caballeros"},
  {position:2,name:"Roberto",handicap:0,tee:"Blanco",matrix:"Caballeros"}
]);
assert.equal(stableParser("Jaime Roberto").ok,false,"Stableford debe exigir la posición que usa su analizador");

for(const text of ["DICTA ASÍ:","MIGUEL · 14 · BLANCAS","OTRO JUGADOR · NOMBRE + HDCP + MARCAS","HASTA 6 JUGADORES","LUEGO TOCA OK"])assert.ok(html.includes(text),`Falta guía General: ${text}`);
for(const text of ["DICTA ASÍ:","1-# JUGADOR","2-NOMBRE","HASTA 6 JUGADORES","3-OK"])assert.ok(stable.includes(text),`Falta guía Stableford: ${text}`);
const stablefordGuide=stable.match(/<div class="newbie-registration-guide"[^>]*>([\s\S]*?)<\/div><div class="nr-mic stableford-registration-mic"/)?.[1]||"";
assert.ok(stablefordGuide,"No se encontró la guía visible Stableford");
assert.doesNotMatch(stablefordGuide,/HDCP|HANDICAP|MARCA/,'La guía visible Stableford no debe pedir HDCP ni marcas');
assert.match(stable,/Registro Stableford Scratch[\s\S]*?Jugador 1 Miguel; Jugador 2 y el nombre pronunciado; hasta Jugador 6/);
assert.match(html,/function generalSetupState\(\)[\s\S]*?\["match_play","four_ball"\]\.includes\(draftRoundMode\)\?\[2,4,6\]\.includes\(count\):count>=1[\s\S]*?complete&&required&&course\?\.configured&&gameRequired&&wolfRequired&&vegasRequired&&dotsRequired/);
assert.match(html,/function updateGeneralSetupValidity\(\)[\s\S]*?button\.disabled=!state\.ready[\s\S]*?aria-disabled/);
assert.match(html,/#setupOk:disabled,[\s\S]*?#startStablefordRound:disabled\{/);

console.log("PASS V305/V351-R5 · Safari XIV registra handicap; IV/V registran Gross; X conserva omisión");
