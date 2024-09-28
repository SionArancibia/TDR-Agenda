/*
  Warnings:

  - You are about to drop the column `imagen` on the `Hora` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hora" DROP COLUMN "imagen",
ALTER COLUMN "seccion" SET DEFAULT 'default_seccion';
