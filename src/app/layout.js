import "./globals.scss";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/provider/ThemeProvider";
import AuthProvider from "@/provider/AuthProvider";

export const metadata = {
  title: "SUDOKU BLOG WORLD",
  description: "스도쿠 풀이 및 기술을 포스팅하는 언더테일 컨셉 블로그입니다.",
  keywords: "sudoku blog world, sudoku, sudoku skill, undertale, blog, next, nextjs, sans, heart, sara, frisk, 스도쿠 블로그 월드, 스도쿠, 스도쿠 스킬, 언더테일, 블로그, 넥스트, 샌즈, 하트, 사라, 프리스크",
  topic: "블로그, 스도쿠, 기술, 언더테일"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <AuthProvider>
          {/* 전역변수로 감싸주기 */}
          <ThemeContextProvider>
            {/* 모든 페이지 감싸주기 */}
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
