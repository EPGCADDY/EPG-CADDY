import fs from 'node:fs';
import assert from 'node:assert/strict';
const app=fs.readFileSync('index-grupal.html','utf8');

assert.match(app,/function archiveRoundSnapshot\(value\)[\s\S]*localStorage\.setItem\(activeRoundArchiveKey\(\),JSON\.stringify\(archive\.slice\(-120\)\)\)/,'Historial debe persistir hasta 120 rondas');
assert.match(app,/function persist\(\)[\s\S]*archiveRoundSnapshot\(round\)/,'Cada persistencia de ronda debe actualizar historial');
assert.match(app,/function openNewRoundDraft\(\)[\s\S]*archiveRoundSnapshot\(round\)/,'Nueva ronda debe preservar anterior en historial');
assert.match(app,/officiallyCloseRound=async function\(\)[\s\S]*archiveRoundSnapshot\(round\)/,'Cierre Stableford debe guardar historial');
assert.match(app,/async function saveOfficialCorrection\(\)[\s\S]*persist\(\);archiveRoundSnapshot\(round\)/,'Corrección oficial debe actualizar historial');
assert.match(app,/function deleteRoundFromArchive[\s\S]*activeRoundArchiveDeletedKey/,'Eliminación explícita debe persistir y evitar reaparición');
assert.match(app,/function cardLibraryEntries\(\)\{return window\.GSCCardLibrary\.entries\(readRoundArchive\(\)\)\}/,'HISTORIAL DE RONDAS debe leer del historial persistido');

console.log('PASS R60 historial: persistencia, nueva ronda, cierre, corrección, lectura y borrado explícito');
