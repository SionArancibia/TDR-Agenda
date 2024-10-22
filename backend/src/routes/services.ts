import express from "express";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../controllers/services.controller";

const router = express.Router();

router.post('/', protectRoute, authorizeRole(['admin']), createService);
router.get('/', protectRoute, authorizeRole(['admin']), getAllServices);
router.get('/:id', protectRoute, authorizeRole(['admin']), getServiceById);
router.put('/:id', protectRoute, authorizeRole(['admin']), updateService);
router.delete('/:id', protectRoute, authorizeRole(['admin']), deleteService);

export default router;