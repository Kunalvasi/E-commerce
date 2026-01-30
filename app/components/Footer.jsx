"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function Footer() {
  const { isAuthenticated } = useCart();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">ShopEase</h2>
          <p className="text-gray-400">
            Your one-stop shop for premium products at unbeatable prices.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-white"><Youtube className="h-5 w-5" /></Link>
          </div>
        </div>

        {/* Shop Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Shop</h3>
          <ul className="space-y-1 text-gray-400">
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/deals" className="hover:text-white">Deals</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white">Support</h3>
          <ul className="space-y-1 text-gray-400">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            {isAuthenticated && (
              <>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              </>
            )}
            <li><Link href="/contact" className="hover:text-white">Help Center</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Subscribe</h3>
          <p className="text-gray-400">
            Get updates on new products and special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="text-sm text-green-400 mt-2">{message}</p>}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        <span className="mx-2">|</span>
        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        <span className="mx-2">|</span>
        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
      </div>
    </footer>
  );
}
