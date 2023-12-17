/*
  Warnings:

  - You are about to drop the column `assistant_id` on the `AssistantPracticum` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[asistant_practicum_id]` on the table `AssistantPracticum` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `asistant_practicum_id` to the `AssistantPracticum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssistantPracticum" DROP CONSTRAINT "AssistantPracticum_assistant_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupToModule" DROP CONSTRAINT "GroupToModule_assistant_id_fkey";

-- DropIndex
DROP INDEX "AssistantPracticum_assistant_id_key";

-- DropIndex
DROP INDEX "Group_practicum_id_key";

-- AlterTable
ALTER TABLE "AssistantPracticum" DROP COLUMN "assistant_id",
ADD COLUMN     "asistant_practicum_id" TEXT NOT NULL,
ADD CONSTRAINT "AssistantPracticum_pkey" PRIMARY KEY ("asistant_practicum_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantPracticum_asistant_practicum_id_key" ON "AssistantPracticum"("asistant_practicum_id");

-- AddForeignKey
ALTER TABLE "GroupToModule" ADD CONSTRAINT "GroupToModule_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "AssistantPracticum"("asistant_practicum_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantPracticum" ADD CONSTRAINT "AssistantPracticum_asistant_practicum_id_fkey" FOREIGN KEY ("asistant_practicum_id") REFERENCES "Assistant"("assistant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
