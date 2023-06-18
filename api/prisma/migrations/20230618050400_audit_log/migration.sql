-- CreateEnum
CREATE TYPE "AuditLogResource" AS ENUM ('Admin');

-- CreateEnum
CREATE TYPE "AuditLogActivity" AS ENUM ('Create', 'UpdatePassword', 'Delete');

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "resource" "AuditLogResource" NOT NULL,
    "activity" "AuditLogActivity" NOT NULL,
    "performById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_performById_fkey" FOREIGN KEY ("performById") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
