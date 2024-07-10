/*
  Warnings:

  - You are about to drop the `user2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user2`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
