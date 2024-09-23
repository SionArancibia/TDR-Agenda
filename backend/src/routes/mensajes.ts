import { Router } from 'express';
import { obtenerMensajes } from '../controllers/mensajescontroller';

const router = Router();


router.get('/mensajes', obtenerMensajes);

export default router;
