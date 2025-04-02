-- DropForeignKey
ALTER TABLE "HealthCheck" DROP CONSTRAINT "HealthCheck_listingId_fkey";

-- AlterTable
ALTER TABLE "_TagToListing" DROP CONSTRAINT "_TagToListing_AB_pkey";

-- DropTable
DROP TABLE "HealthCheck";

-- DropTable
DROP TABLE "playing_with_neon";

-- CreateIndex
CREATE UNIQUE INDEX "_TagToListing_AB_unique" ON "_TagToListing"("A" ASC, "B" ASC);

