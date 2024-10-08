-- CreateTable
CREATE TABLE "citas_agendadas" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "profesional" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,

    CONSTRAINT "citas_agendadas_pkey" PRIMARY KEY ("id")
);
