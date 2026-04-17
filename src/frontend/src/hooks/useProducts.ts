import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Product, ProductFilters } from "../types";

export function useProducts(filters?: ProductFilters) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products", filters],
    queryFn: async () => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listProducts(
          filters?.category ? [filters.category] : [],
          filters?.search ? [filters.search] : [],
          filters?.sortBy ? [filters.sortBy] : [],
        );
        return Array.isArray(result) ? result : [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getProduct(id);
        if (Array.isArray(result) && result.length > 0) return result[0];
        if (result && typeof result === "object" && "__kind__" in result) {
          return result.__kind__ === "Some" ? result.value : null;
        }
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}
