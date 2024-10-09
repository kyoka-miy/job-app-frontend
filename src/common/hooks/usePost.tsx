import { useCallback, useState } from "react";

type Props = {
  url: string;
  onSuccess?: (data?: any) => void;
  onError?: (err?: any) => void;
};

export const usePost = ({ url, onSuccess, onError }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const doPost = useCallback(
    async (body: any) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        if (response.ok) {
          onSuccess?.(result);
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
    [url, onSuccess, onError]
  );
  return { doPost, isLoading };
};
