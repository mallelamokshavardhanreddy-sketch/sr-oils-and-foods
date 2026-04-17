import { r as reactExports, j as jsxRuntimeExports, L as Link, u as ue, b as useNavigate } from "./index-B_8bstpq.js";
import { c as createLucideIcon, u as useCartStore, d as useAuth, L as Layout, a as Button, b as Separator, e as LoginButton, f as LoaderCircle, P as Package } from "./Layout-D2y_KZ98.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-Bf7P4gg-.js";
import { I as Input } from "./input-D0V40lDJ.js";
import { u as useForm, L as Label } from "./index.esm-CWr2bMdX.js";
import { T as Textarea } from "./textarea-RQj4L8r3.js";
import { u as usePlaceOrder } from "./useOrders-7VZcBq5G.js";
import { S as ShoppingBag } from "./shopping-bag-Dp2-gDhO.js";
import { A as ArrowLeft } from "./arrow-left-Cxpug6Yw.js";
import "./backend-DY3afAjs.js";
import "./useMutation-D_yvJRrd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function OrderConfirmation({ orderId }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-6 text-center",
      "data-ocid": "checkout.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-2", children: "Order Placed!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "Thank you! You'll hear from us soon once your order is confirmed and dispatched for delivery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-xl px-8 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 uppercase tracking-wide", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground text-lg", children: [
            "#",
            orderId.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2 gradient-warm text-primary-foreground",
              onClick: () => navigate({ to: "/orders" }),
              "data-ocid": "checkout.view_orders_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }),
                "View My Orders"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "checkout.continue_shopping_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                "Continue Shopping"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.cartTotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const { isAuthenticated } = useAuth();
  const placeOrder = usePlaceOrder();
  const [confirmedOrderId, setConfirmedOrderId] = reactExports.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    if (items.length === 0) {
      ue.error("Your cart is empty.");
      return;
    }
    const req = {
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        qty: BigInt(i.quantity),
        price: i.product.price
      }))
    };
    try {
      const order = await placeOrder.mutateAsync(req);
      clearCart();
      setConfirmedOrderId(order.orderId);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to place order. Please try again."
      );
    }
  };
  if (confirmedOrderId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderConfirmation, { orderId: confirmedOrderId }) }) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-24 text-center max-w-sm",
        "data-ocid": "checkout.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-4", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Add products to your cart before checking out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "gap-2 gradient-warm text-primary-foreground",
              "data-ocid": "checkout.browse_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                "Browse Products"
              ] })
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 py-10 max-w-5xl",
      "data-ocid": "checkout.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/cart",
              "data-ocid": "checkout.back_to_cart_link",
              className: "text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back to Cart"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Checkout" })
        ] }),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4",
            "data-ocid": "checkout.login_prompt",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Sign in to place your order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your order will be linked to your account for tracking" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoginButton, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "form",
          {
            onSubmit: handleSubmit(onSubmit),
            noValidate: true,
            "data-ocid": "checkout.form",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border bg-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Delivery Information" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customerName", children: "Full Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "customerName",
                          placeholder: "Jane Doe",
                          "data-ocid": "checkout.name_input",
                          ...register("customerName", {
                            required: "Full name is required"
                          }),
                          className: errors.customerName ? "border-destructive" : ""
                        }
                      ),
                      errors.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "checkout.name_field_error",
                          children: errors.customerName.message
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "email",
                            type: "email",
                            placeholder: "jane@example.com",
                            "data-ocid": "checkout.email_input",
                            ...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                              }
                            }),
                            className: errors.email ? "border-destructive" : ""
                          }
                        ),
                        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-destructive",
                            "data-ocid": "checkout.email_field_error",
                            children: errors.email.message
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "phone",
                            type: "tel",
                            placeholder: "+1 (555) 000-0000",
                            "data-ocid": "checkout.phone_input",
                            ...register("phone", {
                              required: "Phone number is required"
                            }),
                            className: errors.phone ? "border-destructive" : ""
                          }
                        ),
                        errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs text-destructive",
                            "data-ocid": "checkout.phone_field_error",
                            children: errors.phone.message
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Delivery Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          id: "address",
                          rows: 4,
                          placeholder: "123 Main St, Apt 4B\nNew York, NY 10001\nUnited States",
                          "data-ocid": "checkout.address_input",
                          ...register("address", {
                            required: "Delivery address is required"
                          }),
                          className: errors.address ? "border-destructive" : ""
                        }
                      ),
                      errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive",
                          "data-ocid": "checkout.address_field_error",
                          children: errors.address.message
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    size: "lg",
                    className: "w-full mt-5 gap-2 gradient-warm text-primary-foreground",
                    disabled: placeOrder.isPending || !isAuthenticated || items.length === 0,
                    "data-ocid": "checkout.place_order_button",
                    children: placeOrder.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Placing Order…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                      "Place Order — $",
                      cartTotal.toFixed(2)
                    ] })
                  }
                ),
                !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Sign in above to enable order placement" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", "data-ocid": "checkout.summary_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border bg-card sticky top-24", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base", children: [
                  "Your Order (",
                  items.length,
                  " ",
                  items.length === 1 ? "item" : "items",
                  ")"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-72 overflow-y-auto pr-1", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex gap-3",
                      "data-ocid": `checkout.order_item.${idx + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.product.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            "Qty: ",
                            item.quantity
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: [
                          "$",
                          (item.product.price * item.quantity).toFixed(2)
                        ] })
                      ]
                    },
                    item.product.id.toString()
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-xl text-primary", children: [
                      "$",
                      cartTotal.toFixed(2)
                    ] })
                  ] })
                ] })
              ] }) })
            ] })
          }
        )
      ]
    }
  ) });
}
export {
  CheckoutPage as default
};
