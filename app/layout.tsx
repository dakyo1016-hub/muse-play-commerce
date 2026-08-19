import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muse-mode-fashion-play.dakyo1016.chatgpt.site"),
  title: "MUSE — Shopping as a Game",
  description: "BUILD · BATTLE · REVEAL · SHOP. Y2K 캐릭터 가이드와 함께 즐기는 패션 스타일링 게임.",
  openGraph: {
    title: "MUSE — Shopping as a Game",
    description: "BUILD · BATTLE · REVEAL · SHOP. 나만의 LOOK을 완성하는 Y2K 패션 게임.",
  },
  twitter: {
    card: "summary",
    title: "MUSE — Shopping as a Game",
    description: "미유·렌과 함께 아이템을 고르고, 배틀하고, 쇼핑하는 Y2K 패션 게임.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
