/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordAccessToken` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordExpiresIn` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "accessToken",
DROP COLUMN "forgotPasswordAccessToken",
DROP COLUMN "forgotPasswordExpiresIn";
