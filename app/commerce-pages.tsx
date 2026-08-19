"use client";

import {useEffect,useMemo,useState} from "react";

type Kind="items"|"ranking"|"quest"|"my"|"bag";
type Item={id:string;category:"TOP"|"BOTTOM"|"SHOES"|"BAG";brand:string;name:string;price:number;image:string;tags:string[]};

const ITEMS:Item[]=[
 {id:"ivory-top",category:"TOP",brand:"FORME",name:"Ivory Layered Top",price:39000,image:"/catalog/women-01.jpg",tags:["미니멀","레이어드"]},
 {id:"soft-rib",category:"TOP",brand:"LAYER",name:"Soft Rib Henley Tee",price:42000,image:"/catalog/street-01.jpg",tags:["빈티지","데일리"]},
 {id:"rugby",category:"TOP",brand:"NORTH INDEX",name:"Stripe Rugby Shirt",price:54000,image:"/catalog/street-03.jpg",tags:["스포티","프레피"]},
 {id:"cargo",category:"BOTTOM",brand:"LAYER",name:"Wide Pocket Cargo",price:49000,image:"/catalog/street-13.jpg",tags:["스트릿","오버핏"]},
 {id:"relaxed-denim",category:"BOTTOM",brand:"BLUE HOUR",name:"Relaxed Blue Jeans",price:65000,image:"/catalog/street-14.jpg",tags:["캐주얼","와이드"]},
 {id:"work-pants",category:"BOTTOM",brand:"COMMON TYPE",name:"Washed Work Pants",price:57000,image:"/catalog/street-12.jpg",tags:["워크웨어","빈티지"]},
 {id:"cream-platform",category:"SHOES",brand:"FORME",name:"Cream Platform Sneakers",price:64000,image:"/catalog/accessory-01.jpg",tags:["Y2K","플랫폼"]},
 {id:"silver-runner",category:"SHOES",brand:"VETA ACTIVE",name:"Silver Runner Sneakers",price:79000,image:"/catalog/accessory-02.jpg",tags:["스포티","테크"]},
 {id:"penny-loafer",category:"SHOES",brand:"FORME",name:"Classic Penny Loafer",price:64000,image:"/catalog/accessory-03.jpg",tags:["클래식","미니멀"]},
 {id:"baguette",category:"BAG",brand:"MARÉE",name:"Soft Baguette Bag",price:39000,image:"/catalog/accessory-09.jpg",tags:["빈티지","컴팩트"]},
 {id:"nylon-cross",category:"BAG",brand:"VETA ACTIVE",name:"Nylon Cross Bag",price:43000,image:"/catalog/accessory-11.jpg",tags:["테크","유틸리티"]},
 {id:"canvas-tote",category:"BAG",brand:"COMMON TYPE",name:"Structured Canvas Tote",price:36000,image:"/catalog/accessory-12.jpg",tags:["클린","데일리"]},
];

const won=(value:number)=>`₩${value.toLocaleString("ko-KR")}`;

function Nav({active,cartCount=0}:{active:Kind;cartCount?:number}){
 const entries:[string,string][]=[["ITEMS","/items"],["RANKING","/ranking"],["★ PLAY","/play"],["QUEST","/quest"],["MY","/my"]];
 return <header className="commerce-nav section-nav"><a className="logo" href="/">MUSE <span>— SHOPPING AS A GAME</span></a><nav>{entries.map(([label,path])=><a key={path} href={path} className={`${path.slice(1)===active?"current":""} ${path==="/play"?"play-badge":""}`}>{label}{path==="/play"&&<span>HOT</span>}</a>)}</nav><a className={`bag ${active==="bag"?"current":""}`} href="/bag">BAG {cartCount}</a></header>
}

function Header({eyebrow,title,copy}:{eyebrow:string;title:string;copy:string}){
 return <header className="section-hero"><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></header>
}

function ItemCard({item}:{item:Item}){
 return <article className="archive-card"><img src={item.image} alt={item.name}/><small>{item.brand} · {item.category}</small><h3>{item.name}</h3><div>{item.tags.map(tag=><span key={tag}>#{tag}</span>)}</div><footer><b>{won(item.price)}</b><a href="/play">PLAY에서 조합 →</a></footer></article>
}

function ItemsPage(){
 const[filter,setFilter]=useState("ALL");
 const visible=filter==="ALL"?ITEMS:ITEMS.filter(item=>item.category===filter);
 return <><Nav active="items"/><main className="section-page"><Header eyebrow="ITEM ARCHIVE · 12 PRODUCTS" title="취향 태그로 찾는 아이템" copy="실제 상품 데이터를 스타일 태그로 탐색하고, 마음에 든 아이템은 PLAY에서 바로 조합해보세요."/><div className="archive-filter">{["ALL","TOP","BOTTOM","SHOES","BAG"].map(value=><button key={value} className={filter===value?"active":""} onClick={()=>setFilter(value)}>{value}</button>)}</div><section className="archive-grid">{visible.map(item=><ItemCard key={item.id} item={item}/>)}</section></main></>
}

function RankingPage(){
 const[range,setRange]=useState<"WEEKLY"|"TODAY">("WEEKLY");
 const looks=range==="WEEKLY"?[
  {rank:"01",name:"SOFT CITY DATE",score:96,image:"/miyu-mascot-3d-v4.png",tags:"#미니멀 #Y2K"},
  {rank:"02",name:"CLEAN VINTAGE",score:92,image:"/ren-mascot-3d-final.png",tags:"#빈티지 #클린"},
  {rank:"03",name:"SILVER STREET",score:89,image:"/catalog/street-24.jpg",tags:"#테크 #스트릿"},
 ]:[
  {rank:"01",name:"LILAC AFTERNOON",score:94,image:"/miyu-mascot-3d-v4.png",tags:"#소프트 #데이트"},
  {rank:"02",name:"NAVY RECORD CLUB",score:91,image:"/ren-mascot-3d-final.png",tags:"#프레피 #빈티지"},
  {rank:"03",name:"CREAM LAYER",score:87,image:"/catalog/women-01.jpg",tags:"#미니멀 #레이어드"},
 ];
 return <><Nav active="ranking"/><main className="section-page"><Header eyebrow="STYLE RANKING · LIVE" title="지금 가장 많이 선택된 LOOK" copy="유저의 선택과 태그 매치 점수를 기준으로 집계된 MUSE PLAY 랭킹입니다."/><div className="ranking-tabs"><button className={range==="WEEKLY"?"active":""} onClick={()=>setRange("WEEKLY")}>WEEKLY</button><button className={range==="TODAY"?"active":""} onClick={()=>setRange("TODAY")}>TODAY</button></div><section className="ranking-grid">{looks.map(look=><article key={look.rank}><span>RANK {look.rank}</span><img src={look.image} alt={look.name}/><div><small>{look.tags}</small><h2>{look.name}</h2><strong>{look.score}<i>% MATCH</i></strong><a href="/play">이 LOOK에 도전 →</a></div></article>)}</section></main></>
}

function QuestPage(){
 const quests=[
  {time:"FRIDAY · 7PM",title:"갑자기 잡힌 첫 소개팅",rule:"₩200,000 · NO BLACK",progress:"OPEN",tone:"purple"},
  {time:"SATURDAY · 2PM",title:"성수 팝업 스토어 오픈런",rule:"₩180,000 · ONE SILVER ITEM",progress:"NEXT",tone:"blue"},
  {time:"SUNDAY · 11AM",title:"친구들과 브런치 약속",rule:"₩150,000 · SOFT COLOR",progress:"LOCKED",tone:"cream"},
 ];
 return <><Nav active="quest"/><main className="section-page"><Header eyebrow="DAILY STYLE QUEST" title="상황을 고르면 쇼핑이 시작돼요" copy="예산과 특별 규칙이 있는 미션을 플레이하고, 실제 상품으로 나만의 답을 만들어보세요."/><section className="quest-grid">{quests.map((quest,index)=><article key={quest.title} className={quest.tone}><span>MISSION 0{index+1} · {quest.progress}</span><small>{quest.time}</small><h2>{quest.title}</h2><p>{quest.rule}</p>{quest.progress==="OPEN"?<a href="/play">미션 시작하기 →</a>:<button disabled>{quest.progress==="LOCKED"?"아직 잠겨 있어요":"다음 미션"}</button>}</article>)}</section></main></>
}

function MyPage(){
 return <><Nav active="my"/><main className="section-page"><Header eyebrow="MY MUSE · PLAYER 01" title="나의 선택이 취향 데이터가 됩니다" copy="플레이 기록, 저장한 LOOK, 자주 선택한 태그를 한 화면에서 확인하세요."/><section className="my-layout"><article className="profile-card"><img src="/miyu-y2k-guide.png" alt="프로필 캐릭터"/><div><span>LEVEL 07</span><h2>PLAYER 01</h2><p>8 GAMES · 5 SAVED LOOKS</p><a href="/play">새 미션 시작 →</a></div></article><article className="dna-card"><span>MY STYLE DNA</span>{[["MINIMAL",78],["VINTAGE",65],["STREET",42],["Y2K",71]].map(([name,value])=><div key={name}><small>{name}</small><i><em style={{width:`${value}%`}}/></i><b>{value}%</b></div>)}</article><article className="saved-card"><span>RECENTLY SAVED</span><div>{ITEMS.slice(0,4).map(item=><img key={item.id} src={item.image} alt={item.name}/>)}</div><a href="/items">저장한 아이템 보기 →</a></article></section></main></>
}

function BagPage(){
 const[ids,setIds]=useState<string[]>([]);
 const[ordered,setOrdered]=useState(false);
 useEffect(()=>{const cart=new URLSearchParams(window.location.search).get("cart");if(cart)setIds(cart.split(",").filter(Boolean))},[]);
 const items=useMemo(()=>ids.map(id=>ITEMS.find(item=>item.id===id)).filter(Boolean) as Item[],[ids]);
 const sum=items.reduce((value,item)=>value+item.price,0);
 return <><Nav active="bag" cartCount={items.length}/><main className="section-page"><Header eyebrow="SHOPPING BAG" title={ordered?"LOOK을 장바구니에 담았어요":"선택한 LOOK을 확인하세요"} copy={ordered?"결제는 기존 커머스의 안전한 체크아웃에서 이어집니다.":"PLAY에서 고른 상품을 개별로 제외하거나 세트로 구매할 수 있습니다."}/>{ordered?<section className="bag-success"><span>✓</span><h2>장바구니 저장 완료</h2><p>{items.length}개 아이템 · {won(sum)}</p><a href="/items">쇼핑 계속하기 →</a></section>:items.length?<section className="bag-layout"><div>{items.map(item=><article key={item.id}><img src={item.image} alt={item.name}/><div><small>{item.brand} · {item.category}</small><b>{item.name}</b><span>{item.tags.map(tag=>`#${tag}`).join("  ")}</span></div><strong>{won(item.price)}</strong><button aria-label={`${item.name} 삭제`} onClick={()=>setIds(ids.filter(id=>id!==item.id))}>×</button></article>)}</div><aside><span>ORDER SUMMARY</span><p><small>ITEMS</small><b>{items.length}</b></p><p><small>DELIVERY</small><b>FREE</b></p><footer><small>TOTAL</small><strong>{won(sum)}</strong></footer><button onClick={()=>setOrdered(true)}>선택한 LOOK 장바구니 담기 →</button></aside></section>:<section className="bag-empty"><span>BAG 00</span><h2>아직 담긴 LOOK이 없어요.</h2><p>PLAY에서 상황에 맞는 코디를 완성하거나 아이템을 먼저 둘러보세요.</p><div><a href="/play">PLAY 시작하기 →</a><a href="/items">아이템 보기</a></div></section>}</main></>
}

export default function CommercePage({kind}:{kind:Kind}){
 if(kind==="items")return <ItemsPage/>;
 if(kind==="ranking")return <RankingPage/>;
 if(kind==="quest")return <QuestPage/>;
 if(kind==="my")return <MyPage/>;
 return <BagPage/>;
}
