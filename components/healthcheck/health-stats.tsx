"use client"

import prisma from "@/lib/prisma"

export async function HealthStats() {
  // Get the most recent health check IDs for each listing
  const recentChecks = await prisma.healthCheck.findMany({
    distinct: ["listingId"], // Ensure only one record per listingId
    orderBy: {
      checkedAt: "desc", // Get the most recent check
    },
    select: {
      id: true, // Only select the ID
    },
  });

  // Extract the IDs into an array of strings
  const recentIds = recentChecks.map((check) => check.id);

  // Get counts of websites by status
  const statusCounts = await prisma.healthCheck.groupBy({
    by: ["status"],
    where: {
      id: {
        in: recentIds, // Use the array of IDs here
      },
    },
    _count: {
      status: true,
    },
  });

  // Calculate total websites checked
  const totalChecked = statusCounts.reduce((sum, item) => sum + item._count.status, 0);

  // Calculate uptime percentage
  const upCount = statusCounts.find((item) => item.status === "up")?._count.status || 0;
  const uptimePercentage = totalChecked > 0 ? Math.round((upCount / totalChecked) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Total Websites" value={totalChecked.toString()} description="Websites being monitored" />
      <StatCard
        title="Uptime"
        value={`${uptimePercentage}%`}
        description="Websites currently up"
        color={uptimePercentage > 95 ? "green" : uptimePercentage > 80 ? "yellow" : "red"}
      />
      <StatCard
        title="Issues"
        value={(totalChecked - upCount).toString()}
        description="Websites with problems"
        color={totalChecked - upCount > 0 ? "red" : "green"}
      />
      <StatCard title="Last Check" value={new Date().toLocaleDateString()} description="Most recent health check" />
    </div>
  );
}

interface StatCardProps {
  title: string
  value: string
  description: string
  color?: "green" | "yellow" | "red" | "blue"
}

function StatCard({ title, value, description, color = "blue" }: StatCardProps) {
  // Get color-specific classes
  const getColorClasses = (color: string): string => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-700"
      case "green":
        return "bg-green-50 text-green-700"
      case "yellow":
        return "bg-yellow-50 text-yellow-700"
      case "red":
        return "bg-red-50 text-red-700"
      default:
        return "bg-blue-50 text-blue-700"
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className={`text-3xl font-bold mt-2 ${getColorClasses(color)} inline-block px-2 py-1 rounded`}>{value}</div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  )
}

