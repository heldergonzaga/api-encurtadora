/*
  Warnings:

  - The primary key for the `Encurtadora` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Encurtadora" DROP CONSTRAINT "Encurtadora_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Encurtadora_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Encurtadora_id_seq";
