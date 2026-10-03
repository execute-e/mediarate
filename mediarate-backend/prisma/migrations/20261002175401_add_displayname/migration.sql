-- AlterTable
ALTER TABLE "User" ADD COLUMN "displayName" TEXT;

-- Backfill existing users
UPDATE "User" SET "displayName" = "username" WHERE "displayName" IS NULL;

ALTER TABLE "User" ALTER COLUMN "displayName" SET NOT NULL;
