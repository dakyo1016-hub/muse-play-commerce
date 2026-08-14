"use client";

import { useEffect, useState } from "react";
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

const commerceItems = [
  { id: "recto-jacket", category: "OUTER", brand: "RECTO", name: "Linen Crop Jacket", price: 189000, likes: "2.1K", swatch: "linear-gradient(145deg,#d9d2c7,#9b8d7d)" },
  { id: "serie-top", category: "TOP", brand: "SÉRIE STUDIO", name: "Sheer Layered Top", price: 49000, likes: "1.8K", swatch: "linear-gradient(145deg,#ece4dc,#c7b6ad)" },
  { id: "moment-skirt", category: "BOTTOM", brand: "MOMENT EDITION", name: "Soft Pleats Skirt", price: 89000, likes: "3.4K", swatch: "linear-gradient(145deg,#cab7cc,#8f7496)" },
  { id: "forme-shoes", category: "SHOES", brand: "FORME", name: "Square Slingback", price: 59000, likes: "980", swatch: "linear-gradient(145deg,#a9c8c0,#668f88)" },
  { id: "archive-dress", category: "DRESS", brand: "ARCHIVE 101", name: "Bias Slip Dress", price: 139000, likes: "2.7K", swatch: "linear-gradient(145deg,#c7a1aa,#845765)" },
  { id: "marge-bag", category: "BAG", brand: "MARGE SHERWOOD", name: "Soft Baguette Bag", price: 128000, likes: "4.9K", swatch: "linear-gradient(145deg,#4e4748,#1f1b1c)" },
  { id: "numbering-necklace", category: "ACC", brand: "NUMBERING", name: "Curve Chain Necklace", price: 76000, likes: "1.2K", swatch: "linear-gradient(145deg,#f0e4c4,#a68b56)" },
  { id: "jungsaem-base", category: "BEAUTY", brand: "JUNG SAEM MOOL", name: "Skin Nuder Cushion", price: 42000, likes: "7.1K", swatch: "linear-gradient(145deg,#f4e4d5,#c7aa90)" },
  { id: "so-natural-fixer", category: "BEAUTY", brand: "SO NATURAL", name: "All Day Tight Fixer", price: 18000, likes: "6.4K", swatch: "linear-gradient(145deg,#dbe5e0,#91aaa0)" },
  { id: "clio-mascara", category: "BEAUTY", brand: "CLIO", name: "Sharp So Simple Mascara", price: 22000, likes: "4.3K", swatch: "linear-gradient(145deg,#635657,#211b1c)" },
  { id: "hince-lip", category: "BEAUTY", brand: "HINCE", name: "Mood Enhancer Lip", price: 24000, likes: "5.8K", swatch: "linear-gradient(145deg,#ed9aa7,#a83f59)" },
] as const;

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
  const [closetReady, setClosetReady] = useState(false);
  const [mainTab, setMainTab] = useState<"home" | "category" | "play" | "search" | "my">("play");
  const [searchQuery, setSearchQuery] = useState("");
  const [playStep, setPlayStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [playType, setPlayType] = useState<"fashion" | "beauty">("fashion");
  const [createMode, setCreateMode] = useState<"avatar" | "moodboard">("moodboard");
  const [createCategory, setCreateCategory] = useState("ALL");
  const [voteRound, setVoteRound] = useState(0);
  const [selectedCommerceIds, setSelectedCommerceIds] = useState<string[]>(["serie-top", "moment-skirt", "forme-shoes"]);
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
  const styleDNA = [
    { label: "SOFT", value: Math.min(96, 78 + liked.length * 2), color: "#d95d77" },
    { label: "RETRO", value: Math.min(94, 67 + unlocked.length * 2), color: "#ad96bc" },
    { label: "MINIMAL", value: Math.min(90, 60 + equippedProducts.length), color: "#79aaa0" },
    { label: "ROMANTIC", value: Math.min(88, 54 + hairStyle * 2), color: "#f0a6b5" },
  ];
  const closetRecommendations = products.filter((product) => ["trench", "blouse", "sneakers"].includes(product.id));
  const brandAliases: Record<string, string> = {
    basictee: "MUSE ESSENTIAL", cardigan: "SÉRIE STUDIO", denim: "LAYERED SEOUL", skirt: "MOMENT EDITION",
    pumps: "FORME", lip: "DEW LAB", blush: "DEW LAB", blouse: "ATELIER NINE", tee: "ORDINARY UNIT",
    widepants: "STUDIO COLUMN", jacket: "ARCHIVE 101", trench: "CITY ÉTUDES", sneakers: "GROUND STANDARD",
  };
  const visibleEquippedIds = outfitMode === "starter"
    ? new Set(["basictee", "cardigan", "denim", "pumps", ...equippedProducts.filter((product) => product.category === "뷰티").map((product) => product.id)])
    : new Set<string>();
  const visibleCommerceItems = createCategory === "ALL" ? commerceItems : commerceItems.filter((item) => item.category === createCategory);
  const selectedCommerceItems = commerceItems.filter((item) => selectedCommerceIds.includes(item.id));
  const commerceLookTotal = selectedCommerceItems.reduce((sum, item) => sum + item.price, 0);

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

  const castQuickVote = (choice: "a" | "b") => {
    if (voteRound >= 5) return;
    setFriendVote(choice);
    setVoteRound((current) => current + 1);
    window.setTimeout(() => setFriendVote(null), 260);
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

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("muse-digital-closet");
      if (saved) {
        const data = JSON.parse(saved) as { liked?: string[]; unlocked?: string[]; equipped?: string[] };
        if (data.liked) setLiked(data.liked);
        if (data.unlocked) setUnlocked(data.unlocked);
        if (data.equipped) setEquipped(data.equipped);
      }
    } catch { /* Device-local personalization is optional in the prototype. */ }
    setClosetReady(true);
  }, []);

  useEffect(() => {
    if (!closetReady) return;
    window.localStorage.setItem("muse-digital-closet", JSON.stringify({ liked, unlocked, equipped }));
  }, [closetReady, liked, unlocked, equipped]);

  return (
    <main className={`app-shell portfolio-mode tab-${mainTab}`}>
      <header className="topbar">
        <div className="brand-lockup">
          <div>
            <strong>MUSE PLAY</strong>
            <span>PLAY COMMERCE MODULE</span>
          </div>
        </div>

        <nav className="platform-nav" aria-label="MUSE SELECT 메인 메뉴">
          {(["home", "category", "play", "search", "my"] as const).map((tab) => {
            const labels = { home: "SHOP", category: "CATEGORY", play: "PLAY", search: "DISCOVER", my: "CLOSET" };
            return <button key={tab} className={mainTab === tab ? "active" : ""} onClick={() => { setMainTab(tab); if (tab === "play") setPlayStep(1); }}>{labels[tab]}</button>;
          })}
        </nav>
        <span className="portfolio-badge">PORTFOLIO CASE · 2026</span>
      </header>

      {mainTab === "play" && (
        <section className="pc-shell">
          <nav className="pc-progress" aria-label="PLAY Commerce 핵심 흐름">
            {[[1,"CHALLENGE"],[2,"CREATE"],[3,"STYLE CHECK"],[4,"VOTE"],[5,"DISCOVER"],[6,"SHOP"]].map(([step,label]) => <button key={label} className={playStep === step ? "active" : playStep > Number(step) ? "done" : ""} onClick={() => setPlayStep(step as 1 | 2 | 3 | 4 | 5 | 6)}><span>0{step}</span>{label}</button>)}
          </nav>

          {playStep === 1 && <section className="pc-home">
            <div className="pc-type-tabs"><button className={playType === "fashion" ? "active" : ""} onClick={() => setPlayType("fashion")}>FASHION PLAY</button><button className={playType === "beauty" ? "active" : ""} onClick={() => setPlayType("beauty")}>BEAUTY PLAY</button></div>
            <div className="pc-hero">
              <div className="pc-hero-copy"><small>WHAT WOULD YOU WEAR?</small><h1>매일 새로운 상황.<br />실제 상품으로 만드는<br />나만의 선택.</h1><p>상품을 보는 데서 끝나지 않고, 상황 속에서 직접 사용해보는 새로운 쇼핑 방식입니다.</p><div className="pc-loop"><span>STYLE</span><i>→</i><span>VOTE</span><i>→</i><span>DISCOVER</span><i>→</i><span>SHOP</span></div></div>
              <article className="pc-challenge-card"><div className="pc-card-meta"><span>TODAY&apos;S CHALLENGE</span><b>{playType === "fashion" ? "FASHION" : "BEAUTY"}</b></div><h2>{playType === "fashion" ? <>갑자기 잡힌<br />금요일 저녁 소개팅</> : <>소개팅인데<br />수정화장할 시간 없음</>}</h2><p>{playType === "fashion" ? "첫인상은 선명하게, 성수에서 오래 걸어도 편안하게." : "자연광에서도 무너지지 않는 8시간 지속 메이크업."}</p><div className="pc-conditions">{(playType === "fashion" ? ["성수 · 27°C","CASUAL DATE","BUDGET ₩200,000"] : ["8H WEAR","SUMMER","BUDGET ₩100,000"]).map((item) => <span key={item}>{item}</span>)}</div><strong>8,241 LOOKS</strong><button onClick={() => { setCreateCategory(playType === "fashion" ? "ALL" : "BEAUTY"); setPlayStep(2); }}>CREATE MY {playType === "fashion" ? "LOOK" : "ROUTINE"} →</button><small>참여 완료 시 멤버십 100P</small></article>
            </div>

            <section className="pc-trending"><div className="pc-section-head"><div><small>COMMUNITY CURATION</small><h2>TRENDING LOOKS</h2></div><button onClick={() => setPlayStep(5)}>전체 보기 →</button></div><div className="pc-look-grid">{[["01","SOFT LAYER","#bba2ca","3.2K"],["02","CITY MINIMAL","#719b92","2.8K"],["03","QUIET ROMANCE","#c08b9b","2.1K"],["04","OFF-DUTY","#7f7b74","1.9K"]].map(([no,label,color,likes]) => <article key={no} onClick={() => setPlayStep(6)}><div className="pc-look-art" style={{ "--look-color":color } as React.CSSProperties}><span>{no}</span><div className="large-look-figure"><i /><i /><i /></div></div><small>{label}</small><strong>LOOK {no}</strong><span>♡ {likes}</span></article>)}</div></section>

            <section className="pc-scene-list"><div className="pc-section-head"><div><small>REAL-LIFE CONSTRAINTS</small><h2>상황이 구체적일수록, 선택은 재미있어진다</h2></div></div><div>{[
              ["WORK","첫 출근인데 너무 꾸민 것처럼 보이기는 싫어","₩250K · 29°C · RAIN"],["EVENT","친구 결혼식인데 전남친도 온다","FORMAL 70% · ₩300K"],["FESTIVAL","페스티벌 8시간 버텨야 하는 룩","31°C · OUTDOOR · COMFORT"],["TRAVEL","제주도 여행 마지막 날","MY JEANS · UNDER ₩100K"],
            ].map(([type,title,rule]) => <article key={type}><small>{type}</small><strong>{title}</strong><span>{rule}</span><button onClick={() => setPlayStep(2)}>이 상황으로 PLAY →</button></article>)}</div></section>

            <section className="pc-case-study"><div><small>PORTFOLIO THESIS</small><h2>상품을 ‘보는 것’에서<br />상품을 ‘사용해보는 놀이’로.</h2></div><div className="pc-case-logic">{[["01 PROBLEM","검색 → 리스트 → 상세의 반복"],["02 OPPORTUNITY","구매 목적이 없어도 발견할 이유"],["03 HYPOTHESIS","실제 상품을 상황 속에서 조합"],["04 VALUE","참여 데이터가 발견과 전환으로"]].map(([no,text]) => <span key={no}><b>{no}</b>{text}</span>)}</div><div className="pc-value-flow">{[["PLAY","체류시간"],["CREATE","상품 탐색량"],["VOTE","취향 데이터"],["SHARE","신규 유입"],["SHOP","구매 전환"]].map(([action,value]) => <span key={action}><b>{action}</b>{value}</span>)}</div></section>
          </section>}

          {playStep === 2 && <section className="pc-create">
            <div className="pc-page-title"><div><small>02 · CREATE</small><h1>쇼핑하듯 탐색하고,<br />에디토리얼처럼 조합하세요.</h1></div><p>판매 상품 DB의 가격·재고·브랜드 정보를 그대로 활용합니다.</p></div>
            <div className="pc-create-toolbar"><div className="pc-category-tabs">{["ALL","OUTER","TOP","BOTTOM","DRESS","SHOES","BAG","ACC","BEAUTY"].map((item) => <button key={item} className={createCategory === item ? "active" : ""} onClick={() => setCreateCategory(item)}>{item}</button>)}</div><div className="pc-filters">{["가격","컬러","브랜드","스타일","인기순 ↓"].map((item) => <button key={item} onClick={() => notify(`${item} 필터를 적용했어요`)}>{item}</button>)}</div></div>
            <div className="pc-create-grid">
              <section className="pc-product-market"><div className="pc-product-count"><span>{visibleCommerceItems.length} PRODUCTS</span><b>LIVE CATALOG</b></div><div className="pc-product-cards">{visibleCommerceItems.map((item) => { const selected = selectedCommerceIds.includes(item.id); return <article key={item.id} className={selected ? "selected" : ""}><button className="pc-heart" onClick={() => notify(`${item.brand} 상품을 찜했어요`)}>♡ {item.likes}</button><i style={{ background:item.swatch }} /><small>{item.brand}</small><strong>{item.name}</strong><span>{won(item.price)}</span><button className="pc-try" onClick={() => setSelectedCommerceIds((current) => selected ? current.filter((id) => id !== item.id) : [...current,item.id])}>{selected ? "LOOK에서 빼기" : "+ LOOK에 추가"}</button></article>; })}</div></section>
              <aside className="pc-builder"><div className="pc-builder-head"><div><small>CREATE MODE</small><div><button className={createMode === "avatar" ? "active" : ""} onClick={() => setCreateMode("avatar")}>AVATAR</button><button className={createMode === "moodboard" ? "active" : ""} onClick={() => setCreateMode("moodboard")}>MOODBOARD</button></div></div><span>AUTOSAVE</span></div>{createMode === "avatar" ? <div className="pc-avatar-canvas"><CharacterTurnaroundViewer key={`pc-${gender}-${characterReset}`} character={gender === "female" ? "miyu" : "ren"} outfitMode="starter" height={height} weight={weight} bodyShape={bodyShape} skinTone={skinTone} hairStyle={hairStyle} hairColor={hairColor} eyeColor={eyeColor} /></div> : <div className="pc-moodboard"><em>FRIDAY · SEONGSU</em>{selectedCommerceItems.map((item,index) => <div key={item.id} className={`pc-mood-item mood-${index % 6}`}><i style={{ background:item.swatch }} /><span>{item.category}</span></div>)}<strong>FIRST<br />IMPRESSION</strong></div>}<div className="pc-look-total"><span>{selectedCommerceItems.length} ITEMS</span><strong>{won(commerceLookTotal)}</strong></div><button className="pc-primary" onClick={() => setPlayStep(3)}>STYLE CHECK →</button></aside>
            </div>
          </section>}

          {playStep === 3 && <section className="pc-check">
            <div className="pc-check-look"><div className="pc-moodboard preview"><em>YOUR ENTRY</em>{selectedCommerceItems.map((item,index) => <div key={item.id} className={`pc-mood-item mood-${index % 6}`}><i style={{ background:item.swatch }} /></div>)}<strong>SEONGSU<br />FIRST DATE</strong></div></div>
            <div className="pc-check-copy"><small>STYLE CHECK</small><h1>READY TO ENTER</h1><p>설명하기 어려운 AI 점수 대신, 미션 조건을 충족했는지만 투명하게 확인합니다.</p><div className="pc-check-list"><span><i>✓</i><b>예산 안에 들어왔어요</b><em>{won(commerceLookTotal)} / ₩200,000</em></span><span><i>✓</i><b>Dress code에 적합해요</b><em>CASUAL DATE</em></span><span><i>✓</i><b>날씨에 적합한 조합이에요</b><em>27°C · LIGHT LAYER</em></span></div><button className="pc-primary" onClick={() => { setVoteRound(0); setFriendVote(null); setPlayStep(4); notify("챌린지 출품이 완료됐어요 · 100P 적립"); }}>챌린지 출품하기 →</button><small>출품 완료 · 멤버십 100P 적립</small></div>
          </section>}

          {playStep === 4 && <section className="pc-vote">
            <div className="pc-page-title"><div><small>04 · QUICK VOTE</small><h1>WHICH WOULD<br />YOU WEAR?</h1></div><p>재미로 고른 5번의 선택이 개인화 추천 데이터가 됩니다.</p></div>
            {voteRound < 5 ? <><div className="pc-vote-progress"><span style={{ width:`${voteRound * 20}%` }} /><b>{voteRound + 1} / 5</b></div><div className="pc-swipe-board"><button className={friendVote === "a" ? "selected" : ""} onClick={() => castQuickVote("a")}><small>LOOK A · {[["MINIMAL"],["FEMININE"],["CLASSIC"],["RETRO"],["SPORTY"]][voteRound]}</small><div className="large-look-figure" style={{ "--look-color":["#bba2ca","#c08b9b","#8e887e","#826c83","#779c94"][voteRound] } as React.CSSProperties}><i /><i /><i /></div><strong>← A 선택</strong></button><b>VS</b><button className={friendVote === "b" ? "selected" : ""} onClick={() => castQuickVote("b")}><small>LOOK B · {[["ROMANTIC"],["MODERN"],["CASUAL"],["SOFT"],["CITY"]][voteRound]}</small><div className="large-look-figure" style={{ "--look-color":["#719b92","#696b78","#b79b7b","#d29aaa","#5f6470"][voteRound] } as React.CSSProperties}><i /><i /><i /></div><strong>B 선택 →</strong></button></div><p className="pc-vote-hint">선택하면 다음 두 룩이 바로 나타납니다</p></> : <div className="pc-taste-result"><small>5 VOTES COMPLETE</small><h2>YOUR TASTE</h2><p>당신의 선택에서 발견한 취향 신호예요.</p>{[["MINIMAL",72],["FEMININE",64],["CLASSIC",51]].map(([label,value]) => <span key={label}><b>{label}</b><i><em style={{ width:`${value}%` }} /></i><strong>{value}%</strong></span>)}<button className="pc-primary" onClick={() => setPlayStep(5)}>취향에 맞는 룩 보기 →</button></div>}
          </section>}

          {playStep === 5 && <section className="pc-discover"><div className="pc-winner"><div><small>8,429 PEOPLE CHOSE</small><h1>THIS WEEK&apos;S<br />BEST LOOK</h1><p>사람들의 선택으로 발견된<br />금요일 성수 소개팅 우승작.</p><strong>12,842 VOTES</strong><button className="pc-primary" onClick={() => setPlayStep(6)}>SHOP THIS LOOK →</button></div><div className="pc-winner-art"><div className="large-look-figure" style={{ "--look-color":"#bba2ca" } as React.CSSProperties}><i /><i /><i /></div><span>WEEK 24<br />WINNER</span></div></div><div className="pc-section-head"><div><small>PERSONALIZED DISCOVERY</small><h2>당신의 취향과 가까운 룩</h2></div></div><div className="pc-look-grid">{[["01","QUIET MINIMAL","#719b92","4.9K"],["02","SOFT FORMAL","#c08b9b","3.8K"],["03","CITY CLASSIC","#8a8075","3.2K"],["04","ROMANTIC LAYER","#bba2ca","2.9K"]].map(([no,label,color,likes]) => <article key={no} onClick={() => setPlayStep(6)}><div className="pc-look-art" style={{ "--look-color":color } as React.CSSProperties}><span>{no}</span><div className="large-look-figure"><i /><i /><i /></div></div><small>{label}</small><strong>COMMUNITY LOOK</strong><span>♡ {likes}</span></article>)}</div></section>}

          {playStep === 6 && <section className="pc-shop"><div className="pc-shop-visual"><small>SHOP THIS LOOK</small><div className="large-look-figure" style={{ "--look-color":"#bba2ca" } as React.CSSProperties}><i /><i /><i /></div><h1>THE<br />WINNER</h1><span>12,842 VOTES</span></div><div className="pc-shop-panel"><small>FROM PLAY TO PURCHASE</small><h2>{lookBudgetMode === "original" ? "우승 룩 그대로 구매하기" : "20만원 아래로 비슷하게 입기"}</h2><div className="pc-price-switch"><button className={lookBudgetMode === "original" ? "active" : ""} onClick={() => setLookBudgetMode("original")}><small>ORIGINAL</small>₩386K</button><i>→</i><button className={lookBudgetMode === "smart" ? "active" : ""} onClick={() => setLookBudgetMode("smart")}><small>SIMILAR MOOD</small>₩198K</button></div><div className="pc-shop-items">{(lookBudgetMode === "original" ? [["OUTER","RECTO",129000],["TOP","SÉRIE STUDIO",49000],["BOTTOM","MOMENT EDITION",89000],["SHOES","FORME",119000]] : [["OUTER","ORDINARY UNIT",59000],["TOP","LAYERED SEOUL",32000],["BOTTOM","MOMENT BASIC",58000],["SHOES","GROUND STANDARD",49000]]).map(([type,brand,price]) => <article key={type as string}><i /><div><small>{type}</small><strong>{brand}</strong></div><b>{won(price as number)}</b><button onClick={() => notify(`${brand} 상품 상세를 열었어요`)}>보기</button></article>)}</div><div className="pc-shop-total"><span>TOTAL</span><strong>{lookBudgetMode === "original" ? "₩386,000" : "₩198,000"}</strong></div><button className="pc-primary" onClick={() => { setPurchased(true); notify("선택한 룩 전체를 장바구니에 담았어요"); }}>ADD ALL TO BAG</button><button className="pc-secondary" onClick={() => setLookBudgetMode(lookBudgetMode === "original" ? "smart" : "original")}>{lookBudgetMode === "original" ? "SIMILAR LOOK UNDER ₩200K →" : "ORIGINAL LOOK 보기 →"}</button>{purchased && <div className="pc-purchase-done">장바구니 담기 완료 · 구매 후 MY CLOSET에 영구 등록됩니다.</div>}</div></section>}
        </section>
      )}

      {false && mainTab === "play" && (
        <section className="play-flow-shell">
          <nav className="play-flow-nav" aria-label="PLAY 데모 단계">
            {(["PLAY HOME", "CREATE LOOK", "RESULT", "VOTE", "WINNER", "SHOP THE LOOK"] as const).map((label, index) => <button key={label} className={playStep === index + 1 ? "active" : playStep > index + 1 ? "done" : ""} onClick={() => setPlayStep((index + 1) as 1 | 2 | 3 | 4 | 5 | 6)}><i>{String(index + 1).padStart(2,"0")}</i><span>{label}</span></button>)}
          </nav>

          {playStep === 1 && <section className="play-home-screen">
            <div className="play-home-hero"><div><small>TODAY&apos;S CHALLENGE</small><h1>금요일 저녁,<br />성수 소개팅</h1><p>첫인상은 선명하게, 오래 걸어도 편안하게.<br /><b>150,000원</b> 안에서 코디하세요.</p><span><b>8,421명</b> 참여 · 오늘 자정 마감</span><button onClick={() => setPlayStep(2)}>코디 만들기 →</button></div><div className="challenge-poster"><span>FRIDAY<br />FIRST DATE</span><small>SEONGSU · 19:30</small></div></div>
            <div className="play-home-modules">{[
              ["TRENDING LOOKS","실시간 인기 코디","05"],["BRAND CHALLENGE","신제품으로 만드는 미션","01"],["FRIEND BATTLE","친구와 A/B 코디 대결","12"],["BEAUTY PLAY","상황별 메이크업 조합","08"],
            ].map(([title,desc,count], index) => <button key={title} onClick={() => setPlayStep(index === 2 ? 4 : index === 0 ? 5 : 2)}><small>{count} LIVE</small><strong>{title}</strong><span>{desc}</span><i>→</i></button>)}</div>
          </section>}

          {playStep === 2 && <section className="create-look-screen">
            <div className="flow-screen-heading"><div><small>02 · CREATE LOOK</small><h1>실제 판매 상품으로 코디하기</h1></div><span>LIVE PRODUCT DB · PRICE & STOCK CONNECTED</span></div>
            <div className="create-look-layout">
              <aside className="flow-product-picker"><div className="flow-category-row">{["상의","하의","아우터","신발","가방","액세서리","뷰티"].map((item) => <button key={item}>{item}</button>)}</div><div className="flow-product-list">{products.slice(0,8).map((product) => <article key={product.id} className={equipped.includes(product.id) ? "selected" : ""}><i style={{ background: product.swatch }} /><div><small>{brandAliases[product.id]}</small><strong>{product.name}</strong><span>{won(product.price)}</span></div><button onClick={() => equip(product)}>{equipped.includes(product.id) ? "착용 중" : "입어보기"}</button></article>)}</div></aside>
              <div className="flow-avatar-stage"><CharacterTurnaroundViewer key={`flow-${gender}-${characterReset}`} character={gender === "female" ? "miyu" : "ren"} outfitMode={outfitMode} height={height} weight={weight} bodyShape={bodyShape} skinTone={skinTone} hairStyle={hairStyle} hairColor={hairColor} eyeColor={eyeColor} /></div>
              <aside className="flow-look-summary"><small>YOUR LOOK</small><h2>성수 소개팅 룩</h2><div>{equippedProducts.map((product) => <span key={product.id}><i style={{ background: product.swatch }} /><b>{product.name}</b><em>{won(product.price)}</em></span>)}</div><p><span>TOTAL</span><strong>{won(total)}</strong></p><button onClick={() => setPlayStep(3)}>스타일 분석 보기 →</button></aside>
            </div>
          </section>}

          {playStep === 3 && <section className="result-screen">
            <div className="result-avatar"><div className="flow-avatar-stage"><CharacterTurnaroundViewer key={`result-${gender}`} character={gender === "female" ? "miyu" : "ren"} outfitMode="starter" height={height} weight={weight} bodyShape={bodyShape} skinTone={skinTone} hairStyle={hairStyle} hairColor={hairColor} eyeColor={eyeColor} /></div></div>
            <div className="result-score"><small>STYLE MATCH</small><h1>92</h1><strong>FIRST DATE · EXCELLENT MATCH</strong><div><span><b>상황 적합도</b><i>★★★★★</i></span><span><b>컬러 밸런스</b><i>★★★★☆</i></span><span><b>스타일 완성도</b><i>★★★★★</i></span></div><p>커뮤니티 인기만이 아니라 상황·컬러·실루엣·새 상품 활용도를 함께 평가했어요.</p><button onClick={() => { setFriendVote(null); setPlayStep(4); notify("금요일 성수 소개팅 챌린지에 출품했어요"); }}>챌린지 출품하기 →</button></div>
          </section>}

          {playStep === 4 && <section className="vote-screen"><div className="flow-screen-heading"><div><small>04 · COMMUNITY VOTE</small><h1>FIRST DATE</h1></div><span>어느 코디가 성수 소개팅에 더 잘 어울리나요?</span></div><div className="versus-looks"><article className={friendVote === "a" ? "selected" : ""}><small>LOOK A</small><div className="large-look-figure" style={{ "--look-color":"#bba2ca" } as React.CSSProperties}><i /><i /><i /></div><strong>다경의 SOFT LOOK</strong><span>92 STYLE SCORE</span><button disabled={!!friendVote} onClick={() => setFriendVote("a")}>{friendVote === "a" ? "내 선택" : "LOOK A 투표"}</button></article><b>VS</b><article className={friendVote === "b" ? "selected" : ""}><small>LOOK B</small><div className="large-look-figure" style={{ "--look-color":"#7ba9a7" } as React.CSSProperties}><i /><i /><i /></div><strong>친구의 MINIMAL LOOK</strong><span>89 STYLE SCORE</span><button disabled={!!friendVote} onClick={() => setFriendVote("b")}>{friendVote === "b" ? "내 선택" : "LOOK B 투표"}</button></article></div><button className="flow-next-button" onClick={() => setPlayStep(5)} disabled={!friendVote}>투표 결과와 우승 룩 보기 →</button></section>}

          {playStep === 5 && <section className="winner-community-screen"><div className="weekly-winner"><div><small>🏆 WEEKLY WINNER</small><h1>SUMMER<br />OFFICE LOOK</h1><span>12,842 VOTES · 94 STYLE SCORE</span><button onClick={() => setPlayStep(6)}>우승 코디 상품 보기 →</button></div><div className="winner-figure large-look-figure" style={{ "--look-color":"#bba2ca" } as React.CSSProperties}><i /><i /><i /></div></div><div className="community-feed-heading"><small>COMMUNITY</small><h2>다른 사람들이 만든 룩</h2></div><div className="community-look-feed">{[["하나","RAINY MINIMAL","#7ba9a7","4,921"],["소라","GALLERY DATE","#714a70","3,870"],["재인","SEOUL WEEKEND","#8f756e","3,228"],["리오","SOFT CAMPUS","#d69aac","2,906"]].map(([name,label,color,votes]) => <article key={name} onClick={() => setPlayStep(6)}><div className="look-mini" style={{ "--look-color":color } as React.CSSProperties}><i /><i /></div><small>{label}</small><strong>{name}의 LOOK</strong><span>♥ {votes}</span></article>)}</div></section>}

          {playStep === 6 && <section className="shop-look-screen"><div className="shop-look-visual"><small>🏆 WEEKLY WINNER</small><div className="large-look-figure" style={{ "--look-color":"#bba2ca" } as React.CSSProperties}><i /><i /><i /></div><h1>SUMMER<br />OFFICE LOOK</h1><span>12,842 VOTES</span></div><div className="shop-look-products"><small>SHOP THE LOOK</small><h2>우승 코디 그대로 구매하기</h2><div>{[["JACKET","ARCHIVE 101",129000],["TOP","SÉRIE STUDIO",49000],["SKIRT","MOMENT EDITION",79000],["BAG","FORME",89000]].map(([type,brand,price]) => <article key={type as string}><i /><div><small>{type}</small><strong>{brand}</strong></div><b>{won(price as number)}</b><button onClick={() => notify(`${brand} 상품 상세를 열었어요`)}>상품 보기</button></article>)}</div><p><span>TOTAL</span><strong>346,000원</strong></p><button className="shop-all-button" onClick={() => { setPurchased(true); setUnlocked((current) => Array.from(new Set([...current,"jacket","skirt"]))); notify("우승 룩 4개 상품을 장바구니에 담았어요"); }}>전체 장바구니 담기</button><button className="shop-items-button" onClick={() => setMainTab("category")}>상품별로 보기</button>{purchased && <div className="flow-purchase-complete">구매 상품이 MY DIGITAL CLOSET에 등록됐어요 · 다시 PLAY 가능</div>}</div></section>}
        </section>
      )}

      {mainTab !== "play" && (
        <section className={`commerce-portal portal-${mainTab}`}>
          {mainTab === "home" && <>
            <section className="commerce-hero">
              <div><small>SEOUL · 29°C · HUMID</small><h1>오늘 뭐 입지?</h1><p>일교차와 실내 냉방까지 고려한<br />가벼운 여름 출근룩</p><button onClick={() => { setSceneGroup("work"); setPlayStep(1); setMainTab("play"); }}>출근룩 추천 보기 →</button></div>
              <div className="hero-look"><span>WEATHER CURATION</span><strong>LIGHT<br />OFFICE</strong><small>12 ITEMS · FROM 39,000</small></div>
            </section>

            <section className="portal-section">
              <div className="portal-heading"><div><small>DISCOVER</small><h2>TRENDING LOOKS</h2></div><button onClick={() => { setPlayStep(5); setMainTab("play"); }}>전체 코디 보기 →</button></div>
              <div className="trending-look-grid">{[
                ["루미", "FRIDAY OFFICE", "#bba2ca", "92"], ["하나", "RAINY MINIMAL", "#7ba9a7", "89"], ["소라", "CITY ROMANTIC", "#714a70", "87"], ["재인", "WEEKEND LAYER", "#8f756e", "86"],
              ].map(([name, label, color, scoreValue]) => <article key={name} onClick={() => { setPlayStep(5); setMainTab("play"); }}><div className="look-mini" style={{ "--look-color": color } as React.CSSProperties}><i /><i /></div><small>{label}</small><strong>{name}의 LOOK</strong><span>{scoreValue} STYLE · ♡ 저장</span></article>)}</div>
            </section>

            <section className="today-challenge-card">
              <div><small>TODAY&apos;S CHALLENGE</small><h2>갑자기 잡힌 금요일 소개팅</h2><p>150,000원 안에서 첫인상과 편안함을 모두 잡아주세요.</p><span><b>8,241명</b> 참여 · 오늘 자정 마감</span></div>
              <button onClick={() => { setSceneGroup("date"); setSceneExample(0); setPlayStep(1); setMainTab("play"); }}>PLAY →</button>
            </section>

            <section className="portal-section">
              <div className="portal-heading"><div><small>COMMERCE</small><h2>SHOP THE WINNERS</h2></div><span>이번 주 사람들이 가장 많이 산 코디</span></div>
              <div className="winner-product-grid">{[
                ["SUMMER OFFICE", "271,000원", "4 ITEMS", "#bba2ca"], ["JEJU WEEKEND", "198,000원", "3 ITEMS", "#7ba9a7"], ["GALLERY DATE", "146,000원", "4 ITEMS", "#d69aac"],
              ].map(([name, price, count, color]) => <article key={name}><div className="look-mini" style={{ "--look-color": color } as React.CSSProperties}><i /><i /></div><div><small>WEEKLY TOP LOOK</small><strong>{name}</strong><span>{count} · {price}</span><button onClick={() => { setPlayStep(6); setMainTab("play"); }}>이 룩 사기 →</button></div></article>)}</div>
            </section>

            <section className="portal-section closet-home-section">
              <div className="portal-heading"><div><small>PERSONALIZED BY YOUR PLAY</small><h2>FOR YOUR CLOSET</h2></div><button onClick={() => setMainTab("my")}>옷장 분석 보기 →</button></div>
              <p className="closet-advice">다경님은 최근 스커트 저장이 늘었어요. 가지고 있는 하의와 잘 어울리는 가벼운 아우터를 추천해요.</p>
              <div className="closet-recommend-grid">{closetRecommendations.map((product) => <article key={product.id}><i style={{ background: product.swatch }} /><div><small>{brandAliases[product.id]}</small><strong>{product.name}</strong><span>{won(product.price)}</span></div><button onClick={() => { setFocusedId(product.id); setPlayStep(2); setMainTab("play"); }}>코디해보기</button></article>)}</div>
            </section>
          </>}

          {mainTab === "category" && <section className="portal-page-block"><div className="portal-heading"><div><small>MULTI-BRAND CATALOG</small><h1>상품 탐색</h1></div><span>{products.length}개 데모 상품 · PLAY 연동</span></div><div className="portal-product-grid">{products.map((product) => <article key={product.id}><i style={{ background: product.swatch }} /><small>{brandAliases[product.id]}</small><strong>{product.name}</strong><span>{won(product.price)}</span><div><button onClick={() => setLiked((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}>♡ 찜하기</button><button onClick={() => { setFocusedId(product.id); setPlayStep(2); setMainTab("play"); }}>✨ 이 아이템으로 코디하기</button></div></article>)}</div></section>}

          {mainTab === "search" && <section className="portal-page-block search-page"><small>SEARCH</small><h1>무드와 상황으로 찾아보세요</h1><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="상품, 브랜드, 소개팅룩, 장마 메이크업 검색" /><div className="popular-searches"><b>지금 많이 찾는 검색어</b>{["여름 출근룩", "15만원 소개팅", "장마 메이크업", "발레코어", "제주 여행"].map((term) => <button key={term} onClick={() => setSearchQuery(term)}>#{term}</button>)}</div><div className="search-result-note">{searchQuery ? `“${searchQuery}”에 맞는 상품과 Scene을 함께 보여드려요.` : "검색어를 입력하면 상품과 코디 미션을 함께 탐색할 수 있어요."}</div></section>}

          {mainTab === "my" && <section className="portal-page-block digital-closet-page">
            <div className="portal-heading"><div><small>MY DIGITAL CLOSET</small><h1>다경님 옷장 분석</h1></div><div className="closet-stat-chips"><span>구매·해금 <b>{unlocked.length}</b></span><span>찜 <b>{liked.length}</b></span><span>최근 착용 <b>{equipped.length}</b></span></div></div>
            <div className="digital-closet-grid"><article className="style-dna-card"><small>2 WEEKS OF PLAY</small><h2>YOUR STYLE DNA</h2>{styleDNA.map((style) => <div key={style.label}><span>{style.label}</span><i><b style={{ width: `${style.value}%`, background: style.color }} /></i><strong>{style.value}</strong></div>)}</article><article className="closet-analysis-card"><small>CLOSET BALANCE</small><h2>취향은 선명하고, 아우터가 부족해요</h2><div><span>BLACK <b>31%</b></span><span>MINIMAL <b>27%</b></span><span>FEMININE <b>24%</b></span></div><p>최근 스커트와 로맨틱 상의를 자주 저장했어요. 가지고 있는 옷에 매치하기 쉬운 간절기 아우터가 필요해요.</p></article><article className="closet-data-card"><small>CONNECTED DATA</small><h2>플레이가 취향 데이터가 됩니다</h2><ul><li>실제 구매·장바구니</li><li>찜한 상품과 선호 브랜드</li><li>자주 착용한 컬러·실루엣</li><li>사이즈와 반품 이력</li></ul></article></div>
            <div className="portal-heading closet-next-heading"><div><small>PEOPLE WITH YOUR TASTE SAVED</small><h2>가지고 있는 옷과 잘 어울리는 상품</h2></div></div><div className="closet-recommend-grid">{closetRecommendations.map((product) => <article key={product.id}><i style={{ background: product.swatch }} /><div><small>{brandAliases[product.id]}</small><strong>{product.name}</strong><span>{won(product.price)}</span></div><button onClick={() => { setFocusedId(product.id); setPlayStep(2); setMainTab("play"); }}>내 옷과 코디</button></article>)}</div>
          </section>}
        </section>
      )}

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
                    <small>{brandAliases[product.id] ?? product.brand}</small>
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

      <section className="brand-campaign" aria-labelledby="brand-campaign-title">
        <div className="brand-campaign-hero"><small>BRAND CHALLENGE PLATFORM</small><h2 id="brand-campaign-title">NEW BALANCE<br />STYLE WEEK</h2><p>뉴발란스 신제품을 활용해<br />여름 서울 데일리룩을 만들어주세요.</p><button onClick={() => notify("브랜드 챌린지에 현재 코디로 참여했어요")}>브랜드 챌린지 참여 →</button></div>
        <div className="campaign-rewards"><small>CAMPAIGN REWARD</small><div><span>🏆 1등</span><strong>신제품 증정</strong></div><div><span>🏆 TOP 10</span><strong>10만원 쿠폰</strong></div><p>브랜드는 광고 배너가 아니라 실제 상품으로 창작 미션을 개최합니다.</p></div>
        <div className="campaign-results"><small>LIVE CAMPAIGN RESULT</small><div>{[["참여자","5,382명"],["생성된 코디","4,921개"],["상품 클릭","31,220회"],["구매","1,048건"]].map(([label,value]) => <span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><p>참여율 · PDP 진입 · UGC · 구매 전환을 한 캠페인에서 측정</p></div>
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
