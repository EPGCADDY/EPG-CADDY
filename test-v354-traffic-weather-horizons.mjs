import assert from "node:assert/strict";
import handler,{
  directTrafficRouteFromQuery,
  formatStructuredTrafficAnswer,
  formatStructuredWeatherAnswer,
  temporalIntentForQuery,
  trafficDepartureForQuery,
  weatherForecastIntentForQuery
} from "./api/universal-ai.js";
import { summarizeTrafficRoute } from "./api/_lib/traffic.js";
import { summarizeWeather } from "./api/weather.js";

const nowMs=Date.parse("2026-08-28T16:15:00.000Z");
const temporalCases=[
  ["en 30 minutos",30,"2026-08-28T16:45:00.000Z","2026-08-28T10:45"],
  ["dentro de una hora",60,"2026-08-28T17:15:00.000Z","2026-08-28T11:15"],
  ["dentro de tres horas",180,"2026-08-28T19:15:00.000Z","2026-08-28T13:15"]
];
for(const [phrase,minutes,iso,local] of temporalCases){
  const intent=temporalIntentForQuery(`¿Cómo estará ${phrase}?`,{nowMs});
  assert.equal(intent.relativeMinutes,minutes);
  assert.equal(intent.iso,iso);
  assert.equal(intent.localDateTime,local);
}
assert.deepEqual(trafficDepartureForQuery("Tráfico mañana a las 8:00",{nowMs}),{
  departureTime:"2026-08-29T14:00:00.000Z",assumedTime:false,
  intent:{kind:"tomorrow",granularity:"minute",localDate:"2026-08-29",localTime:"08:00",localDateTime:"2026-08-29T08:00",iso:"2026-08-29T14:00:00.000Z"}
});
const nextWeekTraffic=trafficDepartureForQuery("Tráfico la otra semana",{nowMs});
assert.equal(nextWeekTraffic.departureTime,"2026-09-04T16:15:00.000Z");
assert.equal(nextWeekTraffic.assumedTime,true,"sin hora explícita se usa y declara la misma hora local");
assert.deepEqual(weatherForecastIntentForQuery("Clima la otra semana",{nowMs}),{
  forecastDate:"2026-09-04",forecastTargetTime:"",intent:{kind:"next_week",granularity:"day",localDate:"2026-09-04"}
});
assert.equal(weatherForecastIntentForQuery("Clima mañana por la mañana",{nowMs}).forecastDate,"2026-08-29");
assert.equal(weatherForecastIntentForQuery("Clima esta tarde",{nowMs}).forecastDate,"2026-08-28");
assert.equal(weatherForecastIntentForQuery("Clima el 2026-09-05 a las 6:30 pm",{nowMs}).forecastTargetTime,"2026-09-05T18:30");

const suffixRoute=directTrafficRouteFromQuery("¿Cuánto tráfico hay de El Pulté Golf a Pradera Concepción, Guatemala dentro de tres horas?");
assert.deepEqual(suffixRoute,{origin:"El Pulté Golf",destination:"Pradera Concepción, Guatemala"},"la hora futura no puede contaminar el destino");

const currentTraffic=summarizeTrafficRoute({routes:[{duration:"2100s",staticDuration:"1800s",distanceMeters:15000}]},{originLabel:"El Pulté Golf",destinationLabel:"Pradera Concepción",calculatedAt:"2026-08-28T16:15:00.000Z"});
assert.equal(currentTraffic.isFutureEstimate,false);
assert.match(formatStructuredTrafficAnswer(currentTraffic),/Tráfico en vivo/);
assert.doesNotMatch(formatStructuredTrafficAnswer(currentTraffic),/Salida solicitada/);
const futureTraffic=summarizeTrafficRoute({routes:[{duration:"1800s",staticDuration:"1680s",distanceMeters:16100}]},{originLabel:"El Pulté Golf",destinationLabel:"Pradera Concepción",departureTime:"2026-08-29T14:00:00.000Z",calculatedAt:"2026-08-28T16:15:00.000Z"});
assert.equal(futureTraffic.isFutureEstimate,true);
for(const token of ["Tráfico previsto","Salida solicitada","Hora de cálculo","predicción de tráfico","no es una medición en vivo del futuro"])assert.match(formatStructuredTrafficAnswer(futureTraffic),new RegExp(token));
assert.doesNotMatch(formatStructuredTrafficAnswer(futureTraffic),/[ap]\.\s*m\.\./i);

const dates=Array.from({length:16},(_,index)=>{
  const date=new Date("2026-08-28T00:00:00.000Z");date.setUTCDate(date.getUTCDate()+index);return date.toISOString().slice(0,10);
});
const weatherPayload={
  timezone:"America/Guatemala",
  daily:{
    time:dates,weather_code:dates.map(()=>2),temperature_2m_min:dates.map(()=>16),temperature_2m_max:dates.map(()=>27),
    apparent_temperature_min:dates.map(()=>17),apparent_temperature_max:dates.map(()=>29),precipitation_sum:dates.map(()=>1.2),
    precipitation_probability_max:dates.map(()=>45),wind_speed_10m_max:dates.map(()=>18)
  },
  hourly:{
    time:["2026-08-28T10:00","2026-08-28T11:00","2026-08-28T12:00","2026-08-28T14:00"],
    temperature_2m:[22,23,24,25],apparent_temperature:[23,24,25,26],weather_code:[2,61,61,95],wind_speed_10m:[8,10,12,18],
    precipitation_probability:[15,35,50,80],precipitation:[0,0.2,0.8,3.4]
  }
};
const halfHour=summarizeWeather(weatherPayload,"El Pulté Golf",{forecastStartDate:"2026-08-28",forecastEndDate:"2026-08-28",forecastTargetTime:"2026-08-28T10:45"});
assert.equal(halfHour.ok,true);
assert.equal(halfHour.forecastType,"hour");
assert.equal(halfHour.forecastAt,"2026-08-28T11:00","Open-Meteo horario usa la primera hora disponible posterior");
assert.equal(halfHour.forecastResolutionMinutes,60);
assert.equal(halfHour.temperatureC,23);
assert.equal(halfHour.rainProbability,35);
for(const token of ["Hora solicitada","Resolución del proveedor","siguiente hora disponible","Es un pronóstico, no una observación futura"])assert.match(formatStructuredWeatherAnswer(halfHour),new RegExp(token));
const tomorrow=summarizeWeather(weatherPayload,"El Pulté Golf",{forecastStartDate:"2026-08-29",forecastEndDate:"2026-08-29"});
assert.equal(tomorrow.forecastType,"day");
assert.equal(tomorrow.forecastStartDate,"2026-08-29");
const nextWeek=summarizeWeather(weatherPayload,"El Pulté Golf",{forecastStartDate:"2026-09-04",forecastEndDate:"2026-09-04"});
assert.equal(nextWeek.ok,true);
assert.equal(nextWeek.forecastStartDate,"2026-09-04");
const beyond=summarizeWeather(weatherPayload,"El Pulté Golf",{forecastStartDate:"2026-09-20",forecastEndDate:"2026-09-20"});
assert.equal(beyond.error,"FORECAST_DATE_UNAVAILABLE");
assert.equal(beyond.providerForecastLimitDays,16);
assert.match(beyond.message,/sólo ofrece pronóstico/);
assert.match(beyond.message,/no presentaré datos actuales como si fueran futuros/);

function responseRecorder(){return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this}}}
const previousFetch=globalThis.fetch,previousGoogleKey=process.env.GOOGLE_MAPS_ROUTES_API_KEY;
const routeRequests=[];
process.env.GOOGLE_MAPS_ROUTES_API_KEY="google-test-key";
try{
  globalThis.fetch=async(url,options={})=>{
    if(String(url).includes("routes.googleapis.com")){
      routeRequests.push(JSON.parse(options.body));
      return{ok:true,json:async()=>({routes:[{duration:"2160s",staticDuration:"1800s",distanceMeters:15000}]})};
    }
    throw new Error(`Proveedor no esperado: ${url}`);
  };
  const routeQueries=[
    "¿Cuánto tráfico habrá mañana a las 8:00 de El Pulté Golf a Pradera Concepción, Guatemala?",
    "¿Cuánto tráfico habrá dentro de tres horas de Guatemala Country Club a Alta Vista Golf, Guatemala?",
    "¿Cuánto tráfico habrá la otra semana de Mayan Golf Club a El Pulté Golf, Guatemala?"
  ];
  for(const query of routeQueries){
    const res=responseRecorder();
    await handler({method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query,history:[],appContext:{mode:"general"}}},res);
    assert.equal(res.statusCode,200);
    assert.match(res.body.answer,/Tráfico previsto/);
    assert.match(res.body.answer,/Salida solicitada/);
  }
  assert.equal(routeRequests.length,3);
  for(const request of routeRequests){
    assert.match(request.departureTime,/^20\d{2}-\d{2}-\d{2}T/);
    assert.equal(request.routingPreference,"TRAFFIC_AWARE_OPTIMAL");
  }

  const runtimeIntent=weatherForecastIntentForQuery("¿Cómo estará el clima en 30 minutos?");
  globalThis.fetch=async(url)=>{
    assert.match(String(url),/api\.open-meteo\.com/);
    const requested=runtimeIntent.forecastTargetTime,nextHour=new Date(`${requested}:00-06:00`);nextHour.setUTCMinutes(0,0,0);if(nextHour.getTime()<Date.parse(`${requested}:00-06:00`))nextHour.setUTCHours(nextHour.getUTCHours()+1);
    const localNext=new Intl.DateTimeFormat("sv-SE",{timeZone:"America/Guatemala",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(nextHour).replace(" ","T");
    return{ok:true,json:async()=>({
      timezone:"America/Guatemala",
      daily:{time:[runtimeIntent.forecastDate],weather_code:[2],temperature_2m_min:[17],temperature_2m_max:[27],apparent_temperature_min:[18],apparent_temperature_max:[28],precipitation_sum:[0.5],precipitation_probability_max:[40],wind_speed_10m_max:[12]},
      hourly:{time:[localNext],temperature_2m:[24],apparent_temperature:[25],weather_code:[2],wind_speed_10m:[10],precipitation_probability:[30],precipitation:[0.1]}
    })};
  };
  const weatherRes=responseRecorder();
  await handler({method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿Cómo estará el clima en 30 minutos?",history:[],appContext:{course:"El Pulté Golf",weatherOrigin:{location:"El Pulté Golf, Guatemala",latitude:14.6164777,longitude:-90.4210559}}}},weatherRes);
  assert.equal(weatherRes.statusCode,200);
  assert.match(weatherRes.body.answer,/Pronóstico horario de Open-Meteo/);
  assert.match(weatherRes.body.answer,/Resolución del proveedor/);
}finally{
  globalThis.fetch=previousFetch;
  if(previousGoogleKey===undefined)delete process.env.GOOGLE_MAPS_ROUTES_API_KEY;else process.env.GOOGLE_MAPS_ROUTES_API_KEY=previousGoogleKey;
}

console.log("PASS V354 · tráfico y clima actuales/futuros distinguidos en 30 min, 1 h, 3 h, mañana, próxima semana y límite de 16 días");
