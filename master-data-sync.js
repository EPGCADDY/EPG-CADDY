(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCMasterDataSync=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const SCHEMA_VERSION=1;
  const APP_VERSION="V278";

  function text(value){return String(value??"").trim()}
  function integer(value,fallback=null){const n=Number(value);return Number.isInteger(n)?n:fallback}
  function identityKey(value){return text(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim()}
  function iso(value,fallback=null){if(!value)return fallback;const d=new Date(value);return Number.isFinite(d.getTime())?d.toISOString():fallback}
  function whatsapp(value){
    const countryCode=text(value?.countryCode||"502").replace(/\D/g,"")||"502";
    let nationalNumber=text(value?.nationalNumber??value).replace(/\D/g,"");
    if(nationalNumber.startsWith(countryCode)&&nationalNumber.length>8)nationalNumber=nationalNumber.slice(countryCode.length);
    nationalNumber=nationalNumber.slice(0,15);
    return{countryCode,nationalNumber,e164:nationalNumber?`+${countryCode}${nationalNumber}`:null};
  }
  function profile(value,index=0,source="registration"){
    const fullName=text(value?.fullName||value?.name||`Jugador ${index+1}`);
    const occurredAt=iso(value?.updatedAt)||iso(value?.occurredAt)||new Date().toISOString();
    return{
      clientPlayerId:text(value?.id)||`player_${identityKey(fullName).replace(/\s+/g,"_")||index+1}`,
      registrationCode:text(value?.registrationCode).toUpperCase()||null,
      identityKey:identityKey(fullName),
      fullName,
      handicap:integer(value?.handicap),
      teeKey:text(value?.teeKey||value?.tee)||null,
      matrixKey:text(value?.matrixKey||value?.matrix)||"Caballeros",
      email:text(value?.email).toLowerCase()||null,
      whatsapp:whatsapp(value?.whatsapp),
      deliveryPreference:text(value?.deliveryPreference)||"none",
      source:text(value?.source)||source,
      occurredAt,
      profileHistory:Array.isArray(value?.profileHistory)?value.profileHistory.map((event,i)=>profile({...event,id:value?.id,registrationCode:event?.registrationCode||value?.registrationCode},i,event?.source||source)):[]
    };
  }
  function hole(value,holeNumber){
    const explicitX=text(value?.status).toLowerCase()==="x"||value?.explicitX===true;
    const gross=explicitX?null:integer(value?.gross);
    const par=integer(value?.par);
    return{
      hole:integer(value?.hole,integer(holeNumber)),
      par,
      strokeIndex:integer(value?.strokeIndex,integer(value?.si,integer(holeNumber))),
      gross,
      handicapStrokes:integer(value?.handicapStrokes,integer(value?.strokes,0)),
      net:explicitX?null:integer(value?.net,gross),
      relativeToPar:explicitX?null:integer(value?.relativeToPar,integer(value?.diff,par===null||gross===null?null:gross-par)),
      stablefordPoints:integer(value?.stablefordPoints,integer(value?.points)),
      explicitX,
      fairway:value?.fairway??null,
      green:value?.green??null,
      putts:integer(value?.putts),
      penalties:integer(value?.penalties,0),
      updatedAt:iso(value?.updatedAt)||new Date().toISOString()
    };
  }
  function courseDefinition(value){
    if(!value||typeof value!=="object")return{};
    const tees={};
    for(const [key,tee] of Object.entries(value.tees||{}))tees[key]={label:text(tee?.label)||key,yardages:Array.isArray(tee?.yds)?tee.yds.map(n=>integer(n,0)):[],front:integer(tee?.front),back:integer(tee?.back),total:integer(tee?.total),rating:Number.isFinite(Number(tee?.rating))?Number(tee.rating):null,slope:integer(tee?.slope)};
    return{par:Array.isArray(value.par)?value.par.map(n=>integer(n,0)):[],strokeIndexes:{men:Array.isArray(value.siMen)?value.siMen.map(n=>integer(n,0)):[],women:Array.isArray(value.siWomen)?value.siWomen.map(n=>integer(n,0)):[],byTee:value.siByTee&&typeof value.siByTee==="object"?value.siByTee:{}},tees};
  }
  function findDirectoryProfile(directory,player){
    const code=text(player?.registrationCode).toUpperCase(),key=identityKey(player?.name||player?.fullName);
    return(directory||[]).find(item=>code&&text(item?.registrationCode).toUpperCase()===code)||(directory||[]).find(item=>identityKey(item?.fullName||item?.name)===key)||null;
  }
  function roundPlayer(value,index,directory){
    const saved=findDirectoryProfile(directory,value),merged={...saved,...value,whatsapp:value?.whatsapp||saved?.whatsapp};
    const base=profile(merged,index,"round");
    const holes=Object.entries(value?.holes||{}).map(([number,entry])=>hole(entry,number)).filter(item=>item.hole>=1&&item.hole<=18&&item.par>=3&&item.par<=6);
    return{...base,visualSlot:integer(value?.slot,index+1),activeFrom:Math.max(1,Math.min(18,integer(value?.activeFrom,1))),holes};
  }
  function build({round=null,profiles=[],courseData=null,capturedAt=new Date().toISOString(),reason="state-change"}={}){
    const directory=(profiles||[]).map((item,index)=>profile(item,index,item?.source||"registration"));
    const payload={schemaVersion:SCHEMA_VERSION,appVersion:APP_VERSION,capturedAt:iso(capturedAt)||new Date().toISOString(),reason:text(reason)||"state-change",profiles:directory};
    if(round?.configured&&Array.isArray(round.players)&&round.players.length){
      const status=round.status==="corrected"?"corrected":round.officiallyClosedAt?"officially_closed":round.status==="ready_to_close"?"ready_to_close":"active";
      const roundPlayers=round.players.slice(0,6).map((player,index)=>roundPlayer(player,index,directory));
      const cards=round.officiallyClosedAt?[{type:"global",clientPlayerId:null,version:Math.max(1,integer(round.officialVersion,1)),contentHash:text(round.snapshotHash)||"pending",storageState:"reconstructible"},...roundPlayers.map(player=>({type:"personal",clientPlayerId:player.clientPlayerId,version:Math.max(1,integer(round.officialVersion,1)),contentHash:text(round.snapshotHash)||"pending",storageState:"reconstructible"}))]:[];
      payload.round={
        clientRoundId:text(round.id),
        version:Math.max(1,integer(round.officialVersion,integer(round.version,1))),
        status,
        mode:round.mode==="stableford"?"stableford":"general",
        categoryKey:text(round.stablefordCategory)||null,
        seriesRoundNumber:integer(round.stablefordRoundNumber),
        course:{key:text(round.courseKey)||"unknown",name:text(round.course)||"CAMPO",definition:courseDefinition(courseData)},
        tournament:round.tournament?.name?{name:text(round.tournament.name)}:null,
        playedAt:iso(round.createdAt)||payload.capturedAt,
        officiallyClosedAt:iso(round.officiallyClosedAt),
        rulesVersion:text(round.rulesVersion)||"gscg-score-engine-v1",
        appVersion:APP_VERSION,
        snapshotHash:text(round.snapshotHash)||null,
        endedAt:iso(round.endedAt),
        durationSeconds:integer(round.durationSeconds),
        officialSnapshot:round.officialSnapshot||null,
        players:roundPlayers,
        cards,
        shareEvents:Array.isArray(round.shareEvents)?round.shareEvents.map((event,index)=>({clientEventId:text(event?.clientEventId)||`${text(round.id)}:share:${index+1}`,clientPlayerId:text(event?.clientPlayerId)||null,cardScope:["global","personal","package"].includes(event?.cardScope)?event.cardScope:"global",state:["PREPARED","CANCELLED","FAILED"].includes(event?.state)?event.state:"PREPARED",fallback:event?.fallback===true,occurredAt:iso(event?.occurredAt)||payload.capturedAt})):[]
      };
    }
    return payload;
  }

  function coalesce(queue,item){
    const list=Array.isArray(queue)?queue.filter(Boolean):[];
    const removable=new Set(list.filter(old=>old.entityType===item.entityType&&old.entityId===item.entityId&&old.state!=="sending").map(old=>old.clientMutationId));
    return[...list.filter(old=>!removable.has(old.clientMutationId)),item];
  }
  function validAck(response,item){return!!(response?.ok&&response?.payloadHash===item?.payloadHash&&response?.serverAt)}

  return{SCHEMA_VERSION,APP_VERSION,identityKey,whatsapp,profile,hole,courseDefinition,build,coalesce,validAck};
});
