const ROUTES_ENDPOINT="https://routes.googleapis.com/directions/v2:computeRoutes";
const GEOCODING_ENDPOINT="https://maps.googleapis.com/maps/api/geocode/json";
const ROUTES_TIMEOUT_MS=15_000;
const MAX_PLACE_LENGTH=240;

function cleanPlace(value){
  return String(value||"").replace(/[\u0000-\u001F]/g," ").replace(/\s+/g," ").trim().slice(0,MAX_PLACE_LENGTH);
}

export function trafficPlaceIsQualified(value){
  return /,\s*[^,]+$/.test(cleanPlace(value));
}

export function qualifyTrafficPlace(value,context={}){
  const place=cleanPlace(value);
  if(!place||trafficPlaceIsQualified(place))return place;
  const parts=[context.city,context.region,context.country].map(cleanPlace).filter((part,index,list)=>part&&list.indexOf(part)===index);
  return parts.length?`${place}, ${parts.join(", ")}`:place;
}

function finiteCoordinate(value,min,max){
  const number=Number(value);
  return Number.isFinite(number)&&number>=min&&number<=max?number:null;
}

function cleanCoordinates(value){
  const latitude=finiteCoordinate(value?.latitude,-90,90);
  const longitude=finiteCoordinate(value?.longitude,-180,180);
  return latitude===null||longitude===null?null:{latitude,longitude};
}

function addressComponent(result,type){
  return cleanPlace((result?.address_components||[]).find(component=>component?.types?.includes(type))?.long_name);
}

export async function resolveTrafficLocationContext(coordinates,options={}){
  const point=cleanCoordinates(coordinates);
  const apiKey=String(options.apiKey||process.env.GOOGLE_MAPS_GEOCODING_API_KEY||process.env.GOOGLE_MAPS_API_KEY||"").trim();
  if(!point||!apiKey)return null;
  try{
    const url=new URL(GEOCODING_ENDPOINT);
    url.searchParams.set("latlng",`${point.latitude},${point.longitude}`);
    url.searchParams.set("language","es-419");
    url.searchParams.set("key",apiKey);
    const response=await (options.fetchImpl||fetch)(url,{headers:{Accept:"application/json"}});
    const payload=await response.json().catch(()=>null),result=payload?.results?.[0];
    if(!response.ok||!result)return null;
    const context={
      city:addressComponent(result,"locality")||addressComponent(result,"administrative_area_level_2"),
      region:addressComponent(result,"administrative_area_level_1"),
      country:addressComponent(result,"country")
    };
    return context.city||context.region||context.country?context:null;
  }catch{return null}
}

function deicticOrigin(value){
  return /^(?:aqu[ií]|ac[aá]|mi ubicaci[oó]n|ubicaci[oó]n actual|donde estoy|current location|here)$/i.test(cleanPlace(value));
}

function waypoint(place,coordinates){
  const point=cleanCoordinates(coordinates);
  if(point)return{location:{latLng:point}};
  const address=cleanPlace(place);
  return address&&!deicticOrigin(address)?{address}:null;
}

function durationSeconds(value){
  const match=String(value||"").match(/^([0-9]+(?:\.[0-9]+)?)s$/);
  return match?Math.max(0,Number(match[1])):null;
}

function futureDeparture(value,nowMs=Date.now()){
  const raw=String(value||"").trim();
  if(!raw)return"";
  const timestamp=Date.parse(raw);
  if(!Number.isFinite(timestamp)||timestamp<=nowMs+30_000)return"";
  return new Date(timestamp).toISOString();
}

function roundedMinutes(seconds){return Number.isFinite(seconds)?Math.max(0,Math.round(seconds/60)):null}

export function summarizeTrafficRoute(payload,{originLabel="Ubicación GPS actual",destinationLabel="Destino",departureTime="",calculatedAt=new Date().toISOString()}={}){
  const route=payload?.routes?.[0]||null;
  const duration=durationSeconds(route?.duration),staticDuration=durationSeconds(route?.staticDuration);
  if(!route||duration===null)return{ok:false,error:"TRAFFIC_ROUTE_UNAVAILABLE",needsDestinationClarification:true,message:"No pude identificar una ruta confiable. ¿Cuál es el nombre completo, zona o municipio del destino?"};
  const durationMinutes=roundedMinutes(duration);
  const staticDurationMinutes=staticDuration===null?null:roundedMinutes(staticDuration);
  const delayMinutes=staticDuration===null?null:Math.max(0,roundedMinutes(duration-staticDuration));
  const delayRatio=staticDuration&&duration>staticDuration?duration/staticDuration:1;
  const trafficLevel=delayMinutes===null
    ?"no clasificado"
    :delayMinutes<=2&&delayRatio<=1.1
      ?"fluido"
      :delayMinutes<=7&&delayRatio<=1.3
        ?"moderado"
        :"pesado";
  return{
    ok:true,
    source:"Google Maps Routes",
    trafficModel:"TRAFFIC_AWARE_OPTIMAL",
    origin:cleanPlace(originLabel)||"Origen indicado",
    destination:cleanPlace(destinationLabel)||"Destino indicado",
    calculatedAt,
    departureTime:departureTime||calculatedAt,
    durationMinutes,
    staticDurationMinutes,
    delayMinutes,
    distanceKm:Number.isFinite(Number(route.distanceMeters))?Number((Number(route.distanceMeters)/1000).toFixed(1)):null,
    trafficLevel,
    trafficLevelType:"estimación derivada de la demora confirmada por el proveedor"
  };
}

export async function computeTrafficRoute(request={},options={}){
  const apiKey=String(options.apiKey||process.env.GOOGLE_MAPS_ROUTES_API_KEY||process.env.GOOGLE_MAPS_API_KEY||"").trim();
  if(!apiKey)return{ok:false,error:"TRAFFIC_NOT_CONFIGURED",message:"El servicio de tráfico todavía no tiene una credencial activa. Puedes continuar con otra pregunta."};
  const originCoordinates=cleanCoordinates(request.originCoordinates);
  const originAddress=cleanPlace(request.origin);
  const rawDestination=cleanPlace(request.destination);
  const locationContext=!trafficPlaceIsQualified(rawDestination)&&request.contextCoordinates
    ?await resolveTrafficLocationContext(request.contextCoordinates,{apiKey:options.geocodingApiKey,fetchImpl:options.fetchImpl})
    :null;
  const destinationAddress=qualifyTrafficPlace(rawDestination,locationContext||{});
  const origin=waypoint(originAddress,originCoordinates);
  const destination=waypoint(destinationAddress,request.destinationCoordinates);
  if(!origin)return{ok:false,error:"TRAFFIC_ORIGIN_REQUIRED",needsCurrentLocation:true,message:"Necesito tu ubicación actual o un punto de salida para calcular el tráfico."};
  if(!destination)return{ok:false,error:"TRAFFIC_DESTINATION_REQUIRED",message:"Necesito un destino exacto para calcular el tráfico."};
  const nowMs=Number.isFinite(Number(options.nowMs))?Number(options.nowMs):Date.now();
  const departureTime=futureDeparture(request.departureTime,nowMs);
  const timeoutMs=Number.isFinite(Number(options.timeoutMs))?Math.max(1,Number(options.timeoutMs)):ROUTES_TIMEOUT_MS;
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),timeoutMs);
  try{
    const response=await (options.fetchImpl||fetch)(ROUTES_ENDPOINT,{
      method:"POST",
      signal:controller.signal,
      headers:{
        "Content-Type":"application/json",
        "X-Goog-Api-Key":apiKey,
        "X-Goog-FieldMask":"routes.duration,routes.staticDuration,routes.distanceMeters"
      },
      body:JSON.stringify({
        origin,destination,
        travelMode:"DRIVE",
        routingPreference:"TRAFFIC_AWARE_OPTIMAL",
        computeAlternativeRoutes:false,
        languageCode:cleanPlace(request.languageCode)||"es-419",
        units:"METRIC",
        ...(departureTime?{departureTime}:{})
      })
    });
    const payload=await response.json().catch(()=>null);
    if(!response.ok)return{ok:false,error:"TRAFFIC_UPSTREAM_UNAVAILABLE",message:"No pude consultar tráfico confiable en este momento. Puedes continuar con otra pregunta."};
    return summarizeTrafficRoute(payload,{
      originLabel:originCoordinates?"Ubicación GPS actual":originAddress,
      destinationLabel:destinationAddress||"Destino indicado",
      departureTime,
      calculatedAt:new Date(nowMs).toISOString()
    });
  }catch(error){
    return{ok:false,error:error?.name==="AbortError"?"TRAFFIC_TIMEOUT":"TRAFFIC_UNAVAILABLE",message:"No pude consultar tráfico confiable en este momento. Puedes continuar con otra pregunta."};
  }finally{clearTimeout(timeout)}
}
