import { c as useQueryClient, r as reactExports, j as jsxRuntimeExports, L as Link, u as ue } from "./index-TdTOFd1p.js";
import { c as createLucideIcon, d as useAuth, L as Layout, m as Settings, a as Button, i as LayoutDashboard, l as Store, b as Separator, M as MapPin } from "./Layout-B60ajjWB.js";
import { I as Input } from "./input-DSCXMNhO.js";
import { u as useForm, L as Label } from "./index.esm-DtT__txg.js";
import { S as Skeleton } from "./skeleton-BmcWU5Z5.js";
import { u as useActor, c as createActor } from "./backend-BfHBhA_X.js";
import { u as useShopInfo } from "./useShopInfo-DidmW_iK.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function FieldError({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      className: "text-destructive text-xs mt-1",
      "data-ocid": "shop_settings.field_error",
      children: message
    }
  );
}
function OwnerShopSettingsPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { isAuthenticated, isOwner } = useAuth();
  const { data: shopInfo, isLoading } = useShopInfo();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      latitude: "",
      longitude: ""
    }
  });
  reactExports.useEffect(() => {
    if (shopInfo) {
      reset({
        name: shopInfo.name,
        addressLine1: shopInfo.addressLine1,
        addressLine2: shopInfo.addressLine2 ?? "",
        city: shopInfo.city,
        state: shopInfo.state,
        pincode: shopInfo.pincode,
        phone: shopInfo.phone,
        latitude: shopInfo.latitude !== void 0 && shopInfo.latitude !== null ? String(shopInfo.latitude) : "",
        longitude: shopInfo.longitude !== void 0 && shopInfo.longitude !== null ? String(shopInfo.longitude) : ""
      });
    }
  }, [shopInfo, reset]);
  const onSubmit = async (values) => {
    if (!actor) {
      ue.error("Not connected to backend");
      return;
    }
    const info = {
      name: values.name.trim(),
      addressLine1: values.addressLine1.trim(),
      addressLine2: values.addressLine2.trim() || void 0,
      city: values.city.trim(),
      state: values.state.trim(),
      pincode: values.pincode.trim(),
      phone: values.phone.trim(),
      latitude: values.latitude.trim() ? Number(values.latitude) : void 0,
      longitude: values.longitude.trim() ? Number(values.longitude) : void 0
    };
    try {
      await actor.setShopInfo(info);
      await queryClient.invalidateQueries({ queryKey: ["shopInfo"] });
      ue.success("Shop settings saved successfully");
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to save settings"
      );
    }
  };
  if (!isAuthenticated || !isOwner) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-24 flex flex-col items-center text-center",
        "data-ocid": "shop_settings.unauthorized_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-8 w-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Owner Access Required" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Sign in with the owner account to manage shop settings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              "data-ocid": "shop_settings.go_home_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Go to Store" })
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Shop Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Manage your shop name, address, and location details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/owner/dashboard",
          "data-ocid": "shop_settings.dashboard_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-3.5 w-3.5 mr-1.5" }),
            "Dashboard"
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-8 max-w-2xl",
        "data-ocid": "shop_settings.page",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "shop_settings.loading_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [1, 2].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ] }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-6 space-y-4", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" })
          ] }, k)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit(onSubmit),
            className: "space-y-6",
            "data-ocid": "shop_settings.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Shop Identity" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Shop Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      placeholder: "e.g., SRI RAJESWARI OILS AND FOODS",
                      ...register("name", { required: "Shop name is required" }),
                      "data-ocid": "shop_settings.name_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_a = errors.name) == null ? void 0 : _a.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      type: "tel",
                      placeholder: "e.g., +91 98765 43210",
                      ...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+\d\s\-()]{7,20}$/,
                          message: "Enter a valid phone number"
                        }
                      }),
                      "data-ocid": "shop_settings.phone_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_b = errors.phone) == null ? void 0 : _b.message })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Shop Address" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "addressLine1", children: "Address Line 1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine1",
                      placeholder: "Door No., Street Name",
                      ...register("addressLine1", {
                        required: "Address line 1 is required"
                      }),
                      "data-ocid": "shop_settings.address_line1_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_c = errors.addressLine1) == null ? void 0 : _c.message })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "addressLine2", children: [
                    "Address Line 2",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "addressLine2",
                      placeholder: "Landmark, Area",
                      ...register("addressLine2"),
                      "data-ocid": "shop_settings.address_line2_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "city",
                        placeholder: "e.g., Nellore",
                        ...register("city", { required: "City is required" }),
                        "data-ocid": "shop_settings.city_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_d = errors.city) == null ? void 0 : _d.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "state",
                        placeholder: "e.g., Andhra Pradesh",
                        ...register("state", { required: "State is required" }),
                        "data-ocid": "shop_settings.state_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_e = errors.state) == null ? void 0 : _e.message })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pincode", children: "PIN Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "pincode",
                      placeholder: "e.g., 524001",
                      ...register("pincode", {
                        required: "PIN code is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "Enter a valid 6-digit PIN code"
                        }
                      }),
                      "data-ocid": "shop_settings.pincode_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_f = errors.pincode) == null ? void 0 : _f.message })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border p-6 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Map Coordinates" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs ml-1", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Enter GPS coordinates to show a map pin on the Shop Address page. Right-click your location on",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://maps.google.com",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-primary hover:underline",
                      children: "Google Maps"
                    }
                  ),
                  " ",
                  "to copy the coordinates."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "latitude", children: "Latitude" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "latitude",
                        type: "number",
                        step: "any",
                        placeholder: "e.g., 14.4426",
                        ...register("latitude", {
                          validate: (v) => {
                            if (!v.trim()) return true;
                            const n = Number(v);
                            if (Number.isNaN(n)) return "Must be a number";
                            if (n < -90 || n > 90)
                              return "Must be between -90 and 90";
                            return true;
                          }
                        }),
                        "data-ocid": "shop_settings.latitude_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_g = errors.latitude) == null ? void 0 : _g.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "longitude", children: "Longitude" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "longitude",
                        type: "number",
                        step: "any",
                        placeholder: "e.g., 79.9865",
                        ...register("longitude", {
                          validate: (v) => {
                            if (!v.trim()) return true;
                            const n = Number(v);
                            if (Number.isNaN(n)) return "Must be a number";
                            if (n < -180 || n > 180)
                              return "Must be between -180 and 180";
                            return true;
                          }
                        }),
                        "data-ocid": "shop_settings.longitude_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: (_h = errors.longitude) == null ? void 0 : _h.message })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: isSubmitting || !actor,
                  className: "gradient-warm text-primary-foreground px-8",
                  "data-ocid": "shop_settings.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
                    isSubmitting ? "Saving…" : "Save Settings"
                  ]
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
}
export {
  OwnerShopSettingsPage as default
};
