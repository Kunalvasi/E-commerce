"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github, Facebook } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ EMAIL / PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // 👈 important
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // ✅ Session created → redirect
    router.push("/cart");
  };

  // ✅ SOCIAL LOGIN
  const handleSocialLogin = async (provider) => {
    await signIn(provider, {
      callbackUrl: "/cart", // redirect after login
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <p className="text-gray-400 text-center mb-6">
          Welcome back! Please login to your account.
        </p>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-center text-red-400 text-sm">{error}</p>
        )}

        {/* SOCIAL LOGIN */}
        {/* <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
          >
            Login with Google
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
          >
            <Github className="w-5 h-5" />
            Login with GitHub
          </button>

          <button
            onClick={() => handleSocialLogin("facebook")}
            className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-gray-600 hover:bg-gray-700 transition"
          >
            <Facebook className="w-5 h-5 text-blue-500" />
            Login with Facebook
          </button>
        </div> */}

        {/* DIVIDER */}
        {/* <div className="flex items-center mb-6">
          <hr className="flex-1 border-gray-600" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-600" />
        </div> */}

        {/* EMAIL LOGIN */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGN UP */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
