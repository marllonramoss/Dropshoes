/*
  Warnings:

  - You are about to drop the column `colecaoId` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_colecaoId_fkey";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "colecaoId";

-- CreateTable
CREATE TABLE "produtos_colecoes" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "colecaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_colecoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtos_colecoes_produtoId_colecaoId_key" ON "produtos_colecoes"("produtoId", "colecaoId");

-- AddForeignKey
ALTER TABLE "produtos_colecoes" ADD CONSTRAINT "produtos_colecoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_colecoes" ADD CONSTRAINT "produtos_colecoes_colecaoId_fkey" FOREIGN KEY ("colecaoId") REFERENCES "colecoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
