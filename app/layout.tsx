import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muse-mode-fashion-play.dakyo1016.chatgpt.site"),
  title: "MUSE PLAY — PLAY Commerce Portfolio",
  description: "실제 커머스 상품을 상황 속에서 스타일링하고, 투표·발견·구매로 연결하는 패션·뷰티 PLAY Commerce 모듈",
  openGraph: {
    title: "MUSE PLAY — PLAY Commerce",
    description: "STYLE → VOTE → DISCOVER → SHOP으로 연결되는 패션·뷰티 커머스 모듈",
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "MUSE PLAY — PLAY Commerce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSE PLAY — PLAY Commerce",
    description: "실제 상품을 상황 속에서 사용해보는 새로운 쇼핑 방식",
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
