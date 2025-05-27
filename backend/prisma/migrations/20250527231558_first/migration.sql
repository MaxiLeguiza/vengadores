-- CreateTable
CREATE TABLE `advengers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `actor` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `advengers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `habilidades_advengers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `advengerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `habilidades_advengers` ADD CONSTRAINT `habilidades_advengers_advengerId_fkey` FOREIGN KEY (`advengerId`) REFERENCES `advengers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
