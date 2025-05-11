"use client";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white text-black",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white text-black",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white text-black",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot &amp; New
      </Button>
    </div>
  );
};
