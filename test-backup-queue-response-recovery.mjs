import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import queueApi from './sync-queue.js';
const source=fs.readFileSync('index-grupal.html','utf8');
const start=source.indexOf('async function flushMasterSyncQueue(){'),end=source.indexOf('\nfunction activeRoundArchiveKey',start);
for(const status of [401,503]){
 let queue=Array.from({length:3},(_,i)=>({clientMutationId:'pending-'+i,payloadHash:'hash-'+i,state:'pending',attempts:0,payload:{round:{id:'round-'+i}}}));
 const original=JSON.stringify(queue.map(x=>x.payload));
 const context={masterSyncFlushing:false,masterSyncBlockedUntil:0,navigator:{onLine:true},window:{GSC_ACCOUNT_SIGNED_IN:true,GSCSyncQueue:queueApi,GSCMasterDataSync:{validAck:()=>false},gscgApiUrl:x=>x},readMasterSyncQueue:()=>queue,writeMasterSyncQueue:q=>{queue=q},failedMasterSyncItem:(q,id,code)=>q.map(x=>x.clientMutationId===id?{...x,state:'failed',lastError:code}:x),fetch:async()=>({ok:false,status,json:async()=>({ok:false,code:status===401?'ACCOUNT_UNAUTHORIZED':'DATABASE_NOT_CONFIGURED'})}),Date:{now:()=>1000}};
 vm.createContext(context);vm.runInContext(source.slice(start,end),context);await vm.runInContext('flushMasterSyncQueue()',context);
 assert.equal(context.masterSyncFlushing,false);assert.equal(context.masterSyncBlockedUntil,301000);assert.equal(queue.length,3);assert.equal(JSON.stringify(queue.map(x=>x.payload)),original);assert.equal(queue[0].lastError,status===401?'ACCOUNT_UNAUTHORIZED':'DATABASE_NOT_CONFIGURED');
}
console.log('PASS exact app queue handler: 401/503 no exception, releases lock, retains all 3 payloads and records original error for retry.');
