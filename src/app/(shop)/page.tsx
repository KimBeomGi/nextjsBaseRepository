import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/layout/HeroCarousel";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function ShopPage() {
  // DB에서 최신 상품 4개 가져오기
  const featuredProducts = await db.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      {/* Hero Section (Carousel) */}
      <HeroCarousel />

      {/* Featured Categories Grid (Responsive) */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Curated Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 aspect-[4/5]">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              WOMEN
            </div>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500')" }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <Link href="/products/women" className="absolute inset-0" />
          </div>
           
           {/* Card 2 */}
           <div className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 aspect-[4/5]">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              MEN
            </div>
             <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500')" }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <Link href="/products/men" className="absolute inset-0" />
          </div>
           
           {/* Card 3 */}
           <div className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 aspect-[4/5]">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              ACCESSORIES
            </div>
             <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500')" }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <Link href="/products/accessories" className="absolute inset-0" />
          </div>
           
           {/* Card 4 */}
           <div className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 aspect-[4/5]">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              NEW ARRIVALS
            </div>
             <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500')" }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <Link href="/products/new" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Featured Products Preview (Real Data) */}
      <section className="container py-20 border-t">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Weekly Highlights</h2>
            <p className="text-muted-foreground">이 주의 가장 인기 있는 아이템을 만나보세요.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products/all">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
             <Link 
              key={product.id}
              href={`/products/${product.category.slug}/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <Image 
                  src={product.images} 
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <p className="text-xs text-blue-600 font-bold uppercase mb-1">
                {product.category.name}
              </p>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors truncate">
                {product.title}
              </h3>
              <p className="font-black text-gray-900 dark:text-white">
                ₩{product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
