/*
  Warnings:

  - Made the column `groupId` on table `TeacherPayment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TeacherPayment" ALTER COLUMN "groupId" SET NOT NULL;
