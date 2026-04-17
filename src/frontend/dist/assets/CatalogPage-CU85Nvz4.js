import { r as reactExports, j as jsxRuntimeExports, L as Link, u as ue } from "./index-B_8bstpq.js";
import { c as createLucideIcon, L as Layout, B as Badge, a as Button, S as ShoppingCart, P as Package, u as useCartStore } from "./Layout-D2y_KZ98.js";
import { I as Input } from "./input-D0V40lDJ.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-COcd6qmA.js";
import { S as Skeleton } from "./skeleton-JkftrCUH.js";
import { u as useProducts } from "./useProducts-CbIQEnle.js";
import { i as isInStock } from "./types-B1n2TLCa.js";
import { m as motion } from "./proxy-b6Qju_EA.js";
import "./chevron-up-DimjsCjy.js";
import "./backend-DY3afAjs.js";
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
const CATEGORIES = ["All", "Tech", "Home", "Accessories", "Fashion", "Audio"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "priceAsc" },
  { label: "Price: High → Low", value: "priceDesc" }
];
const SAMPLE_PRODUCTS = [
  {
    id: 1n,
    name: "Aero Sound Noise-Cancelling Headphones",
    description: "Premium wireless headphones with industry-leading active noise cancellation and 30-hour battery life.",
    price: 349.99,
    category: "Tech",
    imageUrl: "/assets/generated/product-headphones.dim_800x600.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 2n,
    name: "Velvet Tote Bag",
    description: 'Hand-crafted cognac leather tote with suede interior lining. Fits 15" laptop with room to spare.',
    price: 199.99,
    category: "Accessories",
    imageUrl: "/assets/generated/product-tote-bag.dim_800x600.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 3n,
    name: "Smart Home Hub",
    description: "Control all your smart home devices from one elegant anthracite hub. Compatible with 10,000+ devices.",
    price: 299.99,
    category: "Tech",
    imageUrl: "/assets/generated/product-smarthub.dim_800x600.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 4n,
    name: "Serene Linen Throw",
    description: "Hand-woven sage green linen throw blanket. 100% natural fibers, perfect for cozy evenings.",
    price: 75,
    category: "Home",
    imageUrl: "/assets/generated/product-linen-throw.dim_800x600.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 5n,
    name: "Obsidian Smartwatch",
    description: "Fitness-focused smartwatch with GPS, health monitoring, and 7-day battery. Water resistant to 50m.",
    price: 499.99,
    category: "Tech",
    imageUrl: "/assets/generated/product-smartwatch.dim_800x600.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now())
  },
  {
    id: 6n,
    name: "Artisan Ceramic Vase Set",
    description: "Set of 2 handcrafted ceramic vases in warm off-white. Each piece is unique — signed by the artisan.",
    price: 120,
    category: "Home",
    imageUrl: "/assets/generated/product-ceramic-vase.dim_800x600.jpg",
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
              "$",
              product.price.toFixed(2)
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
              src: "/assets/generated/catalog-hero.dim_1400x500.jpg",
              alt: "Premium product collection",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-6 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -32 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              className: "max-w-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-3 bg-primary/15 text-primary border-0 font-medium text-xs tracking-widest uppercase", children: "New Collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl md:text-5xl text-foreground leading-tight mb-3", children: [
                  "Curated for ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Exceptional" }),
                  " ",
                  "Living"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base mb-5 leading-relaxed", children: "Handpicked products blending form, function, and lasting craftsmanship — delivered to your door." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "font-semibold gap-2 shadow-md",
                    onClick: () => {
                      var _a;
                      return (_a = document.getElementById("products-grid")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                    },
                    "data-ocid": "catalog.hero_shop_cta",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }),
                      "Shop Now"
                    ]
                  }
                )
              ]
            }
          ) }) })
        ] })
      }
    ),
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
                placeholder: "Search products…",
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
                "data-ocid": `catalog.category_filter.${cat.toLowerCase()}`,
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mb-6", children: "Try adjusting your search or filters to discover more products." }),
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
