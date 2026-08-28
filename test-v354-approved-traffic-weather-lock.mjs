import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const controlRoot="CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES";
const lockPath=`${controlRoot}/V354_TRAFFIC_WEATHER_APPROVAL.lock.json`;
const approvalPath=`${controlRoot}/APROBACION_V354_TRAFICO_CLIMA_MUNDIAL.md`;
const lock=JSON.parse(fs.readFileSync(lockPath,"utf8"));
const approval=fs.readFileSync(approvalPath,"utf8");
const read=path=>fs.readFileSync(path,"utf8");
const sha256=path=>crypto.createHash("sha256").update(fs.readFileSync(path)).digest("hex");

assert.equal(lock.schema,"gscg-approved-module-lock/v1");
assert.equal(lock.status,"APPROVED_AND_LOCKED_IN_REPOSITORY");
assert.equal(lock.ownerApprovalDate,"2026-08-28");
assert.equal(lock.repository,"EPGCADDY/EPG-CADDY");
assert.equal(lock.branch,"v354-google-traffic-weather-integrated");
assert.equal(lock.approvedCodeBaselineCommit,"f36ff684a0f778aadc58099923781d2d524330fc");
assert.equal(lock.productionBaselineCommit,"0dc1ba7a62b6bd6aec92752c539ca641cf950e26");
assert.equal(lock.previewDeployment,"dpl_F24mYA2iYLpj9esQKp2dHHpGwv4s");
assert.match(lock.changePolicy,/orden nueva y explícita del propietario/);

for(const [path,expected] of Object.entries(lock.exactFileSha256||{})){
  assert.ok(fs.existsSync(path),`Falta archivo aprobado V354: ${path}`);
  assert.equal(sha256(path),expected,`Cambio no autorizado en bloque aprobado V354: ${path}`);
}

const traffic=read("api/_lib/traffic.js");
const trafficApi=read("api/traffic.js");
const universal=read("api/universal-ai.js");
const weather=read("api/weather.js");
const html=read("index-grupal.html");
const audit=read("audit-project.mjs");
const quality=read("scripts/project-quality-gate.mjs");
const agents=read("AGENTS.md");
const workflow=read(".github/workflows/roadmap-gate.yml");

assert.match(traffic,/routingPreference:"TRAFFIC_AWARE_OPTIMAL"/);
assert.match(traffic,/resolveTrafficLocationContext/);
assert.match(traffic,/contextCoordinates/);
assert.doesNotMatch(traffic,/defaultCountry/);
assert.match(trafficApi,/contextCoordinates:body\.contextCoordinates\|\|body\.originCoordinates/);
assert.match(universal,/directTrafficRouteFromQuery/);
assert.match(universal,/trafficOriginNeedsDevice/);
assert.match(universal,/contextCoordinates:appContext\?\.trafficOrigin/);
assert.match(universal,/Google Maps Routes, modo TRAFFIC_AWARE_OPTIMAL/);
assert.doesNotMatch(universal,/defaultCountry:"Guatemala"/);
assert.match(weather,/Google Weather/);
assert.match(weather,/Open-Meteo \(respaldo mundial\)/);
assert.match(weather,/weather primary unavailable; using worldwide fallback/);
assert.doesNotMatch(weather,/searchParams\.set\("region",\s*"gt"\)/);
assert.match(html,/const deviceCoordinates=await currentBrowserCoordinates\(\)/);
assert.match(html,/contextCoordinates:\{latitude:deviceCoordinates\.latitude,longitude:deviceCoordinates\.longitude\}/);
assert.match(audit,/test-v354-approved-traffic-weather-lock\.mjs/);
assert.match(quality,/test-v354-approved-traffic-weather-lock\.mjs/);
assert.match(workflow,/Block unauthorized traffic and weather changes/);
assert.match(workflow,/node test-v354-approved-traffic-weather-lock\.mjs/);
assert.match(agents,/bloque V354 de tráfico, clima y GPS mundial aprobado/);

for(const token of [
  "APROBADO Y CONGELADO EN EL REPOSITORIO",
  "f36ff684a0f778aadc58099923781d2d524330fc",
  "dpl_F24mYA2iYLpj9esQKp2dHHpGwv4s",
  "El Pulté Golf → Pradera Concepción",
  "Piazza Navona → Colosseo, Roma",
  "Tokyo Station → Shibuya Crossing",
  "0.6–3.0 °C",
  "Producción no cambia"
])assert.match(approval,new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));

console.log("PASS V354 LOCK · tráfico, clima y GPS mundial aprobados y protegidos");
