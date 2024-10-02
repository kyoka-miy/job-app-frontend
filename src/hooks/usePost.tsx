import { useState } from "react";

export const usePost = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const doPost = async (body: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setData(result);
      return result;
    } catch (e: any) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return { doPost, loading, error, data };
};
