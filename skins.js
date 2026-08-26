(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.GSCSkins=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const SCORE_TYPES=new Set(["gross","net"]);
  const TIE_POLICIES=new Set(["carry","split","void"]);

  function roundNumber(value,digits=2){
    const factor=10**digits;
    return Math.round((Number(value)||0)*factor)/factor;
  }

  function normalizeConfig(value={}){
    const scoreType=SCORE_TYPES.has(value.scoreType)?value.scoreType:"net";
    const tiePolicy=TIE_POLICIES.has(value.tiePolicy)?value.tiePolicy:"carry";
    const unitValue=Math.max(0,roundNumber(value.unitValue,2));
    return{
      enabled:value.enabled===true,
      scoreType,
      tiePolicy,
      unitValue:unitValue||10,
      currency:"GTQ",
      settlement:"each_player_stakes_one_unit"
    };
  }

  function validPlayers(players){
    if(!Array.isArray(players))return[];
    return players.filter(player=>player&&player.id&&player.name).slice(0,6);
  }

  function scoreAt(player,hole,scoreType){
    const score=player?.holes?.[hole];
    if(!score)return{state:"missing",value:null};
    if(score.status==="x")return{state:"x",value:null};
    const value=Number(score?.[scoreType]);
    return Number.isFinite(value)?{state:"valid",value}:{state:"missing",value:null};
  }

  function allocateEvent(balances,players,winnerIds,units,unitValue){
    const safeUnits=roundNumber(units,4);
    if(!winnerIds.length||safeUnits<=0)return;
    const stake=roundNumber(safeUnits*unitValue,2);
    const pot=roundNumber(stake*players.length,2);
    const share=roundNumber(pot/winnerIds.length,2);
    for(const player of players)balances[player.id]=roundNumber((balances[player.id]||0)-stake,2);
    for(const id of winnerIds)balances[id]=roundNumber((balances[id]||0)+share,2);
  }

  function settlementsFromBalances(players,balances){
    const debtors=players.map(player=>({id:player.id,name:player.name,amount:roundNumber(-(balances[player.id]||0),2)})).filter(item=>item.amount>0.009).sort((a,b)=>b.amount-a.amount);
    const creditors=players.map(player=>({id:player.id,name:player.name,amount:roundNumber(balances[player.id]||0,2)})).filter(item=>item.amount>0.009).sort((a,b)=>b.amount-a.amount);
    const settlements=[];let d=0,c=0;
    while(d<debtors.length&&c<creditors.length){
      const amount=roundNumber(Math.min(debtors[d].amount,creditors[c].amount),2);
      if(amount>0)settlements.push({fromPlayerId:debtors[d].id,fromName:debtors[d].name,toPlayerId:creditors[c].id,toName:creditors[c].name,amount});
      debtors[d].amount=roundNumber(debtors[d].amount-amount,2);creditors[c].amount=roundNumber(creditors[c].amount-amount,2);
      if(debtors[d].amount<=0.009)d++;if(creditors[c].amount<=0.009)c++;
    }
    return settlements;
  }

  function compute(playersInput,configInput={},options={}){
    const players=validPlayers(playersInput),config=normalizeConfig(configInput),holeCount=Math.max(1,Math.min(18,Math.trunc(Number(options.holeCount)||18)));
    const summaries=Object.fromEntries(players.map(player=>[player.id,{playerId:player.id,name:player.name,skins:0,holesWon:[],balance:0}]));
    const balances=Object.fromEntries(players.map(player=>[player.id,0]));
    const holes=[];
    if(!config.enabled||players.length<2)return{ok:false,code:!config.enabled?"SKINS_DISABLED":"SKINS_REQUIRES_2_PLAYERS",config,holes,summaries:Object.values(summaries),pendingCarryUnits:0,balances,settlements:[]};

    let carryUnits=0,blocked=false;
    for(let hole=1;hole<=holeCount;hole++){
      const scores=players.map(player=>({playerId:player.id,name:player.name,...scoreAt(player,hole,config.scoreType)}));
      const missing=scores.filter(item=>item.state==="missing");
      if(blocked){holes.push({hole,state:"blocked",potUnits:null,winnerIds:[],scores,reason:"PREVIOUS_HOLE_PENDING"});continue}
      if(missing.length){
        holes.push({hole,state:"pending",potUnits:1+carryUnits,winnerIds:[],scores,reason:"MISSING_SCORE"});
        if(config.tiePolicy==="carry")blocked=true;
        continue;
      }
      const valid=scores.filter(item=>item.state==="valid");
      if(!valid.length){
        holes.push({hole,state:"void",potUnits:1+carryUnits,winnerIds:[],scores,reason:"NO_VALID_SCORE"});
        carryUnits=0;continue;
      }
      const best=Math.min(...valid.map(item=>item.value)),winners=valid.filter(item=>item.value===best),potUnits=1+carryUnits;
      if(winners.length===1){
        const winner=winners[0];summaries[winner.playerId].skins=roundNumber(summaries[winner.playerId].skins+potUnits,4);summaries[winner.playerId].holesWon.push(hole);
        allocateEvent(balances,players,[winner.playerId],potUnits,config.unitValue);
        holes.push({hole,state:"won",potUnits,winnerIds:[winner.playerId],winnerNames:[winner.name],bestScore:best,scores});carryUnits=0;continue;
      }
      if(config.tiePolicy==="split"){
        const share=roundNumber(1/winners.length,4),winnerIds=winners.map(item=>item.playerId);
        for(const winner of winners){summaries[winner.playerId].skins=roundNumber(summaries[winner.playerId].skins+share,4);summaries[winner.playerId].holesWon.push(hole)}
        allocateEvent(balances,players,winnerIds,1,config.unitValue);
        holes.push({hole,state:"split",potUnits:1,winnerIds,winnerNames:winners.map(item=>item.name),sharePerWinner:share,bestScore:best,scores});carryUnits=0;continue;
      }
      if(config.tiePolicy==="void"){
        holes.push({hole,state:"void",potUnits:1,winnerIds:[],tiedPlayerIds:winners.map(item=>item.playerId),bestScore:best,scores,reason:"TIE_VOID"});carryUnits=0;continue;
      }
      carryUnits=potUnits;
      holes.push({hole,state:hole===holeCount?"carry_pending":"carry",potUnits,winnerIds:[],tiedPlayerIds:winners.map(item=>item.playerId),tiedNames:winners.map(item=>item.name),bestScore:best,scores});
    }
    for(const summary of Object.values(summaries))summary.balance=roundNumber(balances[summary.playerId]||0,2);
    return{ok:true,config,holes,summaries:Object.values(summaries),pendingCarryUnits:carryUnits,balances,settlements:settlementsFromBalances(players,balances)};
  }

  function formatMoney(value,currency="GTQ"){
    const amount=roundNumber(value,2),prefix=currency==="GTQ"?"Q":"";
    return`${amount<0?"−":""}${prefix}${Math.abs(amount).toFixed(2)}`;
  }

  return{normalizeConfig,compute,formatMoney,scoreAt,SCORE_TYPES:[...SCORE_TYPES],TIE_POLICIES:[...TIE_POLICIES]};
});
