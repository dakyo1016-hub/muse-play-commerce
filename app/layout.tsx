import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muse Mode — Beauty · Fashion Play",
  description: "패션과 뷰티 커머스 상품을 레트로 코디 게임으로 먼저 경험하는 쇼핑 보조 웹앱",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
