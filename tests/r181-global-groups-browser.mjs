import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';
const uuid=i=>'00000000-0000-4000-8000-'+String(i).padStart(12,'0');
const events=['lab','production'].flatMap(source=>['tournament','private'].flatMap(event_kind=>Array.from({length:30},(_,i)=>({id:uuid(i+(event_kind==='private'?100:0)),name:source+' '+event_kind+' '+i,status:'active',source,event_kind,joinCode:(source==='lab'?'A':'B')+(event_kind==='private'?'1':'0')+String(i).padStart(8,'0')}))));
const server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname;const f=await readFile(process.cwd()+path);res.setHeader('Content-Type',path.endsWith('.js')?'application/javascript':path.endsWith('.css')?'text/css':'text/html');res.end(f)}catch{res.statusCode=404;res.end()}});
await new Promise(r=>server.listen(8879,r));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:393,height:852}}),errors=[],reads=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{
  const path=new URL(route.request().url()).pathname,body=route.request().postDataJSON()||{};
  let result={ok:true,events:[],aliases:[],items:[],privateItems:[]},status=200;
  if(path.endsWith('event-administration')){result={ok:false,code:'ACCOUNT_UNAUTHORIZED'};status=403}
  if(path.endsWith('tournament-score-directory')){
   if(body.action==='list')result={ok:true,partial:false,events:body.includeGroups?events:events.filter(e=>e.event_kind==='tournament')};
   else{reads.push(body);result={ok:true,kind:body.eventKind||'tournament',tournament:{id:body.eventId,name:'GLOBAL GROUP SCORES',mode:'general',revision:1},streams:[{id:uuid(900),status:'active',scope:'group',groupLabel:'OTHER CITY',revision:1,snapshot:{mode:'general',course:'COUNTRY CLUB',playedAt:'2026-10-06',players:[{id:'p1',name:'OTHER DEVICE PLAYER',handicap:10,tee:'Blanco',holes:[{hole:1,gross:5,net:4}],totals:{gross:5,net:4,relativeToPar:0}}]}}]}}
  }
  await route.fulfill({status,json:result});
 });
 await page.goto('http://localhost:8879/event-administration.html',{waitUntil:'domcontentloaded'});
 await page.locator('#events [data-tournament-code]').nth(119).waitFor();
 assert.equal(await page.locator('#events article').count(),120);
 assert.equal(await page.locator('#events').getByText('ID DE GRUPO',{exact:true}).count(),60);
 assert.deepEqual(new Set(await page.locator('#events [data-tournament-code]').allTextContents()),new Set(events.map(e=>e.joinCode)));
 assert.equal(await page.locator('#gscAuthGate.visible').count(),0);
 assert.match(await page.locator('#status').innerText(),/^LISTO/);
 const card=page.locator('#events article').filter({has:page.getByRole('heading',{name:'lab private 0',exact:true})});
 await card.getByRole('button',{name:'COMPARTIR CÓDIGO',exact:true}).click();
 await page.locator('#gscWhatsAppInvitation').waitFor();
 await page.locator('#whatsappCreator').fill('TEST CREATOR');
 assert.match(await page.locator('[data-invitation-preview]').innerText(),/golf-sc-gt-lab.vercel.app/);
 await page.locator('[data-close-whatsapp]').click();
 await card.getByRole('button',{name:'ELIMINAR GRUPO',exact:true}).click();
 await page.getByRole('heading',{name:'CONFIRMAR ELIMINAR GRUPO',exact:true}).waitFor();
 await page.getByRole('button',{name:'CANCELAR',exact:true}).click();
 await card.getByRole('link',{name:'SCORES · GENERAL',exact:true}).click();
 await page.waitForFunction(()=>document.body.classList.contains('private-live-view'));
 await page.getByText('OTHER DEVICE PLAYER',{exact:true}).first().waitFor();
 assert.ok(reads.some(r=>r.eventKind==='private'&&r.source==='lab'&&r.eventId===uuid(100)));
 assert.deepEqual(errors,[]);
 console.log('PASS R181 mobile browser: 120 global events and codes including 60 groups; admin API denied; no login wall; source-aware sharing; group confirmation/cancel; group Scores read from peer without membership; zero JS errors.');
}finally{await browser.close();await new Promise(r=>server.close(r))}
