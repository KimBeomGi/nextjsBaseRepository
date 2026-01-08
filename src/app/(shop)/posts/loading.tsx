/**
 * [Special File] loading.tsx
 * 
 * - 이 폴더의 page.tsx(서버 컴포넌트)가 데이터를 불러오는 동안 자동으로 보여집니다.
 * - React Suspense를 내부적으로 사용하여 부드러운 UI 전환을 제공합니다.
 */
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="animate-pulse space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4 text-center">
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 w-1/3 mx-auto rounded-md"></div>
          <div className="h-6 bg-gray-100 dark:bg-zinc-900 w-1/2 mx-auto rounded-md"></div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_350px]">
          {/* List Skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-zinc-800 w-1/4 rounded-md"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border rounded-xl dark:border-zinc-800 space-y-4">
                <div className="h-6 bg-gray-100 dark:bg-zinc-900 w-3/4 rounded-md"></div>
                <div className="h-20 bg-gray-50 dark:bg-zinc-900/50 w-full rounded-md"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-100 dark:bg-zinc-900 w-20 rounded-md"></div>
                  <div className="h-4 bg-gray-100 dark:bg-zinc-900 w-24 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="h-[400px] bg-gray-50 dark:bg-zinc-900/30 border rounded-xl dark:border-zinc-800"></div>
        </div>
      </div>
    </div>
  );
}
