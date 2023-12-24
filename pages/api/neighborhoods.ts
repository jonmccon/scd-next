// pages/api/neighborhoods.ts
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const listings = await prisma.listing.findMany({
    select: {
      neighborhood: true,
    }
  })

  const neighborhoods = [...new Set(listings.map(listing => listing.neighborhood))];

  console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  res.status(200).json(neighborhoods);
}