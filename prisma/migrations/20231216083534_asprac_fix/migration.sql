/*
  Warnings:

  - A unique constraint covering the columns `[asistant_practicum_id]` on the table `AssistantPracticum` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asistant_id` to the `AssistantPracticum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssistantPracticum" DROP CONSTRAINT "AssistantPracticum_asistant_practicum_id_fkey";

-- AlterTable
ALTER TABLE "AssistantPracticum" ADD COLUMN     "asistant_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AssistantPracticum_asistant_practicum_id_key" ON "AssistantPracticum"("asistant_practicum_id");

-- AddForeignKey
ALTER TABLE "AssistantPracticum" ADD CONSTRAINT "AssistantPracticum_asistant_id_fkey" FOREIGN KEY ("asistant_id") REFERENCES "Assistant"("assistant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
