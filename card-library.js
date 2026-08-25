(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.GSCCardLibrary=api})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const text=value=>String(value??"").trim();
  const normalized=value=>text(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
  const courseName=snapshot=>typeof snapshot?.course==="object"?text(snapshot.course.displayName||snapshot.course.name||snapshot.courseKey||"CAMPO"):text(snapshot?.course||snapshot?.courseKey||"CAMPO");
  const tournamentName=snapshot=>text(snapshot?.tournament?.name||snapshot?.tournament||"SIN TORNEO");
  const timestamp=value=>{const parsed=new Date(value||0).getTime();return Number.isFinite(parsed)?parsed:0};
  function entry(round){
    const snapshot=round?.officialSnapshot;
    if(!round?.id||!snapshot?.sha256||!["officially_closed","corrected"].includes(snapshot.status)||!Array.isArray(snapshot.players)||!snapshot.players.length)return null;
    const players=snapshot.players.map(player=>({id:text(player.id),name:text(player.name)})).filter(player=>player.id&&player.name);
    if(!players.length)return null;
    const mode=snapshot.mode==="stableford"?"stableford":snapshot.mode==="match_play"?"match_play":"general";
    return Object.freeze({roundId:text(round.id),mode,course:courseName(snapshot),courseKey:text(snapshot.courseKey||round.courseKey),tournament:tournamentName(snapshot),playedAt:snapshot.playedAt||round.createdAt||snapshot.officiallyClosedAt,closedAt:snapshot.officiallyClosedAt||round.officiallyClosedAt,version:Number(snapshot.version)||1,sha256:text(snapshot.sha256),players:Object.freeze(players),snapshot});
  }
  function entries(archive){return (Array.isArray(archive)?archive:[]).map(entry).filter(Boolean).sort((a,b)=>timestamp(b.playedAt)-timestamp(a.playedAt)||b.version-a.version||a.roundId.localeCompare(b.roundId))}
  function filter(list,{mode="all",course="all",query=""}={}){
    const wantedMode=["stableford","match_play","general"].includes(mode)?mode:"all",wantedCourse=normalized(course),needle=normalized(query);
    return (Array.isArray(list)?list:[]).filter(item=>{
      if(wantedMode!=="all"&&item.mode!==wantedMode)return false;
      if(wantedCourse&&wantedCourse!=="ALL"&&normalized(item.course)!==wantedCourse&&normalized(item.courseKey)!==wantedCourse)return false;
      if(!needle)return true;
      const haystack=normalized([item.course,item.courseKey,item.tournament,item.mode,item.playedAt,...item.players.map(player=>player.name)].join(" "));
      return haystack.includes(needle);
    });
  }
  return Object.freeze({entry,entries,filter,normalized});
});
