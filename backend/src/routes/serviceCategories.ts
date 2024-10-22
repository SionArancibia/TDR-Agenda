import express from "express";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/serviceCategories.controller";

const router = express.Router();

router.post('/', protectRoute, authorizeRole(['admin']), createCategory);
router.get('/', protectRoute, authorizeRole(['admin']), getAllCategories);
router.get('/:id', protectRoute, authorizeRole(['admin']), getCategoryById);
router.put('/:id', protectRoute, authorizeRole(['admin']), updateCategory);
router.delete('/:id', protectRoute, authorizeRole(['admin']), deleteCategory);

export default router;