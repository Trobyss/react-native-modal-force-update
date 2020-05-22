import { useState } from "react";

export interface UseGetMinimalAvailableVersionInterface {
  handleGetMinimalAvailableVersion: () => Promise<string>;
  loading: boolean;
}

export function useGetMinimalAvailableVersion(): UseGetMinimalAvailableVersionInterface {
  // default true for init loading ui at the start of the app
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetMinimalAvailableVersion = async (): Promise<string> => {
    // fake get available version from my backend
    return new Promise((res) => {
      setTimeout(() => {
        setLoading(false);
        res("2.0.0");
      }, 2000);
    });
  };

  return { handleGetMinimalAvailableVersion, loading };
}
