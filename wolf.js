(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  if(root)root.GSCWolf=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const DECISIONS=Object.freeze({partner:1,lone:2,blind:3});
  const DECISION_LABELS=Object.freeze({partner:"CON PAREJA",lone:"LOBO SOLITARIO",blind:"LOBO CIEGO"});
  const round=(value,digits=2)=>{const factor=10**digits;return Math.round((Number(value)||0)*factor)/factor};
  const integer=(value,fallback,min,max)=>{const number=Math.trunc(Number(value));return Number.isFinite(number)?Math.max(min,Math.min(max,number)):fallback};
  const validPlayers=players=>Array.isArray(players)?players.filter(player=>player?.id&&player?.name).slice(0,6):[];
  const scoreAt=(player,hole,type)=>{const score=player?.holes?.[hole];if(!score)return{state:"missing",value:null};if(score.status==="x")return{state:"x",value:null};const value=Number(score[type]);return Number.isFinite(value)?{state:"valid",value}:{state:"missing",value:null}};

  function normalizeConfig(value={}){
    const scoreType=value.scoreType==="gross"?"gross":"net",tiePolicy=value.tiePolicy==="carry"?"carry":"push",unitValue=Math.max(.01,round(value.unitValue||10,2)),currency=value.currency==="USD"?"USD":"GTQ",wolfTeePosition=value.wolfTeePosition==="last"?"last":"first",holeCapAmount=Math.max(0,Math.min(100000,round(value.holeCapAmount||0,2))),multipliers={partner:1,lone:integer(value.multipliers?.lone??value.loneMultiplier,2,1,9),blind:integer(value.multipliers?.blind??value.blindMultiplier,3,1,9)};
    const decisions={};for(const[hole,entry]of Object.entries(value.decisions||{})){const number=Number(hole),legacyType=entry?.type==="solo"?"lone":entry?.type,type=Object.hasOwn(DECISIONS,legacyType)?legacyType:"partner";if(Number.isInteger(number)&&number>=1&&number<=18)decisions[number]={type,partnerPlayerId:type==="partner"?(String(entry?.partnerPlayerId||"")||null):null,declaredBeforeTee:type==="blind"}}
    return{enabled:value.enabled===true,scoreType,tiePolicy,unitValue,currency,wolfTeePosition,holeCapAmount,decisions,multipliers,settlement:"pay_the_difference_pairwise",rulesVersion:"WOLF_DUAL_CURRENCY_V332",variant:"CLASSIC_4_WITH_GSC_GT_3_5_6_ADAPTATIONS"};
  }

  function wolfForHole(playersInput,hole){const players=validPlayers(playersInput),number=Math.max(1,Math.min(18,Math.trunc(Number(hole)||1)));return players.length?players[(number-1)%players.length]:null}

  function decisionRisk(playersCount,typeInput,configInput={},carryUnits=0){
    const config=normalizeConfig(configInput),type=Object.hasOwn(DECISIONS,typeInput)?typeInput:"partner",sideSize=type==="partner"?2:1,opponentCount=Math.max(0,Math.trunc(Number(playersCount)||0)-sideSize),potUnits=1+Math.max(0,Math.trunc(Number(carryUnits)||0)),rawStake=round(config.unitValue*config.multipliers[type]*potUnits,2),stakePerRival=config.holeCapAmount>0?Math.min(rawStake,config.holeCapAmount):rawStake;
    return{type,label:DECISION_LABELS[type],multiplier:config.multipliers[type],potUnits,rawStake,stakePerRival:round(stakePerRival,2),capApplied:stakePerRival<rawStake,opponentCount,wolfExposure:round(stakePerRival*opponentCount,2)};
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
    const players=validPlayers(playersInput),config=normalizeConfig(configInput),holeCount=Math.max(1,Math.min(18,Math.trunc(Number(options.holeCount)||18))),balances=Object.fromEntries(players.map(player=>[player.id,0])),summaries=Object.fromEntries(players.map(player=>[player.id,{playerId:player.id,name:player.name,wolfHoles:0,wins:0,losses:0,ties:0,unitsWon:0,unitsLost:0,netUnits:0,balance:0}])),holes=[];
    if(!config.enabled||players.length<3)return{ok:false,code:!config.enabled?"WOLF_DISABLED":"WOLF_REQUIRES_3_PLAYERS",config,holes,summaries:Object.values(summaries),balances,metrics:{completedHoles:0,pendingDecisions:0,pendingScores:0,voidHoles:0,pushHoles:0,carryHoles:0,openCarryUnits:0,moneyTransferred:0,settlementTotal:0,largestStakePerRival:0,leaderNames:[]},settlements:[]};
    let carryUnits=0,moneyTransferred=0,largestStakePerRival=0;
    for(let hole=1;hole<=holeCount;hole++){
      const wolf=wolfForHole(players,hole),decision=config.decisions[hole];summaries[wolf.id].wolfHoles++;
      if(!decision){holes.push({hole,state:"decision_pending",wolfPlayerId:wolf.id,wolfName:wolf.name,winnerIds:[],carryUnits});continue}
      const type=decision.type,partner=type==="partner"?players.find(player=>player.id===decision.partnerPlayerId&&player.id!==wolf.id):null;
      if(type==="partner"&&!partner){holes.push({hole,state:"decision_pending",reason:"PARTNER_REQUIRED",wolfPlayerId:wolf.id,wolfName:wolf.name,winnerIds:[],carryUnits});continue}
      const wolfSideIds=[wolf.id,...(partner?[partner.id]:[])],opponentIds=players.filter(player=>!wolfSideIds.includes(player.id)).map(player=>player.id),scores=players.map(player=>({playerId:player.id,name:player.name,...scoreAt(player,hole,config.scoreType)}));
      if(scores.some(score=>score.state==="missing")){holes.push({hole,state:"pending",reason:"MISSING_SCORE",type,wolfPlayerId:wolf.id,partnerPlayerId:partner?.id||null,scores,winnerIds:[],carryUnits});continue}
      if(scores.some(score=>score.state==="x")){holes.push({hole,state:"void",reason:"X_VOIDS_HOLE",type,wolfPlayerId:wolf.id,partnerPlayerId:partner?.id||null,scores,winnerIds:[],carryUnits});continue}
      const sideBest=ids=>{const valid=scores.filter(score=>ids.includes(score.playerId)&&score.state==="valid");return valid.length?Math.min(...valid.map(score=>score.value)):Infinity},wolfBest=sideBest(wolfSideIds),opponentBest=sideBest(opponentIds),multiplier=config.multipliers[type],potUnits=1+carryUnits;
      if(wolfBest===opponentBest){for(const player of players)summaries[player.id].ties++;if(config.tiePolicy==="carry")carryUnits=potUnits;else carryUnits=0;holes.push({hole,state:config.tiePolicy==="carry"?"carry":"push",type,multiplier,potUnits,wolfPlayerId:wolf.id,partnerPlayerId:partner?.id||null,wolfSideIds,opponentIds,wolfBest,opponentBest,scores,winnerIds:[],carryUnits});continue}
      const wolfWins=wolfBest<opponentBest,winnerIds=wolfWins?wolfSideIds:opponentIds,loserIds=wolfWins?opponentIds:wolfSideIds,rawStake=round(config.unitValue*multiplier*potUnits,2),stake=round(config.holeCapAmount>0?Math.min(rawStake,config.holeCapAmount):rawStake,2),unitStake=round(stake/config.unitValue,4),totalTransferred=round(stake*winnerIds.length*loserIds.length,2);settle(players,balances,winnerIds,stake);
      for(const id of winnerIds){summaries[id].wins++;summaries[id].unitsWon=round(summaries[id].unitsWon+unitStake*loserIds.length,4)}for(const id of loserIds){summaries[id].losses++;summaries[id].unitsLost=round(summaries[id].unitsLost+unitStake*winnerIds.length,4)}
      moneyTransferred=round(moneyTransferred+totalTransferred,2);largestStakePerRival=Math.max(largestStakePerRival,stake);
      holes.push({hole,state:"won",type,decisionLabel:DECISION_LABELS[type],multiplier,potUnits,rawStake,stake,capApplied:stake<rawStake,totalTransferred,wolfPlayerId:wolf.id,wolfName:wolf.name,partnerPlayerId:partner?.id||null,partnerName:partner?.name||null,wolfSideIds,opponentIds,wolfBest,opponentBest,scores,winnerIds,loserIds,winnerSide:wolfWins?"wolf":"field"});carryUnits=0;
    }
    for(const summary of Object.values(summaries)){summary.balance=round(balances[summary.playerId]||0,2);summary.netUnits=round(summary.balance/config.unitValue,4)}
    const summaryList=Object.values(summaries),bestBalance=Math.max(0,...summaryList.map(item=>item.balance)),metrics={completedHoles:holes.filter(item=>["won","push","carry"].includes(item.state)).length,pendingDecisions:holes.filter(item=>item.state==="decision_pending").length,pendingScores:holes.filter(item=>item.state==="pending").length,voidHoles:holes.filter(item=>item.state==="void").length,pushHoles:holes.filter(item=>item.state==="push").length,carryHoles:holes.filter(item=>item.state==="carry").length,openCarryUnits:carryUnits,moneyTransferred,settlementTotal:round(Object.values(balances).filter(value=>value>0).reduce((sum,value)=>sum+value,0),2),largestStakePerRival:round(largestStakePerRival,2),leaderNames:bestBalance>0?summaryList.filter(item=>item.balance===bestBalance).map(item=>item.name):[]};
    return{ok:true,config,holes,summaries:Object.values(summaries),balances,pendingCarryUnits:carryUnits,metrics,settlements:settlements(players,balances)};
  }

  return Object.freeze({DECISIONS,DECISION_LABELS,normalizeConfig,wolfForHole,decisionRisk,compute,scoreAt});
});
