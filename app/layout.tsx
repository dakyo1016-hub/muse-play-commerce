import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muse-mode-fashion-play.dakyo1016.chatgpt.site"),
  title: "MUSE / PLAY — Decision System for Style",
  description: "BUILD · BATTLE · REVEAL · SHOP. 상품 선택 과정을 시스템형 UI로 게임화한 PLAY COMMERCE.",
  openGraph: {
    title: "MUSE / PLAY — Decision System for Style",
    description: "BUILD · BATTLE · REVEAL · SHOP.",
    images: [{ url: "/og-editorial-a.png", width: 1536, height: 1024, alt: "MUSE / PLAY — Play Your Look" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSE / PLAY — Decision System for Style",
    description: "쇼핑의 선택 행동을 시스템형 UI로 재설계한 PLAY COMMERCE.",
    images: ["/og-editorial-a.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
