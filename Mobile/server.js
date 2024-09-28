const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/horas', async (req, res) => {
  const { seccion } = req.query;
  const horas = await prisma.hora.findMany({
    where: {
      seccion: seccion,
    },
  });
  res.json(horas);
});

app.get('/fechas', async (req, res) => {
  const { seccion } = req.query;
  const fechas = await prisma.hora.findMany({
    where: {
      seccion: seccion,
    },
    select: {
      fecha: true,
    },
    distinct: ['fecha'],
  });
  res.json(fechas.map(f => f.fecha));
});

app.post('/horas', async (req, res) => {
  const { nombre, hora, imagen, fecha, seccion } = req.body;
  const newHora = await prisma.hora.create({
    data: { nombre, hora, imagen, fecha, seccion },
  });
  res.json(newHora);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});