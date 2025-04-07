import HealthStats from "@/components/healthcheck/health-stats";
import WebsiteList from "@/components/healthcheck/website-list";
import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export default async function DashboardPage() {
  // Fetch listings with websites
  const listings = await prisma.listing.findMany({
    where: {
      website: {
        not: "",
      },
    },
    select: {
      id: true,
      title: true,
      website: true,
      tags: {
        select: {
          name: true,
        },
      },
      description: true,
      published: true,
      category: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  // Fetch health data for each listing
  type ListingWithHealth = typeof listings[number] & {
    latestCheck: {
      checkedAt: string;
      id: string;
      listingId: string;
      status: string;
      statusCode: number | null;
      responseTimeMs: number | null;
      redirectUrl: string | null;
      finalUrl: string | null;
      errorMessage: string | null;
      isSecure: boolean | null;
    } | null;
    healthHistory: {
      status: string;
      responseTimeMs: number | null;
      checkedAt: string;
    }[];
  };

  const listingsWithHealth: ListingWithHealth[] = await Promise.all(
    listings.map(async (listing) => {
      try {
        // Fetch the latest health check
        const latestCheck = await prisma.healthCheck.findFirst({
          where: {
            listingId: listing.id,
          },
          orderBy: {
            checkedAt: "desc",
          },
        });

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Fetch the health history for the last 30 days
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
        });

        return {
          ...listing,
          description: listing.description || "No description available",
          latestCheck: latestCheck
            ? {
                ...latestCheck,
                checkedAt: latestCheck.checkedAt.toISOString(),
                errorMessage: latestCheck.errorMessage ?? null,
              }
            : null,
          healthHistory: healthHistory.map((entry) => ({
            status: entry.status,
            responseTimeMs: entry.responseTimeMs ?? null,
            checkedAt: entry.checkedAt.toISOString(),
          })),
        };
      } catch (error: any) {
        console.error(`Error fetching health data for listing ID ${listing.id}:`, error);

        // Return the listing with an error logged
        return {
          ...listing,
          latestCheck: {
            id: "unknown",
            listingId: listing.id,
            status: "error",
            statusCode: null,
            responseTimeMs: null,
            redirectUrl: null,
            finalUrl: null,
            errorMessage: error.message || null,
            isSecure: null,
            checkedAt: new Date().toISOString(),
          },
          healthHistory: [],
        };
      }
    })
  );

  // Fetch health stats based on the most recent health check for each listing
  const latestHealthChecks = await prisma.healthCheck.findMany({
    where: {
      checkedAt: {
        not: undefined,
      },
    },
    distinct: ["listingId"], // Ensure only the latest health check per listing is considered
    orderBy: {
      checkedAt: "desc", // Get the most recent health check
    },
    select: {
      status: true,
    },
  });

  // Group the latest health checks by status
  const healthStats = latestHealthChecks.reduce((acc, check) => {
    acc[check.status] = (acc[check.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalChecked = Object.values(healthStats).reduce((sum, count) => sum + count, 0);
  const upCount = healthStats["up"] || 0;
  const uptimePercentage = totalChecked > 0 ? Math.round((upCount / totalChecked) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <HealthStats
        data={{
          totalChecked,
          uptimePercentage,
          issues: totalChecked - upCount,
        }}
      />
      <div className="mt-8">
        <WebsiteList listings={listingsWithHealth} />
      </div>
    </div>
  );
}

export interface ListingWithHealth {
  id: string;
  title: string;
  website: string;
  tags: Array<{ name: string }>;
  description: string | null;
  published: boolean;
  category: string;
  latestCheck: {
    status: string;
    errorMessage?: string;
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
}
export interface HealthStats {
  totalChecked: number;
  uptimePercentage: number;
  issues: number;
}
export interface DashboardPageProps {
  listings: ListingWithHealth[];
  healthStats: HealthStats;
}