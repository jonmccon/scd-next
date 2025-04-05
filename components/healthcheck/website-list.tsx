"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/healthcheck/status-badge";

export default function WebsiteList() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch("/api/listings-with-health");
      const data = await response.json();
      setListings(data);
    }
    fetchListings();
  }, []);

  if (listings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th> */}
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Checked</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings.map((listing) => {
            const latestCheck = listing.latestCheck || {};
            return (
              <tr key={listing.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.title}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <a
                    href={listing.website.startsWith("http") ? listing.website : `https://${listing.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {listing.website}
                  </a>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.category}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.tags.map((tag) => tag.name).join(", ")}
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{listing.description}</td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.published ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {latestCheck.status && <StatusBadge status={latestCheck.status} />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {latestCheck.checkedAt ? new Date(latestCheck.checkedAt).toLocaleString() : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <Link href={`/health/${listing.id}`}>View Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}