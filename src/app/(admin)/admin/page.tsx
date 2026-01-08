import { db } from "@/lib/db";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

// shadcn/ui Card 컴포넌트가 없으므로 간단히 div로 대체하거나 생성해야 함.
// 여기서는 빠르게 직접 스타일링합니다.

export default async function AdminPage() {
  // 통계 데이터 병렬 페칭
  const [totalOrders, totalProducts, revenueData] = await Promise.all([
    db.order.count(),
    db.product.count(),
    db.order.aggregate({
      _sum: { total: true },
    }),
  ]);

  const totalRevenue = revenueData._sum.total || 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Revenue */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">₩{totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
        </div>

        {/* Orders */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-xs text-muted-foreground mt-1">+12 since last hour</p>
        </div>

        {/* Products */}
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Active Products</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground mt-1">In 4 categories</p>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 bg-white dark:bg-zinc-900 rounded-xl border p-6">
          <h3 className="text-lg font-bold mb-4">Overview Chart</h3>
          <div className="h-[200px] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-lg text-muted-foreground">
            Chart Component Placeholder
          </div>
        </div>
        <div className="col-span-3 bg-white dark:bg-zinc-900 rounded-xl border p-6">
          <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
          <p className="text-sm text-muted-foreground">You made {totalOrders} sales this month.</p>
        </div>
      </div>
    </div>
  );
}
