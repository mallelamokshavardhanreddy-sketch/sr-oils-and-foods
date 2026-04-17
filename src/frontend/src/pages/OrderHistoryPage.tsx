import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Package,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { LoginButton } from "../components/LoginButton";
import { useAuth } from "../hooks/useAuth";
import { useMyOrders } from "../hooks/useOrders";
import type { Order, OrderStatus } from "../types";
import { getOrderStatusLabel } from "../types";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground border-border",
  Confirmed: "bg-primary/10 text-primary border-primary/30",
  Packed: "bg-accent/15 text-accent-foreground border-accent/30",
  Shipped: "bg-chart-5/10 text-foreground border-chart-5/30",
  Delivered: "bg-chart-2/10 text-foreground border-chart-2/30",
};

function getStatusStyle(status: OrderStatus): string {
  return (
    STATUS_STYLES[getOrderStatusLabel(status)] ??
    "bg-muted text-muted-foreground border-border"
  );
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const statusLabel = getOrderStatusLabel(order.status);
  const statusStyle = getStatusStyle(order.status);

  return (
    <Card
      className="border border-border bg-card hover:border-primary/20 transition-colors duration-200"
      data-ocid={`orders.item.${index}`}
    >
      <CardContent className="p-5">
        {/* Top row: order ID + status + total */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-foreground text-sm">
                #{order.orderId.toString()}
              </span>
              <Badge
                variant="outline"
                className={`text-xs border ${statusStyle}`}
                data-ocid={`orders.status_badge.${index}`}
              >
                {statusLabel}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-0.5">Total</p>
            <p className="font-display font-bold text-lg text-primary">
              ${order.totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Items summary */}
        <div className="mt-3 flex items-center gap-2">
          <Package className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground truncate">
            {order.items.length === 1
              ? (order.items[0]?.name ?? "1 item")
              : `${order.items.length} items — ${order.items
                  .slice(0, 2)
                  .map((i) => i.name)
                  .join(", ")}${order.items.length > 2 ? "…" : ""}`}
          </p>
        </div>

        {/* Expand toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 gap-1.5 text-muted-foreground hover:text-foreground px-0 h-auto text-xs"
          onClick={() => setExpanded(!expanded)}
          data-ocid={`orders.expand_button.${index}`}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              Hide details
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              View details
            </>
          )}
        </Button>

        {/* Expanded details */}
        {expanded && (
          <div data-ocid={`orders.details.${index}`} className="mt-3">
            <Separator className="mb-4" />
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      ×{item.qty.toString()}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground flex-shrink-0 ml-4">
                    ${(item.price * Number(item.qty)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="mt-3 mb-3" />
            <div className="text-sm">
              <span className="text-muted-foreground">Deliver to: </span>
              <span className="text-foreground font-medium break-words">
                {order.address}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4" data-ocid="orders.loading_state">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border border-border bg-card">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-3 w-56 mt-3" />
            <Skeleton className="h-7 w-28 mt-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function OrderHistoryPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: orders, isLoading } = useMyOrders();

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display font-bold text-3xl text-foreground">
            My Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and review all your past purchases
          </p>
        </div>
      </div>

      <div
        className="container mx-auto px-4 py-8 max-w-3xl"
        data-ocid="orders.page"
      >
        {/* Auth check */}
        {!isInitializing && !isAuthenticated && (
          <div
            className="flex flex-col items-center justify-center py-20 gap-6 text-center"
            data-ocid="orders.login_prompt"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ClipboardList className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Sign in to view your orders
              </h2>
              <p className="text-muted-foreground max-w-xs">
                Your order history is tied to your account. Sign in with
                Internet Identity to see your past purchases.
              </p>
            </div>
            <LoginButton />
          </div>
        )}

        {/* Loading */}
        {(isInitializing || (isAuthenticated && isLoading)) && (
          <OrdersSkeleton />
        )}

        {/* Empty state */}
        {!isInitializing &&
          isAuthenticated &&
          !isLoading &&
          (!orders || orders.length === 0) && (
            <div
              className="flex flex-col items-center justify-center py-20 gap-6 text-center"
              data-ocid="orders.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  No orders yet
                </h2>
                <p className="text-muted-foreground max-w-xs">
                  You haven't placed any orders. Start exploring our products
                  and make your first purchase!
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="gap-2 gradient-warm text-primary-foreground"
                data-ocid="orders.browse_button"
              >
                <Link to="/">
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

        {/* Orders list */}
        {!isInitializing &&
          isAuthenticated &&
          !isLoading &&
          orders &&
          orders.length > 0 && (
            <div className="flex flex-col gap-4" data-ocid="orders.list">
              {orders.map((order: Order, idx: number) => (
                <OrderCard
                  key={order.orderId.toString()}
                  order={order}
                  index={idx + 1}
                />
              ))}
            </div>
          )}
      </div>
    </Layout>
  );
}
