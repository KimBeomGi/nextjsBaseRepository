import { db } from "@/lib/db";
import Link from "next/link";
import { Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  // 검색어가 없으면 빈 결과 반환
  if (!query) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">검색어를 입력해주세요.</h2>
      </div>
    );
  }

  // DB 검색 (제목 또는 설명에 포함된 상품)
  const products = await db.product.findMany({
    where: {
      OR: [
        { title: { contains: query } }, // SQLite는 기본적으로 case-insensitive하지 않을 수 있으나 Prisma가 어느정도 처리
        { description: { contains: query } },
      ],
    },
    include: { category: true },
  });

  return (
    <div className="container py-12">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-6 w-6" />
          "{query}" 검색 결과
        </h1>
        <p className="text-muted-foreground mt-2">
          총 {products.length}개의 상품을 찾았습니다.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 dark:bg-zinc-900 rounded-xl border border-dashed">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">다른 키워드로 검색해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.category.slug}/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 mb-3">
                <img 
                  src={product.images} 
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">
                  {product.category.name}
                </p>
                <h3 className="font-medium truncate">{product.title}</h3>
                <p className="font-bold mt-1">
                  ₩{product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
