import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const start=html.indexOf("const COURSE_CATALOG=");
const end=html.indexOf("let ACTIVE_COURSE_KEY",start);
assert.ok(start>0&&end>start,"No se encontró la fuente única de campos");
const {COURSE_CATALOG,COURSE_DATA}=new Function(`${html.slice(start,end)};return{COURSE_CATALOG,COURSE_DATA}`)();

function officialCourse(key,{par,si,tees}){
  const catalog=COURSE_CATALOG[key],course=COURSE_DATA[key];
  assert.equal(catalog.configured,true,`${key} debe estar habilitado`);
  assert.deepEqual(course.par,par,`${key}: PAR oficial`);
  assert.deepEqual(course.siMen,si,`${key}: ventajas oficiales`);
  assert.deepEqual(course.siWomen,si,`${key}: ventajas oficiales`);
  assert.equal(new Set(si).size,18,`${key}: ventajas 1–18`);
  for(const [tee,expected] of Object.entries(tees)){
    const actual=course.tees[tee];
    assert.ok(actual,`${key}: falta ${tee}`);
    assert.deepEqual(actual.yds,expected.yds,`${key}/${tee}: yardas 1–18`);
    for(const field of ["front","back","total","rating","slope"])
      assert.equal(actual[field],expected[field],`${key}/${tee}: ${field}`);
    assert.deepEqual(course.siByTee[tee],si,`${key}/${tee}: matriz de golpes`);
  }
  assert.deepEqual(Object.keys(course.tees),Object.keys(tees),`${key}: marcas oficiales exactas`);
}

officialCourse("san_isidro",{
  par:[4,3,5,3,4,4,5,4,4,4,5,4,3,4,5,3,4,4],
  si:[9,15,11,13,7,1,5,17,3,4,18,8,12,2,10,14,6,16],
  tees:{
    Negro:{yds:[393,160,569,180,427,475,594,280,440,428,509,420,215,448,592,198,433,390],front:3518,back:3633,total:7151,rating:74.1,slope:131},
    Azul:{yds:[380,149,552,173,399,466,584,270,430,418,491,408,206,420,579,169,409,378],front:3403,back:3478,total:6881,rating:72.9,slope:125},
    Blanco:{yds:[358,139,530,155,375,436,553,259,410,409,455,383,200,385,535,149,370,369],front:3215,back:3255,total:6470,rating:71.3,slope:121},
    Amarillo:{yds:[335,132,500,134,369,429,543,230,377,371,419,354,165,364,522,128,360,356],front:3049,back:3039,total:6088,rating:69.3,slope:121},
    Rojo:{yds:[306,113,473,129,352,408,524,215,357,360,409,328,156,346,511,119,300,316],front:2877,back:2845,total:5722,rating:73.2,slope:131},
    Plateado:{yds:[259,108,373,124,302,358,465,215,293,286,409,268,121,296,429,95,223,316],front:2497,back:2440,total:4937,rating:68.7,slope:122}
  }
});

officialCourse("alta_vista",{
  par:[3,4,4,3,5,4,5,4,4,4,3,4,4,3,4,4,5,4],
  si:[3,17,11,5,13,15,1,9,7,14,16,6,2,18,10,12,4,8],
  tees:{
    Azul:{yds:[241,307,339,163,521,346,578,366,448,411,200,446,399,176,408,355,623,429],front:3309,back:3447,total:6756,rating:73.5,slope:133},
    Blanco:{yds:[223,297,317,155,506,319,556,348,425,386,187,427,352,164,377,332,604,409],front:3146,back:3238,total:6384,rating:71.4,slope:127},
    Amarillo:{yds:[204,286,296,147,495,307,533,327,401,366,173,408,337,132,358,320,585,397],front:2996,back:3076,total:6072,rating:70.2,slope:123},
    Rojo:{yds:[173,277,249,140,423,295,433,285,337,300,153,360,255,125,332,278,428,335],front:2612,back:2566,total:5178,rating:70.8,slope:125}
  }
});

assert.match(html,/plateadas:"Plateado"/i,"El registro por voz debe aceptar marcas plateadas");
assert.match(html,/preferred=\["Negro","Azul","Blanco","Rojo","Amarillo","Plateado"\]/,"La información del campo debe aceptar matrices de marcas variables");
assert.match(html,/activateCourse\(draftCourse\);[\s\S]{0,180}draftPlayers=/,"La selección del campo debe activar sus propias marcas antes de normalizar jugadores");

console.log("PASS V273 · San Isidro y Alta Vista cargados desde tarjetas oficiales");
