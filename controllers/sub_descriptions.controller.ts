import { Request, Response } from "express";
import Sub_descriptions from '../models/sub_description.model';
import { Op } from 'sequelize';

export const getSubDescriptions = async (req: Request, res: Response) => {
    try {
        const sub = await Sub_descriptions.findAll();
        res.json({
            sub
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const getSubDescription = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const sub = await Sub_descriptions.findByPk(id);
        if (sub) {
            res.json({
                sub
            })
        } else {
            res.status(404).json({
                msg: `No existe una sub_description con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postSubDescription = async (req: Request, res: Response) => {
    const sub = req.body;

    try {
        if (await existe_detalle_catalog(req)) {
            res.status(500).json({
                msg: "Los datos que intenta ingresar ya estan registrados en la base de datos."
            });
        } else {
            Sub_descriptions.create(sub).then(() => res.json({ msg: "Exito,acabas de registrar una nueva sub-description." }))
                .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));

        }

    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putSubDescription = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const sub = await Sub_descriptions.findByPk(id);
        if (!sub) {
            return res.status(404).json({ msg: `La sub-description con codigo ${id} no existe.` });
        } else {
            if (await existe_detalle_catalog(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await sub.update(body);
                return res.json({ body });
            }
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const deleteSubDescription =async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const sub = await Sub_descriptions.findByPk(id);
        if (!sub) {
            return res.status(404).json({ msg: `El sub-description con codigo ${id} no existe.` });
        } 
            await sub.destroy();
            return res.json({ msg: `El sub-description con Id : ${id} a sido eliminado.` });
        
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}


async function existe_detalle_catalog(req: Request) {
    const { body } = req;
    const existeDetalle_catalog = await Sub_descriptions.findOne({
        where: {
            [Op.and]: [{ detalle_subdescrip: body.detalle_subdescrip }, { CATALOGId: body.CATALOGId }]
        }
    });
    return existeDetalle_catalog ? true : false;
}