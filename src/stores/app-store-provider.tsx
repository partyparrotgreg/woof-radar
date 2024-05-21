"use client";

import { type StoreApi, useStore } from "zustand";
import { createAppStore, initAppStore, type AppStore } from "./app-store";
import { useRef, createContext, useContext } from "react";

export const AppStoreContext = createContext<StoreApi<AppStore> | null>(null);

export interface AppStoreProviderProps {
  children: React.ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AppStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }
  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
