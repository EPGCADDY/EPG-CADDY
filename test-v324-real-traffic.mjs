import assert from "node:assert/strict";
import fs from "node:fs";
import universalHandler,{directTrafficRouteFromQuery,formatStructuredTrafficAnswer,isDirectTrafficQuery} from "./api/universal-ai.js";
import trafficHandler from "./api/traffic.js";
import {computeTrafficRoute,qualifyTrafficPlace,resolveTrafficLocationContext,summarizeTrafficRoute,trafficPlaceIsQualified} from "./api/_lib/traffic.js";

const html=fs.readFileSync(new URL("./index-grupal.html",import.meta.url),"utf8");
const serviceWorker=fs.readFileSync(new URL("./service-worker.js",import.meta.url),"utf8");
const universalApi=fs.readFileSync(new URL("./api/universal-ai.js",import.meta.url),"utf8");
const trafficLib=fs.readFileSync(new URL("./api/_lib/traffic.js",import.meta.url),"utf8");

assert.match(html,/gscg-build" content="V\d{3}[^"]*"/);
assert.match(serviceWorker,/gscg-mobile-v\d{3}[^"]*/);
for(const token of [
  "function realtimeTrafficTool()",
  'name:"get_live_traffic"',
  "function trafficToolResult(argumentsText)",
  'window.gscgApiUrl("/api/traffic")',
  'call.name==="get_live_traffic"',
  "SOLICITANDO UBICACIÓN PARA EL TRÁFICO",
  "CALCULANDO TRÁFICO REAL",
  'error?.name==="AbortError"?"TRAFFIC_TIMEOUT":"TRAFFIC_UNAVAILABLE"',
  "Puedes continuar con otra pregunta."
])assert.ok(html.includes(token),`Falta integración vehicular bilateral: ${token}`);
assert.match(html,/const deviceCoordinates=await currentBrowserCoordinates\(\)/);
assert.match(html,/contextCoordinates:\{latitude:deviceCoordinates\.latitude,longitude:deviceCoordinates\.longitude\}/);
assert.match(universalApi,/LIVE_TRAFFIC_TOOL/);
assert.match(trafficLib,/routingPreference:"TRAFFIC_AWARE_OPTIMAL"/);
assert.match(universalApi,/needsCurrentLocation:true/);
assert.match(universalApi,/store:false/);
assert.match(universalApi,/Si el destino es un fragmento ambiguo/);
assert.match(universalApi,/Si needsDestinationClarification es true, haz solamente una pregunta breve/);
assert.doesNotMatch(universalApi,/defaultCountry:"Guatemala"/);
assert.doesNotMatch(trafficLib,/defaultCountry/);
assert.equal(isDirectTrafficQuery("¿Cuánto tráfico hay ahora de El Pulté Golf a Pradera Concepción, Guatemala?"),true);
assert.deepEqual(directTrafficRouteFromQuery("¿Cuánto tráfico hay ahora de El Pulté Golf a Pradera Concepción, Guatemala? Dame ETA."),{origin:"El Pulté Golf",destination:"Pradera Concepción, Guatemala"});
const physicalTrafficPhrase="cómo está el tráfico para ir del club de Golf El Pulte a Pradera Concepcion";
assert.equal(isDirectTrafficQuery(physicalTrafficPhrase),true);
assert.deepEqual(directTrafficRouteFromQuery(physicalTrafficPhrase),{origin:"Golf El Pulte",destination:"Pradera Concepcion"});
const gpsOnlyTrafficPhrase="cómo está el tráfico para ir a Polanco";
assert.deepEqual(directTrafficRouteFromQuery(gpsOnlyTrafficPhrase),{origin:"mi ubicación",destination:"Polanco"});
assert.equal(trafficPlaceIsQualified("Pradera Concepcion"),false);
assert.equal(trafficPlaceIsQualified("Pradera Concepción, Guatemala"),true);
assert.equal(qualifyTrafficPlace("Pradera Concepcion",{city:"Ciudad de Guatemala",region:"Guatemala",country:"Guatemala"}),"Pradera Concepcion, Ciudad de Guatemala, Guatemala");
assert.equal(qualifyTrafficPlace("Polanco",{city:"Ciudad de México",region:"Ciudad de México",country:"México"}),"Polanco, Ciudad de México, México");
assert.equal(qualifyTrafficPlace("Pradera Concepción, Guatemala",{country:"México"}),"Pradera Concepción, Guatemala");

const mexicoContext=await resolveTrafficLocationContext({latitude:19.4326,longitude:-99.1332},{apiKey:"google-test-key",fetchImpl:async()=>({ok:true,json:async()=>({results:[{address_components:[
  {long_name:"Ciudad de México",types:["locality"]},
  {long_name:"Ciudad de México",types:["administrative_area_level_1"]},
  {long_name:"México",types:["country"]}
]}]})})});
assert.deepEqual(mexicoContext,{city:"Ciudad de México",region:"Ciudad de México",country:"México"});

let mexicoRoutePayload=null;
const mexicoRoute=await computeTrafficRoute({
  originCoordinates:{latitude:19.4326,longitude:-99.1332},
  contextCoordinates:{latitude:19.4326,longitude:-99.1332},
  destination:"Polanco"
},{
  apiKey:"routes-test-key",
  geocodingApiKey:"geocoding-test-key",
  fetchImpl:async(url,options)=>{
    if(String(url).includes("maps.googleapis.com"))return{ok:true,json:async()=>({results:[{address_components:[
      {long_name:"Ciudad de México",types:["locality"]},
      {long_name:"Ciudad de México",types:["administrative_area_level_1"]},
      {long_name:"México",types:["country"]}
    ]}]})};
    mexicoRoutePayload=JSON.parse(options.body);
    return{ok:true,json:async()=>({routes:[{duration:"900s",staticDuration:"720s",distanceMeters:8200}]})};
  }
});
assert.equal(mexicoRoute.ok,true);
assert.equal(mexicoRoutePayload.destination.address,"Polanco, Ciudad de México, México");
assert.doesNotMatch(JSON.stringify(mexicoRoute),/19\.4326|-99\.1332/);

const worldwideCases=[
  {destination:"Times Square",city:"Nueva York",region:"Nueva York",country:"Estados Unidos"},
  {destination:"Colosseo",city:"Roma",region:"Lacio",country:"Italia"},
  {destination:"Shibuya",city:"Tokio",region:"Tokio",country:"Japón"},
  {destination:"Burj Khalifa",city:"Dubái",region:"Dubái",country:"Emiratos Árabes Unidos"},
  {destination:"Opera House",city:"Sídney",region:"Nueva Gales del Sur",country:"Australia"},
  {destination:"Waterfront",city:"Ciudad del Cabo",region:"Cabo Occidental",country:"Sudáfrica"},
  {destination:"Avenida Paulista",city:"São Paulo",region:"São Paulo",country:"Brasil"},
  {destination:"Gateway of India",city:"Bombay",region:"Maharashtra",country:"India"},
  {destination:"Torre Eiffel",city:"París",region:"Isla de Francia",country:"Francia"}
];
for(const place of worldwideCases){
  let worldwidePayload=null;
  const result=await computeTrafficRoute({
    originCoordinates:{latitude:1,longitude:1},contextCoordinates:{latitude:1,longitude:1},destination:place.destination
  },{
    apiKey:"routes-test-key",geocodingApiKey:"geocoding-test-key",
    fetchImpl:async(url,options)=>{
      if(String(url).includes("maps.googleapis.com"))return{ok:true,json:async()=>({results:[{address_components:[
        {long_name:place.city,types:["locality"]},
        {long_name:place.region,types:["administrative_area_level_1"]},
        {long_name:place.country,types:["country"]}
      ]}]})};
      worldwidePayload=JSON.parse(options.body);
      return{ok:true,json:async()=>({routes:[{duration:"600s",staticDuration:"540s",distanceMeters:5000}]})};
    }
  });
  const expected=qualifyTrafficPlace(place.destination,place);
  assert.equal(result.ok,true,`La ruta mundial debe funcionar en ${place.country}`);
  assert.equal(worldwidePayload.destination.address,expected);
}

const summary=summarizeTrafficRoute({routes:[{duration:"2100s",staticDuration:"1500s",distanceMeters:18640}]},{originLabel:"Ubicación GPS actual",destinationLabel:"Pradera Concepción, Guatemala",calculatedAt:"2026-08-26T14:00:00.000Z"});
assert.equal(summary.ok,true);
assert.equal(summary.durationMinutes,35);
assert.equal(summary.staticDurationMinutes,25);
assert.equal(summary.delayMinutes,10);
assert.equal(summary.distanceKm,18.6);
assert.equal(summary.trafficLevel,"pesado");
assert.equal(summary.source,"Google Maps Routes");
assert.equal(summary.trafficModel,"TRAFFIC_AWARE_OPTIMAL");
assert.doesNotMatch(JSON.stringify(summary),/14\.5|-90\.5/,"La respuesta no debe revelar coordenadas exactas");
const directAnswer=formatStructuredTrafficAnswer(summary);
for(const value of ["ETA","Demora por tráfico","Distancia","Hora de cálculo","Google Maps Routes","TRAFFIC_AWARE_OPTIMAL"])assert.match(directAnswer,new RegExp(value));

let routesRequest=null;
const routeResult=await computeTrafficRoute({
  originCoordinates:{latitude:14.6349,longitude:-90.5069},
  destination:"Pradera Concepción, Guatemala",
  departureTime:"2026-08-26T18:00:00-06:00"
},{
  apiKey:"google-test-key",
  nowMs:Date.parse("2026-08-26T20:00:00Z"),
  fetchImpl:async(url,options)=>{routesRequest={url,options};return{ok:true,json:async()=>({routes:[{duration:"1800s",staticDuration:"1440s",distanceMeters:17200}]})}}
});
assert.equal(routeResult.ok,true);
assert.equal(routeResult.delayMinutes,6);
assert.equal(routesRequest.url,"https://routes.googleapis.com/directions/v2:computeRoutes");
assert.equal(routesRequest.options.headers["X-Goog-Api-Key"],"google-test-key");
assert.equal(routesRequest.options.headers["X-Goog-FieldMask"],"routes.duration,routes.staticDuration,routes.distanceMeters");
const routePayload=JSON.parse(routesRequest.options.body);
assert.equal(routePayload.routingPreference,"TRAFFIC_AWARE_OPTIMAL");
assert.equal(routePayload.travelMode,"DRIVE");
assert.equal(routePayload.departureTime,"2026-08-27T00:00:00.000Z");
assert.deepEqual(routePayload.origin.location.latLng,{latitude:14.6349,longitude:-90.5069});
assert.equal(routePayload.destination.address,"Pradera Concepción, Guatemala");

assert.equal((await computeTrafficRoute({destination:"Pradera"},{apiKey:"google-test-key"})).error,"TRAFFIC_ORIGIN_REQUIRED");
assert.equal((await computeTrafficRoute({origin:"El Pulté"},{apiKey:"google-test-key"})).error,"TRAFFIC_DESTINATION_REQUIRED");
assert.equal((await computeTrafficRoute({origin:"El Pulté",destination:"Pradera"},{apiKey:" "})).error,"TRAFFIC_NOT_CONFIGURED");
const upstreamFailure=await computeTrafficRoute({origin:"El Pulté",destination:"Pradera"},{apiKey:"google-test-key",fetchImpl:async()=>({ok:false,json:async()=>({error:"quota"})})});
assert.equal(upstreamFailure.error,"TRAFFIC_UPSTREAM_UNAVAILABLE");
assert.match(upstreamFailure.message,/continuar con otra pregunta/i);
const timedOut=await computeTrafficRoute({origin:"El Pulté",destination:"Pradera"},{apiKey:"google-test-key",timeoutMs:5,fetchImpl:async(_url,{signal})=>new Promise((_resolve,reject)=>signal.addEventListener("abort",()=>reject(Object.assign(new Error("timeout"),{name:"AbortError"})),{once:true}))});
assert.equal(timedOut.error,"TRAFFIC_TIMEOUT");
assert.match(timedOut.message,/continuar con otra pregunta/i);

function responseRecorder(){return{statusCode:0,body:null,headers:{},setHeader(name,value){this.headers[name]=value},status(code){this.statusCode=code;return this},json(value){this.body=value;return this},end(){return this}}}
const originalFetch=globalThis.fetch;
const previousOpenAiKey=process.env.OPENAI_API_KEY;
const previousGoogleKey=process.env.GOOGLE_MAPS_ROUTES_API_KEY;
const previousGeocodingKey=process.env.GOOGLE_MAPS_GEOCODING_API_KEY;
process.env.OPENAI_API_KEY="openai-test-key";
process.env.GOOGLE_MAPS_ROUTES_API_KEY="google-test-key";
process.env.GOOGLE_MAPS_GEOCODING_API_KEY="google-test-key";
try{
  const calls=[];
  globalThis.fetch=async(url,options)=>{
    calls.push({url:String(url),options});
    if(String(url).includes("maps.googleapis.com"))return{ok:true,json:async()=>({results:[{address_components:[
      {long_name:"Ciudad de Guatemala",types:["locality"]},
      {long_name:"Guatemala",types:["administrative_area_level_1"]},
      {long_name:"Guatemala",types:["country"]}
    ]}]})};
    if(String(url).includes("routes.googleapis.com"))return{ok:true,json:async()=>({routes:[{duration:"2040s",staticDuration:"1500s",distanceMeters:18400}]})};
    throw new Error("La consulta directa de tráfico no debe depender de OpenAI");
  };
  const req={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿Cuánto tráfico hay ahora de El Pulté Golf a Pradera Concepción, Guatemala? Dame ETA, demora, distancia y hora de cálculo.",history:[],appContext:{course:"El Pulté",mode:"general"}}};
  const res=responseRecorder();
  await universalHandler(req,res);
  assert.equal(res.statusCode,200);
  assert.match(res.body.answer,/ETA:\*\* 34 min/);
  assert.match(res.body.answer,/Demora por tráfico:\*\* 9 min/);
  assert.match(res.body.answer,/18\.4 km/);
  assert.match(res.body.answer,/Hora de cálculo/);
  assert.equal(calls.filter(call=>call.url.includes("api.openai.com")).length,0);
  assert.equal(calls.filter(call=>call.url.includes("routes.googleapis.com")).length,1);
  assert.doesNotMatch(res.body.answer,/14\.6349|-90\.5069/);

  const physicalReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:physicalTrafficPhrase,history:[],appContext:{course:"El Pulté",mode:"general"}}};
  const physicalRes=responseRecorder();
  await universalHandler(physicalReq,physicalRes);
  assert.equal(physicalRes.statusCode,428);
  assert.equal(physicalRes.body.needsCurrentLocation,true);
  const physicalGpsReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:physicalTrafficPhrase,history:[],appContext:{course:"El Pulté",mode:"general",trafficOrigin:{latitude:14.6164777,longitude:-90.4210559}}}};
  const physicalGpsRes=responseRecorder();
  await universalHandler(physicalGpsReq,physicalGpsRes);
  assert.equal(physicalGpsRes.statusCode,200);
  assert.match(physicalGpsRes.body.answer,/Golf El Pulte/);
  assert.match(physicalGpsRes.body.answer,/Pradera Concepcion, Ciudad de Guatemala, Guatemala/);
  const physicalRouteCall=[...calls].reverse().find(call=>call.url.includes("routes.googleapis.com"));
  const physicalRoutePayload=JSON.parse(physicalRouteCall.options.body);
  assert.equal(physicalRoutePayload.destination.address,"Pradera Concepcion, Ciudad de Guatemala, Guatemala");
  assert.equal(physicalRoutePayload.origin.address,"Golf El Pulte");

  const mexicoGpsReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:gpsOnlyTrafficPhrase,history:[],appContext:{mode:"general",trafficOrigin:{latitude:19.4326,longitude:-99.1332}}}};
  const mexicoGpsRes=responseRecorder();
  globalThis.fetch=async(url,options)=>{
    calls.push({url:String(url),options});
    if(String(url).includes("maps.googleapis.com"))return{ok:true,json:async()=>({results:[{address_components:[
      {long_name:"Ciudad de México",types:["locality"]},
      {long_name:"Ciudad de México",types:["administrative_area_level_1"]},
      {long_name:"México",types:["country"]}
    ]}]})};
    if(String(url).includes("routes.googleapis.com"))return{ok:true,json:async()=>({routes:[{duration:"900s",staticDuration:"720s",distanceMeters:8200}]})};
    throw new Error("La ruta GPS de México no debe depender de OpenAI");
  };
  await universalHandler(mexicoGpsReq,mexicoGpsRes);
  assert.equal(mexicoGpsRes.statusCode,200);
  assert.match(mexicoGpsRes.body.answer,/Ubicación GPS actual/);
  assert.match(mexicoGpsRes.body.answer,/Polanco, Ciudad de México, México/);

  const locationReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿Cuánto tráfico hay de aquí a Pradera Concepción, Guatemala?",history:[]}};
  const locationRes=responseRecorder();
  await universalHandler(locationReq,locationRes);
  assert.equal(locationRes.statusCode,428);
  assert.equal(locationRes.body.needsCurrentLocation,true);

  const ambiguousReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{query:"¿Cuánto tráfico hay de El Pulté a Concepción?",history:[]}};
  const ambiguousRes=responseRecorder();
  await universalHandler(ambiguousReq,ambiguousRes);
  assert.equal(ambiguousRes.statusCode,200);
  assert.equal(ambiguousRes.body.needsDestinationClarification,true);

  globalThis.fetch=async()=>({ok:true,json:async()=>({routes:[{duration:"1200s",staticDuration:"1080s",distanceMeters:11000}]})});
  const trafficReq={method:"POST",headers:{host:"epg-caddy.vercel.app"},body:{originCoordinates:{latitude:14.6,longitude:-90.5},destination:"Pradera Concepción, Guatemala"}};
  const trafficRes=responseRecorder();
  await trafficHandler(trafficReq,trafficRes);
  assert.equal(trafficRes.statusCode,200);
  assert.equal(trafficRes.body.ok,true);
  assert.equal(trafficRes.body.durationMinutes,20);
}finally{
  globalThis.fetch=originalFetch;
  if(previousOpenAiKey===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=previousOpenAiKey;
  if(previousGoogleKey===undefined)delete process.env.GOOGLE_MAPS_ROUTES_API_KEY;else process.env.GOOGLE_MAPS_ROUTES_API_KEY=previousGoogleKey;
  if(previousGeocodingKey===undefined)delete process.env.GOOGLE_MAPS_GEOCODING_API_KEY;else process.env.GOOGLE_MAPS_GEOCODING_API_KEY=previousGeocodingKey;
}

console.log("PASS V324 · tráfico real actual/futuro, ETA, demora, privacidad y voz/texto recuperables");
