/*
  Warnings:

  - You are about to drop the column `attachment` on the `GroupMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `attachment` on the `GroupNotification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GroupMaterial" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[];

-- AlterTable
ALTER TABLE "GroupNotification" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[];
