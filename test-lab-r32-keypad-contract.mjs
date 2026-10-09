import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Executes the actual keypad and General writer; the DOM, persistence and audio
// are isolated here. This is a regression test, not browser/device approval.
const html=fs.readFileSync(process.argv[2]||'index-grupal.html','utf8');
const section=(start,end)=>{
  const a=html.indexOf(start),b=html.indexOf(end,a+start.length);
  assert(a>=0&&b>a,`Missing source: ${start}`);return html.slice(a,b);
};
const line=name=>html.split('\n').find(l=>l.startsWith(`function ${name}(`));
let writes=0;
const manual={dataset:{hole:'1',activePlayerId:''}};
const noop=()=>{};
const ctx={
  round:{configured:true,players:[],announced:{}},
  document:{getElementById:id=>id==='roundManualEntry'?manual:null},
  PAR:Array(18).fill(4),SI_MEN:Array.from({length:18},(_,i)=>i+1),
  normalizeHandicapValue:Number,matrixFor:()=>Array.from({length:18},(_,i)=>i+1),
  playerByRef:id=>ctx.round.players.find(p=>p.id===id),
  isOmittedScore:s=>s?.status==='x',isRetroactiveScore:()=>false,
  persist:()=>{writes++},render:noop,closureSpeechIfDue:()=>'',
  isRoundComplete:()=>false,stopRoundClock:noop,scheduleRoundTimerIdleShutdown:noop,
  listening:false,operationalTargetHoleForEntries:e=>Math.min(18,e[0]?.hole+1),
  scheduleOperationalMissingPrompt:noop,speakClosure:()=>{throw Error('Unexpected audio')},
  teamMatchPlayerLimit:()=>18,setTimeout:fn=>{ctx.pending.push(fn)},pending:[],
  escapeHtml:String,
  manualHoleResult:(p,h)=>({recorded:!!p?.holes[h],gross:p?.holes[h]?.gross,status:p?.holes[h]?.status}),
};
ctx.window=ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("score-entry-contract.js","utf8"),ctx);
vm.runInContext([
  'let roundScoreKeypadState=null;',
  line('strokesOnHole'),line('scoreObject'),line('operationalEntryRecorded'),
  section('function validateEntry(x){','function ensureAnnouncedState()'),
  section('function recordScore(a){','function recordScores(a){'),
  section('function applyLiteralScores(parsed','function speechForHole('),
  section('function applyManualScoreEntries(entries){','function preferredManualHole('),
  section('function roundManualPlayerRows(','function roundManualHoleNavigation('),
  section('function scoreKeypadPlayerList(','function commitRoundScoreKeypad('),
  'setActiveScoreVisual=()=>true;clearActiveScoreVisual=()=>{};',
].join('\n'),ctx);
ctx.roundGridStatus=()=>false;
ctx.removeManualScore=(p,h)=>{if(!p.holes[h])return false;delete p.holes[h];return true};

for(const par of [3,4,5])for(const count of [4,1,2,3,5,6]){
  ctx.PAR.fill(par);
  ctx.round.players=Array.from({length:count},(_,i)=>({id:`p${i+1}`,name:`LAB ${i+1}`,handicap:18,holes:{}}));
  const rendered=ctx.roundManualPlayerRows(1);
  const keys=[...rendered.matchAll(/data-score-key="([^"]+)"[^>]*>([^<]+)<\/button>/g)];
  assert.deepEqual(keys.map(m=>m[1]),['1','2','3','4','5','6','7','8','9','0','X'],`Complete keypad with ${count} players`);
  for(const m of keys)assert.equal(m[1],m[2],'Visible label equals submitted key');
  for(const hole of Array.from({length:18},(_,i)=>i+1))for(const p of ctx.round.players){
    manual.dataset.hole=String(hole);
    p.holes[hole]={gross:4,hole};
    ctx.openRoundScoreKeypad(p.id,hole);
    for(let key=1;key<=9;key++){
      const others=JSON.stringify(ctx.round.players.filter(q=>q.id!==p.id));
      assert.equal(ctx.roundScoreKeypadPress(String(key)),true);
      assert.equal(manual.dataset.hole,String(hole),'Manual score must retain the hole until ENTER or navigation');
      assert.equal(p.holes[hole].gross,key);
      assert.equal(p.holes[hole].net,key-1);
      assert.equal(p.holes[hole].diff,key-1-par);
      assert.equal(manual.dataset.activePlayerId,p.id,'Correction must keep player');
      assert.equal(manual.dataset.hole,String(hole),'Only navigation/ENTER changes hole');
      assert.equal(JSON.stringify(ctx.round.players.filter(q=>q.id!==p.id)),others);
    }
    assert.equal(ctx.roundScoreKeypadPress('0'),true);
    assert.equal(p.holes[hole].status,'x');assert.equal(p.holes[hole].gross,null);
    assert.equal(ctx.roundScoreKeypadPress('X'),true);assert.equal(p.holes[hole],undefined);
    assert.equal(ctx.roundScoreKeypadPress('7'),true);assert.equal(p.holes[hole].gross,7);
    assert.equal(manual.dataset.activePlayerId,p.id,'X must retain correction selection');
  }
}
assert.equal(ctx.pending.length,0,'No delayed callback may overwrite a later player selection');
const before=JSON.stringify(ctx.round.players);
ctx.round.officiallyClosedAt='2026-09-22';
assert.equal(ctx.roundScoreKeypadPress('3'),false);
assert.equal(JSON.stringify(ctx.round.players),before,'Closed round must not change');
console.log(`PASS actual keypad/writer: 1–6 players, all 18 holes, pars 3/4/5, 1–9 literal, 0 omission, X deletion, repeated correction, Gross/Neto/result, closed round; ${writes} persisted writes. Browser/audio pending.`);
