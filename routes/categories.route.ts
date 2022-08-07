import { Router } from "express";
import { check } from "express-validator";
import {getCategories,getCategory,postCategory,putCategory} from '../controllers/categories.controller'
const router=Router();

router.get('/',getCategories);
router.get('/:id',getCategory);
router.post('/',postCategory);
router.put('/:id',putCategory);

export default router;