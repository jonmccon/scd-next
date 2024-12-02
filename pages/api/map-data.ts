// import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const listings = await prisma.listing.findMany({
      where: {
        latitude: {
          not: null,
        },
        longitude: {
          not: null,
        },
      },
    });
    return res.json(listings);
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    return res.json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}

