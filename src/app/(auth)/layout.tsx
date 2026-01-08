import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      {/* Auth 전용 심플 로고 */}
      <div className="mb-8">
        <Link href="/" className="text-3xl font-black tracking-tighter">
          NextShop
        </Link>
      </div>
      
      {/* 컨텐츠 카드 */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border rounded-2xl shadow-xl p-8">
        {children}
      </div>
      
      {/* 하단 링크 */}
      <div className="mt-8 text-sm text-gray-500">
        <Link href="/" className="hover:underline">← 홈으로 돌아가기</Link>
      </div>
    </div>
  );
}
