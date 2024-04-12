/*
  Warnings:

  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Units" AS ENUM ('unit', 'kilogram', 'liter', 'unkown');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "Units" NOT NULL;
