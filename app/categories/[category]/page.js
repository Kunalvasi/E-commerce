// app/categories/[category]/page.jsx
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/app/components/ProductCard";

export default async function CategoryPage({ params }) {
  // ✅ If params is a Promise, await it
  const resolvedParams = await params;
  const category = resolvedParams?.category?.toLowerCase();

  if (!category) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-red-500 text-lg">No category specified.</p>
      </main>
    );
  }

  await connectDB();

  const products = await Product.find({
    category: { $regex: new RegExp(`^${category}$`, "i") },
  }).lean();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 capitalize">{category}</h1>

      {products.length === 0 ? (
        <p className="text-gray-400 text-lg">No products found in {category}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id.toString()}
              _id={product._id.toString()}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      )}
    </main>
  );
}
