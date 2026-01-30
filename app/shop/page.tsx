import ProductCard from "../components/ProductCard";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const metadata = {
  title: "Shop | ShopEase",
};

export default async function ShopPage() {
  await connectDB();

  const products = await Product.find({});

  // ✅ Convert MongoDB documents → plain JS objects
  const safeProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {safeProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {safeProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}
