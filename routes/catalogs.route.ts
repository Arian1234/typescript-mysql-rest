import {Router} from 'express';
import { check } from 'express-validator';
const router=Router();
import { getCatalogs, getCatalog, putCatalog, deleteCatalog, postCatalog } from '../controllers/catalogs.controller';
import validatorCatalog from '../middleware/validator.middleware';

const checking=[check('cantcatalog','Ingresa un valor numerico.').isNumeric(),
check(['preciocostcatalog','precioventantcatalog','precioventaactcatalog'],'Ingresa un valor numerico.').isDecimal(),validatorCatalog];

router.get('/',getCatalogs);
router.get('/:id',getCatalog);
router.post('/',checking,postCatalog);
router.put('/:id',checking,putCatalog);
router.delete('/:id',deleteCatalog);

export default router;