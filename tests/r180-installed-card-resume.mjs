import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const key='golf-score-card-guatemala-active-round-v1';
const fixture={id:'resume-friends',configured:true,provisional:false,mode:'general',courseKey:'pulte',course:'El Pulté',tournament:{name:'Friends'},createdAt:'2026-10-06T15:36:00Z',updatedAt:'2026-10-06T17:00:00Z',players:[{id:'jaime',name:'JAIME',handicap:14,tee:'Blanco',matrix:'Caballeros',holes:{1:{hole:1,gross:5},2:{hole:2,gross:4}},lastHole:2}]};
const external=process.env.BASE_URL;
let server;
if(!external){server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname;const data=await readFile(process.cwd()+path);res.setHeader('Content-Type',path.endsWith('.js')?'application/javascript':path.endsWith('.json')?'application/json':'text/html');res.end(data)}catch{res.statusCode=404;res.end()}});await new Promise(r=>server.listen(8878,r))}
const base=external||'http://localhost:8878';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const scenario of [
  {url:'/pwa-launch.html',saved:true,card:true},
  {url:'/index-grupal.html?inicio=1&source=pwa',saved:true,card:true},
  {url:'/index-grupal.html?inicio=1',installed:true,saved:true,card:true},
  {url:'/index-grupal.html?inicio=1',saved:true,card:false},
  {url:'/pwa-launch.html',saved:false,card:false},
  {url:'/index-grupal.html?nueva_ronda=1',installed:true,saved:true,card:false}
 ]){
  const context=await browser.newContext({viewport:{width:393,height:852},serviceWorkers:'block'});
  await context.addInitScript(({key,fixture,saved,installed})=>{
   if(saved&&!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(fixture));
   if(installed)Object.defineProperty(navigator,'standalone',{value:true});
  },{key,fixture,saved:scenario.saved,installed:scenario.installed});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/**',r=>r.fulfill({json:{ok:true,events:[],aliases:[],items:[],privateItems:[],tournamentItems:[],user:null}}));
  await page.goto(base+scenario.url,{waitUntil:'domcontentloaded'});
  await page.waitForURL(/index-grupal.html/);await page.waitForFunction(()=>document.getElementById('scorecard')?.children.length>0);
  await page.waitForTimeout(300);
  assert.equal(await page.locator('#setupOverlay').evaluate(el=>el.classList.contains('visible')),!scenario.card,JSON.stringify(scenario));
  if(scenario.card){
   assert.match(await page.locator('#scorecard').innerText(),/JAIME/);
   const stored=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
   assert.equal(stored.id,fixture.id);assert.equal(stored.tournament.name,'Friends');assert.equal(stored.players[0].holes[1].gross,5);assert.equal(stored.players[0].holes[2].gross,4);
   // Close the card page entirely, retain its origin storage and relaunch.
   await page.close();const reopened=await context.newPage();
   await reopened.goto(base+scenario.url,{waitUntil:'domcontentloaded'});
   await reopened.waitForURL(/index-grupal.html/);await reopened.waitForFunction(()=>document.getElementById('scorecard')?.children.length>0);
   assert.equal(await reopened.locator('#setupOverlay').evaluate(el=>el.classList.contains('visible')),false);
   const again=await reopened.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
   assert.equal(again.id,fixture.id);assert.equal(again.players[0].holes[2].gross,4);
  }
  assert.deepEqual(errors,[]);await context.close();
 }
 console.log('PASS R180 browser: installed launch and legacy shortcut reopen Friends with scores after closing page; web Registration, empty device and explicit new round preserved.');
}finally{await browser.close();if(server)await new Promise(r=>server.close(r))}
