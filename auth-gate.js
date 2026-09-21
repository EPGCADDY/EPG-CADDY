(function(){
"use strict";
const $=id=>document.getElementById(id);
const css=`
#gscAuthGate{position:fixed;inset:0;z-index:100000;background:#050505;color:#fff;display:none;align-items:center;justify-content:center;padding:22px;font-family:Arial,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
#gscAuthGate.visible{display:flex}
#gscAuthGate .shell{width:min(430px,100%);border:1px solid #3e4347;border-radius:18px;background:linear-gradient(180deg,#111416 0%,#050505 44%,#000 100%);box-shadow:0 28px 90px rgba(0,0,0,.72);padding:30px 24px 24px}
#gscAuthGate .brand{font-size:11px;letter-spacing:2.8px;color:#aeb4b8;text-align:center;margin-bottom:9px}
#gscAuthGate h1{font-size:28px;line-height:1.05;text-align:center;margin:0 0 8px;font-weight:800}
#gscAuthGate .lead{text-align:center;color:#aeb4b8;font-size:13px;line-height:1.45;margin:0 0 24px}
#gscAuthGate .social{width:100%;height:52px;border-radius:10px;border:1px solid #5a6065;background:#fff;color:#0a0a0a;font-weight:900;font-size:14px;margin:0 0 10px}
#gscAuthGate .social[disabled]{opacity:.45}
#gscAuthGate .divider{display:flex;align-items:center;gap:12px;color:#777;font-size:10px;margin:18px 0}.divider:before,.divider:after{content:"";height:1px;background:#303438;flex:1}
#gscAuthGate input{width:100%;height:50px;margin:0 0 10px;border-radius:9px;border:1px solid #474c50;background:#090a0b;color:#fff;padding:0 14px;font-size:15px;outline:none}
#gscAuthGate input:focus{border-color:#31ff00;box-shadow:0 0 0 1px #31ff00}
#gscAuthGate .primary{width:100%;height:52px;border:0;border-radius:10px;background:#31ff00;color:#000;font-size:15px;font-weight:900;margin-top:2px}
#gscAuthGate .secondary{width:100%;height:46px;border:1px solid #50565a;border-radius:10px;background:#090a0b;color:#fff;font-size:13px;font-weight:800;margin-top:10px}
#gscAuthGate .status{height:auto;min-height:20px;margin:13px 0 0;color:#d7dbde;font-size:11px;text-align:center}
#gscAuthGate .fine{margin:14px 0 0;text-align:center;color:#6f7579;font-size:9px;line-height:1.45}
`;
function style(){if($("gscAuthGateStyle"))return;const s=document.createElement("style");s.id="gscAuthGateStyle";s.textContent=css;document.head.appendChild(s)}
function render(){
  if($("gscAuthGate"))return;
  const el=document.createElement("section");el.id="gscAuthGate";el.setAttribute("aria-hidden","true");
  el.innerHTML=`<div class="shell" role="dialog" aria-modal="true" aria-label="Inicio de sesión">
    <div class="brand">GOLF SCORE CARD GT</div>
    <h1>Bienvenido</h1>
    <p class="lead">Tu Score Card, torneos y tableros personales quedan vinculados a tu cuenta.</p>
    <button class="social" id="gscGoogleAuth" type="button" disabled>CONTINUAR CON GOOGLE · EN CONFIGURACIÓN</button>
    <button class="social" id="gscAppleAuth" type="button" disabled>CONTINUAR CON APPLE · PRÓXIMAMENTE</button>
    <div class="divider">O ENTRA CON TU CORREO</div>
    <input id="gscAuthName" autocomplete="name" placeholder="Nombre · sólo al crear cuenta">
    <input id="gscAuthEmail" type="email" inputmode="email" autocomplete="email" placeholder="Correo">
    <input id="gscAuthPassword" type="password" autocomplete="current-password" placeholder="Contraseña · mínimo 8 caracteres">
    <button class="primary" id="gscAuthSignIn" type="button">INICIAR SESIÓN</button>
    <button class="secondary" id="gscAuthSignUp" type="button">CREAR CUENTA</button>
    <div class="status" id="gscAuthStatus"></div>
    <p class="fine">LAB · La identidad se usa para separar tus Atajos, tableros, torneos y respaldos de los demás usuarios.</p>
  </div>`;
  document.body.appendChild(el);
}
async function request(action,payload){
  try{
    const response=await fetch("/api/account?action="+encodeURIComponent(action),{method:action==="session"?"GET":"POST",credentials:"include",cache:"no-store",headers:action==="session"?{}:{"Content-Type":"application/json"},body:action==="session"?undefined:JSON.stringify(payload||{})});
    const body=await response.json().catch(()=>({}));
    return {...body,ok:response.ok&&body?.ok!==false,status:response.status};
  }catch{return{ok:false,code:"NETWORK_ERROR"}}
}
function message(code){return({EMAIL_INVALID:"CORREO INVÁLIDO",INVALID_EMAIL:"CORREO INVÁLIDO",PASSWORD_INVALID:"USA AL MENOS 8 CARACTERES",INVALID_EMAIL_OR_PASSWORD:"CORREO O CONTRASEÑA INCORRECTOS",USER_ALREADY_EXISTS:"ESA CUENTA YA EXISTE",NETWORK_ERROR:"SIN CONEXIÓN"})[String(code||"").toUpperCase()]||"NO SE PUDO COMPLETAR"}
function show(){const gate=$("gscAuthGate");gate.classList.add("visible");gate.setAttribute("aria-hidden","false");document.documentElement.style.overflow="hidden"}
function hide(){const gate=$("gscAuthGate");gate.classList.remove("visible");gate.setAttribute("aria-hidden","true");document.documentElement.style.removeProperty("overflow")}
async function submit(action){
  const name=$("gscAuthName").value.trim(),email=$("gscAuthEmail").value.trim().toLowerCase(),password=$("gscAuthPassword").value,status=$("gscAuthStatus");
  if(!/^\S+@\S+\.\S+$/.test(email)){status.textContent="CORREO INVÁLIDO";return}
  if(password.length<8){status.textContent="USA AL MENOS 8 CARACTERES";return}
  status.textContent=action==="signup"?"CREANDO CUENTA…":"INICIANDO SESIÓN…";
  const result=await request(action,{name,email,password});
  if(!result.ok){status.textContent=message(result.code);return}
  window.GSC_ACCOUNT_SIGNED_IN=true;window.dispatchEvent(new CustomEvent("gsc-account-ready",{detail:{user:result.user||null}}));status.textContent="LISTO";hide();
}
async function init(){
  if(window.GSC_GUEST_ACCESS)return;
  style();render();
  $("gscAuthSignIn").addEventListener("click",()=>submit("signin"));
  $("gscAuthSignUp").addEventListener("click",()=>submit("signup"));
  const session=await request("session");
  if(session.ok&&session.user?.id){window.GSC_ACCOUNT_SIGNED_IN=true;window.dispatchEvent(new CustomEvent("gsc-account-ready",{detail:{user:session.user}}));hide();return}
  show();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();