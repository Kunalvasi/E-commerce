"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSession } from "next-auth/react"; // ✅ NextAuth session

export default function ProductCard({ _id, title, price, image, category }) {
  const { addToCart } = useCart();
  const { data: session } = useSession(); // null if not logged in

  const handleAdd = () => {
    if (!session) return; // safety check
    addToCart({ _id, title, price, image, category });
  };

  return (
    <div className="group relative rounded-2xl border border-gray-700 bg-gray-900 shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
      
      {/* Wishlist */}
      <button className="absolute right-3 top-3 z-10 rounded-full bg-gray-800 p-2 shadow hover:bg-pink-800 transition">
        <Heart className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition" />
      </button>

      {/* Image */}
      <Link href={`/product/${_id}`}>
        <div className="relative h-56 w-full overflow-hidden bg-gray-800">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        <span className="text-xs text-indigo-400 font-semibold uppercase">
          {category}
        </span>

        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-white drop-shadow-md">₹{price}</p>

          {/* Only show Add button if user is logged in */}
          {session && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 shadow hover:shadow-indigo-700 transition"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-indigo-600 opacity-0 group-hover:opacity-30 transition-all"></div>
    </div>
  );
}
