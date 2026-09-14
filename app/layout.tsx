import type { Metadata } from "next";
import "./globals.css";
import { DevTools } from "@/components/dev-tools";
export const metadata: Metadata = {
  title: "청약이지 | 지도에서 시작하는 내 집 마련",
  description: "지역별 청약 단지를 지도에서 탐색하고, 청약 일정과 관심 단지를 한눈에 확인하세요. 체험 버전의 단지 정보는 가상 예시입니다.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}{process.env.NODE_ENV === "development" && <DevTools />}</body></html>;
}
