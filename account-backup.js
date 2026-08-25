(function(root,factory){const api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.GSCAccountBackup=api})(typeof globalThis!=="undefined"?globalThis:this,function(root){
  "use strict";

  function apiUrl(path){const origin=String(root?.GSC_API_ORIGIN||"").replace(/\/$/,"");return`${origin}${path}`}
  async function jsonRequest(url,options={}){
    let response;
    try{response=await fetch(apiUrl(url),{credentials:"include",cache:"no-store",...options})}
    catch{return{ok:false,code:"NETWORK_ERROR"}}
    const body=await response.json().catch(()=>({ok:false,code:`HTTP_${response.status}`}));
    return{...body,ok:response.ok&&body?.ok!==false,status:response.status};
  }
  function account(action,payload=null){
    const session=action==="session";
    return jsonRequest(`/api/account?action=${encodeURIComponent(action)}`,session?{method:"GET"}:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload||{})});
  }
  function recover(){return jsonRequest("/api/backup",{method:"GET"})}
  function localHole(value){
    return{hole:Number(value?.hole),par:Number(value?.par),gross:value?.explicitX?null:(Number.isInteger(value?.gross)?value.gross:null),status:value?.explicitX?"x":null,strokes:Number(value?.handicapStrokes)||0,net:value?.explicitX?null:(Number.isInteger(value?.net)?value.net:null),diff:value?.explicitX?null:(Number.isInteger(value?.relativeToPar)?value.relativeToPar:null),points:Number.isInteger(value?.stablefordPoints)?value.stablefordPoints:null,updatedAt:value?.updatedAt||null};
  }
  function localPlayer(value,index){
    const holes={};for(const raw of value?.holes||[]){const converted=localHole(raw);if(converted.hole>=1&&converted.hole<=18)holes[converted.hole]=converted}
    return{id:value?.clientPlayerId||`p${index+1}`,registrationCode:value?.registrationCode||"",name:value?.fullName||`Jugador ${index+1}`,handicap:Number(value?.handicap)||0,tee:value?.teeKey||"Blanco",matrix:value?.matrixKey==="Damas"?"Damas":"Caballeros",whatsapp:value?.whatsapp?.nationalNumber||"",holes,activeFrom:Number(value?.activeFrom)||1,slot:Number(value?.visualSlot)||null};
  }
  function localRound(value){
    if(!value?.clientRoundId||!Array.isArray(value?.players)||!value.players.length)return null;
    return{id:value.clientRoundId,version:Number(value.version)||2,officialVersion:Number(value.version)||1,configured:true,provisional:false,mode:value.mode==="stableford"?"stableford":value.mode==="match_play"?"match_play":value.mode==="four_ball"?"four_ball":"general",stablefordCategory:value.categoryKey||null,stablefordRoundNumber:Number(value.seriesRoundNumber)||null,courseKey:value.course?.key||"pulte",course:value.course?.name||"CAMPO",tournament:value.tournament?.name?{name:value.tournament.name}:null,players:value.players.slice(0,6).map(localPlayer),createdAt:value.playedAt||new Date().toISOString(),updatedAt:value.officiallyClosedAt||value.endedAt||value.playedAt||new Date().toISOString(),endedAt:value.endedAt||null,durationSeconds:Number(value.durationSeconds)||null,officiallyClosedAt:value.officiallyClosedAt||null,status:value.status||"active",officialSnapshot:value.officialSnapshot||null,snapshotHash:value.snapshotHash||null,matchPlay:value.officialSnapshot?.matchPlay||null,fourBall:value.officialSnapshot?.fourBall||null,announced:{front:false,back:false,complete:false}};
  }
  function playerFromProfile(value,index){
    return{id:value?.clientPlayerId||`central-player-${index+1}`,registrationCode:value?.registrationCode||"",name:value?.fullName||`Jugador ${index+1}`,handicap:Number.isInteger(value?.handicap)?value.handicap:0,tee:value?.teeKey||"Blanco",matrix:value?.matrixKey==="Damas"?"Damas":"Caballeros",whatsapp:value?.whatsapp?.nationalNumber||""};
  }
  function mergeRounds(local,remote){
    const byId=new Map((local||[]).filter(Boolean).map(item=>[item.id,item]));
    for(const item of remote||[]){if(!item?.id)continue;const current=byId.get(item.id),currentAt=Date.parse(current?.updatedAt||current?.createdAt||0)||0,nextAt=Date.parse(item.updatedAt||item.createdAt||0)||0;if(!current||nextAt>=currentAt)byId.set(item.id,item)}
    return[...byId.values()].sort((a,b)=>(Date.parse(a.createdAt)||0)-(Date.parse(b.createdAt)||0)).slice(-120);
  }
  return{account,recover,localRound,playerFromProfile,mergeRounds};
});
