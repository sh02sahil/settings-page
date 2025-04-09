/*
  Warnings:

  - You are about to drop the column `showNotificaions` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "showNotificaions",
ADD COLUMN     "showNotifications" BOOLEAN NOT NULL DEFAULT false;
