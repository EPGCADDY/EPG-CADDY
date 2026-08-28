import assert from "node:assert/strict";
import fs from "node:fs";
import handler,{isDirectWeatherQuery,sanitizeUniversalAppContext,weatherForecastDateForQuery,weatherTimePeriodFromQuery} from "./api/universal-ai.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const weatherApi=fs.readFileSync(new URL("./api/weather.js",import.meta.url),"utf8");
assert.match(html,/weatherOrigin:course\?\.weatherCoordinates\?\{location:course\.weatherLocation,\.\.\.course\.weatherCoordinates\}:null/);
assert.match(api,/Para clima, lluvia, temperatura, sensación térmica o viento usa exclusivamente get_current_weather/);
assert.match(api,/Nunca mezcles el pronóstico con búsqueda web/);
assert.match(weatherApi,/rows\.at\(-1\)\?\.date > throughDate/,"El paginado debe completar el día solicitado, no detenerse en su primera hora");
assert.doesNotMatch(weatherApi,/searchParams\.set\("region",\s*"gt"\)/,"Clima escrito no debe fijar Guatemala: la geocodificación es mundial");
assert.equal(weatherTimePeriodFromQuery("¿A qué hora lloverá mañana?"),"","Mañana como fecha no debe recortar el pronóstico a 06:00–11:59");
assert.equal(weatherTimePeriodFromQuery("¿Lloverá por la mañana?"),"morning");
assert.equal(weatherTimePeriodFromQuery("¿Cómo estará esta tarde?"),"afternoon");
assert.equal(isDirectWeatherQuery("¿A qué hora lloverá hoy?"),true);
assert.equal(isDirectWeatherQuery("¿Cuánto viento habrá mañana en El Pulté?"),true);
assert.equal(isDirectWeatherQuery("Analiza si conviene atacar una bandera a 140 yardas con viento de frente, agua corta y lie húmedo; compara riesgos y alternativas."),false);
assert.match(weatherForecastDateForQuery("¿A qué hora lloverá hoy?"),/^20\d{2}-\d{2}-\d{2}$/);

assert.deepEqual(sanitizeUniversalAppContext({
  course:"El Pulté",weatherOrigin:{location:"El Pulté Golf, Guatemala",latitude:"14.6164777",longitude:-90.4210559}
}).weatherOrigin,{location:"El Pulté Golf, Guatemala",latitude:14.6164777,longitude:-90.4210559});

const originalFetch=globalThis.fetch;
const originalOpenAI=process.env.OPENAI_API_KEY;
const originalWeather=process.env.GOOGLE_MAPS_WEATHER_API_KEY;
const providerBodies=[];
const weatherUrls=[];
const testDate=weatherForecastDateForQuery("¿A qué hora lloverá hoy?");
const [year,month,day]=testDate.split("-").map(Number);
const hour=(hours,probability,temperatureC,feelsLikeC,windKmh,conditionType,description,precipitationMm)=>({
  displayDateTime:{year,month,day,hours,minutes:0},
  weatherCondition:{type:conditionType,description:{text:description}},
  temperature:{unit:"CELSIUS",degrees:temperatureC},
  feelsLikeTemperature:{unit:"CELSIUS",degrees:feelsLikeC},
  wind:{speed:{unit:"KILOMETERS_PER_HOUR",value:windKmh}},
  precipitation:{probability:{type:"RAIN",percent:probability},qpf:{unit:"MILLIMETERS",quantity:precipitationMm}}
});
globalThis.fetch=async(url,options={})=>{
  const value=String(url);
  if(value.includes("weather.googleapis.com/v1/forecast/days:lookup")){
    weatherUrls.push(value);
    return{ok:true,json:async()=>({
      timeZone:{id:"America/Guatemala"},
      forecastDays:[{
        displayDate:{year,month,day},
        daytimeForecast:{weatherCondition:{description:{text:"Tormentas"}},precipitation:{probability:{percent:90},qpf:{quantity:8}},wind:{speed:{value:19}}},
        nighttimeForecast:{precipitation:{probability:{percent:40},qpf:{quantity:2}},wind:{speed:{value:12}}},
        minTemperature:{degrees:17},maxTemperature:{degrees:28},feelsLikeMinTemperature:{degrees:18},feelsLikeMaxTemperature:{degrees:30}
      }]
    })};
  }
  if(value.includes("weather.googleapis.com/v1/forecast/hours:lookup")){
    weatherUrls.push(value);
    return{ok:true,json:async()=>({
      timeZone:{id:"America/Guatemala"},
      forecastHours:[
        hour(6,10,18,19,5,"PARTLY_CLOUDY","Parcialmente nublado",0),
        hour(7,20,19,20,6,"PARTLY_CLOUDY","Parcialmente nublado",0),
        hour(14,65,26,28,14,"LIGHT_RAIN","Lluvia ligera",1.2),
        hour(15,90,25,27,19,"THUNDERSTORM","Tormenta",4.1)
      ]
    })};
  }
  const body=JSON.parse(options.body);providerBodies.push(body);
  return{ok:true,json:async()=>({output:[{type:"message",content:[{type:"output_text",text:"No debe llamarse para clima directo."}]}]})};
};
process.env.OPENAI_API_KEY="test-key";
process.env.GOOGLE_MAPS_WEATHER_API_KEY="weather-test-key";
const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿A qué hora lloverá hoy en El Pulté?",history:[],appContext:{course:"EL PULTÉ GOLF",weatherOrigin:{location:"El Pulté Golf, Guatemala",latitude:14.6164777,longitude:-90.4210559}}}};
const res={headers:{},statusCode:0,setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}};
try{await handler(req,res)}finally{
  globalThis.fetch=originalFetch;
  if(originalOpenAI===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=originalOpenAI;
  if(originalWeather===undefined)delete process.env.GOOGLE_MAPS_WEATHER_API_KEY;else process.env.GOOGLE_MAPS_WEATHER_API_KEY=originalWeather;
}

assert.equal(res.statusCode,200);
assert.match(res.body.answer,/Google Weather API/);
assert.equal(providerBodies.length,0,"Una consulta meteorológica explícita no debe depender del modelo ni de su límite de tasa");
assert.equal(weatherUrls.length,2);
for(const value of weatherUrls){
  assert.match(value,/location.latitude=14\.6164777/);
  assert.match(value,/location.longitude=-90\.4210559/);
  assert.match(value,/key=weather-test-key/);
}
for(const expected of ["06:00 10%","07:00 20%","14:00 65%","15:00 90%","90% a las 15:00"]){
  assert.match(res.body.answer,new RegExp(expected.replace("%","%")),expected);
}

console.log("PASS V337 · clima de texto usa Google Weather estructurado con probabilidad por horario y coordenadas públicas del campo");
