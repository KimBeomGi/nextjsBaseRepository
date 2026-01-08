"use client";

import { useState } from "react";

/**
 * [Client Component]
 * 
 * - "use client" 지시어를 최상단에 선언하여 이 컴포넌트가 브라우저에서 실행됨을 명시합니다.
 * - useState, useEffect와 같은 리액트 훅을 사용할 수 있습니다.
 * - 사용자의 클릭, 입력 등 상호작용을 담당합니다.
 */
export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
      <h3 className="text-lg font-bold mb-2">클라이언트 컴포넌트 예시</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        이 부분은 브라우저에서 인터랙티브하게 작동합니다.
      </p>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="text-xl font-mono w-8 text-center">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
