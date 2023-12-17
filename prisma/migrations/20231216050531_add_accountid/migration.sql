/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `Assistant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_assistant_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_student_id_fkey";

-- AlterTable
ALTER TABLE "Assistant" ADD COLUMN     "account_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "account_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_account_id_key" ON "Assistant"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_account_id_key" ON "Student"("account_id");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
