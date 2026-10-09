// Local real Chromium rendering with explicit QA API fixtures; never an iPhone physical test.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.GSC_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const root=process.cwd(),out=path.join(root,'CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R157_BROWSER');fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname.startsWith('/api/')){let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{let data={};try{data=JSON.parse(body)}catch{}const result=pathname==='/api/personal-events'?{ok:true,personalCode:'qa-r157',accountCode:'qa-r157',events:[],aliases:[],items:[],privateItems:[]} : pathname==='/api/event-administration'?{ok:true,owner:false,accountCode:'qa-r157',events:[]} : {ok:true,rounds:[],tournaments:[],streams:[],players:[],authenticated:false};res.setHeader('Content-Type','application/json');res.end(JSON.stringify(result))});return}
 const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)){res.statusCode=403;res.end();return}res.setHeader('Content-Type',({'.js':'text/javascript','.mjs':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');try{res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end('{}')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({executablePath:process.env.GSC_CHROMIUM_PATH||'/tmp/r157-chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--disable-software-rasterizer']});
const evidence={type:'LOCAL_REAL_CHROMIUM_WITH_QA_FIXTURES',physicalIphone:false,baseCommit:'416d7658c6fb',release:'R157',cases:[],errors:[]};
async function inspect(page,name,panel,close,shot=false){
 await page.locator(panel).waitFor({state:'visible'});
 const metrics=await page.evaluate(({panel,close})=>{const el=document.querySelector(panel),button=document.querySelector('#gscShortcutsButton'),x=close&&document.querySelector(close),r=el.getBoundingClientRect(),nav=button.getBoundingClientRect(),xr=x?.getBoundingClientRect(),parent=el.parentElement,cs=getComputedStyle(parent);return{viewport:{w:innerWidth,h:innerHeight},panel:{x:r.x,y:r.y,w:r.width,h:r.height},menu:{x:nav.x,y:nav.y,w:nav.width,h:nav.height},close:xr&&{x:xr.x,y:xr.y,w:xr.width,h:xr.height,glyph:x.textContent,font:getComputedStyle(x).fontSize},top:parseFloat(cs.paddingTop),bottom:parseFloat(cs.paddingBottom),scrollHeight:parent.scrollHeight,clientHeight:parent.clientHeight,overflowX:document.documentElement.scrollWidth>innerWidth+1,menuVisible:getComputedStyle(button).display!=='none'}},{panel,close});
 assert(metrics.menuVisible,name+' MENU visible');assert.equal(metrics.menu.h,44,name+' MENU height');assert(Math.abs(metrics.menu.y-12)<1,name+' MENU top');
 if(close){assert(metrics.close,name+' close exists');assert.equal(metrics.close.w,44,name+' X width');assert.equal(metrics.close.h,44,name+' X height');assert.equal(metrics.close.font,'28px',name+' X font');assert.equal(metrics.close.glyph,'×',name+' X glyph');assert.equal(metrics.close.y,metrics.menu.y,name+' X/MENU same height');assert.equal(metrics.close.x,18,name+' X same left')}
 assert(metrics.panel.x>=0&&metrics.panel.x+metrics.panel.w<=metrics.viewport.w+1,name+' panel inside phone width');
 const available=metrics.viewport.h-metrics.top-metrics.bottom;
 if(metrics.panel.h<=available+1){assert(Math.abs(metrics.panel.y-(metrics.top+(available-metrics.panel.h)/2))<2,name+' vertically centred')}else{assert(metrics.panel.y>=metrics.top-1,name+' long panel begins below toolbar');assert(metrics.scrollHeight>=metrics.panel.h,name+' long panel reachable')}
 const entry={name,...metrics};if(shot){const file=path.join(out,`${metrics.viewport.w}x${metrics.viewport.h}-${name}.png`);await page.screenshot({path:file,fullPage:false});entry.screenshot=path.relative(root,file);entry.sha256=createHash('sha256').update(fs.readFileSync(file)).digest('hex')};evidence.cases.push(entry);console.log('PASS',metrics.viewport.w+'x'+metrics.viewport.h,name);
}
try{for(const viewport of [{width:430,height:932}]){
 const context=await browser.newContext({viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2160/viewport.width,serviceWorkers:'block'});const page=await context.newPage();page.on('pageerror',error=>evidence.errors.push({viewport,error:error.message}));
 const open=async()=>{await page.goto(base+'/index-grupal.html?inicio=1');await page.locator('#gscShortcutsButton').waitFor()};await open();
 await inspect(page,'registro','#setupStep1','#cancelSetup',true);
 await page.locator('#gscShortcutsButton').click();await inspect(page,'menu','#gscShortcutsOverlay .sheet','#gscShortcutsOverlay .close',true);
 const order=await page.locator('#gscShortcutsOverlay [data-shortcut]').evaluateAll(nodes=>nodes.map(n=>n.dataset.shortcut));assert.equal(order[order.indexOf('manual')+1],'registration');
 await page.locator('[data-shortcut="organizer"]').click();await inspect(page,'organizador','#gscShortcutsOverlay .sheet','#gscShortcutsOverlay .close',true);
 await page.locator('#gscShortcutsButton').click();assert(await page.locator('[data-shortcut="registration"]').isVisible());await page.locator('[data-shortcut="registration"]').click();assert(await page.locator('#setupStep1').isVisible());
 // Open the genuine personal-event UI with seeded return values, without changing server data.
 await page.evaluate(()=>GSCPersonalEvents.presentCreatedTournament({eventId:'11111111-1111-4111-8111-111111111111',name:'QA R157',joinCode:'QA157ABCDE'}));await inspect(page,'id-torneo','#gscPersonalDialog .scores-detail','#gscPersonalDialog [data-close]',true);await page.locator('#gscPersonalDialog [data-close]').click();
 await page.locator('#gscShortcutsButton').click();await page.locator('[data-shortcut="create-round"]').click();await inspect(page,'crear-grupo','#gscPersonalDialog .scores-detail','#gscPersonalDialog [data-close]',true);await page.locator('#gscPersonalDialog [data-close]').click();
 await page.evaluate(()=>GSCPersonalEvents.authorizeOrganizer(()=>{},'QA'));await inspect(page,'autorizacion','#gscPersonalDialog .scores-detail','#gscPersonalDialog [data-close]');await page.locator('#gscPersonalDialog [data-close]').click();
 await page.locator('#gscShortcutsButton').click();await page.locator('[data-shortcut="saved"]').click();await inspect(page,'historial','#cardLibraryOverlay .card-library-panel','#closeCardLibrary',true);await page.locator('#closeCardLibrary').click();
 for(const [name,fn,panel,close] of [
  ['estadisticas','openHistoryInsights','#historyInsightsOverlay .history-insights-panel','#closeHistoryInsights'],
  ['respaldo','openCentralAccount','#accountBackupOverlay .account-backup-card','#closeAccountBackup'],
  ['instalar','openInstallGuide','#installAppOverlay .pwa-install-card','#closeInstallApp'],
  ['stableford-registro','openFreshStablefordSetup','#stablefordSetupOverlay .new-round-card','#backStablefordSetup']
 ]){await page.evaluate(fn=>window[fn](),fn);await inspect(page,name,panel,close,true);await page.locator(close).click()}
 // Local fixture only: populate a legitimate round shape and use the official renderer.
 for(const mode of ['general','stableford','match_play','four_ball','universales']){
 await page.evaluate(mode=>{round={...blankRound(),id:'qa-layout-'+mode,configured:true,mode,players:[0,1,2,3].map((_,i)=>normalizePlayer({id:'qa'+i,name:'QA JUGADOR '+(i+1),handicap:14,tee:'Blanco',tournamentCategory:'senior',holes:{1:5,2:4}},i)),startedAt:new Date().toISOString(),createdAt:new Date().toISOString()};render();document.querySelectorAll('.overlay.visible,.account-backup-overlay.visible,.pwa-install-overlay.visible').forEach(n=>n.classList.remove('visible'))},mode);
 await page.evaluate(()=>openFinalDigitalCard());await inspect(page,'tarjeta-'+mode,'#finalCardOverlay .final-card-panel','#closeFinalCard',true);await page.locator('#closeFinalCard').click();
 await page.evaluate(()=>openProfileCorrection());await inspect(page,'editar-'+mode,'#setupStep1','#cancelSetup');await page.locator('#cancelSetup').click();
 }
 await page.evaluate(()=>{round.officiallyClosedAt=new Date().toISOString();round.officialSnapshot={};openOfficialCorrection()});await inspect(page,'correccion','#officialCorrectionOverlay .new-round-card','#cancelOfficialCorrection',true);await page.locator('#cancelOfficialCorrection').click();
 
 await page.evaluate(()=>GSCScoresUI.detail({name:'QA JUGADOR',holes:Array.from({length:18},(_,i)=>({hole:i+1,gross:5,net:4}))},{course:'El Pulté',mode:'general',playedAt:'2026-10-03'},'QA R157'));await inspect(page,'detalle-18','.scores-detail-backdrop .scores-detail','[data-scores-close]',true);await page.locator('[data-scores-close]').click();
 await page.evaluate(()=>GSCPrivateRounds.openGroupScores(round));await inspect(page,'grupo-vacio','[data-gsc-dialog-card]','[data-gsc-dialog-card] [data-close]',true);await page.locator('[data-gsc-dialog-card] [data-close]').click();

 await page.evaluate(()=>{document.querySelector('#gscLiveOverlay').classList.add('visible')});await inspect(page,'live-consentimiento','#gscLiveOverlay .gsc-live-panel','#closeGscLive');await page.locator('#closeGscLive').click();
 await page.evaluate(()=>{registrationMissingPrompt(0,'category')});await inspect(page,'dato-faltante','#registrationMissingOverlay .registration-missing-card','#registrationMissingOverlay [data-gsc-close]');await page.locator('#registrationMissingOverlay [data-gsc-close]').click();
 await page.goto(base+'/event-administration.html');await page.locator('#gscShortcutsButton').waitFor();await inspect(page,'administracion','main','[data-gsc-close]',true);
 // Native top-layer dialog: actual DOM/form and actual close/menu handlers.
 await page.evaluate(()=>{document.getElementById('action').innerHTML='<h2>QA CONFIRMACIÓN</h2>';document.getElementById('actionDialog').showModal()});
 const native=await page.locator('#actionDialog [data-gsc-close]').boundingBox(),menu=await page.locator('#actionDialog [data-gsc-menu]').boundingBox();assert.equal(native.y,menu.y);assert.equal(native.width,44);assert.equal(menu.height,44);await page.locator('#actionDialog [data-gsc-menu]').click();assert(await page.locator('#gscShortcutsOverlay .sheet').isVisible());evidence.cases.push({name:'administracion-dialog-menu',viewport});
 await context.close();
}assert.equal(evidence.errors.length,0,'page errors');evidence.status='PASS';}catch(error){evidence.status='FAIL';evidence.failure=error.stack;console.error(error.stack);process.exitCode=1}finally{fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2)+'\n');await browser.close();server.close()}
