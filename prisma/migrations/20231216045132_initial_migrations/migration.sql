-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'STUDENT', 'ASSISTANT');

-- CreateTable
CREATE TABLE "Account" (
    "account_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "is_verified" BOOLEAN NOT NULL,
    "role" "ROLES" NOT NULL,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Group" (
    "group_id" TEXT NOT NULL,
    "practicum_id" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "GroupToModule" (
    "group_id" TEXT NOT NULL,
    "assistant_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "date" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "Practicum" (
    "practicum_id" TEXT NOT NULL,
    "practicum_name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practicum_pkey" PRIMARY KEY ("practicum_id")
);

-- CreateTable
CREATE TABLE "Module" (
    "module_id" TEXT NOT NULL,
    "module_name" TEXT NOT NULL,
    "practicum_id" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("module_id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "student_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Assistant" (
    "assistant_id" TEXT NOT NULL,
    "assistant_name" TEXT NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("assistant_id")
);

-- CreateTable
CREATE TABLE "AssistantPracticum" (
    "assistant_id" TEXT NOT NULL,
    "practicum_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_user_id_key" ON "Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_student_id_key" ON "Student"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_group_id_key" ON "Group"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_practicum_id_key" ON "Group"("practicum_id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupToModule_group_id_key" ON "GroupToModule"("group_id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupToModule_assistant_id_key" ON "GroupToModule"("assistant_id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupToModule_module_id_key" ON "GroupToModule"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "Practicum_practicum_id_key" ON "Practicum"("practicum_id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_module_id_key" ON "Module"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "Module_practicum_id_key" ON "Module"("practicum_id");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_student_id_key" ON "Grade"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_module_id_key" ON "Grade"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_assistant_id_key" ON "Assistant"("assistant_id");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantPracticum_assistant_id_key" ON "AssistantPracticum"("assistant_id");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToStudent_AB_unique" ON "_GroupToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToStudent_B_index" ON "_GroupToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_practicum_id_fkey" FOREIGN KEY ("practicum_id") REFERENCES "Practicum"("practicum_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupToModule" ADD CONSTRAINT "GroupToModule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupToModule" ADD CONSTRAINT "GroupToModule_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "AssistantPracticum"("assistant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupToModule" ADD CONSTRAINT "GroupToModule_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_practicum_id_fkey" FOREIGN KEY ("practicum_id") REFERENCES "Practicum"("practicum_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("module_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "Account"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantPracticum" ADD CONSTRAINT "AssistantPracticum_assistant_id_fkey" FOREIGN KEY ("assistant_id") REFERENCES "Assistant"("assistant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistantPracticum" ADD CONSTRAINT "AssistantPracticum_practicum_id_fkey" FOREIGN KEY ("practicum_id") REFERENCES "Practicum"("practicum_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToStudent" ADD CONSTRAINT "_GroupToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("group_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToStudent" ADD CONSTRAINT "_GroupToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
