import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`Received ${req.method} request to ${req.url}`)

  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      title: true,
      size: true,
      neighborhood: true,
      city: true,
      tags: {
        select: {
          name: true
        }
      }
      // Add any other fields you need for a listing
    }
  })

  console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  res.status(200).json({ listings })
}