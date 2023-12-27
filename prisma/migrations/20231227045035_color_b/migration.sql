-- AlterTable
ALTER TABLE "Listing" 
RENAME COLUMN "color" TO "colorA";

ALTER TABLE "Listing" 
ADD COLUMN "colorB" TEXT;
