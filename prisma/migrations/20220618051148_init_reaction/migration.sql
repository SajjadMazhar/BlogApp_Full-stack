/*
  Warnings:

  - Added the required column `blogId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "blogId" INTEGER NOT NULL;
