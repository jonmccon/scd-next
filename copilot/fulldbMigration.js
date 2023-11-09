const fs = require('fs');
const matter = require('gray-matter');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrateMarkdownToListings() {
  try {
  const files = fs.readdirSync('/Users/monny/Github/seattle-creative-directory/content/directory');
  

  for (const file of files) {
    const content = fs.readFileSync(`/Users/monny/Github/seattle-creative-directory/content/directory/${file}`, 'utf-8');
    const data = matter(content).data;

    const listingData = {
      title: data.title,
      website: data.website,
      twit: data.twit,
      inst: data.inst,
      linkATitle: data.linkA ? data.linkA[0] : null,
      linkAURL: data.linkA ? data.linkA[1] : null,
      linkBTitle: data.linkB ? data.linkB[0] : null,
      linkBURL: data.linkB ? data.linkB[1] : null,
      category: data.category,
      city: data.city,
      neighborhood: data.neighborhood,
      size: data.size,
      latitude: data.place ? data.place[1] : NaN,
      longitude: data.place ? data.place[0] : NaN,
      episodeURL: data.episodeURL ? data.episodeURL : null,
      episodePromo: data.episodePromo ? data.episodePromo : null,
      episodePerson: data.episodePerson ? data.episodePerson : null,
      pullquote: data.pullquote ? data.pullquote : null,
      color: data.color ? data.color : null,
      published: data.published,
      description: data.description ? data.description : null,
    };

    const listing = await prisma.listing.create({ data: listingData });

    for (const tag of data.tags) {
      let existingTag = await prisma.tag.findUnique({ where: { name: tag } });

      if (!existingTag) {
        existingTag = await prisma.tag.create({ data: { name: tag } });
      }

      await prisma.listing.update({
        where: { id: listing.id },
        data: { tags: { connect: { id: existingTag.id } } },
      });
    }
  }
} catch (error) {
  console.error('An error occurred while migrating markdown to listings:', error);
} finally {
  await prisma.$disconnect();
}
}

migrateMarkdownToListings();
