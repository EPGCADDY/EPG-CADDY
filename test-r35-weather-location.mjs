import assert from 'node:assert/strict';
import handler,{weatherLocationFromQuery,universalWeatherOrigin,requestUniversalResponse} from './api/universal-ai.js';
import {weatherPlaceSearch,computeWeatherForecast} from './api/weather.js';
const context={course:'El Pulté Golf, Guatemala',weatherOrigin:{location:'El Pulté Golf, Guatemala',latitude:14.5,longitude:-90.5}};
assert.equal(weatherLocationFromQuery('Cómo está el clima en la ciudad de Colima México'),'Colima México');
for(const input of ['Clima en Ciudad de México','Clima en la Ciudad de México hoy','Clima en Ciudad de México, México'])assert.match(weatherLocationFromQuery(input),/^Ciudad de México/i);
assert.deepEqual(weatherPlaceSearch(weatherLocationFromQuery('Clima en Ciudad de México')),{name:'Ciudad de México',countryCode:'MX'});
assert.deepEqual(universalWeatherOrigin('Clima en Colima México',context),{location:'Colima México'});
assert.deepEqual(universalWeatherOrigin('Clima aquí',context),context.weatherOrigin);
assert.deepEqual(universalWeatherOrigin('Clima en 30 minutos',context),context.weatherOrigin);
assert.equal(weatherLocationFromQuery('Clima en 30 minutos en Colima México'),'Colima México');
assert.deepEqual(universalWeatherOrigin('¿Lloverá en El Pulté?',context),context.weatherOrigin);
assert.deepEqual(universalWeatherOrigin('Clima en El Pulté México',context),{location:'El Pulté México'});
assert.deepEqual(universalWeatherOrigin('Cómo estará el tiempo',context,'Madrid, España'),{location:'Madrid, España'});
for(const [input,name,code] of [['Colima México','Colima','MX'],['Madrid España','Madrid','ES'],['París, Francia','París','FR'],['San José Costa Rica','San José','CR'],['Buenos Aires Argentina','Buenos Aires','AR']])assert.deepEqual(weatherPlaceSearch(input),{name,countryCode:code});
assert.equal(weatherLocationFromQuery('¿Lloverá en Madrid España mañana?'),'Madrid España');
assert.equal(weatherLocationFromQuery('¿Clima en el campo hoy?'),'');
console.log('PASS ubicación explícita precede al campo y país se separa sin catálogo de ciudades');
const originalFetch=globalThis.fetch,calls=[];
try{
 globalThis.fetch=async raw=>{
  const url=new URL(raw);calls.push(url);
  if(url.hostname.includes('geocoding')){const name=url.searchParams.get('name');return {ok:true,json:async()=>({results:name==='Colima'?[{name:'Colima',admin1:'Colima',country:'México',latitude:19.24997,longitude:-103.72714}]:name==='Manzanillo'?[{name:'Manzanillo',feature_code:'AIRF',admin1:'Estado de Colima',country:'México',country_code:'MX',latitude:19,longitude:-104},{name:'Manzanillo',feature_code:'PPL',admin1:'Granma',country:'Cuba',country_code:'CU',latitude:20.34,longitude:-77.12},{name:'Manzanillo',feature_code:'PPL',admin1:'Estado de Colima',country:'México',country_code:'MX',latitude:19.11695,longitude:-104.34214}]:name==='Madrid'?[{name:'Madrid',country:'España',latitude:40.4165,longitude:-3.70256}]:[]})}}
  return {ok:true,json:async()=>({timezone:'America/Mexico_City',current:{time:'2026-09-13T08:45',temperature_2m:27,apparent_temperature:28,precipitation:0,weather_code:2,wind_speed_10m:8},hourly:{time:['2026-09-13T09:00'],precipitation_probability:[30],precipitation:[0]}})};
 };
 const ask=async(query,history=[])=>{let status=200,body;await handler({method:'POST',headers:{},body:{query,history,responseMode:'voice',appContext:context}},{setHeader(){},status(n){status=n;return this},json(value){body=value;return this}});return{status,body}};
 const first=await ask('Cómo está el clima en la ciudad de Colima México');assert.equal(first.status,200);assert.match(first.body.answer,/Colima, México/);assert.doesNotMatch(first.body.answer,/Pulté|Guatemala/);
 assert.equal(calls[0].searchParams.get('countryCode'),'MX');assert.equal(calls[1].searchParams.get('latitude'),'19.24997');assert.equal(calls[1].searchParams.get('longitude'),'-103.72714');
 const second=await ask('¿Y en Madrid España?',[{role:'user',content:'Cómo está el clima en Colima México'},{role:'assistant',content:first.body.answer}]);assert.equal(second.status,200);assert.match(second.body.answer,/Madrid, España/);assert.equal(calls.at(-1).searchParams.get('latitude'),'40.4165');
 const missing=await ask('Clima en CiudadinventadaXYZ');assert.equal(missing.body.error,'LOCATION_REQUIRED');assert.equal(calls.at(-1).hostname,'geocoding-api.open-meteo.com');
 const state=await ask('Cómo está el clima en Manzanillo Colima');assert.equal(state.status,200);assert.match(state.body.answer,/Manzanillo, Estado de Colima, México/);assert.equal(calls.at(-1).searchParams.get('latitude'),'19.11695');
 const unknownState=await ask('Clima en Manzanillo Estadoinventado');assert.equal(unknownState.body.error,'LOCATION_REQUIRED');
 const nullCoords=await computeWeatherForecast({location:'Colima México',latitude:null,longitude:null});assert.equal(nullCoords.ok,true);assert.equal(calls.at(-1).searchParams.get('latitude'),'19.24997');
 console.log('PASS handler completo: Colima usa México; segunda pregunta Madrid cambia ciudad; lugar inexistente no sustituye Guatemala; coordenadas null no se convierten en cero');
}finally{globalThis.fetch=originalFetch}
let direct=0,gateway=0,sleeps=0;
const result=await requestUniversalResponse({input:[]},{apiKey:'synthetic',gatewayToken:'synthetic',sleepImpl:async()=>{sleeps++},fetchImpl:async url=>{if(url.includes('api.openai.com')){direct++;return{ok:false,status:429,headers:{get:()=>null},json:async()=>({error:{code:'credit_balance_exhausted'}})}}gateway++;return{ok:true,status:200,json:async()=>({output:[]})}}});
assert.equal(result.ok,true);assert.equal(direct,1);assert.equal(gateway,1);assert.equal(sleeps,0);console.log('PASS saldo agotado: un intento, respaldo inmediato, cero esperas artificiales');
