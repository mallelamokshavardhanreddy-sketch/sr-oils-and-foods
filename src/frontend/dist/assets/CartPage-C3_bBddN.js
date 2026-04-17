import { b as useNavigate, j as jsxRuntimeExports, L as Link } from "./index-B_8bstpq.js";
import { u as useCartStore, L as Layout, b as Separator, B as Badge, a as Button } from "./Layout-D2y_KZ98.js";
import { C as Card, a as CardContent } from "./card-Bf7P4gg-.js";
import { A as ArrowLeft } from "./arrow-left-Cxpug6Yw.js";
import { T as Trash2 } from "./trash-2-Cf1h2Wgo.js";
import { M as Minus } from "./minus-DDJYailu.js";
import { P as Plus } from "./plus-pQO-VALW.js";
import { A as ArrowRight } from "./arrow-right-B2TaS40k.js";
import { S as ShoppingBag } from "./shopping-bag-Dp2-gDhO.js";
function EmptyCart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 gap-6 text-center",
      "data-ocid": "cart.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-12 w-12 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "Looks like you haven't added anything yet. Browse our collection and find something you love." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "gap-2 gradient-warm text-primary-foreground",
            "data-ocid": "cart.browse_products_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
              "Browse Products"
            ] })
          }
        )
      ]
    }
  );
}
function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const cartTotal = useCartStore((s) => s.cartTotal());
  const navigate = useNavigate();
  const freeShippingThreshold = 99;
  const shippingCost = cartTotal >= freeShippingThreshold ? 0 : 9.99;
  const orderTotal = cartTotal + shippingCost;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-5xl",
      "data-ocid": "cart.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                "data-ocid": "cart.back_link",
                className: "text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                  "Continue Shopping"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Shopping Cart" }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-sm", children: [
              items.length,
              " ",
              items.length === 1 ? "item" : "items"
            ] })
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: clearCart,
              className: "text-muted-foreground hover:text-destructive gap-1.5",
              "data-ocid": "cart.clear_cart_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Clear all"
              ]
            }
          )
        ] }),
        items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyCart, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "lg:col-span-2 flex flex-col gap-4",
              "data-ocid": "cart.list",
              children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "border border-border bg-card overflow-hidden",
                  "data-ocid": `cart.item.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.imageUrl || "/assets/images/placeholder.svg",
                        alt: item.product.name,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: item.product.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 uppercase tracking-wide", children: item.product.category })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0",
                            onClick: () => removeItem(item.product.id),
                            "data-ocid": `cart.remove_item_button.${idx + 1}`,
                            "aria-label": `Remove ${item.product.name}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center border border-input rounded-lg overflow-hidden",
                            "data-ocid": `cart.qty_stepper.${idx + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  variant: "ghost",
                                  size: "sm",
                                  className: "h-8 px-2.5 rounded-none border-r border-input",
                                  onClick: () => updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                  ),
                                  "data-ocid": `cart.decrease_qty_button.${idx + 1}`,
                                  "aria-label": "Decrease quantity",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-semibold text-foreground", children: item.quantity }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  variant: "ghost",
                                  size: "sm",
                                  className: "h-8 px-2.5 rounded-none border-l border-input",
                                  onClick: () => updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  ),
                                  "data-ocid": `cart.increase_qty_button.${idx + 1}`,
                                  "aria-label": "Increase quantity",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            "$",
                            item.product.price.toFixed(2),
                            " × ",
                            item.quantity
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground", children: [
                            "$",
                            (item.product.price * item.quantity).toFixed(2)
                          ] })
                        ] })
                      ] })
                    ] })
                  ] }) })
                },
                item.product.id.toString()
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border border-border bg-card sticky top-24",
              "data-ocid": "cart.order_summary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-5", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Subtotal (",
                      items.length,
                      " ",
                      items.length === 1 ? "item" : "items",
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "$",
                      cartTotal.toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: shippingCost === 0 ? "text-primary font-medium" : "",
                        children: shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`
                      }
                    )
                  ] })
                ] }),
                cartTotal < freeShippingThreshold && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 bg-muted/50 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Add",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                      "$",
                      (freeShippingThreshold - cartTotal).toFixed(2)
                    ] }),
                    " ",
                    "more for free shipping"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all duration-300",
                      style: {
                        width: `${Math.min(cartTotal / freeShippingThreshold * 100, 100)}%`
                      }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-primary", children: [
                    "$",
                    orderTotal.toFixed(2)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full gap-2 gradient-warm text-primary-foreground",
                    size: "lg",
                    onClick: () => navigate({ to: "/checkout" }),
                    "data-ocid": "cart.checkout_button",
                    children: [
                      "Proceed to Checkout",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    className: "w-full mt-2 text-muted-foreground",
                    asChild: true,
                    "data-ocid": "cart.continue_shopping_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Continue Shopping" })
                  }
                )
              ] })
            }
          ) })
        ] })
      ]
    }
  ) });
}
export {
  CartPage as default
};
