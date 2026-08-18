import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muse-mode-fashion-play.dakyo1016.chatgpt.site"),
  title: "MUSE — Shopping as a Game",
  description: "기존 상품 데이터로 쇼핑의 선택 과정을 게임화하는 PLAY COMMERCE SYSTEM",
  openGraph: {
    title: "MUSE — Shopping as a Game",
    description: "CREATE WITH PRODUCTS. VOTE FOR THE STYLE. SHOP THE LOOK.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "MUSE — Shopping as a Game" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSE — Shopping as a Game",
    description: "쇼핑의 선택 행동 자체를 게임으로 재설계한 PLAY COMMERCE.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
