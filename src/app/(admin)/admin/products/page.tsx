import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-zinc-950 border-b">
            <tr>
              <th className="px-6 py-4 font-medium text-muted-foreground">Image</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Name</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Category</th>
              <th className="px-6 py-4 font-medium text-muted-foreground">Price</th>
              <th className="px-6 py-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50">
                <td className="px-6 py-4">
                  <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden">
                    <img src={product.images} alt="" className="h-full w-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{product.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                    {product.category.name}
                  </span>
                </td>
                <td className="px-6 py-4">₩{product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
