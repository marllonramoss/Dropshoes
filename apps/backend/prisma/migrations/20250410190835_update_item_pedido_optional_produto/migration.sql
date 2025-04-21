-- DropForeignKey
ALTER TABLE "itens_pedido" DROP CONSTRAINT "itens_pedido_produtoId_fkey";

-- AlterTable
ALTER TABLE "itens_pedido" ALTER COLUMN "produtoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
