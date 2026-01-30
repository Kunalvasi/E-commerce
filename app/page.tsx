// app/page.jsx
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function HomePage() {
  // Connect to MongoDB
  await connectDB();

  // Fetch featured products (limit 4)
  const products = await Product.find({}).limit(4).lean();

  const featuredProducts = products.map((product) => ({
    _id: product._id.toString(),
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
  }));

  return (
    <main className="space-y-24 bg-gray-900 text-gray-100">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-700 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Shop Smart. <br /> Live Better.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300/90 drop-shadow-md">
            Discover premium products at unbeatable prices. Handpicked just for you.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/shop"
              className="rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-lg hover:scale-105 hover:bg-indigo-500 transition"
            >
              Shop Now
            </Link>
            <Link
              href="/deals"
              className="rounded-full border border-indigo-500 px-8 py-3 font-semibold hover:bg-indigo-500 hover:text-white transition"
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-100">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["electronics", "fashion", "accessories", "bags"].map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat}`}
              className="group relative rounded-2xl bg-gray-800 py-10 flex flex-col items-center justify-center font-semibold text-gray-200 hover:bg-indigo-600 hover:text-white transition shadow hover:shadow-xl"
            >
              <span className="capitalize">{cat}</span>
              <span className="absolute -bottom-2 w-0 h-1 bg-indigo-500 group-hover:w-3/4 transition-all"></span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Featured Products</h2>
          <Link
            href="/shop"
            className="text-indigo-500 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-3xl overflow-hidden mx-4 md:mx-0 shadow-lg">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
              Get 20% Off Your First Order 🎉
            </h2>
            <p className="mt-4 text-gray-300 drop-shadow-md">
              Sign up now and receive exclusive discounts and updates on new arrivals.
            </p>
          </div>

          {/* <Link
            href="/signup"
            className="inline-block rounded-full bg-indigo-600 px-8 py-3 text-white font-semibold shadow-lg hover:scale-105 hover:bg-indigo-500 transition"
          >
            Sign Up Now
          </Link> */}
        </div>
      </section>

    </main>
  );
}
