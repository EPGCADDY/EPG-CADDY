import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';

const fail=(message)=>{console.error(`FAIL LAB UPDATE BROWSER GATE: ${message}`);process.exit(1)};
const evidencePath=resolve(process.argv[2]||process.env.GSCG_LAB_UPDATE_EVIDENCE||'evidence/lab-update-browser/evidence.json');
if(!existsSync(evidencePath))fail(`falta evidencia JSON: ${evidencePath}`);
let evidence;
try{evidence=JSON.parse(readFileSync(evidencePath,'utf8'))}catch(error){fail(`JSON ilegible: ${error.message}`)}
const expectedAlias=process.env.GSCG_LAB_ALIAS||'https://golf-sc-gt-lab.vercel.app';
const expectedCommit=process.env.GSCG_EXPECTED_COMMIT||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(evidence.schema!=='gscg-lab-update-browser-evidence/v1')fail('schema desconocido');
if(evidence.reviewType!=='REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL')fail('tipo de revisión inválido; Playwright nunca es revisión física');
if(evidence.status!=='PASS')fail('la evidencia no declara PASS');
if(evidence.alias!==expectedAlias)fail(`alias ajeno: ${evidence.alias||'(vacío)'}`);
if(evidence.commit!==expectedCommit)fail(`commit ajeno: ${evidence.commit||'(vacío)'}`);
if(evidence.browser?.engine!=='chromium'||evidence.browser?.driver!=='playwright'||!evidence.browser?.persistentProfileId)fail('navegador/perfil persistente no verificable');
if(!Array.isArray(evidence.stages)||evidence.stages.length<4)fail('se requieren cuatro versiones desplegadas');
if(new Set(evidence.stages.map(x=>x.deploymentId)).size!==evidence.stages.length)fail('deployments ausentes o repetidos');
if(!evidence.stages.every(x=>x.alias===expectedAlias&&x.deploymentId&&x.release&&x.ready===true))fail('una versión no acredita alias/deployment READY');
if(!Array.isArray(evidence.transitions)||evidence.transitions.length<3)fail('se requieren al menos tres transiciones');
const requiredPreserved=['round','history','player','score','whatsapp'];
const seenScreenshots=[];
for(const [index,transition] of evidence.transitions.entries()){
  const label=`transición ${index+1}`;
  if(transition.from!==evidence.stages[index]?.release||transition.to!==evidence.stages[index+1]?.release)fail(`${label} no corresponde a versiones consecutivas`);
  if(transition.alias!==expectedAlias||transition.profileId!==evidence.browser.persistentProfileId)fail(`${label} usó otro alias o perfil`);
  if(!transition.detected||!transition.button?.visible||!transition.button?.enabled||!transition.button?.green||!transition.button?.blinking||!transition.button?.physicallyClicked)fail(`${label} no demostró ACTUALIZAR completo`);
  if(!transition.navigated||transition.finalAction!=='ACTUALIZADO'||transition.finalRelease!==transition.to)fail(`${label} no confirmó actualización final`);
  if(!requiredPreserved.every(key=>transition.preserved?.[key]===true))fail(`${label} perdió ronda/historial/jugador/score/WhatsApp`);
  if((transition.consoleErrors||[]).length||(transition.networkFailures||[]).length||(transition.layoutIssues||[]).length)fail(`${label} contiene errores de consola, red o geometría`);
  for(const side of ['before','after']){
    const shot=transition.screenshots?.[side];
    if(!shot?.path||!shot?.sha256||!existsSync(resolve(shot.path)))fail(`${label} carece de captura ${side}`);
    const actual=createHash('sha256').update(readFileSync(resolve(shot.path))).digest('hex');
    if(actual!==shot.sha256)fail(`${label} captura ${side} alterada`);
    seenScreenshots.push(actual);
  }
}
if(new Set(seenScreenshots).size!==seenScreenshots.length)fail('capturas duplicadas o simuladas');
if(evidence.devicePhysical?.iphoneMicrophone!=='PENDING')fail('el micrófono debe permanecer como comprobación física exclusiva pendiente');
console.log(`PASS LAB UPDATE BROWSER GATE: ${evidence.transitions.length} transiciones, ${seenScreenshots.length} capturas SHA-256, alias y commit verificados; iPhone micrófono PENDING`);
