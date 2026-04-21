import { a as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, u as ue } from "./index-TdTOFd1p.js";
import { c as createLucideIcon, u as useCartStore, L as Layout, b as Separator, P as Package, a as Button, B as Badge, S as ShoppingCart } from "./Layout-B60ajjWB.js";
import { S as Skeleton } from "./skeleton-BmcWU5Z5.js";
import { a as useProduct, u as useProducts } from "./useProducts-DHaNDs8D.js";
import { i as isInStock } from "./types-B1n2TLCa.js";
import { A as ArrowLeft } from "./arrow-left-Dgpd_D6I.js";
import { m as motion } from "./proxy-DSFDdht4.js";
import { M as Minus } from "./minus-WYYcyhr-.js";
import { P as Plus } from "./plus-BbVAQHNe.js";
import { T as Truck } from "./truck-B7TsHJdX.js";
import "./backend-BfHBhA_X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function RelatedCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = isInStock(product);
  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    ue.success(`${product.name} added to cart`);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-smooth flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: product.imageUrl,
        alt: product.name,
        className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
        onError: (e) => {
          e.target.src = "/assets/images/placeholder.svg";
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground/30" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1", children: product.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm text-foreground line-clamp-2 flex-1 mb-2", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
          "$",
          product.price.toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-7 px-2 text-xs gap-1",
            onClick: handleAdd,
            disabled: !inStock,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3 w-3" }),
              "Add"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const { data: allProducts } = useProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = reactExports.useState(1);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 md:px-6 py-8 max-w-6xl",
        "data-ocid": "product_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48 mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 flex-1" })
              ] })
            ] })
          ] })
        ]
      }
    ) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-32 text-center",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 text-sm", children: "This product may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", "data-ocid": "product_detail.back_to_catalog_button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            "Back to Catalog"
          ] }) })
        ]
      }
    ) });
  }
  const inStock = isInStock(product);
  const related = (allProducts ?? []).filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  function handleAddToCart() {
    addItem(product, qty);
    ue.success(`${product.name} added to cart`, {
      description: `Quantity: ${qty}`
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container mx-auto px-4 md:px-6 py-8 max-w-6xl",
      "data-ocid": "product_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-8",
            "aria-label": "Breadcrumb",
            "data-ocid": "product_detail.breadcrumb",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  className: "hover:text-primary transition-colors duration-200",
                  "data-ocid": "product_detail.breadcrumb_home_link",
                  children: "Products"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: product.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: product.name })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 lg:gap-16 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -24 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, ease: "easeOut" },
              "data-ocid": "product_detail.image_section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-xl", children: [
                product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-full h-full object-cover",
                    onError: (e) => {
                      e.target.src = "/assets/images/placeholder.svg";
                    }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-24 w-24 text-muted-foreground/20" }) }),
                !inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "bg-card/90 text-muted-foreground font-semibold",
                    children: "Out of Stock"
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 24 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
              className: "flex flex-col gap-5",
              "data-ocid": "product_detail.info_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs uppercase tracking-wide font-semibold",
                      children: product.category
                    }
                  ),
                  inStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-accent/15 text-accent-foreground border-0 font-medium", children: "In Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs text-muted-foreground",
                      children: "Out of Stock"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-baseline gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-3xl text-primary", children: [
                  "$",
                  product.price.toFixed(2)
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.description_section", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 text-sm leading-relaxed", children: product.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                inStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 flex-wrap",
                    "data-ocid": "product_detail.add_to_cart_section",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center border border-input rounded-lg overflow-hidden",
                          "data-ocid": "product_detail.quantity_selector",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                className: "w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40",
                                onClick: () => setQty((q) => Math.max(1, q - 1)),
                                type: "button",
                                disabled: qty <= 1,
                                "aria-label": "Decrease quantity",
                                "data-ocid": "product_detail.qty_decrease_button",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-10 text-center text-sm font-semibold text-foreground",
                                "aria-live": "polite",
                                children: qty
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                className: "w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                                onClick: () => setQty((q) => q + 1),
                                type: "button",
                                "aria-label": "Increase quantity",
                                "data-ocid": "product_detail.qty_increase_button",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "lg",
                          onClick: handleAddToCart,
                          className: "flex-1 gap-2 font-semibold",
                          "data-ocid": "product_detail.add_to_cart_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
                            "Add to Cart"
                          ]
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-muted-foreground italic",
                    "data-ocid": "product_detail.out_of_stock_message",
                    children: "This product is currently unavailable. Check back soon."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fast courier delivery to your door" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure checkout & buyer protection" })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", "data-ocid": "product_detail.related_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground whitespace-nowrap", children: [
              "More in ",
              product.category
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                className: "text-sm text-primary hover:underline font-medium whitespace-nowrap",
                "data-ocid": "product_detail.view_all_link",
                children: "View all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08, duration: 0.35 },
              "data-ocid": `product_detail.related_card.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedCard, { product: p })
            },
            p.id.toString()
          )) })
        ] })
      ]
    }
  ) });
}
export {
  ProductDetailPage as default
};
