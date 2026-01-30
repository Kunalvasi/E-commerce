"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

// ---------------- CONTEXT ----------------
const CartContext = createContext(null);

// ---------------- PROVIDER ----------------
export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);

  // ✅ AUTH FLAG
  const isAuthenticated = status === "authenticated";

  // 🔑 Cart key based on logged-in user
  const cartKey = session?.user?.email
    ? `cart_${session.user.email}`
    : "cart_guest";

  // ---------------- LOAD CART ----------------
  useEffect(() => {
    if (status === "loading") return;

    const storedCart = sessionStorage.getItem(cartKey); // ✅ sessionStorage
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, [cartKey, status]);

  // ---------------- SAVE CART ----------------
  useEffect(() => {
    sessionStorage.setItem(cartKey, JSON.stringify(cart)); // ✅ sessionStorage
  }, [cart, cartKey]);

  // ---------------- SYNC ACROSS TABS ----------------
  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === cartKey && event.newValue) {
        setCart(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [cartKey]);

  // ---------------- CART ACTIONS ----------------
  const addToCart = (product) => {
    const productId = product._id || product.id;

    setCart((prev) => {
      const existing = prev.find(
        (p) => (p._id || p.id) === productId
      );

      if (existing) {
        return prev.map((p) =>
          (p._id || p.id) === productId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((p) => (p._id || p.id) !== productId)
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          (p._id || p.id) === productId
            ? { ...p, quantity: p.quantity + delta }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  // ---------------- PROVIDER ----------------
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isAuthenticated, // ✅ exposed flag
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ---------------- CUSTOM HOOK ----------------
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }
  return context;
};
