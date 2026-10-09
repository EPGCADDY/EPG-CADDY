import assert from "node:assert/strict";
import handler,{isOfficialGolfAuthorityUrl} from "./api/golf-rules.js";

function responseRecorder(){
  return{
    statusCode:0,
    body:null,
    headers:{},
    setHeader(name,value){this.headers[name]=value},
    status(code){this.statusCode=code;return this},
    json(value){this.body=value;return this},
    end(){return this}
  };
}

assert.ok(process.env.VERCEL,"Esta puerta real sólo debe ejecutarse dentro de Vercel.");
assert.ok(process.env.OPENAI_API_KEY,"Falta OPENAI_API_KEY en el entorno Preview.");

const req={
  method:"POST",
  headers:{host:process.env.VERCEL_URL||"epg-caddy.vercel.app"},
  body:{
    query:"En stroke play, mi bola quedó empotrada en el rough del área general. ¿Tengo alivio sin penalidad y cómo debo proceder?",
    history:[],
    appContext:{course:"El Pulté",mode:"stroke_play"}
  }
};
const res=responseRecorder();
await handler(req,res);

if(res.statusCode===503&&res.body?.error==="GOLF_RULES_RATE_LIMITED"&&res.body?.retryable===true){
  assert.equal(res.headers["Retry-After"],"60");
  console.log("DEFER V328 LIVE · proveedor reglamentario limitado por 429; contrato, dominios oficiales y aislamiento de score siguen bloqueados por el banco determinista");
  process.exit(0);
}

assert.equal(res.statusCode,200,`El endpoint reglamentario respondió ${res.statusCode}: ${res.body?.error||"sin detalle"}`);
assert.equal(res.body?.ok,true);
assert.equal(res.body?.scoreChanged,false);
assert.equal(res.body?.authority,"USGA / The R&A");
assert.ok(String(res.body?.answer||"").trim().length>=40,"La respuesta real quedó vacía o incompleta.");
assert.ok(Array.isArray(res.body?.sources)&&res.body.sources.length>0,"La respuesta real no incluyó autoridad oficial.");
assert.ok(res.body.sources.every(source=>isOfficialGolfAuthorityUrl(source.url)),"La respuesta real incluyó una fuente no oficial.");

console.log(`PASS V328 LIVE · modelo real, búsqueda web y ${res.body.sources.length} fuente(s) oficial(es); scoreChanged=false`);
