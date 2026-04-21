import { j as jsxRuntimeExports, L as Link, r as reactExports } from "./index-TdTOFd1p.js";
import { d as useAuth, L as Layout, C as ClipboardList, e as LoginButton, P as Package, a as Button, B as Badge, b as Separator } from "./Layout-B60ajjWB.js";
import { C as Card, a as CardContent } from "./card-joc-nRTW.js";
import { S as Skeleton } from "./skeleton-BmcWU5Z5.js";
import { a as useMyOrders } from "./useOrders-CpVX8MlG.js";
import { g as getOrderStatusLabel } from "./types-B1n2TLCa.js";
import { A as ArrowRight } from "./arrow-right-DQKTxlyr.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-Df-6XxHy.js";
import "./backend-BfHBhA_X.js";
import "./useMutation-Dok9jKnt.js";
const STATUS_STYLES = {
  Pending: "bg-muted text-muted-foreground border-border",
  Confirmed: "bg-primary/10 text-primary border-primary/30",
  Packed: "bg-accent/15 text-accent-foreground border-accent/30",
  Shipped: "bg-chart-5/10 text-foreground border-chart-5/30",
  Delivered: "bg-chart-2/10 text-foreground border-chart-2/30"
};
function getStatusStyle(status) {
  return STATUS_STYLES[getOrderStatusLabel(status)] ?? "bg-muted text-muted-foreground border-border";
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function OrderCard({ order, index }) {
  var _a;
  const [expanded, setExpanded] = reactExports.useState(false);
  const statusLabel = getOrderStatusLabel(order.status);
  const statusStyle = getStatusStyle(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border border-border bg-card hover:border-primary/20 transition-colors duration-200",
      "data-ocid": `orders.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-foreground text-sm", children: [
                "#",
                order.orderId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs border ${statusStyle}`,
                  "data-ocid": `orders.status_badge.${index}`,
                  children: statusLabel
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(order.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-primary", children: [
              "$",
              order.totalPrice.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5 text-muted-foreground flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground truncate", children: order.items.length === 1 ? ((_a = order.items[0]) == null ? void 0 : _a.name) ?? "1 item" : `${order.items.length} items — ${order.items.slice(0, 2).map((i) => i.name).join(", ")}${order.items.length > 2 ? "…" : ""}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "mt-3 gap-1.5 text-muted-foreground hover:text-foreground px-0 h-auto text-xs",
            onClick: () => setExpanded(!expanded),
            "data-ocid": `orders.expand_button.${index}`,
            "aria-expanded": expanded,
            children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }),
              "Hide details"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }),
              "View details"
            ] })
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `orders.details.${index}`, className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between items-center text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-2 text-xs", children: [
                    "×",
                    item.qty.toString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground flex-shrink-0 ml-4", children: [
                  "$",
                  (item.price * Number(item.qty)).toFixed(2)
                ] })
              ]
            },
            item.productId.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-3 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Deliver to: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium break-words", children: order.address })
          ] })
        ] })
      ] })
    }
  );
}
function OrdersSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "orders.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56 mt-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28 mt-3" })
  ] }) }, i)) });
}
function OrderHistoryPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const { data: orders, isLoading } = useMyOrders();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track and review all your past purchases" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-8 max-w-3xl",
        "data-ocid": "orders.page",
        children: [
          !isInitializing && !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 gap-6 text-center",
              "data-ocid": "orders.login_prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-10 w-10 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Sign in to view your orders" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "Your order history is tied to your account. Sign in with Internet Identity to see your past purchases." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoginButton, {})
              ]
            }
          ),
          (isInitializing || isAuthenticated && isLoading) && /* @__PURE__ */ jsxRuntimeExports.jsx(OrdersSkeleton, {}),
          !isInitializing && isAuthenticated && !isLoading && (!orders || orders.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 gap-6 text-center",
              "data-ocid": "orders.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "No orders yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "You haven't placed any orders. Start exploring our products and make your first purchase!" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "gap-2 gradient-warm text-primary-foreground",
                    "data-ocid": "orders.browse_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                      "Browse Products ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                    ] })
                  }
                )
              ]
            }
          ),
          !isInitializing && isAuthenticated && !isLoading && orders && orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "orders.list", children: orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            OrderCard,
            {
              order,
              index: idx + 1
            },
            order.orderId.toString()
          )) })
        ]
      }
    )
  ] });
}
export {
  OrderHistoryPage as default
};
