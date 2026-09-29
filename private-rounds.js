(function(root){
  "use strict";
  const KEY="golf-score-card-gt-private-round-v1",ACTIVE="golf-score-card-guatemala-active-round-v1";
  const escape=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let round=null,timer=null,dialog=null;
  const read=key=>{try{return JSON.parse(root.localStorage.getItem(key)||"null")}catch{return null}};
  const active=()=>round||read(ACTIVE);
  const request=(action,body)=>root.GSCLiveControl.request(action,body);
  const saved=()=>read(KEY);
  function store(value){root.localStorage.setItem(KEY,JSON.stringify(value))}
  function close(){clearTimeout(timer);timer=null;dialog?.remove();dialog=null}
  function show(title,content){
    close();dialog=root.document.createElement("div");dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");dialog.setAttribute("aria-label",title);
    dialog.style.cssText="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.84);display:grid;place-items:center;padding:18px";
    dialog.innerHTML='<section style="box-sizing:border-box;width:min(520px,100%);max-height:90dvh;overflow:auto;padding:20px;border:1px solid #31ff00;border-radius:18px;background:#050505;color:white;font-family:Arial,sans-serif"><button data-close style="float:right;background:#080808;color:white;border:1px solid #444;border-radius:50%;width:38px;height:38px;font-size:22px" aria-label="Cerrar">×</button><h2 style="color:#31ff00;font-size:22px">'+escape(title)+'</h2>'+content+'<p data-status role="status" aria-live="polite"></p></section>';
    root.document.body.appendChild(dialog);dialog.querySelector('[data-close]').onclick=close;
  }
  const input=(label,id)=>'<label for="'+id+'">'+escape(label)+'</label><input id="'+id+'" maxlength="120" style="box-sizing:border-box;width:100%;height:50px;margin:10px 0;border:1px solid #31ff00;border-radius:11px;background:#030303;color:white;padding:0 12px;font-size:16px">';
  const button=(label,id)=>'<button id="'+id+'" style="width:100%;min-height:50px;margin-top:10px;border:1px solid #31ff00;border-radius:11px;background:#31ff00;color:black;font-size:16px;font-weight:900">'+label+'</button>';
  function status(message){if(dialog)dialog.querySelector('[data-status]').textContent=message}
  function error(code){return({PRIVATE_ROUND_CODE_INVALID:"CÓDIGO INCORRECTO PARA ESTA RONDA",LIVE_ROUND_REQUIRED:"INICIA TU SCORE CARD PARA AGREGAR TU GRUPO",LIVE_TOURNAMENT_MODE_MISMATCH:"TU SCORE CARD USA OTRA MODALIDAD",NETWORK_ERROR:"SIN CONEXIÓN · INTENTA DE NUEVO",LIVE_EXPIRED:"ESTA RONDA YA CADUCÓ",LIVE_RATE_LIMITED:"ESPERA UN MINUTO E INTENTA DE NUEVO"})[code]||"NO SE PUDO COMPLETAR LA ACCIÓN · INTENTA DE NUEVO"}
  async function connect(item,code){const result=await root.GSCLiveControl.connectPrivateRound(item.id,code,active());if(!result.ok){status(error(result.code));return false}store({...item,name:result.name,viewerToken:result.viewerToken,joinCode:code,roundId:active().id});await scores(saved());return true}
  async function create(){
    const name=dialog.querySelector('#privateName').value.trim();if(!name){status("ESCRIBE EL NOMBRE DE LA RONDA");return}
    const ok=dialog.querySelector('#privateCreate');ok.disabled=true;status("CREANDO RONDA PARTICULAR…");
    const result=await request("create_private_round",{name,mode:active()?.mode||"general",durationDays:8,consent:{confirmed:true}});
    if(!result.ok){ok.disabled=false;status(error(result.code));return}
    const item={id:result.privateRoundId,name:result.name,viewerToken:result.viewerToken,joinCode:result.joinCode,creator:true,roundId:active()?.configured?active().id:"",expiresAt:result.expiresAt};store(item);
    if(active()?.configured){const joined=await root.GSCLiveControl.connectPrivateRound(item.id,item.joinCode,active());if(!joined.ok){await scores(item);status(error(joined.code));return}}
    await scores(item);
  }
  async function scores(item){
    show("RONDA PARTICULAR · "+item.name,(item.creator?'<p>CÓDIGO PARA COMPARTIR</p><strong style="color:#31ff00;font-size:24px">'+escape(item.joinCode)+'</strong>'+button("COMPARTIR CÓDIGO","privateShare"):"")+'<style>.private-score-panel{box-shadow:0 20px 70px rgba(0,0,0,.65);background:linear-gradient(145deg,#0d1010,#030404)!important}.private-score-panel h2{margin:0 42px 20px 0;font-size:clamp(18px,4.5vw,22px)!important;line-height:1.3;letter-spacing:.4px}.private-score-table{width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;color:#f4f6f5;font-size:clamp(11px,3vw,14px);font-variant-numeric:tabular-nums}.private-score-table th{height:44px;padding:8px 3px;background:#101513;color:#b7c2bc;font-size:clamp(10px,2.6vw,12px);font-weight:800;letter-spacing:.2px;border-bottom:1px solid #344139;text-align:center}.private-score-table th:first-child{width:26%;text-align:left;padding-left:12px}.private-score-table td{height:54px;padding:8px 3px;text-align:center;font-weight:800;border-bottom:1px solid #242c28;background:#070a08}.private-score-table td:first-child{text-align:left;padding-left:12px;overflow-wrap:anywhere;font-weight:900}.private-score-table td:nth-child(5){color:#31ff00}.private-score-table tr:last-child td{border-bottom:0}.private-score-panel [data-scores]{margin-top:20px;border:1px solid #344139;border-radius:12px;overflow:hidden}.private-score-panel [data-scores]>p{margin:0;padding:20px;color:#aeb8b2;font-size:12px;line-height:1.5}.private-score-panel [data-status]:empty{display:none}</style><div data-scores></div>');
    dialog.querySelector('section').classList.add('private-score-panel');
    if(item.creator)dialog.querySelector('#privateShare').onclick=async()=>{const message="Ronda "+item.name+"\n"+item.joinCode;try{if(root.navigator.share)await root.navigator.share({title:item.name,text:message});else{await root.navigator.clipboard.writeText(message);status("CÓDIGO COPIADO")}}catch(e){if(e.name!=="AbortError")status("CÓDIGO: "+item.joinCode)}};
    const current=dialog;
    async function refresh(){
      if(dialog!==current)return;let result=await request("read_private_round",{kind:"tournament",viewerToken:item.viewerToken,limit:50});
      if(dialog!==current)return;
      if(!result.ok){status(error(result.code));return}
      const streams=[...(result.streams||[])],seen=new Set();let cursor=result.nextCursor;
      while(cursor&&!seen.has(cursor)){seen.add(cursor);const page=await request("read_private_round",{kind:"tournament",viewerToken:item.viewerToken,limit:50,cursor});if(!page.ok){status(error(page.code));return}streams.push(...(page.streams||[]));cursor=page.nextCursor}
      if(dialog!==current)return;
      const rows=streams.flatMap(stream=>(stream.snapshot?.players||[]).map(player=>({player,group:stream.groupLabel||stream.snapshot.groupLabel})));
      current.querySelector('[data-scores]').innerHTML=rows.length?'<table class="private-score-table"><thead><tr><th>NOMBRE</th><th>HDCP</th><th>HOYO</th><th>GROSS</th><th>NETO</th><th>+/−</th></tr></thead><tbody>'+rows.map(({player,group})=>'<tr><td>'+escape(player.name)+'</td><td>'+escape(player.handicap)+'</td><td>'+escape(player.holes?.length?Math.max(...player.holes.map(h=>h.hole)):0)+'</td><td>'+escape(player.totals?.gross??"—")+'</td><td>'+escape(player.totals?.net??"—")+'</td><td>'+escape(player.holes?.length?(player.totals.relativeToPar===0?'EVEN':(player.totals.relativeToPar>0?'+':'')+player.totals.relativeToPar):'—')+'</td></tr>').join("")+'</tbody></table>':'<p>TODAVÍA NO HAY GRUPOS EN ESTA RONDA.</p>';
      status("");timer=root.setTimeout(refresh,10000);
    }
    await refresh();
  }
  function open(value){round=value||read(ACTIVE);const item=saved();if(item&&new Date(item.expiresAt||"2099-01-01")>new Date()&&(!item.roundId||item.roundId===active()?.id))return scores(item);show("RONDA PARTICULAR",input("NOMBRE DE LA RONDA","privateName")+button("CREAR RONDA PARTICULAR","privateCreate"));dialog.querySelector('#privateCreate').onclick=create;dialog.querySelector('#privateName').focus()}
  function openScores(value){round=value||read(ACTIVE);const item=saved();if(item&&new Date(item.expiresAt||"2099-01-01")>new Date()&&(!item.roundId||item.roundId===active()?.id))return scores(item);show("SCORES GRUPO","<p>PRIMERO CREA O ÚNETE A UNA RONDA PARTICULAR.</p>")}
  async function list(){
    round=read(ACTIVE);show("RONDAS PARTICULARES",'<div data-rounds></div>');status("CARGANDO RONDAS…");const current=dialog,result=await request("list_private_rounds",{});if(dialog!==current)return;if(!result.ok){status(error(result.code));return}
    const target=dialog.querySelector('[data-rounds]');target.innerHTML=result.rounds.length?result.rounds.map(item=>button(escape(item.name),"private-"+item.id)).join(""):'<p>NO HAY RONDAS PARTICULARES ACTIVAS.</p>';status("");
    for(const item of result.rounds)target.querySelector('#private-'+item.id).onclick=()=>{show(item.name,input("CÓDIGO DE LA RONDA","privateCode")+button("ENTRAR A LA RONDA","privateJoin"));const field=dialog.querySelector('#privateCode');field.maxLength=10;field.autocomplete="off";dialog.querySelector('#privateJoin').onclick=async()=>{const b=dialog.querySelector('#privateJoin');b.disabled=true;try{await connect(item,field.value.trim().toUpperCase())}finally{if(b.isConnected)b.disabled=false}};field.focus()};
  }
  let connecting=false;
  async function syncPending(value){const item=saved();if(connecting||!item?.creator||item.roundId||!value?.configured)return;connecting=true;try{const result=await root.GSCLiveControl.connectPrivateRound(item.id,item.joinCode,value);if(result.ok)store({...item,roundId:value.id})}finally{connecting=false}}
  root.GSCPrivateRounds={open,openScores,list,close,syncPending};
})(globalThis);
