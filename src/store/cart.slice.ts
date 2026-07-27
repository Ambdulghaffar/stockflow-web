import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string | null;
  stock: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  hasHydrated: boolean;
}

const initialState: CartState = { items: [], hasHydrated: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>,
    ) => {
      const { productId, quantity, ...rest } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity = Math.min(existing.stock, existing.quantity + (quantity ?? 1));
      } else {
        state.items.push({
          productId,
          ...rest,
          quantity: Math.min(rest.stock, quantity ?? 1),
        });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (item) {
        item.quantity = Math.min(
          item.stock,
          Math.max(1, action.payload.quantity),
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    hydrate: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.hasHydrated = true;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrate } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartHasHydrated = (state: RootState) => state.cart.hasHydrated;

export default cartSlice.reducer;
