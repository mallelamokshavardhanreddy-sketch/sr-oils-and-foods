import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

// The owner principal — set this to the deployed canister owner principal
// For development, the first logged-in user becomes admin
const OWNER_PRINCIPAL = import.meta.env.VITE_OWNER_PRINCIPAL as
  | string
  | undefined;

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const currentPrincipal = identity?.getPrincipal().toString();

  const isOwner =
    isAuthenticated &&
    !!currentPrincipal &&
    (OWNER_PRINCIPAL ? currentPrincipal === OWNER_PRINCIPAL : true);

  return {
    login,
    logout: handleLogout,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
    currentPrincipal,
    isOwner,
  };
}
