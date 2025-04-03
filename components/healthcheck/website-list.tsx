"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/healthcheck/status-badge";
import HealthSummary from "@/components/healthcheck/health-summary";
import Link from "next/link";

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
    <>
      {listings.map((listing) => (
        <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold truncate">{listing.title}</h2>
              {listing.latestCheck && <StatusBadge status={listing.latestCheck.status} />}
            </div>
            <Link href={listing.website}><p className="text-sm text-gray-500 truncate mt-1">{listing.website}</p></Link>
            <p className="text-xs text-gray-400 mt-1">Category: {listing.category}</p>
          </div>

          <div className="p-4">
            {listing.latestCheck ? (
              <>
                <div className="text-sm mb-3">
                  <span className="text-gray-500">Last checked: </span>
                  <span className="font-medium">{new Date(listing.latestCheck.checkedAt).toLocaleString()}</span>
                </div>

                {listing.latestCheck.responseTimeMs && (
                  <div className="text-sm mb-3">
                    <span className="text-gray-500">Response time: </span>
                    <span className="font-medium">{listing.latestCheck.responseTimeMs}ms</span>
                  </div>
                )}

                {listing.healthHistory.length > 0 && (
                  <div className="mt-4">
                    <HealthSummary healthHistory={listing.healthHistory} />
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-500">No health checks recorded</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 border-t">
            <Link href={`/health/${listing.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View detailed history →
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}