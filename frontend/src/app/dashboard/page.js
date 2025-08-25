"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const affiliate_id = searchParams.get("affiliate_id");

  const [clicks, setClicks] = useState([]);
  const [conversions, setConversions] = useState([]);

  useEffect(() => {
    if (affiliate_id) {
      // Fetch clicks
      fetch(`http://localhost:3001/affiliate/${affiliate_id}/clicks`)
        .then((res) => res.json())
        .then((data) => setClicks(data))
        .catch((err) => console.error("Clicks fetch error:", err));

      // Fetch conversions
      fetch(`http://localhost:3001/affiliate/${affiliate_id}/conversions`)
        .then((res) => res.json())
        .then((data) => setConversions(data))
        .catch((err) => console.error("Conversions fetch error:", err));
    }
  }, [affiliate_id]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Affiliate Dashboard
      </h1>
      <p className="text-gray-600 mb-6">Affiliate ID: {affiliate_id}</p>

      {/* Clicks Section */}
      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Clicks (by Campaign)
        </h2>
        {clicks.length === 0 ? (
          <p className="text-gray-500">No clicks yet</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Click ID</th>
                <th className="p-2">Campaign</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {clicks.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="p-2">{c.click_id}</td>
                  <td className="p-2">{c.campaign_name}</td>
                  <td className="p-2">
                    {new Date(c.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Conversions Section */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-green-600 mb-4">
          Conversions
        </h2>
        {conversions.length === 0 ? (
          <p className="text-gray-500">No conversions yet</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Amount</th>
                <th className="p-2">Currency</th>
                <th className="p-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="p-2">{c.amount}</td>
                  <td className="p-2">{c.currency}</td>
                  <td className="p-2">
                    {new Date(c.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
