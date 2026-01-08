import { NextResponse } from "next/server";

/**
 * [API Route Handler - Backend]
 * 
 * - 서버사이드에서 실행되는 백엔드 API 엔드포인트입니다.
 * - GET, POST, PUT, DELETE 등 HTTP 메서드를 함수로 정의합니다.
 * - DB 연동이나 외부 서비스 호출 등의 로직이 이곳에 위치합니다.
 */

// 임시 데이터 (실제 프로젝트에서는 DB에서 가져옴)
const posts = [
  { id: 1, title: "Next.js 15+ App Router 이해하기", author: "Gemini CLI" },
  { id: 2, title: "서버 컴포넌트와 클라이언트 컴포넌트의 조화", author: "Fullstack Dev" },
  { id: 3, title: "백엔드 없이 백엔드 만들기 (Route Handlers)", author: "NextJS Expert" },
];

export async function GET() {
  // 인위적인 지연시간 (네트워크 페칭 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(posts);
}
