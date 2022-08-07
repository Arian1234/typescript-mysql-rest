import { Router } from "express";
import { check } from "express-validator";
import {getSub_categories,getSub_category,putSub_category,postSub_category} from '../controllers/sub_categories.controller'
const router=Router();

router.get('/',getSub_categories);
router.get('/:id',getSub_category);
router.post('/',postSub_category);
router.put('/:id',putSub_category);

export default router;