import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateOrderRequest, Order, OrderStatus } from "../types";

export function useMyOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listMyOrders();
        return Array.isArray(result) ? result : [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAllOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order[]>({
    queryKey: ["allOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listAllOrders();
        if (Array.isArray(result)) return result;
        if (result && typeof result === "object" && "ok" in result) {
          return Array.isArray(result.ok) ? result.ok : [];
        }
        return [];
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).placeOrder(req);
      if (result && typeof result === "object" && "ok" in result) {
        return result.ok as Order;
      }
      if (result && typeof result === "object" && "err" in result) {
        throw new Error(result.err as string);
      }
      return result as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { orderId: bigint; status: OrderStatus }>({
    mutationFn: async ({ orderId, status }) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).updateOrderStatus(orderId, status);
      if (result && typeof result === "object" && "ok" in result) {
        return result.ok as boolean;
      }
      if (result && typeof result === "object" && "err" in result) {
        throw new Error(result.err as string);
      }
      return result as boolean;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
  });
}
