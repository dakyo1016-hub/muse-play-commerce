"use client";

import {useState} from "react";

type Screen="home"|"build"|"battle"|"this"|"guess"|"shop"|"dna";
type Category="ALL"|"OUTER"|"TOP"|"BOTTOM"|"DRESS"|"SHOES"|"BAG"|"ACC";
type Product={id:string;category:Exclude<Category,"ALL">;brand:string;name:string;price:number;sale?:number;likes:string;color:string;image:string;stock:boolean};

const PRODUCTS:Product[]=[
 {id:"cardigan",category:"OUTER",brand:"SÉRIE",name:"Soft Lilac Cardigan",price:49000,likes:"2.1K",color:"LILAC",image:"/catalog/street-21.jpg",stock:true},
 {id:"jacket",category:"OUTER",brand:"ATELIER NINE",name:"Linen Crop Jacket",price:79000,likes:"1.4K",color:"IVORY",image:"/catalog/street-25.jpg",stock:true},
 {id:"windbreaker",category:"OUTER",brand:"VETA ACTIVE",name:"Light Nylon Windbreaker",price:69000,sale:59000,likes:"3.8K",color:"SAGE",image:"/catalog/street-24.jpg",stock:true},
 {id:"top",category:"TOP",brand:"FORME",name:"Ivory Layered Top",price:39000,likes:"1.9K",color:"IVORY",image:"/catalog/women-01.jpg",stock:true},
 {id:"red-knit",category:"TOP",brand:"ROUGE INDEX",name:"Red Rib Knit",price:45000,likes:"2.9K",color:"RED",image:"/catalog/women-05.jpg",stock:true},
 {id:"henley",category:"TOP",brand:"LAYER",name:"Soft Rib Henley Tee",price:42000,likes:"2.6K",color:"CHARCOAL",image:"/catalog/street-01.jpg",stock:true},
 {id:"shirt",category:"TOP",brand:"SÉRIE",name:"Sheer Pocket Shirt",price:52000,likes:"1.7K",color:"MINT",image:"/catalog/women-10.jpg",stock:true},
 {id:"denim",category:"BOTTOM",brand:"BLUE HOUR",name:"Indigo Bootcut Denim",price:59000,likes:"4.2K",color:"INDIGO",image:"/catalog/street-16.jpg",stock:true},
 {id:"skirt",category:"BOTTOM",brand:"MOMENT EDITION",name:"Soft Pleats Skirt",price:69000,likes:"3.1K",color:"BURGUNDY",image:"/catalog/women-12.jpg",stock:true},
 {id:"cargo",category:"BOTTOM",brand:"LAYER",name:"Wide Pocket Cargo",price:49000,likes:"2.8K",color:"KHAKI",image:"/catalog/street-13.jpg",stock:true},
 {id:"dress",category:"DRESS",brand:"ATELIER NINE",name:"Bias Slip Dress",price:99000,likes:"5.4K",color:"ROSE",image:"/catalog/women-16.jpg",stock:true},
 {id:"mini-dress",category:"DRESS",brand:"MELLOW ROOM",name:"Square Neck Mini Dress",price:79000,likes:"2.2K",color:"CREAM",image:"/catalog/women-17.jpg",stock:true},
 {id:"sneakers",category:"SHOES",brand:"GROUND",name:"Cream Platform Sneakers",price:49000,likes:"6.1K",color:"CREAM",image:"/catalog/accessory-01.jpg",stock:true},
 {id:"loafer",category:"SHOES",brand:"FORME",name:"Classic Penny Loafer",price:64000,likes:"1.8K",color:"BLACK",image:"/catalog/accessory-03.jpg",stock:true},
 {id:"rain-boots",category:"SHOES",brand:"VETA",name:"Rainy Day Boots",price:58000,likes:"3.2K",color:"OLIVE",image:"/catalog/accessory-04.jpg",stock:true},
 {id:"bag",category:"BAG",brand:"MARÉE",name:"Soft Baguette Bag",price:39000,likes:"4.7K",color:"BROWN",image:"/catalog/accessory-09.jpg",stock:true},
 {id:"mini-bag",category:"BAG",brand:"SÉRIE",name:"Mint Mini Boston Bag",price:45000,likes:"1.3K",color:"MINT",image:"/catalog/accessory-10.jpg",stock:true},
 {id:"necklace",category:"ACC",brand:"INDEX",name:"Curve Chain Necklace",price:29000,likes:"2.5K",color:"SILVER",image:"/catalog/accessory-15.jpg",stock:true},
 {id:"red-scarf",category:"ACC",brand:"ROUGE INDEX",name:"Signal Red Scarf",price:24000,likes:"1.8K",color:"RED",image:"/catalog/accessory-16.jpg",stock:true},
];

const CATEGORIES:Category[]=["ALL","TOP","BOTTOM","OUTER","DRESS","SHOES","BAG","ACC"];
const byIds=(ids:string[])=>ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean) as Product[];
const total=(items:Product[])=>items.reduce((sum,item)=>sum+(item.sale??item.price),0);
const won=(value:number)=>`₩${value.toLocaleString("ko-KR")}`;

function AutoLook({items,blind=false,label="MUSE EDIT"}:{items:Product[];blind?:boolean;label?:string}){
 return <div className={`auto-look ${blind?"blind":""}`}>
   <div className="look-stamp"><b>{label}</b><span>AUTO STYLED · PRODUCT DATA</span></div>
   <div className="look-collage">
    {items.map((item,index)=><figure className={`look-item slot-${item.category.toLowerCase()} n-${index}`} key={item.id}>
      <img src={item.image} alt={`${item.name} 상품 이미지`}/>{!blind&&<figcaption><b>{item.category}</b><span>{item.brand}</span></figcaption>}
    </figure>)}
    {!items.length&&<div className="empty-look"><b>YOUR LOOK</b><span>상품을 선택하면 자동으로<br/>에디토리얼 보드가 완성됩니다.</span></div>}
   </div>
   <p>CREATE WITH PRODUCTS · VOTE FOR THE STYLE</p>
 </div>
}

function Header({screen,setScreen}:{screen:Screen;setScreen:(s:Screen)=>void}){
 const nav:[Screen,string][]=[["home","PLAY HOME"],["build","BUILD A LOOK"],["battle","BATTLE"],["this","THIS OR THAT"],["guess","GUESS"],["shop","SHOP"]];
 return <header className="site-header"><button className="wordmark" onClick={()=>setScreen("home")}><b>MUSE</b><span>SHOPPING AS A GAME</span></button><nav aria-label="주요 메뉴">{nav.map(([id,label])=><button key={id} className={screen===id?"active":""} onClick={()=>setScreen(id)}>{label}</button>)}</nav><button className="dna-link" onClick={()=>setScreen("dna")}>MY STYLE DNA ↗</button></header>
}

function SectionHead({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <header className="section-head"><div><span>{eyebrow}</span><h1>{title}</h1></div>{copy&&<p>{copy}</p>}</header>}
function Check({ok,children}:{ok:boolean;children:React.ReactNode}){return <p className={ok?"check ok":"check"}><b>{ok?"✓":"○"}</b>{children}</p>}

export default function Muse(){
 const[screen,setScreen]=useState<Screen>("home");
 const[category,setCategory]=useState<Category>("ALL");
 const[selectedIds,setSelectedIds]=useState<string[]>(["top","denim","sneakers"]);
 const[submitted,setSubmitted]=useState(false);
 const[battlePick,setBattlePick]=useState<"A"|"B"|null>(null);
 const[thisStep,setThisStep]=useState(0);
 const[thisIds,setThisIds]=useState<string[]>(["top","denim"]);
 const[guess,setGuess]=useState<number|null>(null);
 const[alternative,setAlternative]=useState(false);
 const[bagIds,setBagIds]=useState<string[]>(["jacket","shirt","skirt","loafer"]);
 const[toast,setToast]=useState("");
 const go=(next:Screen)=>{setScreen(next);setSubmitted(false);window.scrollTo({top:0,behavior:"smooth"})};
 const notify=(message:string)=>{setToast(message);window.setTimeout(()=>setToast(""),1800)};
 return <main><Header screen={screen} setScreen={go}/>
   {screen==="home"&&<Home go={go}/>} 
   {screen==="build"&&<Build category={category} setCategory={setCategory} selectedIds={selectedIds} setSelectedIds={setSelectedIds} submitted={submitted} setSubmitted={setSubmitted} go={go}/>} 
   {screen==="battle"&&<Battle pick={battlePick} setPick={setBattlePick} go={go}/>} 
   {screen==="this"&&<ThisOrThat step={thisStep} setStep={setThisStep} ids={thisIds} setIds={setThisIds} go={go} notify={notify}/>} 
   {screen==="guess"&&<Guess answer={guess} setAnswer={setGuess} go={go}/>} 
   {screen==="shop"&&<Shop alternative={alternative} setAlternative={setAlternative} bagIds={bagIds} setBagIds={setBagIds} notify={notify}/>} 
   {screen==="dna"&&<StyleDNA go={go}/>} 
   {toast&&<div className="toast" role="status">{toast}</div>}
 </main>
}

function Home({go}:{go:(s:Screen)=>void}){
 const modes:[Screen,string,string,string][]=[
  ["build","01","BUILD A LOOK","예산 안에서 실제 상품으로 코디 완성"],["battle","02","STYLE BATTLE","정보를 가리고 오직 LOOK만 선택"],["this","03","THIS OR THAT","빠른 선택으로 나만의 룩 완성"],["guess","04","GUESS THE LOOK","완성된 코디의 총 가격 맞히기"],["build","05","DAILY MISSION","매일 달라지는 현실적인 쇼핑 미션"],["build","06","BRAND CHALLENGE","등록 상품만으로 참여하는 특별 미션"]
 ];
 return <div className="page home-page">
  <section className="home-hero"><div className="hero-copy"><span className="eyebrow">MUSE PLAY · PLAY COMMERCE SYSTEM</span><h1>MUSE PLAY</h1><h2>SHOPPING<br/>AS A GAME.</h2><p className="hero-question">What if shopping felt like playing?</p><p>실제 판매 상품으로 플레이하고,<br/>취향을 발견하고, 마음에 들면 바로 쇼핑하세요.</p><button className="btn lime" onClick={()=>go("build")}>START PLAYING →</button></div><div className="hero-board"><AutoLook items={byIds(["cardigan","top","denim","sneakers","bag"])} blind/><div className="hero-rule"><b>PRODUCT DATA IN</b><span>PLAY · TASTE · DISCOVERY · PURCHASE</span></div></div></section>
  <section className="principles"><div><span>01</span><b>CREATE WITH PRODUCTS.</b><p>실제 판매 상품으로 플레이한다.</p></div><div><span>02</span><b>VOTE FOR THE STYLE.</b><p>사람이 아니라 스타일을 선택한다.</p></div><div><span>03</span><b>SHOP THE LOOK.</b><p>게임에서 발견한 룩을 구매한다.</p></div></section>
  <section className="mission-feature"><div className="mascot"><img src="/characters/miyu-starter/front.png" alt="미션 가이드 미유"/><span>MISSION GUIDE · MIYU</span></div><div><span className="eyebrow">MIYU&apos;S DAILY MISSION</span><h2>금요일 7PM,<br/>갑자기 잡힌 첫 소개팅</h2><blockquote>“20만원 안으로 편안하지만 기억에 남는<br/>성수 데이트 룩을 만들어줄래?”</blockquote><div className="chips"><span>SEOUL · SEONGSU</span><span>29°C</span><span>ONE RED ITEM</span></div><button className="btn purple" onClick={()=>go("build")}>ACCEPT MISSION →</button></div><aside><small>BUDGET</small><b>₩200,000</b><hr/><small>REQUIRED</small><p>TOP　BOTTOM　SHOES</p></aside></section>
  <section className="play-modes"><SectionHead eyebrow="CHOOSE YOUR GAME" title="PLAY MODE" copy="같은 상품 DB도 게임 규칙이 바뀌면 새로운 쇼핑 경험이 됩니다."/><div className="mode-grid">{modes.map(([target,num,title,copy])=><button key={num} onClick={()=>go(target)}><span>{num}</span><b>{title}</b><p>{copy}</p><i>PLAY →</i></button>)}</div></section>
  <section className="daily"><div><span className="eyebrow">TODAY ON MUSE</span><h2>REAL LIFE,<br/>NEW RULES.</h2><p>상황과 제약이 매일 달라집니다.</p></div>{[["BUDGET MODE","15만원으로 풀코디","UNDER ₩150K"],["WEATHER MODE","비 오는 월요일 첫 출근","NO SUEDE"],["OCCASION MODE","친구 결혼식, 과하지 않게","BUDGET ₩300K"],["TREND MODE","31°C 야외 페스티벌","COMFORT REQUIRED"]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><b>{x[2]}</b></article>)}</section>
  <section className="brand-challenge"><div><span>BRAND CHALLENGE · THIS WEEK</span><h2>SÉRIE STYLE WEEK</h2><p>NEW SUMMER COLLECTION</p></div><div><p>SÉRIE 신상품을 하나 이상 사용해<br/><b>15만원 이하 여름 데이트 LOOK</b>을 완성하세요.</p><small>REWARD · 완성 LOOK 상품 증정</small></div><button className="btn lime" onClick={()=>go("build")}>JOIN CHALLENGE →</button></section>
  <section className="data-strip"><b>NO EXTRA 3D ASSETS.</b><p>PRODUCT IMAGE · NAME · BRAND · CATEGORY · COLOR · PRICE · URL · STOCK</p><span>기존 커머스 데이터만으로 바로 PLAY</span></section>
 </div>
}

function Build({category,setCategory,selectedIds,setSelectedIds,submitted,setSubmitted,go}:{category:Category;setCategory:(c:Category)=>void;selectedIds:string[];setSelectedIds:(v:string[])=>void;submitted:boolean;setSubmitted:(v:boolean)=>void;go:(s:Screen)=>void}){
 const selected=byIds(selectedIds),amount=total(selected),budget=200000,left=budget-amount,cats=new Set(selected.map(x=>x.category));
 const required=cats.has("TOP")&&cats.has("BOTTOM")&&cats.has("SHOES"),red=selected.some(x=>x.color==="RED"),brands=new Set(selected.map(x=>x.brand)).size===selected.length,ready=amount>0&&left>=0&&required&&red&&brands;
 const visible=category==="ALL"?PRODUCTS:PRODUCTS.filter(x=>x.category===category);
 const toggle=(item:Product)=>{if(selectedIds.includes(item.id)){setSelectedIds(selectedIds.filter(id=>id!==item.id));return}const replace=item.category==="ACC"?selectedIds:selectedIds.filter(id=>PRODUCTS.find(p=>p.id===id)?.category!==item.category);setSelectedIds([...replace,item.id])};
 if(submitted)return <div className="page"><SectionHead eyebrow="LOOK COMPLETE" title="MIYU ♥ YOUR LOOK" copy="객관적인 미션 조건을 모두 통과했습니다. 이제 스타일은 커뮤니티가 결정합니다."/><div className="complete-layout"><AutoLook items={selected} label="LOOK #1842"/><aside><span className="eyebrow">READY TO ENTER</span><h2>FRIDAY<br/>SEONGSU DATE</h2><div className="result-total"><span>{selected.length} ITEMS</span><b>{won(amount)}</b></div><ProductLines items={selected}/><button className="btn purple" onClick={()=>go("battle")}>ENTER BLIND BATTLE →</button><button className="text-btn" onClick={()=>setSubmitted(false)}>← EDIT LOOK</button></aside></div></div>;
 return <div className="page"><SectionHead eyebrow="CORE GAME 01 · BUILD A LOOK" title="TODAY'S MISSION" copy="상품만 선택하세요. MUSE가 자동으로 에디토리얼 Flat Lay를 구성합니다."/>
  <section className="mission-bar"><div><small>FRIDAY · 7PM</small><b>갑자기 잡힌 첫 소개팅</b><span>SEOUL · SEONGSU · 29°C</span></div><div><small>BUDGET</small><b>₩200,000</b></div><div><small>CONSTRAINT</small><b>ONE RED ITEM</b><span>빨간색 상품을 하나 이상 사용</span></div></section>
  <div className="category-tabs">{CATEGORIES.map(c=><button className={category===c?"active":""} onClick={()=>setCategory(c)} key={c}>{c}<span>{c==="ALL"?PRODUCTS.length:PRODUCTS.filter(x=>x.category===c).length}</span></button>)}</div>
  <div className="builder"><section className="product-panel"><div className="panel-title"><b>DISCOVER PRODUCTS</b><span>{visible.length} PRODUCTS · LIVE DATA</span></div><div className="product-grid">{visible.map(item=><article className={selectedIds.includes(item.id)?"selected":""} key={item.id}><div className="product-image"><img src={item.image} alt={item.name}/><button aria-label={`${item.name} 좋아요`}>♡ {item.likes}</button></div><small>{item.brand}</small><h3>{item.name}</h3><p>{won(item.sale??item.price)} {item.sale&&<del>{won(item.price)}</del>}</p><div><span>{item.color} · {item.stock?"IN STOCK":"SOLD OUT"}</span><button onClick={()=>toggle(item)}>{selectedIds.includes(item.id)?"REMOVE":"ADD +"}</button></div></article>)}</div></section>
   <section className="live-look"><div className="panel-title"><b>AUTO FLAT LAY</b><span>UPDATES WITH EVERY CHOICE</span></div><AutoLook items={selected}/><div className="budget"><div><span>BUDGET</span><b>{won(amount)} <small>/ {won(budget)}</small></b></div><div className="gauge"><i style={{width:`${Math.min(100,amount/budget*100)}%`}}/></div><strong className={left<0?"over":""}>{left>=0?`${won(left)} LEFT`:`BUDGET OVER · ${won(Math.abs(left))}`}</strong></div></section>
   <aside className="challenge-check"><span className="eyebrow">CHALLENGE CHECK</span><h2>{ready?"READY TO ENTER":"COMPLETE THE RULES"}</h2><Check ok={left>=0}>Budget under ₩200,000</Check><Check ok={required}>TOP + BOTTOM + SHOES</Check><Check ok={red}>One red item</Check><Check ok={brands}>No same brand</Check><ProductLines items={selected}/>{left<0&&<button className="text-btn" onClick={()=>setCategory("ALL")}>FIND ANOTHER ITEM →</button>}<button className="btn purple" disabled={!ready} onClick={()=>setSubmitted(true)}>SUBMIT LOOK →</button><button className="text-btn" onClick={()=>setSelectedIds([])}>RESET LOOK</button></aside>
  </div></div>
}

function ProductLines({items}:{items:Product[]}){return <div className="product-lines">{items.map(item=><div key={item.id}><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></div>)}</div>}

function Battle({pick,setPick,go}:{pick:"A"|"B"|null;setPick:(v:"A"|"B"|null)=>void;go:(s:Screen)=>void}){
 const a=byIds(["cardigan","top","denim","sneakers"]),b=byIds(["shirt","cargo","loafer","red-scarf"]);
 if(pick)return <div className="page"><SectionHead eyebrow="VOTE REVEAL" title={`YOU PICKED LOOK ${pick}`} copy="스타일을 먼저 선택한 뒤에야 가격과 상품 정보가 공개됩니다."/><div className="reveal"><section><AutoLook items={pick==="A"?a:b} label={`LOOK ${pick} · ${pick==="B"?"61%":"39%"}`}/></section><aside><span className="eyebrow">{pick==="B"?"61%":"39%"} CHOSE THE SAME LOOK</span><h2>LOOK {pick} · {won(total(pick==="A"?a:b))}</h2><ProductLines items={pick==="A"?a:b}/><button className="btn purple" onClick={()=>go("shop")}>SHOP THIS LOOK →</button><button className="text-btn" onClick={()=>setPick(null)}>VOTE AGAIN</button></aside></div></div>;
 return <div className="page battle-page"><SectionHead eyebrow="CORE GAME 02 · BLIND STYLE BATTLE" title="WHICH WOULD YOU WEAR?" copy="FRIDAY SEONGSU DATE · Vote for the style, not the person."/><div className="hidden-rule"><b>HIDDEN UNTIL YOU VOTE</b><span>USER · FACE · CHARACTER · BRAND · PRICE · POPULARITY</span></div><div className="battle"><article><span>LOOK A</span><AutoLook items={a} blind label="LOOK A"/><button className="btn dark" onClick={()=>setPick("A")}>CHOOSE A</button></article><b className="vs">VS</b><article><span>LOOK B</span><AutoLook items={b} blind label="LOOK B"/><button className="btn dark" onClick={()=>setPick("B")}>CHOOSE B</button></article></div><p className="battle-note">Vote for the style, not the person.</p></div>
}

const THIS_CHOICES=[["bag","mini-bag"],["loafer","sneakers"],["cardigan","windbreaker"]];
function ThisOrThat({step,setStep,ids,setIds,go,notify}:{step:number;setStep:(v:number)=>void;ids:string[];setIds:(v:string[])=>void;go:(s:Screen)=>void;notify:(s:string)=>void}){
 const choose=(id:string)=>{setIds([...ids,id]);setStep(step+1)};
 if(step>=THIS_CHOICES.length)return <div className="page"><SectionHead eyebrow="3 CHOICES COMPLETE" title="YOUR LOOK IS READY" copy="빠른 선택이 하나의 쇼핑 가능한 룩으로 연결되었습니다."/><div className="complete-layout"><AutoLook items={byIds(ids)}/><aside><span className="eyebrow">YOUR QUICK EDIT</span><h2>SOFT CITY<br/>WEEKEND</h2><div className="result-total"><span>TOTAL</span><b>{won(total(byIds(ids)))}</b></div><button className="btn purple" onClick={()=>notify("LOOK을 저장했어요.")}>SAVE LOOK</button><button className="btn dark" onClick={()=>go("shop")}>SHOP THIS LOOK →</button><button className="text-btn" onClick={()=>{setStep(0);setIds(["top","denim"])}}>PLAY AGAIN</button></aside></div></div>;
 const options=byIds(THIS_CHOICES[step]);const questions=["이 룩에 어떤 가방?","어떤 신발로 마무리할까요?","저녁 바람엔 어떤 아우터?"];
 return <div className="page"><SectionHead eyebrow="CORE GAME 03 · THIS OR THAT" title="COMPLETE THE LOOK" copy="쇼핑에 익숙하지 않아도 3번의 선택이면 충분합니다."/><div className="stepper"><i style={{width:`${(step/3)*100}%`}}/><span>{step+1} / 3</span></div><section className="this-layout"><div className="current-look"><span>CURRENT LOOK</span><AutoLook items={byIds(ids)} blind/></div><div className="choice-area"><span className="eyebrow">QUICK CHOICE {step+1}</span><h2>{questions[step]}</h2><div className="choice-grid">{options.map((item,index)=><button key={item.id} onClick={()=>choose(item.id)}><img src={item.image} alt={item.name}/><span>OPTION {index?"B":"A"}</span><b>{item.name}</b><small>{won(item.price)}</small></button>)}</div></div></section></div>
}

function Guess({answer,setAnswer,go}:{answer:number|null;setAnswer:(v:number|null)=>void;go:(s:Screen)=>void}){
 const look=byIds(["jacket","shirt","skirt","loafer"]),correct=1;
 return <div className="page"><SectionHead eyebrow="CORE GAME 04 · GUESS THE LOOK" title="이 LOOK의 총 가격은?" copy="가격 감각을 테스트하고, 투표 뒤 세일가를 발견하세요."/><section className="guess-layout"><AutoLook items={look} blind label="PRICE HIDDEN"/><div className="guess-card">{answer===null?<><span className="eyebrow">PICK ONE</span><h2>HOW MUCH<br/>IS THE LOOK?</h2>{[129000,219000,349000].map((v,i)=><button key={v} onClick={()=>setAnswer(i)}> {String.fromCharCode(65+i)}. {won(v)}</button>)}</>:<><span className="eyebrow">{answer===correct?"CORRECT!":"GOOD TRY — REVEAL"}</span><h2>₩219,000</h2><p>현재 SALE 적용 시</p><strong>₩167,000</strong><div className="reward">+ 20 MUSE POINTS</div><button className="btn purple" onClick={()=>go("shop")}>SHOP THE LOOK →</button><button className="text-btn" onClick={()=>setAnswer(null)}>TRY AGAIN</button></>}</div></section></div>
}

function Shop({alternative,setAlternative,bagIds,setBagIds,notify}:{alternative:boolean;setAlternative:(v:boolean)=>void;bagIds:string[];setBagIds:(v:string[])=>void;notify:(s:string)=>void}){
 const original=byIds(["jacket","shirt","skirt","loafer"]),alt=byIds(["cardigan","top","cargo","sneakers"]),items=alternative?alt:original;const active=items.filter(x=>bagIds.includes(x.id));
 const toggle=(id:string)=>setBagIds(bagIds.includes(id)?bagIds.filter(x=>x!==id):[...bagIds,id]);
 return <div className="page"><SectionHead eyebrow="SHOP THE LOOK" title="PLAY ENDS. DISCOVERY STARTS." copy="완성된 룩의 상품을 개별 선택하거나 한 번에 담아보세요."/><div className="shop-layout"><section><span className="eyebrow">COMMUNITY PICK · 12.8K SAVES</span><AutoLook items={items} label={alternative?"SIMILAR LOOK":"WINNING LOOK"}/><div className="price-swap"><span>LOVE THE LOOK, NOT THE PRICE?</span><b>{won(total(items))}</b><button onClick={()=>{setAlternative(!alternative);setBagIds((alternative?original:alt).map(x=>x.id))}}>{alternative?"VIEW ORIGINAL":"FIND ALTERNATIVES →"}</button></div></section><aside><span className="eyebrow">SHOPPABLE EDIT</span><h2>{alternative?"SIMILAR MOOD, LESS":"THE LOOK, ITEM BY ITEM"}</h2><div className="shop-products">{items.map(item=><label key={item.id}><input type="checkbox" checked={bagIds.includes(item.id)} onChange={()=>toggle(item.id)}/><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></label>)}</div><div className="shop-total"><span>{active.length} ITEMS SELECTED</span><b>{won(total(active))}</b></div><button className="btn purple" disabled={!active.length} onClick={()=>notify(`${active.length}개 상품을 BAG에 담았습니다.`)}>ADD SELECTED TO BAG →</button></aside></div></div>
}

function StyleDNA({go}:{go:(s:Screen)=>void}){
 const dna:[[string,number,string],[string,number,string],[string,number,string],[string,number,string]]=[["MINIMAL",82,"#bb8ad4"],["CASUAL",71,"#ed8aa3"],["FEMININE",54,"#f0c6d1"],["STREET",31,"#9f91a8"]];
 return <div className="page"><SectionHead eyebrow="PLAY BECOMES PERSONALIZATION" title="YOUR STYLE DNA" copy="게임과 투표의 선택 데이터가 다음 상품 발견을 더 개인적으로 만듭니다."/><section className="dna-layout"><div className="dna-card"><span>YOUR PRIMARY TYPE</span><h2>QUIET<br/>CONTRAST</h2><p>차분한 컬러, 단정한 실루엣,<br/>한 가지 포인트를 선호해요.</p><button className="btn lime" onClick={()=>go("build")}>DISCOVER LOOKS FOR YOU →</button></div><div className="dna-bars">{dna.map(([name,value,color])=><div key={name}><span><b>{name}</b><strong>{value}%</strong></span><i><em style={{width:`${value}%`,background:color}}/></i></div>)}</div></section><section className="for-you"><SectionHead eyebrow="BASED ON YOUR LAST 12 PLAYS" title="FOR YOUR TASTE"/><div>{byIds(["cardigan","denim","mini-bag"]).map(p=><article key={p.id}><img src={p.image} alt={p.name}/><small>{p.brand}</small><b>{p.name}</b><span>{won(p.price)}</span></article>)}<button onClick={()=>go("shop")}><span>PERSONAL EDIT</span><b>SHOP A COMPLETE<br/>QUIET CONTRAST LOOK</b><i>VIEW LOOK →</i></button></div></section></div>
}
