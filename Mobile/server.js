const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ----------------------------------------------------------------------------------------------------------------------------------------

app.get('/horas', async (req, res) => {
  const { seccion } = req.query;
  const horas = await prisma.hora.findMany({
    where: {
      seccion: seccion,
    },
  });
  res.json(horas);
});

// ----------------------------------------------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------------------------------------------

app.post('/horas', async (req, res) => {
  const { nombre, hora, imagen, fecha, seccion } = req.body;
  const newHora = await prisma.hora.create({
    data: { nombre, hora, imagen, fecha, seccion },
  });
  res.json(newHora);
});

// ----------------------------------------------------------------------------------------------------------------------------------------

app.post('/register', async (req, res) => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ message: 'RUT y contraseña son requeridos' });
  }

  try {

    const existingUser = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'El RUT ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: {
        rut,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    //console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------

app.post('/login', async (req, res) => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    return res.status(400).json({ message: 'RUT y contraseña son requeridos' });
  }

  try {
    const user = await prisma.usuario.findUnique({
      where: { rut },
    });

    if (!user) {
      return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'RUT o contraseña incorrectos' });
    }

    // Generar un token JWT si las credenciales son correctas
    const token = jwt.sign({ rut: user.rut, id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Correo desde el cual se enviará el mail
    pass: process.env.EMAIL_PASS, // Contraseña del correo
  },
});

app.post('/reset-password', async (req, res) => {
  const { rut, email } = req.body;

  // Busca al usuario por su RUT
  const user = await prisma.usuario.findUnique({ where: { rut } });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Genera un token JWT con el RUT del usuario
  const token = jwt.sign({ rut: user.rut }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token válido por 1 hora
  });

  // Crea el enlace con el token
  const resetLink = `http://192.168.1.20:3000/change-password?token=${token}`;

  // Configura los detalles del correo
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: 'Recuperación de Contraseña',
    text: `Haz clic en el siguiente enlace para cambiar tu contraseña: ${resetLink}`,
  };

  // Envía el correo 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error al enviar el correo' });
    }
    res.status(200).json({ message: 'Correo enviado correctamente' });
  });
});

// ----------------------------------------------------------------------------------------------------------------------------------------

const path = require('path');

app.get('/change-password', (req, res) => {
  const { token } = req.query;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.sendFile(path.join(__dirname, 'components', 'ChangePassword.html'));
  } catch (error) {
    console.error(error);
    res.status(400).send("Token inválido o expirado");
  }
});


// ----------------------------------------------------------------------------------------------------------------------------------------

app.post('/change-password', async (req, res) => {
  const { token, newPassword } = req.body;
  //console.error(req.body);

  if (!token) {
    return res.status(400).json({ message: 'El token no fue proporcionado.' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Actualiza la contraseña del usuario
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await prisma.usuario.update({
      where: { rut: decoded.rut },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
});

// ----------------------------------------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});