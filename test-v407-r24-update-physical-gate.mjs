import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const gate=readFileSync('scripts/lab-update-physical-gate.mjs','utf8');
const runner=readFileSync('scripts/lab-update-browser-review.mjs','utf8');
const pkg=JSON.parse(readFileSync('package.json','utf8'));
const audit=readFileSync('audit-project.mjs','utf8');
const updater=readFileSync('update-client-e.js','utf8');
for(const token of ['gscg-lab-update-browser-evidence/v1','REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL','persistentProfileId','transitions.length<3','captura ${side} alterada','iphoneMicrophone'])assert.ok(gate.includes(token),`Gate incompleto: ${token}`);
for(const token of ['launchPersistentContext','fullPage:true','mandatoryUpdateButton','physicallyClicked:true','networkFailures','layoutIssues','localStorage.getItem(key)===value'])assert.ok(runner.includes(token),`Runner incompleto: ${token}`);
assert.equal(pkg.scripts['update:browser-review'],'node scripts/lab-update-browser-review.mjs');
assert.equal(pkg.scripts['update:browser-gate'],'node scripts/lab-update-physical-gate.mjs');
assert.ok(audit.includes('test-v407-r24-update-physical-gate.mjs'),'Auditoría no integra el candado');
assert.ok(!runner.includes("reviewType:'REVISIÓN FÍSICA'"),'Playwright no puede llamarse revisión física');
assert.ok(updater.includes('new URL("/index-grupal.html",CANONICAL_LAB_ORIGIN)'),'La navegación final debe abandonar el Preview y abrir el LAB canónico');
assert.ok(!updater.includes('new URL("/index-grupal.html",location.origin)'),'Prohibido regresar al origin Preview después de actualizar');
console.log('PASS V407-R24B: candado permanente de actualización y pruebas negativas instalado');
