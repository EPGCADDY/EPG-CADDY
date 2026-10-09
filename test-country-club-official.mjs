import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index-grupal.html',import.meta.url),'utf8');
const array=name=>JSON.parse(`[${html.match(new RegExp(`const ${name}=\\[([^;]+)\\]`))?.[1]||''}]`);
const par=array('COUNTRY_CLUB_PAR');
const blue=array('COUNTRY_CLUB_SI_BLUE');
const white=array('COUNTRY_CLUB_SI_WHITE');
const women=array('COUNTRY_CLUB_SI_WOMEN');
const countryTees=html.slice(html.indexOf('const COUNTRY_CLUB_TEES='),html.indexOf('const COURSE_DATA='));

assert.deepEqual(par,[4,3,4,4,5,3,4,3,5,4,4,3,4,4,5,3,5,4]);
assert.equal(par.slice(0,9).reduce((a,b)=>a+b,0),35);
assert.equal(par.slice(9).reduce((a,b)=>a+b,0),36);
assert.equal(par.reduce((a,b)=>a+b,0),71);
for(const matrix of [blue,white,women])assert.deepEqual([...matrix].sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1));

const expected=[
  ['Negro',3186,3470,6656,72.4,145],
  ['Azul',3094,3299,6393,71.2,142],
  ['Blanco',3012,3220,6232,70.5,141],
  ['Amarillo',2756,2908,5664,67.5,134],
  ['Rojo',2696,2884,5580,72.6,137],
];
for(const [tee,front,back,total,rating,slope] of expected){
  const re=new RegExp(`${tee}:\\{[^}]*yds:\\[([^\\]]+)\\],front:(\\d+),back:(\\d+),rating:([\\d.]+),slope:(\\d+),total:(\\d+)\\}`);
  const match=countryTees.match(re);assert.ok(match,`Falta marca ${tee}`);
  const yds=match[1].split(',').map(Number);assert.equal(yds.length,18);assert.equal(yds.slice(0,9).reduce((a,b)=>a+b,0),front);assert.equal(yds.slice(9).reduce((a,b)=>a+b,0),back);assert.equal(yds.reduce((a,b)=>a+b,0),total);assert.equal(Number(match[4]),rating);assert.equal(Number(match[5]),slope);assert.equal(Number(match[6]),total);
}
assert.ok(html.includes('activateCourse(draftCourse)'),'El campo elegido debe activar sus datos antes de iniciar');
assert.ok(html.includes('siByTee:{Negro:COUNTRY_CLUB_SI_BLUE,Azul:COUNTRY_CLUB_SI_BLUE,Blanco:COUNTRY_CLUB_SI_WHITE,Amarillo:COUNTRY_CLUB_SI_WOMEN,Rojo:COUNTRY_CLUB_SI_WOMEN}'),'Cada tee debe usar la matriz oficial correspondiente');
console.log('PASS Country Club oficial: 18 pares, 90 yardajes, 5 ratings/slopes y 3 matrices HDCP');
