"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";

export default function SearchPage() {
  const searchParams = useSearchParams(); // ✅ client hook
  const query = searchParams.get("q") || ""; // ✅ unwrap with get()

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products whenever query changes
  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">
        Search results for{" "}
        <span className="text-indigo-600">"{query}"</span>
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {!loading &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
      </div>
    </div>
  );
}
