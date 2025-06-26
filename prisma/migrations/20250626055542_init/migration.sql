-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('tenant', 'manager');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AccountRole" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
