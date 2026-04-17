import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { ShopInfo } from "../backend.d";

export function useShopInfo() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ShopInfo | null>({
    queryKey: ["shopInfo"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getShopInfo();
        // Handle Motoko Option: [] = None, [value] = Some
        if (Array.isArray(result)) {
          return result.length > 0 ? result[0] : null;
        }
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}
