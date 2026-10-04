import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {handleTournamentScoreDirectory} from './api/tournament-score-directory.js';

const stores={};
const uuid=index=>`00000000-0000-4000-8000-${String(index).padStart(12,'0')}`;
for(const source of ['production','lab']){
  const db=new PGlite();
  for(const file of ['database/004_live_scorecards.sql','database/005_live_tournament_mode.sql'])await db.exec(await readFile(file,'utf8'));
  const sql=(strings,...values)=>db.query(strings.reduce((query,part,index)=>query+part+(index<values.length?'$'+(index+1):''),''),values).then(result=>result.rows);
  stores[source]={db,sql};
  for(let index=1;index<=20;index++){
    const id=uuid(index),name=`${source==='production'?'Producción':'LAB'} Torneo ${String(index).padStart(2,'0')}`,gross=70+index;
    const suffix=index.toString(16).padStart(2,'0');
    await sql`INSERT INTO live_tournaments(id,name,organizer_secret_hash,viewer_token_hash,join_code_hash,status,expires_at,mode) VALUES(${id}::uuid,${name},${'a'.repeat(62)+suffix},${'b'.repeat(62)+suffix},${'c'.repeat(62)+suffix},'active',now()+interval '1 day','general')`;
    const snapshot={schemaVersion:1,roundId:`round-${source}-${index}`,tournament:name,course:'El Pulté',mode:'general',players:[{id:'player-001',name:`Organizador ${index}`,handicap:14,tournamentCategory:'b',holes:[{hole:1,gross,net:gross-1}],phone:'+50255551234'}],privateSecret:'should-not-leak'};
    await sql`INSERT INTO live_streams(round_client_id,scope,group_label,consent,publisher_secret_hash,viewer_token_hash,tournament_id,current_snapshot,expires_at) VALUES(${snapshot.roundId},'group',${'Grupo '+name},'{}'::jsonb,${'d'.repeat(62)+suffix},${'e'.repeat(62)+suffix},${id}::uuid,${JSON.stringify(snapshot)}::jsonb,now()+interval '1 day')`;
  }
}

async function call(source,body){
  let status=200,data;
  await handleTournamentScoreDirectory({method:'POST',body,headers:{}},{setHeader(){},status(value){status=value;return this},json(value){data=value;return this}},()=>stores[source].sql,async(_url,options)=>{
    const peer=source==='lab'?'production':'lab',peerBody=JSON.parse(options.body);let peerStatus=200,peerData;
    await handleTournamentScoreDirectory({method:'POST',body:peerBody,headers:{}},{setHeader(){},status(value){peerStatus=value;return this},json(value){peerData=value;return this}},()=>stores[peer].sql,undefined,{GSC_ENVIRONMENT:peer});
    return{ok:peerStatus<400,status:peerStatus,json:async()=>peerData};
  },{GSC_ENVIRONMENT:source});
  return{status,...data};
}

for(const source of ['production','lab']){
  const listing=await call(source,{action:'list'});
  assert.equal(listing.status,200);
  assert.equal(listing.events.length,40,`${source} directory includes all 40 active tournaments from both environments`);
  assert.equal(listing.events.filter(event=>event.source==='production').length,20);
  assert.equal(listing.events.filter(event=>event.source==='lab').length,20);
  for(const event of listing.events){
    const detail=await call(source,{action:'read',source:event.source,eventId:event.id});
    assert.equal(detail.ok,true,`${source} can open ${event.name}`);
    assert.equal(detail.tournament.name,event.name);
    assert.equal(detail.streams[0].snapshot.players[0].holes[0].gross,70+Number(event.name.slice(-2)));
    const serialized=JSON.stringify(detail);
    assert.equal(serialized.includes('55551234'),false);
    assert.equal(serialized.includes('privateSecret'),false);
    assert.equal(serialized.includes('organizer_secret_hash'),false);
  }
}
assert.equal((await call('production',{action:'read',source:'lab',eventId:'bad'})).status,400);
for(const store of Object.values(stores))await store.db.close();
console.log('PASS R163: both menus list all 40 active tournaments (20 per environment) across 20 organizers; each opens the matching Scores; private data excluded.');
