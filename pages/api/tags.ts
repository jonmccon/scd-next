// pages/api/tags.ts
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const listings = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  const tags = listings.flatMap(listing => ({
    id: listing.id,
    name: listing.name,
  }));
  
  console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  res.status(200).json(tags)
}