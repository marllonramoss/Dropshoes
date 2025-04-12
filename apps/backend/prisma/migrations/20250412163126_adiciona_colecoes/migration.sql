/*
  Warnings:

  - Added the required column `colecaoId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- Criar a tabela de coleções
CREATE TABLE "colecoes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colecoes_pkey" PRIMARY KEY ("id")
);

-- Criar índice único para o slug
CREATE UNIQUE INDEX "colecoes_slug_key" ON "colecoes"("slug");

-- Criar uma coleção padrão para produtos existentes
INSERT INTO "colecoes" ("id", "nome", "slug", "createdAt", "updatedAt")
VALUES ('colecao-padrao', 'Coleção Padrão', 'colecao-padrao', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Adicionar coluna colecaoId na tabela produtos, permitindo NULL inicialmente
ALTER TABLE "produtos" ADD COLUMN "colecaoId" TEXT;

-- Atualizar produtos existentes para usar a coleção padrão
UPDATE "produtos" SET "colecaoId" = 'colecao-padrao' WHERE "colecaoId" IS NULL;

-- Tornar a coluna colecaoId NOT NULL e adicionar a foreign key
ALTER TABLE "produtos" ALTER COLUMN "colecaoId" SET NOT NULL;
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_colecaoId_fkey" FOREIGN KEY ("colecaoId") REFERENCES "colecoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
