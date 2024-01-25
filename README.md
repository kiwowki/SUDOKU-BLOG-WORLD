## 나만의 next-blog 만들기(sudoku world)

### 초기세팅

```
** devDependencies에서만 설치(개발환경에서만) **
** next-auth 설치 **
** db연동 **
**프리즈마 클라이언트 설치**
**프리즈마 어댑터 설치**

npm install sass --save-dev
npm install next-auth
npm install prisma
npm install @prisma/client
npm install @auth/prisma-adapter
npm install react-quill
npm install swr
```

app > api 폴더(서버단) = 회원가입(auth),  블로그 포스트, 카테고리, 댓글, 게시판
app 폴더 = page
context = 리덕스
provider = 전체 관리(auth provider, theme provider)
utils = auth(계정 관리) connect(몽고DB와 커넥트)

```
npx prisma init --datasource-provider mongodb   // 프리즈마 db설치(파일 생성) 환경변수 파일 만들고 설치하기
```

```
// account 관리창 띄우기
npx prisma generate                             // prisma 연결
npx prisma studio                               //prisma 화면 켜기
```

#### prisma

[prisma mongoDB 시작하기](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/creating-the-prisma-schema-typescript-mongodb)

Prisma는 오픈 소스 데이터베이스 도구로서, 데이터베이스와 상호 작용하고 쿼리를 작성하는 데 도움을 주는 도구입니다. Prisma는 데이터베이스 스키마를 사용하여 타입 세이프한 쿼리를 작성할 수 있도록 지원하며, TypeScript나 JavaScript에서 사용할 수 있습니다. 주로 Node.js 환경에서 백엔드 개발에 많이 사용됩니다.

-   Prisma Studio:

Prisma Studio는 데이터베이스의 내용을 시각적으로 탐색하고 수정할 수 있는 GUI 도구입니다. 데이터의 빠른 확인 및 편집에 사용됩니다.

-   Query Language:

Prisma는 GraphQL과 유사한 Prisma Query Language (PQL)을 제공합니다. 이를 사용하여 타입 세이프하게 데이터베이스에 쿼리를 작성할 수 있습니다.

prisma > schema.prisma (자동 생성)

<detail></detail>

### 토글메뉴 만들기

-   Context API사용하기(redux 저장소 대신. 이게 버전을 덜 탐. 리액트 내에 있는 api)
    다크모드인지 라이트모드인지 브라우저(의 스토리지)에 저장을 해야 함.
    local storage에 저장해서 다크모드 만들기.

    더 제대로 하려면 세션에 저장해도 됨

-   순서
    1. components > theme > Theme.jsx : 토글 디자인
    2. src > context > themeContext.jsx : theme 관리
    3. src > provider > themeProvider.jsx : 전체적으로 관리(body에 클래스로 나오게)

### 로그인 페이지 만들기

1. 환경변수 만들기(.env에 각각의 키 생성)

    1. google 로그인 연동 순서
       [구글 클라우드](https://console.cloud.google.com/)
       햄버거 메뉴 > api 및 서비스 > 사용자 인증 정보 > 사용자 인증 정보 만들기 > OAuth 클라이언트 ID

    - 승인된 리디렉션 URI 설정
      `http://localhost:3000/`
      `http://localhost:3000/api/auth/callback/google`

    - 구글 키 가져오기
      사용자 인증 정보 > OAuth 2.0 클라이언트 ID > OAuth 클라이언트 수정(연필모양 아이콘)

    - .env 파일에 환경변수 입력
      클라이언트 ID = GOOGLE_ID
      클라이언트 보안 비밀번호 = GOOGLE_SECRET

    2. naver 로그인 연동
       []()

    3. kakao 로그인 연동
       [kakao app 추가하기](https://developers.kakao.com/console/app)

    KAKAO_CLIENT_ID -> 앱설정 > 요약 정보 > 앱 키 > REST API 키? 자바스크립트 키?
    KAKAO_CLIENT_SECRET -> 제품 설정 > 카카오 로그인 > 보안
    동의 목록 -> 제품 설정 > 카카오 로그인 > 동의 항목 > 닉네임만 필수 항목으로 하기(동의 목적: 닉네임 표시)

2. prisma 켜기

-   환경변수 설치
    `npx prisma init --datasource-provider mongodb`
-   prisma 연결
    `npx prisma generate`

-   다른 창으로 로컬 켜기
    `npm run dev`

-   prisma 화면 켜기
    `npx prisma studio`

3. 회원가입 api route 추가하기(next-auth)
   [auth.js](https://next-auth.js.org/getting-started/example)

-   app > api > auth > [...nextauth] > route.js
    Provider 연결

-   utils > auth.js
    각각 사이트들의 providers 연동

-   provider > AuthProvider.jsx
    공유 세션 구성(SessionProvider 로 감싸기)
    세션에 바로 저장할 수 있게

-   layout.js -> AuthProvider, ThemeContextProvider, ThemeProvider로 감싸기

```js
export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
            </head>
            <body>
                <AuthProvider>
                    <ThemeContextProvider>
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
```

4. login > page.js(next-auth 리액트 훅으로 구글 로그인 버튼 만들기 / onClick 했으니 "use client" 최상단에 넣기!)

`import { signIn, useSession } from 'next-auth/react'`

```js
<div className="join_add">
    <div className="google" onClick={() => signIn("google")}>
        Sign in with Google
    </div>
    <div className="github" onClick={() => signIn("github")}>
        Sign in with Github
    </div>
    <div className="naver" onClick={() => signIn("naver")}>
        Sign in with Naver
    </div>
    <div className="kakao" onClick={() => signIn("kakao")}>
        Sign in with Kakao
    </div>
</div>
```

5. 어댑터 설정
   utils > auth.js - PrismaAdapter 사용하여 몽고db 대신 prisma와 연결 (prisma는 몽고db와!)

```js
...
...
import prisma from "./connect";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
    // 몽고db 대신 prisma (prisma는 몽고db와!) 어댑터 설정
    adapter: PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        ...
        ...
    ],
};
```

### 카테고리 만들기
SEO - Slug를 이용하기()

components > category > category.jsx
page.js에 추가





## 트러블 슈팅

-   Unhandled Runtime Error 에러

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <h1> in <a>.
See more info here: https://nextjs.org/docs/messages/react-hydration-error
```

해결방법: 리액트는 기본적으로 a링크 안에 a링크를 허용하지않음. 중첩된 a링크를 지움으로써 해결.

-   `[next-auth][warn][NEXTAUTH_URL] [next-auth][warn][NO_SECRET]` 에러

동일한 이메일 주소로 로그인 할 경우 next-auth 라이브러리에서 발생하는 경고 메시지.

```bash
[next-auth][warn][NEXTAUTH_URL]
https://next-auth.js.org/warnings#nextauth_url
[next-auth][warn][NO_SECRET]
https://next-auth.js.org/warnings#no_secret
```

해결방법: auth.js파일 중 각각의 providers 안에 allowDangerousEmailAccountLinking: true, 를 넣는다.
allowDangerousEmailAccountLinking: true는 NextAuth.js의 구성 옵션 중 하나.
일반적으로 이 옵션은 보안상의 이유로 기본적으로 비활성화되어 있습니다. 그러나 이 옵션을 활성화하면 이메일 계정 연결에 대한 보안 검사를 우회할 수 있습니다. 이렇게 하면 동일한 이메일 주소를 사용하여 여러 계정을 연결할 수 있습니다.
이 옵션은 특정 사용 사례나 요구 사항에 따라 유용할 수 있습니다. 예를 들어, 테스트 환경에서 다양한 계정을 만들거나, 개발 중에 특정 계정을 손쉽게 테스트하기 위해 사용할 수 있습니다.
그러나 이 옵션을 사용할 때에는 주의해야 합니다. 보안 위험이 발생할 수 있으므로, 실제 운영 환경에서는 권장되지 않습니다. 보안을 위해 이메일 계정 연결을 엄격하게 관리하는 것이 좋습니다.
(다만 이 옵션을 사용하게되면 동일한 이메일일 때 하나의 계정으로 통합이 된다.)

해결방법2?:
.env 파일에 아래 내용 입력하기.

```bash
NEXTAUTH_URL = http://localhost:3000
NEXTAUTH_SECRET = mysecretid
```

-   카카오 이메일 정보를 받아오지 못하는 에러

```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Warning: Expected server HTML to contain a matching <h1> in <a>.
See more info here: https://nextjs.org/docs/messages/react-hydration-error
```

해결방법: 앱권한신청 > 동의항목 > 