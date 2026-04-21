import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  DollarSign,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useAllOrders, useUpdateOrderStatus } from "../hooks/useOrders";
import { type Order, type OrderStatus, getOrderStatusLabel } from "../types";

type StatusFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered";

const STATUS_BADGE: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground border-border",
  Confirmed: "bg-primary/10 text-primary border-primary/30",
  Packed: "bg-accent/15 text-accent-foreground border-accent/30",
  Shipped: "bg-secondary/50 text-secondary-foreground border-secondary",
  Delivered: "bg-chart-2/10 text-foreground border-chart-2/30",
};

const STATUS_OPTIONS: { value: string; label: string; variant: OrderStatus }[] =
  [
    { value: "pending", label: "Pending", variant: { pending: null } },
    { value: "confirmed", label: "Confirmed", variant: { confirmed: null } },
    { value: "packed", label: "Packed", variant: { packed: null } },
    { value: "shipped", label: "Shipped", variant: { shipped: null } },
    { value: "delivered", label: "Delivered", variant: { delivered: null } },
  ];

function getStatusKey(status: OrderStatus): string {
  return Object.keys(status)[0];
}

function StatCard({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${colorClass} shrink-0`}>
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {label}
            </p>
            <p className="text-2xl font-display font-bold text-foreground leading-tight">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderDetailModal({
  order,
  onClose,
}: { order: Order; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="order_detail.dialog">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center justify-between pr-4">
            Order{" "}
            <span className="font-mono text-sm text-muted-foreground ml-2">
              #{order.orderId.toString()}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 text-sm">
          <div className="rounded-xl bg-muted/50 border border-border p-4 space-y-2.5">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Customer
            </h4>
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16 shrink-0">
                  Name
                </span>
                <span className="font-medium text-foreground">
                  {order.customerName}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16 shrink-0">
                  Email
                </span>
                <span className="text-foreground break-all">{order.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16 shrink-0">
                  Phone
                </span>
                <span className="text-foreground">{order.phone}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16 shrink-0">
                  Address
                </span>
                <span className="text-foreground">{order.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wide font-semibold text-muted-foreground mb-3">
              Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.qty.toString()} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-semibold text-foreground shrink-0">
                    ${(item.price * Number(item.qty)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-bold text-foreground text-base">
              <span>Order Total</span>
              <span className="text-primary">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            data-ocid="order_detail.close_button"
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OwnerDashboardPage() {
  const { isAuthenticated, isOwner, isInitializing, login } = useAuth();
  const { data: orders = [], isLoading } = useAllOrders();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isInitializing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !isOwner) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-24 flex flex-col items-center text-center"
          data-ocid="owner_dashboard.unauthorized_state"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
            <LayoutDashboard className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Not Authorized
          </h2>
          <p className="text-muted-foreground max-w-sm mb-6">
            {!isAuthenticated
              ? "Please log in with the owner account to access the dashboard."
              : "Your account does not have owner privileges."}
          </p>
          {!isAuthenticated && (
            <Button
              onClick={() => login()}
              className="gradient-warm text-primary-foreground mb-2"
              data-ocid="owner_dashboard.login_button"
            >
              Login with Internet Identity
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            data-ocid="owner_dashboard.back_button"
          >
            Back to Store
          </Button>
        </div>
      </Layout>
    );
  }

  const pending = orders.filter((o) => "pending" in o.status).length;
  const shipped = orders.filter((o) => "shipped" in o.status).length;
  const delivered = orders.filter((o) => "delivered" in o.status).length;
  const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const filtered =
    filter === "all"
      ? orders
      : orders.filter((o) => getStatusKey(o.status) === filter);

  const handleStatusChange = async (order: Order, newKey: string) => {
    const opt = STATUS_OPTIONS.find((s) => s.value === newKey);
    if (!opt) return;
    try {
      await updateStatus({ orderId: order.orderId, status: opt.variant });
      toast.success(`Order #${order.orderId} marked as ${opt.label}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update status",
      );
    }
  };

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1
              className="font-display font-bold text-2xl text-foreground"
              data-ocid="owner_dashboard.page"
            >
              Owner Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Track and fulfill customer orders
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link
              to="/owner/products"
              data-ocid="owner_dashboard.manage_products_link"
            >
              <Package className="h-3.5 w-3.5 mr-1.5" />
              Manage Products
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="owner_dashboard.stats_section"
        >
          <StatCard
            icon={<ShoppingBag className="h-5 w-5 text-primary" />}
            label="Total Orders"
            value={orders.length}
            colorClass="bg-primary/10"
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-foreground" />}
            label="Pending"
            value={pending}
            colorClass="bg-muted"
          />
          <StatCard
            icon={<Truck className="h-5 w-5 text-foreground" />}
            label="Shipped"
            value={shipped}
            colorClass="bg-secondary/50"
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5 text-accent" />}
            label="Delivered"
            value={delivered}
            colorClass="bg-accent/15"
          />
        </div>

        {/* Revenue highlight */}
        <div
          className="rounded-xl gradient-warm p-5 flex items-center gap-4 text-primary-foreground"
          data-ocid="owner_dashboard.revenue_card"
        >
          <DollarSign className="h-8 w-8 opacity-80" />
          <div>
            <p className="text-sm font-medium opacity-80">Total Revenue</p>
            <p className="text-3xl font-display font-bold">
              ${revenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Orders table */}
        <Card
          className="bg-card border-border"
          data-ocid="owner_dashboard.orders_table"
        >
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <CardTitle className="font-display text-lg">All Orders</CardTitle>
              <Tabs
                value={filter}
                onValueChange={(v) => setFilter(v as StatusFilter)}
              >
                <TabsList
                  className="h-8"
                  data-ocid="owner_dashboard.status_filter"
                >
                  {(
                    [
                      "all",
                      "pending",
                      "confirmed",
                      "packed",
                      "shipped",
                      "delivered",
                    ] as const
                  ).map((s) => (
                    <TabsTrigger
                      key={s}
                      value={s}
                      className="capitalize text-xs px-2"
                      data-ocid={`owner_dashboard.filter.${s}`}
                    >
                      {s}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="owner_dashboard.orders_loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 rounded-lg" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="py-16 text-center"
                data-ocid="owner_dashboard.orders_empty_state"
              >
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No orders for this filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Update Status</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((order, idx) => {
                      const label = getOrderStatusLabel(order.status);
                      const badgeClass =
                        STATUS_BADGE[label] ?? "bg-muted text-muted-foreground";
                      const date = new Date(
                        Number(order.createdAt) / 1_000_000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      });
                      return (
                        <TableRow
                          key={order.orderId.toString()}
                          className="hover:bg-muted/20"
                          data-ocid={`owner_dashboard.order_row.${idx + 1}`}
                        >
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            #{order.orderId.toString()}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {date}
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-foreground text-sm leading-tight">
                              {order.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.email}
                            </p>
                          </TableCell>
                          <TableCell className="text-right text-sm">
                            {order.items.length}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-foreground text-sm">
                            ${order.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-xs border font-medium ${badgeClass}`}
                            >
                              {label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={getStatusKey(order.status)}
                              onValueChange={(v) =>
                                handleStatusChange(order, v)
                              }
                              disabled={isUpdating}
                            >
                              <SelectTrigger
                                className="h-7 w-32 text-xs"
                                data-ocid={`owner_dashboard.status_select.${idx + 1}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((s) => (
                                  <SelectItem
                                    key={s.value}
                                    value={s.value}
                                    className="text-xs"
                                  >
                                    {s.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
                              onClick={() => setSelectedOrder(order)}
                              data-ocid={`owner_dashboard.view_order_button.${idx + 1}`}
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </Layout>
  );
}
