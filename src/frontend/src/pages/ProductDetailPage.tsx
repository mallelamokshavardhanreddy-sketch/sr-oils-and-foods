import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/cart";
import type { Product } from "../types";
import { isInStock } from "../types";

function RelatedCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = isInStock(product);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <Link to="/product/$id" params={{ id: product.id.toString() }}>
      <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-smooth flex flex-col h-full">
        <div className="aspect-square bg-muted overflow-hidden">
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
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-10 w-10 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col flex-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h4 className="font-display font-semibold text-sm text-foreground line-clamp-2 flex-1 mb-2">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs gap-1"
              onClick={handleAdd}
              disabled={!inStock}
            >
              <ShoppingCart className="h-3 w-3" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useProduct(productId);
  const { data: allProducts } = useProducts();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 md:px-6 py-8 max-w-6xl"
          data-ocid="product_detail.loading_state"
        >
          <Skeleton className="h-5 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Separator />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div
          className="flex flex-col items-center justify-center py-32 text-center"
          data-ocid="product_detail.error_state"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
            <Package className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Product not found
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            This product may have been removed or the link is invalid.
          </p>
          <Button asChild>
            <Link to="/" data-ocid="product_detail.back_to_catalog_button">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const inStock = isInStock(product);

  const related = (allProducts ?? [])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addItem(product!, qty);
    toast.success(`${product!.name} added to cart`, {
      description: `Quantity: ${qty}`,
    });
  }

  return (
    <Layout>
      <div
        className="container mx-auto px-4 md:px-6 py-8 max-w-6xl"
        data-ocid="product_detail.page"
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
          data-ocid="product_detail.breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-200"
            data-ocid="product_detail.breadcrumb_home_link"
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-muted-foreground/60">{product.category}</span>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            data-ocid="product_detail.image_section"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-xl">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground/20" />
                </div>
              )}
              {!inStock && (
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="outline"
                    className="bg-card/90 text-muted-foreground font-semibold"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-5"
            data-ocid="product_detail.info_section"
          >
            {/* Category & stock badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="text-xs uppercase tracking-wide font-semibold"
              >
                {product.category}
              </Badge>
              {inStock ? (
                <Badge className="text-xs bg-accent/15 text-accent-foreground border-0 font-medium">
                  In Stock
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <Separator />

            {/* Description */}
            <div data-ocid="product_detail.description_section">
              <h3 className="font-display font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity + Add to Cart */}
            {inStock ? (
              <div
                className="flex items-center gap-3 flex-wrap"
                data-ocid="product_detail.add_to_cart_section"
              >
                <div
                  className="flex items-center border border-input rounded-lg overflow-hidden"
                  data-ocid="product_detail.quantity_selector"
                >
                  <button
                    className="w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    type="button"
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                    data-ocid="product_detail.qty_decrease_button"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span
                    className="w-10 text-center text-sm font-semibold text-foreground"
                    aria-live="polite"
                  >
                    {qty}
                  </span>
                  <button
                    className="w-9 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setQty((q) => q + 1)}
                    type="button"
                    aria-label="Increase quantity"
                    data-ocid="product_detail.qty_increase_button"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 gap-2 font-semibold"
                  data-ocid="product_detail.add_to_cart_button"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            ) : (
              <p
                className="text-sm text-muted-foreground italic"
                data-ocid="product_detail.out_of_stock_message"
              >
                This product is currently unavailable. Check back soon.
              </p>
            )}

            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5">
                <Truck className="h-4 w-4 text-primary shrink-0" />
                <span>Fast courier delivery to your door</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2.5">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>Secure checkout &amp; buyer protection</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16" data-ocid="product_detail.related_section">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display font-bold text-xl text-foreground whitespace-nowrap">
                More in {product.category}
              </h2>
              <Separator className="flex-1" />
              <Link
                to="/"
                className="text-sm text-primary hover:underline font-medium whitespace-nowrap"
                data-ocid="product_detail.view_all_link"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <motion.div
                  key={p.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35 }}
                  data-ocid={`product_detail.related_card.item.${i + 1}`}
                >
                  <RelatedCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
