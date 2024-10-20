/*
  Warnings:

  - You are about to drop the column `blockSchedule` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `request` on the `Request` table. All the data in the column will be lost.
  - Added the required column `requestType` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('REGISTRATION_REQUEST', 'BLOCK_SCHEDULE_REQUEST');

-- AlterTable
ALTER TABLE "Administrator" DROP COLUMN "blockSchedule";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "request",
ADD COLUMN     "requestType" "RequestType" NOT NULL;

-- CreateTable
CREATE TABLE "ProfessionalBlock" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "professionalId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationRequest" (
    "id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistrationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationRequest_requestId_key" ON "RegistrationRequest"("requestId");

-- AddForeignKey
ALTER TABLE "ProfessionalBlock" ADD CONSTRAINT "ProfessionalBlock_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationRequest" ADD CONSTRAINT "RegistrationRequest_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
