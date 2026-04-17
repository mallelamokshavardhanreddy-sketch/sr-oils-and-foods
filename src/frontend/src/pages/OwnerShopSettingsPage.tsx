import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LayoutDashboard, MapPin, Save, Settings, Store } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { ShopInfo } from "../backend.d";
import { useAuth } from "../hooks/useAuth";
import { useShopInfo } from "../hooks/useShopInfo";

interface FormValues {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  latitude: string;
  longitude: string;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="text-destructive text-xs mt-1"
      data-ocid="shop_settings.field_error"
    >
      {message}
    </p>
  );
}

export default function OwnerShopSettingsPage() {
  const { isAuthenticated, isOwner } = useAuth();
  const { data: shopInfo, isLoading } = useShopInfo();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (shopInfo) {
      reset({
        name: shopInfo.name,
        addressLine1: shopInfo.addressLine1,
        addressLine2: shopInfo.addressLine2 ?? "",
        city: shopInfo.city,
        state: shopInfo.state,
        pincode: shopInfo.pincode,
        phone: shopInfo.phone,
        latitude:
          shopInfo.latitude !== undefined && shopInfo.latitude !== null
            ? String(shopInfo.latitude)
            : "",
        longitude:
          shopInfo.longitude !== undefined && shopInfo.longitude !== null
            ? String(shopInfo.longitude)
            : "",
      });
    }
  }, [shopInfo, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!actor) {
      toast.error("Not connected to backend");
      return;
    }
    const info: ShopInfo = {
      name: values.name.trim(),
      addressLine1: values.addressLine1.trim(),
      addressLine2: values.addressLine2.trim() || undefined,
      city: values.city.trim(),
      state: values.state.trim(),
      pincode: values.pincode.trim(),
      phone: values.phone.trim(),
      latitude: values.latitude.trim() ? Number(values.latitude) : undefined,
      longitude: values.longitude.trim() ? Number(values.longitude) : undefined,
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).setShopInfo(info);
      await queryClient.invalidateQueries({ queryKey: ["shopInfo"] });
      toast.success("Shop settings saved successfully");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save settings",
      );
    }
  };

  if (!isAuthenticated || !isOwner) {
    return (
      <Layout>
        <div
          className="container mx-auto px-4 py-24 flex flex-col items-center text-center"
          data-ocid="shop_settings.unauthorized_state"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
            <Settings className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Owner Access Required
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign in with the owner account to manage shop settings.
          </p>
          <Button
            asChild
            variant="outline"
            data-ocid="shop_settings.go_home_button"
          >
            <Link to="/">Go to Store</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Shop Settings
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Manage your shop name, address, and location details
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link
              to="/owner/dashboard"
              data-ocid="shop_settings.dashboard_link"
            >
              <LayoutDashboard className="h-3.5 w-3.5 mr-1.5" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div
        className="container mx-auto px-4 py-8 max-w-2xl"
        data-ocid="shop_settings.page"
      >
        {isLoading ? (
          <div className="space-y-6" data-ocid="shop_settings.loading_state">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              {[1, 2].map((k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              {[1, 2, 3, 4].map((k) => (
                <div key={k} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            data-ocid="shop_settings.form"
          >
            {/* Shop Identity */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-5">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  Shop Identity
                </h2>
              </div>
              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="name">Shop Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., SRI RAJESWARI OILS AND FOODS"
                  {...register("name", { required: "Shop name is required" })}
                  data-ocid="shop_settings.name_input"
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., +91 98765 43210"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+\d\s\-()]{7,20}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  data-ocid="shop_settings.phone_input"
                />
                <FieldError message={errors.phone?.message} />
              </div>
            </div>

            {/* Address */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  Shop Address
                </h2>
              </div>
              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  placeholder="Door No., Street Name"
                  {...register("addressLine1", {
                    required: "Address line 1 is required",
                  })}
                  data-ocid="shop_settings.address_line1_input"
                />
                <FieldError message={errors.addressLine1?.message} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="addressLine2">
                  Address Line 2{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="addressLine2"
                  placeholder="Landmark, Area"
                  {...register("addressLine2")}
                  data-ocid="shop_settings.address_line2_input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Nellore"
                    {...register("city", { required: "City is required" })}
                    data-ocid="shop_settings.city_input"
                  />
                  <FieldError message={errors.city?.message} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="e.g., Andhra Pradesh"
                    {...register("state", { required: "State is required" })}
                    data-ocid="shop_settings.state_input"
                  />
                  <FieldError message={errors.state?.message} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  placeholder="e.g., 524001"
                  {...register("pincode", {
                    required: "PIN code is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "Enter a valid 6-digit PIN code",
                    },
                  })}
                  data-ocid="shop_settings.pincode_input"
                />
                <FieldError message={errors.pincode?.message} />
              </div>
            </div>

            {/* Map Coordinates */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <h2 className="font-display font-semibold text-foreground">
                  Map Coordinates
                </h2>
                <span className="text-muted-foreground text-xs ml-1">
                  (optional)
                </span>
              </div>
              <Separator />

              <p className="text-sm text-muted-foreground">
                Enter GPS coordinates to show a map pin on the Shop Address
                page. Right-click your location on{" "}
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Maps
                </a>{" "}
                to copy the coordinates.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 14.4426"
                    {...register("latitude", {
                      validate: (v) => {
                        if (!v.trim()) return true;
                        const n = Number(v);
                        if (Number.isNaN(n)) return "Must be a number";
                        if (n < -90 || n > 90)
                          return "Must be between -90 and 90";
                        return true;
                      },
                    })}
                    data-ocid="shop_settings.latitude_input"
                  />
                  <FieldError message={errors.latitude?.message} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g., 79.9865"
                    {...register("longitude", {
                      validate: (v) => {
                        if (!v.trim()) return true;
                        const n = Number(v);
                        if (Number.isNaN(n)) return "Must be a number";
                        if (n < -180 || n > 180)
                          return "Must be between -180 and 180";
                        return true;
                      },
                    })}
                    data-ocid="shop_settings.longitude_input"
                  />
                  <FieldError message={errors.longitude?.message} />
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end pb-4">
              <Button
                type="submit"
                disabled={isSubmitting || !actor}
                className="gradient-warm text-primary-foreground px-8"
                data-ocid="shop_settings.save_button"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving…" : "Save Settings"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
