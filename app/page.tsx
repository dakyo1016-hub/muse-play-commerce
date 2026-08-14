"use client";

import { useMemo, useState } from "react";
import CharacterTurnaroundViewer from "./CharacterTurnaroundViewer";
import type { OutfitSelection } from "./LayeredOutfit";

type Screen = "home" | "create" | "vote" | "shop";
type Category = "ALL" | "OUTER" | "TOP" | "BOTTOM" | "DRESS" | "SHOES" | "BAG" | "ACC";

type Item = {
  id: string;
  category: Exclude<Category, "ALL">;
  kind: string;
  pattern: "solid" | "stripe" | "check" | "washed" | "nylon";
  brand: string;
  name: string;
  price: number;
  likes: string;
  color: string;
};

const items: Item[] = [
  { id: "cardigan", category: "OUTER", kind: "CARDIGAN", pattern: "solid", brand: "MORNING DEW", name: "Muted Lilac Cardigan", price: 49000, likes: "2.1K", color: "#b9a0c9" },
  { id: "jacket", category: "OUTER", kind: "CROP JACKET", pattern: "solid", brand: "RECTO", name: "Linen Crop Jacket", price: 129000, likes: "3.8K", color: "#b9ad9c" },
  { id: "leather-blouson", category: "OUTER", kind: "BLOUSON", pattern: "washed", brand: "NORTH OF CITY", name: "Washed Vegan Leather Blouson", price: 158000, likes: "7.4K", color: "#5d4a43" },
  { id: "windbreaker", category: "OUTER", kind: "WINDBREAKER", pattern: "nylon", brand: "STILL ACTIVE", name: "Light Nylon Windbreaker", price: 89000, likes: "5.6K", color: "#849589" },
  { id: "hood-zipup", category: "OUTER", kind: "HOOD ZIP-UP", pattern: "washed", brand: "COMMON PROJECT", name: "Vintage Wash Hood Zip-Up", price: 79000, likes: "9.2K", color: "#77797d" },
  { id: "tweed-jacket", category: "OUTER", kind: "TWEED", pattern: "check", brand: "LE PETIT ATELIER", name: "Soft Tweed Collar Jacket", price: 149000, likes: "3.3K", color: "#c7b8a9" },
  { id: "trench", category: "OUTER", kind: "TRENCH", pattern: "solid", brand: "ORDINARY OFFICE", name: "Light Single Trench Coat", price: 169000, likes: "4.7K", color: "#a99983" },

  { id: "top", category: "TOP", kind: "LAYERED TOP", pattern: "solid", brand: "SÉRIE STUDIO", name: "Ivory Layered Top", price: 49000, likes: "1.8K", color: "#eee7dc" },
  { id: "shirt", category: "TOP", kind: "SHEER SHIRT", pattern: "nylon", brand: "ATELIER NINE", name: "Sheer Pocket Shirt", price: 72000, likes: "1.2K", color: "#afc4bf" },
  { id: "graphic-tee", category: "TOP", kind: "GRAPHIC TEE", pattern: "washed", brand: "PUBLIC RECORD", name: "Archive Graphic T-Shirt", price: 39000, likes: "8.9K", color: "#484b50" },
  { id: "rib-tank", category: "TOP", kind: "SLEEVELESS", pattern: "stripe", brand: "SECOND SKIN", name: "Ribbed Square Sleeveless", price: 32000, likes: "4.1K", color: "#d6c7b7" },
  { id: "polo-knit", category: "TOP", kind: "POLO KNIT", pattern: "stripe", brand: "MAISON 27", name: "Open Collar Stripe Knit", price: 69000, likes: "6.2K", color: "#7892a1" },
  { id: "oxford-shirt", category: "TOP", kind: "OXFORD SHIRT", pattern: "solid", brand: "STUDIO BASIC", name: "Relaxed Oxford Shirt", price: 59000, likes: "7.8K", color: "#b3c6d5" },
  { id: "sweatshirt", category: "TOP", kind: "SWEATSHIRT", pattern: "washed", brand: "SUNDAY SERVICE", name: "Pigment Logo Sweatshirt", price: 65000, likes: "9.8K", color: "#8b7d75" },
  { id: "mesh-top", category: "TOP", kind: "MESH TOP", pattern: "nylon", brand: "AFTER IMAGE", name: "Layered Mesh Long Sleeve", price: 54000, likes: "2.9K", color: "#8e7d9a" },

  { id: "denim", category: "BOTTOM", kind: "BOOTCUT DENIM", pattern: "washed", brand: "BLUE HOUR", name: "Indigo Bootcut Denim", price: 69000, likes: "4.2K", color: "#34476f" },
  { id: "skirt", category: "BOTTOM", kind: "PLEATS SKIRT", pattern: "solid", brand: "MOMENT EDITION", name: "Soft Pleats Skirt", price: 89000, likes: "2.7K", color: "#78617f" },
  { id: "cargo-pants", category: "BOTTOM", kind: "CARGO PANTS", pattern: "washed", brand: "UTILITY CLUB", name: "Wide Pocket Cargo Pants", price: 79000, likes: "8.4K", color: "#727663" },
  { id: "bermuda", category: "BOTTOM", kind: "BERMUDA", pattern: "solid", brand: "MONO YARD", name: "Two Tuck Bermuda Shorts", price: 59000, likes: "5.3K", color: "#67676b" },
  { id: "parachute-skirt", category: "BOTTOM", kind: "CARGO SKIRT", pattern: "nylon", brand: "ROUTE 03", name: "Parachute String Maxi Skirt", price: 76000, likes: "6.8K", color: "#869088" },
  { id: "slacks", category: "BOTTOM", kind: "WIDE SLACKS", pattern: "solid", brand: "ORDINARY OFFICE", name: "Relaxed Wide Slacks", price: 82000, likes: "7.1K", color: "#3e4148" },
  { id: "curve-denim", category: "BOTTOM", kind: "CURVE DENIM", pattern: "washed", brand: "FADED BLUE", name: "Washed Curve Denim Pants", price: 85000, likes: "10.2K", color: "#71859b" },
  { id: "track-pants", category: "BOTTOM", kind: "TRACK PANTS", pattern: "stripe", brand: "STILL ACTIVE", name: "Side Line Jersey Pants", price: 68000, likes: "6.5K", color: "#485552" },

  { id: "dress", category: "DRESS", kind: "SLIP DRESS", pattern: "solid", brand: "ARCHIVE 101", name: "Bias Slip Dress", price: 139000, likes: "3.1K", color: "#a86f7f" },
  { id: "mini-dress", category: "DRESS", kind: "MINI DRESS", pattern: "solid", brand: "MELLOW ROOM", name: "Square Neck Mini Dress", price: 89000, likes: "5.5K", color: "#454750" },
  { id: "cargo-dress", category: "DRESS", kind: "CARGO DRESS", pattern: "nylon", brand: "UTILITY CLUB", name: "Parachute Cargo Dress", price: 99000, likes: "4.9K", color: "#858b83" },
  { id: "shirt-dress", category: "DRESS", kind: "SHIRT DRESS", pattern: "stripe", brand: "ATELIER NINE", name: "Pin Stripe Shirt Dress", price: 119000, likes: "3.7K", color: "#91a6b0" },
  { id: "knit-dress", category: "DRESS", kind: "KNIT DRESS", pattern: "solid", brand: "MAISON 27", name: "Soft Rib Knit Maxi Dress", price: 108000, likes: "6.3K", color: "#8f8179" },

  { id: "pumps", category: "SHOES", kind: "PUMPS", pattern: "solid", brand: "STEP BY STEP", name: "Square Pumps", price: 58000, likes: "2.4K", color: "#76a29a" },
  { id: "sneakers", category: "SHOES", kind: "PLATFORM", pattern: "solid", brand: "GROUND STANDARD", name: "Cream Platform Sneakers", price: 64000, likes: "5.1K", color: "#d7d0c4" },
  { id: "retro-runner", category: "SHOES", kind: "RETRO RUNNER", pattern: "washed", brand: "PACE MAKER", name: "Silver Mesh Retro Runner", price: 109000, likes: "11.2K", color: "#9ca1a4" },
  { id: "loafer", category: "SHOES", kind: "LOAFER", pattern: "solid", brand: "OFFICE HOURS", name: "Classic Penny Loafer", price: 98000, likes: "7.9K", color: "#4a3833" },
  { id: "sandal", category: "SHOES", kind: "SANDAL", pattern: "solid", brand: "STEP BY STEP", name: "Platform Strap Sandal", price: 72000, likes: "4.6K", color: "#83726c" },
  { id: "derby", category: "SHOES", kind: "DERBY", pattern: "washed", brand: "GROUND STANDARD", name: "Soft Suede Derby Shoes", price: 119000, likes: "6.7K", color: "#8a6f58" },

  { id: "bag", category: "BAG", kind: "SHOULDER BAG", pattern: "solid", brand: "MARGE SHERWOOD", name: "Soft Baguette Bag", price: 89000, likes: "6.8K", color: "#413a3b" },
  { id: "mini-bag", category: "BAG", kind: "BOSTON BAG", pattern: "solid", brand: "FORME", name: "Mint Mini Boston Bag", price: 59000, likes: "1.9K", color: "#9fbdb5" },
  { id: "crossbody", category: "BAG", kind: "CROSSBODY", pattern: "nylon", brand: "UTILITY CLUB", name: "Nylon Pocket Crossbody", price: 65000, likes: "8.1K", color: "#525b59" },
  { id: "tote", category: "BAG", kind: "TOTE BAG", pattern: "stripe", brand: "SUNDAY SERVICE", name: "Heavy Canvas Market Tote", price: 42000, likes: "5.8K", color: "#b7a98c" },
  { id: "backpack", category: "BAG", kind: "BACKPACK", pattern: "nylon", brand: "ROUTE 03", name: "Utility String Backpack", price: 89000, likes: "9.4K", color: "#626a70" },

  { id: "necklace", category: "ACC", kind: "NECKLACE", pattern: "solid", brand: "NUMBERING", name: "Curve Chain Necklace", price: 39000, likes: "2.6K", color: "#d7bd76" },
  { id: "ball-cap", category: "ACC", kind: "BALL CAP", pattern: "washed", brand: "PUBLIC RECORD", name: "Washed Lettering Ball Cap", price: 39000, likes: "8.7K", color: "#5c6370" },
  { id: "bucket-hat", category: "ACC", kind: "BUCKET HAT", pattern: "nylon", brand: "ROUTE 03", name: "Light Nylon Bucket Hat", price: 45000, likes: "4.3K", color: "#8c948e" },
  { id: "belt", category: "ACC", kind: "BELT", pattern: "solid", brand: "OFFICE HOURS", name: "Slim Leather Belt", price: 42000, likes: "6.1K", color: "#4d3831" },
  { id: "earrings", category: "ACC", kind: "EARRINGS", pattern: "solid", brand: "NUMBERING", name: "Mini Silver Hoop Earrings", price: 48000, likes: "5.9K", color: "#b9bdc0" },
  { id: "scarf", category: "ACC", kind: "SCARF", pattern: "check", brand: "FORME", name: "Pattern Silky Mini Scarf", price: 35000, likes: "3.8K", color: "#9c7282" },
];

const categories: Category[] = ["ALL", "OUTER", "TOP", "BOTTOM", "DRESS", "SHOES", "BAG", "ACC"];

const votePairs = [
  { scene: "FIRST DAY AT WORK", a: ["SOFT MINIMAL", "#b9a0c9"], b: ["CITY CLASSIC", "#768f89"] },
  { scene: "FRIDAY FIRST DATE", a: ["QUIET ROMANCE", "#c28798"], b: ["MODERN LAYER", "#6f7180"] },
  { scene: "HOTEL WEDDING", a: ["SOFT FORMAL", "#a58a72"], b: ["DARK FEMININE", "#69546b"] },
  { scene: "8H FESTIVAL", a: ["SPORTY LIGHT", "#729d93"], b: ["RETRO COLOR", "#bc8b63"] },
  { scene: "JEJU LAST DAY", a: ["OFF-DUTY", "#8c8175"], b: ["CLEAN CASUAL", "#9fb4c1"] },
] as const;

const voteDetails = [
  { a: { user:"USER A", price:184000, products:["Lilac Cardigan","Indigo Denim","Cream Sneakers"] }, b: { user:"USER B", price:196000, products:["Ivory Shirt","Slip Dress","Square Pumps"] } },
  { a: { user:"USER A", price:176000, products:["Layered Top","Pleats Skirt","Mini Boston Bag"] }, b: { user:"USER B", price:189000, products:["Linen Jacket","Bootcut Denim","Chain Necklace"] } },
  { a: { user:"USER A", price:278000, products:["Bias Dress","Crop Jacket","Slingback"] }, b: { user:"USER B", price:296000, products:["Sheer Shirt","Soft Skirt","Baguette Bag"] } },
  { a: { user:"USER A", price:158000, products:["Light Shirt","Bootcut Denim","Sneakers"] }, b: { user:"USER B", price:172000, products:["Color Cardigan","Pleats Skirt","Mini Bag"] } },
  { a: { user:"USER A", price:98000, products:["My Jeans","Ivory Top","Chain Necklace"] }, b: { user:"USER B", price:106000, products:["Cream Shirt","Mini Skirt","Sneakers"] } },
] as const;

const won = (value: number) => `₩${value.toLocaleString("ko-KR")}`;

function FlatLook({ color, tone = "#34476f", compact = false }: { color: string; tone?: string; compact?: boolean }) {
  return <div className={`flat-look ${compact ? "compact" : ""}`} style={{ "--flat-main":color,"--flat-tone":tone } as React.CSSProperties}><i className="flat-top" /><i className="flat-bottom" /><i className="flat-shoes" /><i className="flat-bag" /><i className="flat-acc" /></div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [category, setCategory] = useState<Category>("ALL");
  const [createMode, setCreateMode] = useState<"moodboard" | "avatar">("avatar");
  const [selectedIds, setSelectedIds] = useState<string[]>(["top", "denim", "pumps"]);
  const [styleChecked, setStyleChecked] = useState(false);
  const [styleModel, setStyleModel] = useState<"miyu" | "ren">("miyu");
  const [voteView, setVoteView] = useState<"model" | "flat">("model");
  const [voteRound, setVoteRound] = useState(0);
  const [voteChoice, setVoteChoice] = useState<"a" | "b" | null>(null);
  const [swapped, setSwapped] = useState(false);
  const [toast, setToast] = useState("");

  const visibleItems = category === "ALL" ? items : items.filter((item) => item.category === category);
  const selectedItems = useMemo(() => items.filter((item) => selectedIds.includes(item.id)), [selectedIds]);
  const outfitColors = useMemo(() => {
    const selected = (category: Item["category"]) => selectedItems.find((item) => item.category === category)?.color;
    return {
      outer: selected("OUTER"),
      top: selected("TOP"),
      bottom: selected("BOTTOM"),
      dress: selected("DRESS"),
      shoes: selected("SHOES"),
    };
  }, [selectedItems]);
  const outfitSelection = useMemo<OutfitSelection>(() => {
    const one = (category: Item["category"]) => {
      const item = selectedItems.find((candidate) => candidate.category === category);
      return item ? { id:item.id, color:item.color, pattern:item.pattern } : undefined;
    };
    return {
      outer: one("OUTER"),
      top: one("TOP"),
      bottom: one("BOTTOM"),
      dress: one("DRESS"),
      shoes: one("SHOES"),
      bag: one("BAG"),
      accessories: selectedItems.filter((item) => item.category === "ACC").map((item) => ({ id:item.id, color:item.color, pattern:item.pattern })),
    };
  }, [selectedItems]);
  const createTotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const shopTotal = (swapped ? 32000 : 49000) + 69000 + 58000;

  const go = (next: Screen) => {
    setScreen(next);
    setStyleChecked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleItem = (item: Item) => {
    setSelectedIds((current) => {
      if (current.includes(item.id)) return current.filter((id) => id !== item.id);
      if (item.id === "ball-cap" || item.id === "bucket-hat") {
        return [...current.filter((id) => id !== "ball-cap" && id !== "bucket-hat"), item.id];
      }
      const conflicts = item.category === "DRESS"
        ? ["DRESS", "TOP", "BOTTOM"]
        : item.category === "TOP" || item.category === "BOTTOM"
          ? [item.category, "DRESS"]
          : [item.category];
      const sameCategory = item.category === "ACC" ? current : current.filter((id) => !conflicts.includes(items.find((candidate) => candidate.id === id)?.category ?? "ACC"));
      return [...sameCategory, item.id];
    });
  };

  const vote = (choice: "a" | "b") => {
    if (voteChoice) return;
    setVoteChoice(choice);
    window.setTimeout(() => {
      setVoteRound((current) => current + 1);
      setVoteChoice(null);
    }, 260);
  };

  return (
    <main className="flow-app">
      <header className="flow-header">
        <button className="flow-logo" onClick={() => go("home")}><strong>MUSE PLAY</strong><span>PLAY COMMERCE</span></button>
        <nav aria-label="핵심 사용자 흐름">
          {(["home", "create", "vote", "shop"] as Screen[]).map((item) => <button key={item} className={screen === item ? "active" : ""} onClick={() => go(item)}>{item === "home" ? "PLAY HOME" : item === "create" ? "CREATE" : item === "vote" ? "VOTE" : "SHOP THE LOOK"}</button>)}
        </nav>
        <span className="flow-case-label">COMMERCE × COMMUNITY</span>
      </header>

      {screen === "home" && <section className="home-screen">
        <section className="home-hero">
          <div className="home-intro"><small>WHAT WOULD YOU WEAR?</small><h1>실제 판매 중인 아이템으로<br />오늘의 상황에 맞는 룩을<br />만들어보세요.</h1><p>상황을 먼저 발견하고, 상품을 가지고 놀며,<br />다른 사람의 선택을 통해 다시 쇼핑으로 돌아갑니다.</p><div><span>STYLE</span><i>→</i><span>VOTE</span><i>→</i><span>DISCOVER</span><i>→</i><span>SHOP</span></div></div>
          <article className="today-card"><div className="today-card-top"><span>TODAY&apos;S MISSION</span><b>DATE · LIVE</b></div><small>FRIDAY · SEONGSU · 7PM</small><h2>STYLE {styleModel === "miyu" ? "MIYU" : "REN"}</h2><h3>금요일 저녁 성수 첫 데이트</h3><p>실제 판매 중인 상품으로<br />오늘의 {styleModel === "miyu" ? "미유" : "렌"}를 스타일링해주세요.</p><div className="style-model-choice"><button className={styleModel === "miyu" ? "active" : ""} onClick={() => setStyleModel("miyu")}><img src="/characters/miyu-starter/front.png" alt="스타일 모델 미유" /><span><b>MIYU</b>STYLE MODEL 01</span></button><button className={styleModel === "ren" ? "active" : ""} onClick={() => setStyleModel("ren")}><img src="/characters/ren-starter-v2/front.png" alt="스타일 모델 렌" /><span><b>REN</b>STYLE MODEL 02</span></button></div><div className="challenge-data"><span>27°C</span><span>CASUAL DATE</span><span>BUDGET ₩200,000</span></div><strong>8,241 LOOKS CREATED</strong><button onClick={() => go("create")}>START STYLING →</button></article>
        </section>

        <section className="home-actions">{[
          ["TRENDING LOOKS","지금 사람들이 저장하는 룩","01"],["VOTE NOW","5번의 선택으로 취향 발견","02"],["BRAND CHALLENGE","신상품으로 만드는 브랜드 미션","03"],["BEAUTY PLAY","패션과 분리된 다음 PLAY TYPE","04"],
        ].map(([title,copy,no],index) => <button key={title} onClick={() => index === 0 ? document.getElementById("trending")?.scrollIntoView({ behavior:"smooth" }) : index === 1 ? go("vote") : index === 2 ? notify("브랜드 챌린지는 포트폴리오 확장 시나리오예요") : notify("BEAUTY PLAY는 별도 플레이 타입으로 확장됩니다")}><span>{no}</span><strong>{title}</strong><small>{copy}</small><i>→</i></button>)}</section>

        <section className="trending-section" id="trending"><div className="section-heading"><div><small>COMMUNITY DISCOVERY</small><h2>TRENDING LOOKS</h2></div><button onClick={() => go("vote")}>VOTE NOW →</button></div><div className="look-feed">{[
          ["01","SOFT OFFICE","루미","12.8K","#b9a0c9"],["02","RAINY MINIMAL","하나","8.4K","#729d93"],["03","CITY DATE","소라","6.7K","#c28798"],
        ].map(([no,label,name,likes,color]) => <article key={no} onClick={() => go("shop")}><div className="look-visual" style={{ "--look":color } as React.CSSProperties}><span>{no}</span><div className="look-person"><i /><i /><i /></div></div><small>{label}</small><strong>{name}의 LOOK</strong><span>♡ {likes}</span><button>SHOP THIS LOOK →</button></article>)}</div></section>

        <section className="scene-section"><div className="section-heading"><div><small>SPECIFIC SCENES</small><h2>구체적인 제약이 참여 욕구를 만든다</h2></div></div><div className="scene-grid">{[
          ["WORK","첫 출근인데 너무 신입처럼 보이고 싶진 않아","SEOUL · 28°C","SMART CASUAL · ₩250K"],["DATE","성수에서 저녁 먹고 와인바 가는 첫 소개팅","FRIDAY · 19:00 · 27°C","CASUAL DATE · ₩200K"],["WEDDING","호텔 결혼식인데 너무 힘준 하객룩은 싫어","INDOOR","FORMAL 70% · ₩300K"],
        ].map(([type,title,condition,budget]) => <article key={type}><small>{type}</small><h3>{title}</h3><span>{condition}</span><b>{budget}</b><button onClick={() => go("create")}>PLAY THIS SCENE →</button></article>)}</div></section>
      </section>}

      {screen === "create" && <section className="create-screen">
        <div className="screen-heading"><div><small>CREATE LOOK</small><h1>쇼핑하듯 탐색하고,<br />룩으로 조합하세요.</h1></div><p>실제 커머스의 상품 정보가 스타일링 인터페이스로 연결됩니다.</p></div>
          <div className="create-toolbar"><div>{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}><span>{item}</span><small>{item === "ALL" ? items.length : items.filter((product) => product.category === item).length}</small></button>)}</div><aside>{["PRICE","COLOR","BRAND","STYLE","POPULAR ↓"].map((filter) => <button key={filter} onClick={() => notify(`${filter} 필터를 적용했어요`)}>{filter}</button>)}</aside></div>
        <div className="create-layout">
          <section className="shop-items"><div className="shop-items-title"><span>SHOP ITEMS</span><b>{visibleItems.length} PRODUCTS</b></div><div className="shop-grid">{visibleItems.map((item) => { const selected = selectedIds.includes(item.id); return <article key={item.id} className={selected ? "selected" : ""}><button className="product-like" onClick={() => notify(`${item.name}을 찜했어요`)}>♡ {item.likes}</button><div className={`product-thumb category-${item.category.toLowerCase()} pattern-${item.pattern}`} style={{ "--product-color":item.color } as React.CSSProperties}><i className="product-art" /><span>{item.kind}</span></div><small>{item.brand}</small><h3>{item.name}</h3><strong>{won(item.price)}</strong><button className="try-button" onClick={() => toggleItem(item)}>{selected ? "REMOVE" : "TRY ON"}</button></article>; })}</div></section>
          <aside className="look-builder"><div className="builder-top"><div><span>STYLE VIEW</span><button className={createMode === "avatar" ? "active" : ""} onClick={() => setCreateMode("avatar")}>STYLE MODEL</button><button className={createMode === "moodboard" ? "active" : ""} onClick={() => setCreateMode("moodboard")}>FLAT LAY</button></div><small>AUTOSAVED</small></div>
            {createMode === "moodboard" ? (
              <div className="moodboard-canvas"><em>FRIDAY · SEONGSU · 7PM</em>{selectedItems.map((item,index) => <div key={item.id} className={`mood-product mood-product-${index % 6}`}><i style={{ background:item.color }} /><span>{item.category}</span></div>)}<strong>FIRST<br />DATE</strong></div>
            ) : <>
              <div className="avatar-canvas miyu-stage">
                <span className="miyu-label">STYLE MODEL · {styleModel.toUpperCase()}</span>
                <CharacterTurnaroundViewer
                  key={`style-model-${styleModel}`}
                  character={styleModel}
                  outfitMode="base"
                  height={styleModel === "miyu" ? 165 : 175}
                  weight={styleModel === "miyu" ? 55 : 70}
                  bodyShape="average"
                  skinTone={styleModel === "miyu" ? "#eab18c" : "#d39a78"}
                  hairStyle={1}
                  hairColor={styleModel === "miyu" ? "#8b3826" : "#2b2422"}
                  eyeColor={styleModel === "miyu" ? "#43251f" : "#35424a"}
                  outfitColors={outfitColors}
                  outfitSelection={outfitSelection}
                />
              </div>
              <div className="style-model-selector"><div><small>MUSE STYLE MODEL</small><strong>외모를 만드는 대신, 스타일링에 집중하세요.</strong></div><button className={styleModel === "miyu" ? "active" : ""} onClick={() => setStyleModel("miyu")}><img src="/characters/miyu-starter/front.png" alt="미유" /><span><b>MIYU</b>MODEL 01</span></button><button className={styleModel === "ren" ? "active" : ""} onClick={() => setStyleModel("ren")}><img src="/characters/ren-starter-v2/front.png" alt="렌" /><span><b>REN</b>MODEL 02</span></button></div>
            </>}
            {!styleChecked ? <><div className="builder-summary"><span>{selectedItems.length} ITEMS</span><strong>{won(createTotal)}</strong></div><div className="builder-actions"><button onClick={() => notify("LOOK을 저장했어요")}>SAVE LOOK</button><button onClick={() => setStyleChecked(true)}>STYLE CHECK →</button></div></> : <section className="style-check"><small>STYLE CHECK</small><h2>READY TO ENTER</h2><div><span><i>✓</i>Dress code에 잘 맞아요</span><span><i>✓</i>예산 범위 안이에요 <b>{won(createTotal)} / ₩200K</b></span><span><i>✓</i>현재 날씨에 적합해요</span></div><button onClick={() => { setVoteRound(0); go("vote"); notify("챌린지 출품이 완료됐어요"); }}>ENTER CHALLENGE →</button></section>}
          </aside>
        </div>
      </section>}

      {screen === "vote" && <section className="vote-screen-clean">
        <div className="screen-heading"><div><small>QUICK VOTE · USER CURATED</small><h1>WHICH WOULD<br />YOU WEAR?</h1></div><p>유저가 직접 고른 상품 조합을 동일한 포맷으로 비교합니다.<br /><b>We vote for the style, not the person.</b></p></div>
        {voteRound < 5 ? <>
          <div className="vote-view-switch"><span>COMPARE AS</span><button className={voteView === "model" ? "active" : ""} onClick={() => setVoteView("model")}>STANDARD MODEL</button><button className={voteView === "flat" ? "active" : ""} onClick={() => setVoteView("flat")}>FLAT LAY</button></div>
          <div className="vote-status"><span style={{ width:`${voteRound * 20}%` }} /><b>{voteRound + 1} / 5</b></div><h2 className="vote-scene">{votePairs[voteRound].scene}</h2>
          <div className="vote-pair flat-vote"><button className={voteChoice === "a" ? "selected" : ""} onClick={() => vote("a")}><small>LOOK A · {votePairs[voteRound].a[0]}</small>{voteView === "model" ? <div className="standard-model-preview" style={{ "--model-look":votePairs[voteRound].a[1] } as React.CSSProperties}><img src={`/characters/${styleModel}-starter${styleModel === "ren" ? "-v2" : ""}/front.png`} alt={`표준 스타일 모델 ${styleModel}`} /><i /></div> : <FlatLook color={votePairs[voteRound].a[1]} />}<ul>{voteDetails[voteRound].a.products.map((product) => <li key={product}>{product}</li>)}</ul><span>{voteDetails[voteRound].a.user}</span><em>{won(voteDetails[voteRound].a.price)}</em><strong>[ A 선택 ]</strong></button><b>VS</b><button className={voteChoice === "b" ? "selected" : ""} onClick={() => vote("b")}><small>LOOK B · {votePairs[voteRound].b[0]}</small>{voteView === "model" ? <div className="standard-model-preview" style={{ "--model-look":votePairs[voteRound].b[1] } as React.CSSProperties}><img src={`/characters/${styleModel}-starter${styleModel === "ren" ? "-v2" : ""}/front.png`} alt={`표준 스타일 모델 ${styleModel}`} /><i /></div> : <FlatLook color={votePairs[voteRound].b[1]} tone="#765d78" />}<ul>{voteDetails[voteRound].b.products.map((product) => <li key={product}>{product}</li>)}</ul><span>{voteDetails[voteRound].b.user}</span><em>{won(voteDetails[voteRound].b.price)}</em><strong>[ B 선택 ]</strong></button></div>
          <div className="vote-principle"><b>{voteView === "model" ? `STANDARD STYLE MODEL · ${styleModel.toUpperCase()}` : "STANDARDIZED FLAT LAY"}</b><span>두 유저의 상품 선택을 동일한 모델·포즈·화면으로 렌더링해 스타일만 평가합니다.</span></div>
        </> : <div className="taste-layout"><section className="taste-card"><small>5 VOTES COMPLETE</small><h2>YOUR TASTE</h2><p>재미로 고른 선택이 개인화 추천 신호가 됐어요.</p>{[["MINIMAL",76],["SOFT",68],["CLASSIC",51]].map(([label,value]) => <span key={label}><b>{label}</b><i><em style={{ width:`${value}%` }} /></i><strong>{value}%</strong></span>)}</section><article className="winner-card"><div><small>8,429 PEOPLE CHOSE</small><h2>#1 SOFT OFFICE</h2><p>루미가 직접 고른 3개 상품 · ♡ 12.8K</p><button onClick={() => go("shop")}>당신 취향의 LOOK 보기 →</button></div><FlatLook color="#b9a0c9" compact /></article></div>}
      </section>}

      {screen === "shop" && <section className="shop-look-screen-clean">
        <div className="shop-look-hero"><div><small>#1 WEEKLY WINNER</small><h1>SOFT<br />OFFICE</h1><p>루미가 직접 고른 상품 조합 · ♡ 12.8K</p><span>SHOP THIS LOOK</span></div><FlatLook color="#b9a0c9" /></div>
        <section className="shop-look-detail"><div className="shop-detail-head"><div><small>FROM DISCOVERY TO PURCHASE</small><h2>이 룩 그대로 구매하기</h2></div><strong>{won(shopTotal)}</strong></div><div className="shop-look-list"><article className={swapped ? "swapped" : ""}><i style={{ background:swapped ? "#c4b0cf" : "#b9a0c9" }} /><div><small>{swapped ? "ALTERNATIVE · ORDINARY UNIT" : "MORNING DEW"}</small><strong>{swapped ? "Everyday Lilac Knit" : "Muted Lilac Cardigan"}</strong><span>{swapped ? "₩32,000" : "₩49,000"}</span></div><button onClick={() => setSwapped((current) => !current)}>↻ {swapped ? "원본으로 복구" : "비슷한 상품으로 교체"}</button></article><article><i style={{ background:"#34476f" }} /><div><small>BLUE HOUR</small><strong>Indigo Bootcut Denim</strong><span>₩69,000</span></div><button onClick={() => notify("BLUE HOUR 상품 상세를 열었어요")}>상품 보기</button></article><article><i style={{ background:"#76a29a" }} /><div><small>STEP BY STEP</small><strong>Square Pumps</strong><span>₩58,000</span></div><button onClick={() => notify("STEP BY STEP 상품 상세를 열었어요")}>상품 보기</button></article></div>{swapped && <div className="swap-result"><span>ORIGINAL ₩49K</span><i>→</i><strong>ALTERNATIVE ₩32K</strong><b>룩의 무드는 유지하고 ₩17K 절약</b></div>}<div className="shop-total"><span>TOTAL · 3 ITEMS</span><strong>{won(shopTotal)}</strong></div><button className="add-all" onClick={() => notify("3개 상품을 장바구니에 담았어요")}>ADD ALL TO BAG</button><button className="view-products" onClick={() => notify("상품별 상세 보기를 열었어요")}>상품별로 보기</button></section>
      </section>}

      {toast && <div className="flow-toast">{toast}</div>}
    </main>
  );
}
