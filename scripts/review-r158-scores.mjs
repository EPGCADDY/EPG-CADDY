// Local real Chromium rendering with explicit QA API fixtures; never an iPhone physical test.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const {chromium}=await import(process.env.GSC_PLAYWRIGHT_MODULE||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs');
const root=process.cwd(),out=path.join(root,'CONTROL_PROYECTO_SCIRE/EVIDENCIAS_R158_SCORES');fs.mkdirSync(out,{recursive:true});
let playerCount=60,mode='general';const eventId='11111111-1111-4111-8111-111111111111';
const players=()=>Array.from({length:playerCount},(_,i)=>({id:'qa-'+i,name:'QA JUGADOR '+String(i+1).padStart(2,'0'),handicap:14,tournamentCategory:'b',holes:i===59?[]:Array.from({length:18},(_,n)=>({hole:n+1,par:4,gross:5,net:4,relativeToPar:0})),totals:{gross:90,net:72,relativeToPar:0}}));
const streams=()=>Array.from({length:Math.ceil(playerCount/4)},(_,i)=>({id:'qa-stream-'+i,groupLabel:'QA '+i,snapshot:{id:'qa-card-'+i,course:'El Pulté',playedAt:'2026-10-03',mode,personal:true,players:players().slice(i*4,i*4+4)}}));
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname.startsWith('/api/')){let body='';req.on('data',c=>body+=c);req.on('end',()=>{let data={};try{data=JSON.parse(body)}catch{}
 let result={ok:true,authenticated:false,rounds:[],events:[],streams:[],tournaments:[]};
 if(pathname==='/api/personal-events'){
 result={ok:true,personalCode:'qa-r158',accountCode:'qa-r158',events:[{eventId,eventKind:'private',name:'QA MI GRUPO',role:'player',players:players().slice(0,4)}],aliases:[]};
 if(data.action==='directory')result={ok:true,events:[]};
 if(data.action==='read')result={ok:true,tournament:{id:eventId,name:'QA MI GRUPO',configuration:{course:'El Pulté',mode,playedAt:'2026-10-03'}},membership:{role:'player',players:players().slice(0,4)},streams:streams()};
 if(data.action==='share-code')result={ok:true,name:'QA MI GRUPO',code:'QA-ONLY'};
 }
 if(pathname==='/api/live')result={ok:true,rounds:[],streams:data.cursor?streams().slice(12):streams().slice(0,12),nextCursor:data.cursor?null:'qa-next',tournament:{id:eventId,name:'QA MI GRUPO'},stream:streams()[0]};
 if(pathname==='/api/event-administration')result={ok:true,owner:false,accountCode:'qa-r158',events:[]};
 res.setHeader('Content-Type','application/json');res.end(JSON.stringify(result))});return}
 const file=path.resolve(root,'.'+pathname);if(!file.startsWith(root+path.sep)){res.statusCode=403;res.end();return}res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');try{res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end('{}')}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({executablePath:process.env.GSC_CHROMIUM_PATH||'/tmp/r157-chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const evidence={release:'R158',type:'LOCAL_REAL_CHROMIUM_QA_FIXTURES',physicalIphone:false,cases:[],errors:[]};
async function controls(page,name,close){
 await page.locator(close).waitFor({state:'visible'});const menu=page.locator('#gscShortcutsButton');assert(await menu.isVisible(),name+' menu');
 const m=await menu.boundingBox(),x=await page.locator(close).boundingBox();assert.equal(x.width,44,name);assert.equal(x.height,44,name);assert.equal(m.height,44,name);if(x.x!==18)console.log('DEBUG',await page.locator(close).evaluate(el=>({css:el.style.cssText,computed:{position:getComputedStyle(el).position,left:getComputedStyle(el).left,top:getComputedStyle(el).top,transform:getComputedStyle(el).transform},ancestors:[el.parentElement,el.parentElement.parentElement].map(n=>({tag:n.tagName,class:n.className,contain:getComputedStyle(n).contain,transform:getComputedStyle(n).transform,filter:getComputedStyle(n).filter,perspective:getComputedStyle(n).perspective,will:getComputedStyle(n).willChange}))})));assert.equal(x.x,18,name);assert.equal(x.y,m.y,name);assert.equal(x.y,12,name);
 assert.equal((await page.locator(close).innerText()).trim(),'×',name+' glyph');
 evidence.cases.push({name,viewport:page.viewportSize(),close:x,menu:m});console.log('PASS',name);
}
async function capture(page,name){const file=path.join(out,name+'.png');await page.screenshot({path:file});evidence.cases.at(-1).screenshot=path.relative(root,file);evidence.cases.at(-1).sha256=createHash('sha256').update(fs.readFileSync(file)).digest('hex')}
try{for(const width of [390,430]){const context=await browser.newContext({viewport:{width,height:932},isMobile:true,hasTouch:true,deviceScaleFactor:2160/width,serviceWorkers:'block'});const page=await context.newPage();page.on('pageerror',e=>evidence.errors.push(e.message));
 await page.goto(base+'/index-grupal.html?inicio=1');await page.locator('#gscShortcutsButton').waitFor();
 const before=await page.evaluate(()=>JSON.stringify(round));
 for(const kind of ['private','tournament']){await page.evaluate(({eventId,kind})=>{localStorage.setItem('gsc-tournament-connect-selection-v1',JSON.stringify({personal:true,eventKind:kind,roundId:round.id,id:eventId,label:'QA IDENTIFICACION'}));renderActiveTournamentHeading()},{eventId,kind});for(const id of ['activeTournamentHeadingName','setupEventIdentificationName'])assert.equal(await page.locator('#'+id).textContent(),(kind==='private'?'MI GRUPO':'TORNEO')+' · QA IDENTIFICACION');evidence.cases.push({name:width+'-identificacion-'+kind,viewport:page.viewportSize()});console.log('PASS',width+'-identificacion-'+kind)}
 await page.evaluate(()=>{localStorage.removeItem('gsc-tournament-connect-selection-v1');renderActiveTournamentHeading()});for(const id of ['activeTournamentHeading','setupEventIdentification'])assert(await page.locator('#'+id).evaluate(el=>el.hidden));

 await page.evaluate(()=>GSCPrivateRounds.openGroupScores(round));await controls(page,width+'-grupo-sin-pertenencia','[data-gsc-dialog-card] [data-close]');assert((await page.locator('[data-gsc-dialog-card]').innerText()).includes('NO PERTENECES A NINGÚN GRUPO'));await page.locator('[data-gsc-dialog-card] [data-close]').click();
 for(mode of ['general','stableford','match_play','four_ball','universales']){
 await page.evaluate(eventId=>localStorage.setItem('gsc-tournament-connect-selection-v1',JSON.stringify({personal:true,eventKind:'private',roundId:round.id,id:eventId,label:'QA MI GRUPO'})),eventId);
 await page.evaluate(()=>GSCPrivateRounds.openGroupScores(round));await page.locator('.private-score-table tbody tr').last().waitFor();assert.equal(await page.locator('.private-score-table tbody tr').count(),60);assert.equal(await page.locator('.group-scores-heading h2').innerText(),'SCORES MI GRUPO');assert.deepEqual(await page.locator('.private-score-table th').allTextContents(),['NOMBRE','HDCP','HOYO','GROSS','NETO','+/−']);
 assert(!(await page.locator('[data-gsc-dialog-card]').innerText()).includes('ORGANIZACIÓN'));await controls(page,width+'-grupo-'+mode,'[data-gsc-dialog-card] [data-close]');
 await page.locator('.private-score-table tr[data-score-player="59"]').scrollIntoViewIfNeeded();assert((await page.locator('.private-score-table tr[data-score-player="59"]').innerText()).includes('—'));
 await page.locator('.private-score-table tr[data-score-player="0"]').dblclick();await controls(page,width+'-grupo-detalle-'+mode,'[data-scores-close]');assert.equal(await page.locator('.scores-nine td').count(),18);assert.equal(await page.locator('.scores-detail h3').innerText(),'QA JUGADOR 01');await page.locator('[data-scores-close]').click();assert.equal(await page.locator('.private-score-table tbody tr').count(),60);await page.locator('[data-gsc-dialog-card] [data-close]').click();
 }
 playerCount=2;await page.evaluate(()=>GSCPrivateRounds.openGroupScores(round));await page.locator('.private-score-table tbody tr').last().waitFor();assert.equal(await page.locator('.private-score-table tbody tr').count(),2);await controls(page,width+'-grupo-referencia','[data-gsc-dialog-card] [data-close]');await capture(page,width+'-grupo-referencia');await page.locator('[data-gsc-dialog-card] [data-close]').click();playerCount=60;
 assert.equal(await page.evaluate(()=>JSON.stringify(round)),before,'scores leaves official round untouched');
 await page.evaluate(()=>{localStorage.removeItem('gsc-tournament-connect-selection-v1');localStorage.setItem('golf-score-card-gt-private-round-v1',JSON.stringify({id:'legacy',name:'QA LEGACY',viewerToken:'QA',roundId:round.id,expiresAt:'2099-01-01'}))});await page.evaluate(()=>GSCPrivateRounds.openGroupScores(round));await page.locator('.private-score-table tbody tr').last().waitFor();assert.equal(await page.locator('.private-score-table tbody tr').count(),60);await controls(page,width+'-grupo-legacy-paginado','[data-gsc-dialog-card] [data-close]');await page.locator('[data-gsc-dialog-card] [data-close]').click();
 await page.goto(base+'/live-hub.html?directory=1');await page.locator('#hubScoresReturn').waitFor();await controls(page,width+'-torneos-vacio','#hubScoresReturn');await page.locator('#gscShortcutsButton').click();await controls(page,width+'-menu-scores','#gscShortcutsOverlay .close');await page.locator('#gscShortcutsOverlay .close').click();
 await page.goto(base+'/live-hub.html?personalEvent='+eventId+'&personalKind=private');await page.locator('body.private-live-view').waitFor();await controls(page,width+'-grupo-enlace','#hubScoresReturn');assert.equal(await page.locator('#hubPageTitle').innerText(),'SCORES MI GRUPO');assert.equal(await page.locator('.scores-compact tbody tr').count(),60);assert(!(await page.locator('#hubPersonalOrganization').isVisible()));assert(!(await page.locator('#hubShareGeneral').isVisible()));await capture(page,width+'-grupo');
 await page.evaluate(()=>Object.keys(localStorage).filter(key=>key.startsWith('golf-score-card-gt-live-hub-v1')).forEach(key=>localStorage.removeItem(key)));
 for(const route of ['','&shared=1','&display=1']){
 await page.goto(base+'/live-hub.html?demo=1'+route);await page.locator('#hubLeaderWrap tbody tr').first().waitFor();await controls(page,width+'-general'+route,'#hubScoresReturn');
 if(route==='&display=1')continue;
 for(const id of ['hubShowGeneral','hubShowCategories','hubShowIndividual','hubAddToBoard']){await page.locator('#'+id).click();await controls(page,width+'-'+id+route,'#hubScoresReturn');const rows=page.locator('#hubLeaderWrap [data-score-player]');if(await rows.count()){await rows.first().dblclick();await controls(page,width+'-'+id+'-detalle'+route,'[data-scores-close]');assert.equal(await page.locator('.scores-nine td').count(),18);await page.locator('[data-scores-close]').click()}}
 }
 await page.goto(base+'/live-hub.html#stream='+'S'.repeat(43));await controls(page,width+'-seleccion-favoritos','#hubPickerClose');await page.locator('#hubPickerClose').click();assert(!(await page.locator('#hubPicker').isVisible()));
 await page.goto(base+'/code-entry.html?visitor=1');await controls(page,width+'-codigo-live','#entryClose');await page.locator('#entryClose').click();assert(page.url().includes('/index-grupal.html'));
 await page.goto(base+'/live.html#stream='+'S'.repeat(43));await page.locator('[data-score-player]').first().waitFor();await controls(page,width+'-live','#liveScoresClose');await page.locator('[data-score-player]').first().dblclick();await controls(page,width+'-live-detalle','[data-scores-close]');await page.locator('[data-scores-close]').click();await page.locator('#liveScoresClose').click();assert(page.url().includes('/index-grupal.html'));
 await context.close();
}assert.equal(evidence.errors.length,0,JSON.stringify(evidence.errors));evidence.status='PASS';}catch(e){evidence.status='FAIL';evidence.failure=e.stack;console.error(e.stack);process.exitCode=1}finally{fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2)+'\n');await browser.close();server.close()}
