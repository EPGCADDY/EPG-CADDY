import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync('live-hub.js','utf8');
const handler=source.match(/\$\("hubScoresReturn"\)\.onclick=\(\)=>\{([^\n]+)\};/)[1];
for(const shared of [false,true])for(const display of [false,true])for(const portal of [false,true])for(const returnTo of [false,true]){
 let back=0,directory=0,destination=null;
 const context={shared,params:new URLSearchParams(display?'display=1':''),tournamentPortalOpen:portal,scorecardReturn:returnTo?new URL('https://example.test/index-grupal.html?round_return=1'):null,root:{location:{assign:url=>destination=url}},$:id=>{assert.equal(id,'hubBack');return {click:()=>back++}},showTournamentPortal:()=>directory++};
 vm.runInNewContext('(()=>{'+handler+'})()',context);
 if(returnTo){assert.equal(destination,'https://example.test/index-grupal.html?round_return=1');assert.equal(back+directory,0)}
 else{assert.equal(back,Number(shared||display||portal));assert.equal(directory,Number(!shared&&!display&&!portal));assert.equal(destination,null)}
}
assert.match(source,/candidate\.origin===root\.location\.origin&&candidate\.pathname==='\/index-grupal\.html'/);
console.log('PASS R168: 16 close transitions; shared and display exit through Score Card, normal event returns to directory, authorized returnTo takes precedence.');
