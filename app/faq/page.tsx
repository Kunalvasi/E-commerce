"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click on the Sign Up button in the top right corner, fill in your details, and you’re ready to start shopping!",
  },
  {
    question: "How can I reset my password?",
    answer: "Go to the Login page and click on 'Forgot Password'. Enter your email to receive a password reset link.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, UPI, Netbanking, and popular wallets like Paytm and Google Pay.",
  },
  {
    question: "Can I track my order?",
    answer: "Yes! Once your order is confirmed, you can track it from the 'My Orders' section in your account.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach out via the Contact page or email us at support@shopease.com.",
  },
];

export default function FAQPage() {
  // ✅ Add type: number or null
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ✅ Type index as number
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left bg-gray-800 hover:bg-gray-700 transition"
              >
                <span className="font-medium">{faq.question}</span>
                <span className="text-indigo-500 font-bold text-lg">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-800 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
