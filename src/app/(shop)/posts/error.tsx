"use client";

import { useEffect } from "react";

/**
 * [Special File] error.tsx
 * 
 * - 서버 또는 클라이언트 컴포넌트에서 발생한 에러를 포착합니다.
 * - 반드시 "use client"여야 하며, 에러 복구 기능을 포함할 수 있습니다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅 서비스(Sentry 등)에 에러를 기록할 수 있습니다.
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full mb-6">
        <span className="text-4xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">무언가 잘못되었습니다!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        게시글을 불러오는 중에 오류가 발생했습니다. <br />
        데이터베이스 연결이나 서버 상태를 확인해주세요.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          다시 시도하기
        </button>
        <a 
          href="/"
          className="px-6 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
        >
          홈으로 이동
        </a>
      </div>
    </div>
  );
}
