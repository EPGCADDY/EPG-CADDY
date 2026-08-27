(function(root,factory){
  const api=factory();
  if(typeof module==="object"&&module.exports)module.exports=api;
  if(root)root.GSCManualSearch=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  const STOP_WORDS=new Set([
    "a","al","algo","como","con","cual","cuando","de","del","donde","el","en","es","esta","este",
    "hacer","la","las","lo","los","me","mi","no","para","por","puedo","que","quiero","se","si","un","una","y"
  ]);

  const INTENTS=[
    {name:"jugar stableford",match:/\bstableford\b/,pages:[4,54,32,61,65],weight:110},
    {name:"jugar match play",match:/\bmatch(?: play)?\b/,pages:[8,67],weight:110},
    {name:"jugar four ball",match:/\bfour ?ball\b|\bpareja(?:s)?\b/,pages:[9,68],weight:110},
    {name:"apuesta Vegas",match:/\bvegas\b|\bvolteo\b/,pages:[36,37,38,39,40,41,42],weight:180},
    {name:"apuesta Wolf",match:/\bwolf\b|\blobo\b/,pages:[43,44,45,46],weight:180},
    {name:"apuesta Skins",match:/\bskins?\b|\barrastre\b/,pages:[47,48],weight:180},
    {name:"otras apuestas",match:/\bnassau\b|\bbingo bango bongo\b|\bsnake\b/,pages:[49],weight:180},
    {name:"clima y tráfico",match:/\bclima\b|\bpronostico\b|\btrafico\b|\beta\b|\bdemora\b/,pages:[50],weight:180},
    {name:"práctica",match:/\bpractica\b|\bsin perfil\b|\bsin registro\b/,pages:[5,55],weight:65},
    {name:"comenzar ronda",match:/\bjugar\b|\bempezar\b|\bcomenzar\b|\biniciar\b|\bnueva ronda\b/,pages:[1,3,17,24],weight:35},
    {name:"elegir campo",match:/\bcampo\b|\bmodalidad\b|\btorneo\b/,pages:[1,3],weight:45},
    {name:"registrar jugadores",match:/\bregistr|\bagregar jugador\b|\bnombre\b.*\bhandicap\b|\bmarcas\b/,pages:[2,17,25,51,52,53],weight:50},
    {name:"score por voz",match:/\bdict|\bhabl|\bmicrofono\b|\bvoz\b/,pages:[18,51,54,55,56,57,69,70,71],weight:35},
    {name:"conversación universal",match:/\bplatic|\bconvers|\bcualquier tema\b|\bcambia(?:r)? de tema\b|\bclima hoy\b|\bpor que tengo frio\b|\bmedicina\b|\bvuelo\b|\baerolinea\b|\bcultura\b|\btodos? los microfonos\b/,pages:[73],weight:170},
    {name:"vocabulario de score",match:/\baguila\b|\bbirdie\b|\bpar\b|\bbogey\b|\bdoble par\b/,pages:[58,56,57],weight:68},
    {name:"corregir un score",match:/\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b.*\b(score|gross|golpe|aguila|birdie|par|bogey)\b|\b(score|gross|golpe|aguila|birdie|par|bogey)\b.*\b(borr|elimin|quit|cambi|corrig|rectific|equivoc)\w*\b/,pages:[7,19,29,70],weight:150},
    {name:"borrar todos los scores",match:/\bborrar\b.*\b(todo|todos|scores|ronda)\b|\breiniciar\b.*\bscores\b/,pages:[24],weight:75},
    {name:"score ausente",match:/\bequis\b|\bsin score\b|\bsin resultado\b|\bmarcar x\b|\bfalta score\b/,pages:[19,59],weight:70},
    {name:"control manual",match:/\bmanual\b|\benter\b|\bteclado\b|\bescribir\b/,pages:[7,19,70],weight:65},
    {name:"hoyo no avanza",match:/\bno avanza\b|\bno pasa\b.*\bhoyo\b|\batascad\w*\b.*\bhoyo\b/,pages:[19,70],weight:85},
    {name:"preguntar un hoyo",match:/\b(cuanto|score|resultado)\b.*\bhoyo\b|\brepite\b.*\bhoyo\b/,pages:[60,21,70],weight:75},
    {name:"acumulado",match:/\bacumulad\w*\b|\bmarcador\b|\bcomo (voy|vamos|va)\b|\btotal actual\b|\bresultado actual\b/,pages:[61,21,62,72],weight:150},
    {name:"primera o segunda vuelta",match:/\bprimera vuelta\b|\bsegunda vuelta\b|\bida\b|\bregreso\b|\bhasta el hoyo\b/,pages:[62,20,21],weight:75},
    {name:"líder o posiciones",match:/\bganando\b|\blider\b|\bprimero\b|\bposicion\w*\b|\bcompara\w*\b|\bdiferencia\b/,pages:[63,21],weight:80},
    {name:"birdies y estadísticas de ronda",match:/\bcuantos\b.*\b(birdie|par|bogey|aguila)\w*\b|\bmejor hoyo\b|\bpeor hoyo\b/,pages:[64,21],weight:80},
    {name:"datos pendientes",match:/\bpendiente\w*\b|\bfalta\w*\b|\bomitid\w*\b/,pages:[64,59,70],weight:65},
    {name:"tiros de handicap",match:/\b(recib|tiro|golpe)\w*\b.*\bhandicap\b|\bhandicap\b.*\bhoyo\b/,pages:[64,20,53],weight:75},
    {name:"tarjeta digital",match:/\btarjeta\b.*\b(digital|global|personal|final)\b/,pages:[26,27,28],weight:70},
    {name:"finalizar ronda",match:/\bfinaliz|\bcerrar ronda\b|\bno (me )?deja\b.*\b(finalizar|cerrar)\b/,pages:[27],weight:150},
    {name:"corrección oficial",match:/\bcorreccion oficial\b|\bronda cerrada\b|\babrir original\b|\bversion corregida\b/,pages:[29],weight:85},
    {name:"descargar y compartir",match:/\bpdf\b|\bimagen\b|\bdescarg\w*\b|\bwhatsapp\b|\bcorreo\b|\bcompart\w*\b/,pages:[28,26],weight:70},
    {name:"historial",match:/\bhistorial\b|\bronda anterior\b|\bronda previa\b|\btarjeta guardada\b/,pages:[30,23,65,66],weight:65},
    {name:"estadísticas históricas",match:/\bpromedio\b|\btendencia\b|\bconsistencia\b|\brecord\b|\bestadistica\w*\b|\bmejor y peor\b/,pages:[31,65,66],weight:75},
    {name:"respaldo",match:/\bcuenta\b|\bregistrate\b|\brespald\w*\b|\brecuperar respaldo\b|\biniciar sesion\b/,pages:[33],weight:70},
    {name:"instalar o actualizar",match:/\binstal\w*\b|\bacceso directo\b|\bpantalla de inicio\b|\bactualiz\w*\b|\bsin conexion\b|\boffline\b/,pages:[34],weight:70},
    {name:"información de campos",match:/\byard\w*\b|\bslope\b|\brating\b|\binformacion del campo\b|\bscorecard del campo\b/,pages:[10,11,12,13,14,15,16],weight:60},
    {name:"mapa de voz",match:/\bque puedo decir(?:le)?\b|\bque entiende\b|\bvocabulario\b|\bfunciones de voz\b|\bmapa\b/,pages:[71,72,51,56,60],weight:80},
    {name:"error de voz",match:/\berror\b|\bno entiende\b|\bno reconoce\b|\bno responde\b|\bse trabo\b|\bse traba\b/,pages:[70],weight:75}
  ];

  function normalize(value){
    return String(value||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9ñ]+/g," ").replace(/\s+/g," ").trim();
  }

  function tokens(value){
    return normalize(value).split(" ").filter(token=>token.length>1&&!STOP_WORDS.has(token));
  }

  function search(query,entries,{limit=8}={}){
    const text=normalize(query),wanted=tokens(text);
    if(!text)return[];
    const intentScores=new Map();
    for(const intent of INTENTS){
      if(!intent.match.test(text))continue;
      intent.pages.forEach((page,index)=>intentScores.set(String(page).padStart(2,"0"),(intentScores.get(String(page).padStart(2,"0"))||0)+intent.weight-index*3));
    }
    return (entries||[]).map(entry=>{
      const number=String(entry.number).padStart(2,"0"),haystack=normalize([entry.title,entry.label,entry.searchText,entry.category].join(" "));
      let score=intentScores.get(number)||0,matched=[];
      if(haystack.includes(text)){score+=90;matched.push("frase exacta")}
      for(const token of wanted){
        if(haystack.includes(token)){score+=token.length>=7?14:9;matched.push(token)}
      }
      if(normalize(entry.title).split(" ").some(token=>wanted.includes(token)))score+=18;
      return{...entry,number,score,matched:[...new Set(matched)]};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||Number(a.number)-Number(b.number)).slice(0,limit);
  }

  return Object.freeze({INTENTS,normalize,tokens,search});
});
