import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const OwnerDashboardPage = lazy(() => import("./pages/OwnerDashboardPage"));
const OwnerProductsPage = lazy(() => import("./pages/OwnerProductsPage"));
const ShopAddressPage = lazy(() => import("./pages/ShopAddressPage"));
const OwnerShopSettingsPage = lazy(
  () => import("./pages/OwnerShopSettingsPage"),
);

const rootRoute = createRootRoute();

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={null}>
      <CatalogPage />
    </Suspense>
  ),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: () => (
    <Suspense fallback={null}>
      <ProductDetailPage />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={null}>
      <CartPage />
    </Suspense>
  ),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={null}>
      <CheckoutPage />
    </Suspense>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <Suspense fallback={null}>
      <OrderHistoryPage />
    </Suspense>
  ),
});

const ownerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/dashboard",
  component: () => (
    <Suspense fallback={null}>
      <OwnerDashboardPage />
    </Suspense>
  ),
});

const ownerProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/products",
  component: () => (
    <Suspense fallback={null}>
      <OwnerProductsPage />
    </Suspense>
  ),
});

const shopAddressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop-address",
  component: () => (
    <Suspense fallback={null}>
      <ShopAddressPage />
    </Suspense>
  ),
});

const ownerShopSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/owner/shop-settings",
  component: () => (
    <Suspense fallback={null}>
      <OwnerShopSettingsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  catalogRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  ownerDashboardRoute,
  ownerProductsRoute,
  shopAddressRoute,
  ownerShopSettingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
