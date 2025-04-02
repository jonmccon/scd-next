/*
  Warnings:

  - The primary key for the `_TagToListing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_TagToListing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_TagToListing" DROP CONSTRAINT "_TagToListing_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_TagToListing_AB_unique" ON "_TagToListing"("A", "B");
