import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth';
import citasRoutes from './routes/citas';
import adminRoutes from './routes/admin.router';
import passwordRecoveryRoutes from './routes/passwordRecovery'; // Importar la nueva ruta

import '../types/express'; // para poder usar el tipo Request en el middleware protectRoute definido en types para el user

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/adminCrud', adminRoutes);
app.use('/api/profesional', citasRoutes);
app.use('/api/passwordRecovery', passwordRecoveryRoutes); // Usar la nueva ruta

app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});