"use client";

import {useState} from "react";

type Screen="home"|"build"|"battle"|"this"|"guess"|"shop"|"dna";
type Category="ALL"|"OUTER"|"TOP"|"BOTTOM"|"DRESS"|"SHOES"|"BAG"|"ACC";
type StylingFor="women"|"men";
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
const WOMEN_ONLY=new Set(["cardigan","jacket","top","red-knit","shirt","skirt","dress","mini-dress","mini-bag"]);
const MEN_ONLY=new Set(["henley"]);
const fitsStyling=(item:Product,stylingFor:StylingFor)=>stylingFor==="men"?!WOMEN_ONLY.has(item.id):!MEN_ONLY.has(item.id);
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
   <p>BUILD · BATTLE · REVEAL · SHOP</p>
 </div>
}

function Header({screen,setScreen}:{screen:Screen;setScreen:(s:Screen)=>void}){
 const nav:[Screen,string][]=[["home","PLAY"],["build","BUILD"],["battle","BATTLE"],["shop","SHOP"]];
 return <header className="site-header"><button className="wordmark" onClick={()=>setScreen("home")}><b>MUSE</b><span>PLAY COMMERCE</span></button><nav aria-label="주요 메뉴">{nav.map(([id,label])=><button key={id} className={screen===id?"active":""} onClick={()=>setScreen(id)}>{label}</button>)}</nav><div className="flow-label">BUILD → BATTLE → REVEAL → SHOP</div></header>
}

function SectionHead({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <header className="section-head"><div><span>{eyebrow}</span><h1>{title}</h1></div>{copy&&<p>{copy}</p>}</header>}
function Check({ok,children}:{ok:boolean;children:React.ReactNode}){return <p className={ok?"check ok":"check"}><b>{ok?"✓":"○"}</b>{children}</p>}

export default function Muse(){
 const[screen,setScreen]=useState<Screen>("home");
 const[stylingFor,setStylingFor]=useState<StylingFor>("women");
 const[category,setCategory]=useState<Category>("ALL");
 const[selectedIds,setSelectedIds]=useState<string[]>(["top","denim"]);
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
   {screen==="build"&&<Build stylingFor={stylingFor} setStylingFor={setStylingFor} category={category} setCategory={setCategory} selectedIds={selectedIds} setSelectedIds={setSelectedIds} submitted={submitted} setSubmitted={setSubmitted} go={go}/>} 
   {screen==="battle"&&<Battle pick={battlePick} setPick={setBattlePick} go={go}/>} 
   {screen==="this"&&<ThisOrThat step={thisStep} setStep={setThisStep} ids={thisIds} setIds={setThisIds} go={go} notify={notify}/>} 
   {screen==="guess"&&<Guess answer={guess} setAnswer={setGuess} go={go}/>} 
   {screen==="shop"&&<Shop alternative={alternative} setAlternative={setAlternative} bagIds={bagIds} setBagIds={setBagIds} notify={notify}/>} 
   {screen==="dna"&&<StyleDNA go={go}/>} 
   {toast&&<div className="toast" role="status">{toast}</div>}
 </main>
}

function Home({go}:{go:(s:Screen)=>void}){
 const modes:[Screen,string,string,string][]=[["build","01","BUILD","상품을 골라 미션에 맞는 LOOK 만들기"],["battle","02","BATTLE","브랜드와 가격 없이 스타일만 선택하기"],["shop","03","SHOP","REVEAL된 LOOK의 실제 상품 구매하기"]];
 return <div className="page home-page">
  <section className="home-hero"><div className="hero-copy"><span className="eyebrow">WHAT WOULD YOU WEAR?</span><h2>STYLE THE<br/>MOMENT.</h2><p>실제 판매 상품으로 오늘의 LOOK을 만들고,<br/>다른 스타일과 겨뤄보세요.</p><button className="btn lime" onClick={()=>go("build")}>오늘의 PLAY 시작하기 →</button></div><div className="hero-board"><AutoLook items={byIds(["cardigan","top","denim","sneakers","bag"])} blind/></div></section>
  <section className="principles"><div><span>01</span><b>BUILD</b><p>예산 안에서 상품을 조합합니다.</p></div><div><span>02</span><b>BATTLE</b><p>오직 스타일만 보고 선택합니다.</p></div><div><span>03</span><b>REVEAL</b><p>투표 후 가격과 브랜드를 공개합니다.</p></div><div><span>04</span><b>SHOP</b><p>선택한 LOOK의 상품을 구매합니다.</p></div></section>
  <section className="mission-feature"><div className="mascot mascot-3d"><img src="/miyu-mascot-3d-v3.png" alt="3D 미션 가이드 미유"/><span>MISSION GUIDE · MIYU</span></div><div><span className="eyebrow">MIYU&apos;S DAILY MISSION</span><h2>금요일 7PM,<br/>갑자기 잡힌 첫 소개팅</h2><blockquote>“20만원 안으로 편안하지만 기억에 남는<br/>성수 데이트 룩을 만들어줄래?”</blockquote><div className="chips"><span>29°C</span><span>TOP + BOTTOM + SHOES</span><span>🎴 NO BLACK</span></div><button className="btn purple" onClick={()=>go("build")}>미션 수락하기 →</button><small className="helper-copy">HELP MIYU · 오늘의 LOOK을 완성해주세요.</small></div><aside><small>BUDGET</small><b>₩200,000</b><hr/><small>SPECIAL RULE</small><p>NO BLACK<br/>검은색 아이템 없이 완성하세요.</p></aside></section>
  <section className="play-modes"><SectionHead eyebrow="CHOOSE YOUR GAME" title="PLAY MODE" copy="같은 상품 DB도 게임 규칙이 바뀌면 새로운 쇼핑 경험이 됩니다."/><div className="mode-grid">{modes.map(([target,num,title,copy])=><button key={num} onClick={()=>go(target)}><span>{num}</span><b>{title}</b><p>{copy}</p><i>PLAY →</i></button>)}</div></section>
  <section className="more-play"><SectionHead eyebrow="FUTURE PLAY MODES" title="MORE WAYS TO PLAY"/><div>{["BEAUTY PLAY","GUESS THE LOOK","THIS OR THAT"].map(x=><article key={x}><span>COMING SOON</span><b>{x}</b><p>새로운 선택 방식으로 확장됩니다.</p></article>)}</div><aside className="ren-host"><img src="/ren-mascot-3d-v5.png" alt="3D 플레이 호스트 렌"/><div><span>PLAY HOST · REN</span><b>NEXT MISSION<br/>IS COMING.</b><p>REN은 다음 PLAY의 호스트로 등장합니다.</p></div></aside></section>
  <section className="data-strip"><div><span>CASE STUDY</span><b>BUILT ON EXISTING COMMERCE DATA</b></div><p>기존 상품 이미지 · 가격 · 카테고리 데이터를 활용하여<br/>별도의 3D Asset 제작 없이 운영할 수 있습니다.</p><small>PRODUCT IMAGE · PRICE · CATEGORY · COLOR · URL · STOCK</small></section>
 </div>
}

function Build({stylingFor,setStylingFor,category,setCategory,selectedIds,setSelectedIds,submitted,setSubmitted,go}:{stylingFor:StylingFor;setStylingFor:(v:StylingFor)=>void;category:Category;setCategory:(c:Category)=>void;selectedIds:string[];setSelectedIds:(v:string[])=>void;submitted:boolean;setSubmitted:(v:boolean)=>void;go:(s:Screen)=>void}){
 const[priceCap,setPriceCap]=useState<number|null>(null),[lastAdded,setLastAdded]=useState<string|null>(null);
 const selected=byIds(selectedIds),amount=total(selected),budget=200000,left=budget-amount,cats=new Set(selected.map(x=>x.category));
 const required=cats.has("TOP")&&cats.has("BOTTOM")&&cats.has("SHOES"),noBlack=!selected.some(x=>x.color==="BLACK"),ready=amount>0&&left>=0&&required&&noBlack;
 const audienceProducts=PRODUCTS.filter(item=>fitsStyling(item,stylingFor)),availableCategories=CATEGORIES.filter(c=>stylingFor==="women"||c!=="DRESS");
 const baseVisible=category==="ALL"?audienceProducts:audienceProducts.filter(x=>x.category===category),visible=priceCap===null?baseVisible:baseVisible.filter(x=>(x.sale??x.price)<=priceCap);
 const lastProduct=PRODUCTS.find(x=>x.id===lastAdded),recoveryCap=lastProduct?Math.max(0,budget-total(selected.filter(x=>x.id!==lastProduct.id))):Math.max(0,budget);
 const toggle=(item:Product)=>{setPriceCap(null);setLastAdded(item.id);if(selectedIds.includes(item.id)){setSelectedIds(selectedIds.filter(id=>id!==item.id));return}const replace=item.category==="ACC"?selectedIds:selectedIds.filter(id=>PRODUCTS.find(p=>p.id===id)?.category!==item.category);setSelectedIds([...replace,item.id])};
 const changeStylingFor=(next:StylingFor)=>{setStylingFor(next);setSelectedIds(next==="men"?["henley","cargo","sneakers"]:["top","denim"]);setCategory("ALL");setPriceCap(null);setLastAdded(null);setSubmitted(false)};
 if(submitted)return <div className="page"><SectionHead eyebrow="LOOK COMPLETE" title="MIYU ♥ YOUR LOOK" copy="객관적인 미션 조건을 모두 통과했습니다. 이제 스타일은 커뮤니티가 결정합니다."/><div className="complete-layout"><AutoLook items={selected} label="LOOK #1842"/><aside><span className="eyebrow">READY TO ENTER</span><h2>FRIDAY<br/>SEONGSU DATE</h2><div className="result-total"><span>{selected.length} ITEMS</span><b>{won(amount)}</b></div><ProductLines items={selected}/><button className="btn purple" onClick={()=>go("battle")}>ENTER BLIND BATTLE →</button><button className="text-btn" onClick={()=>setSubmitted(false)}>← EDIT LOOK</button></aside></div></div>;
 return <div className="page"><SectionHead eyebrow="CORE GAME 01 · BUILD A LOOK" title="TODAY'S MISSION" copy="실제 판매 상품을 골라 미션에 맞는 LOOK을 완성하세요. Flat Lay는 자동으로 생성됩니다."/>
  <section className="styling-for" aria-label="코디 대상 선택"><div><span>STYLING FOR</span><b>{stylingFor==="women"?"WOMEN · MIYU":"MEN · REN"}</b></div><button className={stylingFor==="women"?"active":""} aria-pressed={stylingFor==="women"} onClick={()=>changeStylingFor("women")}><b>여성 코디</b><small>여성 + 유니섹스 상품</small></button><button className={stylingFor==="men"?"active":""} aria-pressed={stylingFor==="men"} onClick={()=>changeStylingFor("men")}><b>남성 코디</b><small>남성 + 유니섹스 상품</small></button><p>{stylingFor==="men"?"원피스 · 스커트 · 하이힐 등 여성 전용 아이템은 제외됐어요.":"남성 전용 상품은 제외하고 여성 무드에 맞는 상품만 보여드려요."}</p></section>
  <section className="mission-bar"><div><small>FRIDAY · 7PM</small><b>갑자기 잡힌 첫 소개팅</b><span>SEOUL · SEONGSU · 29°C</span></div><div><small>BUDGET</small><b>₩200,000</b></div><div><small>SPECIAL RULE</small><b>🎴 NO BLACK</b><span>검은색 아이템 없이 완성하세요.</span></div></section>
  <div className="category-tabs">{availableCategories.map(c=><button className={category===c?"active":""} onClick={()=>{setCategory(c);setPriceCap(null)}} key={c}>{c}<span>{c==="ALL"?audienceProducts.length:audienceProducts.filter(x=>x.category===c).length}</span></button>)}</div>
  <div className="builder"><section className="product-panel"><div className="panel-title"><b>상품 고르기</b><span>{priceCap!==null?`${won(priceCap)} 이하 · `:""}{visible.length} PRODUCTS</span></div><div className="product-grid">{visible.map(item=><article className={selectedIds.includes(item.id)?"selected":""} key={item.id}><div className="product-image"><img src={item.image} alt={item.name}/><button aria-label={`${item.name} 좋아요`}>♡ {item.likes}</button></div><small>{item.brand}</small><h3>{item.name}</h3><p>{won(item.sale??item.price)} {item.sale&&<del>{won(item.price)}</del>}</p><div><span>{item.color} · {item.stock?"IN STOCK":"SOLD OUT"}</span><button onClick={()=>toggle(item)}>{selectedIds.includes(item.id)?"REMOVE":"ADD +"}</button></div></article>)}</div></section>
   <section className="live-look"><div className="panel-title"><b>MISSION STATUS</b><span>SELECT PRODUCTS</span></div><div className={`budget hero-budget ${left<0?"budget-over":""}`}><span className="eyebrow">BUDGET</span><div><b>{won(amount)}</b><small>/ {won(budget)}</small></div><div className="gauge"><i style={{width:`${Math.min(100,amount/budget*100)}%`}}/></div><strong className={left<0?"over":""}>{left>=0?`${won(left)} LEFT`:`BUDGET OVER · ${won(Math.abs(left))} 초과했어요.`}</strong>{left<0&&lastProduct&&<button onClick={()=>{setCategory(lastProduct.category);setPriceCap(recoveryCap)}}>{won(recoveryCap)} 이하 {lastProduct.category} 보기 →</button>}</div><div className="required-status"><span><b>TOP</b>{cats.has("TOP")?"✓":"○"}</span><span><b>BOTTOM</b>{cats.has("BOTTOM")?"✓":"○"}</span><span><b>SHOES</b>{cats.has("SHOES")?"✓":"○"}</span></div><div className={`special-rule ${noBlack?"clear":"fail"}`}><span>🎴 SPECIAL RULE</span><b>NO BLACK</b><small>{noBlack?"검은색 아이템 없이 진행 중 ✓":"검은색 아이템을 다른 상품으로 바꿔주세요."}</small></div><div className="look-preview"><div className="panel-title"><b>AUTO LOOK PREVIEW</b><span>선택에 따라 자동 변경</span></div><AutoLook items={selected}/></div></section>
   <aside className="challenge-check"><span className="eyebrow">CHALLENGE CHECK</span><h2>{ready?"READY TO ENTER":"COMPLETE THE RULES"}</h2><Check ok={left>=0}>Budget under ₩200,000</Check><Check ok={required}>TOP + BOTTOM + SHOES</Check><Check ok={noBlack}>Special rule · NO BLACK</Check><ProductLines items={selected}/><button className="btn purple" disabled={!ready} onClick={()=>setSubmitted(true)}>LOOK 완성하기 →</button><button className="text-btn" onClick={()=>{setSelectedIds([]);setPriceCap(null)}}>RESET LOOK</button></aside>
  </div></div>
}

function ProductLines({items}:{items:Product[]}){return <div className="product-lines">{items.map(item=><div key={item.id}><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></div>)}</div>}

function Battle({pick,setPick,go}:{pick:"A"|"B"|null;setPick:(v:"A"|"B"|null)=>void;go:(s:Screen)=>void}){
 const a=byIds(["cardigan","top","denim","sneakers"]),b=byIds(["shirt","cargo","loafer","red-scarf"]);
 const percent=pick==="B"?63:37,chosen=pick==="A"?a:b,brands=[...new Set(chosen.map(item=>item.brand))];
 if(pick)return <div className="page reveal-page"><SectionHead eyebrow="REVEAL" title={`YOU PICKED LOOK ${pick}`} copy="선택이 끝났습니다. 이제 가격과 브랜드를 공개합니다."/><div className="reveal reveal-stage"><section><AutoLook items={chosen} label={`LOOK ${pick} · ${percent}%`}/></section><aside><span className="eyebrow reveal-percent">{percent}%가 같은 선택을 했어요.</span><h2>그리고 이 LOOK은…<br/><strong>{won(total(chosen))}</strong></h2><div className="brand-reveal"><span>BRANDS REVEALED</span><div>{brands.map(brand=><b key={brand}>{brand}</b>)}</div></div><ProductLines items={chosen}/><button className="btn purple" onClick={()=>go("shop")}>쿠폰 적용가 확인하기 →</button><button className="text-btn" onClick={()=>setPick(null)}>다시 선택하기</button></aside></div></div>;
 return <div className="page battle-page"><SectionHead eyebrow="CORE GAME 02 · BLIND STYLE BATTLE" title="WHICH WOULD YOU WEAR?" copy="사람이 아닌 스타일을 선택하세요. 모든 정보는 투표 뒤 공개됩니다."/><div className="hidden-rule"><b>선택 전 비공개</b><span>유저 ✕　브랜드 ✕　가격 ✕　인기도 ✕</span></div><div className="battle"><article><span>LOOK A</span><AutoLook items={a} blind label="LOOK A"/><button className="btn dark" onClick={()=>setPick("A")}>LOOK A 선택하기</button></article><b className="vs">VS</b><article><span>LOOK B</span><AutoLook items={b} blind label="LOOK B"/><button className="btn dark" onClick={()=>setPick("B")}>LOOK B 선택하기</button></article></div><p className="battle-note">Vote for the style, not the person.</p></div>
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
 const [coupon,setCoupon]=useState<"muse10"|"new15"|"none">("muse10");
 const subtotal=total(active),discount=coupon==="muse10"?Math.min(Math.floor(subtotal*.1/1000)*1000,30000):coupon==="new15"?Math.min(Math.floor(subtotal*.15/1000)*1000,20000):0,finalPrice=subtotal-discount;
 const toggle=(id:string)=>setBagIds(bagIds.includes(id)?bagIds.filter(x=>x!==id):[...bagIds,id]);
 return <div className="page shop-page"><SectionHead eyebrow="SHOP" title="SHOP THE LOOK" copy="게임은 끝났습니다. 브랜드를 확인하고 쿠폰을 적용해 최종 결제 예상가를 비교하세요."/><div className="shop-layout shop-commerce"><section><AutoLook items={items} label={alternative?"SIMILAR LOOK":"SELECTED LOOK"}/></section><aside><span className="eyebrow">{alternative?"LOWER PRICE ALTERNATIVES":"BRANDS REVEALED · SELECT ITEMS"}</span><h2>{alternative?"비슷한 무드의 대체 상품":"선택한 LOOK의 상품"}</h2><div className="shop-products">{items.map(item=><label key={item.id}><input type="checkbox" checked={bagIds.includes(item.id)} onChange={()=>toggle(item.id)}/><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></label>)}</div><section className="coupon-panel"><div><span>AVAILABLE COUPONS</span><small>한 장만 적용할 수 있어요.</small></div><div className="coupon-options"><button className={coupon==="muse10"?"active":""} aria-pressed={coupon==="muse10"} onClick={()=>setCoupon("muse10")}><b>MUSE LOOK 10%</b><small>최대 ₩30,000 할인</small></button><button className={coupon==="new15"?"active":""} aria-pressed={coupon==="new15"} onClick={()=>setCoupon("new15")}><b>WELCOME 15%</b><small>최대 ₩20,000 할인</small></button><button className={coupon==="none"?"active":""} aria-pressed={coupon==="none"} onClick={()=>setCoupon("none")}><b>쿠폰 미적용</b><small>기본 판매가로 보기</small></button></div></section><div className="price-summary"><p><span>상품 합계 · {active.length} ITEMS</span><b>{won(subtotal)}</b></p><p className="discount"><span>쿠폰 할인</span><b>- {won(discount)}</b></p><p><span>배송비</span><b>무료</b></p><div><span>최종 결제 예상가<small>결제 단계에서 변동될 수 있어요.</small></span><strong>{won(finalPrice)}</strong></div></div><button className="commerce-cta" disabled={!active.length} onClick={()=>notify(`${active.length}개 상품 · 최종 ${won(finalPrice)}로 장바구니에 담았습니다.`)}>최종 {won(finalPrice)} · 장바구니 담기</button><button className="alternative-link" onClick={()=>{setAlternative(!alternative);setBagIds((alternative?original:alt).map(x=>x.id))}}>{alternative?"원래 LOOK 보기":"LOVE THE LOOK, NOT THE PRICE? · 저렴한 대체 상품 보기 →"}</button></aside></div></div>
}

function StyleDNA({go}:{go:(s:Screen)=>void}){
 const dna:[[string,number,string],[string,number,string],[string,number,string],[string,number,string]]=[["MINIMAL",82,"#bb8ad4"],["CASUAL",71,"#ed8aa3"],["FEMININE",54,"#f0c6d1"],["STREET",31,"#9f91a8"]];
 return <div className="page"><SectionHead eyebrow="PLAY BECOMES PERSONALIZATION" title="YOUR STYLE DNA" copy="게임과 투표의 선택 데이터가 다음 상품 발견을 더 개인적으로 만듭니다."/><section className="dna-layout"><div className="dna-card"><span>YOUR PRIMARY TYPE</span><h2>QUIET<br/>CONTRAST</h2><p>차분한 컬러, 단정한 실루엣,<br/>한 가지 포인트를 선호해요.</p><button className="btn lime" onClick={()=>go("build")}>DISCOVER LOOKS FOR YOU →</button></div><div className="dna-bars">{dna.map(([name,value,color])=><div key={name}><span><b>{name}</b><strong>{value}%</strong></span><i><em style={{width:`${value}%`,background:color}}/></i></div>)}</div></section><section className="for-you"><SectionHead eyebrow="BASED ON YOUR LAST 12 PLAYS" title="FOR YOUR TASTE"/><div>{byIds(["cardigan","denim","mini-bag"]).map(p=><article key={p.id}><img src={p.image} alt={p.name}/><small>{p.brand}</small><b>{p.name}</b><span>{won(p.price)}</span></article>)}<button onClick={()=>go("shop")}><span>PERSONAL EDIT</span><b>SHOP A COMPLETE<br/>QUIET CONTRAST LOOK</b><i>VIEW LOOK →</i></button></div></section></div>
}
