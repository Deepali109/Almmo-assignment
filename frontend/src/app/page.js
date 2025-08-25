"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [affiliateId, setAffiliateId] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (affiliateId.trim()) {
      router.push(`/dashboard?affiliate_id=${affiliateId}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Affiliate Login
        </h1>
        <input
          type="number"
          placeholder="Enter Affiliate ID"
          value={affiliateId}
          onChange={(e) => setAffiliateId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
