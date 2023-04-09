-- CreateTable
CREATE TABLE `customers` (
    `cnpj` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NOT NULL,
    `nome_contato` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `customers_cnpj_key`(`cnpj`),
    UNIQUE INDEX `customers_razao_social_key`(`razao_social`),
    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
