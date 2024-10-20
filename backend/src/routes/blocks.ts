import express from "express";
import {blockProfessionalTime, deleteProfessionalBlock, getAllProfessionalBlocks, getProfessionalBlockById, getProfessionalBlocksByProfessionalId} from "../controllers/block.controller";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";

const router = express.Router();

router.get('/', protectRoute, authorizeRole(['admin', 'professional']), getAllProfessionalBlocks);
router.get('/:id', protectRoute, authorizeRole(['admin', 'professional']), getProfessionalBlockById);
router.get('/:professionalId/blocks', protectRoute, authorizeRole(['admin', 'professional']), getProfessionalBlocksByProfessionalId); 
router.post('/', protectRoute, authorizeRole(['admin', 'professional']), blockProfessionalTime);
router.delete('/professionals/blocks/:id', protectRoute, authorizeRole(['admin', 'professional']), deleteProfessionalBlock);

export default router;
