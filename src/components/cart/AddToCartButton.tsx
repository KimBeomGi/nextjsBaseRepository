"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: {
    id: number;
    slug: string;
    title: string;
    price: number;
    images: string;
    category: { slug: string };
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images, 
      quantity: 1,
      categorySlug: product.category.slug,
    });

    setIsAdded(true);
    toast.success("장바구니에 상품을 담았습니다.", {
      description: `${product.title} (₩${product.price.toLocaleString()})`,
      duration: 2000,
    });
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button 
      size="lg" 
      onClick={handleAddToCart}
      className={cn(
        "flex-1 h-14 text-lg font-bold rounded-2xl transition-all duration-300",
        isAdded ? "bg-green-600 hover:bg-green-700" : ""
      )}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-6 w-6" />
          담기 완료!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          장바구니 담기
        </>
      )}
    </Button>
  );
}