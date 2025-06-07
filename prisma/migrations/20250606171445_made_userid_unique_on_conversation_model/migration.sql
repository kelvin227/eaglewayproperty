/*
  Warnings:

  - A unique constraint covering the columns `[userId2]` on the table `conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "conversation_userId2_key" ON "conversation"("userId2");
