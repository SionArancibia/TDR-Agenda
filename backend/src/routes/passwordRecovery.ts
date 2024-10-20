import { Router } from 'express';
import { passwordRecovery, resetPassword } from '../controllers/passwordRecoveryController';

const router = Router();

router.post('/passwordRecovery', passwordRecovery);
router.post('/resetPassword', resetPassword);

export default router;