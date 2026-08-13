"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  brand: string;
  name: string;
  category: "상의" | "하의" | "슈즈" | "뷰티";
  price: number;
  color: string;
  accent: string;
  swatch: string;
  tags: string[];
  description: string;
};

const products: Product[] = [
  {
    id: "cardigan",
    brand: "MORNING DEW",
    name: "뮤트 라일락 크롭 가디건",
    category: "상의",
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
    price: 22000,
    color: "#ec947d",
    accent: "#b85f57",
    swatch: "radial-gradient(circle at 35% 30%, #ffc8aa, #e98172 55%, #a94e54)",
    tags: ["걸리시", "생기"],
    description: "픽셀 텍스처 얼굴에도 자연스럽게 얹히는 맑은 피치 톤 블러셔",
  },
];

const categories = ["전체", "상의", "하의", "슈즈", "뷰티"] as const;

const won = (value: number) => `${value.toLocaleString("ko-KR")}원`;

export default function Home() {
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [equipped, setEquipped] = useState<string[]>(["cardigan", "denim", "pumps"]);
  const [focusedId, setFocusedId] = useState("cardigan");
  const [liked, setLiked] = useState<string[]>(["lip"]);
  const [toast, setToast] = useState("");
  const [showShop, setShowShop] = useState(false);

  const focused = products.find((product) => product.id === focusedId) ?? products[0];
  const visibleProducts = category === "전체"
    ? products
    : products.filter((product) => product.category === category);
  const equippedProducts = products.filter((product) => equipped.includes(product.id));
  const total = equippedProducts.reduce((sum, product) => sum + product.price, 0);
  const tagSet = new Set(equippedProducts.flatMap((product) => product.tags));
  const score = Math.min(100, 52 + tagSet.size * 7 + equippedProducts.length * 3);

  const currentColors = useMemo(() => ({
    top: products.find((product) => product.id === equipped.find((id) => products.find((item) => item.id === id)?.category === "상의"))?.color ?? "transparent",
    bottom: products.find((product) => product.id === equipped.find((id) => products.find((item) => item.id === id)?.category === "하의"))?.color ?? "transparent",
    beauty: equipped.includes("blush") ? "#ff8f7c" : "transparent",
  }), [equipped]);

  const equip = (product: Product) => {
    setFocusedId(product.id);
    setEquipped((current) => {
      const withoutCategory = current.filter((id) => {
        const item = products.find((candidate) => candidate.id === id);
        return item?.category !== product.category;
      });
      if (product.category === "뷰티") {
        return current.includes(product.id)
          ? current.filter((id) => id !== product.id)
          : [...current, product.id];
      }
      return [...withoutCategory, product.id];
    });
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
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
          setEquipped(["cardigan", "denim", "pumps", "lip"]);
          notify("추천 코디를 불러왔어요");
        }}>추천 코디 불러오기</button>
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
              const isEquipped = equipped.includes(product.id);
              const isLiked = liked.includes(product.id);
              return (
                <article
                  className={`product-card ${focusedId === product.id ? "focused" : ""}`}
                  key={product.id}
                  onClick={() => setFocusedId(product.id)}
                >
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
                    <b>{won(product.price)}</b>
                  </div>
                  <button
                    className={`equip-button ${isEquipped ? "equipped" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      equip(product);
                    }}
                  >{isEquipped ? "착용중" : "입어보기"}</button>
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
                <img src="/character-runtime.png" alt="레트로 저폴리 패션 캐릭터" />
                <div className="garment-tint top-tint" style={{ background: currentColors.top }} />
                <div className="garment-tint bottom-tint" style={{ background: currentColors.bottom }} />
                <div className="blush-tint" style={{ background: currentColors.beauty }} />
                <div className="scanlines" />
              </div>
              <div className="dialogue-box">
                <span className="portrait">✦</span>
                <p><b>미유</b> “첫 출근이지만, 내 취향도 살짝 보여주고 싶어!”</p>
                <button aria-label="다음 대화" onClick={() => notify("취향 힌트: 채도는 낮고 실루엣은 길게")}>›</button>
              </div>
            </div>

            <div className="console-hinge"><i /><i /><i /></div>

            <div className="console-bottom">
              <div className="detail-preview" style={{ background: focused.swatch }}>
                <span>{focused.category}</span>
                <strong>{focused.name.split(" ")[0]}</strong>
              </div>
              <div className="detail-copy">
                <small>{focused.brand}</small>
                <h2>{focused.name}</h2>
                <p>{focused.description}</p>
                <div className="detail-meta">
                  <span className="color-chip" style={{ background: focused.color }} />
                  {focused.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                </div>
                <button onClick={() => equip(focused)}>{equipped.includes(focused.id) ? "착용 해제/변경" : "캐릭터에게 입히기"}</button>
              </div>
            </div>
          </div>
          <p className="stage-note">※ 커머스 상품 데이터가 게임 아이템으로 변환되는 인터랙션 프로토타입입니다.</p>
        </section>

        <aside className="summary-panel panel">
          <div className="score-card">
            <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}>
              <span><b>{score}</b>/100</span>
            </div>
            <div><small>THEME MATCH</small><h2>{score >= 88 ? "SWEET!" : "GOOD LOOK"}</h2><p>테마 태그 {tagSet.size}개 매칭</p></div>
          </div>

          <section className="outfit-summary">
            <div className="section-title"><span>CURRENT LOOK</span><b>{equippedProducts.length} ITEMS</b></div>
            <div className="selected-list">
              {equippedProducts.map((product) => (
                <div key={product.id}>
                  <i style={{ background: product.swatch }} />
                  <span><small>{product.category}</small>{product.name}</span>
                  <b>{won(product.price)}</b>
                  <button aria-label={`${product.name} 제거`} onClick={() => setEquipped((current) => current.filter((id) => id !== product.id))}>×</button>
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
                <div key={product.id}><i style={{ background: product.swatch }} /><span>{product.name}</span><b>{won(product.price)}</b></div>
              ))}
            </div>
            <div className="modal-total"><span>플레이 혜택 적용</span><strong>{won(Math.round(total * 0.92))}</strong></div>
            <button className="primary-cta" onClick={() => {
              setShowShop(false);
              notify("커머스 장바구니 연결을 확인했어요");
            }}>장바구니 연결 확인</button>
          </section>
        </div>
      )}
    </main>
  );
}
