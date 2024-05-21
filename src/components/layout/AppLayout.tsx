"use client";

import { AppStoreProvider } from "@/stores/app-store-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { type ReactNode } from "react";
import { MapView } from "../MapView";
import { Toaster } from "../ui/toaster";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppStoreProvider>
      <Toaster />
      <TRPCReactProvider>
        <div className="relative flex h-screen flex-col">
          <div className="relative flex h-full flex-row gap-4 p-4 lg:gap-8 lg:p-8">
            <div className="h-42 flex w-[500px] flex-col">{children}</div>
            <div className="relative col-span-2 w-full overflow-hidden rounded-2xl">
              <MapView />
            </div>
          </div>
        </div>
      </TRPCReactProvider>
    </AppStoreProvider>
  );
};
