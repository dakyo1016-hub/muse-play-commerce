"use client";

import {useEffect,useMemo,useState} from "react";

type Screen="commerce"|"build"|"battle"|"reveal"|"shop";
type Category="TOP"|"BOTTOM"|"OUTER"|"SHOES"|"BAG";
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
 {id:"cream-platform",category:"SHOES",brand:"FORME",name:"Cream Platform Sneakers",price:64000,color:"CREAM",image:"/catalog/accessory-01.jpg",audience:"unisex",tags:["Y2K","플랫폼","크림"],stock:true},
 {id:"silver-runner",category:"SHOES",brand:"VETA ACTIVE",name:"Silver Runner Sneakers",price:79000,color:"SILVER",image:"/catalog/accessory-02.jpg",audience:"unisex",tags:["스포티","테크","실버"],stock:true},
 {id:"penny-loafer",category:"SHOES",brand:"FORME",name:"Classic Penny Loafer",price:64000,color:"BLACK",image:"/catalog/accessory-03.jpg",audience:"unisex",tags:["클래식","미니멀","블랙"],stock:true},
 {id:"strap-sandal",category:"SHOES",brand:"MARÉE",name:"Chunky Strap Sandal",price:59000,color:"TAUPE",image:"/catalog/accessory-04.jpg",audience:"women",tags:["캐주얼","플랫폼","토프"],stock:true},
 {id:"suede-derby",category:"SHOES",brand:"COMMON TYPE",name:"Brown Suede Derby",price:72000,color:"BROWN",image:"/catalog/accessory-05.jpg",audience:"men",tags:["빈티지","클래식","브라운"],stock:true},
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

const CATEGORIES:Category[]=["TOP","BOTTOM","SHOES","BAG"];
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

function LookBoard({items,label="SELECTED LOOK",emptyCopy="카테고리별 상품을 선택하면 이곳에 LOOK이 쌓입니다.",audience}:{items:Product[];label?:string;emptyCopy?:string;audience?:Audience}){
 const playable=items.filter(item=>CATEGORIES.includes(item.category));
 const player=audience??(items.some(item=>item.audience==="men")?"men":"women");
 return <section className="look-board"><header><b>{label}</b><span>{String(playable.length).padStart(2,"0")} / 04 ITEMS</span></header><div className={`look-compose ${playable.length?"has-items":"is-empty"}`}><img className="look-model" src={player==="men"?"/ren-mascot-3d-final.png":"/miyu-mascot-3d-v4.png"} alt={player==="men"?"렌 전신 캐릭터":"미유 전신 캐릭터"}/>{CATEGORIES.map(cat=>{const item=playable.find(product=>product.category===cat);return item?<figure key={item.id} className={`look-layer ${cat.toLowerCase()}`}><img src={item.image} alt={item.name}/><figcaption><small>{cat}</small><b>{item.name}</b></figcaption></figure>:<div key={cat} className={`look-slot ${cat.toLowerCase()}`}><span>+ {cat}</span></div>})}{!playable.length&&<div className="look-empty-copy"><span>START YOUR LOOK</span><p>{emptyCopy}</p></div>}</div><footer>FULL BODY · CUTOUT LAYER PREVIEW</footer></section>
}

function StyleBars({variant="player",items=[]}:{variant?:"player"|"recommend";items?:Product[]}){
 const tags=items.flatMap(item=>item.tags);
 const score=(signals:string[],fallback:number)=>items.length?Math.min(94,32+tags.filter(tag=>signals.includes(tag)).length*16):fallback;
 const rows:[string,number][]=variant==="player"?[["MINIMAL",score(["미니멀","클린","데일리"],68)],["STREET",score(["스트릿","스포티","테크","오버핏"],42)],["VINTAGE",score(["빈티지","Y2K","워크웨어","프레피"],56)]]:[["MINIMAL",score(["미니멀","클린","데일리"],82)],["STREET",score(["스트릿","스포티","테크","오버핏"],31)],["VINTAGE",score(["빈티지","Y2K","워크웨어","프레피"],64)]];
 return <div className="style-bars">{rows.map(([label,value])=><div key={label}><span>{label}</span><i><em style={{width:`${value}%`}}/></i><b>{value}%</b></div>)}</div>
}

function EmptyState({onBack}:{onBack:()=>void}){
 return <section className="system-empty"><div className="empty-face">×﹏×</div><span>OOPS! NO MATCH / 00</span><h2>음, 이 조합은 데이터베이스에 없네요!</h2><p>괜찮아요. 아이템 하나만 바꾸면<br/>새로운 매치가 바로 시작돼요.</p><button onClick={onBack}>다시 코디하러 가기 ↻</button></section>
}

function PlayHeader({screen,onExit}:{screen:Screen;onExit:()=>void}){
 return <><header className="play-header"><button onClick={onExit}>← SHOP</button><div><b>MUSE ★ PLAY</b><span>SHOPPING AS A GAME</span></div><strong>PLAYER 01 · ONLINE</strong></header><FlowSteps screen={screen}/></>
}

function MissionStory({audience}:{audience:Audience}){
 return <section className="mission-story"><div className="mission-character"><img src={audience==="men"?"/ren-mascot-3d-final.png":"/miyu-mascot-3d-v4.png"} alt={audience==="men"?"미션 가이드 렌":"미션 가이드 미유"}/><span>MISSION GUIDE · {audience==="men"?"REN":"MIYU"}</span></div><div className="mission-copy"><small>FRIDAY · 7PM / DAILY MISSION</small><h1>갑자기 잡힌<br/>첫 소개팅</h1><p>20만원 안으로 편안하지만 기억에 남는<br/>성수 데이트 LOOK을 완성해보세요.</p></div><aside><span>BUDGET</span><strong>₩200,000</strong><i/><span>SPECIAL RULE</span><b>NO BLACK</b><p>검은색 아이템 없이 완성하세요.</p></aside></section>
}

function CommerceHome({enter,cartItems,clearCart}:{enter:()=>void;cartItems:Product[];clearCart:()=>void}){
 const edits=byIds(["red-knit","ivory-top","rugby","cargo","relaxed-denim","cream-platform","silver-runner","penny-loafer","baguette","canvas-tote"]);
 if(cartItems.length)return <main className="commerce-return"><span>RETURNED FROM MUSE PLAY</span><h1>선택한 LOOK을<br/>기존 장바구니로 가져왔어요.</h1><div className="return-grid">{cartItems.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><small>{item.brand} · {item.category}</small><b>{item.name}</b><strong>{won(item.price)}</strong></article>)}</div><footer><p><span>{cartItems.length} ITEMS</span><b>{won(total(cartItems))}</b></p><button onClick={clearCart}>쇼핑 계속하기 →</button></footer></main>;
 return <main className="commerce-home"><section className="commerce-hero"><div><div className="hero-stickers"><i>NEW GAME!</i><i>STYLE QUEST</i></div><span>MUSE PLAY · LEVEL 01</span><h1>BUILD.<br/><em>BATTLE.</em><br/>REVEAL.<br/><mark>SHOP!</mark></h1><p>옷을 고르고, 코디로 붙고, 내 취향을 발견해요.<br/>쇼핑이 오늘의 스타일 게임이 됩니다.</p><button onClick={enter}>ENTER PLAY <b>START →</b></button></div><aside><div className="hero-guide-card"><figure><img src="/miyu-y2k-guide.png" alt="MUSE 게임 가이드 미유"/><span>MIYU</span></figure><div><i>GUIDE MESSAGE</i><b>오늘 뭐 입지?<br/>게임으로 골라봐!</b><p>#Y2K　#MINIMAL　#PLAY</p></div></div><div className="score-orbit"><span>STYLE MATCH</span><strong>86<small>%</small></strong><i>READY TO LEVEL UP?</i></div><footer><span>① BUILD</span><span>② BATTLE</span><span>③ REVEAL</span><span>④ SHOP</span></footer></aside></section><section className="muse-play-zone"><div className="play-zone-copy"><span>★ FEATURED GAME</span><h2>MUSE<br/>PLAY</h2><p>네 번의 선택으로 완성되는<br/>나만의 패션 퀘스트.</p><button onClick={enter}>ENTER PLAY NOW <b>→</b></button></div><div className="guide-cards"><article><img src="/miyu-y2k-guide.png" alt="미유"/><div><span>PLAYER TYPE 01</span><b>MIYU · Y2K MINIMAL</b><p>“트렌드보다 나한테 맞는 게 중요해!”</p></div></article><article><img src="/ren-y2k-guide.png" alt="렌"/><div><span>PLAYER TYPE 02</span><b>REN · CLEAN VINTAGE</b><p>“디테일에서 승부가 갈려.”</p></div></article></div></section><section className="editorial-products"><header><div><span>ITEM DROP / LIVE</span><h2>CHOOSE YOUR ITEMS</h2></div><p>스타일 태그를 조합하면<br/>새로운 매치 스코어가 열려요.</p></header><div>{edits.map((item,index)=><article key={item.id}><div className="item-level">LV.{index+2}</div><img src={item.image} alt={item.name}/><small>{item.brand} · {item.category}</small><b>{item.name}</b><Tags items={item.tags.slice(0,2)}/><strong>{won(item.price)}</strong><i>+ ADD ITEM</i></article>)}</div></section><section className="play-principles"><div><span>01</span><b>BUILD YOUR LOOK</b><p>카테고리별 아이템을 골라 코디 슬롯을 채워요.</p></div><div><span>02</span><b>BATTLE & MATCH</b><p>추천 코디와 스타일 스탯을 비교해 승자를 골라요.</p></div><div><span>03</span><b>REVEAL & SHOP</b><p>발견한 취향과 실제 상품을 한 번에 가져가요.</p></div></section></main>
}

function Build({audience,setAudience,selectedIds,setSelectedIds,onNext}:{audience:Audience;setAudience:(v:Audience)=>void;selectedIds:string[];setSelectedIds:(v:string[])=>void;onNext:()=>void}){
 const[category,setCategory]=useState<Category>("TOP");
 const items=PRODUCTS.filter(item=>item.category===category&&fits(item,audience));
 const selected=byIds(selectedIds);
 const picked=selected.find(item=>item.category===category);
 const choose=(item:Product)=>setSelectedIds([...selectedIds.filter(id=>byId(id)?.category!==item.category),item.id]);
 const swap=(item:Product)=>{const replacement=item.alternativeId&&byId(item.alternativeId);if(replacement)choose(replacement)};
 const complete=CATEGORIES.every(cat=>selected.some(item=>item.category===cat));
 return <div className="play-page"><section className="play-onboarding"><b>HOW TO PLAY</b><span>① 미션 확인</span><span>② TOP · BOTTOM · SHOES · BAG 선택</span><span>③ 전신 코디를 비교하고 BATTLE 시작</span></section><MissionStory audience={audience}/><section className="audience-switch"><span>SELECT PLAYER MODE</span><button className={audience==="women"?"active":""} onClick={()=>{setAudience("women");setSelectedIds([])}}>WOMEN + UNISEX</button><button className={audience==="men"?"active":""} onClick={()=>{setAudience("men");setSelectedIds([])}}>MEN + UNISEX</button></section><nav className="category-nav">{CATEGORIES.map((cat,index)=><button key={cat} className={category===cat?"active":selected.some(item=>item.category===cat)?"done":""} onClick={()=>setCategory(cat)}><span>0{index+1}</span><b>{cat}</b><i>{selected.some(item=>item.category===cat)?"✓ GET":""}</i></button>)}</nav><div className="build-layout"><section className="product-select"><header><div><span>ITEM SLOT / {category}</span><h2>PICK YOUR FAVE!</h2></div><b>{String(items.length).padStart(2,"0")} ITEMS FOUND</b></header>{items.length?<div className="product-grid">{items.map(item=><article key={item.id} className={`${picked?.id===item.id?"selected":""} ${!item.stock?"soldout":""}`}><div className="product-image"><img src={item.image} alt={item.name}/><span>{item.stock?picked?.id===item.id?"★ EQUIPPED":"GET ITEM":"품절"}</span></div><small>{item.brand} · {item.category}</small><h3>{item.name}</h3><Tags items={item.tags}/><footer><b>{won(item.price)}</b>{item.stock?<button onClick={()=>choose(item)}>{picked?.id===item.id?"장착 완료 ✓":"장착하기 +"}</button>:<button className="swap" onClick={()=>swap(item)}>비슷한 스타일 추천 →</button>}</footer>{!item.stock&&<p className="stock-note">앗, 품절이에요! 같은 무드의 대체 아이템을 바로 추천할게요.</p>}</article>)}</div>:<EmptyState onBack={()=>setCategory("TOP")}/>}</section><aside className="build-summary"><div className="guide-tip"><img src={audience==="men"?"/ren-y2k-guide.png":"/miyu-y2k-guide.png"} alt={audience==="men"?"렌":"미유"}/><p><b>{audience==="men"?"REN":"MIYU"} TIP</b><span>{selected.length?`지금 선택은 ${selected.at(-1)?.tags[0]} 무드네요. 전신 미리보기로 밸런스를 확인해봐요.`:"첫 아이템을 골라 전신 코디를 시작해봐요."}</span></p></div><LookBoard items={selected} label="MY FULL-BODY LOOK" audience={audience}/><div className="build-total"><span>COINS / {selected.length} ITEMS</span><b>{won(total(selected))}</b></div><button disabled={!complete} onClick={onNext}>{complete?"조합 완성! BATTLE GO →":`아이템 슬롯 ${selected.length}/4`}</button></aside></div></div>
}

function Battle({player,audience,onChoose,onBack}:{player:Product[];audience:Audience;onChoose:(choice:"A"|"B")=>void;onBack:()=>void}){
 const recommended=audience==="women"?byIds(["ivory-top","cargo","cream-platform","canvas-tote"]):byIds(["rugby","work-pants","silver-runner","record-bag"]);
 if(!player.length)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 const playerTags=new Set(player.flatMap(item=>item.tags));
 const recommendedTags=new Set(recommended.flatMap(item=>item.tags));
 const shared=[...playerTags].filter(tag=>recommendedTags.has(tag)).length;
 const matchScore=Math.min(96,68+shared*6);
 return <div className="play-page"><header className="screen-title"><span>STYLE BATTLE / ROUND 01</span><h1>YOUR LOOK<br/>VS. MUSE PICK</h1><p>첫 소개팅 미션에 더 잘 맞는 전신 LOOK을 골라주세요.</p></header><div className="battle-guide"><img src="/ren-y2k-guide.png" alt="렌"/><p><b>REN&apos;S BATTLE CHECK</b><span>상품 태그를 분석해 두 LOOK의 무드와 공통 취향을 계산했어. 과하지 않게, 기억에 남는 쪽은 어느 쪽일까?</span></p></div><div className="battle-grid"><article><div className="battle-label"><span>PLAYER LOOK A</span><b>YOUR BUILD</b></div><LookBoard items={player} label="LOOK A / PLAYER 01" audience={audience}/><StyleBars variant="player" items={player}/><button onClick={()=>onChoose("A")}>LOOK A로 승부 →</button></article><div className="match-core"><span>MATCH POWER</span><strong>{matchScore}<small>%</small></strong><i>COMBO × {String(player.length).padStart(2,"0")}<br/>SHARED TAG × {String(shared).padStart(2,"0")}</i></div><article><div className="battle-label"><span>CHALLENGER B</span><b>MUSE PICK</b></div><LookBoard items={recommended} label="LOOK B / MUSE PICK" audience={audience}/><StyleBars variant="recommend" items={recommended}/><button onClick={()=>onChoose("B")}>LOOK B로 승부 →</button></article></div></div>
}

function Reveal({items,choice,audience,onShop,onBack}:{items:Product[];choice:"A"|"B"|null;audience:Audience;onShop:()=>void;onBack:()=>void}){
 if(!items.length||!choice)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 const tags=[...new Set(items.flatMap(item=>item.tags))].slice(0,6);
 const finalScore=Math.min(98,70+tags.length*4);
 return <div className="play-page"><header className="screen-title"><span>REVEAL / MISSION COMPLETE</span><h1>오늘의 소개팅 LOOK,<br/>완성됐어요.</h1><p>선택한 조합에서 오늘의 취향 태그를 발견했어요.</p></header><div className="reveal-layout"><LookBoard items={items} label={`WINNING LOOK ${choice}`} audience={audience}/><aside><div className="level-clear">MISSION CLEAR</div><span>FINAL MATCH SCORE</span><strong>{finalScore}<small>%</small></strong><h2>Y2K MINIMAL<br/>+ VINTAGE EDGE</h2><Tags items={tags}/><StyleBars variant={choice==="A"?"player":"recommend"} items={items}/><div className="reveal-products">{items.map(item=><div key={item.id}><span>{item.brand} · {item.category}</span><b>{item.name}</b><strong>{won(item.price)}</strong></div>)}</div><div className="reveal-total"><span>TOTAL PRICE</span><b>{won(total(items))}</b></div><div className="guide-tip reveal-tip"><img src={audience==="men"?"/ren-y2k-guide.png":"/miyu-y2k-guide.png"} alt={audience==="men"?"렌":"미유"}/><p><b>{audience==="men"?"REN":"MIYU"} SAYS</b><span>편안하지만 디테일이 살아 있어요. 이 LOOK으로 미션을 마무리할까요?</span></p></div><button onClick={onShop}>이 LOOK 쇼핑하기 →</button></aside></div></div>
}

function Shop({initialItems,audience,onReturn,onBack}:{initialItems:Product[];audience:Audience;onReturn:(ids:string[])=>void;onBack:()=>void}){
 const[itemIds,setItemIds]=useState(initialItems.map(item=>item.id));
 const[selected,setSelected]=useState(initialItems.filter(item=>item.stock).map(item=>item.id));
 const items=byIds(itemIds);
 const swap=(item:Product)=>{if(!item.alternativeId)return;setItemIds(itemIds.map(id=>id===item.id?item.alternativeId!:id));setSelected([...selected.filter(id=>id!==item.id),item.alternativeId])};
 const active=items.filter(item=>selected.includes(item.id)&&item.stock);
 if(!items.length)return <div className="play-page"><EmptyState onBack={onBack}/></div>;
 return <div className="play-page"><header className="screen-title shop-title"><span>FINAL STAGE / SHOP</span><h1>GET THE<br/>WINNING LOOK</h1><p>코디 세트를 한 번에 담거나 원하는 아이템만 추가하세요.</p></header><div className="shop-layout"><LookBoard items={items} label="FINAL LOOK / INVENTORY" audience={audience}/><aside><header><span>CHOOSE YOUR LOOK ITEMS</span><b>{active.length} / {items.length}</b></header><div className="shop-list">{items.map(item=><article key={item.id} className={!item.stock?"unavailable":""}><input type="checkbox" aria-label={`${item.name} 선택`} checked={selected.includes(item.id)} disabled={!item.stock} onChange={()=>setSelected(selected.includes(item.id)?selected.filter(id=>id!==item.id):[...selected,item.id])}/><img src={item.image} alt=""/><div><small>{item.brand} · {item.category}</small><b>{item.name}</b><Tags items={item.tags.slice(0,2)}/></div><strong>{won(item.price)}</strong>{item.stock?<button onClick={()=>onReturn([item.id])}>+ 개별 추가</button>:<button className="swap" onClick={()=>swap(item)}>비슷한 스타일 추천</button>}{!item.stock&&<p>품절 아이템이에요! 같은 태그의 대체 아이템을 불러왔어요.</p>}</article>)}</div><div className="shop-summary"><span>SET TOTAL · {active.length} ITEMS</span><b>{won(total(active))}</b></div><button className="bulk-cta" disabled={!active.length} onClick={()=>onReturn(active.map(item=>item.id))}>코디 세트 한 번에 담기 →</button><p className="handoff-note">CHECKOUT은 기존 커머스에서 안전하게 이어집니다.</p></aside></div></div>
}

export default function Muse({initialScreen="commerce"}:{initialScreen?:Screen}){
 const[screen,setScreen]=useState<Screen>(initialScreen);
 const[audience,setAudience]=useState<Audience>("women");
 const[selectedIds,setSelectedIds]=useState<string[]>([]);
 const[battleChoice,setBattleChoice]=useState<"A"|"B"|null>(null);
 const[cartIds,setCartIds]=useState<string[]>([]);
 const recommended=useMemo(()=>audience==="women"?byIds(["ivory-top","cargo","cream-platform","baguette"]):byIds(["rugby","work-pants","silver-runner","record-bag"]),[audience]);
 const player=byIds(selectedIds);
 const finalItems=battleChoice==="B"?recommended:player;
 useEffect(()=>{if(initialScreen==="commerce"){const cart=new URLSearchParams(window.location.search).get("cart");if(cart)setCartIds(cart.split(",").filter(Boolean))}},[initialScreen]);
 const go=(next:Screen)=>{setScreen(next);window.scrollTo({top:0,behavior:"smooth"})};
 const enter=()=>{window.location.assign("/play")};
 const exit=(ids:string[]=[])=>{if(initialScreen!=="commerce"){window.location.assign(ids.length?`/?cart=${ids.join(",")}`:"/");return}setCartIds(ids);setScreen("commerce");window.scrollTo({top:0,behavior:"smooth"})};
 if(screen==="commerce")return <><header className="commerce-nav"><button className="logo" onClick={()=>setCartIds([])}>MUSE <span>— SHOPPING AS A GAME</span></button><nav><button>ITEMS</button><button>RANKING</button><button className="play-badge" onClick={enter}>★ PLAY <span>HOT</span></button><button>QUEST</button><button>MY</button></nav><button className="bag">BAG {cartIds.length}</button></header><CommerceHome enter={enter} cartItems={byIds(cartIds)} clearCart={()=>setCartIds([])}/></>;
 return <main className="play-shell"><PlayHeader screen={screen} onExit={()=>exit()}/>{screen==="build"&&<Build audience={audience} setAudience={setAudience} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onNext={()=>go("battle")}/>} {screen==="battle"&&<Battle player={player} audience={audience} onBack={()=>go("build")} onChoose={choice=>{setBattleChoice(choice);go("reveal")}}/>} {screen==="reveal"&&<Reveal items={finalItems} choice={battleChoice} audience={audience} onBack={()=>go("battle")} onShop={()=>go("shop")}/>} {screen==="shop"&&<Shop initialItems={finalItems} audience={audience} onBack={()=>go("reveal")} onReturn={exit}/>}</main>
}
