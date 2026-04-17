import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import {
  type ProductFormData,
  useAddProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../hooks/useProductMutations";
import { useProducts } from "../hooks/useProducts";
import { isInStock } from "../types";
import type { Product } from "../types";

interface FormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  stock: "available" | "outOfStock";
}

function ProductFormDialog({
  open,
  onClose,
  editingProduct,
}: {
  open: boolean;
  onClose: () => void;
  editingProduct: Product | null;
}) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const isEdit = !!editingProduct;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: editingProduct
      ? {
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price.toString(),
          category: editingProduct.category,
          imageUrl: editingProduct.imageUrl,
          stock: isInStock(editingProduct) ? "available" : "outOfStock",
        }
      : { stock: "available" },
  });

  const isPending = addProduct.isPending || updateProduct.isPending;

  const onSubmit = async (values: FormValues) => {
    const data: ProductFormData = {
      name: values.name,
      description: values.description,
      price: Number.parseFloat(values.price),
      category: values.category,
      imageUrl: values.imageUrl,
      stock: values.stock,
    };
    try {
      if (isEdit && editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, ...data });
        toast.success("Product updated successfully");
      } else {
        await addProduct.mutateAsync(data);
        toast.success("Product added successfully");
      }
      reset();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          reset();
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-w-md"
        data-ocid={
          isEdit
            ? "owner_products.edit_product_dialog"
            : "owner_products.add_product_dialog"
        }
      >
        <DialogHeader>
          <DialogTitle className="font-display">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-1"
          data-ocid="owner_products.product_form"
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g., Premium Leather Wallet"
              {...register("name", { required: "Name is required" })}
              data-ocid="owner_products.name_input"
            />
            {errors.name && (
              <p
                className="text-destructive text-xs"
                data-ocid="owner_products.name_field_error"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={2}
              placeholder="Short product description"
              {...register("description", {
                required: "Description is required",
              })}
              data-ocid="owner_products.description_input"
            />
            {errors.description && (
              <p className="text-destructive text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register("price", {
                  required: "Required",
                  min: { value: 0, message: "Must be ≥ 0" },
                })}
                data-ocid="owner_products.price_input"
              />
              {errors.price && (
                <p className="text-destructive text-xs">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Tech, Home"
                {...register("category", { required: "Required" })}
                data-ocid="owner_products.category_input"
              />
              {errors.category && (
                <p className="text-destructive text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              placeholder="https://... or /assets/images/..."
              {...register("imageUrl", { required: "Image URL is required" })}
              data-ocid="owner_products.image_url_input"
            />
            {errors.imageUrl && (
              <p className="text-destructive text-xs">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Stock Status</Label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger data-ocid="owner_products.stock_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">In Stock</SelectItem>
                    <SelectItem value="outOfStock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Separator />
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
              data-ocid="owner_products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="gradient-warm text-primary-foreground"
              data-ocid="owner_products.submit_button"
            >
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                  ? "Save Changes"
                  : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProductRow({
  product,
  index,
  onEdit,
}: {
  product: Product;
  index: number;
  onEdit: (p: Product) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct();
  const inStock = isInStock(product);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setConfirmDelete(false);
    }
  };

  return (
    <>
      <div
        className="bg-card rounded-xl border border-border p-4 flex gap-4 items-center hover:shadow-sm transition-smooth"
        data-ocid={`owner_products.product_row.${index}`}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="font-semibold text-foreground truncate">
              {product.name}
            </span>
            <Badge variant="outline" className="text-xs shrink-0">
              {product.category}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs shrink-0 ${inStock ? "border-primary/30 text-primary bg-primary/10" : "text-muted-foreground"}`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-display font-bold text-lg text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => onEdit(product)}
              data-ocid={`owner_products.edit_button.${index}`}
              aria-label="Edit product"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => setConfirmDelete(true)}
              disabled={isPending}
              data-ocid={`owner_products.delete_button.${index}`}
              aria-label="Delete product"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent data-ocid="owner_products.delete_confirm_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>"{product.name}"</strong>{" "}
              from your catalog. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="owner_products.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="owner_products.delete_confirm_button"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function OwnerProductsPage() {
  const { isAuthenticated, isOwner } = useAuth();
  const { data: products = [], isLoading } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
  };

  if (!isAuthenticated || !isOwner) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-24 flex flex-col items-center text-center"
          data-ocid="owner_products.unauthorized_state"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
            <LayoutDashboard className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Owner Access Required
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign in with the owner account to manage products.
          </p>
          <Button
            asChild
            variant="outline"
            data-ocid="owner_products.go_home_button"
          >
            <Link to="/">Go to Store</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Manage Products
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {products.length} products in catalog
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link
                to="/owner/dashboard"
                data-ocid="owner_products.dashboard_link"
              >
                <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
                Dashboard
              </Link>
            </Button>
            <Button
              onClick={openAdd}
              size="sm"
              className="gradient-warm text-primary-foreground"
              data-ocid="owner_products.add_product_button"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto px-4 py-8"
        data-ocid="owner_products.page"
      >
        {isLoading ? (
          <div className="space-y-3" data-ocid="owner_products.loading_state">
            {[1, 2, 3, 4].map((k) => (
              <div
                key={k}
                className="bg-card rounded-xl border border-border p-4 flex gap-4 items-center"
              >
                <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div
            className="flex flex-col items-center py-20 text-center"
            data-ocid="owner_products.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-5">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your first product to start selling
            </p>
            <Button
              onClick={openAdd}
              className="gradient-warm text-primary-foreground"
              data-ocid="owner_products.empty_add_button"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add First Product
            </Button>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="owner_products.product_list">
            {products.map((product: Product, idx: number) => (
              <ProductRow
                key={product.id.toString()}
                product={product}
                index={idx + 1}
                onEdit={openEdit}
              />
            ))}
          </div>
        )}
      </div>

      <ProductFormDialog
        open={dialogOpen}
        onClose={closeDialog}
        editingProduct={editingProduct}
      />
    </Layout>
  );
}
