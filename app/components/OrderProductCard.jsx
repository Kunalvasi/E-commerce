// app/components/OrderProductCard.jsx
"use client";

export default function OrderProductCard({ title, price, quantity, category }) {
  return (
    <div className="bg-gray-700 rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300">Category: {category || "Product"}</p>
        <p className="text-gray-300">Quantity: {quantity}</p>
      </div>
      <p className="mt-2 font-bold text-indigo-400 text-lg">₹{price}</p>
    </div>
  );
}
