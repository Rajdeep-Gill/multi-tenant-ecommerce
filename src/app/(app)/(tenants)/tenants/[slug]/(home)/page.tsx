import { SearchParams } from "nuqs/server";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { ProductListView } from "@/modules/products/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
      tenantSlug: slug,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
}
