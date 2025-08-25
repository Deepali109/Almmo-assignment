"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PostbackUrl() {
  const searchParams = useSearchParams();
  const affiliate_id = searchParams.get("affiliate_id");
  const [copied, setCopied] = useState(false);

  const url = `http://localhost:3001/postback?affiliate_id=${affiliate_id}&click_id={click_id}&amount={amount}&currency={currency}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Affiliate Postback URL
        </h1>
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg font-mono text-sm">
          <span className="truncate">{url}</span>
          <button
            onClick={copyToClipboard}
            className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
