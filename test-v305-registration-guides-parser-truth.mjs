import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const stable=fs.readFileSync(new URL("./stableford.js",import.meta.url),"utf8");

const generalStart=html.indexOf("function normalizeTee(value)");
const generalEnd=html.indexOf("function applySetupChanges(changes)",generalStart);
assert.ok(generalStart>0&&generalEnd>generalStart,"No se encontró el analizador General");
const canonicalPlayerNameKey=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").trim();
const generalApi=new Function("draftPlayers","rosterAddMode","handicapRectificationMode","round","canonicalPlayerNameKey",`${html.slice(generalStart,generalEnd)};return{parseSetupTranscript,normalizeSpeech,playerPositionToken,titleName}`)([],false,false,{players:[]},canonicalPlayerNameKey);

const direct=generalApi.parseSetupTranscript("Jaime catorce blancas Roberto veintiuno azules");
assert.equal(direct.ok,true);
assert.deepEqual(direct.changes.map(({position,name,handicap,tee})=>({position,name,handicap,tee})),[
  {position:null,name:"Jaime",handicap:14,tee:"Blanco"},
  {position:null,name:"Roberto",handicap:21,tee:"Azul"}
]);
const numbered=generalApi.parseSetupTranscript("Jugador uno Jaime catorce blancas jugador dos Roberto veintiuno azules");
assert.equal(numbered.ok,true);
assert.deepEqual(numbered.changes.map(({position,name})=>({position,name})),[{position:1,name:"Jaime"},{position:2,name:"Roberto"}]);

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

for(const text of ["DICTA ASÍ:","JAIME · 14 · BLANCAS","ROBERTO · 21 · AZULES","HASTA 6 JUGADORES","LUEGO TOCA OK"])assert.ok(html.includes(text),`Falta guía General: ${text}`);
for(const text of ["DICTA ASÍ:","1-# JUGADOR","2-NOMBRE","HASTA 6 JUGADORES","3-OK"])assert.ok(stable.includes(text),`Falta guía Stableford: ${text}`);
const stablefordGuide=stable.match(/<div class="newbie-registration-guide"[^>]*>([\s\S]*?)<\/div><div class="nr-mic stableford-registration-mic"/)?.[1]||"";
assert.ok(stablefordGuide,"No se encontró la guía visible Stableford");
assert.doesNotMatch(stablefordGuide,/HDCP|HANDICAP|MARCA/,'La guía visible Stableford no debe pedir HDCP ni marcas');
assert.match(stable,/Registro Stableford Scratch[\s\S]*?Jugador 1 Jaime; Jugador 2 Roberto; hasta Jugador 6/);
assert.match(html,/function generalSetupState\(\)[\s\S]*?\["match_play","four_ball"\]\.includes\(draftRoundMode\)\?\[2,4\]\.includes\(count\):count>=1[\s\S]*?complete&&required&&course\?\.configured/);
assert.match(html,/function updateGeneralSetupValidity\(\)[\s\S]*?button\.disabled=!state\.ready[\s\S]*?aria-disabled/);
assert.match(html,/#setupOk:disabled,[\s\S]*?#startStablefordRound:disabled\{/);

console.log("PASS V305 · las guías describen el dictado real y OK comparte estados equivalentes");
