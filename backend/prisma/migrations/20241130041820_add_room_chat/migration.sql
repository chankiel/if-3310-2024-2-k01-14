/*
  Warnings:

  - Added the required column `room_id` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "room_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RoomChat" (
    "id" SERIAL NOT NULL,
    "first_user_id" INTEGER NOT NULL,
    "second_user_id" INTEGER NOT NULL,
    "last_message" TEXT,
    "last_sender_id" INTEGER,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomChat_first_user_id_second_user_id_key" ON "RoomChat"("first_user_id", "second_user_id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "RoomChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomChat" ADD CONSTRAINT "RoomChat_first_user_id_fkey" FOREIGN KEY ("first_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomChat" ADD CONSTRAINT "RoomChat_second_user_id_fkey" FOREIGN KEY ("second_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomChat" ADD CONSTRAINT "RoomChat_last_sender_id_fkey" FOREIGN KEY ("last_sender_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
