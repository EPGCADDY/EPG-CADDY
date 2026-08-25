import assert from "node:assert/strict";
import fs from "node:fs";
import library from "./card-library.js";
import masterSync from "./master-data-sync.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/gscg-build" content="V307-MATCH-PLAY-THICK-ARROWS-FORMAT-20260825"/);
assert.match(html,/V279-ROUND-FIELD-TOURNAMENT-PLAYER-20260823/);
for(const id of ["openCardLibraryButton","openCardLibrarySetup","openCardLibraryStableford","cardLibraryOverlay","cardLibraryMode","cardLibraryCourse","cardLibraryQuery","cardLibraryList","libraryOpenGlobal","libraryImageGlobal","libraryPdfGlobal","libraryOpenPersonal","libraryImagePersonal","libraryPdfPersonal","libraryPdfAll"])assert.match(html,new RegExp(`id="${id}"`),`Falta ${id}`);
assert.match(html,/card-library\.js/);
assert.match(html,/appVersion:"V307"/);
assert.equal(masterSync.APP_VERSION,"V283");

const snapshot=(id,mode,course,tournament,playedAt,players,status="officially_closed")=>({id,createdAt:playedAt,configured:true,officiallyClosedAt:playedAt,officialSnapshot:{roundId:id,status,mode,course,courseKey:course.toLowerCase().replaceAll(" ","_"),tournament:{name:tournament},playedAt,officiallyClosedAt:playedAt,version:status==="corrected"?2:1,sha256:id.padEnd(64,"a").slice(0,64),players:players.map((name,index)=>({id:`${id}-p${index}`,name,holes:{}}))}});
const archive=[snapshot("r1","general","El Pulté","COPA MAYO","2026-05-03T14:00:00Z",["JAIME","FITO"]),snapshot("r2","stableford","San Isidro","SERIE SENIOR","2026-06-08T14:00:00Z",["NELSON","JUNIOR"],"corrected"),{id:"incomplete",configured:true,players:[{id:"x"}]}];
const entries=library.entries(archive);
assert.equal(entries.length,2,"El historial sólo admite snapshots oficiales");
assert.equal(entries[0].roundId,"r2","Orden descendente por fecha");
assert.equal(entries[0].version,2);
assert.equal(library.filter(entries,{mode:"stableford"}).length,1);
assert.equal(library.filter(entries,{course:"EL PULTE"})[0].roundId,"r1","Filtro de campo ignora acentos");
assert.equal(library.filter(entries,{query:"fito"})[0].roundId,"r1","Búsqueda por jugador");
assert.equal(library.filter(entries,{query:"serie senior"})[0].roundId,"r2","Búsqueda por torneo");
assert.equal(library.filter(entries,{query:"2026-05-03"})[0].roundId,"r1","Búsqueda por fecha");
assert.match(html,/GSCCardLibrary\.entries\(readRoundArchive\(\)\)/);
assert.match(html,/GSCCardArtifacts\.build\(entry\.snapshot\)/);
assert.doesNotMatch(html,/function openCardLibrary[\s\S]{0,900}round=/,"Abrir el historial no reemplaza la ronda actual");

console.log("PASS V279 · historial privada local por ronda, campo, torneo, fecha y jugador sin alterar la ronda actual");
