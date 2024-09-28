-- CreateTable
CREATE TABLE "Hora" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,

    CONSTRAINT "Hora_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Hora" ADD COLUMN "seccion" TEXT NOT NULL;
