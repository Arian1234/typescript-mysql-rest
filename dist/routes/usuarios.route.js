"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const usuarios_controller_1 = require("../controllers/usuarios.controller");
router.get('/', usuarios_controller_1.getUsuarios);
router.get('/:id', usuarios_controller_1.getUsuario);
router.post('/', usuarios_controller_1.postUsuarios);
router.put('/:id', usuarios_controller_1.putUsuarios);
router.delete('/:id', usuarios_controller_1.deleteUsuarios);
exports.default = router;
//# sourceMappingURL=usuarios.route.js.map