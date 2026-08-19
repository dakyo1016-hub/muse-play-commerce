"use client";

import {useMemo,useState} from "react";

type Screen="commerce"|"build"|"battle"|"reveal"|"shop";
type Category="TOP"|"BOTTOM"|"OUTER"|"BAG";
type Audience="women"|"men";
type Product={id:string;category:Category;brand:string;name:string;price:number;color:string;image:string;audience:"women"|"men"|"unisex";tags:string[];stock:boolean;alternativeId?:string};

const PRODUCTS:Product[]=[
 {id:"red-knit",category:"TOP",brand:"ROUGE INDEX",name:"Red Rib Knit",price:45000,color:"RED",image:"/catalog/women-05.jpg",audience:"women",tags:["미니멀","포인트","레드"],stock:false,alternativeId:"soft-rib"},
 {id:"ivory-top",category:"TOP",brand:"FORME",name:"Ivory Layered Top",price:39000,color:"IVORY",image:"/catalog/women-01.jpg",audience:"women",tags:["미니멀","레이어드","아이보리"],stock:true},
 {id:"soft-rib",category:"TOP",brand:"LAYER",name:"Soft Rib Henley Tee",price:42000,color:"CHARCOAL",image:"/catalog/street-01.jpg",audience:"unisex",tags:["빈티지","데일리","차콜"],stock:true},
 {id:"rugby",category:"TOP",brand:"NORTH INDEX",name:"Stripe Rugby Shirt",price:54000,color:"NAVY",image:"/catalog/street-03.jpg",audience:"men",tags:["스포티","프레피","네이비"],stock:true},
 {id:"oxford",category:"TOP",brand:"LAYER",name:"Relaxed Oxford Shirt",price:49000,color:"SKY",image:"/catalog/street-05.jpg",audience:"unisex",tags:["클린","오버핏","스카이"],stock:true},
 {id:"mesh-knit",category:"TOP",brand:"VETA",name:"Summer Mesh Knit",price:47000,color:"SAGE",image:"/catalog/street-06.jpg",audience:"unisex",tags:["텍스처","미니멀","세이지"],stock:true},
 {id:"bootcut",category:"BOTTOM",brand:"BLUE HOUR",name:"Indigo Bootcut Denim",price:59000,color:"INDIGO",image:"/catalog/street-16.jpg",audience:"women",tags:["Y2K","슬림","인디고"],stock:true},
 {id:"pleats",category:"BOTTOM",brand:"MOMENT EDITION",name:"Soft Pleats Skirt",price:69000,color:"BURGUNDY",image:"/catalog/women-12.jpg",audience:"women",tags:["에디토리얼","클래식","버건디"],stock:true},
 {id:"cargo",category:"BOTTOM",brand:"LAYER",name:"Wide Pocket Cargo",price:49000,color:"KHAKI",image:"/catalog/street-13.jpg",audience:"unisex",tags:["스트릿","오버핏","카키"],stock:true},
 {id:"relaxed-denim",category:"BOTTOM",brand:"BLUE HOUR",name:"Relaxed Blue Jeans",price:65000,color:"BLUE",image:"/catalog/street-14.jpg",audience:"unisex",tags:["캐주얼","와이드","블루"],stock:true},
 {id:"work-pants",category:"BOTTOM",brand:"COMMON TYPE",name:"Washed Work Pants",price:57000,color:"BROWN",image:"/catalog/street-12.jpg",audience:"men",tags:["워크웨어","빈티지","브라운"],stock:true},
 {id:"track-pants",category:"BOTTOM",brand:"GROUND",name:"Side Line Track Pants",price:52000,color:"NAVY",image:"/catalog/street-15.jpg",audience:"men",tags:["스포티","이지","네이비"],stock:true},
 {id:"crop-jacket",category:"OUTER",brand:"ATELIER NINE",name:"Linen Crop Jacket",price:79000,color:"IVORY",image:"/catalog/street-25.jpg",audience:"women",tags:["미니멀","크롭","아이보리"],stock:true},
 {id:"windbreaker",category:"OUTER",brand:"VETA ACTIVE",name:"Light Nylon Windbreaker",price:69000,color:"SAGE",image:"/catalog/street-24.jpg",audience:"unisex",tags:["스포티","라이트","세이지"],stock:true},
 {id:"lilac-cardigan",category:"OUTER",brand:"SÉRIE",name:"Soft Lilac Cardigan",price:49000,color:"LILAC",image:"/catalog/street-21.jpg",audience:"women",tags:["소프트","Y2K","라일락"],stock:true},
 {id:"utility-jacket",category:"OUTER",brand:"COMMON TYPE",name:"Washed Utility Jacket",price:82000,color:"NAVY",image:"/catalog/street-22.jpg",audience:"men",tags:["워크웨어","클린","네이비"],stock:true},
 {id:"zip-hoodie",category:"OUTER",brand:"GROUND",name:"Light Zip Hoodie",price:59000,color:"OAT",image:"/catalog/street-04.jpg",audience:"unisex",tags:["캐주얼","레이어드","오트"],stock:true},
 {id:"city-blouson",category:"OUTER",brand:"NORTH INDEX",name:"City Nylon Blouson",price:76000,color:"GRAY",image:"/catalog/street-20.jpg",audience:"men",tags:["시티","테크","그레이"],stock:true},
 {id:"baguette",category:"BAG",brand:"MARÉE",name:"Soft Baguette Bag",price:39000,color:"BROWN",image:"/catalog/accessory-09.jpg",audience:"women",tags:["빈티지","컴팩트","브라운"],stock:true},
 {id:"mini-boston",category:"BAG",brand:"SÉRIE",name:"Mint Mini Boston Bag",price:45000,color:"MINT",image:"/catalog/accessory-10.jpg",audience:"women",tags:["포인트","Y2K","민트"],stock:false,alternativeId:"nylon-cross"},
 {id:"nylon-cross",category:"BAG",brand:"VETA ACTIVE",name:"Nylon Cross Bag",price:43000,color:"BLACK",image:"/catalog/accessory-11.jpg",audience:"unisex",tags:["테크","유틸리티","블랙"],stock:true},
 {id:"canvas-tote",category:"BAG",brand:"COMMON TYPE",name:"Structured Canvas Tote",price:36000,color:"IVORY",image:"/catalog/accessory-12.jpg",audience:"unisex",tags:["클린","데일리","아이보리"],stock:true},
 {id:"record-bag",category:"BAG",brand:"NORTH INDEX",name:"Record Shoulder Bag",price:51000,color:"NAVY",image:"/catalog/accessory-13.jpg",audience:"men",tags:["빈티지","시티","네이비"],stock:true},
];

const CATEGORIES:Category[]=["TOP","BOTTOM","OUTER","BAG"];
const FLOW:Screen[]=["build","battle","reveal","shop"];
const byId=(id:string)=>PRODUCTS.find(item=>item.id===id);
const byIds=(ids:string[])=>ids.map(byId).filter(Boolean) as Product[];
const won=(value:number)=>`₩${value.toLocaleString("ko-KR")}`;
const total=(items:Product[])=>items.reduce((sum,item)=>sum+item.price,0);
const fits=(item:Product,audience:Audience)=>item.audience==="unisex"||item.audience===audience;

function Tags({items}:{items:string[]}){return <div className="tag-row">{items.map(tag=><span key={tag}>#{tag}</span>)}</div>}

function FlowSteps({screen}:{screen:Screen}){
 const active=Math.max(0,FLOW.indexOf(screen));
 return <div className="flow-steps" aria-label="PLAY 진행 단계">{FLOW.map((step,index)=><div key={step} className={index===active?"active":index<active?"complete":""}><span>0{index+1}</span><b>{step.toUpperCase()}</b><i>{index<active?"DONE":index===active?"NOW":""}</i></div>)}</div>
}

function LookBoard({items,label="SELECTED LOOK",emptyCopy="카테고리별 상품을 선택하면 이곳에 LOOK이 쌓입니다."}:{items:Product[];label?:string;emptyCopy?:string}){
 return <section className="look-board"><header><b>{label}</b><span>{String(items.length).padStart(2,"0")} / 04 ITEMS</span></header>{items.length?<div className="look-grid">{items.map(item=><figure key={item.id}><img src={item.image} alt={item.name}/><figcaption><small>{item.category}</small><b>{item.brand}</b></figcaption></figure>)}</div>:<div className="look-empty"><span>NO ITEMS YET</span><p>{emptyCopy}</p></div>}<footer>COMPOSED FROM LIVE COMMERCE DATA</footer></section>
}

function StyleBars({variant="player"}:{variant?:"player"|"recommend"}){
 const rows:[string,number][]=variant==="player"?[["MINIMAL",68],["STREET",42],["VINTAGE",56]]:[["MINIMAL",82],["STREET",31],["VINTAGE",64]];
 return <div className="style-bars">{rows.map(([label,value])=><div key={label}><span>{label}</span><i><em style={{width:`${value}%`}}/></i><b>{value}%</b></div>)}</div>
}

function EmptyState({onBack}:{onBack:()=>void}){
 return <section className="system-empty"><span>NO MATCH / 00</span><h2>조건에 맞는 코디가<br/>아직 없습니다.</h2><p>선택한 카테고리나 스타일 조건을 한 단계 줄이면<br/>새로운 매칭 결과를 만들 수 있어요.</p><button onClick={onBack}>BUILD로 돌아가기 →</button></section>
}

function PlayHeader({screen,onExit}:{screen:Screen;onExit:()=>void}){
 return <><header className="play-header"><button onClick={onExit}>← COMMERCE</button><div><b>MUSE / PLAY</b><span>DECISION SYSTEM FOR STYLE</span></div><strong>SESSION 08.19</strong></header><FlowSteps screen={screen}/></>
}

function CommerceHome({enter,cartItems,clearCart}:{enter:()=>void;cartItems:Product[];clearCart:()=>void}){
 const edits=byIds(["red-knit","windbreaker","relaxed-denim","baguette"]);
 if(cartItems.length)return <main className="commerce-return"><span>RETURNED FROM MUSE PLAY</span><h1>선택한 LOOK을<br/>기존 장바구니로 가져왔어요.</h1><div className="return-grid">{cartItems.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><small>{item.brand} · {item.category}</small><b>{item.name}</b><strong>{won(item.price)}</strong></article>)}</div><footer><p><span>{cartItems.length} ITEMS</span><b>{won(total(cartItems))}</b></p><button onClick={clearCart}>쇼핑 계속하기 →</button></footer></main>;
 return <main className="commerce-home"><section className="commerce-hero"><div><span>PLAY COMMERCE / 01</span><h1>DON&apos;T JUST<br/>BROWSE.<br/><em>PLAY YOUR LOOK.</em></h1><p>상품을 더 많이 보여주는 대신,<br/>선택의 과정을 더 재미있게 설계했습니다.</p><button onClick={enter}>ENTER PLAY <b>→</b></button></div><aside><div className="score-orbit"><span>MATCH SCORE</span><strong>86<small>%</small></strong><i>BASED ON 04 STYLE SIGNALS</i></div><StyleBars/><footer><span>BUILD</span><span>BATTLE</span><span>REVEAL</span><span>SHOP</span></footer></aside></section><section className="editorial-products"><header><div><span>LIVE PRODUCT DATA</span><h2>CURATED INPUTS</h2></div><p>상품 속성 태그가 PLAY의<br/>매칭 기준으로 연결됩니다.</p></header><div>{edits.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><small>{item.brand} · {item.category}</small><b>{item.name}</b><Tags items={item.tags.slice(0,2)}/><strong>{won(item.price)}</strong></article>)}</div></section><section className="play-principles"><div><span>01</span><b>CHOOSE LESS</b><p>전 상품 탐색 대신 맥락에 맞는 후보만 제시합니다.</p></div><div><span>02</span><b>COMPARE BETTER</b><p>브랜드보다 스타일 속성과 조합을 먼저 비교합니다.</p></div><div><span>03</span><b>SHOP WITH INTENT</b><p>선택한 LOOK을 기존 커머스 구매 흐름으로 연결합니다.</p></div></section></main>
}

function Build({audience,setAudience,selectedIds,setSelectedIds,onNext}:{audience:Audience;setAudience:(v:Audience)=>void;selectedIds:string[];setSelectedIds:(v:string[])=>void;onNext:()=>void}){
 const[category,setCategory]=useState<Category>("TOP");
 const items=PRODUCTS.filter(item=>item.category===category&&fits(item,audience));
 const selected=byIds(selectedIds);
 const picked=selected.find(item=>item.category===category);
 const choose=(item:Product)=>setSelectedIds([...selectedIds.filter(id=>byId(id)?.category!==item.category),item.id]);
 const swap=(item:Product)=>{const replacement=item.alternativeId&&byId(item.alternativeId);if(replacement)choose(replacement)};
 const complete=CATEGORIES.every(cat=>selected.some(item=>item.category===cat));
 return <div className="play-page"><section className="mission-line"><div><span>MISSION / 08.19</span><b>AFTER-WORK GALLERY OPENING</b></div><div><span>BUDGET</span><b>₩240,000</b></div><div><span>STYLE SIGNAL</span><b>MINIMAL × VINTAGE</b></div></section><section className="audience-switch"><span>STYLING MODE</span><button className={audience==="women"?"active":""} onClick={()=>{setAudience("women");setSelectedIds([])}}>WOMEN + UNISEX</button><button className={audience==="men"?"active":""} onClick={()=>{setAudience("men");setSelectedIds([])}}>MEN + UNISEX</button></section><nav className="category-nav">{CATEGORIES.map((cat,index)=><button key={cat} className={category===cat?"active":selected.some(item=>item.category===cat)?"done":""} onClick={()=>setCategory(cat)}><span>0{index+1}</span><b>{cat}</b><i>{selected.some(item=>item.category===cat)?"SELECTED":""}</i></button>)}</nav><div className="build-layout"><section className="product-select"><header><div><span>BUILD / {category}</span><h2>SELECT ONE ITEM</h2></div><b>{String(items.length).padStart(2,"0")} MATCHES</b></header>{items.length?<div className="product-grid">{items.map(item=><article key={item.id} className={`${picked?.id===item.id?"selected":""} ${!item.stock?"soldout":""}`}><div className="product-image"><img src={item.image} alt={item.name}/><span>{item.stock?picked?.id===item.id?"SELECTED":"IN STOCK":"SOLD OUT"}</span></div><small>{item.brand} · {item.category}</small><h3>{item.name}</h3><Tags items={item.tags}/><footer><b>{won(item.price)}</b>{item.stock?<button onClick={()=>choose(item)}>{picked?.id===item.id?"선택됨":"이 아이템 선택"}</button>:<button className="swap" onClick={()=>swap(item)}>대체 상품 적용 →</button>}</footer>{!item.stock&&<p className="stock-note">재고가 변경됐어요. 가장 유사한 스타일 속성의 대체 상품을 연결합니다.</p>}</article>)}</div>:<EmptyState onBack={()=>setCategory("TOP")}/>}</section><aside className="build-summary"><LookBoard items={selected}/><div className="build-total"><span>TOTAL / {selected.length} ITEMS</span><b>{won(total(selected))}</b></div><button disabled={!complete} onClick={onNext}>{complete?"BATTLE 시작하기 →":"4개 카테고리를 완성해주세요"}</button></aside></div></div>
}

function Battle({player,onChoose,onBack}:{player:Product[];onChoose:(choice:"A"|"B")=>void;onBack:()=>void}){
 const recommended=byIds(["ivory-top","cargo","windbreaker","canvas-tote"]);
 if(!player.length)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 return <div className="play-page"><header className="screen-title"><span>BATTLE / STYLE MATCH</span><h1>WHICH LOOK<br/>WORKS BETTER?</h1><p>브랜드보다 조합의 균형과 스타일 신호를 먼저 비교하세요.</p></header><div className="battle-grid"><article><div className="battle-label"><span>LOOK A</span><b>YOUR BUILD</b></div><LookBoard items={player} label="LOOK A / YOUR BUILD"/><StyleBars variant="player"/><button onClick={()=>onChoose("A")}>LOOK A 선택 →</button></article><div className="match-core"><span>MATCH</span><strong>84<small>%</small></strong><i>04 SIGNALS<br/>03 SHARED TAGS</i></div><article><div className="battle-label"><span>LOOK B</span><b>SYSTEM EDIT</b></div><LookBoard items={recommended} label="LOOK B / SYSTEM EDIT"/><StyleBars variant="recommend"/><button onClick={()=>onChoose("B")}>LOOK B 선택 →</button></article></div></div>
}

function Reveal({items,choice,onShop,onBack}:{items:Product[];choice:"A"|"B"|null;onShop:()=>void;onBack:()=>void}){
 if(!items.length||!choice)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 const tags=[...new Set(items.flatMap(item=>item.tags))].slice(0,6);
 return <div className="play-page"><header className="screen-title"><span>REVEAL / FINAL EDIT</span><h1>YOUR STYLE,<br/>RESOLVED.</h1><p>선택한 조합을 상품 속성과 스타일 태그로 다시 읽었습니다.</p></header><div className="reveal-layout"><LookBoard items={items} label={`FINAL LOOK ${choice}`}/><aside><span>FINAL MATCH SCORE</span><strong>88<small>%</small></strong><h2>MINIMAL<br/>WITH VINTAGE EDGE</h2><Tags items={tags}/><StyleBars variant={choice==="A"?"player":"recommend"}/><div className="reveal-products">{items.map(item=><div key={item.id}><span>{item.brand} · {item.category}</span><b>{item.name}</b><strong>{won(item.price)}</strong></div>)}</div><button onClick={onShop}>SHOP THIS LOOK →</button></aside></div></div>
}

function Shop({initialItems,onReturn,onBack}:{initialItems:Product[];onReturn:(ids:string[])=>void;onBack:()=>void}){
 const[itemIds,setItemIds]=useState(initialItems.map(item=>item.id));
 const[selected,setSelected]=useState(initialItems.filter(item=>item.stock).map(item=>item.id));
 const items=byIds(itemIds);
 const swap=(item:Product)=>{if(!item.alternativeId)return;setItemIds(itemIds.map(id=>id===item.id?item.alternativeId!:id));setSelected([...selected.filter(id=>id!==item.id),item.alternativeId])};
 const active=items.filter(item=>selected.includes(item.id)&&item.stock);
 if(!items.length)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 return <div className="play-page"><header className="screen-title shop-title"><span>SHOP / COMMERCE HANDOFF</span><h1>SHOP THE<br/>FINAL EDIT.</h1><p>LOOK 전체를 한 번에 담거나 필요한 상품만 개별로 선택하세요.</p></header><div className="shop-layout"><LookBoard items={items} label="FINAL EDIT / PRODUCT LIST"/><aside><header><span>SELECT PRODUCTS</span><b>{active.length} / {items.length}</b></header><div className="shop-list">{items.map(item=><article key={item.id} className={!item.stock?"unavailable":""}><input type="checkbox" aria-label={`${item.name} 선택`} checked={selected.includes(item.id)} disabled={!item.stock} onChange={()=>setSelected(selected.includes(item.id)?selected.filter(id=>id!==item.id):[...selected,item.id])}/><img src={item.image} alt=""/><div><small>{item.brand} · {item.category}</small><b>{item.name}</b><Tags items={item.tags.slice(0,2)}/></div><strong>{won(item.price)}</strong>{item.stock?<button onClick={()=>onReturn([item.id])}>이 상품만 담기</button>:<button className="swap" onClick={()=>swap(item)}>대체 상품 적용</button>}{!item.stock&&<p>품절됨 · 같은 스타일 태그의 대체 상품을 추천합니다.</p>}</article>)}</div><div className="shop-summary"><span>TOTAL · {active.length} ITEMS</span><b>{won(total(active))}</b></div><button className="bulk-cta" disabled={!active.length} onClick={()=>onReturn(active.map(item=>item.id))}>선택 상품 전체 장바구니에 담기 →</button><p className="handoff-note">결제 · 쿠폰 · 배송은 기존 커머스에서 이어집니다.</p></aside></div></div>
}

export default function Muse(){
 const[screen,setScreen]=useState<Screen>("commerce");
 const[audience,setAudience]=useState<Audience>("women");
 const[selectedIds,setSelectedIds]=useState<string[]>([]);
 const[battleChoice,setBattleChoice]=useState<"A"|"B"|null>(null);
 const[cartIds,setCartIds]=useState<string[]>([]);
 const recommended=useMemo(()=>audience==="women"?byIds(["red-knit","cargo","windbreaker","mini-boston"]):byIds(["rugby","work-pants","utility-jacket","record-bag"]),[audience]);
 const player=byIds(selectedIds);
 const finalItems=battleChoice==="B"?recommended:player;
 const go=(next:Screen)=>{setScreen(next);window.scrollTo({top:0,behavior:"smooth"})};
 const enter=()=>{setSelectedIds([]);setBattleChoice(null);go("build")};
 const exit=(ids:string[]=[])=>{setCartIds(ids);setScreen("commerce");window.scrollTo({top:0,behavior:"smooth"})};
 if(screen==="commerce")return <><header className="commerce-nav"><button className="logo" onClick={()=>setCartIds([])}>FASHION<br/>COMMERCE</button><nav><button>NEW</button><button>RANKING</button><button className="play-badge" onClick={enter}>PLAY <span>CORE</span></button><button>SEARCH</button><button>MY</button></nav><button className="bag">BAG {cartIds.length}</button></header><CommerceHome enter={enter} cartItems={byIds(cartIds)} clearCart={()=>setCartIds([])}/></>;
 return <main className="play-shell"><PlayHeader screen={screen} onExit={()=>exit()}/>{screen==="build"&&<Build audience={audience} setAudience={setAudience} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onNext={()=>go("battle")}/>} {screen==="battle"&&<Battle player={player} onBack={()=>go("build")} onChoose={choice=>{setBattleChoice(choice);go("reveal")}}/>} {screen==="reveal"&&<Reveal items={finalItems} choice={battleChoice} onBack={()=>go("battle")} onShop={()=>go("shop")}/>} {screen==="shop"&&<Shop initialItems={finalItems} onBack={()=>go("reveal")} onReturn={exit}/>}</main>
}
