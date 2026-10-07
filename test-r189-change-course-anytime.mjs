import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('index-grupal.html','utf8');
const renderCourseDraft=html.match(/function renderCourseDraft\(\)\{[^\n]*\}/)?.[0];
const startConfirmedRound=html.match(/function startConfirmedRound\(\)\{[\s\S]*?\n\}/)?.[0];
assert.ok(renderCourseDraft,'Missing course selector renderer');
assert.ok(startConfirmedRound,'Missing round confirmation handler');

const nodes={
 courseOptions:{innerHTML:''},
 stablefordModeOption:{innerHTML:''},
 confirmCourse:{textContent:''},
 courseSetupStatus:{textContent:'',style:{}}
};
const context=vm.createContext({
 COURSE_CATALOG:{pulte:{name:'El Pulté',configured:true},country_club:{name:'Country Club',configured:true}},STABLEFORD_OFFICIAL_HOSTING_URL:'#',
 draftCourse:'country_club',rosterEditMode:true,
 $:id=>nodes[id],
 draftPlayers:[{id:'player-1',name:'Jaime',handicap:13,tee:'Blanco',holes:{1:{hole:1,gross:5,par:4,net:4}},lastHole:1,activeFrom:1}],
 round:{configured:true,courseKey:'pulte',course:'El Pulté',mode:'general',players:[{id:'player-1',name:'Jaime',handicap:13,tee:'Blanco',holes:{1:{hole:1,gross:5,par:4,net:4}},lastHole:1,activeFrom:1}],announced:{front:true,back:false,complete:false}},
 draftRoundMode:'general',draftTournament:null,draftSkins:{enabled:false},draftWolf:{enabled:false},draftVegas:{enabled:false},draftDots:{enabled:false},
 window:{principalStartup:true},profileCorrectionMode:false,rosterEditJoinHole:1,
 normalizeTournament:value=>value,normalizePlayer:value=>value,assignStablePlayerSlots:value=>value,
 recomputePlayerScores:value=>value,draftSideGames:()=>({}),activateCourse:key=>{context.activated=key},
 enforceCanonicalDraftNames(){},resetDraftGames(){},clearDraftState(){},persist(){},closeSetup(){},render(){},
 ensureAnnouncedState(){},savePlayersToDirectory(){},resetFinalCardShare(){},setManualRegistrationStatus(){},showStep1(){}
});
vm.runInContext(renderCourseDraft,context);vm.runInContext('renderCourseDraft()',context);
assert.match(nodes.courseOptions.innerHTML,/value="country_club" checked/);
assert.doesNotMatch(nodes.courseOptions.innerHTML,/\sdisabled(?:\s|>)/,'Field radios must stay enabled while editing an active round');
vm.runInContext(startConfirmedRound,context);vm.runInContext('startConfirmedRound()',context);
assert.equal(context.activated,'country_club');
assert.equal(context.round.courseKey,'country_club');
assert.equal(context.round.course,'Country Club');
assert.equal(context.round.players[0].holes[1].gross,5,'Course switch must preserve entered scores');
assert.equal(context.rosterEditMode,false);
console.log('PASS R189: campo seleccionable al editar; confirmar guarda el campo nuevo y conserva los scores existentes.');
