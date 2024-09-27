/*
  Warnings:

  - You are about to drop the `TabelaEncurtadoras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TabelaEncurtadoras";

-- CreateTable
CREATE TABLE "Encurtadora" (
    "id" SERIAL NOT NULL,
    "term_origin" TEXT NOT NULL,
    "term_target" TEXT NOT NULL,

    CONSTRAINT "Encurtadora_pkey" PRIMARY KEY ("id")
);
