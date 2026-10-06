import assert from "node:assert/strict";
import fs from "node:fs";
import {createRequire} from "node:module";
import {groupKey} from "./api/live.js";

const require=createRequire(import.meta.url),hub=require("./live-hub.js"),read=file=>fs.readFileSync(file,"utf8");
const token=letter=>letter.repeat(43);
function makeStream(groupNumber,playerCount=4){
  const players=Array.from({length:playerCount},(_,index)=>{
    const number=(groupNumber-1)*playerCount+index+1,holes=(number%18)+1,relativeToPar=(number%13)-6;
    return{id:`player-${groupNumber}-${index+1}`,name:`JUGADOR ${String(number).padStart(2,"0")}`,handicap:number%25,tee:"BLANCO",holes:[],totals:{holes,gross:holes*5,net:holes*4,par:holes*4,relativeToPar,stablefordPoints:null}};
  });
  return{id:`stream-${groupNumber}`,groupLabel:`GRUPO ${String(groupNumber).padStart(2,"0")}`,status:"active",revision:groupNumber,snapshot:{schemaVersion:1,appVersion:"V353",roundId:`round-${groupNumber}`,groupLabel:`GRUPO ${groupNumber}`,course:"CAMPO INTERNACIONAL",courseHoles:[],mode:"general",status:"active",players}};
}

const twentyGroups=Array.from({length:20},(_,index)=>makeStream(index+1,4));
const eightyPlayers=hub.buildLeaderboard(twentyGroups);
assert.equal(twentyGroups.length,20,"80 personas en grupos normales requieren 20 publicadores");
assert.equal(eightyPlayers.length,80,"la General conserva los 80 jugadores");
assert.equal(new Set(eightyPlayers.map(item=>`${item.streamId}:${item.playerId}`)).size,80,"ningÃºn jugador se ¶»§q«^