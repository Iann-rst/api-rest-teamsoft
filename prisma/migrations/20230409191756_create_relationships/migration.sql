/*
  Warnings:

  - Added the required column `customer_cnpj` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `customer_cnpj` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_customer_cnpj_fkey` FOREIGN KEY (`customer_cnpj`) REFERENCES `customers`(`cnpj`) ON DELETE CASCADE ON UPDATE CASCADE;
