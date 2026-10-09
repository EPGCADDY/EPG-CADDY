import assert from 'node:assert/strict';
import artifacts from '../card-artifacts.js';
const players=Array.from({length:6},(_,p)=>({id:'sf'+(p+1),name:'JUGADOR '+(p+1),handicap:0,tee:'Blanco',holes:Object.fromEntries(Array.from({length:18},(_,i)=>{const hole=i+1,par=i%3===0?3:i%3===1?4:5;return[hole,{hole,par,gross:par,status:null,points:2}]}))}));
const s={status:'officially_closed',mode:'stableford',sha256:'b'.repeat(64),version:1,course:'Guatemala Country Club',tournament:{name:'Copa Oficial'},playedAt:'2026-08-22T14:00:00Z',stablefordCategory:'senior',stablefordRoundNumber:2,players};
const out=artifacts.build(s),which=process.argv[2];
if(which==='title')assert.doesNotMatch(out.global.html,/>Tarjeta Global Stableford/);
if(which==='hash')assert.doesNotMatch(out.global.html,/ID OFICIAL · SHA-256/);
console.log('PASS',which);
