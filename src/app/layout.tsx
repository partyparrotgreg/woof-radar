import { PageHeader } from "@/components/PageHeader";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { AppStoreProvider } from "@/stores/app-store-provider";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Woof Radar",
  description: "Dog's woof finder. Check how much woof is in your area.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <AppStoreProvider>
            <Toaster />
            <TRPCReactProvider>
              <div className="flex h-screen flex-col-reverse gap-4 p-4 lg:flex-col">
                <PageHeader />
                <div className="flex h-24 flex-1 flex-col">{children}</div>
              </div>
            </TRPCReactProvider>
          </AppStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
