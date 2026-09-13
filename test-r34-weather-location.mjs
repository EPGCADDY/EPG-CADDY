import assert from 'node:assert/strict';
import handler,{weatherLocationFromQuery,weatherLocationInput} from './api/universal-ai.js';
const appContext={course:'EL PULTÉ GOLF',weatherOrigin:{location:'El Pulté Golf, Guatemala',latitude:14.6164777,longitude:-90.4210559}};
assert.equal(weatherLocationFromQuery('¿Cómo está el clima en la ciudad de Colima México?'),'Colima México');
assert.equal(weatherLocationInput('Colima México',appContext).latitude,undefined);
assert.equal(weatherLocationInput('El Pulté',appContext).latitude,14.6164777);
assert.equal(weatherLocationFromQuery('¿Lloverá por la mañana?'),'');
const original=globalThis.fetch;const calls=[];
let missing=false;
globalThis.fetch=async url=>{const u=new URL(url);calls.push(u);
 if(u.hostname==='geocoding-api.open-meteo.com'){assert.equal(u.searchParams.get('name'),'Colima');assert.equal(u.searchParams.get('countryCode'),'MX');return {ok:true,json:async()=>({results:missing?[]:[{name:'Colima',admin1:'Colima',country:'México',country_code:'MX',latitude:19.24997,longitude:-103.72714}]})}}
 assert.equal(u.hostname,'api.open-meteo.com');assert.equal(u.searchParams.get('latitude'),'19.24997');assert.equal(u.searchParams.get('longitude'),'-103.72714');
 return {ok:true,json:async()=>({timezone:'America/Mexico_City',current:{time:'2026-09-13T08:15',temperature_2m:25,apparent_temperature:26,precipitation:0,weather_code:3,wind_speed_10m:8}})};
};
async function run(){const res={statusCode:0,setHeader(){},status(n){this.statusCode=n;return this},json(body){this.body=body;return this}};await handler({method:'POST',headers:{},body:{query:'Cómo está el clima en la ciudad de Colima México',responseMode:'voice',appContext}},res);return res}
try{const res=await run();assert.equal(res.statusCode,200);assert.match(res.body.answer,/Colima/);assert.doesNotMatch(res.body.answer,/Pulté|Guatemala/);missing=true;const noPlace=await run();assert.equal(noPlace.body.error,'LOCATION_REQUIRED');assert.equal(calls.filter(u=>u.hostname==='api.open-meteo.com').length,1);console.log('PASS Colima MX usa sus coordenadas y nunca vuelve al campo si la ciudad no se encuentra')}finally{globalThis.fetch=original}
