import { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { CartItem } from "./cart.slice";

const CART_STORAGE_KEY = "stockflow_cart";

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action === "object" && action !== null && "type" in action) {
    const actionType = (action as { type: string }).type;
    if (actionType.startsWith("cart/") && actionType !== "cart/hydrate") {
      try {
        const state = store.getState() as RootState;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du panier", error);
      }
    }
  }

  return result;
};

export const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Erreur lors du chargement du panier", error);
    return [];
  }
};
