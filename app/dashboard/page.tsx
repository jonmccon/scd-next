import { Suspense } from "react"
import Link from "next/link"
import prisma from "@/lib/prisma"
import StatusBadge from "@/components/healthcheck/status-badge"
import HealthSummary from "@/components/healthcheck/health-summary"
import { HealthStats } from "@/components/healthcheck/health-stats"

export const dynamic = "force-dynamic"

async function getListingsWithLatestHealth() {
  // Get all listings with their most recent health check
  const listings = await prisma.listing.findMany({
    where: {
      published: true,
      website: {
        not: "",
      },
    },
    select: {
      id: true,
      title: true,
      website: true,
      category: true,
    },
    orderBy: {
      title: "asc",
    },
  })

  // For each listing, get the most recent health check
  const listingsWithHealth = await Promise.all(
    listings.map(async (listing) => {
      const latestCheck = await prisma.healthCheck.findFirst({
        where: {
          listingId: listing.id,
        },
        orderBy: {
          checkedAt: "desc",
        },
      })

      // Get health check history for the past 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const healthHistory = await prisma.healthCheck.findMany({
        where: {
          listingId: listing.id,
          checkedAt: {
            gte: thirtyDaysAgo,
          },
        },
        orderBy: {
          checkedAt: "asc",
        },
        select: {
          status: true,
          responseTimeMs: true,
          checkedAt: true,
        },
      })

      return {
        ...listing,
        latestCheck,
        healthHistory,
      }
    }),
  )

  return listingsWithHealth
}

export default async function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Website Health Dashboard</h1>

      <Suspense fallback={<div>Loading health statistics...</div>}>
        <HealthStats />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Suspense fallback={<div>Loading website health data...</div>}>
          <WebsiteList />
        </Suspense>
      </div>
    </div>
  )
}

async function WebsiteList() {
  const listingsWithHealth = await getListingsWithLatestHealth()

  return (
    <>
      {listingsWithHealth.map((listing) => (
        <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold truncate">{listing.title}</h2>
              {listing.latestCheck && <StatusBadge status={listing.latestCheck.status} />}
            </div>
            <p className="text-sm text-gray-500 truncate mt-1">{listing.website}</p>
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
            <Link href={`/dashboard/${listing.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View detailed history →
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

