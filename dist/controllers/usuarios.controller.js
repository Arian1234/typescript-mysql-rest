"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarios = exports.putUsuarios = exports.postUsuarios = exports.getUsuario = exports.getUsuarios = void 0;
const getUsuarios = (req, res) => {
    res.json({
        msg: 'getUsuarios'
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario por id',
        id
    });
};
exports.getUsuario = getUsuario;
const postUsuarios = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postUsuarioss',
        body
    });
};
exports.postUsuarios = postUsuarios;
const putUsuarios = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'putUsuarios',
        id
    });
};
exports.putUsuarios = putUsuarios;
const deleteUsuarios = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUsuarios',
        id
    });
};
exports.deleteUsuarios = deleteUsuarios;
//# sourceMappingURL=usuarios.controller.js.map