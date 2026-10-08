import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import accessGate from './middleware.js';
const html=fs.readFileSync('access.html','utf8');
const app=fs.readFileSync('index-grupal.html','utf8');
const guest=fs.readFileSync('guest-access.js','utf8');
const gateMatrix=fs.readFileSync('CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.md','utf8');
const gateJson=JSON.parse(fs.readFileSync('CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json','utf8'));
const pending=fs.readFileSync('GOLF_SCORE_CARD_GT_PENDING_MATRIX.md','utf8');
assert.match(html,/type="password"[\s\S]*CREAR ENLACE DE PRUEBA 48 HORAS/);
assert.match(html,/action=redeem[\s\S]*source=guest48h/);
assert.doesNotMatch(app,/id="ownerShare24h"|id="ownerTrialReport"|PRUEBA · 48 H|VER PRUEBA 48 H|action=report/);
assert.doesNotMatch(app,/src="\.\/auth-gate\.js"/);
assert.match(app,/function enforceGuestAccess/);
assert.match(guest,/gscg-guest48h/);
assert.match(guest,/hideGuestPrivateControls/);
for(const hiddenControl of ['ownerShare24h','ownerTrialReport','shareGlobalCard','sharePersonalCard']){
  assert.match(guest,new RegExp(hiddenControl),`Invitado temporal no debe conservar ${hiddenControl}`);
}
assert.doesNotMatch(guest,/["']gscLiveLaunch["']|["']shareRoundLiveButton["']/,'Invitado 48h debe conservar Compartir Live');
assert.match(guest,/LIVE PERMITIDO · ORGANIZADOR BLOQUEADO/);
assert.match(gateMatrix,/entrada normal no solicita correo, contraseña, inicio como propietario ni código global/);
assert.match(gateMatrix,/invitación compartida de prueba de 48 horas se conserva como función opcional/);
assert(gateJson.gates.some(gate=>gate.id==='G0-12'&&gate.name==='entrada_publica_sin_credenciales'),'La matriz JSON debe conservar G0-12 entrada pública sin credenciales');
assert.match(pending,/Invitación compartida opcional de 48 horas · CONSERVADA/);
for(const path of ['/','/index-grupal.html?inicio=1','/access.html']){
 const response=await accessGate(new Request('https://lab.example'+path));
 assert.equal(response.headers.get('x-middleware-next'),'1',`La entrada libre se bloqueó en ${path}`);
}
const expiryStart=app.indexOf('async function enforceGuestAccess(){');
const expiryEnd=app.indexOf('\nlet masterSyncChain=',expiryStart);
assert(expiryStart>=0&&expiryEnd>expiryStart,'No se encontró el control real de expiración');
let redirected=false,noticeText='';
const expirySource=app.slice(expiryStart,expiryEnd);
const expiryContext={window:{GSC_GUEST_ACCESS:true,gscgApiUrl:value=>value},document:{getElementById:()=>({set textContent(value){noticeText=value}})},fetch:async()=>({ok:false,json:async()=>({role:'none'})}),setTimeout:()=>{},location:{replace(){redirected=true}}};
vm.runInNewContext(expirySource+';enforceGuestAccess()',expiryContext);
await new Promise(resolve=>setImmediate(resolve));
assert.equal(redirected,false,'La expiración de la invitación no puede expulsar a una página propietaria');
assert.match(noticeText,/Registro y Score Card siguen disponibles/i); console.log('PASS: entrada normal abierta; enlace temporal opcional conserva emisión, canje, aislamiento y vencimiento de 48 horas');
console.log('PASS: entrada normal abierta; enlace temporal opcional conserva emisión, canje, aislamiento y vencimiento de 48 horas');