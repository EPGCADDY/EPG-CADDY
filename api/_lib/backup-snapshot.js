import auto from '../../round-auto-save.js';
import closure from '../../round-closure.js';
import backup from '../../account-backup.js';
// Materialize an eligible stored round on the server, without editing its source row.
// An asleep/offline original phone is not required for another device to see it.
export async function normalizeBackupSnapshot(raw,now=Date.now()){
 if(!raw||raw.officialSnapshot?.sha256||!Array.isArray(raw.players)||!raw.players.length||raw.players.length>6)return raw;
 const local=backup.localRound(raw);if(!local)return raw;
 const candidate={...local,officiallyClosedAt:null},choice=auto.decision(candidate,now);if(!choice)return raw;
 const times=local.players.flatMap(p=>Object.values(p.holes||{}).map(h=>Date.parse(h.updatedAt))).filter(Number.isFinite);
 const endAt=raw.endedAt||(times.length?new Date(Math.max(...times)).toISOString():raw.playedAt);
 const closedAt=raw.officiallyClosedAt||(choice.kind==='nine'?new Date(choice.lastScoreAt+auto.WAIT_MS).toISOString():endAt);
 const result=await closure.close(candidate,{appVersion:'R250',closedAt,...(choice.kind==='nine'?{holesPlayed:choice.holesPlayed}:{})});if(!result.ok)return raw;
 return{...raw,status:result.round.status,officiallyClosedAt:result.round.officiallyClosedAt,endedAt:endAt,officialSnapshot:result.snapshot,snapshotHash:result.snapshot.sha256,...(choice.kind==='nine'?{holesPlayed:choice.holesPlayed}:{}),recoveredClosure:true};
}
