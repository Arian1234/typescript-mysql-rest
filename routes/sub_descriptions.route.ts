import { Router } from "express";
import {getSubDescriptions,getSubDescription,postSubDescription,putSubDescription,deleteSubDescription} from '../controllers/sub_descriptions.controller'
const router=Router();

router.get('/',getSubDescriptions);
router.get('/:id',getSubDescription);
router.post('/',postSubDescription);
router.put('/:id',putSubDescription);
router.delete('/:id',deleteSubDescription);

export default router;