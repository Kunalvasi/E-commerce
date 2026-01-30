// app/deals/page.js
import ProductCard from "../components/ProductCard";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function DealsPage() {
  // ✅ Connect to the database
  await connectDB();

  // ✅ Fetch products on sale or deals
  // For example, let's assume "price < 1000" are deals
  const products = await Product.find({ price: { $lt: 1000 } }).lean();

  const dealProducts = products.map((product) => ({
    _id: product._id.toString(),
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Deals & Offers</h1>

      {dealProducts.length === 0 ? (
        <p className="text-gray-500 text-lg">No deals available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
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
      )}
    </main>
  );
}
