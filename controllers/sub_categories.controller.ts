import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import sub_categories from '../models/sub_categories.model';

export const getSub_categories = async (req: Request, res: Response) => {
    try {
        const sub_categ = await sub_categories.findAll();
        res.json({
            sub_categ
        })
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}

export const getSub_category = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const sub_categ = await sub_categories.findByPk(id);
        if (sub_categ) {
            res.json({
                sub_categ
            })
        } else {
            res.status(404).json({
                msg: `No existe una sub_categ con id ${id}`
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const postSub_category = async (req: Request, res: Response) => {

    const sub_categ = req.body;
    try {
        if (await existeSub_category(req)) {
            res.status(500).json({
                msg: "Los datos que intenta ingresar ya estan registrados en la base de datos."
            })
        } else {
            sub_categories.create(sub_categ).then(() => res.json({ msg: "Exito,acabas de registrar una nueva sub_categ." }))
                .catch((err) => res.status(500).json({ msg: `Acaba de suceder un error en tu solicitud de registro. : ${err}` }));
        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}
export const putSub_category = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const sub_categ = await sub_categories.findByPk(id);
        if (!sub_categ) {
            return res.status(404).json({ msg: `La sub_categ con codigo ${id} no existe.` });
        } else {
            if (await existeSub_category(req)) {
                return res.status(500).json({
                    msg: "Los datos que intenta actualizar ya estan registrados en la base de datos."
                });
            } else {
                await sub_categ.update(body);
                return res.json({ body });
            }

        }
    } catch (err) {
        res.status(500).json({
            msg: `Acaba de suceder un error en su operación ,comuniquese con el administrador ${err}`
        });
    }
}


async function existeSub_category(req: Request) {
    const { body } = req;
    const existeSect = await sub_categories.findOne({
        where: {
            nombsubcategory: body.nombsubcategory
        }
    });
    return existeSect ? true : false;
}