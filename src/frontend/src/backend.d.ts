import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: ProductId;
    name: string;
    createdAt: Timestamp;
    description: string;
    stock: StockStatus;
    imageUrl: string;
    category: string;
    price: number;
}
export type Timestamp = bigint;
export interface OrderItem {
    qty: bigint;
    name: string;
    productId: ProductId;
    price: number;
}
export interface Order {
    customerName: string;
    status: OrderStatus;
    createdAt: Timestamp;
    email: string;
    orderId: OrderId;
    address: string;
    customerId: Principal;
    phone: string;
    items: Array<OrderItem>;
    totalPrice: number;
}
export interface CreateProductRequest {
    name: string;
    description: string;
    stock: StockStatus;
    imageUrl: string;
    category: string;
    price: number;
}
export type ProductId = bigint;
export interface ShopInfo {
    latitude?: number;
    city: string;
    name: string;
    state: string;
    addressLine1: string;
    addressLine2?: string;
    longitude?: number;
    phone: string;
    pincode: string;
}
export interface CreateOrderRequest {
    customerName: string;
    email: string;
    address: string;
    phone: string;
    items: Array<OrderItem>;
}
export type OrderId = bigint;
export interface UpdateProductRequest {
    id: ProductId;
    name: string;
    description: string;
    stock: StockStatus;
    imageUrl: string;
    category: string;
    price: number;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed",
    packed = "packed"
}
export enum SortBy {
    newest = "newest",
    priceDesc = "priceDesc",
    priceAsc = "priceAsc"
}
export enum StockStatus {
    outOfStock = "outOfStock",
    available = "available"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(req: CreateProductRequest): Promise<Product>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(req: CreateOrderRequest): Promise<Order>;
    deleteProduct(id: ProductId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: ProductId): Promise<Product | null>;
    getShopInfo(): Promise<ShopInfo | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllOrders(): Promise<Array<Order>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(category: string | null, search: string | null, sortBy: SortBy | null): Promise<Array<Product>>;
    seedProducts(): Promise<bigint>;
    setShopInfo(info: ShopInfo): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<boolean>;
    updateProduct(req: UpdateProductRequest): Promise<boolean>;
}
