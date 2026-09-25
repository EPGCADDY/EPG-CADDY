(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.GSCCardFileExport=api})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const encoder=new TextEncoder();
  const textBytes=value=>encoder.encode(String(value));
  const concat=chunks=>{const length=chunks.reduce((sum,chunk)=>sum+chunk.length,0),result=new Uint8Array(length);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length}return result};
  const baseName=item=>String(item?.name||"tarjeta-oficial.html").replace(/\.html$/i,"");
  const dimensions=item=>({width:1920,height:1080});
  const layoutDimensions=()=>({width:1920,height:1080});
  const renderDimensions=()=>({width:3840,height:2160});
  const exportDimensions=()=>({width:3840,height:2160});

  function artifactSvg(item){
    if(!item?.html)throw new Error("ARTIFACT_REQUIRED");
    const style=[...item.html.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map(match=>match[1]).join("\n"),main=item.html.match(/<body><main>([\s\S]*?)<\/main><\/body>/i)?.[1];
    if(!main)throw new Error("ARTIFACT_BODY_REQUIRED");
    const {width:pixelWidth,height:pixelHeight}=renderDimensions(),{width,height}=layoutDimensions(),safeMain=main.replace(/<br>/gi,"<br/>").replace(/<img([^>]*?)>/gi,(match,attrs)=>/\/$/.test(attrs.trim())?match:`<img${attrs}/>`);
    return`<svg xmlns="http://www.w3.org/2000/svg" width="${pixelWidth}" height="${pixelHeight}" viewBox="0 0 ${width} ${height}"><foreignObject x="0" y="0" width="${width}" height="${height}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;color:#fff;font-family:Arial,-apple-system,BlinkMacSystemFont,sans-serif;background:#000;overflow:hidden"><style>${style}html,body{width:${width}px!important;height:${height}px!important;min-height:0!important;background:#000!important;margin:0!important;padding:0!important;overflow:hidden!important}main{width:${width}px!important;max-width:none!important;margin:0!important;padding:12px!important;overflow:hidden!important}</style><main>${safeMain}</main></div></foreignObject></svg>`;
  }

  async function inlineImages(html){
    let output=String(html||"");const sources=[...new Set([...output.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(match=>match[1]))];
    for(const src of sources){try{const controller=typeof AbortController==="function"?new AbortController():null,timer=setTimeout(()=>controller?.abort(),8000);let response;try{response=await fetch(src,{cache:"no-store",...(controller?{signal:controller.signal}:{})})}finally{clearTimeout(timer)};if(!response.ok)throw new Error(`IMAGE_FETCH_${response.status}`);const blob=await response.blob(),bytes=new Uint8Array(await blob.arrayBuffer());let binary="";for(let offset=0;offset<bytes.length;offset+=32768)binary+=String.fromCharCode(...bytes.subarray(offset,offset+32768));output=output.split(src).join(`data:${blob.type||"image/png"};base64,${btoa(binary)}`)}catch(error){throw new Error(`IMAGE_INLINE_FAILED:${src}:${error?.message||error}`)}}
    return output
  }

  async function normalizeWebpDataImages(html){
    let output=String(html||"");
    const sources=[...new Set([...output.matchAll(/<img[^>]+src=["'](data:image\/webp;base64,[^"']+)["']/gi)].map(match=>match[1]))];
    for(const src of sources){
      const image=new Image();
      await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("WEBP_LOGO_DECODE_TIMEOUT")),10000);image.onload=()=>{clearTimeout(timer);resolve()};image.onerror=()=>{clearTimeout(timer);reject(new Error("WEBP_LOGO_DECODE_FAILED"))};image.src=src});
      const canvas=document.createElement("canvas");canvas.width=image.naturalWidth||image.width;canvas.height=image.naturalHeight||image.height;
      const ctx=canvas.getContext("2d");if(!ctx)throw new Error("LOGO_CANVAS_CONTEXT_REQUIRED");
      ctx.drawImage(image,0,0);const png=canvas.toDataURL("image/png");output=output.split(src).join(png);
    }
    return output;
  }

  function svgDataUrl(svg){return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}
  async function decodeImage(src,timeout=15000){
    const image=new Image();
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("IMAGE_DECODE_TIMEOUT")),timeout);image.onload=()=>{clearTimeout(timer);resolve()};image.onerror=()=>{clearTimeout(timer);reject(new Error("IMAGE_DECODE_FAILED"))};image.src=src});
    if(typeof image.decode==="function")try{await image.decode()}catch(_){}
    return image;
  }
  function assertRenderedCard(canvas){
    const ctx=canvas.getContext("2d");if(!ctx)throw new Error("CANVAS_CONTEXT_REQUIRED");
    const {width,height}=canvas,regions={
      logo:{x:16,y:16,w:820,h:300,min:1800},
      upper:{x:0,y:0,w:width,h:Math.round(height*.42),min:12000},
      lower:{x:0,y:Math.round(height*.42),w:width,h:Math.round(height*.58),min:12000}
    };
    const visible=({x,y,w,h})=>{const d=ctx.getImageData(x,y,Math.min(w,width-x),Math.min(h,height-y)).data;let count=0;for(let i=0;i<d.length;i+=16){if(d[i+3]>32&&(d[i]>24||d[i+1]>24||d[i+2]>24))count++}return count};
    const counts=Object.fromEntries(Object.entries(regions).map(([key,region])=>[key,visible(region)]));
    if(counts.logo<regions.logo.min)throw new Error("FINAL_PNG_LOGO_NOT_VISIBLE");
    if(counts.upper<regions.upper.min||counts.lower<regions.lower.min)throw new Error("FINAL_PNG_CARD_NOT_FILLED");
    return counts;
  }

  async function renderFullHd(item){
    if(typeof document==="undefined")throw new Error("BROWSER_REQUIRED");
    const html=await normalizeWebpDataImages(await inlineImages(String(item?.html||"")));
    if(/<img[^>]+src=["'](?!data:)/i.test(html))throw new Error("IMAGE_NOT_INLINED");
    if(!/data:image\/png;base64,/i.test(html))throw new Error("OFFICIAL_LOGO_PNG_REQUIRED");
    const {width,height}=renderDimensions();
    const svg=artifactSvg({...item,html}),image=await decodeImage(svgDataUrl(svg));
    const canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext("2d");if(!ctx)throw new Error("CANVAS_CONTEXT_REQUIRED");
    ctx.fillStyle="#000";ctx.fillRect(0,0,width,height);
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
    ctx.drawImage(image,0,0,width,height);
    assertRenderedCard(canvas);
    return canvas;
  }
  async function canvasFor(item){return renderFullHd(item)}

  function trimCanvas(canvas,margin=24){
    const context=canvas.getContext("2d");if(!context)return canvas;
    const {width,height}=canvas,data=context.getImageData(0,0,width,height).data,step=2;
    let minX=width,minY=height,maxX=-1,maxY=-1;
    for(let y=0;y<height;y+=step)for(let x=0;x<width;x+=step){const i=(y*width+x)*4,r=data[i],g=data[i+1],b=data[i+2],a=data[i+3];if(a>16&&(r>10||g>10||b>10)){if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y}}
    if(maxX<0||maxY<0)return canvas;
    minX=Math.max(0,minX-margin);minY=Math.max(0,minY-margin);maxX=Math.min(width-1,maxX+margin);maxY=Math.min(height-1,maxY+margin);
    const cropWidth=Math.max(1,maxX-minX+1),cropHeight=Math.max(1,maxY-minY+1);
    const out=document.createElement("canvas");out.width=width;out.height=Math.max(1,Math.round(width*cropHeight/cropWidth));const outCtx=out.getContext("2d");if(!outCtx)return canvas;
    outCtx.fillStyle="#000";outCtx.fillRect(0,0,out.width,out.height);outCtx.imageSmoothingEnabled=true;outCtx.imageSmoothingQuality="high";outCtx.drawImage(canvas,minX,minY,cropWidth,cropHeight,0,0,out.width,out.height);return out;
  }

  function canvasBlob(canvas,type,quality){return new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("CANVAS_EXPORT_TIMEOUT")),12000);canvas.toBlob(blob=>{clearTimeout(timer);blob?resolve(blob):reject(new Error("CANVAS_EXPORT_FAILED"))},type,quality)})}
  async function png(item){const canvas=await canvasFor(item),cropped=trimCanvas(canvas,8),out=document.createElement("canvas"),exportSize=exportDimensions();out.width=exportSize.width;out.height=exportSize.height;const ctx=out.getContext("2d");if(!ctx)throw new Error("CANVAS_CONTEXT_REQUIRED");ctx.fillStyle="#000";ctx.fillRect(0,0,out.width,out.height);const pad=8,scale=Math.min((out.width-pad*2)/cropped.width,(out.height-pad*2)/cropped.height),w=Math.round(cropped.width*scale),h=Math.round(cropped.height*scale);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.drawImage(cropped,0,0,cropped.width,cropped.height,Math.round((out.width-w)/2),Math.round((out.height-h)/2),w,h);assertRenderedCard(out);return canvasBlob(out,"image/png")}
  async function jpegPage(item){const canvas=await canvasFor(item),blob=await canvasBlob(canvas,"image/jpeg",.94);return{bytes:new Uint8Array(await blob.arrayBuffer()),width:canvas.width,height:canvas.height}}

  function pdfBytes(pages){
    if(!Array.isArray(pages)||!pages.length)throw new Error("PDF_PAGES_REQUIRED");
    const chunks=[],offsets=[0];let position=0;const push=value=>{const bytes=value instanceof Uint8Array?value:textBytes(value);chunks.push(bytes);position+=bytes.length};
    const pageNumbers=pages.map((_,index)=>3+index*3),objectCount=2+pages.length*3;
    push("%PDF-1.4\n%GSCG\n");
    const object=(number,parts)=>{offsets[number]=position;push(`${number} 0 obj\n`);for(const part of parts)push(part);push("\nendobj\n")};
    object(1,["<< /Type /Catalog /Pages 2 0 R >>"]);
    object(2,[`<< /Type /Pages /Count ${pages.length} /Kids [${pageNumbers.map(number=>`${number} 0 R`).join(" ")}] >>`]);
    pages.forEach((page,index)=>{const pageObject=3+index*3,imageObject=pageObject+1,contentObject=pageObject+2,pageWidth=1200,pageHeight=Math.round(pageWidth*page.height/page.width),stream=`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`;
      object(pageObject,[`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>`]);
      object(imageObject,[`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.bytes.length} >>\nstream\n`,page.bytes,"\nendstream"]);
      object(contentObject,[`<< /Length ${textBytes(stream).length} >>\nstream\n${stream}endstream`]);
    });
    const xref=position;push(`xref\n0 ${objectCount+1}\n0000000000 65535 f \n`);for(let number=1;number<=objectCount;number++)push(`${String(offsets[number]).padStart(10,"0")} 00000 n \n`);push(`trailer\n<< /Size ${objectCount+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);return concat(chunks)
  }

  async function pdf(items){const list=Array.isArray(items)?items:[items],pages=[];for(const item of list)pages.push(await jpegPage(item));return new Blob([pdfBytes(pages)],{type:"application/pdf"})}
  function download(blob,name){const url=URL.createObjectURL(blob),anchor=document.createElement("a");anchor.href=url;anchor.download=name;document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),4000)}
  async function downloadPng(item){const blob=await png(item);download(blob,`${baseName(item)}.png`);return blob}
  async function downloadPdf(item){const blob=await pdf(item);download(blob,`${baseName(item)}.pdf`);return blob}
  async function downloadPackage(items,name="tarjetas-oficiales.pdf"){const blob=await pdf(items);download(blob,name);return blob}
  async function shareImage(item,title="Tarjeta oficial"){const blob=await png(item),file=typeof File==="function"?new File([blob],`${baseName(item)}.png`,{type:"image/png"}):null;if(file&&navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title,files:[file]});return{shared:true,blob}}download(blob,`${baseName(item)}.png`);return{shared:false,blob}}
  return{artifactSvg,dimensions,renderDimensions,exportDimensions,pdfBytes,png,pdf,downloadPng,downloadPdf,downloadPackage,shareImage};
});
