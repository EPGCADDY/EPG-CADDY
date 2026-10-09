import {createHash,randomUUID} from 'node:crypto';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve,relative} from 'node:path';
import {spawnSync,execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const configPath=resolve(process.argv[2]||'evidence/lab-update-browser/stages.json');
const config=JSON.parse(readFileSync(configPath,'utf8'));
const alias=config.alias||'https://golf-sc-gt-lab.vercel.app';
if(!Array.isArray(config.stages)||config.stages.length<4)throw new Error('stages.json exige cuatro etapas');
const outDir=resolve(config.outputDir||'evidence/lab-update-browser');
const profileDir=resolve(config.profileDir||`${outDir}/profile`);
mkdirSync(outDir,{recursive:true});mkdirSync(profileDir,{recursive:true});
const profileId=config.persistentProfileId||randomUUID();
const context=await chromium.launchPersistentContext(profileDir,{headless:config.headless!==false,executablePath:process.env.GSCG_CHROMIUM_PATH||'/tmp/chromium',viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
const page=context.pages()[0]||await context.newPage();
const consoleErrors=[],networkFailures=[];
page.on('console',message=>{if(message.type()==='error')consoleErrors.push(message.text())});
page.on('requestfailed',request=>networkFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText||''}`));
const sha256=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const shot=async name=>{const path=resolve(outDir,`${name}.png`);await page.screenshot({path,fullPage:true});return{path:relative(process.cwd(),path),sha256:sha256(path)}};
const release=()=>page.locator('meta[name="gscg-release"]').getAttribute('content');
const seed={
  'gscg-browser-gate-round':JSON.stringify({id:'gate-round',configured:true,players:[{name:'JAIME GATE',handicap:14,whatsapp:'55501234',scores:[4]}]}),
  'gscg-browser-gate-history':JSON.stringify([{id:'gate-history',score:4}]),
  'gscg-browser-gate-player':'JAIME GATE','gscg-browser-gate-score':'4','gscg-browser-gate-whatsapp':'+50255501234'
};
async function activate(stage){
  if(!Array.isArray(stage.activateCommand)||!stage.activateCommand.length)throw new Error(`Falta activateCommand para ${stage.release}`);
  const [command,...args]=stage.activateCommand,result=spawnSync(command,args,{stdio:'inherit',env:process.env});
  if(result.status!==0)throw new Error(`No se pudo activar ${stage.release}`);
}
async function layoutIssues(){return page.evaluate(()=>{const issues=[];for(const el of document.querySelectorAll('body *')){const r=el.getBoundingClientRect(),s=getComputedStyle(el);if(s.display==='none'||s.visibility==='hidden'||!r.width||!r.height)continue;if(r.left<-1||r.right>innerWidth+1)issues.push({tag:el.tagName,id:el.id,left:r.left,right:r.right,width:innerWidth});}return issues.slice(0,100)});}
const stages=config.stages.map(stage=>({alias,deploymentId:stage.deploymentId,release:stage.release,ready:stage.ready===true}));
const transitions=[];
await activate(config.stages[0]);await page.goto(alias,{waitUntil:'networkidle'});
if(await release()!==config.stages[0].release)throw new Error('La versión A no quedó activa en el alias');
await page.evaluate(values=>{for(const [key,value] of Object.entries(values))localStorage.setItem(key,value)},seed);
for(let index=1;index<config.stages.length;index++){
  const from=config.stages[index-1],to=config.stages[index],consoleStart=consoleErrors.length,networkStart=networkFailures.length;
  await activate(to);
  await page.waitForFunction(target=>{const root=document.querySelector('#mandatoryUpdate'),button=document.querySelector('#mandatoryUpdateButton');return root?.classList.contains('available')&&!button?.disabled&&document.querySelector('#mandatoryUpdateAction')?.textContent.trim()==='ACTUALIZAR'},to.release,{timeout:90000,polling:500});
  const button=page.locator('#mandatoryUpdateButton'),style=await button.evaluate(el=>{const s=getComputedStyle(el),root=getComputedStyle(el.closest('.mandatory-update'));return{visible:!!(el.offsetWidth&&el.offsetHeight),enabled:!el.disabled,green:/rgb\(49, 255, 0\)/.test(s.color),blinking:root.animationName==='gscUpdatePulse'||s.animationName==='gscUpdatePulse'}});
  const before=await shot(`${index}-${from.release}-to-${to.release}-before`);
  await button.click();await page.waitForFunction(target=>document.querySelector('meta[name="gscg-release"]')?.content===target&&document.querySelector('#mandatoryUpdateAction')?.textContent.trim()==='ACTUALIZADO',to.release,{timeout:90000});
  const after=await shot(`${index}-${from.release}-to-${to.release}-after`);
  const preserved=await page.evaluate(values=>Object.fromEntries(Object.entries(values).map(([key,value])=>[key.replace('gscg-browser-gate-',''),localStorage.getItem(key)===value])),seed);
  transitions.push({from:from.release,to:to.release,alias,profileId,detected:true,button:{...style,physicallyClicked:true},navigated:true,finalAction:'ACTUALIZADO',finalRelease:await release(),preserved,consoleErrors:consoleErrors.slice(consoleStart),networkFailures:networkFailures.slice(networkStart),layoutIssues:await layoutIssues(),screenshots:{before,after}});
}
await context.close();
const evidence={schema:'gscg-lab-update-browser-evidence/v1',reviewType:'REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL',status:transitions.every(x=>!x.consoleErrors.length&&!x.networkFailures.length&&!x.layoutIssues.length)?'PASS':'FAIL',alias,commit:config.commit||execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:{engine:'chromium',driver:'playwright',persistentProfileId:profileId},stages,transitions,devicePhysical:{iphoneMicrophone:'PENDING'},createdAt:new Date().toISOString()};
writeFileSync(resolve(outDir,'evidence.json'),JSON.stringify(evidence,null,2));
console.log(`${evidence.status} REVISIÓN AUTOMATIZADA EN NAVEGADOR REAL: ${transitions.length} transiciones; evidencia ${resolve(outDir,'evidence.json')}`);
if(evidence.status!=='PASS')process.exit(1);
