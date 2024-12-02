import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listings = await prisma.listing.findMany();
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

