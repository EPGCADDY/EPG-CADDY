(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.GSCWolf=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const DECISIONS=Object.freeze({partner:1,solo:1,lone:2,blind:3});
  const round=(value,digits=2)=>{const factor=10**digits;return Math.round((Number(value)||0)*factor)/factor};
  const validPlayers=players=>Array.isArray(players)?players.filter(player=>player?.id&&player?.name).slice(0,6):[];
  const scoreAt=(player,hole,type)=>{const score=player?.holes?.[hole];if(!score)return{state:"missing",value:null};if(score.status==="x")return{state:"x",value:null};const value=Number(score[type]);return Number.isFinite(value)?{state:"valid",value}:{state:"missing",value:null}};

  function normalizeConfig(value={}){
    const scoreType=value.scoreType==="gross"?"gross":"net",tiePolicy=value.tiePolicy==="carry"?"carry":"push",unitValue=Math.max(.01,round(value.unitValue||10,2));
    const decisions={};for(const[hole,entry]of Object.entries(value.decisions||{})){const number=Number(hole),type=Object.hasOwn(DECISIONS,entry?.type)?entry.type:"partner";if(Number.isInteger(number)&&number>=1&&number<=18)decisions[number]={type,partnerPlayerId:String(entry?.partnerPlayerId||"")||null}}
    return{enabled:value.enabled===true,scoreType,tiePolicy,unitValue,currency:"GTQ",decisions,multipliers:{...DECISIONS},settlement:"each_winner_collects_from_each_loser",variant:"GSC_GT_3_TO_6_PLAYERS"};
  }

  function settle(players,balances,winnerIds,stake){
    const winners=new Set(winnerIds),loserCount=players.length-winners.size;
    for(const player of players)balances[player.id]=round((balances[player.id]||0)+(winners.has(player.id)?stake*loserCount:-stake*winners.size),2);
  }

  function settlements(players,balances){
    const debtors=players.map(player=>({id:player.id,name:player.name,amount:round(-(balances[player.id]||0),2)})).filter(item=>item.amount>.009).sort((a,b)=>b.amount-a.amount),creditors=players.map(player=>({id:player.id,name:player.name,amount:round(balances[player.id]||0,2)})).filter(item=>item.amount>.009).sort((a,b)=>b.amount-a.amount),out=[];let d=0,c=0;
    while(d<debtors.length&&c<creditors.length){const amount=round(Math.min(debtors[d].amount,creditors[c].amount),2);if(amount)out.push({fromPlayerId:debtors[d].id,fromName:debtors[d].name,toPlayerId:creditors[c].id,toName:creditors[c].name,amount});debtors[d].amount=round(debtors[d].amount-amount,2);creditors[c].amount=round(creditors[c].amount-amount,2);if(debtors[d].amount<=.009)d++;if(creditors[c].amount<=.009)c++}
    return out;
  }

  function compute(playersInput,configInput={},options={}){
    const players=validPlayers(playersInput),config=normalizeConfig(configInput),holeCount=Math.max(1,Math.min(18,Math.trunc(Number(options.holeCount)||18))),balances=Object.fromEntries(players.map(player=>[player.id,0])),summaries=Object.fromEntries(players.map(player=>[player.id,{playerId:player.id,name:player.name,wolfHoles:0,wins:0,losses:0,ties:0,balance:0}])),holes=[];
    if(!config.enabled||players.length<3)return{ok:false,code:!config.enabled?"WOLF_DISABLED":"WOLF_REQUIRES_3_PLAYERS",config,holes,summaries:Object.values(summaries),balances,settlements:[]};
    let carryUnits=0;
    for(let hole=1;hole<=holeCount;hole++){
      const wolfIndex=(hole-1)%players.length,wolf=players[wolfIndex],decision=config.decisions[hole];summaries[wolf.id].wolfHoles++;
      if(!decision){holes.push({hole,state:"decision_pending",wolfPlayerId:wolf.id,wolfName:wolf.name,winnerIds:[],carryUnits});continue}
      const type=decision.type,partner=type==="partner"?players.find(player=>player.id===decision.partnerPlayerId&&player.id!==wolf.id):null;
      if(type==="partner"&&!partner){holes.push({hole,state:"decision_pending",reason:"PARTNER_REQUIRED",wolfPlayerId:wolf.id,wolfName:wolf.name,winnerIds:[],carryUnits});continue}
      const wolfSideIds=[wolf.id,...(partner?[partner.id]:[])],opponentIds=players.filter(player=>!wolfSideIds.includes(player.id)).map(player=>player.id),scores=players.map(player=>({playerId:player.id,name:player.name,...scoreAt(player,hole,config.scoreType)}));
      if(scores.some(score=>score.state==="missing")){holes.push({hole,state:"pending",reason:"MISSING_SCORE",type,wolfPlayerId:wolf.id,partnerPlayerId:partner?.id||null,scores,winnerIds:[],carryUnits});continue}
      const sideBest=ids=>{const valid=scores.filter(score=>ids.includes(score.playerId)&&score.state==="valid");return valid.length?Math.min(...valid.map(score=>score.value)):Infinity},wolfBest=sideBest(wolfSideIds),opponentBest=sideBest(opponentIds),multiplier=config.multipliers[type],potUnits=1+carryUnits;
      if(wolfBest===opponentBest){for(const player of players)summaries[player.id].ties++;if(config.tiePolicy==="carry")carryUnits=potUnits;else carryUnits=0;holes.push({hole,state:config.tiePolicy==="carry"?"carry":"push",type,multiplier,potUnits,wolfPlayerId:wolf.id,partnerPlayerId:partner?.id||null,wolfSideIds,opponentIds,wolfBest,opponentBest,scores,winnerIds:[],carryUnits});continue}
      const wolfWins=wolfBest<opponentBest,winnerIds=wolfWins?wolfSideIds:opponentIds,loserIds=wolfWins?opponentIds:wolfSideIds,stake=round(config.unitValue*multiplier*potUnits,2);settle(players,balances,winnerIds,stake);
      for(const id of winnerIds)summaries[id].wins++;for(const id of loserIds)summaries[id].losses++;
      holes.push({hole,state:"won",type,multiplier,potUnits,stake,wolfPlayerId:wolf.id,wolfName:wolf.name,partnerPlayerId:partner?.id||null,partnerName:partner?.name||null,wolfSideIds,opponentIds,wolfBest,opponentBest,scores,winnerIds,winnerSide:wolfWins?"wolf":"field"});carryUnits=0;
    }
    for(const summary of Object.values(summaries))summary.balance=round(balances[summary.playerId]||0,2);
    return{ok:true,config,holes,summaries:Object.values(summaries),balances,pendingCarryUnits:carryUnits,settlements:settlements(players,balances)};
  }

  return Object.freeze({DECISIONS,normalizeConfig,compute,scoreAt});
});
