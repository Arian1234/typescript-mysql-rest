import { Router } from "express";
import {getImages,getImage,postimage,putImage,deleteImage} from '../controllers/images.controller'
const router=Router();

router.get('/',getImages);
router.get('/:id',getImage);
router.post('/',postimage);
router.put('/:id',putImage);
router.delete('/id',deleteImage);

export default router;
