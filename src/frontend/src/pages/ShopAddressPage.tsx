import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Navigation, Phone, Store } from "lucide-react";
import { Layout } from "../components/Layout";
import { useShopInfo } from "../hooks/useShopInfo";

function StaticMap({
  lat,
  lng,
  name,
}: { lat: number; lng: number; name: string }) {
  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=600x300&markers=${lat},${lng},red-pushpin`;

  return (
    <div className="rounded-xl overflow-hidden border border-border surface-elevated">
      <img
        src={mapUrl}
        alt={`Map showing location of ${name}`}
        className="w-full h-64 object-cover"
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className="hidden h-64 w-full items-center justify-center bg-muted text-muted-foreground flex-col gap-2"
        aria-hidden="true"
      >
        <Navigation className="w-8 h-8 opacity-40" />
        <span className="text-sm">Map unavailable</span>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ShopAddressPage() {
  const { data: shopInfo, isLoading } = useShopInfo();

  return (
    <Layout>
      <div className="min-h-[60vh] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Page header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Find Us
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Shop Address
            </h1>
            <p className="text-muted-foreground">
              Visit us in person or get in touch
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div data-ocid="shop-address.loading_state">
              <LoadingSkeleton />
            </div>
          )}

          {/* No shop info configured */}
          {!isLoading && !shopInfo && (
            <div
              data-ocid="shop-address.empty_state"
              className="text-center py-16 px-8 rounded-2xl bg-muted/40 border border-border"
            >
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Address Not Configured
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Shop address has not been configured yet. Please check back
                later.
              </p>
            </div>
          )}

          {/* Shop info card */}
          {!isLoading && shopInfo && (
            <div data-ocid="shop-address.card" className="space-y-6">
              {/* Map section */}
              {shopInfo.latitude != null && shopInfo.longitude != null ? (
                <StaticMap
                  lat={shopInfo.latitude}
                  lng={shopInfo.longitude}
                  name={shopInfo.name}
                />
              ) : (
                <div
                  data-ocid="shop-address.map-unavailable"
                  className="flex items-center justify-center h-48 rounded-xl bg-muted/40 border border-dashed border-border text-muted-foreground gap-3"
                >
                  <Navigation className="w-5 h-5 opacity-50" />
                  <span className="text-sm">
                    Location not yet configured by the shop owner
                  </span>
                </div>
              )}

              {/* Address details card */}
              <Card className="border-border bg-card shadow-sm">
                <CardContent className="p-6 space-y-5">
                  {/* Shop name */}
                  <div className="flex items-start gap-3 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-lg gradient-earthy flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                        Shop Name
                      </p>
                      <p className="text-lg font-display font-bold text-foreground leading-tight break-words">
                        {shopInfo.name}
                      </p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        SR Oils And Foods
                      </Badge>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                        Address
                      </p>
                      <div className="space-y-0.5 text-foreground">
                        <p className="break-words">{shopInfo.addressLine1}</p>
                        {shopInfo.addressLine2 && (
                          <p className="break-words">{shopInfo.addressLine2}</p>
                        )}
                        <p>
                          {shopInfo.city}, {shopInfo.state} – {shopInfo.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 pt-1">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${shopInfo.phone}`}
                        data-ocid="shop-address.phone_link"
                        className="text-primary font-medium hover:underline transition-smooth text-lg tracking-wide"
                        aria-label={`Call ${shopInfo.phone}`}
                      >
                        {shopInfo.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Get directions CTA */}
              {shopInfo.latitude != null && shopInfo.longitude != null && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${shopInfo.latitude}&mlon=${shopInfo.longitude}&zoom=15`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="shop-address.directions_link"
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl border border-primary/40 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-smooth"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions on OpenStreetMap
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
