/*
  Warnings:

  - The values [Create,UpdatePassword,Delete,Login] on the enum `AuditLogActivity` will be removed. If these variants are still used in the database, this will fail.
  - The values [Admin] on the enum `AuditLogResource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuditLogActivity_new" AS ENUM ('LOGIN', 'CREATE', 'UPDATE_PASSWORD', 'DELETE');
ALTER TABLE "AuditLog" ALTER COLUMN "activity" TYPE "AuditLogActivity_new" USING ("activity"::text::"AuditLogActivity_new");
ALTER TYPE "AuditLogActivity" RENAME TO "AuditLogActivity_old";
ALTER TYPE "AuditLogActivity_new" RENAME TO "AuditLogActivity";
DROP TYPE "AuditLogActivity_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "AuditLogResource_new" AS ENUM ('AUTH', 'ADMIN');
ALTER TABLE "AuditLog" ALTER COLUMN "resource" TYPE "AuditLogResource_new" USING ("resource"::text::"AuditLogResource_new");
ALTER TYPE "AuditLogResource" RENAME TO "AuditLogResource_old";
ALTER TYPE "AuditLogResource_new" RENAME TO "AuditLogResource";
DROP TYPE "AuditLogResource_old";
COMMIT;
