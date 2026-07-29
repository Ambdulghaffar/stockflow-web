"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface RecentlyViewedItem {
  productId: number;
  viewedAt: string;
}

interface RecentlyViewedContextValue {
  recentlyViewed: RecentlyViewedItem[];
  addProduct: (productId: number) => void;
  hasHydrated: boolean;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextValue | undefined
>(undefined);

const STORAGE_KEY = "stockflow_recently_viewed";
const MAX_ITEMS = 8;

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(
    [],
  );
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecentlyViewed(JSON.parse(raw));
    } catch (error) {
      console.error(
        "Erreur lors du chargement des produits vus récemment",
        error,
      );
    } finally {
      setHasHydrated(true);
    }
  }, []);

  const addProduct = useCallback((productId: number) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.productId !== productId);
      const updated = [
        { productId, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde des produits vus récemment",
          error,
        );
      }
      return updated;
    });
  }, []);

  const value = useMemo(
    () => ({ recentlyViewed, addProduct, hasHydrated }),
    [recentlyViewed, addProduct, hasHydrated],
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed(): RecentlyViewedContextValue {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed doit être utilisé à l'intérieur d'un RecentlyViewedProvider",
    );
  }
  return context;
}
