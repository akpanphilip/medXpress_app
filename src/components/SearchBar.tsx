"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar({
  placeholder = "Search doctors, specialties or symptoms",
}: {
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = query.trim()
      ? `/doctors?q=${encodeURIComponent(query.trim())}`
      : "/doctors";
    router.push(target);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={19}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search doctors"
          className="h-13 w-full rounded-2xl border-2 border-sky/30 bg-surface pl-12 pr-4 text-sm font-medium text-foreground outline-none transition placeholder:text-muted/80 focus:border-sky focus:ring-4 focus:ring-sky/15"
        />
      </div>
      <button
        type="submit"
        className="press grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-sky text-white shadow-sm shadow-sky/30 transition hover:bg-sky-600"
        aria-label="Search"
      >
        <SlidersHorizontal size={20} />
      </button>
    </form>
  );
}
