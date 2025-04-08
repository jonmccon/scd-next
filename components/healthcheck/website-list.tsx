"use client";

import Link from "next/link";
import StatusBadge from "@/components/healthcheck/status-badge";

interface WebsiteListProps {
  listings: Array<{
    id: string;
    title: string;
    website: string;
    tags: Array<{ name: string }>;
    description: string | null;
    published: boolean;
    category: string;
    latestCheck: {
      status: string;
      errorMessage?: string | null;
      errorType?: string;
      checkedAt: string;
      id: string;
      listingId: string;
      statusCode: number | null;
      responseTimeMs: number | null;
      redirectUrl: string | null;
      finalUrl: string | null;
      isSecure: boolean | null;
    } | null;
    healthHistory: Array<{
      status: string;
      responseTimeMs: number | null;
      checkedAt: string;
    }>;
  }>;
}

export default function WebsiteList({ listings }: WebsiteListProps) {
  if (listings.length === 0) {
    return <div>No listings available.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Status</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Checked</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listings.map((listing) => (
            <tr key={listing.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap text-sm font-medium text-gray-900">
                <Link href={`/health/${listing.id}`} className="text-blue-600 hover:text-blue-800">
                  {listing.title}
                </Link>
              </td>
              <td className="whitespace-nowrap text-sm text-gray-500">{listing.category}</td>
              <td className="whitespace-nowrap text-sm text-gray-500">{listing.published ? "Yes" : "No"}</td>
              <td className="whitespace-nowrap">
                {listing.latestCheck?.status ? (
                  <StatusBadge status={listing.latestCheck.status as "up" | "down" | "warning" | "redirect" | "content_error"} />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="whitespace-nowrap text-sm text-gray-500">
                {listing.latestCheck?.checkedAt ? new Date(listing.latestCheck.checkedAt).toLocaleString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}