"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarios = exports.putUsuarios = exports.postUsuarios = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { Op } = require("sequelize");
const usuarios_model_1 = __importDefault(require("../models/usuarios.model"));
//Obteniendo todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarios_model_1.default.findAll();
        res.json({
            usuarios
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
});
exports.getUsuarios = getUsuarios;
//Obteniendo usuarios por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuarios = yield usuarios_model_1.default.findByPk(id);
        if (usuarios) {
            res.json({
                usuarios
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un usuario con id ${id}`
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
});
exports.getUsuario = getUsuario;
//Registrando un nuevo usuario
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { nombreuser, apellidouser, documentouser, correouser, pwduser, birthuser, contactouser } = req.body;
    try {
        if (yield existeusuario(req)) {
            return res.status(400).json({ msg: `Estas ingresando datos duplicados que ya han sido registrados con anterioriad.` });
        }
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            bcryptjs_1.default.hash(pwduser, salt, function (err, hash) {
                pwduser = hash;
                usuarios_model_1.default.create({ nombreuser, apellidouser, documentouser, correouser, pwduser, birthuser, contactouser }).then(() => res.json({ msg: "Exito,te acabas de registrar." }))
                    .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` })); // Store hash in your password DB.
            });
        });
    }
    catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
});
exports.postUsuarios = postUsuarios;
//Actualizando un usuario
const putUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    try {
        const usuario = yield usuarios_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: `El usuario con codigo ${id} no existe.` });
        }
        else {
            if (yield existeusuario(req)) {
                return res.status(500).json({
                    msg: "Los datos actualizados Documento de identidad o correo ya han sido registrados con anterioridad."
                });
            }
            else {
                yield usuario.update(body);
                return res.json({ body });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
});
exports.putUsuarios = putUsuarios;
const deleteUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    try {
        const usuario = yield usuarios_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: `El usuario con codigo ${id} no existe.` });
        }
        else {
            yield usuario.update({ estuser: '0' });
            return res.json({ msg: `El usuario ${body.correouser} con Id : ${id} a sido dado de baja.` });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
});
exports.deleteUsuarios = deleteUsuarios;
// 
// 
// Funciones propias
function existeusuario(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const existemails = yield usuarios_model_1.default.findOne({
            where: {
                [Op.or]: [
                    { correouser: body.correouser },
                    { documentouser: body.documentouser }
                ]
            }
        });
        return existemails ? true : false;
    });
}
//# sourceMappingURL=usuarios.controller.js.map