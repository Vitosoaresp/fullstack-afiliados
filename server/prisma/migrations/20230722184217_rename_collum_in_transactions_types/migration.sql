/*
  Warnings:

  - You are about to drop the column `name` on the `TransactionsTypes` table. All the data in the column will be lost.
  - Added the required column `description` to the `TransactionsTypes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionsTypes` DROP COLUMN `name`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
