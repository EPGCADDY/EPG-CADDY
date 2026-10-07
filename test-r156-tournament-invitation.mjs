import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync('personal-events.js','utf8'),id='11111111-1111-4111-8111-111111111111';
function fixture({valid=true,role='scorer',readRole=role}={}){
 const requests=[],fields=new Map(),stored=new Map();let prepared;
 const field=k=>{if(!fields.has(k))fields.set(k,{value:'',textContent:'',disabled:false,focusCount:0,focus(){this.focusCount++},insertAdjacentHTML(_pos,html){this.html=(this.html||'')+html}});return fields.get(k)};
 const panel={setAttribute(){},querySelector:field,querySelectorAll(){return[]},remove(){}};
 const location={origin:'https://example.test',href:'https://example.test/index-grupal.html?inicio=1&invitation=1#evento='+id+'&codigo=ABCD234567'};
 const root={URL,URLSearchParams,encodeURIComponent,Intl,Date,Map,Set,Array,String,Number,Math,JSON,Promise,location,history:{replaceState(_a,_b,url){location.href=url}},document:{activeElement:{focus(){}},getElementById(){return null},createElement(){return panel},body:{appendChild(){}},addEventListener(){}},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},GSCLiveControl:{buildLiveSnapshot:r=>r},GSCPrepareEventInvitation:i=>prepared=i,
 fetch:async(_url,options)=>{if(_url==='/api/tournament-score-directory')return {ok:true,status:200,json:async()=>({ok:true,partial:false,events:[{id,name:'GLOBAL OTHER DEVICE',status:'active',source:'production',joinCode:'GLOBAL1234'}]})};const body=¶»§q«^