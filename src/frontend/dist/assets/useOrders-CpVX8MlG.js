import { c as useQueryClient } from "./index-TdTOFd1p.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-BfHBhA_X.js";
import { u as useMutation } from "./useMutation-Dok9jKnt.js";
function useMyOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.listMyOrders();
        return Array.isArray(result) ? result : [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching
  });
}
function useAllOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const result = await actor.listAllOrders();
        if (Array.isArray(result)) return result;
        if (result && typeof result === "object" && "ok" in result) {
          return Array.isArray(result.ok) ? result.ok : [];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching
  });
}
function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.placeOrder(req);
      if (result && typeof result === "object" && "ok" in result) {
        return result.ok;
      }
      if (result && typeof result === "object" && "err" in result) {
        throw new Error(result.err);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.updateOrderStatus(orderId, status);
      if (result && typeof result === "object" && "ok" in result) {
        return result.ok;
      }
      if (result && typeof result === "object" && "err" in result) {
        throw new Error(result.err);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    }
  });
}
export {
  useMyOrders as a,
  useAllOrders as b,
  useUpdateOrderStatus as c,
  usePlaceOrder as u
};
