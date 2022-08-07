import { Router } from "express";
import { getBuscarCatalog } from '../controllers/buscarcatalog.controller';
const router=Router();


router.get('/:filler',getBuscarCatalog);

export default router;