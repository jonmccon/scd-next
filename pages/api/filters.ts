import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
console.log(`Received ${req.method} request to ${req.url}`)

  const sizes = await prisma.directory.findMany({
    select: { size: true, }, distinct: ['size'],
  })

  const neighborhoods = await prisma.directory.findMany({
    select: { neighborhood: true, }, distinct: ['neighborhood'],
  })

  const cities = await prisma.directory.findMany({
    select: { city: true, }, distinct: ['city'],
  })

  console.log(`Sending repsponse with status ${res.statusCode} to ${req.url}`)
  // console.log(sizes, neighborhoods, cities)
  res.status(200).json({ sizes, neighborhoods, cities })
  
}