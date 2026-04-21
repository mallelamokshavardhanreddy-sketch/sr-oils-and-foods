import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Layout } from "../components/Layout";
import { useCartStore } from "../store/cart";

function EmptyCart() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-6 text-center"
      data-ocid="cart.empty_state"
    >
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground max-w-xs">
          Looks like you haven't added anything yet. Browse our collection and
          find something you love.
        </p>
      </div>
      <Button
        asChild
        size="lg"
        className="gap-2 gradient-earthy text-primary-foreground"
        data-ocid="cart.browse_products_button"
      >
        <Link to="/">
          <ShoppingBag className="h-4 w-4" />
          Browse Products
        </Link>
      </Button>
    </div>
  );
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const cartTotal = useCartStore((s) => s.cartTotal());
  const navigate = useNavigate();

  const freeShippingThreshold = 99;
  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : 9.99;
  const orderTotal = cartTotal + shippingCost;

  return (
    <Layout>
      <div
        className="container mx-auto px-4 py-10 max-w-5xl"
        data-ocid="cart.page"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              data-ocid="cart.back_link"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <h1 className="text-3xl font-display font-bold text-foreground">
              Shopping Cart
            </h1>
            {items.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive gap-1.5"
              data-ocid="cart.clear_cart_button"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items list */}
            <div
              className="lg:col-span-2 flex flex-col gap-4"
              data-ocid="cart.list"
            >
              {items.map((item, idx) => (
                <Card
                  key={item.product.id.toString()}
                  className="border border-border bg-card overflow-hidden"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product image */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
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

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-display font-semibold text-foreground truncate">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">
                              {item.product.category}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                            onClick={() => removeItem(item.product.id)}
                            data-ocid={`cart.remove_item_button.${idx + 1}`}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity stepper */}
                          <div
                            className="flex items-center border border-input rounded-lg overflow-hidden"
                            data-ocid={`cart.qty_stepper.${idx + 1}`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2.5 rounded-none border-r border-input"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              data-ocid={`cart.decrease_qty_button.${idx + 1}`}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center text-sm font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2.5 rounded-none border-l border-input"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              data-ocid={`cart.increase_qty_button.${idx + 1}`}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              ${item.product.price.toFixed(2)} × {item.quantity}
                            </p>
                            <p className="font-display font-bold text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-1">
              <Card
                className="border border-border bg-card sticky top-24"
                data-ocid="cart.order_summary"
              >
                <CardContent className="p-6">
                  <h2 className="font-display font-bold text-lg text-foreground mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        Subtotal ({items.length}{" "}
                        {items.length === 1 ? "item" : "items"})
                      </span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span
                        className={
                          shippingCost === 0 ? "text-primary font-medium" : ""
                        }
                      >
                        {shippingCost === 0
                          ? "Free"
                          : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {cartTotal < freeShippingThreshold && (
                    <div className="mt-3 bg-muted/50 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">
                        Add{" "}
                        <span className="font-semibold text-foreground">
                          ${(freeShippingThreshold - cartTotal).toFixed(2)}
                        </span>{" "}
                        more for free shipping
                      </p>
                      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-display font-bold text-foreground">
                      Total
                    </span>
                    <span className="font-display font-bold text-xl text-primary">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full gap-2 gradient-earthy text-primary-foreground"
                    size="lg"
                    onClick={() => navigate({ to: "/checkout" })}
                    data-ocid="cart.checkout_button"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-muted-foreground"
                    asChild
                    data-ocid="cart.continue_shopping_button"
                  >
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
