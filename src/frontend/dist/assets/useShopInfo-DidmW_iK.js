import "./index-TdTOFd1p.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BfHBhA_X.js";
function useShopInfo() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["shopInfo"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const result = await actor.getShopInfo();
        if (Array.isArray(result)) {
          return result.length > 0 ? result[0] : null;
        }
        return result ?? null;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching
  });
}
export {
  useShopInfo as u
};
