import { useCallback, useEffect, useMemo, useState } from "react";

interface Params {
  [key: string]: any;
}

type Props = {
  url: string;
  onSuccess?: (data?: any) => void;
  onError?: (err?: any) => void;
  params?: Params;
  shouldFetch?: boolean;
};

export const useFetch = <T,>({
  url,
  onSuccess,
  onError,
  params,
  shouldFetch = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>();
  const token = sessionStorage.getItem("token");
  const headers: HeadersInit = useMemo(() => {
    const baseHeaders = {
      "Content-Type": "application/json",
    };
    if (token && !url.includes("auth")) {
      return {
        ...baseHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
    return baseHeaders;
  }, [token, url]);

  const query = useMemo(
    () => (params ? `?${new URLSearchParams(params).toString()}` : ""),
    [params]
  );
  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}${query}`, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      if (response.ok) {
        setData(result as T);
        onSuccess?.(result);
      } else {
        throw new Error(result.message || "");
      }
      return result as T;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An error occurred";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url, onSuccess, onError, headers, query]);

  useEffect(() => {
    if (shouldFetch) {
      refetch();
    }
  }, []);

  return { data, refetch, isLoading };
};
