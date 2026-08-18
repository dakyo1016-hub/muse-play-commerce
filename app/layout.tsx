import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muse-mode-fashion-play.dakyo1016.chatgpt.site"),
  title: "MUSE PLAY — Playable Commerce",
  description: "실제 판매 상품으로 Flat Lay 코디를 만들고, 스타일에 투표하고, 우승 룩을 그대로 쇼핑하는 PLAY COMMERCE",
  openGraph: {
    title: "MUSE PLAY — PLAY Commerce",
    description: "CREATE WITH PRODUCTS. VOTE FOR THE STYLE. SHOP THE LOOK.",
    images: [{ url: "/og-flatlay.png", width: 1536, height: 1024, alt: "MUSE PLAY — Playable Commerce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUSE PLAY — PLAY Commerce",
    description: "상품을 보는 쇼핑에서, 상품을 가지고 노는 쇼핑으로.",
    images: ["/og-flatlay.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
