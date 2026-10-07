import {authorizeTestOrganizer} from './tests/helpers/authorize-organizer.mjs';
import assert from 'node:assert/strict';
import {createHash,randomBytes} from 'node:crypto';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handlePersonalEvents} from './api/personal-events.js';
import {handleEventAdministration} from './api/event-administration.js';
const administrationUi=await readFile('event-administration-ui.js','utf8');assert.match(administrationUi,/const deleting=.*data-delete/,'Every event card renders a delete control');assert.match(administrationUi,/aria-label=.*escape\(e\.name\)/,'Delete control names its round for assistive technology');
const db=new PGlite();for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
const sql=async(s,...v)=>(await db.query(s.reduce((q,x,i)=>q+(i?'$'+i:'')+x,''),v)).rows;
let account={id:'creator',name:'Creador'},globalOwner=false;
const identity=async()=>account,owner=async()=>{if(!globalOwner)throw Object.assign(new Error('OWNER_REQUIRED'),{code:'OWNER_REQUIRED',status:403});return account};
async function call(handler,body){let status=200,result;await handler({method:'POST',headers:{host:'localhost:8877',origin:'http://localhost:8877'},body},{setHeader(){},status(n){status=n;return this},json(v){result=v}},()=>sql,...(handler===handlePersonalEvents?[identity]:[owner,identity]));ret������q�^�