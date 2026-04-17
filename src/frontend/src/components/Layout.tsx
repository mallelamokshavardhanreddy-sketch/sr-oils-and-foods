import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ClipboardList,
  LayoutDashboard,
  MapPin,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCartStore } from "../store/cart";
import { LoginButton } from "./LoginButton";

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.cartCount());
  const { isAuthenticated, isOwner } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Products", icon: <Store className="h-4 w-4" /> },
    {
      to: "/shop-address",
      label: "Shop Address",
      icon: <MapPin className="h-4 w-4" />,
    },
    ...(isAuthenticated
      ? [
          {
            to: "/orders",
            label: "My Orders",
            icon: <ClipboardList className="h-4 w-4" />,
          },
        ]
      : []),
    ...(isOwner
      ? [
          {
            to: "/owner/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
          },
          {
            to: "/owner/products",
            label: "Manage Products",
            icon: <Package className="h-4 w-4" />,
          },
          {
            to: "/owner/shop-settings",
            label: "Shop Settings",
            icon: <Settings className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              data-ocid="nav.logo_link"
            >
              <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center shadow-sm">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base tracking-tight text-foreground leading-tight">
                  SRI RAJESWARI OILS AND FOODS
                </span>
                <span className="font-body text-xs text-muted-foreground tracking-wide">
                  SR Oils And Foods
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.to)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link to="/cart" data-ocid="nav.cart_link" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground border-0"
                      data-ocid="nav.cart_count_badge"
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Login */}
              <div className="hidden md:block">
                <LoginButton />
              </div>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-ocid="nav.mobile_menu_toggle"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden pb-4" data-ocid="nav.mobile_menu">
              <Separator className="mb-3" />
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(link.to)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <div className="px-3">
                  <LoginButton />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="footer"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded gradient-warm flex items-center justify-center">
                <Store className="h-3 w-3 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-foreground text-sm leading-tight">
                  SRI RAJESWARI OILS AND FOODS
                </span>
                <span className="text-muted-foreground text-xs">
                  SR Oils And Foods
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
