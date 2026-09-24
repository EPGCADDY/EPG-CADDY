import fs from 'node:fs';
import assert from 'node:assert/strict';

const c=fs.readFileSync('card-artifacts.js','utf8');

assert(c.includes('function shell(_title,snapshot,body,_summaryPlayers=snapshot.players||[])'),'La tarjeta limpia usa shell común sin resumen genérico heredado');

for(const token of ['Tarjeta Global Match Play','NETO RIVAL','Tarjeta Global Four Ball','NETO COMPAÑERO','MEJOR NETO RIVAL','★ MEJOR']) assert(c.includes(token),'Falta lógica propia '+token);
for(const token of ['Tarjeta Global Stableford','PUNTOS','G/P = Gross / Puntos Stableford']) assert(c.includes(token),'Falta Stableford '+token);
for(const token of ['Tarjeta Global Universales','G/N/P','Cada hoyo reparte exactamente 12 puntos']) assert(c.includes(token),'Falta Universales '+token);
for(const token of ['Tarjeta Global','<th>GROSS</th>','<th>NETO</th>','<th>+/-</th>']) assert(c.includes(token),'Falta Medal '+token);

console.log('PASS R61 card mode purity');
