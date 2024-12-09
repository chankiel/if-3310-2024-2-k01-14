/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConnectionRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PushSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_from_id_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_to_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_from_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_to_id_fkey";

-- DropForeignKey
ALTER TABLE "ConnectionRequest" DROP CONSTRAINT "ConnectionRequest_from_id_fkey";

-- DropForeignKey
ALTER TABLE "ConnectionRequest" DROP CONSTRAINT "ConnectionRequest_to_id_fkey";

-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PushSubscription" DROP CONSTRAINT "PushSubscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomChat" DROP CONSTRAINT "RoomChat_first_user_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomChat" DROP CONSTRAINT "RoomChat_last_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomChat" DROP CONSTRAINT "RoomChat_second_user_id_fkey";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "Connection";

-- DropTable
DROP TABLE "ConnectionRequest";

-- DropTable
DROP TABLE "Feed";

-- DropTable
DROP TABLE "PushSubscription";

-- DropTable
DROP TABLE "RoomChat";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "full_name" TEXT,
    "profile_photo_path" TEXT,
    "skills" TEXT,
    "work_history" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_chat" (
    "id" SERIAL NOT NULL,
    "first_user_id" INTEGER NOT NULL,
    "second_user_id" INTEGER NOT NULL,
    "last_message" TEXT,
    "last_sender_id" INTEGER,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_request" (
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connection_request_pkey" PRIMARY KEY ("from_id","to_id")
);

-- CreateTable
CREATE TABLE "connection" (
    "from_id" INTEGER NOT NULL,
    "to_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connection_pkey" PRIMARY KEY ("from_id","to_id")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "endpoint" TEXT NOT NULL,
    "user_id" INTEGER,
    "keys" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("endpoint")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "feed_user_id_idx" ON "feed"("user_id");

-- CreateIndex
CREATE INDEX "chat_from_id_to_id_idx" ON "chat"("from_id", "to_id");

-- CreateIndex
CREATE UNIQUE INDEX "room_chat_first_user_id_second_user_id_key" ON "room_chat"("first_user_id", "second_user_id");

-- CreateIndex
CREATE INDEX "push_subscriptions_user_id_idx" ON "push_subscriptions"("user_id");

-- AddForeignKey
ALTER TABLE "feed" ADD CONSTRAINT "feed_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_chat" ADD CONSTRAINT "room_chat_first_user_id_fkey" FOREIGN KEY ("first_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_chat" ADD CONSTRAINT "room_chat_second_user_id_fkey" FOREIGN KEY ("second_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_chat" ADD CONSTRAINT "room_chat_last_sender_id_fkey" FOREIGN KEY ("last_sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_request" ADD CONSTRAINT "connection_request_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_request" ADD CONSTRAINT "connection_request_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection" ADD CONSTRAINT "connection_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection" ADD CONSTRAINT "connection_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
