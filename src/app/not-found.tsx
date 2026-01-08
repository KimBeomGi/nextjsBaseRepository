import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, Home } from "lucide-react";

/**
 * [Special File] not-found.tsx
 * 
 * - Next.js에서 존재하지 않는 URL로 접근할 때 자동으로 보여주는 페이지입니다.
 * - 사용자에게 당혹감을 주지 않고 다시 사이트로 유도하는 것이 중요합니다.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-zinc-50 dark:bg-black">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-black text-zinc-200 dark:text-zinc-900 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="h-16 w-16 md:h-24 md:w-24 text-blue-600 animate-bounce" />
        </div>
      </div>

      {/* Content */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
        길을 잃으셨나요?
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto leading-relaxed">
        요청하신 페이지가 삭제되었거나 주소가 잘못 입력되었을 수 있습니다. <br className="hidden md:block" />
        아래 버튼을 통해 홈으로 돌아가거나 쇼핑을 계속해보세요.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
        <Button size="lg" asChild className="rounded-full px-8 h-12">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> 홈으로 이동
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild className="rounded-full px-8 h-12">
          <Link href="/products/all">
            <ShoppingBag className="mr-2 h-4 w-4" /> 쇼핑 계속하기
          </Link>
        </Button>
      </div>

      {/* Quick Links */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 w-full max-w-md">
        <p className="text-sm font-medium text-zinc-400 mb-4">인기 카테고리</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/products/men" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Men</Link>
          <Link href="/products/women" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Women</Link>
          <Link href="/products/accessories" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Accessories</Link>
          <Link href="/posts" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Community</Link>
        </div>
      </div>
    </div>
  );
}
