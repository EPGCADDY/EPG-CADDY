import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('index-grupal.html','utf8');
function extract(name,next){return source.slice(source.indexOf(`function ${name}(`),source.indexOf(`function ${next}(`));}
const draft=[{id:'p1',name:'Jugador A',holes:{1:5}},{id:'p2',name:'Jugador B',holes:{1:4}}];
let opened=0,persisted=0;
const ctx=vm.createContext({round:{configured:true,players:structuredClone(draft)},persist(){persisted++},dateSetup(){},openSetup(mode){assert.equal(mode,'new');opened++},clearDraftState(){throw Error('Regreso borrÃ³ el registro')},draftPlayers:structuredClone(draft)});
vm.runInContext(extract('openRegistrationPreservingActiveRound','ensurePrincipalEntry')+'openRegistrationPreservingActiveRound()',ctx);
assert.equal(opened,1);assert.equal(persisted,1);assert.deepEqual(JSON.parse(JSON.stringify(ctx.draftPlayers)),draft);assert.deepEqual(JSON.parse(JSON.stringify(ctx.round.players)),draft);
const handler=source.match(/async function createTournamentFromMenu\(\)\{([^\n]*)\}/)[1];
const order=[];let nav;
const fields={setupStatus:{textContent:''}};
const eventCtx=vm.createContext({manualDraftRows:[{name:'Jugador A',category:'senior',tee:'Blanco',handicap:'14'}],window:{GSCPersonalEvents:{request:async()=>({ok:true,personalCode:'account-a'}),message:code=>code}},sessionStorage:{setItem(key,value){eventCtx.savedDraft=JSON.parse(value)}},rosterEditMode:true,round:{configured:true,id:'active-round'¶»§q«^