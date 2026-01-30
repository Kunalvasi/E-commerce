"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";

const supportTopics = [
  { title: "Order Issues", description: "Track, cancel, or modify your order." },
  { title: "Payment Queries", description: "Questions about payments or refunds." },
  { title: "Returns & Exchanges", description: "Initiate a return or exchange process." },
  { title: "Account & Login", description: "Help with login, sign-up, or profile issues." },
  { title: "Shipping & Delivery", description: "Track shipping and delivery times." },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = supportTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Help Center</h1>
        <p className="text-gray-400 text-center mb-12">
          Find answers to common questions or contact support directly.
        </p>

        {/* Search */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-full bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Support Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTopics.map((topic, index) => (
            <Link
              key={index}
              href="#"
              className="group block p-6 bg-gray-800 rounded-2xl shadow hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-500">
                {topic.title}
              </h3>
              <p className="text-gray-400">{topic.description}</p>
            </Link>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gray-800 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-400 mb-6">Contact our support team via chat, phone, or email.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="/contact"
              className="flex items-center gap-2 justify-center px-6 py-3 bg-indigo-600 rounded-full text-white font-semibold hover:bg-indigo-700 transition"
            >
              <MessageCircle className="w-5 h-5" /> Chat
            </Link>
            <a
              href="tel:+911234567890"
              className="flex items-center gap-2 justify-center px-6 py-3 bg-gray-700 rounded-full text-white font-semibold hover:bg-gray-600 transition"
            >
              <Phone className="w-5 h-5" /> Call
            </a>
            <a
              href="mailto:support@shopease.com"
              className="flex items-center gap-2 justify-center px-6 py-3 bg-gray-700 rounded-full text-white font-semibold hover:bg-gray-600 transition"
            >
              <Mail className="w-5 h-5" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
