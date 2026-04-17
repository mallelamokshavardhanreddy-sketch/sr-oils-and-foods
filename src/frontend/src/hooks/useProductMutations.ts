import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Product } from "../types";

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: "available" | "outOfStock";
}

export function useAddProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<Product, Error, ProductFormData>({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not connected");
      const stockVariant =
        data.stock === "available" ? { available: null } : { outOfStock: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).addProduct(
        data.name,
        data.description,
        data.price,
        data.category,
        data.imageUrl,
        stockVariant,
      );
      if (result && typeof result === "object" && "ok" in result)
        return result.ok as Product;
      if (result && typeof result === "object" && "err" in result)
        throw new Error(result.err as string);
      return result as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: bigint } & ProductFormData>({
    mutationFn: async ({ id, ...data }) => {
      if (!actor) throw new Error("Not connected");
      const stockVariant =
        data.stock === "available" ? { available: null } : { outOfStock: null };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).updateProduct(
        id,
        data.name,
        data.description,
        data.price,
        data.category,
        data.imageUrl,
        stockVariant,
      );
      if (result && typeof result === "object" && "ok" in result)
        return result.ok as Product;
      if (result && typeof result === "object" && "err" in result)
        throw new Error(result.err as string);
      return result as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).deleteProduct(id);
      if (result && typeof result === "object" && "ok" in result)
        return result.ok as boolean;
      if (result && typeof result === "object" && "err" in result)
        throw new Error(result.err as string);
      return result as boolean;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
