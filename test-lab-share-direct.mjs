import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const s=fs.readFileSync('live-control.js','utf8');
const code=s.slice(s.indexOf('  async function quickShareGroup(){'),s.indexOf('  async function recoverRevision'));
let opened=0,shared=0,copied=0;
const ctx={openLivePanel(){opened++},currentSnapshot:()=>({roundId:'r',players:[]}),liveState:()=>({stream:{publisherSecret:'test',viewerToken:'test',roundId:'r',scope:'group'}}),viewerUrl:()=> 'https://example.test/live',setStatus(){},quickShareNotice(){},root:{navigator:{share:async()=>{shared++},clipboard:{writeText:async()=>{copied++}}}}};
vm.createContext(ctx);vm.runInContext(code,ctx);
assert.equal(await ctx.quickShareGroup(),true);assert.equal(shared,1);assert.equal(opened,0);assert.equal(copied,0);
ctx.root.navigator.share=async()=>{throw Object.assign(new Error('cancel'),{name:'AbortError'})};
assert.equal(await ctx.quickShareGroup(),false);assert.equal(opened,0);assert.equal(copied,0);
delete ctx.root.navigator.share;assert.equal(await ctx.quickShareGroup(),true);assert.equal(copied,1);assert.equal(opened,0);
console.log('PASS compartir nativo directo y cancelar: sin administración ni copia inesperada');

const snapshot={roundId:'r',tournament:'TORNEO ANTERIOR',players:[{id:'p1',name:'Jaime'}]},past='2026-01-01T00:00:00Z',future='2099-01-01T00:00:00Z';
for(const privateRound of [false,true]){
 let state={version:1,stream:{roundId:'r',scope:'group',publisherSecret:'old',viewerToken:'old',expiresAt:past,tournamentId:'old-event'}};
 if(privateRound)state.privateStream={...state.stream,privateRound:true};
 let created=0,eventShares=0;ctx.POLICY_VERSION='gsc-gt-live-v1';
 ctx.currentSnapshot=()=>snapshot;ctx.liveState=()=>state;ctx.saveState=value=>state=value;ctx.renderActive=()=>{};ctx.root.GSCOneUseLive={share:async()=>{eventShares++;return{ok:true}}};
 ctx.request=async(action,payload)=>{assert.equal(action,'create_stream');assert.equal(payload.snapshot.tournament,null);assert.equal(payload.snapshot.players[0].name,'Jaime');created++;return{ok:true,streamId:'new-stream',publisherSecret:'new',viewerToken:'new',expiresAt:future}};
 ctx.viewerUrl=(kind,token)=>'https://example.test/'+token;ctx.root.navigator.share=async(data)=>{assert.equal(data.url,'https://example.test/new')};
 assert.equal(await ctx.quickShareGroup(),true);assert.equal(created,1);assert.equal(eventShares,0);assert.equal(state.stream.tournamentId,null);assert.equal(snapshot.tournament,'TORNEO ANTERIOR');
 assert.equal(await ctx.quickShareGroup(),true);assert.equal(created,1,'Fresh group LIVE reused; old private enrollment ignored');
}
console.log('PASS expired LIVE recovery: new group stream, same scores, no expired event reactivation, no duplicate on repeat share');
