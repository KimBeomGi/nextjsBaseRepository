"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/post-actions";
import { cn } from "@/lib/utils";

/**
 * [Client Component] PostForm
 * 
 * - Server Action(`createPost`)을 form의 action 속성에 연결하여 사용합니다.
 * - useActionState 훅을 사용하여 서버 액션의 결과(성공/실패/에러메시지)를 상태로 관리합니다.
 */

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function PostForm() {
  // useActionState(actionFunction, initialState)
  // React 19 / Next.js 15+ 에서는 useActionState 사용 권장
  const [state, formAction, isPending] = useActionState(createPost, initialState);

  return (
    <form action={formAction} className="space-y-4 p-6 border rounded-xl bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm">
      <h3 className="text-lg font-bold">새 글 작성하기</h3>
      
      {/* 제목 입력 */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          className={cn(
            "w-full px-3 py-2 border rounded-md bg-transparent",
            state.errors?.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-zinc-700"
          )}
        />
        {state.errors?.title && (
          <p className="text-sm text-red-500">{state.errors.title[0]}</p>
        )}
      </div>

      {/* 내용 입력 */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          내용
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          placeholder="내용을 입력하세요"
          className="w-full px-3 py-2 border rounded-md bg-transparent border-gray-300 dark:border-zinc-700"
        />
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300"
        />
        <label htmlFor="published" className="text-sm">
          공개 상태로 저장
        </label>
      </div>

      {/* 상태 메시지 */}
      {state.message && (
        <p className={cn("text-sm", state.success ? "text-green-600" : "text-red-600")}>
          {state.message}
        </p>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isPending ? "저장 중..." : "저장하기"}
      </button>
    </form>
  );
}
