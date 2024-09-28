const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//script para generar datos a sql
async function main() {
  await prisma.hora.createMany({
    data: [
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 23',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 24',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 25',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 26',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 27',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Juan Pérez',
        hora: '08:00 AM',
        fecha: 'Agosto 28',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dra. María López',
        hora: '09:00 AM',
        fecha: 'Agosto 23',
        seccion: 'Psicologia',
      },
      {
        nombre: 'Dr. Carlos García',
        hora: '10:00 AM',
        fecha: 'Agosto 24',
        seccion: 'Kinesiologia',
      },
      {
        nombre: 'Dra. Ana Martínez',
        hora: '11:00 AM',
        fecha: 'Agosto 24',
        seccion: 'Kinesiologia',
      },
      {
        nombre: 'Dr. Luis Fernández',
        hora: '12:00 PM',
        fecha: 'Agosto 25',
        seccion: 'Podologia',
      },
      {
        nombre: 'Dra. Laura Gómez',
        hora: '01:00 PM',
        fecha: 'Agosto 25',
        seccion: 'Podologia',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });