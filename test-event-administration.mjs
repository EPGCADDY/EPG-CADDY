import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handlePersonalEvents} from './api/personal-events.js';
import {handleEventAdministration} from './api/event-administration.js';
const db=new PGlite();for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
let account={id:'creator',name:'Creador'},globalOwner=false;
const identity=async()=>account,owner=async()=>{if(!globalOwner)throw Object.assign(new Error('OWNER_REQUIRED'),{code:'OWNER_REQUIRED',status:403});return account};
async function call(handler,body){let status=200,result;await handler({method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877'},body},{setHeader(){},status(n){status=n;return this},json(v){result=v}},()=>sql,...(handler===handlePersonalEvents?[identity]:[owner,identity]));return{status,...result}}
await authorizeTestOrganizer(sql,'creator');
const config={course:'EL PULTÃ‰ GOLF',playedAt:'2026-10-02',mode:'general',categories:['a']};
for(const kind of ['private','tournament']){
 account={id:'creator',name:'Creador'};const created=await call(handlePersonalEvents,{action:'create',eventKind:kind,name:'PRUEBA '+kind,...config});¶»§q«^