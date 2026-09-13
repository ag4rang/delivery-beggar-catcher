import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "배달가드 | 3초 포렌식 검증",
  description:
    "배달 이물질·상습 환불 사기를 사진 한 장으로 즉시 적발하는 점주 보호 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#07090f] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
