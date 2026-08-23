(function(root,factory){const api=factory();if(typeof module==="object"&&module.exports)module.exports=api;if(root)root.GSCCardFileExport=api})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const encoder=new TextEncoder();
  const textBytes=value=>encoder.encode(String(value));
  const concat=chunks=>{const length=chunks.reduce((sum,chunk)=>sum+chunk.length,0),result=new Uint8Array(length);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length}return result};
  const baseName=item=>String(item?.name||"tarjeta-oficial.html").replace(/\.html$/i,"");
  const dimensions=item=>({width:1600,height:item?.kind==="personal"?1300:Math.max(780,520+Number(item?.html?.match(/<tr>/g)?.length||0)*42)});

  function artifactSvg(item){
    if(!item?.html)throw new Error("ARTIFACT_REQUIRED");
    const style=item.html.match(/<style>([\s\S]*?)<\/style>/i)?.[1]||"",main=item.html.match(/<body><main>([\s\S]*?)<\/main><\/body>/i)?.[1];
    if(!main)throw new Error("ARTIFACT_BODY_REQUIRED");
    const {width,height}=dimensions(item),safeMain=main.replace(/<br>/gi,"<br/>");
    return`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${style}html,body{width:${width}px;min-height:${height}px;background:#000}body{margin:0}main{width:${width-56}px;max-width:none;margin:0;padding:28px;overflow:hidden}</style><main>${safeMain}</main></div></foreignObject></svg>`;
  }

  async function canvasFor(item){
    if(typeof document==="undefined"||typeof Image==="undefined")throw new Error("BROWSER_REQUIRED");
    const svg=artifactSvg(item),source=new Blob([svg],{type:"image/svg+xml;charset=utf-8"}),url=URL.createObjectURL(source),image=new Image();
    try{
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error("IMAGE_RENDER_FAILED"));image.src=url});
      const {width,height}=dimensions(item),canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;const context=canvas.getContext("2d");context.fillStyle="#000";context.fillRect(0,0,width,height);context.drawImage(image,0,0,width,height);return canvas;
    }finally{URL.revokeObjectURL(url)}
  }

  function canvasBlob(canvas,type,quality){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error("CANVAS_EXPORT_FAILED")),type,quality))}
  async function png(item){return canvasBlob(await canvasFor(item),"image/png")}
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
  return{artifactSvg,dimensions,pdfBytes,png,pdf,downloadPng,downloadPdf,downloadPackage,shareImage};
});
