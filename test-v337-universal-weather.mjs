import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{isDirectWeatherQuery,sanitizeUniversalAppContext,weatherForecastDateForQuery,weatherTimePeriodFromQuery} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
assert.match(html,/weatherOrigin:course\?\.weatherCoordinates\?\{location:course\.weatherLocation,\.\.\.course\.weatherCoordinates\}:null/);
assert.match(api,/Para clima, lluvia, temperatura, sensación térmica o viento usa exclusivamente get_current_weather/);
assert.match(api,/Nunca mezcles el pronóstico con búsqueda web/);
assert.equal(weatherTimePeriodFromQuery("¿A qué hora lloverá mañana?"),"","Mañana como fecha no debe recortar el pronóstico a 06:00–11:59");
assert.equal(weatherTimePeriodFromQuery("¿Lloverá por la mañana?"),"morning");
assert.equal(weatherTimePeriodFromQuery("¿Cómo estará esta tarde?"),"afternoon");
assert.equal(isDirectWeatherQuery("¿A qué hora lloverá hoy?"),true);
assert.equal(isDirectWeatherQuery("¿Cuánto viento habrá mañana en El Pulté?"),true);
assert.equal(isDirectWeatherQuery("Analiza si conviene atacar una bandera a 140 yardas con viento de frente, agua corta y lie húmedo; compara riesgos y alternativas."),false,"Viento como factor de estrategia no debe secuestrar AI Universal");
assert.match(weatherForecastDateForQuery("¿A qué hora lloverá hoy?"),/^20\d{2}-\d{2}-\d{2}$/);

assert.deepEqual(sanitizeUniversalAppContext({
  course:"El Pulté",weatherOrigin:{location:"El Pulté Golf, Guatemala",latitude:"14.6164777",longitude:-90.4210559}
}).weatherOrigin,{location:"El Pulté Golf, Guatemala",latitude:14.6164777,longitude:-90.4210559});

const originalFetch=globalThis.fetch,originalKey=process.env.OPENAI_API_KEY;
const providerBodies=[];let weatherUrl="";
const testDate=weatherForecastDateForQuery("¿A qué hora lloverá hoy?");
globalThis.fetch=async(url,options={})=>{
  const value=String(url);
  if(value.includes("api.open-meteo.com")){
    weatherUrl=value;
    return{ok:true,json:async()=>({
      timezone:"America/Guatemala",
      daily:{time:[testDate],weather_code:[95],temperature_2m_min:[17],temperature_2m_max:[28],apparent_temperature_min:[18],apparent_temperature_max:[30],precipitation_sum:[8],precipitation_probability_max:[90],wind_speed_10m_max:[19]},
      hourly:{time:[`${testDate}T06:00`,`${testDate}T07:00`,`${testDate}T14:00`,`${testDate}T15:00`],temperature_2m:[18,19,26,25],apparent_temperature:[19,20,28,27],weather_code:[2,2,61,95],wind_speed_10m:[5,6,14,19],precipitation_probability:[10,20,65,90],precipitation:[0,0,1.2,4.1]}
    })};
  }
  const body=JSON.parse(options.body);providerBodies.push(body);
  return{ok:true,json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"No debe llamarse para clima directo."}]}]})};
};
process.env.OPENAI_API_KEY="test-key";
const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿A qué hora lloverá hoy en El Pulté?",history:[],appContext:{course:"EL PULTÉ GOLF",weatherOrigin:{location:"El Pulté Golf, Guatemala",latitude:14.6164777,longitude:-90.4210559}}}};
const res={headers:{},statusCode:0,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
try{await handler(req,res)}finally{globalThis.fetch=originalFetch;if(originalKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalKey}

assert.equal(res.statusCode,200);
assert.match(res.body.answer,/Open-Meteo/);
assert.equal(providerBodies.length,0,"Una consulta meteorológica explícita no debe depender del modelo ni de su límite de tasa");
assert.match(weatherUrl,/latitude=14\.6164777/);
assert.match(weatherUrl,/longitude=-90\.4210559/);
assert.match(weatherUrl,/hourly=temperature_2m%2Capparent_temperature%2Cweather_code%2Cwind_speed_10m%2Cprecipitation_probability%2Cprecipitation/);
for(const expected of ["06:00 10%","07:00 20%","14:00 65%","15:00 90%","90% a las 15:00"]){assert.match(res.body.answer,new RegExp(expected.replace("%","%")),expected)}

console.log("PASS V337 · clima de texto usa Open-Meteo estructurado con probabilidad por horario y coordenadas públicas del campo");
