import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold tracking-tighter">
            NextAdmin
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/products" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link 
            href="/admin/orders" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-black p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
