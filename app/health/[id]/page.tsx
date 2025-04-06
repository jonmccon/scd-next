import { notFound } from "next/navigation"
import Link from "next/link"
import prisma from "@/lib/prisma"
import StatusBadge from "@/components/healthcheck/status-badge"
import ResponseTimeChart from "@/components/healthcheck/response-time-chart"
import StatusHistoryChart from "@/components/healthcheck/status-history-chart"
import HealthCheckTable from "@/components/healthcheck/health-check-table"

export const dynamic = "force-dynamic"

interface PageProps {
  params: {
    id: string
  }
}

async function getListingWithHealthHistory(id: string) {
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      website: true,
      category: true,
      tags: {
        select: {
          name: true,
        },
      },
      description: true,
      published: true,
    },
  })

  if (!listing) {
    return null
  }

  // Get all health checks for this listing, ordered by date
  const healthChecks = await prisma.healthCheck.findMany({
    where: {
      listingId: id,
    },
    orderBy: {
      checkedAt: "desc",
    },
  })

  return {
    ...listing,
    healthChecks,
  }
}

export default async function ListingHealthPage({ params }: PageProps) {
  const listingData = await getListingWithHealthHistory(params.id)

  if (!listingData) {
    notFound()
  }

  const { title, website, category, healthChecks } = listingData
  const latestCheck = healthChecks[0]

  // Prepare data for charts - last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentChecks = healthChecks
    .filter((check) => new Date(check.checkedAt) >= thirtyDaysAgo)
    .sort((a, b) => new Date(a.checkedAt).getTime() - new Date(b.checkedAt).getTime())

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/health" className="text-blue-600 hover:text-blue-800">
          ← Back to Dashboard
        </Link>
      </div>

      <div className=" p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              {website}
            </a>
            <p className="text-sm text-gray-500 mt-1">Category: {category}</p>
            <p className="text-sm text-gray-500 mt-1">Tags: {listingData.tags.map(tag => tag.name).join(", ")}</p>
            <p className="text-sm text-gray-500 mt-1">Description: {listingData.description}</p>
            <p className="text-sm text-gray-500 mt-1">Published: {listingData.published ? "Yes" : "No"}</p>
          </div>

          {latestCheck && (
            <div className="text-right">
              <div className="mb-2">
                {["up", "down", "warning", "redirect", "content_error"].includes(latestCheck.status) ? (
                  <StatusBadge status={latestCheck.status as "up" | "down" | "warning" | "redirect" | "content_error"} />
                ) : null}
              </div>
              <p className="text-sm text-gray-500">Last checked: {new Date(latestCheck.checkedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {recentChecks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className=" p-6">
              <h2 className="text-xl font-semibold mb-4">Response Time (Last 30 Days)</h2>
              <ResponseTimeChart data={recentChecks} />
            </div>

            <div className=" p-6">
              <h2 className="text-xl font-semibold mb-4">Status History (Last 30 Days)</h2>
              <StatusHistoryChart data={recentChecks} />
            </div>
          </div>

          <div className=" p-6">
            <h2 className="text-xl font-semibold mb-4">Health Check History</h2>
            <HealthCheckTable healthChecks={healthChecks.slice(0, 50)} />
          </div>
        </>
      ) : (
        <div className=" p-6 text-center">
          <p className="text-gray-500">No health check data available for this website.</p>
        </div>
      )}
    </div>
  )
}

