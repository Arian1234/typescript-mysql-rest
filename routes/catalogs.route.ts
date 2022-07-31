import {Router} from 'express';
const router=Router();
import { getCatalogs, getCatalog, putCatalog, deleteCatalog, postCatalog } from '../controllers/catalogs.controller';

router.get('/',getCatalogs);
router.get('/:id',getCatalog);
router.post('/',postCatalog);
router.put('/:id',putCatalog);
router.delete('/:id',deleteCatalog);

export default router;