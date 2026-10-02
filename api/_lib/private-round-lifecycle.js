export const PRIVATE_ROUND_RETENTION_MS=24*60*60*1000;
export function privateRoundCompletion(streams,previous={}){
  const roster=[];let finished=true,lastReceived=0;
  for(const stream of streams){
    const players=stream.current_snapshot?.players||[];
    if(!players.length)finished=false;
    if(players.some(p=>(p.holes||[]).some(h=>Number(h.gross)>0||h.explicitX===true)))lastReceived=Math.max(lastReceived,new Date(stream.last_score_at||stream.updated_at).getTime()||0);
    for(const player of players){
      roster.push(stream.id+'/'+player.id);
      const holes=new Set((player.holes||[]).filter(h=>Number.isInteger(h.hole)&&h.hole>=1&&h.hole<=18&&(Number(h.gross)>0||h.explicitX===true)).map(h=>h.hole));
      if(holes.size!==18)finished=false;
    }
  }
  const fingerprint=JSON.stringify(roster.sort());
  const completedAt=finished&&roster.length&&lastReceived?previous.completed_roster===fingerprint&&previous.completed_at?new Date(previous.completed_at).toISOString():new Date(lastReceived).toISOString():null;
  const locked=previous.completed_at?new Date(previous.completed_at).getTime():0;
  const received=Math.max(lastReceived,new Date(previous.last_score_at).getTime()||0);
  const base=received?received+PRIVATE_ROUND_RETENTION_MS:previous.created_at?new Date(previous.created_at).getTime()+PRIVATE_ROUND_RETENTION_MS:new Date(previous.base_expires_at||previous.expires_at).getTime();
  return{completedAt,roster:completedAt?fingerprint:null,expiresAt:new Date(locked?locked+PRIVATE_ROUND_RETENTION_MS:completedAt?new Date(completedAt).getTime()+PRIVATE_ROUND_RETENTION_MS:base).toISOString()};
}
export async function refreshPrivateRoundLifecycle(sql){
  const {refreshEventLifecycles}=await import('./event-lifecycle.js');
  return refreshEventLifecycles(sql,['private']);
}
