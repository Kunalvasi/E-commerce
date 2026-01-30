"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ✅ Typed handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Typed handleSubmit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen py-16 text-white">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-white">
          Get in Touch
        </h1>
        <p className="text-gray-300 text-lg">
          Questions, feedback, or suggestions? Fill out the form and we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div className="text-indigo-400 text-3xl">🏢</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Address</h2>
              <p className="text-gray-300">C-6/C-11, Mahal Scheme, Jagtpura, Jaipur, Rajasthan, India</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div className="text-indigo-400 text-3xl">✉️</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Email</h2>
              <p className="text-gray-300">support@shopease.com</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div className="text-indigo-400 text-3xl">📞</div>
            <div>
              <h2 className="text-xl font-semibold text-white">Phone</h2>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 space-y-6"
        >
          {submitted && (
            <p className="text-green-400 font-semibold">
              Message sent successfully!
            </p>
          )}

          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full border border-gray-600 bg-transparent rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
              peer-focus:-top-2 peer-focus:text-indigo-400 peer-focus:text-sm transition-all">
              Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full border border-gray-600 bg-transparent rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
              peer-focus:-top-2 peer-focus:text-indigo-400 peer-focus:text-sm transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder=" "
              className="peer w-full border border-gray-600 bg-transparent rounded-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <label className="absolute left-4 top-3 text-gray-400 text-sm 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base 
              peer-focus:-top-2 peer-focus:text-indigo-400 peer-focus:text-sm transition-all">
              Message
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 hover:shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Google Map Section */}
      <div className="mt-16 w-full h-96 rounded-xl overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps?q=HKM+Jagtpura+Jaipur&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(80%) contrast(120%)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
