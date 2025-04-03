import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    })
  );

  res.status(200).json(listingsWithHealth);
}