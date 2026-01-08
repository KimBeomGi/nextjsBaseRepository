"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// New Components
import CartSheet from "@/components/cart/CartSheet";
import SearchInput from "@/components/layout/SearchInput";
import { ModeToggle } from "@/components/layout/ModeToggle";

const NAV_LINKS = [
  { href: "/products/new", label: "NEW" },
  { href: "/products/men", label: "MEN" },
  { href: "/products/women", label: "WOMEN" },
  { href: "/products/accessories", label: "ACCESSORIES" },
  { href: "/posts", label: "COMMUNITY" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-bold">NextShop</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter">NextShop</span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname.startsWith(link.href) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Search, Account, Cart */}
        <div className="flex items-center gap-2 flex-1 md:flex-none justify-end">
          <Suspense fallback={<div className="w-[300px]" />}>
            <SearchInput />
          </Suspense>
          
          <ModeToggle />

          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>

          {/* Cart with Badge */}
          <CartSheet />
        </div>
      </div>
    </header>
  );
}