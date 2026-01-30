"use client";

import { useEffect, useState } from "react";
import OrderProductCard from "../components/OrderProductCard";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function PreviousOrdersPage() {
  const { data: session, status } = useSession(); // ✅ use session status
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session?.user?.email) {
      setOrders([]); // No user logged in
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const res = await fetch(`/api/orders?userId=${session.user.email}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [session, status]);

  if (loading) return <p className="text-center text-white mt-20">Loading...</p>;

  if (!orders.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-gray-400 mb-4">No previous orders found.</p>
        <Link
          href="/shop"
          className="bg-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-8">Your Previous Orders</h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <span className="text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {order.products.map((product) => (
                <OrderProductCard key={product._id} {...product} />
              ))}
            </div>

            <div className="flex justify-end mt-4 text-lg font-bold text-indigo-400">
              Total: ₹
              {order.products.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
