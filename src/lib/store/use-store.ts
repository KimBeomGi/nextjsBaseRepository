import { useState, useEffect } from "react";

/**
 * [Zustand Hydration Helper]
 * Next.js SSR 환경에서 persisted store 사용 시 발생하는 Hydration Mismatch 에러를 방지합니다.
 * 
 * @param store - zustand store hook
 * @param callback - state selector
 */
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
