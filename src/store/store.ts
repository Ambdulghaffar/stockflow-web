import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import { localStorageMiddleware } from "./local-storage-middleware";

export const makeStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
