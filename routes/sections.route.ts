import { Router } from "express";
import {getSections,getSection,postSection,putSection} from '../controllers/sections.controller'
const router=Router();

router.get('/',getSections);
router.get('/:id',getSection);
router.post('/',postSection);
router.put('/:id',putSection);

export default router;