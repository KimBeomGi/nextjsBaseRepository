# 📘 Next.js 16+ Ultimate Fullstack Base Project Plan

> **작성일:** 2026-01-08
> **목표:** 프론트엔드와 백엔드를 아우르는 Next.js의 기능을 100% 활용하여, 즉시 배포 가능한 상용 수준의 프로젝트 보일러플레이트 구축.

---

## 1. 🎯 프로젝트 개요 및 철학

이 프로젝트는 **Next.js App Router**가 지향하는 "Full-stack Web Framework"의 정석을 구현합니다. 별도의 백엔드 서버(Node.js/Python 등) 없이 Next.js 하나로 DB 통신, API 처리, UI 렌더링을 모두 수행하는 **Monolithic Architecture**를 채택합니다.

### 핵심 원칙
1.  **Server Actions First:** 데이터 변이(Mutation)는 API Route 대신 Server Actions를 우선 사용하여 번들 사이즈를 줄이고 타입 안정성을 확보한다.
2.  **Hybrid Rendering:** SEO가 필요한 페이지는 Server Component, 상호작용이 필요한 곳은 Client Component로 명확히 분리한다.
3.  **Type Safety:** DB(Prisma)부터 프론트엔드(React)까지 `Zod`와 TypeScript를 통해 E2E 타입 안정성을 보장한다.
4.  **Zero Setup Deployment:** 환경 변수 설정만으로 Vercel/Docker에 즉시 배포 가능한 구조를 유지한다.

---

## 2. 🛠 기술 스택 (Tech Stack)

### Core
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.x + (Optional: shadcn/ui 호환 구조)

### Backend & Data
- **Database ORM:** Prisma (SQLite for Dev / PostgreSQL for Prod)
- **Validation:** Zod (스키마 정의 및 검증)
- **API Style:** Server Actions (Main) + Route Handlers (REST API for external usage)

### State & UX
- **Server State:** React Query (TanStack Query) v5 (또는 Next.js Native Fetch caching 전략 심화)
- **Client State:** Zustand (필요 시 전역 상태 관리)
- **Forms:** React Hook Form + Zod Resolver

---

## 3. 🏗 아키텍처 및 디렉토리 구조 설계

```text
src/
├── app/
│   ├── (auth)/             # 로그인/회원가입 관련 라우트 그룹
│   ├── (dashboard)/        # 보호된 페이지 라우트 그룹
│   ├── api/                # 외부 연동용 REST API (필요한 경우만)
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Landing Page
│   └── globals.css
├── actions/                # [Backend] Server Actions (비즈니스 로직 핵심)
│   ├── auth-actions.ts
│   └── post-actions.ts
├── components/
│   ├── ui/                 # 재사용 가능한 UI 아토믹 컴포넌트 (Button, Input)
│   ├── forms/              # 비즈니스 로직이 포함된 폼 컴포넌트
│   └── layout/             # Header, Footer, Sidebar
├── lib/                    # 유틸리티 및 설정
│   ├── db.ts               # Prisma Client Singleton
│   ├── utils.ts            # 공용 함수
│   └── auth.ts             # 인증 설정 (Auth.js / NextAuth)
├── schemas/                # [Shared] Zod 데이터 스키마 (Front/Back 공용)
│   └── post-schema.ts
└── types/                  # 전역 타입 정의
```

---

## 4. 📅 단계별 개발 로드맵 (Roadmap)

### Phase 1: 기반 마련 (Foundation) ✅
- [x] Next.js 설치 및 초기화
- [x] 기본 Tailwind CSS 설정
- [ ] `PLAN.md` 작성 및 아키텍처 확정
- [ ] 절대 경로(`@/*`) 및 폴더 구조 리팩토링

### Phase 2: 백엔드 코어 구축 (Backend Core) 🚧
- [ ] **Prisma 설정:** SQLite 연동 및 Schema 설계 (User, Post 모델)
- [ ] **DB 유틸리티:** `lib/db.ts` 싱글톤 패턴 구현
- [ ] **Server Actions 구현:** 데이터 생성(Create), 조회(Read) 로직 작성
- [ ] **Validation:** Zod를 이용한 입력값 검증 파이프라인 구축

### Phase 3: 프론트엔드 시스템 (Frontend System)
- [x] **UI 컴포넌트:** 버튼, 입력창, 카드 등 기본 디자인 시스템 구축
- [x] **반응형 레이아웃:** 모바일/데스크탑 대응 Header/Navigation
- [x] **데이터 연동:** Server Component에서 Prisma 데이터 직접 조회 (`await db.post.findMany()`)

### Phase 3.5: UI/UX 고도화 (Modern E-commerce) ✅
- [x] **shadcn/ui 통합:** `Button`, `Sheet`, `DropdownMenu` 등 핵심 컴포넌트 설치.
- [x] **Fluid Responsive:** `clamp()`, `min()`을 활용한 유동적 타이포그래피 및 레이아웃 적용.
- [x] **Advanced Layout:** `(shop)` 라우트 그룹 및 Header/Footer 구현.

### Phase 4: 상품 시스템 & 레이아웃 분리 (Core Commerce) ✅
- [x] **Data Modeling:** Prisma에 `Category` 및 `Product` 모델 추가.
- [x] **Seed Data:** 프로젝트 확인을 위한 초기 상품 데이터 생성 스크립트.
- [x] **Dynamic Routing:** 카테고리 및 상품 상세 페이지 구현.
- [x] **Auth Layout Separation:** 로그인 페이지 분리.

### Phase 5: 검색 & 장바구니 (Final Polish) ✅
- [x] **State Management:** Zustand + localStorage Persist 적용.
- [x] **Cart UI:** Header 배지 및 CartSheet 구현.
- [x] **Search System:** URL 기반 검색 및 결과 페이지 구현.

### Phase 6: SEO & 성능 최적화 (Production Grade) 🚧
- [ ] **Dynamic Metadata:** 상품 상세 페이지별 `title`, `description`, `openGraph` 자동 생성.
- [ ] **Image Optimization:** `next/image` 컴포넌트 적용 및 도메인 설정.
- [ ] **Sitemap:** `sitemap.ts` 생성으로 검색 엔진 색인 돕기.

### Phase 7: 주문 결제 시스템 (Business Logic) ✅
- [x] **Order Model:** Prisma `Order`, `OrderItem` 모델 추가.
- [x] **Checkout Page:** 배송지 입력 폼 및 결제(Mock) UI.
- [x] **Server Action:** `createOrder` 트랜잭션 처리.

### Phase 8: 테마 시스템 (UI Polish) 🚧
- [ ] **next-themes:** 다크/라이트 모드 토글 기능 구현.
- [ ] **ThemeToggle:** 헤더에 토글 버튼 추가.

### Phase 9: 관리자 대시보드 (The Fullstack Finale) 🚧
- [ ] **Admin Layout:** `src/app/(admin)` 사이드바 레이아웃 구현.
- [ ] **Dashboard Home:** 총 매출, 주문 수, 최근 주문 내역 차트/요약.
- [ ] **Product Management:**
    - 상품 목록 조회 및 삭제.
    - 상품 등록 폼 (Server Action 연동).
- [ ] **Order Management:** 주문 상태 변경 (배송 중, 완료 처리).

### Phase 10: 배포 (Deployment)
- [ ] **에러 핸들링:** `error.tsx`, `not-found.tsx` 커스텀 페이지
- [ ] **로딩 상태:** `loading.tsx` 및 Skeleton UI 적용
- [ ] **Toast 알림:** Server Action 결과에 따른 사용자 피드백(성공/실패) 처리

### Phase 5: 배포 준비 (Deployment Ready)
- [ ] **환경 변수 분리:** `.env.example` 작성
- [ ] **Build Check:** 타입 에러 및 린트 검사 수행
- [ ] **Meta Data:** SEO를 위한 OpenGraph 및 메타 태그 설정

---

## 5. 🚀 배포 전략

1.  **Vercel 배포 (권장):**
    *   GitHub 레포지토리 연결 -> 자동 감지 -> 배포.
    *   Postgres 데이터베이스(Vercel Postgres or Supabase) 연결 필요.
2.  **Docker 배포:**
    *   `Dockerfile` 작성을 통해 컨테이너화.
    *   어떤 VPS(AWS, GCP)에서도 실행 가능하도록 설정.

---

> **Note:** 이 문서는 프로젝트 진행 상황에 따라 지속적으로 업데이트됩니다.
