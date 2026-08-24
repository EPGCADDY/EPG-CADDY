import assert from "node:assert/strict";
import fs from "node:fs";
import analytics from "./historical-analytics.js";
import masterSync from "./master-data-sync.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
assert.match(html,/gscg-build" content="V306-UNIVERSAL-FIELDS-IN-OUT-GUIDE-20260824"/);
assert.match(html,/V280-WRITTEN-GENERAL-STABLEFORD-STATS-20260823/);
for(const id of ["openHistoryInsights","historyInsightsOverlay","historyInsightsQuery","runHistoryInsights","historyInsightsResult","closeHistoryInsights"])assert.match(html,new RegExp(`id="${id}"`),`Falta ${id}`);
assert.match(html,/data-history-query="ESTADÍSTICAS DE PUNTOS STABLEFORD DEL ÚLTIMO MES"/);
assert.match(html,/GSCHistoricalAnalytics\.run\(query,cardLibraryOfficialRounds\(\)\)/);
assert.match(html,/historyInsightsResult"\)\.textContent=result\.matched\?result\.speech/);
assert.match(html,/appVersion:"V306"/);
assert.equal(masterSync.APP_VERSION,"V283");

const player=(name,scores,points=false)=>({name,holes:Object.fromEntries(scores.map((gross,index)=>[index+1,{gross,net:gross-1,par:4,diff:gross-5,...(points?{points:Math.max(0,6-gross)}:{})}]))});
const rounds=[
 {id:"g1",configured:true,createdAt:"2026-08-05T15:00:00Z",mode:"general",course:"El Pulté",tournament:{name:"COPA AGOSTO"},players:[player("JAIME",[4,5,3]),player("FITO",[5,5,4])]},
 {id:"s1",configured:true,createdAt:"2026-08-12T15:00:00Z",mode:"stableford",course:"San Isidro",tournament:{name:"SERIE SENIOR"},players:[player("NELSON",[4,3,5],true)]}
],now=new Date("2026-08-23T18:00:00Z");
assert.match(analytics.run("reporte del ultimo mes torneo copa agosto",rounds,{now}).speech,/1 rondas/);
assert.match(analytics.run("estadísticas de puntos stableford del último mes",rounds,{now}).speech,/promedio 2\.0 puntos/);
const comparison=analytics.run("comparación Jaime y Fito último mes",rounds,{now});
assert.equal(comparison.data.compared.length,2);
assert.equal(comparison.data.compared[0].player,"JAIME");
assert.match(analytics.run("reporte general del último mes El Pulté",rounds,{now}).speech,/1 rondas/);

console.log("PASS V280 · consulta histórica escrita General/Stableford, filtros, comparación, tendencia y puntos");
