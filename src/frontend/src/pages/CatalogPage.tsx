import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Droplets, Package, Search, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/cart";
import type { Product, SortBy } from "../types";
import { isInStock } from "../types";

const CATEGORIES = [
  "All",
  "Coconut Oil",
  "Groundnut Oil",
  "Sesame Oil",
  "Castor Oil",
  "Ghee & Foods",
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "priceAsc" },
  { label: "Price: High → Low", value: "priceDesc" },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Cold-Pressed Coconut Oil (500ml)",
    description:
      "Extracted from fresh coconuts using traditional wooden press. Rich in lauric acid — ideal for cooking, hair care, and skin nourishment.",
    price: 320.0,
    category: "Coconut Oil",
    imageUrl: "/assets/generated/product-coconut-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
  {
    id: 2n,
    name: "Wood-Pressed Groundnut Oil (1 Litre)",
    description:
      "Stone-mill extracted groundnut oil with full natural aroma. Zero refining, zero chemicals — just pure pressed goodness for everyday cooking.",
    price: 280.0,
    category: "Groundnut Oil",
    imageUrl: "/assets/generated/product-groundnut-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
  {
    id: 3n,
    name: "Cold-Pressed Sesame Oil (250ml)",
    description:
      "Traditional til oil pressed from hand-cleaned sesame seeds. Deep golden colour, nutty aroma — perfect for tempering and Ayurvedic use.",
    price: 220.0,
    category: "Sesame Oil",
    imageUrl: "/assets/generated/product-sesame-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
  {
    id: 4n,
    name: "Pure Castor Oil (200ml)",
    description:
      "Cold-pressed from organically grown castor seeds. Thick, potent, and unrefined — prized for hair growth and skin healing rituals.",
    price: 180.0,
    category: "Castor Oil",
    imageUrl: "/assets/generated/product-castor-oil.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
  {
    id: 5n,
    name: "Wood-Pressed Coconut Oil (1 Litre)",
    description:
      "Larger family pack of our signature cold-pressed coconut oil. Mild natural fragrance, high smoke point — versatile for both kitchen and wellness.",
    price: 580.0,
    category: "Coconut Oil",
    imageUrl: "/assets/generated/product-coconut-oil-1l.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
  {
    id: 6n,
    name: "A2 Bilona Ghee (500ml)",
    description:
      "Hand-churned from A2 desi cow milk using the ancient bilona method. Golden, grainy, aromatic — a purity you can taste in every spoonful.",
    price: 850.0,
    category: "Ghee & Foods",
    imageUrl: "/assets/generated/product-bilona-ghee.dim_800x800.jpg",
    stock: { available: null },
    createdAt: BigInt(Date.now()),
  },
];

function sortKeyToSortBy(key: string): SortBy | undefined {
  if (key === "priceAsc") return { priceAsc: null };
  if (key === "priceDesc") return { priceDesc: null };
  if (key === "newest") return { newest: null };
  return undefined;
}

function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="w-full aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = isInStock(product);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`, {
      description: "Ready to checkout whenever you are.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      data-ocid={`catalog.product_card.item.${index + 1}`}
    >
      <Link to="/product/$id" params={{ id: product.id.toString() }}>
        <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-smooth hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full flex flex-col">
          <div className="relative overflow-hidden aspect-square bg-muted">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Package className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-sm font-semibold text-muted-foreground bg-card/90 px-3 py-1 rounded-full border border-border">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="p-4 flex flex-col flex-1 gap-2">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="text-xs font-medium uppercase tracking-wide"
              >
                {product.category}
              </Badge>
              {inStock ? (
                <Badge className="text-xs bg-accent/15 text-accent-foreground border-0">
                  In Stock
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  Sold Out
                </Badge>
              )}
            </div>

            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            <p className="text-muted-foreground text-xs line-clamp-2 flex-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2 mt-auto">
              <span className="font-display font-bold text-lg text-foreground">
                ₹{product.price.toFixed(0)}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="gap-1.5 font-semibold"
                data-ocid={`catalog.add_to_cart_button.${index + 1}`}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("newest");

  const { data: backendProducts, isLoading } = useProducts({
    category: activeCategory !== "All" ? activeCategory : undefined,
    search: search || undefined,
    sortBy: sortKeyToSortBy(sortKey),
  });

  const allProducts = useMemo(
    () =>
      backendProducts && backendProducts.length > 0
        ? backendProducts
        : SAMPLE_PRODUCTS,
    [backendProducts],
  );

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, activeCategory, search]);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        data-ocid="catalog.hero_section"
      >
        <div className="relative h-72 md:h-96 w-full">
          <img
            src="/assets/generated/catalog-hero-coldpress.dim_1400x500.jpg"
            alt="Traditional cold press oil extraction"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/catalog-hero.dim_1400x500.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-lg"
              >
                <Badge className="mb-3 bg-primary/15 text-primary border-0 font-medium text-xs tracking-widest uppercase">
                  Traditional Cold Press
                </Badge>
                <h1 className="font-display font-bold text-3xl md:text-5xl text-primary leading-tight mb-3">
                  Purity of Tradition in{" "}
                  <span className="text-primary italic">Every Drop</span>
                </h1>
                <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">
                  Cold-pressed using ancient wooden chakku machines. No heat, no
                  chemicals — just nature's goodness delivered to your door.
                </p>
                <Button
                  size="lg"
                  className="font-semibold gap-2 shadow-md gradient-earthy text-primary-foreground border-0"
                  onClick={() =>
                    document
                      .getElementById("products-grid")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="catalog.hero_shop_cta"
                >
                  <Droplets className="h-4 w-4" />
                  Explore Our Oils
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-primary/8 border-y border-primary/15 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/70 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span> No Chemicals or
              Preservatives
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span> Traditional Wooden Press
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span> Single-Origin Seeds
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span> Fast Courier Delivery
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Filters */}
      <section
        className="bg-card border-b border-border sticky top-16 z-30"
        data-ocid="catalog.filters_section"
      >
        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search oils & foods…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-background"
                data-ocid="catalog.search_input"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-ocid={`catalog.category_filter.${cat
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(/[^a-z0-9_]/g, "")}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-smooth border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}

              <Select value={sortKey} onValueChange={setSortKey}>
                <SelectTrigger
                  className="h-8 w-40 text-xs bg-background"
                  data-ocid="catalog.sort_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section
        id="products-grid"
        className="bg-background py-10"
        data-ocid="catalog.products_section"
      >
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="catalog.loading_state"
            >
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
                (k) => (
                  <ProductCardSkeleton key={k} />
                ),
              )}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="catalog.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
                <Package className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                Try adjusting your search or filters to discover more oils and
                foods.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setSortKey("newest");
                }}
                data-ocid="catalog.empty_state_reset_button"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground text-sm">
                  <span className="font-semibold text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                  {activeCategory !== "All" && (
                    <span className="text-primary font-medium">
                      {" "}
                      in {activeCategory}
                    </span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id.toString()}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
