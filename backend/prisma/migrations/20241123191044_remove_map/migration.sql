/*
  Warnings:

  - You are about to drop the `chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `connection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `connectionrequests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feeds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pushsubscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_from_id_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_to_id_fkey";

-- DropForeignKey

ALTER TABLE "connection" DROP CONSTRAINT "connection_from_id_fkey";

-- DropForeignKey
ALTER TABLE "connection" DROP CONSTRAINT "connection_to_id_fkey";

-- DropForeignKey
ALTER TABLE "connectionrequests" DROP CONSTRAINT "connectionrequests_from_id_fkey";

-- DropForeignKey
ALTER TABLE "connectionrequests" DROP CONSTRAINT "connectionrequests_to_id_fkey";

-- DropForeignKey
ALTER TABLE "feeds" DROP CONSTRAINT "feeds_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pushsubscriptions" DROP CONSTRAINT "pushsubscriptions_user_id_fkey";

-- DropTable
DROP TABLE "chats";

-- DropTable
DROP TABLE "connection";

-- DropTable
DROP TABLE "connectionrequests";

-- DropTable
DROP TABLE "feeds";

-- DropTable
DROP TABLE "pushsubscriptions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "photo_profile" TEXT,
    "description" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectionRequest" (
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConnectionRequest_pkey" PRIMARY KEY ("from_id","to_id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("from_id","to_id")
);

-- CreateTable
CREATE TABLE "PushSubscription" (
    "endpoint" TEXT NOT NULL,
    "user_id" INTEGER,
    "keys" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("endpoint")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Feed_user_id_idx" ON "Feed"("user_id");

-- CreateIndex
CREATE INDEX "Chat_from_id_to_id_idx" ON "Chat"("from_id", "to_id");

-- CreateIndex
CREATE INDEX "PushSubscription_user_id_idx" ON "PushSubscription"("user_id");

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionRequest" ADD CONSTRAINT "ConnectionRequest_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
