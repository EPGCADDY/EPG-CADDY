import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");

assert.match(html,/V280-LOCAL-HISTORY-INSIGHTS-20260823/);
assert.match(html,/>2 · MANUAL OPCIONAL<\/div>/);
assert.match(html,/function provisionalPlayerFromOptionalRow\(source,i\)/);
assert.match(html,/provisionalHandicapProvided:hasHandicap,provisionalTeeProvided:!!tee/);
assert.match(html,/function provisionalProfileComplete\(player\)/);
assert.match(html,/data-provisional-player=/);
assert.match(html,/data-provisional-hcp=/);
assert.match(html,/data-provisional-tee=/);
assert.match(html,/provisional-player-control/);
assert.match(html,/function parseProvisionalProfileTranscript\(transcript\)/);
assert.match(html,/function applyProvisionalProfileChange\(change\)/);
assert.match(html,/jugador dos Carlos catorce blancas/);
assert.match(html,/const provisionalProfile=parseProvisionalProfileTranscript\(transcript\)/);
assert.match(html,/function openCurrentRoundDataEditor\(\)/);
assert.match(html,/openSetup\(round\.players\.length<6\?"add":"correction"\)/);
assert.match(html,/backToRegistrationButton"\)\.addEventListener\("click",\(\)=>isStablefordRound\(\)\?openStablefordDataEditor\(\):openCurrentRoundDataEditor\(\)\)/);
assert.match(html,/provisional&&!provisionalHasTee\?blankYards:tee\.yds/);
assert.match(html,/provisional&&!provisionalFull\?"":hcp/);
assert.match(html,/RONDA SIN REGISTRO/);
assert.doesNotMatch(html,/TARJETA EN SUCIO/);
assert.match(html,/GROSS OUT/);
assert.match(html,/GROSS IN/);
assert.match(html,/GROSS TOTAL/);
assert.match(html,/const f=totals\(p,FRONT\),b=totals\(p,BACK\),t=totals\(p,ALL\)/);
assert.match(html,/t\.count\?t\.gross:""/);
assert.match(html,/\.provisional-mode \.summary table\{min-width:0;width:100%;table-layout:fixed\}/);

const start=html.slice(html.indexOf("function startProvisionalScorecard()"),html.indexOf("function isOmittedScore"));
assert.match(start,/Array\.from\(\{length:6\},\(_,i\)=>provisionalPlayerFromOptionalRow\(manualDraftRows\[i\],i\)\)/);
assert.doesNotMatch(start,/savePlayersToDirectory|archiveRoundSnapshot|officiallyCloseRound/);

const parserSource=html.slice(html.indexOf("function parseProvisionalProfileTranscript"),html.indexOf("function applyProvisionalProfileChange"));
const normalizeSpeech=value=>String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
const wordNumbers={cero:0,un:1,uno:1,una:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:11,doce:12,trece:13,catorce:14,quince:15,dieciseis:16,diecisiete:17,dieciocho:18,diecinueve:19,veinte:20,treinta:30,cuarenta:40,cincuenta:50};
const parseSpanishNumberTokens=(tokens,start)=>{if(start>=tokens.length)return null;const raw=tokens[start];if(/^\d+$/.test(raw))return{value:Number(raw),next:start+1};if(wordNumbers[raw]===undefined)return null;let value=wordNumbers[raw],next=start+1;if((value===30||value===40||value===50)&&tokens[next]==="y"&&wordNumbers[tokens[next+1]]!==undefined&&wordNumbers[tokens[next+1]]<10){value+=wordNumbers[tokens[next+1]];next+=2}return{value,next}};
const normalizeTee=value=>({negro:"Negro",negra:"Negro",negros:"Negro",negras:"Negro",azul:"Azul",azules:"Azul",blanco:"Blanco",blanca:"Blanco",blancos:"Blanco",blancas:"Blanco",rojo:"Rojo",roja:"Rojo",rojos:"Rojo",rojas:"Rojo",amarillo:"Amarillo",amarilla:"Amarillo",amarillos:"Amarillo",amarillas:"Amarillo"}[normalizeSpeech(value)]||null);
const teeAt=(tokens,index)=>{while(index<tokens.length&&["marca","marcas","de","color","tee","tees"].includes(tokens[index]))index++;const tee=normalizeTee(tokens[index]);return tee?{tee,next:index+1}:null};
const titleName=value=>String(value||"").trim().replace(/\b\w/g,letter=>letter.toUpperCase());
const parseProfile=new Function("round","normalizeSpeech","parseSpanishNumberTokens","normalizeTee","teeAt","titleName","QUERY_WORDS",`${parserSource};return parseProvisionalProfileTranscript;`)({provisional:true},normalizeSpeech,parseSpanishNumberTokens,normalizeTee,teeAt,titleName,new Set(["resultado","resultados","total","totales"]));

assert.deepEqual(parseProfile("jugador dos Carlos catorce blancas"),{matched:true,ok:true,change:{slot:2,name:"Carlos",handicap:14,tee:"Blanco"}});
assert.deepEqual(parseProfile("jugador tres handicap siete"),{matched:true,ok:true,change:{slot:3,name:undefined,handicap:7,tee:undefined}});
assert.deepEqual(parseProfile("jugador cuatro marcas amarillas"),{matched:true,ok:true,change:{slot:4,name:undefined,handicap:undefined,tee:"Amarillo"}});
assert.deepEqual(parseProfile("jugador cinco Andrea"),{matched:true,ok:true,change:{slot:5,name:"Andrea",handicap:undefined,tee:undefined}});
assert.deepEqual(parseProfile("jugador tres hoyo cinco bogey"),{matched:false});
assert.deepEqual(parseProfile("resultado jugador dos total"),{matched:false});

console.log("PASS V262 · perfiles opcionales, recuperación manual/dictada y Gross total automático");
