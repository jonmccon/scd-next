import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const recentChecks = await prisma.healthCheck.findMany({
    distinct: ["listingId"],
    orderBy: {
      checkedAt: "desc",
    },
    select: {
      id: true,
    },
  });

  const recentIds = recentChecks.map((check) => check.id);

  const statusCounts = await prisma.healthCheck.groupBy({
    by: ["status"],
    where: {
      id: {
        in: recentIds,
      },
    },
    _count: {
      status: true,
    },
  });

  const totalChecked = statusCounts.reduce((sum, item) => sum + item._count.status, 0);
  const upCount = statusCounts.find((item) => item.status === "up")?._count.status || 0;
  const uptimePercentage = totalChecked > 0 ? Math.round((upCount / totalChecked) * 100) : 0;

  res.status(200).json({ totalChecked, uptimePercentage, issues: totalChecked - upCount });
}