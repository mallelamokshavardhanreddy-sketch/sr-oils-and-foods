import "./index-TdTOFd1p.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BfHBhA_X.js";
function useProducts(filters) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.listProducts(
          (filters == null ? void 0 : filters.category) ? [filters.category] : [],
          (filters == null ? void 0 : filters.search) ? [filters.search] : [],
          (filters == null ? void 0 : filters.sortBy) ? [filters.sortBy] : []
        );
        return Array.isArray(result) ? result : [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching
  });
}
function useProduct(id) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      try {
        const result = await actor.getProduct(id);
        if (Array.isArray(result) && result.length > 0) return result[0];
        if (result && typeof result === "object" && "__kind__" in result) {
          return result.__kind__ === "Some" ? result.value : null;
        }
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching && id !== void 0
  });
}
export {
  useProduct as a,
  useProducts as u
};
