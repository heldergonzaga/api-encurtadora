/*
  Warnings:

  - A unique constraint covering the columns `[term_origin]` on the table `Encurtadora` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Encurtadora_term_origin_key" ON "Encurtadora"("term_origin");
