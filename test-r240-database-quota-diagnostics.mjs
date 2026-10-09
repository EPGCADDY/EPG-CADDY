import assert from 'node:assert/strict';
import fs from 'node:fs';
import {handleTournamentScoreDirectory} from './api/tournament-score-directory.js';
import {handleEventAdministration} from './api/event-administration.js';

function quotaError(){
 const error=new Error('Server error (HTTP status 402): {"message":"Your account or project has exceeded the quota. Upgrade your plan to increase limits."}');
 throw error;
}

async function run(handler){
 let status=200,result;
 await handler({method:'POST',headers:{host:'golf-sc-gt-lab.vercel.app',origin:'https://golf-sc-gt-lab.vercel.app'},body:{action:'list'}},{setHeader(){},status(n){status=n;return this},json(v){result=v}},quotaError,async()=>({id:'owner'}),async()=>({id:'owner'}));
 return{status,result};
}

const directory=await run(handleTournamentScoreDirectory);
assert.equal(directory.status,503);
assert.equal(directory.result.code,'DATABASE_QUOTA_EXCEEDED');

const administration=await run(handleEventAdministration);
assert.equal(administration.status,503);
assert.equal(administration.result.code,'DATABASE_QUOTA_EXCEEDED');

const ui=fs.readFileSync('event-administration-ui.js','utf8');
assert.match(ui,/DATABASE_QUOTA_EXCEEDED:'BASE DE DATOS SIN CUOTA · NEON 402 · ACTUALIZA EL PLAN O LA CUOTA'/);

console.log('PASS R240: Neon quota errors are surfaced as DATABASE_QUOTA_EXCEEDED in directory/admin endpoints and Organizer UI.');
