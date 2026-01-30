"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation"; // For navigation

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    router.push("/shipping"); // Navigate to shipping page
  };

  const handlePreviousOrders = () => {
    router.push("/orders"); // Navigate to previous orders page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Your cart is empty.</p>
             <button
                onClick={handlePreviousOrders}
                className="bg-gray-700 py-3 px-3 m-3 rounded-full font-semibold text-indigo-400 hover:bg-gray-600 hover:text-white transition"
              >
                View Previous Orders
              </button>
            <Link
              href="/shop"
              className="bg-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:gap-10">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item, index) => (
                <div
                  key={`${item._id || item.id}-${index}`} 
                  className="flex items-center bg-gray-800 rounded-xl p-4 gap-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-400">₹{item.price}</p>
                    <div className="flex items-center mt-2 gap-3">
                      <button
                        onClick={() => updateQuantity(item._id || item.id, -1)}
                        className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id || item.id, 1)}
                        className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id || item.id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 lg:mt-0 lg:w-96 bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col gap-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>₹99</span>
              </div>
              <div className="flex justify-between font-bold text-white text-lg">
                <span>Total</span>
                <span>₹{total + 99}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-indigo-600 py-3 rounded-full font-semibold text-white hover:bg-indigo-700 hover:shadow-lg transition"
              >
                Proceed to Checkout
              </button>

              {/* NEW BUTTON: Previous Orders */}
              <button
                onClick={handlePreviousOrders}
                className="bg-gray-700 py-3 rounded-full font-semibold text-indigo-400 hover:bg-gray-600 hover:text-white transition"
              >
                View Previous Orders
              </button>

              <Link
                href="/shop"
                className="text-center text-indigo-400 hover:text-indigo-500 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
