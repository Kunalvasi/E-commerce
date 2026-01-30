"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ✅ TypeScript-safe event type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Reset password request for:", email);
    setSubmitted(true); // Show confirmation message
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your email below and we'll send you instructions to reset your password.
        </p>

        {submitted ? (
          <div className="text-center text-green-400">
            <p>
              Check your email! We sent password reset instructions to <strong>{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 px-6 py-2 bg-indigo-600 rounded-full text-white font-semibold hover:bg-indigo-700 transition"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 py-3 rounded-full text-white font-semibold text-lg hover:bg-indigo-700 hover:shadow-lg transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-500 font-semibold transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
