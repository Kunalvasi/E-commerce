"use client";

import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    items: "120+ Products",
    slug: "electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
    items: "90+ Products",
    slug: "fashion",
  },
  {
    id: 3,
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    items: "75+ Products",
    slug: "home-living",
  },
  {
    id: 4,
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    items: "60+ Products",
    slug: "beauty",
  },
  {
    id: 5,
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    items: "40+ Products",
    slug: "sports",
  },
  {
    id: 6,
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    items: "150+ Products",
    slug: "books",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Hero */}
      <section className="py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Categories
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover products across a wide range of categories curated just for you.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-6 left-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-gray-300 text-sm mt-1">
                  {category.items}
                </p>
              </div>

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="bg-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
