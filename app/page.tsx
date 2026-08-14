"use client";

import { useState } from "react";
import CharacterTurnaroundViewer from "./CharacterTurnaroundViewer";

type Product = {
  id: string;
  brand: string;
  name: string;
  category: "상의" | "하의" | "아우터" | "슈즈" | "뷰티";
  stock: number;
  price: number;
  color: string;
  accent: string;
  swatch: string;
  tags: string[];
  description: string;
};

const products: Product[] = [
  {
    id: "basictee",
    brand: "MY CLOSET",
    name: "무료 기본 이너 티",
    category: "상의",
    stock: 999,
    price: 0,
    color: "#eee9df",
    accent: "#b9afa7",
    swatch: "linear-gradient(135deg, #fffdf7, #d8d0c8)",
    tags: ["기본", "레이어드"],
    description: "아우터 안에 언제든 입을 수 있고 상의를 벗으면 자동으로 돌아오는 기본 티셔츠",
  },
  {
    id: "cardigan",
    brand: "MORNING DEW",
    name: "뮤트 라일락 크롭 가디건",
    category: "아우터",
    stock: 18,
    price: 49000,
    color: "#bba2ca",
    accent: "#70517f",
    swatch: "linear-gradient(135deg, #d8c5e3, #9b7bac)",
    tags: ["소프트", "오피스"],
    description: "짧은 기장과 각진 소매가 레트로한 실루엣을 만드는 니트 가디건",
  },
  {
    id: "denim",
    brand: "BLUE HOUR",
    name: "인디고 부츠컷 데님",
    category: "하의",
    stock: 12,
    price: 69000,
    color: "#25355e",
    accent: "#101932",
    swatch: "linear-gradient(135deg, #5e72a2, #182449)",
    tags: ["레트로", "오피스"],
    description: "다리가 길어 보이는 하이웨이스트 부츠컷과 짙은 인디고 워싱",
  },
  {
    id: "skirt",
    brand: "MUSE ARCHIVE",
    name: "플럼 체크 플리츠",
    category: "하의",
    stock: 9,
    price: 62000,
    color: "#714a70",
    accent: "#33223f",
    swatch: "repeating-linear-gradient(45deg, #7f5b83 0 9px, #b998b7 9px 13px, #3d3153 13px 22px)",
    tags: ["걸리시", "레트로"],
    description: "낮은 해상도에서도 패턴이 선명하게 읽히는 플럼 컬러 체크 스커트",
  },
  {
    id: "pumps",
    brand: "STEP BY STEP",
    name: "민트 스퀘어 펌프스",
    category: "슈즈",
    stock: 7,
    price: 58000,
    color: "#7ba9a7",
    accent: "#3e6f70",
    swatch: "linear-gradient(145deg, #b9d4ce, #5d918f)",
    tags: ["포인트", "레트로"],
    description: "투박한 사각 앞코와 안정적인 미들힐이 특징인 포인트 슈즈",
  },
  {
    id: "lip",
    brand: "PETAL LAB",
    name: "로즈 밀크 글로우 틴트",
    category: "뷰티",
    stock: 24,
    price: 18000,
    color: "#d96a7b",
    accent: "#8d3447",
    swatch: "linear-gradient(145deg, #f4a6ad, #be4c68)",
    tags: ["소프트", "생기"],
    description: "채도는 낮추고 유리알 광택만 남긴 차분한 로즈 밀크 컬러",
  },
  {
    id: "blush",
    brand: "PETAL LAB",
    name: "피치 베일 블러셔",
    category: "뷰티",
    stock: 16,
    price: 22000,
    color: "#ec947d",
    accent: "#b85f57",
    swatch: "radial-gradient(circle at 35% 30%, #ffc8aa, #e98172 55%, #a94e54)",
    tags: ["걸리시", "생기"],
    description: "픽셀 텍스처 얼굴에도 자연스럽게 얹히는 맑은 피치 톤 블러셔",
  },
  {
    id: "blouse",
    brand: "MORNING DEW",
    name: "아이보리 리본 블라우스",
    category: "상의",
    stock: 14,
    price: 54000,
    color: "#eee4da",
    accent: "#8e6576",
    swatch: "linear-gradient(135deg, #fff9ef, #d8c8c2)",
    tags: ["걸리시", "오피스"],
    description: "리본 칼라와 퍼프 소매로 로맨틱한 볼륨을 더한 블라우스",
  },
  {
    id: "tee",
    brand: "DAILY PIXEL",
    name: "세이지 슬림 티셔츠",
    category: "상의",
    stock: 21,
    price: 32000,
    color: "#8fa99d",
    accent: "#516d63",
    swatch: "linear-gradient(135deg, #bad0c5, #6d8d80)",
    tags: ["소프트", "데일리"],
    description: "레이어드하기 쉬운 슬림 핏과 차분한 세이지 컬러의 기본 티셔츠",
  },
  {
    id: "widepants",
    brand: "LINE EDITION",
    name: "차콜 와이드 슬랙스",
    category: "하의",
    stock: 11,
    price: 72000,
    color: "#45434d",
    accent: "#24232a",
    swatch: "linear-gradient(135deg, #777480, #302f37)",
    tags: ["오피스", "모던"],
    description: "허리선은 단정하고 밑단은 넓게 떨어지는 롱 와이드 슬랙스",
  },
  {
    id: "jacket",
    brand: "MUSE ARCHIVE",
    name: "코코아 크롭 재킷",
    category: "아우터",
    stock: 8,
    price: 89000,
    color: "#81665f",
    accent: "#493936",
    swatch: "linear-gradient(135deg, #a98c83, #604944)",
    tags: ["레트로", "오피스"],
    description: "짧은 길이와 넓은 라펠이 특징인 레트로 테일러드 재킷",
  },
  {
    id: "trench",
    brand: "CITY MUSE",
    name: "샌드 미디 트렌치",
    category: "아우터",
    stock: 6,
    price: 129000,
    color: "#b79c76",
    accent: "#6f5b43",
    swatch: "linear-gradient(135deg, #d2bd9c, #987b58)",
    tags: ["클래식", "오피스"],
    description: "무릎 위까지 곧게 떨어지는 게임형 미디 트렌치코트",
  },
  {
    id: "sneakers",
    brand: "STEP BY STEP",
    name: "크림 플랫폼 스니커즈",
    category: "슈즈",
    stock: 17,
    price: 64000,
    color: "#e7dfd2",
    accent: "#81766d",
    swatch: "linear-gradient(145deg, #fffaf0, #c6b9aa)",
    tags: ["데일리", "포인트"],
    description: "두툼한 밑창과 둥근 앞코로 비율을 살리는 플랫폼 스니커즈",
  },
];

const categories = ["전체", "상의", "하의", "아우터", "슈즈", "뷰티"] as const;

const won = (value: number) => `${value.toLocaleString("ko-KR")}원`;

const challenges = [
  { id: "office", icon: "▣", title: "첫 출근 오피스", brief: "신뢰감 + 부드러운 인상", reward: "백화점 10만원권", tags: ["오피스", "소프트"], entrants: 248 },
  { id: "date", icon: "♡", title: "봄날 데이트", brief: "사진에 예쁜 로맨틱 룩", reward: "데이트 코스 이용권", tags: ["걸리시", "생기"], entrants: 183 },
  { id: "festival", icon: "✦", title: "뮤직 페스티벌", brief: "움직임이 편한 포인트 룩", reward: "페스티벌 티켓 2매", tags: ["포인트", "데일리"], entrants: 319 },
  { id: "travel", icon: "◇", title: "주말 여행", brief: "하루 종일 편안한 레이어드", reward: "호텔 숙박권", tags: ["데일리", "레이어드"], entrants: 156 },
  { id: "guest", icon: "♧", title: "웨딩 하객룩", brief: "단정하지만 기억에 남게", reward: "뷰티 기프트 세트", tags: ["클래식", "오피스"], entrants: 211 },
];

const sceneCommerce = [
  { id: "work", icon: "💼", label: "WORK", examples: ["첫 출근", "면접", "중요한 PT", "회식"], sponsor: "MUSE BIZ", mission: "중요한 PT에서 신뢰감을 주는 15만원 이하 룩", budget: "150,000원 이하", slots: ["재킷", "이너", "팬츠", "슈즈"] },
  { id: "date", icon: "💕", label: "DATE", examples: ["소개팅", "첫 데이트", "기념일", "전시회"], sponsor: "DATE PICK", mission: "20만원 이하 여름 소개팅룩", budget: "200,000원 이하", slots: ["상의", "하의", "슈즈", "립"] },
  { id: "travel", icon: "✈️", label: "TRAVEL", examples: ["제주", "도쿄", "파리", "휴양지"], sponsor: "CITY MUSE", mission: "사진과 활동성을 모두 잡은 제주 2박 3일 룩", budget: "250,000원 이하", slots: ["아우터", "상의", "하의", "슈즈"] },
  { id: "event", icon: "🎉", label: "EVENT", examples: ["결혼식", "돌잔치", "졸업식", "페스티벌"], sponsor: "MUSE ARCHIVE", mission: "단정하지만 기억에 남는 여름 하객룩", budget: "300,000원 이하", slots: ["원피스", "아우터", "슈즈", "백"] },
  { id: "weather", icon: "🌦", label: "WEATHER", examples: ["장마", "폭염", "첫눈", "큰 일교차"], sponsor: "WEATHER LAB", mission: "비와 습도에도 쾌적한 장마 출근룩", budget: "180,000원 이하", slots: ["방수 아우터", "상의", "하의", "슈즈"] },
  { id: "culture", icon: "🎵", label: "CULTURE", examples: ["콘서트", "야구장", "전시", "클럽"], sponsor: "LIVE CLUB", mission: "오래 서 있어도 편한 콘서트 포토존 룩", budget: "220,000원 이하", slots: ["상의", "하의", "슈즈", "액세서리"] },
  { id: "campus", icon: "🏫", label: "CAMPUS", examples: ["개강", "축제", "발표", "MT"], sponsor: "CAMPUS WEEK", mission: "개강 첫 주 호감도를 높이는 데일리 룩", budget: "120,000원 이하", slots: ["상의", "하의", "슈즈", "백"] },
  { id: "lifestyle", icon: "🏃", label: "LIFESTYLE", examples: ["러닝", "필라테스", "카페", "피크닉"], sponsor: "MOVE DAILY", mission: "운동 후 카페까지 자연스러운 애슬레저 룩", budget: "160,000원 이하", slots: ["탑", "레깅스", "아우터", "슈즈"] },
  { id: "beauty", icon: "💄", label: "BEAUTY", examples: ["소개팅 메이크업", "출근 메이크업", "여름 지속력", "톤온톤 메이크업"], sponsor: "BEAUTY CURATION", mission: "장마철에도 안 무너지는 출근 메이크업", budget: "100,000원 이하", slots: ["파운데이션", "픽서", "마스카라", "립"] },
  { id: "trend", icon: "🎬", label: "TREND", examples: ["드라마 속 스타일", "셀럽 무드", "Y2K", "발레코어"], sponsor: "MUSE TREND LAB", mission: "이번 주 검색 급상승 발레코어 룩", budget: "240,000원 이하", slots: ["탑", "스커트", "슈즈", "헤어"] },
] as const;

export default function Home() {
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [equipped, setEquipped] = useState<string[]>(["basictee", "cardigan", "denim", "pumps"]);
  const [quantities, setQuantities] = useState<Record<string, number>>({ basictee: 1, cardigan: 1, denim: 1, pumps: 1 });
  const [focusedId, setFocusedId] = useState("cardigan");
  const [liked, setLiked] = useState<string[]>(["lip"]);
  const [toast, setToast] = useState("");
  const [showShop, setShowShop] = useState(false);
  const [outfitMode, setOutfitMode] = useState<"base" | "starter">("starter");
  const [gender, setGender] = useState<"female" | "male">("female");
  const [height, setHeight] = useState(165);
  const [weight, setWeight] = useState(55);
  const [bodyShape, setBodyShape] = useState<"slender" | "average" | "athletic">("average");
  const [skinTone, setSkinTone] = useState("#f0b485");
  const [hairStyle, setHairStyle] = useState<1 | 2 | 3>(1);
  const [hairColor, setHairColor] = useState("#8a321f");
  const [eyeColor, setEyeColor] = useState("#43251f");
  const [characterReset, setCharacterReset] = useState(0);
  const [challengeId, setChallengeId] = useState("office");
  const [voted, setVoted] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>(["basictee"]);
  const [sceneGroup, setSceneGroup] = useState("work");
  const [sceneExample, setSceneExample] = useState(0);
  const [friendVote, setFriendVote] = useState<"a" | "b" | null>(null);
  const [battleShared, setBattleShared] = useState(false);
  const [lookBudgetMode, setLookBudgetMode] = useState<"original" | "smart">("original");
  const renderedStarterIds = new Set(["basictee", "cardigan", "denim", "pumps"]);

  const restoreDefaultFemale = () => {
    setGender("female");
    setHeight(165);
    setWeight(55);
    setBodyShape("average");
    setSkinTone("#f0b485");
    setHairStyle(1);
    setHairColor("#8a321f");
    setEyeColor("#43251f");
    setOutfitMode("starter");
    setCharacterReset((current) => current + 1);
  };

  const focused = products.find((product) => product.id === focusedId) ?? products[0];
  const visibleProducts = category === "전체"
    ? products
    : products.filter((product) => product.category === category);
  const equippedProducts = products.filter((product) => equipped.includes(product.id));
  const total = equippedProducts.reduce((sum, product) => sum + product.price * (quantities[product.id] ?? 1), 0);
  const pieceCount = equippedProducts.reduce((sum, product) => sum + (quantities[product.id] ?? 1), 0);
  const tagSet = new Set(equippedProducts.flatMap((product) => product.tags));
  const themeScore = Math.min(100, 88 + tagSet.size * 3);
  const communityScore = voted ? 96 : 82;
  const stylingScore = Math.min(100, 82 + equippedProducts.length * 3);
  const discoveryScore = Math.min(100, 76 + new Set(equippedProducts.map((product) => product.brand)).size * 4);
  const totalStyleScore = Math.round(themeScore * .35 + communityScore * .30 + stylingScore * .20 + discoveryScore * .15);
  const stars = (value: number) => `${"★".repeat(Math.round(value / 20))}${"☆".repeat(5 - Math.round(value / 20))}`;
  const challenge = challenges.find((item) => item.id === challengeId) ?? challenges[0];
  const activeScene = sceneCommerce.find((scene) => scene.id === sceneGroup) ?? sceneCommerce[0];
  const originalLookItems = [
    ["상의", 59000], ["스커트", 79000], ["슈즈", 109000], ["립", 24000],
  ] as const;
  const smartLookItems = [
    ["무드 유사 상의", 32000], ["플레어 스커트", 42000], ["슈즈", 49000], ["립", 17000],
  ] as const;
  const activeLookItems = lookBudgetMode === "original" ? originalLookItems : smartLookItems;
  const activeLookTotal = activeLookItems.reduce((sum, item) => sum + item[1], 0);
  const visibleEquippedIds = outfitMode === "starter"
    ? new Set(["basictee", "cardigan", "denim", "pumps", ...equippedProducts.filter((product) => product.category === "뷰티").map((product) => product.id)])
    : new Set<string>();

  const equip = (product: Product) => {
    setFocusedId(product.id);
    if (product.category !== "뷰티") setOutfitMode("starter");
    if (product.category !== "뷰티" && !renderedStarterIds.has(product.id)) {
      notify("이 상품은 실제 착장 에셋 제작 대기 중이에요. 현재는 스타터 룩을 표시합니다.");
      return;
    }
    setEquipped((current) => {
      if (current.includes(product.id)) {
        if (product.id === "basictee") {
          notify("기본 이너 티는 항상 옷장에 남아 있어요");
          return current;
        }
        setQuantities((values) => { const next = { ...values }; delete next[product.id]; return next; });
        const next = current.filter((id) => id !== product.id);
        if (product.category === "상의") return [...next, "basictee"];
        return next;
      }
      let withoutCategory = current.filter((id) => {
        const item = products.find((candidate) => candidate.id === id);
        return item?.category !== product.category;
      });
      if (product.category === "뷰티") {
        return current.includes(product.id)
          ? current.filter((id) => id !== product.id)
          : [...current, product.id];
      }
      if (product.category === "아우터" && !current.some((id) => products.find((item) => item.id === id)?.category === "상의")) {
        withoutCategory = [...withoutCategory, "basictee"];
      }
      setQuantities((values) => ({ ...values, [product.id]: values[product.id] ?? 1, basictee: values.basictee ?? 1 }));
      return [...withoutCategory, product.id];
    });
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const shareFriendBattle = async () => {
    const shareData = {
      title: "MUSE MODE · FRIEND BATTLE",
      text: `누가 ${activeScene.examples[sceneExample]}에 더 잘 입었어? 다경의 LOOK vs 친구의 LOOK`,
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setBattleShared(true);
      notify("친구 대결 링크를 공유했어요 · 외부 투표가 열렸어요");
    } catch {
      notify("공유가 취소됐어요");
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="pixel-logo" aria-hidden="true">M</div>
          <div>
            <strong>MUSE MODE</strong>
            <span>BEAUTY · FASHION PLAY</span>
          </div>
        </div>

        <nav className="topnav" aria-label="주요 메뉴">
          <button className="active">코디 플레이</button>
          <button onClick={() => notify("뷰티 매칭은 다음 프로토타입에서 열려요")}>뷰티 매칭</button>
          <button onClick={() => notify(`찜한 상품 ${liked.length}개`) }>나의 옷장</button>
        </nav>

        <div className="commerce-journey" aria-label="쇼핑 경험 단계">
          <span className="active"><b>01</b> 쇼핑</span>
          <i>→</i><span><b>02</b> 플레이</span>
          <i>→</i><span><b>03</b> 발견</span>
          <i>→</i><span><b>04</b> 구매</span>
        </div>

        <div className="account-stats">
          <span><b>DAY</b> 07</span>
          <span><b>♥</b> 128</span>
          <button className="coin" onClick={() => notify("게임 보유 코인 52,000")}>◉ 52,000</button>
        </div>
      </header>

      <section className="mission-strip">
        <div>
          <span className="live-dot" /> 오늘의 커머스 미션
          <strong>첫 출근에 어울리는 부드러운 레트로 오피스 룩</strong>
        </div>
        <div className="mission-tags"><span>#소프트</span><span>#레트로</span><span>#오피스</span></div>
        <button onClick={() => {
          setEquipped(["basictee", "cardigan", "denim", "pumps", "lip"]);
          setQuantities({ basictee: 1, cardigan: 1, denim: 1, pumps: 1, lip: 1 });
          setOutfitMode("starter");
          notify("추천 코디를 불러왔어요");
        }}>추천 코디 불러오기</button>
      </section>

      <section className="product-play-bridge" aria-label="상품과 스타일 챌린지 연결">
        <div className="bridge-product" style={{ "--bridge-swatch": focused.swatch } as React.CSSProperties}>
          <i />
          <div><small>지금 보고 있는 상품</small><strong>{focused.name}</strong><span>{won(focused.price)}</span></div>
        </div>
        <div className="bridge-copy">
          <small>SHOP TO PLAY</small>
          <strong>이 상품으로 여름 제주 여행룩 챌린지 참여하기</strong>
          <span>상품을 입혀보고 출품하면 다른 고객의 코디와 함께 노출돼요.</span>
        </div>
        <button onClick={() => {
          equip(focused);
          setChallengeId("travel");
          setPurchased(false);
          notify("선택한 상품으로 제주 여행룩 챌린지를 시작했어요");
        }}>이 상품으로 참여하기 →</button>
      </section>

      <div className="workspace">
        <aside className="catalog-panel panel">
          <div className="panel-heading">
            <div><span>SHOP INVENTORY</span><h1>연결 상품</h1></div>
            <small>{visibleProducts.length} ITEMS</small>
          </div>

          <div className="category-tabs" role="tablist" aria-label="상품 카테고리">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
                role="tab"
                aria-selected={category === item}
              >{item}</button>
            ))}
          </div>

          <div className="product-list">
            {visibleProducts.map((product) => {
              const isEquipped = product.category === "뷰티"
                ? equipped.includes(product.id)
                : visibleEquippedIds.has(product.id);
              const isLiked = liked.includes(product.id);
              return (
                <article
                  className={`product-card ${focusedId === product.id ? "focused" : ""}`}
                  key={product.id}
                  onClick={() => setFocusedId(product.id)}
                >
                  {unlocked.includes(product.id) && <span className="owned-badge">영구 해금</span>}
                  <button
                    className={`heart ${isLiked ? "liked" : ""}`}
                    aria-label={`${product.name} 찜하기`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setLiked((current) => current.includes(product.id)
                        ? current.filter((id) => id !== product.id)
                        : [...current, product.id]);
                    }}
                  >♥</button>
                  <div className="product-thumb" style={{ background: product.swatch }}>
                    <span>{product.category === "뷰티" ? "BEAUTY" : product.category}</span>
                  </div>
                  <div className="product-info">
                    <small>{product.brand}</small>
                    <h2>{product.name}</h2>
                    <div className="mini-tags">{product.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
                    <em className="stock-count">재고 {product.stock}개</em>
                    <b>{won(product.price)}</b>
                  </div>
                  <button
                    className={`equip-button ${isEquipped ? "equipped" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      equip(product);
                    }}
                  >{isEquipped ? (product.id === "basictee" ? "기본 장착" : "착용중") : equipped.includes(product.id) ? "선택됨" : "입어보기"}</button>
                </article>
              );
            })}
          </div>
        </aside>

        <section className="game-panel" aria-label="코디 게임 화면">
          <div className="console-shell">
            <div className="console-top">
              <div className="screen-label"><span>STYLE CAM</span><b>LOOK 07</b></div>
              <div className="avatar-stage">
                <CharacterTurnaroundViewer
                  key={`${gender}-${characterReset}`}
                  character={gender === "female" ? "miyu" : "ren"}
                  outfitMode={outfitMode}
                  height={height}
                  weight={weight}
                  bodyShape={bodyShape}
                  skinTone={skinTone}
                  hairStyle={hairStyle}
                  hairColor={hairColor}
                  eyeColor={eyeColor}
                />
                <div className="outfit-mode-switch" role="group" aria-label="캐릭터 의상 레이어">
                  <button className={outfitMode === "base" ? "active" : ""} onClick={() => setOutfitMode("base")}>기본 바디</button>
                  <button className={outfitMode === "starter" ? "active" : ""} onClick={() => setOutfitMode("starter")}>상품 착장</button>
                </div>
                <div className="scanlines" />
              </div>
              <div className="dialogue-box">
                <span className="portrait">✦</span>
                <p><b>{gender === "male" ? "렌" : "미유"}</b> “내 체형과 취향에 꼭 맞는 스타일을 찾아볼래!”</p>
                <button aria-label="다음 대화" onClick={() => notify("취향 힌트: 채도는 낮고 실루엣은 길게")}>›</button>
              </div>
            </div>

            <div className="console-hinge"><i /><i /><i /></div>

            <div className="console-bottom avatar-editor">
              <div className="editor-heading">
                <span>MY AVATAR</span>
                <div><strong>{gender === "male" ? "렌" : "미유"} · {height}cm · {weight}kg</strong><button onClick={restoreDefaultFemale}>기본 여성 복구</button></div>
              </div>

              <div className="editor-grid">
                <section className="editor-section">
                  <label>캐릭터</label>
                  <div className="segmented-control">
                    <button className={gender === "female" ? "active" : ""} onClick={() => { setGender("female"); setHeight(165); setWeight(55); setOutfitMode("starter"); }}>여성</button>
                    <button className={gender === "male" ? "active" : ""} onClick={() => { setGender("male"); setHeight(175); setWeight(70); setOutfitMode("starter"); }}>남성</button>
                  </div>

                  <label htmlFor="height-range">키 <span className="number-field"><input aria-label="키 직접 입력" type="number" min="145" max="195" value={height} onChange={(event) => setHeight(Math.min(195, Math.max(145, Number(event.target.value))))} />cm</span></label>
                  <input id="height-range" type="range" min="145" max="195" value={height} onChange={(event) => setHeight(Number(event.target.value))} />
                  <label htmlFor="weight-range">몸무게 <span className="number-field"><input aria-label="몸무게 직접 입력" type="number" min="38" max="130" value={weight} onChange={(event) => setWeight(Math.min(130, Math.max(38, Number(event.target.value))))} />kg</span></label>
                  <input id="weight-range" type="range" min="38" max="130" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
                  <label>체형 골격 <b>{bodyShape === "slender" ? "슬렌더" : bodyShape === "athletic" ? "애슬레틱" : "평균"}</b></label>
                  <div className="body-shape-options" role="group" aria-label="체형 골격 선택">
                    <button className={bodyShape === "slender" ? "active" : ""} onClick={() => setBodyShape("slender")}><i>Ⅰ</i>슬렌더</button>
                    <button className={bodyShape === "average" ? "active" : ""} onClick={() => setBodyShape("average")}><i>Ⅱ</i>평균</button>
                    <button className={bodyShape === "athletic" ? "active" : ""} onClick={() => setBodyShape("athletic")}><i>Ⅲ</i>애슬레틱</button>
                  </div>
                </section>

                <section className="editor-section appearance-options">
                  <label>피부톤</label>
                  <div className="swatch-row">
                    {["#f8d2b1", "#f0b485", "#ca865e", "#8c563e", "#5b352b"].map((color) => <button key={color} className={skinTone === color ? "active" : ""} style={{ background: color }} aria-label={`피부톤 ${color}`} onClick={() => setSkinTone(color)} />)}
                  </div>
                  <label>헤어스타일</label>
                  <div className="hair-options">
                    {([1, 2, 3] as const).map((style) => <button key={style} className={hairStyle === style ? "active" : ""} onClick={() => setHairStyle(style)}><i>{style === 1 ? "CLASSIC" : style === 2 ? "SHORT" : "WAVE"}</i>{style}</button>)}
                  </div>
                  <label>머리 컬러</label>
                  <div className="swatch-row">
                    {["#2a211f", "#8a321f", "#c18448", "#e7c9a4", "#724d8d"].map((color) => <button key={color} className={hairColor === color ? "active" : ""} style={{ background: color }} aria-label={`머리 컬러 ${color}`} onClick={() => setHairColor(color)} />)}
                  </div>
                  <label>눈 컬러</label>
                  <div className="swatch-row eye-swatches">
                    {["#43251f", "#527254", "#496d8f", "#806042", "#685487"].map((color) => <button key={color} className={eyeColor === color ? "active" : ""} style={{ background: color }} aria-label={`눈 컬러 ${color}`} onClick={() => setEyeColor(color)} />)}
                  </div>
                </section>
              </div>
            </div>
          </div>
          <p className="stage-note">※ 커머스 상품 데이터가 게임 아이템으로 변환되는 인터랙션 프로토타입입니다.</p>
        </section>

        <aside className="summary-panel panel">
          <div className="score-card">
            <div className="score-ring" style={{ "--score": `${totalStyleScore * 3.6}deg` } as React.CSSProperties}>
              <span><b>{totalStyleScore}</b>/100</span>
            </div>
            <div className="style-score-copy"><small>STYLE SCORE</small><h2>{totalStyleScore} STYLE</h2><p>인기보다 상황과 조합을 함께 평가해요</p></div>
            <div className="score-factors" aria-label="스타일 점수 요약">
              <span><b>상황 적합도</b><i>{stars(themeScore)}</i></span>
              <span><b>컬러 조화</b><i>{stars(stylingScore)}</i></span>
              <span><b>유저 반응</b><i>{stars(communityScore)}</i></span>
            </div>
            <small className="score-method">THEME 35 · COMMUNITY 30 · STYLE 20 · DISCOVERY 15</small>
          </div>

          <section className="outfit-summary">
            <div className="section-title"><span>CURRENT LOOK</span><b>{equippedProducts.length}종 · {pieceCount}개</b></div>
            <div className="selected-list">
              {equippedProducts.map((product) => (
                <div key={product.id}>
                  <i style={{ background: product.swatch }} />
                  <span><small>{product.category}</small>{product.name}</span>
                  {product.id === "basictee" ? <em className="basic-item-badge">FREE</em> : (
                    <div className="quantity-stepper" aria-label={`${product.name} 수량`}>
                      <button onClick={() => setQuantities((current) => ({ ...current, [product.id]: Math.max(1, (current[product.id] ?? 1) - 1) }))}>−</button>
                      <b>{quantities[product.id] ?? 1}</b>
                      <button onClick={() => setQuantities((current) => ({ ...current, [product.id]: Math.min(product.stock, (current[product.id] ?? 1) + 1) }))}>＋</button>
                    </div>
                  )}
                  <b>{won(product.price * (quantities[product.id] ?? 1))}</b>
                  <button aria-label={`${product.name} 제거`} disabled={product.id === "basictee"} onClick={() => {
                    if (product.id === "basictee") return;
                    setEquipped((current) => {
                      const next = current.filter((id) => id !== product.id);
                      return product.category === "상의" ? [...next, "basictee"] : next;
                    });
                  }}>{product.id === "basictee" ? "●" : "×"}</button>
                </div>
              ))}
            </div>
          </section>

          <section className="commerce-summary">
            <div><span>상품 합계</span><b>{won(total)}</b></div>
            <div><span>스타일 플레이 혜택</span><b className="discount">- {won(Math.round(total * 0.08))}</b></div>
            <div className="total-row"><span>예상 결제 금액</span><strong>{won(Math.round(total * 0.92))}</strong></div>
            <button className="primary-cta" onClick={() => setShowShop(true)}>실제 상품으로 쇼핑하기</button>
            <button className="secondary-cta" onClick={() => notify("코디를 나의 옷장에 저장했어요")}>코디 저장 · +120 COIN</button>
          </section>

          <div className="reward-banner"><b>STYLE REWARD</b><span>커머스 방문 시 게임 코인 2배</span><strong>+240 ◉</strong></div>
        </aside>
      </div>

      {purchased && (
        <section className="unlock-banner" aria-live="polite">
          <div><small>PURCHASE COMPLETE</small><strong>구매 완료 · {equippedProducts.length}개 아이템 영구 해금</strong><span>구매한 상품은 앞으로 모든 코디와 챌린지에서 바로 사용할 수 있어요.</span></div>
          <button onClick={() => { setChallengeId("travel"); notify("해금 아이템으로 다음 챌린지를 시작해요"); }}>해금 아이템으로 다시 플레이 →</button>
        </section>
      )}

      <section className="challenge-hub discovery-feed" aria-labelledby="challenge-title">
        <div className="scene-commerce-header">
          <div><span>SCENE COMMERCE</span><h2>상황이 상품 큐레이션이 되는 곳</h2></div>
          <p>브랜드와 MD가 미션·예산·필수 아이템을 설계하고, 고객은 조건에 맞는 상품을 조합해 출품합니다.</p>
        </div>
        <div className="scene-category-grid" role="tablist" aria-label="상황별 쇼핑 카테고리">
          {sceneCommerce.map((scene) => (
            <button key={scene.id} role="tab" aria-selected={sceneGroup === scene.id} className={sceneGroup === scene.id ? "active" : ""} onClick={() => { setSceneGroup(scene.id); setSceneExample(0); setVoted(false); }}>
              <i>{scene.icon}</i><b>{scene.label}</b><small>{scene.examples.length} SCENES</small>
            </button>
          ))}
        </div>
        <div className="scene-detail-shell">
          <div className="scene-example-list" role="group" aria-label={`${activeScene.label} 세부 상황`}>
            {activeScene.examples.map((example, index) => <button key={example} className={sceneExample === index ? "active" : ""} onClick={() => setSceneExample(index)}>{example}</button>)}
          </div>
          <article className="sponsored-mission">
            <div className="mission-owner"><small>BRAND MISSION BY</small><b>{activeScene.sponsor}</b><span>기업·브랜드가 직접 설계한 상품 큐레이션</span></div>
            <div className="mission-core"><small>{activeScene.icon} {activeScene.label} · {activeScene.examples[sceneExample]}</small><h3>{activeScene.mission}</h3><div><b>예산 조건</b><span>{activeScene.budget}</span></div></div>
            <div className="mission-slots"><small>필수 조합</small><div>{activeScene.slots.map((slot, index) => <span key={slot}><i>{index + 1}</i>{slot}</span>)}</div></div>
            <div className="mission-actions"><button onClick={() => notify(`${activeScene.mission} 조건에 맞는 상품만 불러왔어요`)}>조건 상품만 보기</button><button onClick={() => { setPurchased(false); setVoted(false); notify(`${activeScene.examples[sceneExample]} 미션 코디를 시작했어요`); }}>이 미션으로 코디 시작 →</button></div>
          </article>
        </div>
        <div className="challenge-heading">
          <div><span>STYLE CHALLENGE</span><h2 id="challenge-title">상황별 코디 배틀</h2></div>
          <p>실제 상품으로 코디를 만들고, 마음에 드는 룩에 투표해요. 우승자는 선물을 받고 다른 사용자는 룩을 그대로 쇼핑할 수 있어요.</p>
        </div>
        <div className="challenge-tabs" role="tablist" aria-label="코디 상황 선택">
          {challenges.map((item) => <button key={item.id} role="tab" aria-selected={challengeId === item.id} className={challengeId === item.id ? "active" : ""} onClick={() => { setChallengeId(item.id); setVoted(false); }}><i>{item.icon}</i><b>{item.title}</b><small>{item.entrants}명 참가</small></button>)}
        </div>
        <div className="challenge-content">
          <article className="challenge-brief">
            <span>THIS WEEK&apos;S SCENE</span><h3>{challenge.title}</h3><p>{challenge.brief}</p>
            <div>{challenge.tags.map((tag) => <b key={tag}>#{tag}</b>)}</div>
            <strong>1등 선물 · {challenge.reward}</strong>
            <button onClick={() => notify(`${challenge.title}에 현재 코디를 출품했어요`)}>내 코디 출품하기</button>
          </article>
          <section className="winner-commerce" aria-label="이번 주 1위 룩 구매">
            <div className="winner-look-visual"><span>🏆 이번 주 1위</span><div className="look-mini" style={{ "--look-color": "#bba2ca" } as React.CSSProperties}><i /><i /></div><strong>SUMMER<br />OFFICE LOOK</strong><small>92 STYLE SCORE</small></div>
            <div className="winner-look-shop">
              <div className="look-price-switch" role="group" aria-label="원본 또는 합리적 가격의 유사 룩">
                <button className={lookBudgetMode === "original" ? "active" : ""} onClick={() => setLookBudgetMode("original")}><small>ORIGINAL</small>27만원 원본</button>
                <i>→</i>
                <button className={lookBudgetMode === "smart" ? "active" : ""} onClick={() => setLookBudgetMode("smart")}><small>SMART MATCH</small>14만원으로 비슷하게</button>
              </div>
              <div className="winner-item-list">{activeLookItems.map(([name, price]) => <div key={name}><span>{name}</span><b>{won(price)}</b></div>)}</div>
              <div className="winner-total"><span>TOTAL</span><strong>{won(activeLookTotal)}</strong></div>
              <div className="winner-actions"><button onClick={() => setShowShop(true)}>전체 구매</button><button onClick={() => { setLookBudgetMode("smart"); notify("같은 무드의 15만원 이하 상품으로 교체했어요"); }}>비슷한 룩 15만원 이하로 만들기</button></div>
            </div>
          </section>
          <div className="vote-board">
            <article className="buyable-look">
              <div><small>SHOP THE WINNING LOOK</small><strong>루나의 제주 선셋 룩</strong><span>가디건 · 데님 · 펌프스 · 립 틴트</span></div>
              <div><b>214,000원</b><button onClick={() => setShowShop(true)}>이 룩 그대로 구매하기 →</button></div>
            </article>
            {[
              { rank: 1, name: "루미", score: 92, votes: 1284, palette: "#bba2ca", label: "SOFT OFFICE" },
              { rank: 2, name: "하나", score: 89, votes: 1137, palette: "#7ba9a7", label: "MINT RETRO" },
              { rank: 3, name: "소라", score: 87, votes: 986, palette: "#714a70", label: "PLUM CLASSIC" },
            ].map((entry) => <article key={entry.rank} className="vote-card"><span className="rank">#{entry.rank}</span><div className="look-mini" style={{ "--look-color": entry.palette } as React.CSSProperties}><i /><i /></div><div><small>{entry.label}</small><h3>{entry.name}의 코디</h3><p><b>{entry.score} STYLE</b> · ♥ {(entry.votes + (voted && entry.rank === 1 ? 1 : 0)).toLocaleString()}</p></div><button disabled={voted} onClick={() => { setVoted(true); notify("커뮤니티 점수에 투표가 반영됐어요 · +20 COIN"); }}>{voted ? "투표 완료" : "커뮤니티 투표"}</button></article>)}
          </div>
        </div>
      </section>

      <section className="friend-battle" aria-labelledby="friend-battle-title">
        <div className="friend-battle-heading"><div><span>FRIEND BATTLE</span><h2 id="friend-battle-title">친구에게 코디 대결 신청</h2></div><p>링크를 받은 친구는 가입 전에도 A/B 룩에 투표하고, 결과에서 상품을 바로 볼 수 있어요.</p></div>
        <div className="battle-card">
          <div className="battle-topic"><small>이번 대결 주제</small><strong>{activeScene.examples[sceneExample]} LOOK</strong><span>“누가 더 {activeScene.examples[sceneExample]}에 잘 입었어?”</span></div>
          <article className={friendVote === "a" ? "battle-look selected" : "battle-look"}><b>A</b><div className="look-mini" style={{ "--look-color": "#bba2ca" } as React.CSSProperties}><i /><i /></div><div><small>MY LOOK</small><strong>다경의 LOOK</strong><span>{friendVote === "a" ? "12표" : "11표"}</span></div><button disabled={!!friendVote} onClick={() => setFriendVote("a")}>{friendVote === "a" ? "내 선택" : "A 투표"}</button></article>
          <strong className="battle-vs">VS</strong>
          <article className={friendVote === "b" ? "battle-look selected" : "battle-look"}><b>B</b><div className="look-mini" style={{ "--look-color": "#7ba9a7" } as React.CSSProperties}><i /><i /></div><div><small>FRIEND LOOK</small><strong>친구의 LOOK</strong><span>{friendVote === "b" ? "10표" : "9표"}</span></div><button disabled={!!friendVote} onClick={() => setFriendVote("b")}>{friendVote === "b" ? "내 선택" : "B 투표"}</button></article>
          <div className="battle-share"><small>{battleShared ? "외부 투표 진행 중" : "친구를 초대하면 대결 시작"}</small><button onClick={shareFriendBattle}>카카오톡 · 인스타로 링크 공유 →</button></div>
        </div>
      </section>

      {toast && <div className="toast" role="status">{toast}</div>}

      {showShop && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowShop(false)}>
          <section className="shop-modal" role="dialog" aria-modal="true" aria-labelledby="shop-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" aria-label="닫기" onClick={() => setShowShop(false)}>×</button>
            <span className="modal-eyebrow">COMMERCE HANDOFF</span>
            <h2 id="shop-title">게임 코디 그대로 쇼핑하기</h2>
            <p>선택한 상품을 실제 커머스 장바구니로 넘기기 전 단계입니다.</p>
            <div className="modal-items">
              {equippedProducts.map((product) => (
                <div key={product.id}><i style={{ background: product.swatch }} /><span>{product.name} × {quantities[product.id] ?? 1}</span><b>{won(product.price * (quantities[product.id] ?? 1))}</b></div>
              ))}
            </div>
            <div className="modal-total"><span>플레이 혜택 적용</span><strong>{won(Math.round(total * 0.92))}</strong></div>
            <button className="primary-cta" onClick={() => {
              setShowShop(false);
              setPurchased(true);
              setUnlocked((current) => Array.from(new Set([...current, ...equippedProducts.map((product) => product.id)])));
              notify("커머스 장바구니 연결을 확인했어요");
            }}>장바구니 연결 확인</button>
          </section>
        </div>
      )}
    </main>
  );
}
