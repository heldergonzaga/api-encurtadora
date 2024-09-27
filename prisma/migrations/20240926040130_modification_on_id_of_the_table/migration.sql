/*
  Warnings:

  - The primary key for the `TabelaEncurtadoras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TabelaEncurtadoras` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TabelaEncurtadoras" DROP CONSTRAINT "TabelaEncurtadoras_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TabelaEncurtadoras_pkey" PRIMARY KEY ("id");
