/*
  Warnings:

  - You are about to drop the column `name` on the `advengers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `advengers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `advengers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `advengers_name_key` ON `advengers`;

-- AlterTable
ALTER TABLE `advengers` DROP COLUMN `name`,
    ADD COLUMN `nombre` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `advengers_nombre_key` ON `advengers`(`nombre`);
