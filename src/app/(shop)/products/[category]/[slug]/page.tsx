import AddToCartButton from "@/components/cart/AddToCartButton";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb-simple";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug }, include: { category: true } });

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | NextShop`,
    description: product.description?.slice(0, 160) || `Buy ${product.title} at NextShop`,
    openGraph: {
      title: product.title,
      description: product.description || "",
      images: [product.images],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    return notFound();
  }

  // Related Products (같은 카테고리, 현재 상품 제외, 최대 4개)
  const relatedProducts = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" }, // 최신순 (랜덤은 DB 지원 여부에 따라 복잡할 수 있음)
  });

  return (
    <div className="container py-12 md:py-20">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: "Products", href: "/products/all" },
          { label: product.category.name, href: `/products/${product.category.slug}` },
          { label: product.title },
        ]} 
      />

      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
        {/* Left: Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-xl group">
          <Image 
            src={product.images} 
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">
              {product.category.name}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              {product.title}
            </h1>
            <p className="text-3xl font-black text-gray-900 dark:text-white">
              ₩{product.price.toLocaleString()}
            </p>
          </div>

          <div className="prose dark:prose-invert mb-10 text-gray-600 dark:text-gray-400">
            <p className="leading-relaxed whitespace-pre-wrap">
              {product.description || "상품 상세 설명이 없습니다."}
            </p>
          </div>

          <div className="space-y-4 mt-auto">
            <div className="flex gap-4">
              <AddToCartButton product={product} />
              
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-2xl">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-gray-500">
              <Share2 className="mr-2 h-4 w-4" />
              친구에게 공유하기
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">배송 정보</span>
              <span className="font-medium">무료 배송 (3만원 이상 구매 시)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">반품/교환</span>
              <span className="font-medium">7일 이내 가능</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="border-t pt-20">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link 
                key={item.id}
                href={`/products/${product.category.slug}/${item.slug}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                  <Image 
                    src={item.images} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="font-black text-gray-900 dark:text-white">
                  ₩{item.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
