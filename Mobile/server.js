const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

app.post('/register', async (req, res) => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ message: 'RUT y contraseña son requeridos' });
  }

  try {
    const user = await prisma.usuario.create({
      data: {
        rut,
        password,
      },
    });

    return res.status(200).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { rut, password } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { rut },
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
  }

  const token = jwt.sign({ rut: user.rut, id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});