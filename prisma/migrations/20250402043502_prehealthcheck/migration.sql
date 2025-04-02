-- AlterTable
ALTER TABLE "_TagToListing" ADD CONSTRAINT "_TagToListing_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TagToListing_AB_unique";
