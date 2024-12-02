// pages/api/episodes.ts
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const episodes = await prisma.listing.findMany({
    select: {
      title: true,
      website: true,
      twit: true,
      inst: true,
      linkATitle: true,
      linkAURL: true,
      linkBTitle: true,
      linkBURL: true,
      episodeURL: true,
      episodePerson: true,
      episodePromo: true,
      colorA: true,
      colorB: true,
      pullquote: true,
    },
    where: { 
      published: true, 
      episodeURL: {
        startsWith: "https://cdn.simplecast.com/audio/"
      }
    },
    orderBy: {
      episodePromo: 'desc',
    }
  })

  // console.log(`Sending response with status ${res.statusCode} to ${req.url}`)
  // res.status(200).json(episodes);
}