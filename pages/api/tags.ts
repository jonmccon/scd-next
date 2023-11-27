// pages/api/tags.ts
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const listings = await prisma.listing.findMany({
    select: {
      size: true,
    }
  })

  const tags = [...new Set(listings.map(listing => listing.size))];

  console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  res.status(200).json(tags)
}