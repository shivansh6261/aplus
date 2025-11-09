 "use client";

import React, { useState } from "react";
import Script from "next/script";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("⚠️ Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Endowment Donation",
        description: "Support our endowment programs and make a difference!",
        handler: function (response) {
          alert("🎉 Payment Successful! Thank you for your generosity ❤️");
        },
        prefill: {
          name: "Donor Name",
          email: "donor@example.com",
          contact: "9999999999",
        },
        theme: { color: "#2563EB" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const presetAmounts = [100, 500, 1000, 2500, 5000];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-3">
          Make a Donation
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Every contribution helps us empower students, support innovation, and
          create meaningful impact. 🙌
        </p>
      </div>

      {/* Card Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-blue-100">
        <p className="mb-6 text-gray-700 font-medium">
          Choose a donation amount:
        </p>

        {/* Preset Amount Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 ${
                amount == amt
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-blue-50 text-gray-800"
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="relative mb-6">
          <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
          <input
            type="number"
            placeholder="Enter custom amount"
            className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Donate Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading || !amount}
          className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-200 ${
            isLoading || !amount
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md"
          }`}
        >
          {isLoading ? "Processing..." : `Donate ₹${amount || ""}`}
        </button>

        {/* Trust Section */}
        <div className="mt-6 text-gray-500 text-sm">
          🔒 100% secure payments powered by Razorpay
        </div>
      </div>

      
    </div>
  );
};

export default DonatePage;
