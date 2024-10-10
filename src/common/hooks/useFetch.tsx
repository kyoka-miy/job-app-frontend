import { useCallback, useEffect, useMemo, useState } from "react";

interface Params {
  [key: string]: any;
}

type Props = {
  url: string;
  onSuccess?: (data?: any) => void;
  onError?: (err?: any) => void;
  params?: Params;
};

export const useFetch = ({ url, onSuccess, onError, params }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const token = sessionStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token && !url.includes("auth")) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const query = useMemo(
    () => (params ? `?${new URLSearchParams(params).toString()}` : ''),
    [params]
  );
  const doFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${url}${query}`, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
        onSuccess?.(result);
      } else {
        throw new Error(result.message || "");
      }
      return result;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An error occurred";
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [url, onSuccess, onError]);

  return { data, doFetch, isLoading };
};
