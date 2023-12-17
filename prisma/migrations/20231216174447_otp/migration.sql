/*
  Warnings:

  - You are about to drop the column `user_id` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_user_id_fkey";

-- DropIndex
DROP INDEX "OTP_user_id_key";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_key" ON "OTP"("email");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_email_fkey" FOREIGN KEY ("email") REFERENCES "Account"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
