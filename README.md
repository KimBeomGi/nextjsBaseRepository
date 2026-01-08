# 🚀 Next.js 16+ Ultimate Fullstack Reference Base

이 프로젝트는 **프론트엔드와 백엔드를 한 곳에서 개발(Fullstack)**하고, 즉시 배포할 수 있도록 설계된 Next.js 모범 사례 가이드입니다.

## ✨ 핵심 기능 (Why this project?)

- **Fullstack Integration:** 별도의 백엔드 없이 Next.js 내부에서 API 처리와 DB 통신을 완벽하게 수행합니다.
- **Modern App Router Architecture:** Server Components, Server Actions, `loading.tsx`, `error.tsx` 등 Next.js 15/16의 최신 기능을 모두 활용합니다.
- **Robust Type Safety:** Prisma와 Zod를 결합하여 데이터 모델링부터 폼 유효성 검사까지 완벽한 타입 안전성을 보장합니다.
- **Sleek UX/UI:** Tailwind CSS를 활용한 반응형 디자인과 Skeleton UI를 통한 부드러운 사용자 경험을 제공합니다.

## 🛠 Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Database:** Prisma ORM (with SQLite)
- **Validation:** Zod
- **Styling:** Tailwind CSS 4.x
- **Utilities:** clsx, tailwind-merge (cn util)

## 📁 디렉토리 구조 설명

```text
src/
├── actions/     # [Backend] 서버에서만 실행되는 비즈니스 로직 (Server Actions)
├── app/         # [Routing] 페이지, 레이아웃 및 API 라우트
├── components/  # [UI] 재사용 가능한 클라이언트/서버 컴포넌트
├── lib/         # [Config] Prisma Client 싱글톤, 유틸리티 함수
└── schemas/     # [Shared] Zod 스키마 (Front/Back 공통 사용)
```

## 🚀 시작하기

### 1. 의존성 설치 및 환경 설정
```bash
npm install
cp .env.example .env
```

### 2. 데이터베이스 설정 (Prisma)
```bash
npx prisma migrate dev --name init
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 서버 컴포넌트와 Server Actions의 조화를 확인하세요!

## 📘 개발 가이드 (참고 포인트)

1.  **데이터 조회:** `src/app/posts/page.tsx`에서 서버 액션을 직접 `await`하여 데이터를 가져오는 방식을 참고하세요.
2.  **데이터 변경:** `src/components/forms/PostForm.tsx`에서 `useActionState`와 Server Action을 연동하여 폼 데이터를 처리하는 법을 확인하세요.
3.  **유효성 검사:** `src/schemas/post-schema.ts`에서 정의한 스키마가 어떻게 프론트와 백에서 동시에 쓰이는지 보세요.

---

제작: **Gemini CLI Agent** (2026-01-08)