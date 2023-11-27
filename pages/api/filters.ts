import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Received ${req.method} request to ${req.url}`)

  const listings = await prisma.listing.findMany({
    select: {
      size: true,
      neighborhood: true,
      city: true,
      tags: {
        select: {
          name: true
        }
      }
    }
  })

  const sizes = [...new Set(listings.map(listing => listing.size))];
  const neighborhoods = [...new Set(listings.map(listing => listing.neighborhood))];
  const cities = [...new Set(listings.map(listing => listing.city))];
  const tags = [...new Set(listings.flatMap(listing => listing.tags).map(tag => tag.name))];

  console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  res.status(200).json({listings, sizes, neighborhoods, cities, tags })
}