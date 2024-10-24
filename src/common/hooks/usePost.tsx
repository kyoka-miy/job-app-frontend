import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../constants";

type Props = {
  url: string;
  onSuccess?: (data?: any) => void;
  onError?: (err?: any) => void;
};

export const usePost = ({ url, onSuccess, onError }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const headers: HeadersInit = useMemo(
    () => ({
      "Content-Type": "application/json",
    }),
    []
  );
  if (token && !url.includes("auth")) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const doPost = useCallback(
    async (body?: any) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });

        let result;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          result = {};
        }
        if (response.ok) {
          onSuccess?.(result);
        } else if (response.status === 401) {
          navigate(CONSTANTS.LINK.LOGIN);
        } else {
          throw new Error(result.message || "");
        }
        return result;
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : "An error occurred";
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [url, onSuccess, onError, headers, navigate]
  );
  return { doPost, isLoading };
};
