import { Request, Response } from "express"
import bcrypt from "bcryptjs"
const { Op } = require("sequelize");
import Usuario from "../models/usuarios.model";

//Obteniendo todos los usuarios

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({
            usuarios
        });
        var clave = '';
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};

//Obteniendo usuarios por ID

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuarios = await Usuario.findByPk(id);
        if (usuarios) {
            res.json({
                usuarios
            })
        } else {
            res.status(404).json({
                msg: `No existe un usuario con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }

};

//Registrando un nuevo usuario

export const postUsuarios = async (req: Request, res: Response) => {
    var { nombreuser, apellidouser, documentouser,
        correouser, pwduser, birthuser, contactouser } = req.body;
    const us = new Usuario();

    try {
        if (await existeusuario(req)) {
            return res.status(400).json({ msg: `Estas ingresando datos duplicados que ya han sido registrados con anterioriad.` });
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(pwduser, salt, function (err, hash) {
                pwduser = hash;
                Usuario.create({ nombreuser, apellidouser, documentouser, correouser, pwduser, birthuser, contactouser }).then(() => res.json({ msg: "Exito,te acabas de registrar." }))
                    .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));   // Store hash in your password DB.
            });
        });
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }

}

//Actualizando un usuario

export const putUsuarios = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: `El usuario con codigo ${id} no existe.` });
        } else {
            if (await existeusuario(req)) {
                return res.status(500).json({
                    msg: "Los datos actualizados Documento de identidad o correo ya han sido registrados con anterioridad."
                });
            } else {
                await usuario.update(body);
                return res.json({ body });
            }

        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }

};
export const deleteUsuarios = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: `El usuario con codigo ${id} no existe.` });
        } else {
            await usuario.update({ estuser: '0' });
            return res.json({ msg: `El usuario ${body.correouser} con Id : ${id} a sido dado de baja.` });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
};
// 
// 
// Funciones propias

async function existeusuario(req: Request) {
    const { body } = req;
    const existemails = await Usuario.findOne({
        where: {
            [Op.or]: [
                { correouser: body.correouser },
                { documentouser: body.documentouser }
            ]
        }
    });
    return existemails ? true : false;
}