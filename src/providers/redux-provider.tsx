"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store/store";
import { loadCartFromStorage } from "@/store/local-storage-middleware";
import { hydrate } from "@/store/cart.slice";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const items = loadCartFromStorage();
    storeRef.current!.dispatch(hydrate(items));
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
