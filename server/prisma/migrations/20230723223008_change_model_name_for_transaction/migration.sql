/*
  Warnings:

  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_sellerId_fkey`;

-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_typeId_fkey`;

-- DropTable
DROP TABLE `Sale`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `sellerId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `typeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `TransactionsTypes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Seller`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
