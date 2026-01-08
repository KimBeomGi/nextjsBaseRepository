"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { useStore } from "@/lib/store/use-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrder } from "@/actions/order-actions";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useStore(useCartStore, (state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Hydration 처리
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const cartItems = items || [];
  const total = items ? getTotalPrice() : 0;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error("배송지 주소를 입력해주세요.");
      return;
    }
    
    setIsProcessing(true);

    // 1초 딜레이 (UX: 처리 중 느낌)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await createOrder({
      items: cartItems.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
      address,
      total,
    });

    if (result.success) {
      clearCart();
      setIsCompleted(true);
      toast.success("주문이 성공적으로 완료되었습니다!");
    } else {
      toast.error("주문 실패: " + result.message);
    }
    
    setIsProcessing(false);
  };

  if (isCompleted) {
    return (
      <div className="container max-w-md py-24 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">주문 완료!</h1>
        <p className="text-gray-500 mb-8">
          주문해주셔서 감사합니다.<br />
          상품이 곧 발송될 예정입니다.
        </p>
        <Button size="lg" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">장바구니가 비어있습니다.</h1>
        <Button onClick={() => router.push("/products/all")}>쇼핑하러 가기</Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* 주문 폼 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">배송 정보</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">받는 분 성함</label>
              <Input placeholder="홍길동" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">연락처</label>
              <Input placeholder="010-0000-0000" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">배송지 주소</label>
              <Input 
                placeholder="서울시 강남구..." 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required 
              />
            </div>
            
            <div className="pt-4">
              <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-zinc-900 text-sm text-gray-500">
                현재는 테스트 모드입니다. 실제 결제는 이루어지지 않습니다.
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg mt-6" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  처리 중...
                </>
              ) : (
                `₩${total.toLocaleString()} 결제하기`
              )}
            </Button>
          </form>
        </div>

        {/* 주문 요약 */}
        <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-4">주문 요약</h2>
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.title} className="h-16 w-16 rounded-md object-cover bg-white" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-gray-500">수량: {item.quantity}개</p>
                  <p className="text-sm font-bold">₩{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>₩{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
