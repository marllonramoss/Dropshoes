/*
  Warnings:

  - Made the column `produtoId` on table `itens_pedido` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "imagens_produto" DROP CONSTRAINT "imagens_produto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "itens_pedido" DROP CONSTRAINT "itens_pedido_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "tamanhos_produto" DROP CONSTRAINT "tamanhos_produto_produtoId_fkey";

-- AlterTable
ALTER TABLE "itens_pedido" ALTER COLUMN "produtoId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tamanhos_produto" ADD CONSTRAINT "tamanhos_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens_produto" ADD CONSTRAINT "imagens_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
