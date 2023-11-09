import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
console.log(`Received ${req.method} request to ${req.url}`)

  const sizes = await prisma.listing.findMany({
    select: { size: true, }, distinct: ['size'],
  })

  const neighborhoods = await prisma.listing.findMany({
    select: { neighborhood: true, }, distinct: ['neighborhood'],
  })

  const cities = await prisma.listing.findMany({
    select: { city: true, }, distinct: ['city'],
  })

  console.log(`Sending repsponse with status ${res.statusCode} to ${req.url}`)
  // console.log(sizes, neighborhoods, cities)
  res.status(200).json({ sizes, neighborhoods, cities })
  
}