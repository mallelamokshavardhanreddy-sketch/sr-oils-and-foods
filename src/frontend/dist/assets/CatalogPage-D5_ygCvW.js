import { r as reactExports, j as jsxRuntimeExports, L as Link, u as ue } from "./index-TdTOFd1p.js";
import { c as createLucideIcon, L as Layout, B as Badge, a as Button, P as Package, u as useCartStore, S as ShoppingCart } from "./Layout-B60ajjWB.js";
import { I as Input } from "./input-DSCXMNhO.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BwuLOSmt.js";
import { S as Skeleton } from "./skeleton-BmcWU5Z5.js";
import { u as useProducts } from "./useProducts-DHaNDs8D.js";
import { i as isInStock } from "./types-B1n2TLCa.js";
import { m as motion } from "./proxy-DSFDdht4.js";
import "./chevron-up-Df-6XxHy.js";
import "./backend-BfHBhA_X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const CATEGORIES = [
  "All",
  "Coconut Oil",
  "Groundnut Oil",
  "Sesame Oil",
  "Castor Oil",
  "Ghee & Foods"
];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "priceAsc" },
  { label: "Price: High → Low", value: "priceDesc" }
];
const SAMPLE_PRODUCTS = [
  {
    id: 1n,
    name: "Cold-Pressed Coconut Oil (500ml)",
    description: "Extracted from fresh coconuts using traditional wooden press. Rich in lauric acid — ideal for cooking, hair care, and skin nourishment.",
    price: 320,
    category: "Coconut Oil",
    imageUrl: "/assets/generated/product-coconut-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 2n,
    name: "Wood-Pressed Groundnut Oil (1 Litre)",
    description: "Stone-mill extracted groundnut oil with full natural aroma. Zero refining, zero chemicals — just pure pressed goodness for everyday cooking.",
    price: 280,
    category: "Groundnut Oil",
    imageUrl: "/assets/generated/product-groundnut-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 3n,
    name: "Cold-Pressed Sesame Oil (250ml)",
    description: "Traditional til oil pressed from hand-cleaned sesame seeds. Deep golden colour, nutty aroma — perfect for tempering and Ayurvedic use.",
    price: 220,
    category: "Sesame Oil",
    imageUrl: "/assets/generated/product-sesame-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 4n,
    name: "Pure Castor Oil (200ml)",
    description: "Cold-pressed from organically grown castor seeds. Thick, potent, and unrefined — prized for hair growth and skin healing rituals.",
    price: 180,
    category: "Castor Oil",
    imageUrl: "/assets/generated/product-castor-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 5n,
    name: "Wood-Pressed Coconut Oil (1 Litre)",
    description: "Larger family pack of our signature cold-pressed coconut oil. Mild natural fragrance, high smoke point — versatile for both kitchen and wellness.",
    price: 580,
    category: "Coconut Oil",
    imageUrl: "/assets/generated/product-coconut-oil-1l.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 6n,
    name: "A2 Bilona Ghee (500ml)",
    description: "Hand-churned from A2 desi cow milk using the ancient bilona method. Golden, grainy, aromatic — a purity you can taste in every spoonful.",
    price: 850,
    category: "Ghee & Foods",
    imageUrl: "/assets/generated/product-bilona-ghee.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  }
];
function sortKeyToSortBy(key) {
  if (key === "priceAsc") return { priceAsc: null };
  if (key === "priceDesc") return { priceDesc: null };
  if (key === "newest") return { newest: null };
  return void 0;
}
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl overflow-hidden border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-square" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28" })
      ] })
    ] })
  ] });
}
function ProductCard({ product, index }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = isInStock(product);
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    ue.success(`${product.name} added to cart`, {
      description: "Ready to checkout whenever you are."
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.07, ease: "easeOut" },
      "data-ocid": `catalog.product_card.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-smooth hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-square bg-muted", children: [
          product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 text-muted-foreground/30" }) }),
          !inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground bg-card/90 px-3 py-1 rounded-full border border-border", children: "Out of Stock" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs font-medium uppercase tracking-wide",
                children: product.category
              }
            ),
            inStock ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-accent/15 text-accent-foreground border-0", children: "In Stock" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs text-muted-foreground",
                children: "Sold Out"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-h-[2.5rem]", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs line-clamp-2 flex-1", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground", children: [
              "₹",
              product.price.toFixed(0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleAddToCart,
                disabled: !inStock,
                className: "gap-1.5 font-semibold",
                "data-ocid": `catalog.add_to_cart_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                  "Add to Cart"
                ]
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}
function CatalogPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [sortKey, setSortKey] = reactExports.useState("newest");
  const { data: backendProducts, isLoading } = useProducts({
    category: activeCategory !== "All" ? activeCategory : void 0,
    search: search || void 0,
    sortBy: sortKeyToSortBy(sortKey)
  });
  const allProducts = reactExports.useMemo(
    () => backendProducts && backendProducts.length > 0 ? backendProducts : SAMPLE_PRODUCTS,
    [backendProducts]
  );
  const filteredProducts = reactExports.useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, activeCategory, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "relative overflow-hidden",
        "data-ocid": "catalog.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-72 md:h-96 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/catalog-hero-coldpress.dim_1400x500.jpg",
              alt: "Traditional cold press oil extraction",
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "/assets/generated/catalog-hero.dim_1400x500.jpg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -32 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              className: "max-w-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/15 text-primary border-0 font-medium text-xs tracking-widest uppercase", children: "Traditional Cold Press" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl md:text-5xl text-primary leading-tight mb-3", children: [
                  "Purity of Tradition in",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Every Drop" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base mb-5 leading-relaxed", children: "Cold-pressed using ancient wooden chakku machines. No heat, no chemicals — just nature's goodness delivered to your door." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "font-semibold gap-2 shadow-md gradient-earthy text-primary-foreground border-0",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("products-grid")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    "data-ocid": "catalog.hero_shop_cta",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4" }),
                      "Explore Our Oils"
                    ]
                  }
                )
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary/8 border-y border-primary/15 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/70 font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✦" }),
        " No Chemicals or Preservatives"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✦" }),
        " Traditional Wooden Press"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✦" }),
        " Single-Origin Seeds"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✦" }),
        " Fast Courier Delivery"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border sticky top-16 z-30",
        "data-ocid": "catalog.filters_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search oils & foods…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 h-9 text-sm bg-background",
                "data-ocid": "catalog.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveCategory(cat),
                "data-ocid": `catalog.category_filter.${cat.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")}`,
                className: `px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
                children: cat
              },
              cat
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortKey, onValueChange: setSortKey, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 w-40 text-xs bg-background",
                  "data-ocid": "catalog.sort_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectItem,
                {
                  value: opt.value,
                  className: "text-xs",
                  children: opt.label
                },
                opt.value
              )) })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "products-grid",
        className: "bg-background py-10",
        "data-ocid": "catalog.products_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            "data-ocid": "catalog.loading_state",
            children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
              (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, k)
            )
          }
        ) : filteredProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-24 text-center",
            "data-ocid": "catalog.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 text-muted-foreground/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No products found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: "Try adjusting your search or filters to discover more oils and foods." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    setSearch("");
                    setActiveCategory("All");
                    setSortKey("newest");
                  },
                  "data-ocid": "catalog.empty_state_reset_button",
                  children: "Clear filters"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filteredProducts.length }),
            " ",
            "products",
            activeCategory !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium", children: [
              " ",
              "in ",
              activeCategory
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index
            },
            product.id.toString()
          )) })
        ] }) })
      }
    )
  ] });
}
export {
  CatalogPage as default
};
