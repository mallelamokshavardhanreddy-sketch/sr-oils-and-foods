import { j as jsxRuntimeExports } from "./index-TdTOFd1p.js";
import { c as createLucideIcon, L as Layout, M as MapPin, l as Store, B as Badge } from "./Layout-B60ajjWB.js";
import { C as Card, a as CardContent } from "./card-joc-nRTW.js";
import { S as Skeleton } from "./skeleton-BmcWU5Z5.js";
import { u as useShopInfo } from "./useShopInfo-DidmW_iK.js";
import "./backend-BfHBhA_X.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode$1);
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
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function StaticMap({
  lat,
  lng,
  name
}) {
  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=600x300&markers=${lat},${lng},red-pushpin`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border surface-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: mapUrl,
        alt: `Map showing location of ${name}`,
        className: "w-full h-64 object-cover",
        loading: "lazy",
        onError: (e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextElementSibling;
          if (fallback) fallback.style.display = "flex";
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "hidden h-64 w-full items-center justify-center bg-muted text-muted-foreground flex-col gap-2",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-8 h-8 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Map unavailable" })
        ]
      }
    )
  ] });
}
function LoadingSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
    ] }) })
  ] });
}
function ShopAddressPage() {
  const { data: shopInfo, isLoading } = useShopInfo();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4" }),
        "Find Us"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-2", children: "Shop Address" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Visit us in person or get in touch" })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "shop-address.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, {}) }),
    !isLoading && !shopInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "shop-address.empty_state",
        className: "text-center py-16 px-8 rounded-2xl bg-muted/40 border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground mb-2", children: "Address Not Configured" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto", children: "Shop address has not been configured yet. Please check back later." })
        ]
      }
    ),
    !isLoading && shopInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "shop-address.card", className: "space-y-6", children: [
      shopInfo.latitude != null && shopInfo.longitude != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        StaticMap,
        {
          lat: shopInfo.latitude,
          lng: shopInfo.longitude,
          name: shopInfo.name
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "shop-address.map-unavailable",
          className: "flex items-center justify-center h-48 rounded-xl bg-muted/40 border border-dashed border-border text-muted-foreground gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-5 h-5 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Location not yet configured by the shop owner" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg gradient-earthy flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "w-5 h-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5", children: "Shop Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground leading-tight break-words", children: shopInfo.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mt-1 text-xs", children: "SR Oils And Foods" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-words", children: shopInfo.addressLine1 }),
              shopInfo.addressLine2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-words", children: shopInfo.addressLine2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                shopInfo.city,
                ", ",
                shopInfo.state,
                " – ",
                shopInfo.pincode
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${shopInfo.phone}`,
                "data-ocid": "shop-address.phone_link",
                className: "text-primary font-medium hover:underline transition-smooth text-lg tracking-wide",
                "aria-label": `Call ${shopInfo.phone}`,
                children: shopInfo.phone
              }
            )
          ] })
        ] })
      ] }) }),
      shopInfo.latitude != null && shopInfo.longitude != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `https://www.openstreetmap.org/?mlat=${shopInfo.latitude}&mlon=${shopInfo.longitude}&zoom=15`,
          target: "_blank",
          rel: "noopener noreferrer",
          "data-ocid": "shop-address.directions_link",
          className: "flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl border border-primary/40 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4" }),
            "Get Directions on OpenStreetMap"
          ]
        }
      )
    ] })
  ] }) }) });
}
export {
  ShopAddressPage as default
};
