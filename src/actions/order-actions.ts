"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CheckoutItem {
  id: number;
  quantity: number;
  price: number;
}

interface CreateOrderParams {
  items: CheckoutItem[];
  address: string;
  total: number;
}

/**
 * [Server Action] Create Order
 * - 주문 정보를 DB에 저장합니다.
 * - 실제 서비스에서는 여기서 PG사(Stripe, Toss) 결제 검증 로직이 들어갑니다.
 */
export async function createOrder(params: CreateOrderParams) {
  try {
    const order = await db.order.create({
      data: {
        total: params.total,
        address: params.address,
        status: "COMPLETED", // Mock 결제이므로 바로 완료 처리
        items: {
          create: params.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    revalidatePath("/admin/orders"); // 관리자 페이지가 있다면 갱신
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order Creation Failed:", error);
    return { success: false, message: "주문 처리에 실패했습니다." };
  }
}
