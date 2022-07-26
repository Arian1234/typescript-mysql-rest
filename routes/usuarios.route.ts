import {Router} from 'express';
const router=Router();
import { getUsuarios, getUsuario, postUsuarios, putUsuarios, deleteUsuarios } from '../controllers/usuarios.controller';

router.get('/',getUsuarios);
router.get('/:id',getUsuario);
router.post('/',postUsuarios);
router.put('/:id',putUsuarios);
router.delete('/:id',deleteUsuarios);

export default router;