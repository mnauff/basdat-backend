-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "otpSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_user_id_key" ON "OTP"("user_id");

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Account"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
