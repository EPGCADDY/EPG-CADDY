(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;root.GSCScoresUI=api})(globalThis,function(root){
  'use strict';
  const logo='/assets/official-logos/golf-score-card-gt-horizontal-original.webp';
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function modeLabel(mode){return ({general:"MEDAL PLAY",match_play:"MATCH PLAY",four_ball:"FOUR BALL",stableford:"STABLEFORD",universales:"UNIVERSALES"})[mode]||String(mode||"").toUpperCase()}
  function header(event,course,date,mode){return '<header class="scores-heading"><div class="scores-heading-top"><h2>SCORES</h2><img src="'+logo+'" alt="Golf Score Card Guatemala"></div><div class="scores-event">'+escape(event)+'</div><div class="scores-meta">'+escape([course,modeLabel(mode),date].filter(Boolean).join(' · '))+'</div></header>'}
  function date(value){const calendar=/^\d{4}-\d{2}-\d{2}$/.test(String(value));const d=new Date(calendar?value+'T12:00:00Z':value);return Number.isFinite(d.getTime())?new Intl.DateTimeFormat('es-GT',{timeZone:'America/Guatemala',day:'numeric',month:'long',year:'numeric'}).format(d).toUpperCase():'—'}
  function holeValues(player){const holes=new Map();for(const h of Array.isArray(player?.holes)?player.holes:Object.values(player?.holes||{})){const n=Number(h?.hole);if(Number.isInteger(n)&&n>=1&&n<=18)holes.set(n,h)}return Array.from({length:18},(_,i)=>{const h=holes.get(i+1);if(!h)return '—';if(h.explicitX)return 'X/—';return (Number.isInteger(h.gross)?h.gross:'—')+'/'+(Number.isInteger(h.net)?h.net:'—')})}
  function grid(player){const values=holeValues(player);return [0,9].map(start=>'<table class="scores-nine"><thead><tr><th>HOYO</th>'+values.slice(start,start+9).map((_,i)=>'<th>'+(start+i+1)+'</th>').join('')+'</tr></thead><tbody><tr><th>G/N<small>GROSS<br>NETO</small></th>'+values.slice(start,start+9).map(value=>'<td>'+escape(value)+'</td>').join('')+'</tr></tbody></table>').join('')}
  let modal=null,returnFocus=null;
  function close(){if(!modal)return;modal.remove();modal=null;root.document.removeEventListener('keydown',keys);returnFocus?.focus({preventScroll:true})}
  function keys(event){if(event.key==='Escape'){event.preventDefault();close()}else if(event.key==='Tab'&&modal){event.preventDefault();modal.querySelector('[data-scores-close]').focus()}}
  function detail(player,snapshot,eventName){close();returnFocus=root.document.activeElement;modal=root.document.createElement('div');modal.className='scores-detail-backdrop';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','18 scores de '+player.name);modal.innerHTML='<section class="scores-detail"><button data-scores-close type="button" aria-label="Cerrar detalle de scores">X</button>'+header(eventName||snapshot.tournament||'',snapshot.course,date(snapshot.playedAt),snapshot.mode)+'<h3>'+escape(player.name)+'</h3><p>G/N = GROSS / NETO</p>'+grid(player)+'<p>— = HOYO SIN SCORE</p></section>';root.document.body.appendChild(modal);modal.querySelector('[data-scores-close]').onclick=close;root.document.addEventListener('keydown',keys);modal.querySelector('[data-scores-close]').focus({preventScroll:true})}
  // Keep taps on the persistent table container when a LIVE refresh replaces rows.
  const pendingTaps=new WeakMap();
  const interactive=event=>event.target?.closest?.('button,a,input,select,summary');
  function bindRows(target,rows){
    for(const node of target.querySelectorAll('[data-score-player]')){
      const row=rows[Number(node.dataset.scorePlayer)];if(!row)continue;
      const identity=JSON.stringify([row.eventName||'',row.streamId||row.group?.id||row.snapshot?.id||'',row.player.participantId||row.player.id||row.player.name]);
      const openDetail=()=>{pendingTaps.delete(target);if(!modal)detail(row.player,row.snapshot||{},row.eventName)};
      node.ondblclick=event=>{if(interactive(event)){pendingTaps.delete(target);return}event.preventDefault();openDetail()};
      node.onclick=event=>{
        if(interactive(event)){pendingTaps.delete(target);return}
        const now=Date.now(),last=pendingTaps.get(target);
        if(last?.identity===identity&&now-last.time<=600)openDetail();
        else pendingTaps.set(target,{identity,time:now});
      };
      node.onkeydown=event=>{if(event.target===node&&event.key==='Enter'){event.preventDefault();pendingTaps.delete(target);detail(row.player,row.snapshot||{},row.eventName)}};
    }
  }
  return {header,date,holeValues,grid,detail,close,bindRows};
});
