"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const navLinks = ["Home", "Shop", "Categories", "Deals", "Contact"];
  const isLoggedIn = status === "authenticated";

  // 🔍 Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
          >
            ShopEase
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-gray-300 font-medium transition hover:text-indigo-400
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                after:bg-indigo-400 after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 🔍 Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative w-64"
          >
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-full
              bg-gray-800 border border-gray-700 text-gray-200
              placeholder-gray-400 focus:outline-none focus:ring-2
              focus:ring-indigo-500 transition"
            />
          </form>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? null : isLoggedIn ? (
              <>
                <Link href="/cart" className="relative group">
                  <ShoppingCart className="h-6 w-6 text-gray-300 group-hover:text-indigo-400 transition" />
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/10 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-400 hover:bg-indigo-500/10 transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 hover:shadow-xl transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-800 transition"
          >
            {open ? (
              <X className="text-gray-300" />
            ) : (
              <Menu className="text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-900 border-t border-gray-800 px-4 py-6 space-y-4">

          {/* 🔍 Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-200"
            />
          </form>

          {/* Mobile Navigation */}
          {navLinks.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block font-medium text-gray-300 hover:text-indigo-400"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}

          {/* Mobile Actions */}
          {status === "loading" ? null : isLoggedIn ? (
            <>
              <Link
                href="/cart"
                className="block font-medium text-gray-300 hover:text-indigo-400"
              >
                Cart
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-center border border-indigo-500 text-indigo-400 py-2 rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-center border border-indigo-500 text-indigo-400 py-2 rounded-full font-semibold"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="block text-center bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
