import { createContext, useContext } from "react";
import {
  useGetMinimalAvailableVersion,
  UseGetMinimalAvailableVersionInterface,
} from "./hooks/useGetMinimumAvailableVersion";

export type AppContextLoaded = UseGetMinimalAvailableVersionInterface;

// Create context
const AppContext = createContext<AppContextLoaded | null>(null);

// Export provider
export const AppContextProvider = AppContext.Provider;

// Export consumer
export function useAppContext(): AppContextLoaded {
  return useContext(AppContext)!;
}

/**
 * Export app initializer
 */
export function useAppContextSubscriber(): AppContextLoaded {
  const {
    handleGetMinimalAvailableVersion,
    loading,
  } = useGetMinimalAvailableVersion();
  return { handleGetMinimalAvailableVersion, loading };
}
