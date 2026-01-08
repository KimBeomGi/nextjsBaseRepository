import { db } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-zinc-950 border-b">
            <tr>
              <th className="px-6 py-4 font-medium text-muted-foreground">Order ID</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Customer</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Total</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                <td className="px-6 py-4 font-mono">#{order.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium">{order.address}</div>
                  <div className="text-xs text-muted-foreground">{order.items.length} items</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold">₩{order.total.toLocaleString()}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
