import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  // 1. 카테고리 정보 가져오기
  const category = categorySlug === "all" 
    ? { name: "All Products" }
    : await db.category.findUnique({ where: { slug: categorySlug } });

  // 카테고리가 없고 'all'도 아니라면 404
  if (!category && categorySlug !== "all") {
    return notFound();
  }

  // 2. 해당 카테고리의 상품들 가져오기
  const products = await db.product.findMany({
    where: categorySlug === "all" ? {} : { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categoryName = category?.name || "All Products";

  return (
    <div className="container py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">
          {categoryName}
        </h1>
        <p className="text-muted-foreground">
          {products.length}개의 상품이 있습니다.
        </p>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-3xl">
          <p className="text-xl text-gray-400">이 카테고리에는 아직 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.category.slug}/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img 
                  src={product.images} 
                  alt={product.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
              <p className="font-black text-blue-600">
                ₩{product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}