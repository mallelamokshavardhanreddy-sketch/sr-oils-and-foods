import type { backendInterface } from "../backend";
import { OrderStatus, SortBy, StockStatus, UserRole } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleProducts = [
  {
    id: BigInt(1),
    name: "Artisan Leather Wallet",
    description: "Handcrafted full-grain leather wallet with RFID protection and 8 card slots.",
    stock: StockStatus.available,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    category: "Accessories",
    price: 89.99,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: BigInt(2),
    name: "Ceramic Pour-Over Coffee Set",
    description: "Premium ceramic pour-over set with hand-painted glaze finish. Includes dripper and carafe.",
    stock: StockStatus.available,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    category: "Kitchen",
    price: 124.00,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: BigInt(3),
    name: "Linen Throw Blanket",
    description: "Soft-washed linen throw in warm sand tones. Machine washable, 130x170cm.",
    stock: StockStatus.available,
    imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
    category: "Home",
    price: 65.00,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: BigInt(4),
    name: "Brass Desk Lamp",
    description: "Adjustable brass desk lamp with warm Edison bulb. Minimalist design for modern workspaces.",
    stock: StockStatus.available,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    category: "Home",
    price: 145.00,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: BigInt(5),
    name: "Natural Soy Candle Set",
    description: "Set of 3 hand-poured soy candles in amber glass. Scents: cedarwood, vanilla, sandalwood.",
    stock: StockStatus.available,
    imageUrl: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
    category: "Home",
    price: 48.00,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    id: BigInt(6),
    name: "Merino Wool Beanie",
    description: "100% merino wool beanie in burnt caramel. Ultra-soft, naturally odor-resistant.",
    stock: StockStatus.outOfStock,
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    category: "Accessories",
    price: 42.00,
    createdAt: BigInt(Date.now() * 1000000),
  },
];

const sampleOrders = [
  {
    orderId: BigInt(101),
    customerId: { toText: () => "aaaaa-aa" } as unknown as Principal,
    customerName: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 555-0101",
    address: "42 Maple Street, Brooklyn, NY 11201",
    items: [
      { productId: BigInt(1), name: "Artisan Leather Wallet", qty: BigInt(1), price: 89.99 },
      { productId: BigInt(5), name: "Natural Soy Candle Set", qty: BigInt(2), price: 48.00 },
    ],
    totalPrice: 185.99,
    status: OrderStatus.pending,
    createdAt: BigInt(Date.now() * 1000000),
  },
  {
    orderId: BigInt(102),
    customerId: { toText: () => "bbbbb-bb" } as unknown as Principal,
    customerName: "Marcus Rivera",
    email: "marcus@example.com",
    phone: "+1 555-0202",
    address: "18 Oak Avenue, Austin, TX 78701",
    items: [
      { productId: BigInt(2), name: "Ceramic Pour-Over Coffee Set", qty: BigInt(1), price: 124.00 },
    ],
    totalPrice: 124.00,
    status: OrderStatus.confirmed,
    createdAt: BigInt(Date.now() * 1000000 - 86400000000000),
  },
  {
    orderId: BigInt(103),
    customerId: { toText: () => "ccccc-cc" } as unknown as Principal,
    customerName: "Sophie Chen",
    email: "sophie@example.com",
    phone: "+1 555-0303",
    address: "7 Pine Road, Seattle, WA 98101",
    items: [
      { productId: BigInt(4), name: "Brass Desk Lamp", qty: BigInt(1), price: 145.00 },
      { productId: BigInt(3), name: "Linen Throw Blanket", qty: BigInt(1), price: 65.00 },
    ],
    totalPrice: 210.00,
    status: OrderStatus.shipped,
    createdAt: BigInt(Date.now() * 1000000 - 172800000000000),
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,

  addProduct: async (req) => ({
    id: BigInt(Math.floor(Math.random() * 1000) + 10),
    ...req,
    createdAt: BigInt(Date.now() * 1000000),
  }),

  assignCallerUserRole: async () => undefined,

  createOrder: async (req) => ({
    orderId: BigInt(Math.floor(Math.random() * 1000) + 200),
    customerId: { toText: () => "user-principal" } as unknown as Principal,
    customerName: req.customerName,
    email: req.email,
    phone: req.phone,
    address: req.address,
    items: req.items,
    totalPrice: req.items.reduce((sum, item) => sum + item.price * Number(item.qty), 0),
    status: OrderStatus.pending,
    createdAt: BigInt(Date.now() * 1000000),
  }),

  deleteProduct: async () => true,

  getCallerUserRole: async () => UserRole.admin,

  getProduct: async (id) => sampleProducts.find((p) => p.id === id) ?? null,

  isCallerAdmin: async () => true,

  listAllOrders: async () => sampleOrders,

  listMyOrders: async () => [sampleOrders[0]],

  listProducts: async (category, search, sortBy) => {
    let products = [...sampleProducts];
    if (category) products = products.filter((p) => p.category === category);
    if (search) products = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === SortBy.priceAsc) products.sort((a, b) => a.price - b.price);
    if (sortBy === SortBy.priceDesc) products.sort((a, b) => b.price - a.price);
    return products;
  },

  seedProducts: async () => BigInt(sampleProducts.length),

  updateOrderStatus: async () => true,

  updateProduct: async () => true,

  getShopInfo: async () => ({
    name: "SRI RAJESWARI OILS AND FOODS",
    addressLine1: "Near Main Market, Gandhi Road",
    addressLine2: "Nellore",
    city: "Nellore",
    state: "Andhra Pradesh",
    pincode: "524001",
    phone: "+91 98765 43210",
    latitude: 14.4426,
    longitude: 79.9865,
  }),

  setShopInfo: async () => undefined,
};
