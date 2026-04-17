import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { LoginButton } from "../components/LoginButton";
import { useAuth } from "../hooks/useAuth";
import { usePlaceOrder } from "../hooks/useOrders";
import { useCartStore } from "../store/cart";
import type { CreateOrderRequest } from "../types";

interface CheckoutFormValues {
  customerName: string;
  email: string;
  phone: string;
  address: string;
}

function OrderConfirmation({ orderId }: { orderId: bigint }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-6 text-center"
      data-ocid="checkout.success_state"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>
      <div>
        <h2 className="text-3xl font-display font-bold text-foreground mb-2">
          Order Placed!
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Thank you! You'll hear from us soon once your order is confirmed and
          dispatched for delivery.
        </p>
      </div>
      <div className="bg-muted/40 border border-border rounded-xl px-8 py-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          Order ID
        </p>
        <p className="font-mono font-bold text-foreground text-lg">
          #{orderId.toString()}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="gap-2 gradient-warm text-primary-foreground"
          onClick={() => navigate({ to: "/orders" })}
          data-ocid="checkout.view_orders_button"
        >
          <Package className="h-4 w-4" />
          View My Orders
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          data-ocid="checkout.continue_shopping_button"
          className="gap-2"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.cartTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const { isAuthenticated } = useAuth();
  const placeOrder = usePlaceOrder();
  const [confirmedOrderId, setConfirmedOrderId] = useState<bigint | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>();

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const req: CreateOrderRequest = {
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: BigInt(i.quantity),
        price: i.product.price,
      })),
    };
    try {
      const order = await placeOrder.mutateAsync(req);
      clearCart();
      setConfirmedOrderId(order.orderId);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.",
      );
    }
  };

  if (confirmedOrderId !== null) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <OrderConfirmation orderId={confirmedOrderId} />
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-24 text-center max-w-sm"
          data-ocid="checkout.empty_state"
        >
          <h2 className="font-display font-bold text-2xl text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add products to your cart before checking out.
          </p>
          <Button
            asChild
            className="gap-2 gradient-warm text-primary-foreground"
            data-ocid="checkout.browse_button"
          >
            <Link to="/">
              <ShoppingBag className="h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-10 max-w-5xl"
        data-ocid="checkout.page"
      >
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            to="/cart"
            data-ocid="checkout.back_to_cart_link"
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-3xl font-display font-bold text-foreground">
            Checkout
          </h1>
        </div>

        {/* Auth prompt */}
        {!isAuthenticated && (
          <div
            className="bg-card border border-border rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            data-ocid="checkout.login_prompt"
          >
            <div>
              <p className="font-semibold text-foreground">
                Sign in to place your order
              </p>
              <p className="text-sm text-muted-foreground">
                Your order will be linked to your account for tracking
              </p>
            </div>
            <LoginButton />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          data-ocid="checkout.form"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Customer details */}
            <div className="lg:col-span-3">
              <Card className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-lg">
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      placeholder="Jane Doe"
                      data-ocid="checkout.name_input"
                      {...register("customerName", {
                        required: "Full name is required",
                      })}
                      className={
                        errors.customerName ? "border-destructive" : ""
                      }
                    />
                    {errors.customerName && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="checkout.name_field_error"
                      >
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  {/* Email + Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        data-ocid="checkout.email_input"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.email_field_error"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        data-ocid="checkout.phone_input"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="checkout.phone_field_error"
                        >
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      rows={4}
                      placeholder={
                        "123 Main St, Apt 4B\nNew York, NY 10001\nUnited States"
                      }
                      data-ocid="checkout.address_input"
                      {...register("address", {
                        required: "Delivery address is required",
                      })}
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="checkout.address_field_error"
                      >
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-5 gap-2 gradient-warm text-primary-foreground"
                disabled={
                  placeOrder.isPending || !isAuthenticated || items.length === 0
                }
                data-ocid="checkout.place_order_button"
              >
                {placeOrder.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order…
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Place Order — ${cartTotal.toFixed(2)}
                  </>
                )}
              </Button>
              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Sign in above to enable order placement
                </p>
              )}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-2" data-ocid="checkout.summary_panel">
              <Card className="border border-border bg-card sticky top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="font-display text-base">
                    Your Order ({items.length}{" "}
                    {items.length === 1 ? "item" : "items"})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item, idx) => (
                      <div
                        key={item.product.id.toString()}
                        className="flex gap-3"
                        data-ocid={`checkout.order_item.${idx + 1}`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={
                              item.product.imageUrl ||
                              "/assets/images/placeholder.svg"
                            }
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/images/placeholder.svg";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground flex-shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-foreground">
                      Total
                    </span>
                    <span className="font-display font-bold text-xl text-primary">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
