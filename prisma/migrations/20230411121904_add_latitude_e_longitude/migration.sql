-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `latitude` DECIMAL(65, 30) NULL,
    ADD COLUMN `longitude` DECIMAL(65, 30) NULL;
