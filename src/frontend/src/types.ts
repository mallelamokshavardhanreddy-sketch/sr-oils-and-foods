import type { Principal } from "@icp-sdk/core/principal";

export interface Product {
  id: bigint;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: { available: null } | { outOfStock: null };
  createdAt: bigint;
}

export interface OrderItem {
  productId: bigint;
  name: string;
  qty: bigint;
  price: number;
}

export type OrderStatus =
  | { pending: null }
  | { confirmed: null }
  | { packed: null }
  | { shipped: null }
  | { delivered: null };

export interface Order {
  orderId: bigint;
  customerId: Principal;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: bigint;
}

export interface CreateOrderRequest {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
}

export type StockStatus = "available" | "outOfStock";

export type SortBy =
  | { priceAsc: null }
  | { priceDesc: null }
  | { newest: null };

export interface ProductFilters {
  category?: string;
  search?: string;
  sortBy?: SortBy;
}

export function getOrderStatusLabel(status: OrderStatus): string {
  if ("pending" in status) return "Pending";
  if ("confirmed" in status) return "Confirmed";
  if ("packed" in status) return "Packed";
  if ("shipped" in status) return "Shipped";
  if ("delivered" in status) return "Delivered";
  return "Unknown";
}

export function isInStock(product: Product): boolean {
  return "available" in product.stock;
}
