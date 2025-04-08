import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const listingsWithHealth = await Promise.all(
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
          latestCheck,
          healthHistory,
        };
      } catch (error: any) {
        console.error(`Error fetching health data for listing ID ${listing.id}:`, error);

        // Log the error as a health check entry in the database
        await prisma.healthCheck.create({
          data: {
            listingId: listing.id,
            status: "error",
            errorMessage: error.message || "Unknown error",
            errorType: "fetch_failure",
            checkedAt: new Date(),
          },
        });

        // Return the listing with the error logged
        return {
          ...listing,
          latestCheck: {
            status: "error",
            errorMessage: error.message || "Unknown error",
            errorType: "fetch_failure",
            checkedAt: new Date(),
          },
          healthHistory: [],
        };
      }
    })
  );

  res.status(200).json(listingsWithHealth);
}