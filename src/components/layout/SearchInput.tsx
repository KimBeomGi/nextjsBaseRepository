"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Input 컴포넌트 필요 (없으면 html input)

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // URL이 바뀌면 검색창 값도 동기화 (선택 사항)
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="상품 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 pl-10 pr-4 rounded-full border bg-muted/50 text-sm focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
      />
    </form>
  );
}
