// app/components/Providers.tsx
"use client"; // ✅ Must be client component

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      session={null}           // NextAuth will manage the session automatically
      refetchInterval={86400}  // refresh session every 1 day
    >
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
