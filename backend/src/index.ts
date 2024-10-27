import express from 'express';
import authRoutes from "./routes/auth"
import appointmentsRoutes from "./routes/appointments"
import requestsRoutes from "./routes/requests"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRoutes from "./routes/users"
import passwordRecoveryRoutes from './routes/passwordRecovery';
import patientRoutes  from './routes/patients';
import communityCenters from './routes/communityCenters';
import services from './routes/services';
import serviceCategories from './routes/serviceCategories';
import professionals from './routes/professionals';
import schedules from './routes/schedules';
import blocks from './routes/blocks';
import adminRoutes from './routes/admin';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use('/api/passwordRecovery', passwordRecoveryRoutes);
app.use('/api', patientRoutes); 
app.use('/api/professionals', professionals);
app.use('/api/requests', requestsRoutes);
app.use('/api/communityCenters', communityCenters);
app.use('/api/services', services);
app.use('/api/serviceCategories', serviceCategories);
app.use('/api/schedules', schedules);
app.use('/api/blocks', blocks);
app.use('/api/admin', adminRoutes); 


app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});