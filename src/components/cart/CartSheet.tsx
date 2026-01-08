"use client";

import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useStore } from "@/lib/store/use-store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect } from "react";

export default function CartSheet() {
  // Hydration Safe Store Usage
  const items = useStore(useCartStore, (state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  // persist middleware의 수동 hydration (Client Side Only)
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const cartItems = items || []; // items가 로드되기 전엔 빈 배열
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center border border-white dark:border-zinc-900">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
              <p className="text-muted-foreground">장바구니가 비어있습니다.</p>
              <Button variant="outline" asChild>
                <Link href="/products/all">쇼핑 계속하기</Link>
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-md border bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium">
                    <h3 className="line-clamp-1 mr-2">
                      <Link href={`/products/${item.categorySlug}/${item.slug}`} className="hover:underline">
                        {item.title}
                      </Link>
                    </h3>
                    <p>₩{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ₩{item.price.toLocaleString()} / 개
                  </p>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> 삭제
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between text-base font-medium">
              <p>Total</p>
              <p>₩{totalPrice.toLocaleString()}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              배송비와 세금은 결제 단계에서 계산됩니다.
            </p>
            <SheetTrigger asChild>
              <Button asChild className="w-full h-12 text-lg">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
