"use client";

import {useState} from "react";

type Screen="commerce"|"home"|"build"|"battle"|"shop";
type Category="OUTER"|"TOP"|"BOTTOM"|"SHOES"|"BAG"|"ACC";
type StylingFor="women"|"men";
type Product={id:string;category:Category;brand:string;name:string;price:number;sale?:number;likes:string;color:string;image:string;stock:boolean};

const PRODUCTS:Product[]=[
 {id:"cardigan",category:"OUTER",brand:"SÉRIE",name:"Soft Lilac Cardigan",price:49000,likes:"2.1K",color:"LILAC",image:"/catalog/street-21.jpg",stock:true},
 {id:"jacket",category:"OUTER",brand:"ATELIER NINE",name:"Linen Crop Jacket",price:79000,likes:"1.4K",color:"IVORY",image:"/catalog/street-25.jpg",stock:true},
 {id:"windbreaker",category:"OUTER",brand:"VETA ACTIVE",name:"Light Nylon Windbreaker",price:69000,sale:59000,likes:"3.8K",color:"SAGE",image:"/catalog/street-24.jpg",stock:true},
 {id:"top",category:"TOP",brand:"FORME",name:"Ivory Layered Top",price:39000,likes:"1.9K",color:"IVORY",image:"/catalog/women-01.jpg",stock:true},
 {id:"red-knit",category:"TOP",brand:"ROUGE INDEX",name:"Red Rib Knit",price:45000,likes:"2.9K",color:"RED",image:"/catalog/women-05.jpg",stock:true},
 {id:"henley",category:"TOP",brand:"LAYER",name:"Soft Rib Henley Tee",price:42000,likes:"2.6K",color:"CHARCOAL",image:"/catalog/street-01.jpg",stock:true},
 {id:"shirt",category:"TOP",brand:"SÉRIE",name:"Sheer Pocket Shirt",price:52000,likes:"1.7K",color:"MINT",image:"/catalog/women-10.jpg",stock:true},
 {id:"washed-tee",category:"TOP",brand:"COMMON TYPE",name:"Washed Cotton Tee",price:35000,likes:"3.4K",color:"GRAY",image:"/catalog/street-02.jpg",stock:true},
 {id:"rugby-shirt",category:"TOP",brand:"NORTH INDEX",name:"Stripe Rugby Shirt",price:54000,likes:"1.8K",color:"NAVY",image:"/catalog/street-03.jpg",stock:true},
 {id:"zip-hoodie",category:"TOP",brand:"GROUND",name:"Light Zip Hoodie",price:59000,likes:"4.1K",color:"OAT",image:"/catalog/street-04.jpg",stock:true},
 {id:"oversized-shirt",category:"TOP",brand:"LAYER",name:"Relaxed Oxford Shirt",price:49000,likes:"2.2K",color:"SKY",image:"/catalog/street-05.jpg",stock:true},
 {id:"mesh-knit",category:"TOP",brand:"VETA",name:"Summer Mesh Knit",price:47000,likes:"1.6K",color:"SAGE",image:"/catalog/street-06.jpg",stock:true},
 {id:"denim",category:"BOTTOM",brand:"BLUE HOUR",name:"Indigo Bootcut Denim",price:59000,likes:"4.2K",color:"INDIGO",image:"/catalog/street-16.jpg",stock:true},
 {id:"skirt",category:"BOTTOM",brand:"MOMENT EDITION",name:"Soft Pleats Skirt",price:69000,likes:"3.1K",color:"BURGUNDY",image:"/catalog/women-12.jpg",stock:true},
 {id:"cargo",category:"BOTTOM",brand:"LAYER",name:"Wide Pocket Cargo",price:49000,likes:"2.8K",color:"KHAKI",image:"/catalog/street-13.jpg",stock:true},
 {id:"parachute",category:"BOTTOM",brand:"VETA ACTIVE",name:"Nylon Parachute Pants",price:62000,likes:"3.7K",color:"STONE",image:"/catalog/street-11.jpg",stock:true},
 {id:"relaxed-jeans",category:"BOTTOM",brand:"BLUE HOUR",name:"Relaxed Blue Jeans",price:65000,likes:"5.2K",color:"BLUE",image:"/catalog/street-14.jpg",stock:true},
 {id:"track-pants",category:"BOTTOM",brand:"GROUND",name:"Side Line Track Pants",price:52000,likes:"2.4K",color:"NAVY",image:"/catalog/street-15.jpg",stock:true},
 {id:"work-pants",category:"BOTTOM",brand:"COMMON TYPE",name:"Washed Work Pants",price:57000,likes:"1.9K",color:"BROWN",image:"/catalog/street-12.jpg",stock:true},
 {id:"sneakers",category:"SHOES",brand:"GROUND",name:"Cream Platform Sneakers",price:49000,likes:"6.1K",color:"CREAM",image:"/catalog/accessory-01.jpg",stock:true},
 {id:"loafer",category:"SHOES",brand:"FORME",name:"Classic Penny Loafer",price:64000,likes:"1.8K",color:"BLACK",image:"/catalog/accessory-03.jpg",stock:true},
 {id:"rain-boots",category:"SHOES",brand:"VETA",name:"Rainy Day Boots",price:58000,likes:"3.2K",color:"OLIVE",image:"/catalog/accessory-04.jpg",stock:true},
 {id:"retro-runner",category:"SHOES",brand:"GROUND",name:"Retro Runner",price:69000,likes:"4.8K",color:"SILVER",image:"/catalog/accessory-02.jpg",stock:true},
 {id:"suede-clog",category:"SHOES",brand:"COMMON TYPE",name:"Soft Suede Clog",price:55000,likes:"2.3K",color:"TAUPE",image:"/catalog/accessory-05.jpg",stock:true},
 {id:"canvas-shoes",category:"SHOES",brand:"NORTH INDEX",name:"Canvas Court Shoes",price:45000,likes:"3.1K",color:"IVORY",image:"/catalog/accessory-06.jpg",stock:true},
 {id:"bag",category:"BAG",brand:"MARÉE",name:"Soft Baguette Bag",price:39000,likes:"4.7K",color:"BROWN",image:"/catalog/accessory-09.jpg",stock:true},
 {id:"mini-bag",category:"BAG",brand:"SÉRIE",name:"Mint Mini Boston Bag",price:45000,likes:"1.3K",color:"MINT",image:"/catalog/accessory-10.jpg",stock:true},
 {id:"necklace",category:"ACC",brand:"INDEX",name:"Curve Chain Necklace",price:29000,likes:"2.5K",color:"SILVER",image:"/catalog/accessory-15.jpg",stock:true},
 {id:"red-scarf",category:"ACC",brand:"ROUGE INDEX",name:"Signal Red Scarf",price:24000,likes:"1.8K",color:"RED",image:"/catalog/accessory-16.jpg",stock:true},
];

const WOMEN_ONLY=new Set(["cardigan","jacket","top","red-knit","shirt","skirt","mini-bag"]);
const MEN_ONLY=new Set(["henley"]);
const fitsStyling=(item:Product,target:StylingFor)=>target==="men"?!WOMEN_ONLY.has(item.id):!MEN_ONLY.has(item.id);
const byIds=(ids:string[])=>ids.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean) as Product[];
const total=(items:Product[])=>items.reduce((sum,item)=>sum+(item.sale??item.price),0);
const won=(value:number)=>`₩${value.toLocaleString("ko-KR")}`;

function AutoLook({items,blind=false,label="MUSE EDIT"}:{items:Product[];blind?:boolean;label?:string}){
 return <div className={`auto-look ${blind?"blind":""}`}><div className="look-stamp"><b>{label}</b><span>EXISTING PRODUCT DATA</span></div><div className="look-collage">{items.map((item,index)=><figure className={`look-item slot-${item.category.toLowerCase()} n-${index}`} key={item.id}><img src={item.image} alt={`${item.name} 상품 이미지`}/>{!blind&&<figcaption><b>{item.category}</b><span>{item.brand}</span></figcaption>}</figure>)}{!items.length&&<div className="empty-look"><b>YOUR LOOK</b><span>세 번의 선택으로<br/>오늘의 LOOK을 완성해보세요.</span></div>}</div><p>POWERED BY COMMERCE PRODUCTS</p></div>
}

function CommerceEntry({enter,cartItems,clearCart}:{enter:()=>void;cartItems:Product[];clearCart:()=>void}){
 const picks=byIds(["red-knit","windbreaker","denim","bag"]);
 return <div className="commerce-entry"><header className="commerce-header"><button className="commerce-logo" onClick={clearCart}>FASHION<br/>COMMERCE</button><nav>{["HOME","RANKING"].map(x=><button key={x}>{x}</button>)}<button className="play-nav" onClick={enter}>PLAY ✦</button>{["SEARCH","MY"].map(x=><button key={x}>{x}</button>)}</nav><button className="cart-chip">BAG {cartItems.length}</button></header>{cartItems.length?<main className="commerce-return"><span>BACK IN COMMERCE</span><h1>MUSE PLAY에서 고른 상품을<br/>장바구니에 담았어요.</h1><div>{cartItems.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><small>{item.brand}</small><b>{item.name}</b><strong>{won(item.sale??item.price)}</strong></article>)}</div><aside><p><span>{cartItems.length} ITEMS</span><b>{won(total(cartItems))}</b></p><button onClick={clearCart}>쇼핑 계속하기 →</button></aside></main>:<main className="commerce-home"><section className="commerce-intro"><span>NEW ARRIVALS · 26 SUMMER</span><h1>YOUR EVERYDAY,<br/>BETTER CURATED.</h1><p>새로운 시즌의 스타일을 만나보세요.</p></section><section className="commerce-products"><div><span>RECOMMENDED FOR YOU</span><button>VIEW ALL →</button></div><div>{picks.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><small>{item.brand}</small><b>{item.name}</b><strong>{won(item.sale??item.price)}</strong></article>)}</div></section><section className="commerce-play-card"><span>NEW SHOPPING EXPERIENCE</span><h2>MUSE PLAY</h2><p>기존 상품으로 플레이하며<br/>새로운 스타일을 발견해보세요.</p><button onClick={enter}>ENTER PLAY →</button><i>PLAY ✦</i></section></main>}</div>
}

function PlayHeader({screen,back}:{screen:Screen;back:()=>void}){
 const step=screen==="home"?"MISSION":screen==="build"?"BUILD":screen==="battle"?"BATTLE · REVEAL":"SHOP";
 return <header className="play-header"><button onClick={back}>← 쇼핑으로 돌아가기</button><div><b>MUSE PLAY</b><span>A PLAY COMMERCE MODULE</span></div><strong>{step}</strong></header>
}

function SectionHead({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}){return <header className="section-head"><div><span>{eyebrow}</span><h1>{title}</h1></div>{copy&&<p>{copy}</p>}</header>}
function ProductLines({items}:{items:Product[]}){return <div className="product-lines">{items.map(item=><div key={item.id}><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></div>)}</div>}

export default function Muse(){
 const[screen,setScreen]=useState<Screen>("commerce");
 const[stylingFor,setStylingFor]=useState<StylingFor>("women");
 const[selectedIds,setSelectedIds]=useState<string[]>([]);
 const[submitted,setSubmitted]=useState(false);
 const[battlePick,setBattlePick]=useState<"A"|"B"|null>(null);
 const[cartIds,setCartIds]=useState<string[]>([]);
 const go=(next:Screen)=>{setScreen(next);window.scrollTo({top:0,behavior:"smooth"})};
 const enter=()=>{setSelectedIds([]);setSubmitted(false);setBattlePick(null);setCartIds([]);go("home")};
 const exitPlay=(ids:string[]=[])=>{setCartIds(ids);go("commerce")};
 const playerLook=byIds(selectedIds),battleB=byIds(["shirt","cargo","canvas-shoes","red-scarf"]),shopItems=battlePick==="B"?battleB:(playerLook.length?playerLook:byIds(["top","denim","sneakers"]));
 if(screen==="commerce")return <CommerceEntry enter={enter} cartItems={byIds(cartIds)} clearCart={()=>setCartIds([])}/>;
 return <main><PlayHeader screen={screen} back={()=>exitPlay()}/>{screen==="home"&&<Home go={go}/>} {screen==="build"&&<Build stylingFor={stylingFor} setStylingFor={setStylingFor} selectedIds={selectedIds} setSelectedIds={setSelectedIds} submitted={submitted} setSubmitted={setSubmitted} go={go}/>} {screen==="battle"&&<Battle playerLook={playerLook} pick={battlePick} setPick={setBattlePick} go={go}/>} {screen==="shop"&&<Shop items={shopItems} returnToCommerce={exitPlay}/>}</main>
}

function Home({go}:{go:(s:Screen)=>void}){
 return <div className="page home-page"><section className="home-hero"><div className="hero-copy"><span className="eyebrow">MUSE PLAY</span><h2>STYLE THE<br/>MOMENT.</h2><p>실제 판매 상품으로<br/>오늘의 LOOK을 만들어보세요.</p><button className="btn lime" onClick={()=>go("build")}>오늘의 미션 시작하기 →</button></div><div className="hero-board"><AutoLook items={byIds(["cardigan","top","denim","sneakers","bag"])} blind label="WHAT WOULD YOU WEAR?"/></div></section><section className="mission-feature"><div className="mascot mascot-3d"><img src="/miyu-mascot-3d-v4.png" alt="3D 미션 가이드 미유"/><span>MISSION GUIDE · MIYU</span></div><div><span className="eyebrow">MIYU&apos;S DAILY MISSION</span><h2>금요일 7PM,<br/>갑자기 잡힌 첫 소개팅</h2><blockquote>20만원 안으로 편안하지만 기억에 남는<br/>성수 데이트 LOOK.</blockquote><div className="chips"><span>29°C</span><span>TOP + BOTTOM + SHOES</span><span>🎴 NO BLACK</span></div><button className="btn purple" onClick={()=>go("build")}>미션 시작하기 →</button></div><aside><small>BUDGET</small><b>₩200,000</b><hr/><small>REQUIRED</small><p>TOP + BOTTOM + SHOES</p><hr/><small>TODAY&apos;S WILD CARD</small><p>🎴 NO BLACK<br/>검은색 아이템 없이 완성하세요.</p></aside></section><section className="community-battle"><div><span>COMMUNITY BATTLE</span><h2>12,421명이 오늘의 LOOK을<br/>선택하고 있어요.</h2><button className="btn dark" onClick={()=>go("battle")}>투표하러 가기 →</button></div><section><AutoLook items={byIds(["cardigan","top","denim","sneakers"])} blind label="LOOK A"/><b>VS</b><AutoLook items={byIds(["shirt","cargo","canvas-shoes","red-scarf"])} blind label="LOOK B"/></section></section></div>
}

function Build({stylingFor,setStylingFor,selectedIds,setSelectedIds,submitted,setSubmitted,go}:{stylingFor:StylingFor;setStylingFor:(v:StylingFor)=>void;selectedIds:string[];setSelectedIds:(v:string[])=>void;submitted:boolean;setSubmitted:(v:boolean)=>void;go:(s:Screen)=>void}){
 const[stage,setStage]=useState(0),[shuffle,setShuffle]=useState(0);
 const steps:{category:"TOP"|"BOTTOM"|"SHOES";title:string}[]=[{category:"TOP",title:"PICK YOUR TOP"},{category:"BOTTOM",title:"PICK YOUR BOTTOM"},{category:"SHOES",title:"PICK YOUR SHOES"}];
 const selected=byIds(selectedIds),amount=total(selected),budget=200000,left=budget-amount,cats=new Set(selected.map(x=>x.category)),noBlack=!selected.some(x=>x.color==="BLACK"),ready=cats.has("TOP")&&cats.has("BOTTOM")&&cats.has("SHOES")&&left>=0&&noBlack;
 const current=steps[stage],pool=PRODUCTS.filter(item=>item.category===current.category&&fitsStyling(item,stylingFor)),offset=pool.length?shuffle%pool.length:0,choices=[...pool.slice(offset),...pool.slice(0,offset)].slice(0,6),picked=selected.find(item=>item.category===current.category);
 const choose=(item:Product)=>setSelectedIds([...selectedIds.filter(id=>PRODUCTS.find(p=>p.id===id)?.category!==item.category),item.id]);
 const changeTarget=(target:StylingFor)=>{setStylingFor(target);setSelectedIds([]);setStage(0);setShuffle(0);setSubmitted(false)};
 const next=()=>{if(stage<2){setStage(stage+1);setShuffle(0)}else if(ready)setSubmitted(true)};
 if(submitted)return <div className="page"><SectionHead eyebrow="LOOK COMPLETE" title="YOUR LOOK IS READY" copy="세 번의 선택으로 미션을 완성했습니다. 이제 커뮤니티 선택으로 이어집니다."/><div className="complete-layout"><AutoLook items={selected} label="DAILY LOOK"/><aside><span className="eyebrow">MISSION CLEAR</span><h2>FRIDAY<br/>SEONGSU DATE</h2><div className="result-total"><span>{selected.length} ITEMS</span><b>{won(amount)}</b></div><ProductLines items={selected}/><button className="btn purple" onClick={()=>go("battle")}>COMMUNITY BATTLE →</button><button className="text-btn" onClick={()=>setSubmitted(false)}>← LOOK 수정하기</button></aside></div></div>;
 return <div className="page build-choice-page"><SectionHead eyebrow="DAILY MISSION" title={current.title} copy="전체 상품을 탐색하지 않아도 괜찮아요. MUSE가 고른 6개 중 하나를 선택하세요."/><section className="styling-for" aria-label="코디 대상 선택"><div><span>STYLING FOR</span><b>{stylingFor==="women"?"WOMEN · MIYU":"MEN · REN"}</b></div><button className={stylingFor==="women"?"active":""} onClick={()=>changeTarget("women")}><b>여성 코디</b><small>여성 + 유니섹스</small></button><button className={stylingFor==="men"?"active":""} onClick={()=>changeTarget("men")}><b>남성 코디</b><small>남성 + 유니섹스</small></button><p>{stylingFor==="men"?"스커트·원피스·하이힐은 표시하지 않아요.":"여성 무드와 유니섹스 상품만 보여드려요."}</p></section><section className="mission-bar"><div><small>FRIDAY · 7PM</small><b>갑자기 잡힌 첫 소개팅</b><span>SEOUL · SEONGSU · 29°C</span></div><div><small>BUDGET</small><b>₩200,000</b></div><div><small>TODAY&apos;S WILD CARD</small><b>🎴 NO BLACK</b><span>검은색 아이템 없이 완성하세요.</span></div></section><div className="choice-progress">{steps.map((item,index)=><button key={item.category} className={index===stage?"active":index<stage?"done":""} onClick={()=>index<=stage&&setStage(index)}><span>0{index+1}</span><b>{item.category}</b><i>{cats.has(item.category)?"✓":""}</i></button>)}</div><div className="choice-builder"><section className="choice-products"><header><span>{current.title}</span><b>6 ITEMS</b></header><div>{choices.map(item=><button key={item.id} className={picked?.id===item.id?"selected":""} onClick={()=>choose(item)}><img src={item.image} alt={item.name}/><small>{item.brand}</small><b>{item.name}</b><span>{won(item.sale??item.price)}</span><i>{picked?.id===item.id?"SELECTED":"PICK +"}</i></button>)}</div><footer><button className="shuffle-btn" onClick={()=>setShuffle(shuffle+2)}>마음에 드는 게 없나요?　↻ SHUFFLE</button><button className="btn purple" disabled={!picked||(stage===2&&!ready)} onClick={next}>{stage<2?`다음: ${steps[stage+1].category} 고르기 →`:ready?"LOOK 완성하기 →":!noBlack?"BLACK 아이템을 바꿔주세요":"미션 조건을 확인해주세요"}</button></footer></section><aside className="choice-summary"><AutoLook items={selected}/><div className="choice-budget"><span>BUDGET</span><b>{won(amount)} <small>/ {won(budget)}</small></b><i style={{width:`${Math.min(100,amount/budget*100)}%`}}/><strong className={left<0?"over":""}>{left>=0?`${won(left)} LEFT`:`${won(Math.abs(left))} OVER`}</strong></div><div className={noBlack?"wild-card clear":"wild-card fail"}><span>TODAY&apos;S WILD CARD</span><b>🎴 NO BLACK {noBlack?"✓":""}</b></div></aside></div></div>
}

function Battle({playerLook,pick,setPick,go}:{playerLook:Product[];pick:"A"|"B"|null;setPick:(v:"A"|"B"|null)=>void;go:(s:Screen)=>void}){
 const a=playerLook.length?playerLook:byIds(["top","denim","sneakers"]),b=byIds(["shirt","cargo","canvas-shoes","red-scarf"]),percent=pick==="B"?63:37,chosen=pick==="A"?a:b,brands=[...new Set(chosen.map(item=>item.brand))];
 if(pick)return <div className="page reveal-page"><SectionHead eyebrow="REVEAL" title={`YOU PICKED LOOK ${pick}`} copy="투표가 끝났습니다. 이제 기존 커머스의 상품 정보를 공개합니다."/><div className="reveal reveal-stage"><section><AutoLook items={chosen} label={`LOOK ${pick} · ${percent}%`}/></section><aside><span className="eyebrow reveal-percent">{percent}%가 같은 선택을 했어요.</span><h2>이 LOOK의 총 상품가는<br/><strong>{won(total(chosen))}</strong></h2><div className="brand-reveal"><span>BRANDS REVEALED</span><div>{brands.map(brand=><b key={brand}>{brand}</b>)}</div></div><ProductLines items={chosen}/><button className="btn purple" onClick={()=>go("shop")}>이 LOOK 상품 보기 →</button><button className="text-btn" onClick={()=>setPick(null)}>다시 선택하기</button></aside></div></div>;
 return <div className="page battle-page"><SectionHead eyebrow="COMMUNITY BATTLE" title="WHICH WOULD YOU WEAR?" copy="브랜드와 가격을 숨긴 채 스타일만 보고 선택하세요."/><div className="hidden-rule"><b>선택 전 비공개</b><span>브랜드 ✕　가격 ✕　인기도 ✕</span></div><div className="battle"><article><span>LOOK A</span><AutoLook items={a} blind label="LOOK A"/><button className="btn dark" onClick={()=>setPick("A")}>LOOK A 선택하기</button></article><b className="vs">VS</b><article><span>LOOK B</span><AutoLook items={b} blind label="LOOK B"/><button className="btn dark" onClick={()=>setPick("B")}>LOOK B 선택하기</button></article></div><p className="battle-note">Vote for the style, not the brand.</p></div>
}

function Shop({items,returnToCommerce}:{items:Product[];returnToCommerce:(ids:string[])=>void}){
 const[selected,setSelected]=useState(items.map(item=>item.id)),active=items.filter(item=>selected.includes(item.id));
 const toggle=(id:string)=>setSelected(selected.includes(id)?selected.filter(x=>x!==id):[...selected,id]);
 return <div className="page shop-page"><SectionHead eyebrow="MUSE PLAY · FINAL" title="SHOP THE LOOK" copy="MUSE의 역할은 여기까지입니다. 선택 상품은 기존 플랫폼 장바구니에서 이어집니다."/><div className="shop-layout shop-commerce"><section><AutoLook items={items} label="SELECTED LOOK"/><p className="return-note">DISCOVER IN MUSE<br/>CHECK OUT IN COMMERCE</p></section><aside><span className="eyebrow">SELECT PRODUCTS</span><h2>기존 장바구니로 보낼 상품</h2><div className="shop-products">{items.map(item=><label key={item.id}><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>toggle(item.id)}/><img src={item.image} alt=""/><span><small>{item.brand} · {item.category}</small><b>{item.name}</b></span><strong>{won(item.sale??item.price)}</strong></label>)}</div><div className="shop-total"><span>TOTAL · {active.length} ITEMS</span><b>{won(total(active))}</b></div><button className="commerce-cta" disabled={!active.length} onClick={()=>returnToCommerce(active.map(item=>item.id))}>기존 쇼핑몰 장바구니로 이동 →</button><p className="commerce-boundary">결제 · 배송 · 쿠폰은 기존 커머스에서 진행됩니다.</p></aside></div></div>
}
