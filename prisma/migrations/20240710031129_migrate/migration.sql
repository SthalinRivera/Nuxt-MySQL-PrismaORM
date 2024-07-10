/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `users`;
