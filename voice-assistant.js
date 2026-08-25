(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCVoiceAssistant=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  function normalize(value){
    return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
  }

  const DIRECT=/\b(abrir|abre|muestrame|mostrar|muestra|llevame|llevarme|ir|ve|vete|entrar|quiero jugar|quiero ver|quiero abrir|quiero ir)\b/;
  const HELP=/\b(como hago|como puedo|como se|donde|que debo|que tengo que|que le digo|que puedo decir|ayuda|explica|ensenam|quiero saber)\b/;
  const ASSISTANT_CUE=/\b(abrir|abre|muestrame|mostrar|muestra|llevame|llevarme|ir|ve|vete|entrar|quiero|necesito|como|donde|ayuda|explica|ensenam|que debo|que tengo que|que le digo|que puedo decir)\b/;
  const LIVE_RESULT=/\b(como voy|como vamos|como va|quien va|quien gana|quien esta ganando)\b/;

  const rules=[
    {id:"correct_score",match:/\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b.*\b(score|gross|golpe|aguila|birdie|par|bogey)\b|\b(score|gross|golpe|aguila|birdie|par|bogey)\b.*\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b/,speech:"Abre Control Manual, elige el hoyo, cambia el Gross del jugador y toca Enter. El cálculo se actualiza sin perder los demás scores.",action:"open_manual_entry"},
    {id:"enter_score",match:/\b(anotar|anoto|registrar|registro|poner|ingresar|dictar)\b.*\b(score|gross|golpe|birdie|par|bogey)\b/,speech:"Para anotar, activa el micrófono y di nombre más score, por ejemplo Miguel cinco o Miguel bogey. También puedes escribir el Gross en Control Manual y tocar Enter."},
    {id:"ask_accumulated",match:/\b(como|que)\b.*\b(pregunt|consult|pedir|decir)\w*\b.*\b(acumulado|marcador|resultado)\b|\bque le digo\b.*\b(acumulado|marcador)\b/,speech:"Di acumulado, cómo vamos o marcador actual. La aplicación leerá únicamente los datos ya guardados."},
    {id:"finish_round",match:/\b(finalizar|terminar|cerrar)\b.*\b(ronda|tarjeta)\b|\b(ronda|tarjeta)\b.*\b(finalizar|terminar|cerrar)\b/,speech:"Abre Tarjeta Digital, revisa que no falte ningún score y toca Finalizar ronda. Una ronda incompleta no se cierra.",action:"open_final_card"},
    {id:"stableford",match:/\bstableford\b/,speech:"Abriendo el registro Stableford. Selecciona campo y categoría, registra los nombres y toca OK para iniciar.",action:"open_stableford"},
    {id:"match_play",match:/\bmatch(?: play)?\b/,speech:"Abriendo el registro Match Play. Registra dos o cuatro jugadores y confirma la ronda.",action:"open_match"},
    {id:"four_ball",match:/\bfour ?ball\b/,speech:"Abriendo el registro Four Ball. Registra dos o cuatro jugadores; cada jugador conserva su handicap y sus marcas.",action:"open_four_ball"},
    {id:"practice",match:/\bpractica\b|\bsin perfil\b|\bsin registro\b/,speech:"Abriendo Score Card Práctica. Puedes anotar Gross inmediatamente y completar el perfil sólo si lo necesitas.",action:"open_practice"},
    {id:"new_round",match:/\b(nueva|nuevo|iniciar|comenzar|empezar)\b.*\b(ronda|partida)\b|\bregistro de jugadores\b/,speech:"Abriendo el registro de una nueva ronda. La ronda guardada no se reemplaza hasta que confirmes Iniciar ronda.",action:"open_registration"},
    {id:"history",match:/\b(historial|rondas anteriores|tarjetas guardadas|tarjeta guardada|ronda previa)\b/,speech:"Abriendo el Historial de tarjetas. Elige una ronda para ver, guardar o compartir sus archivos oficiales.",action:"open_history"},
    {id:"statistics",match:/\b(estadisticas|promedio|tendencia|consistencia|records?)\b/,speech:"Abriendo Estadísticas del Historial. Puedes consultar jugador, periodo, campo, torneo, modalidad, vuelta u hoyo.",action:"open_statistics"},
    {id:"final_card",match:/\b(tarjeta digital|tarjeta final|tarjeta global|tarjeta personal)\b/,speech:"Abriendo la Tarjeta Digital. Desde allí puedes revisar, finalizar, generar imagen, PDF o compartir.",action:"open_final_card"},
    {id:"manual_entry",match:/\b(control manual|entrada manual|ingreso manual|teclado)\b/,speech:"Abriendo Control Manual. Elige hoyo, escribe Gross o X y toca Enter antes de cambiar de hoyo.",action:"open_manual_entry"},
    {id:"course_info",match:/\b(informacion del campo|yardas|slope|rating|datos del campo)\b/,speech:"Mostrando la información del campo seleccionado: yardas, Course Rating y Slope Rating disponibles.",action:"open_course_info"},
    {id:"manual",match:/\b(manual de funciones|manual de usuario|abrir manual|ver manual)\b/,speech:"Abriendo el Manual de Funciones. Allí puedes buscar una pregunta completa con la lupa.",action:"open_manual"},
    {id:"backup",match:/\b(registrate|cuenta|respaldo|recuperar respaldo|iniciar sesion)\b/,speech:"Abriendo Respaldo y Recuperación. La cuenta es opcional y no impide jugar localmente.",action:"open_account"},
    {id:"install",match:/\b(instalar|instalacion|acceso directo|pantalla de inicio)\b/,speech:"Abriendo la guía para instalar Golf Score Card GT en la pantalla de inicio.",action:"open_install"},
    {id:"voice_map",match:/\b(que puedo decir|que entiende|vocabulario|funciones de voz)\b/,speech:"Puedes registrar jugadores, anotar y corregir scores, preguntar hoyos y acumulados, abrir modalidades, Historial, Tarjeta Digital, Control Manual o el Manual de Funciones."}
  ];

  function parse(value){
    const text=normalize(value);
    if(!text||LIVE_RESULT.test(text)||!ASSISTANT_CUE.test(text))return{matched:false};
    const direct=DIRECT.test(text),help=HELP.test(text);
    for(const rule of rules){
      if(!rule.match.test(text))continue;
      const execute=!!(rule.action&&direct&&!help);
      return{matched:true,id:rule.id,speech:rule.speech,action:execute?rule.action:null,execute};
    }
    return{matched:true,id:"capabilities",speech:"Puedes decir: quiero jugar Stableford, llévame a Match Play, abre Four Ball, abre Historial, muestra Tarjeta Digital, abre Control Manual o cómo corrijo un score.",action:null,execute:false};
  }

  return Object.freeze({normalize,parse,rules});
});
