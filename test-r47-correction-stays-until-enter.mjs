import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
assert.match(source,/const correctionMode=operationalEntryRecorded\(player\?\.holes\?\.\[h\]\)/);
assert.match(source,/roundScoreKeypadState=\{playerId:player\.id,hole,value:"",correctionMode:true\}/);
assert.match(source,/const nextPlayer=!correctionMode/);
assert.match(source,/if\(correctionMode\)[\s\S]*setActiveScoreVisual\(player\.id\)/);
assert.match(source,/if\(selectedHole<matchLimit\)return navigateManualHole\(selectedHole\+1\)/);
console.log('PASS R47: corrección permanece en jugador y ENTER avanza hoyo');
