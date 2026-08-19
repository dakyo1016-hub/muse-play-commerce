"use client";

import {ChangeEvent,useEffect,useMemo,useState} from "react";
import {CommerceNav} from "../commerce-pages";

type Product={id:string;category:"TOP"|"BOTTOM"|"SHOES"|"BAG";name:string;brand:string;image:string};
const PRODUCTS:Product[]=[
 {id:"ivory-top",category:"TOP",name:"Ivory Layered Top",brand:"FORME",image:"/catalog/women-01.jpg"},
 {id:"soft-rib",category:"TOP",name:"Soft Rib Henley Tee",brand:"LAYER",image:"/catalog/street-01.jpg"},
 {id:"rugby",category:"TOP",name:"Washed Oversize Tee",brand:"NORTH INDEX",image:"/catalog/street-03.jpg"},
 {id:"cargo",category:"BOTTOM",name:"Wide Pocket Cargo",brand:"LAYER",image:"/catalog/street-13.jpg"},
 {id:"relaxed-denim",category:"BOTTOM",name:"Relaxed Navy Shorts",brand:"BLUE HOUR",image:"/catalog/street-14.jpg"},
 {id:"work-pants",category:"BOTTOM",name:"Washed Work Pants",brand:"COMMON TYPE",image:"/catalog/street-12.jpg"},
 {id:"cream-platform",category:"SHOES",name:"Cream Platform Sneakers",brand:"FORME",image:"/catalog/accessory-01.jpg"},
 {id:"silver-runner",category:"SHOES",name:"Silver Runner Sneakers",brand:"VETA ACTIVE",image:"/catalog/accessory-02.jpg"},
 {id:"penny-loafer",category:"SHOES",name:"Classic Penny Loafer",brand:"FORME",image:"/catalog/accessory-03.jpg"},
 {id:"baguette",category:"BAG",name:"Soft Baguette Bag",brand:"MARÉE",image:"/catalog/accessory-09.jpg"},
 {id:"nylon-cross",category:"BAG",name:"Nylon Cross Bag",brand:"VETA ACTIVE",image:"/catalog/accessory-11.jpg"},
 {id:"canvas-tote",category:"BAG",name:"Structured Canvas Tote",brand:"COMMON TYPE",image:"/catalog/accessory-12.jpg"},
];
const CATEGORIES=["TOP","BOTTOM","SHOES","BAG"] as const;

async function prepareImage(file:File){
 if(!["image/jpeg","image/png","image/webp"].includes(file.type))throw new Error("JPG, PNG, WEBP 사진만 등록할 수 있어요.");
 if(file.size>8*1024*1024)throw new Error("8MB 이하 사진을 사용해주세요.");
 const bitmap=await createImageBitmap(file);
 const max=1600;
 const ratio=Math.min(1,max/Math.max(bitmap.width,bitmap.height));
 const canvas=document.createElement("canvas");
 canvas.width=Math.round(bitmap.width*ratio);canvas.height=Math.round(bitmap.height*ratio);
 canvas.getContext("2d")?.drawImage(bitmap,0,0,canvas.width,canvas.height);
 bitmap.close();
 return canvas.toDataURL("image/jpeg",.9);
}

export default function TryOnPage(){
 const[selected,setSelected]=useState<string[]>(["ivory-top","cargo","cream-platform","baguette"]);
 const[person,setPerson]=useState("");
 const[result,setResult]=useState("");
 const[consent,setConsent]=useState(false);
 const[busy,setBusy]=useState(false);
 const[message,setMessage]=useState("");
 useEffect(()=>{const ids=new URLSearchParams(window.location.search).get("items")?.split(",").filter(id=>PRODUCTS.some(item=>item.id===id));if(ids?.length)setSelected(ids)},[]);
 const picked=useMemo(()=>selected.map(id=>PRODUCTS.find(item=>item.id===id)).filter(Boolean) as Product[],[selected]);
 const choose=(item:Product)=>setSelected([...selected.filter(id=>PRODUCTS.find(product=>product.id===id)?.category!==item.category),item.id]);
 const upload=async(event:ChangeEvent<HTMLInputElement>)=>{const file=event.target.files?.[0];if(!file)return;setMessage("");setResult("");try{setPerson(await prepareImage(file))}catch(error){setMessage(error instanceof Error?error.message:"사진을 처리하지 못했습니다.")}};
 const generate=async()=>{
  if(!person){setMessage("먼저 얼굴 또는 전신 사진을 등록해주세요.");return}
  if(picked.length!==4){setMessage("TOP · BOTTOM · SHOES · BAG을 하나씩 선택해주세요.");return}
  if(!consent){setMessage("사진 사용 및 성인 확인에 동의해주세요.");return}
  setBusy(true);setMessage("");setResult("");
  try{const response=await fetch("/api/try-on",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({personImage:person,itemIds:selected,consent:true})});const data=await response.json() as {image?:string;error?:string;message?:string};if(!response.ok)throw new Error(data.error==="AI_SETUP_REQUIRED"?"Google Cloud 연결을 마치면 실제 생성이 시작됩니다.":data.error??data.message??"생성에 실패했습니다.");if(data.image)setResult(data.image)}catch(error){setMessage(error instanceof Error?error.message:"생성에 실패했습니다.")}finally{setBusy(false)}
 };
 return <><CommerceNav active="try-on"/><main className="tryon-page"><header className="tryon-hero"><span>AI FITTING ROOM · NANO BANANA 2</span><h1>내 사진으로<br/>완성하는 실제 착장</h1><p>얼굴 또는 전신 사진 한 장과 선택한 상품 4개를 결합해<br/>자연스러운 전신 패션 이미지를 생성합니다.</p><div><b>01 사진 등록</b><b>02 LOOK 확인</b><b>03 AI 생성</b></div></header><section className="tryon-workspace"><div className="tryon-input"><header><span>STEP 01</span><h2>내 사진 등록</h2><p>정면·밝은 조명·몸을 가리지 않은 전신 사진을 권장해요. 얼굴 사진만으로도 생성할 수 있습니다.</p></header><label className={`photo-drop ${person?"ready":""}`}><input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload}/>{person?<img src={person} alt="등록한 사용자 사진"/>:<><strong>+</strong><b>사진 선택하기</b><span>JPG · PNG · WEBP / 최대 8MB</span></>}</label><div className="photo-guide"><span>✓ 본인 또는 사용 허가를 받은 사진</span><span>✓ 만 18세 이상 성인 사진</span><span>✓ 한 명만 선명하게 나온 사진</span></div></div><div className="tryon-look"><header><span>STEP 02</span><h2>선택한 LOOK</h2><p>카테고리마다 한 개씩 선택하면 생성 이미지에 함께 반영됩니다.</p></header>{CATEGORIES.map(category=><div className="tryon-category" key={category}><b>{category}</b><div>{PRODUCTS.filter(item=>item.category===category).map(item=><button key={item.id} className={selected.includes(item.id)?"active":""} onClick={()=>choose(item)}><img src={item.image} alt={item.name}/><span>{item.brand}</span><strong>{item.name}</strong></button>)}</div></div>)}</div><aside className="tryon-result"><header><span>STEP 03</span><h2>AI FIT RESULT</h2><p>얼굴과 체형은 유지하고 선택 상품의 색상·실루엣·소재를 반영합니다.</p></header><div className={`result-stage ${result?"complete":""}`}>{result?<img src={result} alt="AI로 생성된 가상 착장 결과"/>:person?<><img className="waiting-photo" src={person} alt="생성 전 사진"/><span>{busy?"NANO BANANA 2가 착장을 만드는 중…":"READY TO FIT"}</span></>:<><strong>AI</strong><span>사진을 등록하면<br/>이곳에 결과가 표시됩니다.</span></>}</div><div className="selected-strip">{picked.map(item=><img key={item.id} src={item.image} alt={item.name}/>)}</div><label className="tryon-consent"><input type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)}/><span>본인은 만 18세 이상이며 사진 사용 권한이 있습니다. MUSE 서버에는 원본과 결과를 저장하지 않고 Google AI 처리에만 전송하는 것에 동의합니다.</span></label>{message&&<p className="tryon-message">{message}</p>}<button className="generate-tryon" disabled={busy||!person||picked.length!==4} onClick={generate}>{busy?"AI 착장 생성 중…":"AI 착장 생성하기 →"}</button>{result&&<div className="result-actions"><a href={result} download="muse-ai-fitting.png">결과 저장</a><button onClick={()=>{setResult("");setMessage("")}}>다시 만들기</button></div>}<small className="tryon-policy">PIN 인증 사용자 · 생성 횟수 제한 없음 · Google Cloud 잔액 및 모델 쿼터 범위에서 이용됩니다.</small></aside></section></main></>
}
