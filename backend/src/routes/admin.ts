import { Router } from 'express';
import { getAdminStats } from '../controllers/adminStats.controller';
import protectRoute from '../middleware/protectRoute';
import authorizeRole from '../middleware/authorizeRole';

const router = Router();

router.get('/stats', protectRoute, authorizeRole(['admin']),  getAdminStats);

export default router;