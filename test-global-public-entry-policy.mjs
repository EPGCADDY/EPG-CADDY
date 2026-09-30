import assert from 'node:assert/strict';
import fs from 'node:fs';

const instructions=fs.readFileSync('AGENTS.md','utf8');
const productMatrix=fs.readFileSync('GOLF_SCORE_CARD_GT_PENDING_MATRIX.md','utf8');
const gate=JSON.parse(fs.readFileSync('CONTROL_PROYECTO_SCIRE/01_DIRECTRICES_PEDIDOS_Y_ORDENES_PENDIENTES/MATRIZ_GATE_0_PROYECTO.json','utf8'));
const routes=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.match(instructions,/Entrada pública permanente/);
assert.match(productMatrix,/Regla global permanente — acceso libre desde la raíz/);
assert.ok(gate.gates.some(item=>item.id==='G0-12'&&item.name==='entrada_publica_sin_credenciales'));
for(const route of ['/','/index.html','/inicio']){
  const redirect=routes.redirects.find(item=>item.source===route);
  assert.equal(redirect?.destination,'/index-grupal.html?inicio=1',`${route} must open the application directly`);
  assert.doesNotMatch(redirect.destination,/access\.html/i,`${route} must never redirect to a credential gate`);
}
for(const file of ['index.html','index-grupal.html','live-hub.html','manual.html']){
  const source=fs.readFileSync(file,'utf8');
  assert.doesNotMatch(source,/location\.(?:replace|assign)\(['"]\/access\.html|ENTRAR COMO PROPIETARIO|ACCESO PROPIETARIO REQUERIDO/i,`${file} must not block general entry`);
}
if(fs.existsSync('middleware.js')){
  const middleware=fs.readFileSync('middleware.js','utf8');
  const publicReturn=middleware.search(/if\s*\(!path\.startsWith\(["']\/api\//);
  const ownerLookup=middleware.search(/api\/app-access\?action=status/);
  assert.ok(publicReturn>=0&&(ownerLookup<0||publicReturn<ownerLookup),'middleware must pass non-API app routes before owner checks');
  assert.doesNotMatch(middleware,/Response\.redirect\([^\n]*access\.html/i);
}
if(fs.existsSync('auth-gate.js')){
  const auth=fs.readFileSync('auth-gate.js','utf8');
  const init=auth.slice(auth.indexOf('async function init(){'),auth.indexOf('if(document.readyState==='));
  assert.doesNotMatch(init,/request\(["']session["']\)|show\(\)/,'global app startup must not open a login gate');
}
console.log('PASS permanent public app entry policy: root, direct routes, PWA source and optional middleware/auth gate');
