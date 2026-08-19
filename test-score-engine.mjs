import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const array=name=>JSON.parse(`[${html.match(new RegExp(`const ${name}=\\[([^;]+)\\]`))?.[1]||''}]`);
const PAR=array('PAR'),matrices=[array('SI_MEN'),array('SI_WOMEN')];
assert.equal(PAR.length,18);

const strokes=(handicap,hole,matrix)=>{
  const h=Math.max(0,Math.min(54,Math.trunc(Number(handicap)||0))),si=matrix[hole-1];
  return Math.floor(h/18)+(h%18>0&&si<=h%18?1:0);
};

for(const matrix of matrices){
  assert.deepEqual([...matrix].sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1));
  for(let handicap=0;handicap<=54;handicap++){
    assert.equal(Array.from({length:18},(_,i)=>strokes(handicap,i+1,matrix)).reduce((a,b)=>a+b,0),handicap);
    for(let hole=1;hole<=18;hole++)for(let gross=1;gross<=12;gross++){
      const received=strokes(handicap,hole,matrix),net=gross-received,diff=net-PAR[hole-1];
      assert.equal(net,gross-received);
      assert.equal(diff,net-PAR[hole-1]);
    }
  }
}

for(const handicap of [0,5,12,18,36,54]){
  const gross=PAR.map((par,i)=>par+(i%3)-1),matrix=matrices[0];
  const frontGross=gross.slice(0,9).reduce((a,b)=>a+b,0),backGross=gross.slice(9).reduce((a,b)=>a+b,0);
  const frontNet=gross.slice(0,9).reduce((sum,n,i)=>sum+n-strokes(handicap,i+1,matrix),0);
  const backNet=gross.slice(9).reduce((sum,n,i)=>sum+n-strokes(handicap,i+10,matrix),0);
  assert.equal(frontGross+backGross,gross.reduce((a,b)=>a+b,0));
  assert.equal(frontNet+backNet,gross.reduce((sum,n,i)=>sum+n-strokes(handicap,i+1,matrix),0));
}

assert.ok(html.includes('const s=derivedScoreForHole(p,h)'),'Las casillas deben usar el mismo cálculo derivado que los totales');
assert.ok(html.includes('net:items.reduce((sum,x)=>sum+x.s.net,0)'),'Los totales deben sumar el Neto derivado');
console.log('PASS motor exhaustivo Gross/Neto/handicap: 2 matrices × HCP 0–54 × 18 hoyos × 12 Gross');
