import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogIn, LogOut } from "lucide-react";

export function LoginButton() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const queryClient = useQueryClient();

  const handleAuth = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  const isDisabled = isInitializing || isLoggingIn;

  return (
    <Button
      onClick={handleAuth}
      disabled={isDisabled}
      variant={isAuthenticated ? "outline" : "default"}
      size="sm"
      data-ocid="login_button"
      className="gap-2"
    >
      {isDisabled ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isAuthenticated ? (
        <LogOut className="h-4 w-4" />
      ) : (
        <LogIn className="h-4 w-4" />
      )}
      {isInitializing
        ? "Loading..."
        : isLoggingIn
          ? "Signing in..."
          : isAuthenticated
            ? "Sign Out"
            : "Sign In"}
    </Button>
  );
}
