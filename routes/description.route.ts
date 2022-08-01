import { Router } from "express";
import { getDescriptions,getDescription,postDescription,putDescription } from '../controllers/descriptions.controller'
const router=Router();

router.get('/',getDescriptions);
router.get('/:id',getDescription);
router.post('/',postDescription);
router.put('/:id',putDescription);


export default router;