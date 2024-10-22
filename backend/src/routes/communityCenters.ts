import express from "express";
import protectRoute from "../middleware/protectRoute";
import authorizeRole from "../middleware/authorizeRole";
import { createCommunityCenter, deleteCommunityCenter, getAllCommunityCenters, getCommunityCenterById, updateCommunityCenter } from "../controllers/communityCenters.controller";

const router = express.Router();

router.post('/', protectRoute, authorizeRole(['admin']), createCommunityCenter); 
router.get('/',  protectRoute, authorizeRole(['admin']), getAllCommunityCenters); 
router.get('/:id', protectRoute, authorizeRole(['admin']), getCommunityCenterById); 
router.put('/:id',  protectRoute, authorizeRole(['admin']), updateCommunityCenter); 
router.delete('/:id',  protectRoute, authorizeRole(['admin']), deleteCommunityCenter);


export default router;
