/*
  Warnings:

  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo_profile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ConnectionRequest" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
DROP COLUMN "photo_profile",
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "profile_photo_path" TEXT,
ADD COLUMN     "skills" TEXT,
ADD COLUMN     "work_history" TEXT;
